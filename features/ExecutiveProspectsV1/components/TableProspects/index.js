import React, { useEffect, useState } from "react";
import { Pagination } from "@material-ui/lab";
import { Button } from "@material-ui/core";
import { Table, TableWrapper } from "./styles";
import MenuActions from "./Menu";
import TableBodyLoader from "./TableBodyLoader";
import { normalizeHeads } from "./utils";
import clsx from "clsx";
import TableHeader from "./TableHeader";

// Utils
const getCellValue = (row, headData, headsParam) =>
  typeof headsParam[0] === "object"
    ? row[headData.headNormalize]
    : row[headData.headText];

const useTableGeneral = (headsParam, customHeads) => {
  const [heads, setHeads] = useState([]);

  useEffect(() => {
    if (customHeads || typeof headsParam[0] === "object") {
      setHeads(headsParam);
    } else {
      setHeads(normalizeHeads(headsParam, "id"));
    }
  }, [headsParam]);

  return { heads };
};

export default function TableProspects({
  data = [],
  isSelectable = false,
  actions = false,
  heads: rawHeads = [],
  isLoading = false,
  customHeads,
  mainColumn,
  customColumns,
  typeActions = "default",
  typeTable = "default",
  styles = {},
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
  const { heads } = useTableGeneral(rawHeads, customHeads);

  const isSelected = (rowId) =>
    selectedRows.some((selected) => selected.id === rowId);

  const toggleSelectRow = (row, checked) => {
    if (checked) {
      setSelectedRows([...selectedRows, row]);
    } else {
      setSelectedRows(selectedRows.filter((r) => r.id !== row.id));
    }
  };

  const toggleSelectAll = (checked) => {
    setSelectedRows(checked ? data : []);
  };

  const handleSort = (head) => {
    if (head?.orderby != null && setOrderBy) {
      paginationData?.handlePage(1);
      setOrderBy((prev) =>
        prev === head.orderby ? head.orderby.slice(1) : head.orderby
      );
    }
  };

  const renderCellContent = (row, headData, index) => {
    if (
      customColumns &&
      (customColumns[headData.headText] ||
        customColumns[headData.headNormalize])
    ) {
      const customComp =
        customColumns[headData.headNormalize] ||
        customColumns[headData.headText];
      return customComp.component(row, headData, index % 2 === 0, index === 0);
    }

    if (
      (mainColumn === headData.headText ||
        mainColumn === headData.headNormalize) &&
      (onRowMainColumnClick || onMouseEnter)
    ) {
      return (
        <div
          className="tableDataId"
          onClick={() => onRowMainColumnClick?.(row)}
          onMouseEnter={() => onMouseEnter?.(row)}
        >
          <div className="tableDataContainer">
            {getCellValue(row, headData, rawHeads)}
          </div>
        </div>
      );
    }

    return (
      <div
        className={clsx("tableDataContainer", {
          "tableDataContainer--flex": headData.iconComponent,
        })}
      >
        {headData.iconComponent && (
          <div style={{ marginRight: "10px", color: styles.headerColor }}>
            {headData.iconComponent}
          </div>
        )}
        {getCellValue(row, headData, rawHeads)}
      </div>
    );
  };

  return (
    <TableWrapper
      styles={{ ...styles, typeTable }}
      fixedHeader={selectedRows.length > 0}
    >
      {selectedRows.length > 0 && (
        <div className="tableHeadSelectedRows">
          {isSelectable && (
            <p className="tableHeadSe|lectedRows__text">
              {selectedRows.length > 1 ? "Seleccionados" : "Seleccionado"} (
              {selectedRows.length})
            </p>
          )}
          {actionsSelected.length > 0 && (
            <div
              style={{ marginLeft: 20, display: "flex", alignItems: "center" }}
            >
              {actionsSelected.map((action, index) => (
                <Button
                  key={index}
                  onClick={() => action.action(selectedRows)}
                  className="btnactonselected"
                >
                  {action.name}
                </Button>
              ))}
            </div>
          )}
        </div>
      )}

      <Table
        styles={{ ...styles, typeTable }}
        fixedHeader={selectedRows.length > 0}
      >
        <TableHeader
          heads={heads}
          mainColumn={mainColumn}
          isSelectable={isSelectable}
          orderBy={orderBy}
          setOrderBy={setOrderBy}
          paginationData={paginationData}
        />

        {isLoading ? (
          <TableBodyLoader
            rowsLoader={rowsLoader}
            heads={heads}
            isSelectable={isSelectable}
          />
        ) : (
          <tbody>
            {data.map((row, rowIndex) => (
              <tr
                key={rowIndex}
                className={clsx("tableRow", {
                  "tableRow--clickable": !!onRowClick,
                  [row?.classname]: !!row?.classname,
                })}
                onClick={() => onRowClick?.(row)}
              >
                {isSelectable && (
                  <td
                    className="tableData tableDataSelect"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <div className="tableDataContainer">
                      <input
                        type="checkbox"
                        checked={isSelected(row.id)}
                        onChange={(e) => toggleSelectRow(row, e.target.checked)}
                        onClick={(e) => e.stopPropagation()}
                      />
                    </div>
                  </td>
                )}

                {heads.map((headData, colIndex) => (
                  <td className="tableData" key={colIndex}>
                    {renderCellContent(row, headData, colIndex)}
                  </td>
                ))}

                {actions && (
                  <MenuActions
                    keys={rowIndex}
                    pm={styles.primaryColor}
                    rowItem={row}
                    options={actions}
                    typeActions={typeActions}
                  />
                )}
              </tr>
            ))}
          </tbody>
        )}
      </Table>

      <div className="pagination">
        {paginationData && paginationData.total > 2 && (
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
