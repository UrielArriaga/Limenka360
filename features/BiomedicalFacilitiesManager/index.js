import React from "react";
import { BiomedicaFacilitieStyles } from "./styles";
import useFacilities from "./hooks/useFacilities";
import { Cached, Search, Close } from "@material-ui/icons";
import { Grid, IconButton, Fade } from "@material-ui/core";
import Filters from "./components/Filters";
import useFilters from "./hooks/useFilters";
import ActiveFilters from "./components/ActiveFilters/ActiveFilters";
import { filtersOptions } from "./data";
import TableLimenkaGeneral from "../../components/TableLimenkaGeneral";
import ListFacilities from "./components/ListFacilities";
import PreviewFacilities from "./components/PreviewFacilities";

function BiomedicalFacilitiesManager() {
  const { activeFilters, setActiveFilters, handleOnChangeFilter } = useFilters();
  const {
    facilities,
    findWord,
    refetchData,
    isOpenPreview,
    handleOnClickRow,
    tableData,
    paginationData,
    selectedFacility,
    setIsOpenPreview,
    productsInstallations,
    paginationProducts
  } = useFacilities(activeFilters);
  return (
    <BiomedicaFacilitieStyles>
      <div className="header">
        <div className="header__title">
          <h4>
            Instalaciones <span>({facilities?.total})</span>
          </h4>
        </div>

        <div className="header__filters">
          <div className="inputContainer">
            <Search className="inputContainer__icon" />

            <input
              value={findWord?.keyword}
              onChange={e => findWord?.handleOnChangeKeyWord(e)}
              className="inputContainer__input"
              placeholder="Buscar por folio"
            />
            {findWord?.keyword?.length > 3 && (
              <IconButton className="inputContainer__clean" onClick={() => findWord?.deleteKeyWord()}>
                <Close />
              </IconButton>
            )}
          </div>
          <Filters
            filters={filtersOptions}
            activeFilters={activeFilters}
            setActiveFilters={setActiveFilters}
            handleOnChangeFilter={handleOnChangeFilter}
          />

          <IconButton onClick={() => refetchData()}>
            <Cached />
          </IconButton>
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
              <ListFacilities
                selectedTraining={selectedFacility}
                data={tableData?.data?.data}
                onRowClick={item => handleOnClickRow(item)}
                rowsLoader={facilities?.total >= 20 ? 20 : facilities?.total}
                isLoading={facilities?.isFetching}
                paginationData={{
                  ...paginationData,
                  total: facilities?.total,
                }}
              />
            )}
            {!isOpenPreview && (
              <div className="containertable">
                <TableLimenkaGeneral
                  onRowClick={item => handleOnClickRow(item)}
                  mainColumn={"Fecha"}
                  heads={tableData.heads}
                  data={tableData?.data?.data}
                  actions={tableData.actions}
                  customColumns={tableData.customColumns}
                  typeTable="border"
                  isLoading={facilities?.isFetching}
                  rowsLoader={facilities?.total >= 20 ? 20 : facilities?.total}
                  paginationData={{
                    ...paginationData,
                    total: facilities?.total,
                  }}
                />
              </div>
            )}
          </Grid>
          {isOpenPreview && (
            <Fade in={isOpenPreview} timeout={500}>
              <Grid item md={9} className="preview">
                <PreviewFacilities
                  selectedTraining={selectedFacility}
                  productsInstallations={productsInstallations}
                  handleOnClickClosePreview={() => setIsOpenPreview(false)}
                  paginationProducts={paginationProducts}
                />
              </Grid>
            </Fade>
          )}
        </Grid>
      </div>
    </BiomedicaFacilitieStyles>
  );
}

export default BiomedicalFacilitiesManager;
