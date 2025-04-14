import { Pagination } from "@material-ui/lab";
import React, { useEffect, useState } from "react";
import { Button } from "@material-ui/core";
import MenuActions from "./Menu";
import { Table, TableWrapper } from "./styles";
import TableBodyLoader from "./TableBodyLoader";
import { normalizeHeads } from "./utils";

export default function TableLimenkaGeneral({
  data = [],
  isSelectable = false,
  showActionsSelected = false,
  actions = false,
  heads: headsParam = [],
  isLoading = false,
  customHeads,
  mainColumn,
  customColumns,
  typeActions = "default",
  typeTable = "default",
  styles = initalConfig,
  onRowClick = null,
  onRowMainColumnClick = null,
  onMouseEnter = null,
  paginationData,
  orderBy = null,
  setOrderBy = null,
  rowsLoader = 20,
  selectedRows = [],
  setSelectedRows = () => {},
  actionsSelected = [],
}) {
  const { heads } = useTableGeneral(headsParam, customHeads);
  // const [selectedRows, setSelectedRows] = useState([]);

  const isColumnMain = (column) => column === mainColumn && "tableHead--main";

  return (
    <TableWrapper
      styles={{
        ...styles,
        typeTable: typeTable,
      }}
      fixedHeader={selectedRows.length > 0}
    >
      {selectedRows.length > 0 && (
        <div className="tableHeadSelectedRows">
          {isSelectable && (
            <p className="tableHeadSelectedRows__text">
              {selectedRows.length > 1 ? "Seleccionados" : "Seleccionado"} (
              {selectedRows.length})
            </p>
          )}

          {actionsSelected.length > 0 && (
            <div
              style={{ marginLeft: 20, display: "flex", alignItems: "center" }}
            >
              {actionsSelected.map((action, index) => {
                return (
                  <Button
                    onClick={() => action.action(selectedRows)}
                    className="btnactonselected"
                  >
                    {action.name}
                  </Button>
                  // <IconButton onClick={() => action.action(selectedRows)}>{action.icon}</IconButton>
                  // <div
                  //   key={index}
                  //   onClick={() => action.action(selectedRows)}
                  //   style={{
                  //     display: "flex",
                  //     alignItems: "center",
                  //   }}
                  // >
                  //   <p>{action.title}</p>
                  //   {action.icon}
                  // </div>
                );
              })}
            </div>
          )}
        </div>
      )}
      <Table
        styles={{
          ...styles,
          typeTable: typeTable,
        }}
        fixedHeader={selectedRows.length > 0}
      >
        <thead>
          <tr className={`${selectedRows.length > 0 && "tableHiade"}`}>
            {isSelectable && (
              <th className={`tableHead tableHead--isselectable   `}>
                <input
                  type="checkbox"
                  style={{ marginLeft: 4 }}
                  onChange={(e) => {
                    if (e.target.checked) {
                      setSelectedRows(data);
                    } else {
                      setSelectedRows([]);
                    }
                  }}
                />
              </th>
            )}

            {heads?.map((head, index) => {
              return (
                <th
                  key={index}
                  className={`tableHead ${isColumnMain(head.headText)} 
                  ${orderBy && head?.orderby !== null && "tableHead--clickable"}
                  `}
                  onClick={() => {
                    orderBy &&
                      head?.orderby != null &&
                      paginationData.handlePage(1);
                    if (head?.orderby != null)
                      setOrderBy &&
                        setOrderBy((prev) =>
                          prev === head.orderby
                            ? `${head.orderby.slice(1)}`
                            : `${head.orderby}`
                        );
                  }}
                  // style={{ width: head?.width ? head.width : styles.widthColumn }}
                >
                  <div style={{ display: "flex" }}>
                    {head.headText}
                    {orderBy &&
                      (orderBy === head.orderby ||
                        orderBy === head.orderby?.slice(1)) && (
                        <div
                          style={{
                            marginLeft: 5,
                          }}
                        >
                          {orderBy.includes("-") ? (
                            <span>↓</span>
                          ) : (
                            <span>↑</span>
                          )}
                        </div>
                      )}
                  </div>
                </th>
              );
            })}

            {actions && <th className={`tableHeadActions`}>Acciones</th>}
          </tr>
        </thead>

        {isLoading && (
          <TableBodyLoader
            rowsLoader={rowsLoader}
            heads={heads}
            isSelectable={isSelectable}
          />
        )}

        {!isLoading && (
          <tbody>
            {data.map((row, index) => (
              <tr
                key={index}
                className={`tableRow ${row?.classname && row.classname} 
               ${onRowClick && "tableRow--clickable"}
              `}
                onClick={() => onRowClick && onRowClick(row)}
              >
                {isSelectable && (
                  <td
                    className="tableData tableDataSelect"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <div className="tableDataContainer">
                      <input
                        type="checkbox"
                        checked={selectedRows.some(
                          (ce, index) => ce.id === row.id
                        )}
                        onChange={(e) => {
                          e.stopPropagation();
                          if (e.target.checked) {
                            setSelectedRows([...selectedRows, row]);
                          } else {
                            setSelectedRows(
                              selectedRows.filter(
                                (ce, index) => ce.id !== row.id
                              )
                            );
                          }
                        }}
                        onClick={(event) => {
                          event.stopPropagation();
                        }}
                        // onChange={event => setSelectedRows([...selectedRows, row.id])}
                        value={selectedRows.includes(row.id)}
                      />
                    </div>
                  </td>
                )}

                {heads?.map((headData, index) => {
                  if (
                    customColumns &&
                    (customColumns[headData.headText] ||
                      customColumns[headData.headNormalize])
                  ) {
                    return (
                      <td className="tableData" key={index}>
                        <div className="tableDataContainer">
                          {typeof headsParam[0] === "object"
                            ? customColumns[headData.headNormalize]?.component(
                                row,
                                headData,
                                index % 2 === 0,
                                index === 0
                              )
                            : customColumns[headData.headText].component(
                                row,
                                headData,
                                index % 2 === 0,
                                index === 0
                              )}
                        </div>
                      </td>
                    );
                  }

                  if (
                    (mainColumn === headData.headText ||
                      mainColumn === headData.headNormalize) &&
                    (onRowMainColumnClick || onMouseEnter)
                  ) {
                    return (
                      <td
                        key={index}
                        className="tableDataId"
                        onClick={() =>
                          onRowMainColumnClick && onRowMainColumnClick(row)
                        }
                        onMouseEnter={() => onMouseEnter && onMouseEnter(row)}
                      >
                        <div className="tableDataContainer">
                          {typeof headsParam[0] === "object"
                            ? row[headData.headNormalize]
                            : row[headData.headText]}
                        </div>
                      </td>
                    );
                  }

                  return (
                    <td className="tableData" key={index}>
                      <div
                        className={`tableDataContainer ${
                          headData.iconComponent && "tableDataContainer--flex"
                        }`}
                      >
                        {headData.iconComponent && (
                          <div
                            style={{
                              marginRight: "10px",
                              color: styles.headerColor,
                            }}
                          >
                            {headData.iconComponent}
                          </div>
                        )}

                        {/* if (customHeads || typeof headsParam[0] === "object") return setHeads(headsParam); */}

                        {typeof headsParam[0] === "object"
                          ? row[headData.headNormalize]
                          : row[headData.headText]}
                        {/* {row[headData.headText]} */}
                      </div>
                    </td>
                  );
                })}

                {actions && (
                  <MenuActions
                    keys={index}
                    pm={styles.primaryColor}
                    rowItem={row}
                    options={actions}
                    typeActions={typeActions}
                  />
                )}
                {/* {typeActions !== "default" && actions && <td>{renderActions(typeActions, row, actions)}</td>} */}
              </tr>
            ))}
          </tbody>
        )}
      </Table>

      <div className="pagination">
        {paginationData && paginationData.total > 20 && (
          <Pagination
            variant="outlined"
            count={Math.ceil(paginationData.total / paginationData.limit)}
            onChange={(e, value) => paginationData.handlePage(value)}
            size="small"
            page={paginationData.page}
            color="primary"
          />
        )}
      </div>
    </TableWrapper>
  );
}

const useTableGeneral = (headsParam, customHeads) => {
  const [heads, setHeads] = useState([]);

  useEffect(() => {
    if (customHeads || typeof headsParam[0] === "object")
      return setHeads(headsParam);
    let normalizedHeads = normalizeHeads(headsParam, "id");
    setHeads(normalizedHeads);
  }, [headsParam]);
  return {
    heads,
  };
};

let initalConfig = {
  // widthColumnId: 200,
  // widthColumn: 100,
  // minHeight: 500,
  // headerColor: "#212529",
  // headerColorSecondary: "#5d6873",
  // headerTextColor: "#ffff",
  // primaryColor: "#f2f2f2",
  // secondaryColor: "#fff",
  // hoverColor: "#c9cfd4",
  // nthChild: "#e0e0e0",
  // typeTable: "default",

  widthColumnId: 100,
  widthColumn: 150,
  minHeight: 500,
  headerColor: "#FFFFFF",
  headerColorSecondary: "#fff",
  headerTextColor: "#9e9e9e",
  primaryColor: "#000",
  secondaryColor: "#fff",
  hoverColor: "#c9cfd4",
  nthChild: "#fff",
  borderColor: "#e0e0e0",
  typeTable: "border",
};

let initalConfigOrder = {
  widthColumnId: 200,
  widthColumn: 150,
  minHeight: 500,
  headerColor: "#FFFFFF",
  headerColorSecondary: "#fff",
  headerTextColor: "#9e9e9e",
  primaryColor: "#000",
  secondaryColor: "#fff",
  hoverColor: "#ffff",
  nthChild: "#fff",
  borderColor: "#e0e0e0",
  typeTable: "border",
};

// Orden Ascendente
// Significado: De la fecha más antigua a la más reciente.
// Ejemplo: 01/01/2020, 01/06/2020, 01/01/2021, 01/06/2021.
// Descripción sencilla: Las fechas se ordenan empezando por la más lejana en el tiempo y avanzando hacia la más cercana al presente.

// Orden Descendente
// Significado: De la fecha más reciente a la más antigua.
// Ejemplo: 01/06/2021, 01/01/2021, 01/06/2020, 01/01/2020.
// Descripción sencilla: Las fechas se ordenan comenzando por la más cercana al presente y retrocediendo hacia la más lejana en el tiempo.
