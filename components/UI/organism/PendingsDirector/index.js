import React, { useState } from "react";
import useFetch from "../../../../hooks/useFetch";

import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { motion } from "framer-motion";
import { Clear, Done, Email, Notifications } from "@material-ui/icons";
import { Avatar, Chip, Grid, LinearProgress, withStyles, Tooltip as MuiTooltip } from "@material-ui/core";
import { colors } from "../../../../styles/global.styles";
import { dashboardDirectorSelector } from "../../../../redux/slices/dashboardDirector";
import { Rating } from "@material-ui/lab";
import dayjs from "dayjs";
import MessageEmpty from "../MessageEmpty";
import { userSelector } from "../../../../redux/slices/userSlice";
const StyledRating = withStyles({
  iconFilled: {
    color: "#990000",
  },
  iconEmpty: {},
})(Rating);

export default function PendingsDirector({ groupId }) {
  const { company } = useSelector(userSelector);
  const [showFilters, setShowFilters] = useState(false);
  const [searchBy, setSearchBy] = useState("");
  const { startDateGlobal, finishDateGlobal } = useSelector(dashboardDirectorSelector);

  const dispatch = useDispatch();

  const generateQuery = () => {
    let queryPendings = {
      pending: {
        isdone: true,
        date_from: {
          $gte: startDateGlobal,
          $lte: finishDateGlobal,
        },
      },
    };
    if (groupId) {
      queryPendings.id = groupId;
    } else {
      queryPendings.company = {
        id: company,
      };
    }

    let queryPendingBefore = {
      pending: {
        isdone: false,
        date_from: {
          $gte: startDateGlobal,
          $lte: finishDateGlobal,
        },
      },
    };

    return {
      order: "-totalPendings",
      // include: "goal,goal.goaltype,goal.goalname,group",
      where: JSON.stringify(queryPendings),
      wherecustom: JSON.stringify(queryPendingBefore),
    };
  };

  const generateQueryUsers = () => {
    let query = {
      ejecutive: { groupId: groupId },
      updatedAt: {
        $gte: startDateGlobal,
        $lte: finishDateGlobal,
      },
    };

    return {
      order: "isdone",
      all: 1,
      include: "ejecutive",
      where: JSON.stringify(query),
    };
  };

  const { response } = useFetch({
    path: "dashboard/groupspending",
    condition: startDateGlobal,
    params: generateQuery(),
    refetch: startDateGlobal,
  });

  const { response: responseUsers } = useFetch({
    path: "pendings",
    condition: startDateGlobal,
    params: generateQueryUsers(),
    refetch: startDateGlobal,
  });

  const renderNotifyBy = {
    correo: (
      <MuiTooltip title="Notificación por correo">
        <Email className="icon"></Email>
      </MuiTooltip>
    ),
  };

  const renderStatus = {
    1: <Chip size="small" color="primary" label="Prospecto" />,
    2: <Chip size="small" color="primary" label="Cotizado" />,
    3: <Chip size="small" color="primary" label="Cliente" />,
    4: <Chip size="small" color="primary" label="Prospecto" />,
  };

  const renderIsDone = {
    true: (
      <MuiTooltip title="Acabado">
        <Done className="icon icon-done" />
      </MuiTooltip>
    ),
    false: (
      <MuiTooltip title="Sin acabar">
        <Clear className="icon icon-undone" />
      </MuiTooltip>
    ),
  };

  const action = () => {
    console.log("Presionaste nuevo");
  };

  if (1 === 2) {
    return (
      <MessageEmpty
        title={"Metas Actuales"}
        subtitle={"No hay registros disponibles"}
        description={"Monitore los avances de tus grupos,crea nuevas metas por diferentes parameteros"}
        actionText={"crear nueva meta"}
        action={action}
      />
    );
  }

  const getPriority = priority => {
    return (
      <StyledRating
        max={2}
        name="customized-color"
        defaultValue={priority}
        precision={1}
        icon={<Notifications fontSize="inherit" />}
        readOnly
      />
    );
  };

  return (
    <GoalsChartDirectorStyled>
      <h3>Pendientes</h3>
      <div className="divider"></div>

      {response.results.map((item, index) => {
        // const { progress, finalgoal } = item;
        return (
          <div key={index}>
            <Grid container className="" style={{ marginBottom: 10 }}>
              <Grid item xs={3}>
                <p className="titlegroup">{item.name}</p>
                {/* <p className="subtitle">grupo</p> */}
              </Grid>

              <Grid item xs={3}>
                <p className="titlegroup">{item.totalPendings}</p>
                <p className="subtitle"> Completos</p>
              </Grid>

              <Grid item xs={3}>
                <p className="titlegroup">{item.totalCustomPayments}</p>
                <p className="subtitle"> Incompletos</p>
              </Grid>

              <Grid item xs={3}>
                <p className="titlegroup">{Number(item.totalCustomPayments) + Number(item.totalPendings)}</p>
                <p className="subtitle">Total</p>
              </Grid>
            </Grid>
            {groupId && index === 0 && <div className="divider" />}

            <div className="divider" />
          </div>
        );
      })}

      {/* Map sobre pendientes de ejecutivos */}
      {groupId && (
        <>
          <h3>Pendientes por ejecutivos</h3>
          {responseUsers.results.map((item, index) => {
            // const { progress, finalgoal } = item;
            return (
              <div key={index} onClick={() => console.log()}>
                <Grid container className="" style={{ marginBottom: 10 }}>
                  <Grid item xs={2} lg={1}>
                    {getPriority(item.priority)}
                    <p className="subtitle">Prioridad</p>
                  </Grid>

                  <Grid item xs={2} lg={1}>
                    <p className="titlegroup">{renderIsDone[item.isdone]}</p>
                    <p className="subtitle">Estado</p>
                  </Grid>

                  <Grid item xs={2} lg={2}>
                    <div className="titlegroup">{renderStatus[item.status]}</div>
                    <p className="subtitle">{dayjs(item.updatedAt).format("MMMM DD, YYYY")}</p>
                  </Grid>

                  <Grid item xs={2} lg={3}>
                    <p className="titlegroup">{item.ejecutive.username}</p>
                    <p className="subtitle"> {item.ejecutive.fullname}</p>
                  </Grid>

                  <Grid item xs={2} lg={3}>
                    <p className="titlegroup">{item.subject}</p>
                    <p className="subtitle"> {item.description}</p>
                  </Grid>

                  <Grid item xs={1}>
                    <p className="titlegroup">{renderNotifyBy[item.notify_by]}</p>
                  </Grid>
                </Grid>
                <div className="divider" />
              </div>
            );
          })}
        </>
      )}
    </GoalsChartDirectorStyled>
  );
}

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
  }
  .title {
    color: #495057;
    font-weight: bold;
    font-size: 15px;
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
  .icon {
    :hover {
      cursor: help;
    }
    &-done {
      color: green;
    }
    &-undone {
      color: red;
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
