import React from "react";
import styled from "styled-components";
import { formatNumber } from "../../../../utils";
import ProgressGoal from "../../molecules/ProgressGoal";
import { TableHeadColumn } from "../../molecules/TableHeadComponent/styles";
import {
  Table,
  TableBody,
  TableComponentStyled,
  TableData,
  TableHead,
  TableRowBody,
  TableRowHead,
} from "../TableGoals/styles";

export default function TableGoalsExecutivePage({ goals }) {
  // const colors = { primaryColor: "#407aff", secondaryColor: "#407aff" };
  const colors = { primaryColor: "#f3f3f9", secondaryColor: "#f3f3f9" };

  return (
    <TableGoalsExecutivePageStyled>
      <h3>Metas</h3>
      <TableComponentStyled>
        <Table>
          <TableHead>
            <TableRowHead {...colors}>
              <TableHeadColumn>Nombre de la meta</TableHeadColumn>
              <TableHeadColumn>Avance</TableHeadColumn>
              <TableHeadColumn>Progreso</TableHeadColumn>
            </TableRowHead>
          </TableHead>

          <TableBody>
            {goals.map((item, index) => {
              return (
                <TableRowBody key={item.id}>
                  <TableData>{item.goal?.goalname?.name}</TableData>

                  <TableData>
                    {item.identifier === "count" && (
                      <div className="goaltotal">
                        <p>{item.progress}</p>
                        <p className="divider"> de </p>
                        <p>{item?.finalgoal}</p>
                      </div>
                    )}
                    {item.identifier === "amount" && (
                      <div className="goaltotal">
                        <p>{formatNumber(item.progress?.toFixed(2))}</p>
                        <p className="divider"> de </p>
                        <p>{formatNumber(item?.finalgoal?.toFixed(2))}</p>
                      </div>
                    )}
                  </TableData>
                  <TableData>
                    <div>
                      <ProgressGoal item={item} />
                    </div>
                  </TableData>
                </TableRowBody>
              );
            })}
          </TableBody>
        </Table>
      </TableComponentStyled>
    </TableGoalsExecutivePageStyled>
  );
}
const TableGoalsExecutivePageStyled = styled.div`
  padding: 10px;
  height: 450px;
  border-radius: 8px;
  overflow-y: scroll;
  /* border: 1px solid #000; */
  background-color: #ffff;
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
  h3 {
    margin-bottom: 20px;
  }
`;
