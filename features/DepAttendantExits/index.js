import React, { useState } from "react";
import useLogisticsFilters from "../../hooks/useLogisticsFilters";
import useDepAttendantExits from "./hooks/useDepAttendantExits";
import LogisticsFilters from "../../components/LogisticsFilters";
import { Close, Search, UpdateSharp } from "@material-ui/icons";
import { Button, Fade, Grid, IconButton } from "@material-ui/core";
import { filtersExits } from "./data";
import TableLimenkaGeneral from "../../components/TableLimenkaGeneral";
import ListExits from "./components/ListExits";
import { DepAttendantExitsStyles } from "./styles";
import PreviewPurchaseExit from "./components/PreviewPurchaseExit";
import useDepAttendantExitsFiles from "./hooks/useDepAttendantExitsFiles";
import FilesUpload from "../../componentx/common/DirLog/FilesUpload";
import useGenerateFiles from "./hooks/useGenerateFiles";
import ModalFileGenerate from "./components/ModalFileGenerate";
import ActiveFilters from "./components/ActiveFilters";
import useFilters from "./hooks/useFiltersExits";

export default function DepAttendantExits() {
  const { activeFilters, setActiveFilters, handleOnChangeFilter } = useFilters(filtersExits);
  const {
    count,
    keyword,
    setKeyword,
    isOpenPreview,
    tableData,
    isFetchingData,
    handleClickDeleteKeyWord,
    handleOnChangeKeyWord,
    handleOnClickClosePreview,
    handleOnClickRow,
    isFetchingOrder,
    inventoryExitSelected,
    selectOrder,
    paginationDataTrackigs,
    infOrder,
    paginationData,
    handleClickRefetchData,
    updateStateData,
    updateStateProducts,
  } = useDepAttendantExits(activeFilters);

  const {
    openFiles,
    handleToggleFiles,
    paginationFiles,
    statesFiles,
    actionsFiles,
    handleOnClickArticle,
    articleSelected,
  } = useDepAttendantExitsFiles(inventoryExitSelected);

  const {
    groupNameOrder,
    articleToGenerateFile,
    openModalGenerateFile,
    toggleModalGenerateFile,
    handleOnClickGenerateData,
  } = useGenerateFiles(inventoryExitSelected);

  const newDate = { ...articleToGenerateFile, ...infOrder }
  return (
    <DepAttendantExitsStyles>
      <div className="header">
        <div className="header__title">
          <h4>
            Salidas<span>({count})</span>
          </h4>
        </div>
        <div className="header__filters">
       
          <div className="inputContainer">
            <Search className="inputContainer__icon" />
            <input
              defaultValue={keyword}
              onChange={e => handleOnChangeKeyWord(e)}
              className="inputContainer__input"
              placeholder="Buscar por folio, producto"
            />
            {keyword?.length > 3 && (
              <IconButton className="inputContainer__clean" onClick={() => handleClickDeleteKeyWord()}>
                <Close />
              </IconButton>
            )}
          </div>
          <LogisticsFilters filters={filtersExits} handleOnChangeFilter={handleOnChangeFilter} />
          <IconButton onClick={() => handleClickRefetchData()}>
            <UpdateSharp />
          </IconButton>
        </div>
      </div>

      <ActiveFilters activeFilters={activeFilters} setActiveFilters={setActiveFilters} />

      <div className="main">
        <Grid container>
          <Grid item md={isOpenPreview ? 3 : 12}>
            {isOpenPreview && (
              <ListExits
                orderSelected={inventoryExitSelected}
                data={tableData.data}
                onRowClick={item => handleOnClickRow(item)}
                rowsLoader={count >= 20 ? 20 : count}
                isLoading={isFetchingData}
                paginationData={{
                  ...paginationData,
                  total: count,
                }}
              />
            )}

            {!isOpenPreview && (
              <div className="containertable">
                <TableLimenkaGeneral
                  onRowClick={item => handleOnClickRow(item)}
                  typeTable="border"
                  isSelectable={true}
                  mainColumn={"Fecha"}
                  typeActions="icon"
                  heads={tableData.heads}
                  data={tableData.data}
                  rowsLoader={count >= 20 ? 20 : count}
                  isLoading={isFetchingData}
                  customColumns={tableData.customColumns}
                  actions={tableData.actions}
                  paginationData={{
                    ...paginationData,
                    total: count,
                  }}
                />
              </div>
            )}
          </Grid>

          {isOpenPreview && (
            <Fade in={isOpenPreview} timeout={500}>
              <Grid item md={9} className="preview">
                <PreviewPurchaseExit
                  handleOnClickClosePreview={handleOnClickClosePreview}
                  selectOrder={selectOrder}
                  isFetchingOrder={isFetchingOrder}
                  orderSelected={inventoryExitSelected}
                  infOrder={infOrder}
                  handleOnClickArticle={handleOnClickArticle}
                  handleOnClickGenerateData={handleOnClickGenerateData}
                />
              </Grid>
            </Fade>
          )}
        </Grid>
      </div>

      <ModalFileGenerate
        orderSelectedData={inventoryExitSelected}
        articleToGenerateFile={articleToGenerateFile}
        open={openModalGenerateFile}
        onClose={toggleModalGenerateFile}
        groupNameOrder={groupNameOrder}
        updateStateProducts={updateStateProducts}
        updateStateData={updateStateData}
        newDate={newDate}
      />

      <FilesUpload
        open={openFiles}
        handletoogle={handleToggleFiles}
        orderData={infOrder}
        articleData={articleSelected}
        statesFiles={statesFiles}
        actionsFiles={actionsFiles}
        paginationFiles={paginationFiles}
      />
    </DepAttendantExitsStyles>
  );
}
