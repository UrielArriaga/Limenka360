import React from "react";
import clsx from "clsx";

export default function TableHeader({
  heads,
  mainColumn,
  isSelectable,
  orderBy,
  setOrderBy,
  paginationData,
  toggleSelectAll,
}) {
  const handleSort = (head) => {
    if (head?.orderby != null && setOrderBy) {
      paginationData?.handlePage(1);
      setOrderBy((prev) =>
        prev === head.orderby ? head.orderby.slice(1) : head.orderby
      );
    }
  };

  return (
    <thead>
      <tr>
        {isSelectable && (
          <th className="tableHead tableHead--isselectable">
            <input
              type="checkbox"
              style={{ marginLeft: 4 }}
              onChange={(e) => toggleSelectAll(e.target.checked)}
            />
          </th>
        )}

        {heads.map((head, index) => (
          <th
            key={index}
            className={clsx("tableHead", {
              "tableHead--main": head.headText === mainColumn,
              "tableHead--clickable": orderBy && head.orderby,
            })}
            onClick={() => handleSort(head)}
          >
            <div style={{ display: "flex" }}>
              {head.headText}
              {orderBy &&
                (orderBy === head.orderby ||
                  orderBy === head.orderby?.slice(1)) && (
                  <div style={{ marginLeft: 5 }}>
                    {orderBy.includes("-") ? <span>↓</span> : <span>↑</span>}
                  </div>
                )}
            </div>
          </th>
        ))}

        {/* Acciones columna extra */}
        {/* <th className="tableHeadActions">Acciones</th> */}
      </tr>
    </thead>
  );
}
