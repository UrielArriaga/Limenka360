import { Avatar, Grid, Tooltip } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { URL_SPACE } from "../../../../services/api";
import RequestDirectorDashboard from "../../../../services/director_dashboard";
import { useDispatch, useSelector } from "react-redux";
import { CompareArrows } from "@material-ui/icons";

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
import { formatNumber } from "../../../../utils";

export default function TableGroupsByCompany({ startDate, finishDate }) {
  const apiDirector = new RequestDirectorDashboard(startDate, finishDate);
  const { groupSelected } = useSelector(dashboardDirectorSelector);
  const dispatch = useDispatch();
  const [groups, setGroups] = useState([]);

  const colors = { primaryColor: "red" };
  useEffect(() => {
    getGroupsByCompany();
  }, [startDate, finishDate]);

  const getGroupsByCompany = async () => {
    try {
      let res = await apiDirector.getGroups();
      setGroups(res.data.results);
    } catch (error) {}
  };

  return (
    <TableGroupsCompanyStyled>
      <h3>Tabla de grupos</h3>
      <div className="divider"></div>
      {groups.map((item, index) => {
        return (
          <Grid
            container
            key={item.id}
            onClick={() => {
              dispatch(setGroupGlobalGroup({ item }));
            }}
          >
            <Grid item md={6}>
              <p className="namegroup">{item.name}</p>
            </Grid>

            <Grid item md={4}>
              <p className="totalamount">{formatNumber(item.totalAmount)}</p>
            </Grid>

            <Grid item md={2}>
              <Tooltip title="Comparar con equipo">
                <CompareArrows />
              </Tooltip>
            </Grid>
          </Grid>
        );
      })}
    </TableGroupsCompanyStyled>
  );
}
const TableGroupsCompanyStyled = styled.div`
  min-height: 400px;
  max-height: 500px;
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
`;
