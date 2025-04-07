import React, { useState } from "react";
import styled from "styled-components";
import { Skeleton } from "@material-ui/lab";

export default function TableLoader({ heads, tableType, view }) {
  return (
    <>
      {tableType == "general" && (
        <Table>
          <thead>
            <tr>
              {heads[view]?.map((item, index) => {
                return (
                  <TableHeader key={index} index={item.id} last={heads[view].length - 1 == index ? true : false}>
                    {item}
                  </TableHeader>
                );
              })}
            </tr>
          </thead>
          <tbody>
            <tr>
              <TableData>
                <Skeleton variant="text" />
              </TableData>
              <TableData>
                <Skeleton variant="text" />
              </TableData>
              <TableData>
                <Skeleton variant="text" />
              </TableData>
              <TableData>
                <Skeleton variant="text" />
              </TableData>
              <TableData last>
                <Skeleton variant="text" />
              </TableData>
            </tr>
            <tr>
              <TableData>
                <Skeleton variant="text" />
              </TableData>
              <TableData>
                <Skeleton variant="text" />
              </TableData>
              <TableData>
                <Skeleton variant="text" />
              </TableData>
              <TableData>
                <Skeleton variant="text" />
              </TableData>
              <TableData last>
                <Skeleton variant="text" />
              </TableData>
            </tr>
          </tbody>
        </Table>
      )}
      {tableType == "normal" && (
        <div>
          <Table>
            <thead>
              <tr>
                <TableHeader>Nombre</TableHeader>
                <TableHeader>Total</TableHeader>
              </tr>
            </thead>
            <tbody>
              <tr>
                <TableData>
                  <Skeleton variant="text" />
                </TableData>
                <TableData>
                  <Skeleton variant="text" />
                </TableData>
              </tr>
              <tr>
                <TableData>
                  <Skeleton variant="text" />
                </TableData>
                <TableData>
                  <Skeleton variant="text" />
                </TableData>
              </tr>
            </tbody>
          </Table>
        </div>
      )}
    </>
  );
}

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
  tr {
    background-color: #ffff;
    min-width: 250px;
    /* position: sticky; */
    /* cursor: pointer; */
    padding: 5px 10px;
  }
`;

const TableHeader = styled.th`
  /* border: 1px solid #ddd;   */
  background-color: #405189;
  color: #fff;
  padding: 8px;
  text-align: left;
  width: 30px;
`;

const TableData = styled.td`
  border: 1px solid #ddd;
  background-color: ${props => (props.bg ? props?.bg : "#f3f3f3")};
  padding: 8px;
  ${props => (props.last ? "min-width: 20px;" : "min-width: 250px;")}
  padding: 5px 10px;

  .action__icon {
    display: flex;
    justify-content: flex-end;

    svg {
      color: #405189;
      cursor: pointer;
    }
  }
`;
