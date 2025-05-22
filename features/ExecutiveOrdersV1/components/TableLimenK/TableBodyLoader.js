import { Skeleton } from "@material-ui/lab";
import React from "react";

export default function TableBodyLoader({
  heads,
  isSelectable,
  rowsLoader = 20,
}) {
  return (
    <tbody>
      {[...Array(rowsLoader).keys()].map((item, index) => {
        return (
          <tr
            key={index}
            className={`tableRow ${item?.classname && row.classname} 
            `}
          >
            {isSelectable && (
              <td className="tableData tableDataSelect">
                <div className="tableDataContainer">
                  <input type="checkbox" disabled />
                </div>
              </td>
            )}
            {heads.map((item, index) => {
              return (
                <td className="tableData" key={index}>
                  <Skeleton style={{ width: "100%", height: "100%" }} />
                </td>
              );
            })}

            <td className="tableData">
              <Skeleton style={{ width: "100%", height: "100%" }} />
            </td>
          </tr>
        );
      })}
    </tbody>
  );
}
