import React from "react";
import { DirComprasGarantiaStyled } from "./styles";
import useFilters from "./hooks/useFilters";
import ActiveFilters from "./components/ActiveFilters";
import Filters from "./components/Filters";
import useWarranties from "./hooks/useWarranties";
import { Cached, Close, Search } from "@material-ui/icons";
import { Badge, Fade, Grid, IconButton } from "@material-ui/core";
import { filtersWarranties } from "./data";
import TableLimenkaGeneral from "../../components/TableLimenkaGeneral";
import PreviewWarranties from "./components/PreviewWarranties";
import ListWarranties from "./components/ListWarranties";

function GestorComprasGarantia() {
  const { activeFilters, setActiveFilters, handleOnChangeFilter, filters } = useFilters(filtersWarranties);
  const {
    keyword,
    handleOnChangeKeyWord,
    deleteKeyWord,
    paginationData,
    warranties,
    handleOnClickRow,
    tableData,
    setIsOpenPreview,
    isOpenPreview,
    refetchData,
    warrantySelected,
  } = useWarranties(activeFilters);

  return (
    <DirComprasGarantiaStyled>
      <div className="header">
        <div className="headers">
          <div className="header__title">
            <h4>
              Garantías <span>({warranties?.total})</span>
            </h4>
          </div>

          <div className="header__filters">
            <div className="inputContainer">
              <Search className="inputContainer__icon" />
              <input
                value={keyword}
                onChange={e => handleOnChangeKeyWord(e)}
                className="inputContainer__input"
                placeholder="Buscar por garantia"
              />

              {keyword?.length > 3 && (
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
        <Grid container>
          <Grid item md={isOpenPreview ? 3 : 12}>
            {isOpenPreview && (
              <ListWarranties
                warrantySelected={warrantySelected}
                data={warranties?.data}
                onRowClick={item => handleOnClickRow(item)}
                rowsLoader={warranties?.total >= 20 ? 20 : warranties?.total}
                isLoading={warranties?.isFetching}
                paginationData={{
                  ...paginationData,
                  total: warranties?.total,
                }}
              />
            )}

            {!isOpenPreview && (
              <div className="containertable">
                <TableLimenkaGeneral
                  onRowClick={item => handleOnClickRow(item)}
                  mainColumn={"Folio"}
                  heads={tableData.heads}
                  isLoading={warranties?.isFetching}
                  actions={tableData.actions}
                  data={warranties?.data}
                  customColumns={tableData.customColumns}
                  typeTable="border"
                  rowsLoader={warranties?.total >= 20 ? 20 : warranties?.total || 20}
                  paginationData={{
                    ...paginationData,
                    total: warranties?.total,
                  }}
                />
              </div>
            )}
          </Grid>

          {isOpenPreview && (
            <Fade in={isOpenPreview} timeout={500}>
              <Grid item md={9} className="preview">
                <PreviewWarranties setIsOpenPreview={setIsOpenPreview} warrantySelected={warrantySelected} />
              </Grid>
            </Fade>
          )}
        </Grid>
      </div>
    </DirComprasGarantiaStyled>
  );
}

export default GestorComprasGarantia;
