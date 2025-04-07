import { Skeleton } from "@material-ui/lab";
import React from "react";

export default function LoaderTable() {
  return (
    <div className="sectionList__table">
      <table>
        <thead>
          <tr>
            <th style={{}}>
              <input type="checkbox" disabled={true} />
            </th>
            <th>Nombre del archivo</th>
            <th>Tipo de Archivo</th>
            <th>Fecha de Subida</th>
            <th>Subido por</th>
            <th>Acc.</th>
          </tr>
        </thead>

        <tbody>
          {Array.from({ length: 10 }).map((_, index) => (
            <tr>
              <td>
                <Skeleton variant="rectangular" width={40} height={20} />
              </td>
              <td>
                <Skeleton variant="rectangular" width="100%" height={20} />
              </td>
              <td>
                <Skeleton variant="rectangular" width="80px" height={20} />
              </td>
              <td>
                <Skeleton variant="rectangular" width="80px" height={20} />
              </td>
              <td>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Skeleton variant="circular" width={30} height={30} />
                  <Skeleton variant="text" width={50} height={20} />
                </div>
              </td>
              <td>
                <div className="row">
                  <Skeleton variant="rectangular" width={24} height={24} style={{ marginRight: 8 }} />
                  <Skeleton variant="rectangular" width={24} height={24} />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
