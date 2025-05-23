import { Fade, Grid, IconButton } from "@material-ui/core";
import { Cached, Close, Search } from "@material-ui/icons";
import React from "react";
import LogisticsFilters from "../../components/LogisticsFilters";
import TableLimenkaGeneral from "../../components/TableLimenkaGeneral";
import ListExits from "./components/ListExits";
import PreviewOutPut from "./components/PreviewOutPut";
import useMasterEntry from "./hooks/useMasterEntry";
import useMasterEntrys from "./hooks/useMasterEntrys";
import { DirLogSalidasStyled } from "./styles";
import { Button } from "@mui/material";
import { useRouter } from "next/router";
import useComments from "./hooks/useComments";

export default function MasterAdminEntries() {
  const router = useRouter();
  const {
    handleOnClickRow,
    handleOnClickClosePreview,
    handleOnChangeKeyWord,
    deleteKeyWord,
    setIsFetchingData,
    setexitSelected,
    keyword,
    orderBy,
    setOrderBy,
    exitSelected,
    totalExits,
    isFetchingData,
    isOpenPreview,
    paginationData,
    tableData,
    refetchData,
  } = useMasterEntrys();

  const { exitSelectedData, isFetchingOrder, productsExit, isFechingProduct, totalProductsExits } =
  useMasterEntry(exitSelected);
  const {
    commnents,
    isPosting,
    valueCommnet,
    handleOnChangeComment,
    handleOnSaveComment,
    handleOnSaveCommentAndTracking,
  } = useComments(exitSelected);
  return (
    <DirLogSalidasStyled>
      <div className="header">
        <div className="header__title">
          <h4>
            Entradas <span>({totalExits})</span>
          </h4>
        </div>

        <div className="header__filters">
          <div className="inputContainer">
            <Search className="inputContainer__icon" />

            <input
              value={keyword}
              onChange={e => handleOnChangeKeyWord(e)}
              className="inputContainer__input"
              placeholder="Buscar por folio"
            />
            {keyword.length > 3 && (
              <IconButton className="inputContainer__clean" onClick={() => deleteKeyWord()}>
                <Close />
              </IconButton>
            )}
          </div>

          {/* <LogisticsFilters /> */}

          <IconButton onClick={() => refetchData()}>
            <Cached />
          </IconButton>
        </div>
        <div className="button_Entries">
          <Button
            className="button"
            color="primary"
            onClick={() =>
              router.push({
                pathname: `./entradas/nueva`,
              })
            }
          >
            Generar Entrada
          </Button>
        </div>
      </div>
      <div className="main">
        <Grid container>
          <Grid item md={isOpenPreview ? 3 : 12}>
            {isOpenPreview && (
              <ListExits
                exitSelected={exitSelected}
                data={tableData.data}
                onRowClick={item => handleOnClickRow(item)}
                rowsLoader={totalExits >= 20 ? 20 : totalExits}
                isLoading={isFetchingData}
                setOrderBy={setOrderBy}
                orderBy={orderBy}
                paginationData={{
                  ...paginationData,
                  total: totalExits,
                }}
              />
            )}
            {!isOpenPreview && (
              <div className="containertable">
                <TableLimenkaGeneral
                  onRowClick={item => handleOnClickRow(item)}
                  isSelectable={false}
                  mainColumn={"Fecha"}
                  heads={tableData.heads}
                  data={tableData.data}
                  actions={tableData.actions}
                  customColumns={tableData.customColumns}
                  typeTable="border"
                  isLoading={isFetchingData}
                  rowsLoader={totalExits >= 20 ? 20 : totalExits}
                  paginationData={{
                    ...paginationData,
                    total: totalExits,
                  }}
                />
              </div>
            )}
          </Grid>
          {isOpenPreview && (
            <Fade in={isOpenPreview} timeout={500}>
              <Grid item md={9} className="preview">
                <PreviewOutPut
                  isFetchingOrder={isFetchingOrder}
                  exitSelectedData={exitSelectedData}
                  handleOnClickClosePreview={handleOnClickClosePreview}
                  dataproducts={productsExit}
                  isFechingProduct={isFechingProduct}
                  totalProductsExits={totalProductsExits}
                  dataComments={{
                    commnents,
                    isPosting,
                    valueCommnet,
                    handleOnChangeComment,
                    handleOnSaveComment,
                    handleOnSaveCommentAndTracking,
                  }}
                />
              </Grid>
            </Fade>
          )}
        </Grid>
      </div>
    </DirLogSalidasStyled>
  );
}
