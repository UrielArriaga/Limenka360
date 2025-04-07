import { Avatar, Box, CircularProgress, Divider, Grid, Tooltip } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { URL_SPACE } from "../../../../services/api";
import RequestDirectorDashboard from "../../../../services/director_dashboard";
import { useDispatch, useSelector } from "react-redux";
import { CompareArrows } from "@material-ui/icons";
import { userSelector } from "../../../../redux/slices/userSlice";
import {
  Table,
  TableBody,
  TableComponentStyled,
  TableData,
  TableDataId,
  TableDataSettingsColumn,
  TableHead,
  TableHeadIdColumn,
  TableRowBody,
  TableRowHead,
} from "./styles";
import { dashboardDirectorSelector, setGroupGlobalGroup } from "../../../../redux/slices/dashboardDirector";
import { formatNumber, formatNumberNoSymbol } from "../../../../utils";
import useFetch from "../../../../hooks/useFetch";
import Link from "next/link";
import { useRouter } from "next/router";

export default function SectionResumeDirector({ startDate, finishDate }) {
  const router = useRouter();
  const { company, groupId } = useSelector(userSelector);
  const {} = useSelector(dashboardDirectorSelector);
  const apiDirector = new RequestDirectorDashboard(startDate, finishDate);
  const { groupSelected, startDateGlobal, finishDateGlobal } = useSelector(dashboardDirectorSelector);
  const dispatch = useDispatch();
  const [groups, setGroups] = useState([]);
  const colors = { primaryColor: "red" };

  const createQuery = (type, startDateGlobal, finishDateGlobal) => {
    const commonParams = {
      count: 1,
      limit: 0,
    };
    switch (type) {
      case "p":
        return {
          ...commonParams,
          where: {
            isoportunity: false,
            isclient: false,
            ejecutive: {
              companyId: company,
            },
            createdAt: {
              $gte: startDateGlobal,
              $lte: finishDateGlobal,
            },
          },
        };
      case "o":
        return {
          ...commonParams,
          where: {
            isoportunity: true,
            isclient: false,
            ejecutive: {
              companyId: company,
            },
            oportunityAt: {
              $gte: startDateGlobal,
              $lte: finishDateGlobal,
            },
          },
        };

      case "c":
        return {
          ...commonParams,
          where: {
            isoportunity: true,
            isclient: true,
            ejecutive: {
              companyId: company,
            },
            clientat: {
              $gte: startDateGlobal,
              $lte: finishDateGlobal,
            },
          },
        };

      case "a":
        return {
          ...commonParams,
          where: {
            prospect: {
              ejecutive: {
                companyId: company,
              },
            },
            createdAt: {
              $gte: startDateGlobal,
              $lte: finishDateGlobal,
            },
          },
        };

      case "g":
        return {
          ...commonParams,
          where: {
            companyId: company,
          },
        };

      case "e":
        return {
          ...commonParams,
          where: {
            companyId: company,
            roleId: "62d94hH7xnfeqrfYLLDSKAtR",
          },
        };
      case "ge":
        return {
          ...commonParams,
          where: {
            companyId: company,
            roleId: "62do8QFNPJ7UORQiM8755n64",
          },
        };
    }
  };

  const { data: resProspects, isFetching: isFetchingProspects } = useFetch({
    path: "prospects",
    refetch: startDateGlobal,
    params: createQuery("p", startDateGlobal, finishDateGlobal),
  });

  const { data: resOportunities, isFetching: isFetchingOportunities } = useFetch({
    path: "prospects",
    refetch: startDateGlobal,
    params: createQuery("o", startDateGlobal, finishDateGlobal),
  });

  const { data: resClients, isFetching: isFetchingCustomers } = useFetch({
    path: "prospects",
    refetch: startDateGlobal,
    params: createQuery("c", startDateGlobal, finishDateGlobal),
  });

  const { data: resQuotes, isFetching: isFetchingQuotes } = useFetch({
    path: "oportunities",
    refetch: startDateGlobal,
    params: createQuery("a", startDateGlobal, finishDateGlobal),
  });

  const { data: resGroups, isFetching: isFetchingGroups } = useFetch({
    path: "groups",
    refetch: startDateGlobal,
    params: createQuery("g", startDateGlobal, finishDateGlobal),
  });

  const { data: resExecutive, isFetching: isFetchingEjecutives } = useFetch({
    path: "ejecutives",
    refetch: startDateGlobal,
    params: createQuery("e", startDateGlobal, finishDateGlobal),
  });
  const { data: resManager, isFetching: isFetchingManager } = useFetch({
    path: "ejecutives",
    refetch: startDateGlobal,
    params: createQuery("ge", startDateGlobal, finishDateGlobal),
  });

  return (
    <SectionResumeDirectorStyled>
      <h3>Resumen General</h3>
      <div className="divider"></div>
      <CardResume title={"Prospectos"} customclass="p" total={resProspects.count} isFetching={isFetchingProspects} />
      <CardResume
        title={"Oportunidades"}
        customclass="o"
        total={resOportunities.count}
        isFetching={isFetchingOportunities}
      />
      <CardResume title={"Clientes"} customclass="c" total={resClients.count} isFetching={isFetchingCustomers} />
      <CardResume
        title={"Cotizaciones Activas"}
        total={resQuotes.count}
        customclass="a"
        isFetching={isFetchingQuotes}
      />
      <CardResume title={"Grupos"} customclass="g" total={resGroups.count} isFetching={isFetchingGroups} />
      <CardResume title={"Ejecutivos"} customclass="e" total={resExecutive.count} isFetching={isFetchingEjecutives} />
      <CardResume title={"Gerentes"} customclass="ge" total={resManager.count} isFetching={isFetchingManager} />
      <Box height={2} bgcolor="#ecedee" mt={2} />
      {/* <p
        className="showGeneral"
        onClick={() => {
          router.push("/dashboard/vistageneral");
        }}
      >
        Ver Vista General
      </p> */}
    </SectionResumeDirectorStyled>
  );
}

const CardResume = ({ title, customclass, total = 0, redirectTo, isFetching }) => {
  return (
    <div className={`card ${customclass}`}>
      <div className="card__leftside">
        <Avatar className="avatar">{customclass.toUpperCase()}</Avatar>
      </div>
      <div className="card__center">
        <div className="column">
          <p className="title">{title}</p>
          {title !== "Gerentes" && title !== "Cotizaciones Activas" && (
            <Link href={`/director/${title.toLowerCase()}`}>
              <a className="subtitle">Ver todos los {title}</a>
            </Link>
          )}
          {title === "Cotizaciones Activas" && (
            <Link href={`/director/oportunidades`}>
              <a className="subtitle">Ver todos las {title}</a>
            </Link>
          )}
        </div>
      </div>

      <div className="card__rigthside">
        {isFetching && <CircularProgress size={20} className="loader" />}

        {!isFetching && <p className="total">{formatNumberNoSymbol(total)}</p>}
      </div>
    </div>
  );
};
const SectionResumeDirectorStyled = styled.div`
  min-height: 400px;
  height: 500px;
  overflow-y: scroll;
  background-color: #fff;
  box-shadow: 0px 3px 1px -2px rgb(0 0 0 / 20%), 0px 2px 2px 0px rgb(0 0 0 / 14%), 0px 1px 5px 0px rgb(0 0 0 / 12%);
  padding-left: 10px;
  padding: 14px;

  ::-webkit-scrollbar {
    width: 6px;
    height: 6px;
  }
  ::-webkit-scrollbar-track {
    -webkit-box-shadow: inset 0 0 6px rgb(166 164 164 / 20%);
  }
  ::-webkit-scrollbar-thumb {
    -webkit-box-shadow: inset 0 0 20px #585858;
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

  .namegroup {
    text-transform: capitalize;
    color: #878a99;
    cursor: pointer;
    &:hover {
      text-decoration: underline;
      color: #424242;
    }
  }

  .totalamount {
    color: #878a99;
  }

  .card {
    display: flex;
    align-items: center;
    margin-bottom: 20px;
    &__leftside {
      margin-right: 30px;

      .avatar {
        background-color: #44c9e2;
      }
    }

    &__center {
      width: 75%;

      .column {
      }
      .title {
        color: #495a7f;
        font-weight: bold;
      }
      .subtitle {
        color: #757575;
        font-size: 12px;
        cursor: pointer;
        &:hover {
          text-decoration: underline;
        }
      }
    }

    &__rigthside {
      color: #495a7f;
      font-weight: bold;
      font-size: 18px;
    }
  }

  .p .avatar {
    background-color: #44c9e2;
  }

  .o .avatar {
    background-color: #87c52e;
  }
  .c .avatar {
    background-color: #6b34bb;
  }
  .a .avatar {
    background-color: #f50057;
  }
  .g .avatar {
    background-color: #dd2c00;
  }
  .e .avatar {
    background-color: #616161;
  }
  .manager .avatar {
    background-color: #44c9e2;
  }
  .showGeneral {
    color: #616161;
    font-size: 14px;
    text-align: right;
    margin-top: 10px;
    cursor: pointer;
    &:hover {
      text-decoration: underline;
    }
  }
`;
