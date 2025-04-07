import { Grid, LinearProgress } from "@material-ui/core";
import {
  Flag,
  MonetizationOn,
  NavigateNext,
  PeopleAlt,
  Score,
  Settings,
  TrendingFlat,
  TrendingUp,
} from "@material-ui/icons";
import { width } from "@mui/system";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { dashboardSelectos } from "../../redux/slices/dashboardSlice";
import { userSelector } from "../../redux/slices/userSlice";
import { api } from "../../services/api";
import { formatNumber, getDataDaysMonth, validateIncludes, validateJoins } from "../../utils";
import GoalCard from "../UI/molecules/GoalCard";
import GoalCardLoader from "../UI/molecules/GoalCardLoader";
import CarouselComponent from "../UI/organism/Carousel";

const EjecutiveTargets = () => {
  const router = useRouter();
  const { id_user, groupId } = useSelector(userSelector);
  const [totalProspects, setTotalProspects] = useState(0);
  const [totalProspectsNews, setTotalProspectsNews] = useState(0);
  const [totalOportunities, setTotalOportunities] = useState([]);
  const [totalCommissions, setTotalCommissions] = useState(0);
  const [nowDate, setNowDate] = useState(new Date());
  const [goals, setGoals] = useState([]);
  const [totalGoals, setTotalGoals] = useState(0);
  const { totalSells, totalClients, totalPayments } = useSelector(dashboardSelectos);
  useEffect(() => {
    let mounted = true;
    if (mounted) {
      getDataInitial();
      getTotalComission();
      getGoalsRequest();
    }
    return () => (mounted = false);
  }, [id_user]);

  const getDataInitial = async () => {
    try {
      let query = {};
      query.ejecutiveId = id_user;
      let totalProspects = await api.get(`prospects?where={"ejecutiveId":"${id_user}"}&limit=0&count=1`);
      setTotalProspects(totalProspects.data.count);

      query.viewed = false;
      query.createdAt = { between: getRangeDaysMonth(nowDate) };
      let totalProspectsnew = await api.get(`prospects?where=${JSON.stringify(query)}&limit=1&count=1`);
      setTotalProspectsNews(totalProspectsnew.data.count);

      query = {};
      query.id = id_user;
      query.oportunity = {};
      query.oportunity.iscloseout = false;
      let totalOportunities = await api.get(`dashboard/ejecutivesamount?where=${JSON.stringify(query)}`);
      setTotalOportunities(totalOportunities.data.results);
    } catch (error) {
      console.log(error);
    }
  };

  const getGoalsRequest = async () => {
    try {
      let query = {};
      query.goal = {};
      query.initialperiodate = {
        $gte: "2022-11-01T05:00:00.000Z",
        $lte: "2022-12-01T05:00:00.000Z",
      };

      query.or = [{ groupId: groupId }, { ejecutiveId: id_user }];

      let params = {
        include: validateIncludes({}),
        join: validateJoins({}),
        where: JSON.stringify(query),
        limit: 20,
        count: "0",
        order: "-createdAt",
        skip: 1,
      };

      let responseGoals = await api.get("ejecutivesgoals", { params });
      // console.log(responseGoals);
      setGoals(responseGoals.data.results);
      setTotalGoals(responseGoals.data?.count);
    } catch (error) {
      console.log(error);
    }
  };
  const getRangeDaysMonth = dates => {
    let date = new Date(dates.toISOString().slice(0, 10));
    let primerDia = new Date(date.getFullYear(), date.getMonth(), 1);
    let ultimoDia = new Date(date.getFullYear(), date.getMonth() + 1, 0);
    return [
      new Date(primerDia.setDate(primerDia.getDate() - 6)).toISOString(),
      new Date(ultimoDia.setDate(ultimoDia.getDate() + 6)).toISOString(),
    ];
  };

  const getTotalComission = async () => {
    try {
      let monthDays = getDataDaysMonth(new Date());
      let query = {
        id: id_user,
        oportunity: {
          soldat: {
            between: monthDays,
          },
        },
      };
      let params = {
        where: JSON.stringify(query),
        limit: "",
        count: 1,
      };
      let responseCommssion = await api.get("dashboard/ejecutivescommission", { params });
      if (responseCommssion.data.count >= 1) {
        setTotalCommissions(responseCommssion?.data?.results[0]?.totalCommission);
      }
      console.log(responseCommssion);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <TargetsStyled>
      <Grid container spacing={2}>
        <Grid item xs={12} md={3}>
          {goals.length <= 0 && <GoalCard showNoData={true} />}

          {goals.length >= 1 && (
            <CarouselComponent renderChildren={true} time={5000}>
              {goals.map((item, index) => (
                <GoalCard key={item.id} item={item} />
              ))}
            </CarouselComponent>
          )}
        </Grid>
        <Grid item xs={12} md={3}>
          <div className="target prospects">
            <div className="top top__prospects">
              <p>Prospectos</p>
            </div>
            <div className="middle middle__prospects">
              <PeopleAlt className="icon_prospects" />
              <span>{totalProspectsNews}</span>
            </div>
            <div className="bottom">
              <p
                onClick={() => {
                  router.push("/prospectos");
                }}
              >
                Ver prospectos
                <NavigateNext />
              </p>
            </div>
          </div>
        </Grid>
        <Grid item xs={12} md={3}>
          <div className="target oportunity">
            <div className="top top__oportunities">
              <p>Oportunidades</p>
            </div>
            <div className="middle middle__oportunities">
              <MonetizationOn className="icon_oportunity" />
              <span>
                {totalOportunities.length !== 0 ? formatNumber(totalOportunities[0].totalAmount) : "Sin datos"}
              </span>
            </div>
            <div className="bottom">
              <p
                onClick={() => {
                  router.push("/oportunidades");
                }}
              >
                Ver oportunidades
                <NavigateNext />
              </p>
            </div>
          </div>
        </Grid>
        <Grid item xs={12} md={3}>
          <div className="target clients">
            <div className="top top__clients">
              <p>Comisiones</p>
            </div>
            <div className="middle middle__clients">
              <PeopleAlt className="icon_clients" />
              <span>{formatNumber(totalCommissions)}</span>
            </div>
            <div className="bottom">
              <p>
                Ver comisiones
                <NavigateNext />
              </p>
            </div>
          </div>
        </Grid>
        {/* <Grid item xs={12} md={2}>
          <div className="target receivable">
            <div className="top top__receivable">
              <p>Cuentas por cobrar</p>
            </div>
            <div className="middle middle__receivable">
              <PeopleAlt className="icon_receivable" />
              <span>{totalPayments}</span>
            </div>
            <div className="bottom">
              <p>
                Ver cuentas
                <NavigateNext />
              </p>
            </div>
          </div>
        </Grid> */}
      </Grid>
    </TargetsStyled>
  );
};
const ProgressBar = ({ value }) => {
  return (
    <div>
      <progress value={value} max={100} />
      <span>{value > 100 ? "100" : value}%</span>
    </div>
  );
};

export default EjecutiveTargets;
const ContainerProgressBar = styled.div`
  width: 100%;
  progress {
    appearance: none;
    ::-webkit-progress-bar {
      background-color: white;
      height: 25px;
      border-radius: 5px;
    }
    ::-webkit-progress-value {
      border-radius: 5px;
      background-color: #eabe3f;
    }
  }
`;
const TargetsStyled = styled.div`
  .target {
    background: #fff;
    border-radius: 30px 30px 0 0;
    padding: 15px 15px;
    position: relative;
    height: 110px;
    box-shadow: rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;
    background-color: #eaeaea;
    &::before {
      height: 5px;
      width: 100%;
      bottom: 0;
      left: 0;
      content: "";
      position: absolute;
      /* background: #8a8a8a; */
      border-bottom-left-radius: 8px;
      border-bottom-right-radius: 8px;
    }
    .top {
      display: flex;
      align-items: center;
      justify-content: space-between;
      p {
        font-size: 16px;
        font-weight: 500;
      }
      &__goals {
        color: white;
        flex-direction: column;
        text-transform: capitalize;
        label {
          font-size: 70%;
        }
        p {
          font-size: 20px;
          font-weight: 500;
        }
      }
      &__prospects {
        color: #44cbe4;
      }
      &__oportunities {
        color: #88c82d;
      }
      &__receivable {
        color: #febc11;
      }
      &__clients {
        color: #f77132;
      }
      .news {
        display: flex;
        align-items: center;
        .up {
          font-size: 16px;
          color: green;
        }
        .stand {
          font-size: 16px;
          color: red;
        }
        span {
          font-size: 18px;
          color: green;
        }
        p {
          font-size: 18px;
          margin: 0 5px;
        }
        .date {
          font-size: 12px;
        }
        .setting {
          font-size: 20px;
          cursor: pointer;
          transition: all 0.5s ease;
          &:hover {
            animation: settings 2s infinite;
            @keyframes settings {
              0% {
                transform: rotate(0deg);
              }
              50% {
                transform: rotate(180deg);
              }
              100% {
                transform: rotate(0deg) ();
              }
            }
          }
        }
      }
    }
    .middle {
      display: flex;
      align-items: center;
      padding: 0px 10px;
      border-top-right-radius: 40px;
      color: white;
      align-items: center;
      justify-content: space-between;
      span {
        font-size: 16px;
        margin-right: 10px;
      }
      svg {
        font-size: 25px;
        margin-right: 5px;
        color: white;
      }
      &__goals {
        justify-content: end;
        padding: 0px 0px;
        span {
          font-size: 70%;
          margin-left: 2px;
        }
        &__final_goal {
          position: absolute;
          bottom: 31px;
          margin-left: 5px;
        }
      }
      &__prospects {
        background-color: #44cbe4;
      }
      &__oportunities {
        background-color: #88c82d;
      }
      &__receivable {
        background-color: #febc11;
      }
      &__clients {
        background-color: #f77132;
      }
    }
    .bottom {
      p {
        display: flex;
        align-items: center;
        font-size: 13px;
        color: black;
        font-weight: 500;
        margin-bottom: 5px;
        cursor: pointer;
        svg {
          opacity: 0;
          transform: translate(-20px, 2px);
          transition: all 0.4s ease;
        }
        &:hover {
          svg {
            opacity: 1;
            transform: translate(0px, 2px);
          }
        }
      }
      &__goals {
        p {
          color: white;
          font-size: 10px;
        }
      }
    }
  }
  .goals {
    background-color: #417afe;
    padding: 10px 30px 0px 30px;
    box-shadow: rgba(0, 0, 0, 0.15) 0px 4px 6px 4px, rgba(0, 0, 0, 0.09) 0px 2px 4px 7px;
    &::before {
      height: 0px;
      width: 100%;
      bottom: 0;
      left: 0;
      content: "";
      position: absolute;
      border-bottom-left-radius: 8px;
      border-bottom-right-radius: 8px;
    }
  }
  .oportunity {
    &::before {
      height: 5px;
      width: 100%;
      bottom: 0;
      left: 0;
      content: "";
      position: absolute;
      background-color: #88c82d;
      border-bottom-left-radius: 8px;
      border-bottom-right-radius: 8px;
    }
  }
  .prospects {
    &::before {
      height: 5px;
      width: 100%;
      bottom: 0;
      left: 0;
      content: "";
      position: absolute;
      background-color: #44cbe4;
      border-bottom-left-radius: 8px;
      border-bottom-right-radius: 8px;
    }
  }
  .clients {
    &::before {
      height: 5px;
      width: 100%;
      bottom: 0;
      left: 0;
      content: "";
      position: absolute;
      background-color: #f77132;
      border-bottom-left-radius: 8px;
      border-bottom-right-radius: 8px;
    }
  }
  .receivable {
    &::before {
      height: 5px;
      width: 100%;
      bottom: 0;
      left: 0;
      content: "";
      position: absolute;
      background-color: #febc11;
      border-bottom-left-radius: 8px;
      border-bottom-right-radius: 8px;
    }
  }
`;
