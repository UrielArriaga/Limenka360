import React, { useEffect, useState } from "react";
import useFetch from "../../../../hooks/useFetch";
import { formatNumber } from "../../../../utils";
import styled from "styled-components";
import { motion } from "framer-motion";
import { Grid, LinearProgress, withStyles, Tooltip as Tip, Button, Box } from "@material-ui/core";
import { colors } from "../../../../styles/global.styles";
import dayjs from "dayjs";
import usePagination from "../../../../hooks/usePagination";
import { useSelector } from "react-redux";
import { userSelector } from "../../../../redux/slices/userSlice";
import { dashboardDirectorSelector } from "../../../../redux/slices/dashboardDirector";
import { api } from "../../../../services/api";
export default function LastOportunitiesDirector({ groupId }) {
  const { limit, handleLimit, handlePage } = usePagination({ defaultLimit: 10, defaultPage: 1 });
  const [searchBy, setSearchBy] = useState("");
  const { company } = useSelector(userSelector);
  const { startDateGlobal, finishDateGlobal } = useSelector(dashboardDirectorSelector);
  const [isFetching, setIsFetching] = useState("");
  const [data, setData] = useState([]);
  const [count, setCount] = useState(0);

  useEffect(() => {
    const getCo = async () => {
      setIsFetching(true);
      try {
        let queryGoals = {
          iscloseout: false,
          updatedAt: {
            $gte: startDateGlobal,
            $lte: finishDateGlobal,
          },
        };
        if (groupId) {
          queryGoals.prospect = {
            ejecutive: {
              groupId: groupId,
            },
          };
        } else {
          queryGoals.prospect = {
            ejecutive: { companyId: company },
          };
        }

        let params = {
          count: 1,
          include: "prospect,prospect.ejecutive,prospect.clienttype",
          order: "-createdAt",
          limit: limit,
          where: JSON.stringify(queryGoals),
        };
        let res = await api.get("oportunities", {
          params: params,
        });
        setCount(res.data.count);
        setData(res.data.results);
        setIsFetching(false);
      } catch (error) {
        console.log(error);
      }
    };
    getCo();
  }, [startDateGlobal, finishDateGlobal]);

  if (count == 0)
    return (
      <GoalsChartDirectorStyled>
        <p>No hay datos</p>
      </GoalsChartDirectorStyled>
    );

  if (isFetching) {
    return (
      <GoalsChartDirectorStyled>
        <p>Cargando datos</p>
      </GoalsChartDirectorStyled>
    );
  }
  return (
    <GoalsChartDirectorStyled>
      <div className="headersection">
        <h3>Ultimas Oportunidades</h3>
        <div className="divider"></div>
      </div>

      {data.map(item => {
        return (
          <div key={item.id}>
            <Grid container className="itemcard">
              <Grid item md={5} style={{ marginBottom: 10 }}>
                <Tip title="Ver Cotizacion">
                  <p onClick={() => window.open(item.quoteurl, "__blank")} className="titlegroup">
                    {item.prospect.fullname}
                  </p>
                </Tip>
                <p className="subtitle">{item?.prospect?.ejecutive?.email}</p>
              </Grid>

              <Grid item md={3}>
                <p className="title amount">{formatNumber(item?.amount)}</p>
                <p className=" subtitle progress">Monto Cotizado</p>
              </Grid>
              <Grid item md={2}>
                {item?.certainty < 50 ? (
                  <div className="min">
                    <div className="bg">
                      <p className="title">{item?.certainty} %</p>
                    </div>
                    <p className=" subtitle progress">Certeza</p>
                  </div>
                ) : (
                  <div className="max">
                    <div className="bg">
                      <p className="title">{item?.certainty} %</p>
                    </div>
                    <p className=" subtitle progress">Certeza</p>
                  </div>
                )}
              </Grid>
              <Grid item md={2}>
                <p className="title">+{item?.quantity}</p>
                <p className="subtitle">Productos</p>
              </Grid>

              <div className="date">
                <p>{dayjs(item.createdAt).fromNow()}</p>
              </div>
            </Grid>
            <div className="divider"></div>
          </div>
        );
      })}
      <Box display="flex" justifyContent="center">
        <Button style={{ color: "#7695fe" }} onClick={() => handleLimit(limit + 10)}>
          Mostrar mas
        </Button>
      </Box>
    </GoalsChartDirectorStyled>
  );
}

const GoalsChartDirectorEmpty = styled.div`
  background-color: #fff;
  padding: 10px;
  box-shadow: 0px 3px 1px -2px rgb(0 0 0 / 20%), 0px 2px 2px 0px rgb(0 0 0 / 14%), 0px 1px 5px 0px rgb(0 0 0 / 12%);
  min-height: 400px;
  height: 200px;
  overflow-y: scroll;
  h3 {
    margin-bottom: 20px;
    color: #495057;
  }

  .divider {
    height: 2px;
    background-color: rgba(73, 80, 87, 0.1);
    margin-bottom: 20px;
  }
  .content {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 60%;
  }
  .createnew {
    color: ${colors.bgDirector};
    font-weight: bold;
    margin-left: 10px;
    text-decoration: underline;
    cursor: pointer;
  }
  .nodata {
    width: 100%;
    text-align: center;
    padding: 20px 10px;
    margin-bottom: 12px;
    background-color: rgba(0, 0, 0, 0.1);
    p {
      font-weight: bold;
    }
  }
`;

const BorderLinearProgress = withStyles(theme => ({
  root: {
    height: 10,
    borderRadius: 5,
  },
  colorPrimary: {
    backgroundColor: theme.palette.grey[theme.palette.type === "light" ? 300 : 900],
  },
  bar: {
    borderRadius: 5,
    backgroundColor: colors.primaryColor,
  },
}))(LinearProgress);

const GoalsChartDirectorStyled = styled.div`
  background-color: #fff;
  padding: 10px;
  box-shadow: 0px 3px 1px -2px rgb(0 0 0 / 20%), 0px 2px 2px 0px rgb(0 0 0 / 14%), 0px 1px 5px 0px rgb(0 0 0 / 12%);
  min-height: 400px;
  height: 200px;

  overflow-y: scroll;

  position: relative;
  ::-webkit-scrollbar {
    width: 4px;
    height: 4px;
  }
  ::-webkit-scrollbar-track {
    -webkit-box-shadow: inset 0 0 6px rgb(166 164 164 / 20%);
  }
  ::-webkit-scrollbar-thumb {
    -webkit-box-shadow: inset 0 0 20px #9e9e9e;
  }
  h3 {
    margin-bottom: 20px;
    color: #495057;
  }

  .divider {
    height: 2px;
    background-color: rgba(73, 80, 87, 0.1);
    margin-bottom: 20px;
  }

  .custom-tooltip {
    border-radius: 10px;
    padding: 4px;
    background-color: #fff;
    box-shadow: 0px 3px 1px -2px rgb(0 0 0 / 20%), 0px 2px 2px 0px rgb(0 0 0 / 14%), 0px 1px 5px 0px rgb(0 0 0 / 12%);
  }

  .filter {
    display: flex;
    align-items: center;
    padding: 10px 0px;
    svg {
      cursor: pointer;
    }
  }

  .titlegroup {
    font-weight: bold;
    color: #495057;
    text-transform: capitalize;
    cursor: pointer;

    &:hover {
      color: #7695fe;
    }
  }
  .title {
    color: #495057;
    font-weight: bold;
    font-size: 15px;
  }

  .amount {
    color: #7695fe;
  }
  .subtitle {
    font-size: 12px;
    color: #878a99;
  }

  .percentage {
    text-align: right;
    font-size: 12px;
    color: #512da8;
  }

  .headersection {
    /* position: absolute;1 */
    z-index: 1000;
    top: 0;
    left: 0;
  }

  .itemcard {
    position: relative;
    padding-top: 20px;
  }

  .date {
    position: absolute;
    top: -10px;
    right: 0;
    p {
      color: #9e9e9e;
      font-size: 12px;
    }
  }

  .bg {
    padding: 2px 2px;
    border-radius: 8px;
    width: 70px;
  }
  .min {
    text-align: center;
    .bg {
      background-color: #ffabab;
      display: inline-block;
    }
  }
  .max {
    text-align: center;
    .bg {
      background-color: #8acf8a;
      display: inline-block;
    }
  }
`;

const FiltersContainer = styled(motion.div)`
  display: flex;
  select {
    border: none;
    height: 30px;
    width: 200px;
    background-color: #ffff;
    border-radius: 2px;
    padding-left: 10px;
    margin-right: 4px;
    margin-bottom: 8px;
    /* border: 2px solid #cfd8dc; */
    background-color: #ffff;
    box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
    &:focus {
      outline: 1px solid green;
    }
  }
  /* .icon_filter {
    transition: all 1s ease-in-out;
  } */
`;
