import React, { useEffect, useState } from "react";
import { Badge, IconButton } from "@material-ui/core";
import { Close, Cached, Search } from "@material-ui/icons";
import useActivities from "./hooks/useActivities";
import TableLimenkaGeneral from "../../components/TableLimenkaGeneral";
import { ActivitiesStyled } from "./styled";
import useModalExportFile from "./hooks/useModalExportFiles";
import ModalExportFileExcel from "../AdminManagerOrders/components/ModalExportFileExcel";
import useFilters from "../AdminManagerSales/hooks/useFilters";
import { filterActios } from "./data";
import Filters from "./components/Filters";
import ActiveFilters from "./components/ActiveFilters";
export default function AdminManagerActivities() {
  const { activeFilters, setActiveFilters, handleOnChangeFilter, filters } = useFilters(filterActios);
  const {
    handleOnChangeKeyWord,
    deleteKeyWord,
    handleOnClickRow,
    handleOnKeyEnter,
    orderBy,
    setOrderBy,
    keyword,
    totalActivities,
    setIsFetchingData,
    isFetchingData,
    refetchData,
    paginationData,
    tableData,
    dispatch,
  } = useActivities(activeFilters, setActiveFilters);
  const { modalExport, handleExportFile, rangeDate, setRangeDate } = useModalExportFile();
  return (
    <ActivitiesStyled>
      <div className="header">
        <div className="head">
          <div className="header__title">
            <h4>
              Actividades <span>({totalActivities})</span>
            </h4>
          </div>

          <div className="header__filters">
            <div className="inputContainer">
              <Search className="inputContainer__icon" />
              <input
                value={keyword}
                onChange={e => handleOnChangeKeyWord(e)}
                onKeyDown={e => handleOnKeyEnter(e)}
                className="inputContainer__input"
                placeholder="Buscar por Nombre."
              />

              {keyword.length > 3 && (
                <IconButton className="inputContainer__clean" onClick={() => deleteKeyWord()}>
                  <Close />
                </IconButton>
              )}
            </div>
            <Filters
              filters={filters}
              activeFilters={activeFilters}
              setActiveFilters={setActiveFilters}
              handleOnChangeFilter={handleOnChangeFilter}
              // handleOnChangeFilter={handleOnChangeFilter}
            />
            <IconButton className="icon" onClick={() => refetchData()}>
              <Badge overlap="rectangular" color="primary">
                <Cached />
              </Badge>
            </IconButton>
          </div>
        </div>
      </div>
      <ActiveFilters
        activeFilters={activeFilters}
        handleOnChangeFilter={handleOnChangeFilter}
        setActiveFilters={setActiveFilters}
      />
      <div className="main">
        <div className="containertable">
          <TableLimenkaGeneral
            onRowClick={item => handleOnClickRow(item)}
            mainColumn={"createdAt"}
            heads={tableData?.heads}
            isLoading={isFetchingData}
            data={tableData?.data}
            customColumns={tableData.customColumns}
            typeTable="border"
            typeActions="icon"
            orderBy={orderBy}
            setOrderBy={setOrderBy}
            rowsLoader={totalActivities >= 20 ? 20 : totalActivities || 20}
            paginationData={{
              ...paginationData,
              total: totalActivities,
            }}
          />
        </div>
      </div>

      <ModalExportFileExcel
        open={modalExport.open}
        handletoogle={modalExport.toggleModal}
        handleExportFile={handleExportFile}
        rangeDate={rangeDate}
        setRangeDate={setRangeDate}
      />
      <a onClick={() => modalExport?.toggleModal()} className="btn-flotante">
        Exportar Achivo
      </a>
    </ActivitiesStyled>
  );
}
