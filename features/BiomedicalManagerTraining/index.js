import React from "react";
import { BiomedicaFormationStyles } from "./styles";
import useFormation from "./hooks/useFormation";
import { Cached, Search, Close } from "@material-ui/icons";
import { Grid, IconButton, Fade } from "@material-ui/core";
import TableLimenkaGeneral from "../../components/TableLimenkaGeneral";
import Filters from "./components/Filters";
import useFilters from "./hooks/useFilters";
import ActiveFiltersBio from "./components/ActiveFilters/ActiveFilters";
import { filtersOptions } from "./data";
import useFormationSelected from "./hooks/useFormationSelected";
import ListTraining from "./components/ListTraining";
import PreviewTrainingProducts from "./components/PreviewTrainingProducts";
import ModalAssignBio from "./components/ModalAssignBio";

function BiomedicalManagerTraining() {
  const { activeFilters, setActiveFilters, handleOnChangeFilter } = useFilters(filtersOptions);
  const {
    allFormation,
    refetchData,
    keyword,
    handleOnChangeKeyWord,
    deleteKeyWord,
    paginationData,
    tableData,
    handleOnClickRow,
    selectedTraining,
    isOpenPreview,
    setIsOpenPreview,
  } = useFormation(activeFilters);

  const { productsTraining, modalAssignBiome, optionsSelect, addResponsible } = useFormationSelected(selectedTraining);

  return (
    <BiomedicaFormationStyles>
      <div className="header">
        <div className="header__title">
          <h4>
            Capacitaciones <span>({allFormation?.total})</span>
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
            {keyword?.length > 3 && (
              <IconButton className="inputContainer__clean" onClick={() => deleteKeyWord()}>
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
      <ActiveFiltersBio
        activeFilters={activeFilters}
        handleOnChangeFilter={handleOnChangeFilter}
        setActiveFilters={setActiveFilters}
      />

      <div className="main">
        <Grid container>
          <Grid item md={isOpenPreview ? 3 : 12}>
            {isOpenPreview && (
              <ListTraining
                selectedTraining={selectedTraining}
                data={tableData.data}
                onRowClick={item => handleOnClickRow(item)}
                rowsLoader={allFormation?.total >= 20 ? 20 : allFormation?.total}
                isLoading={allFormation?.isFetching}
                // setOrderBy={setOrderBy}
                // orderBy={orderBy}
                paginationData={{
                  ...paginationData,
                  total: allFormation?.total,
                }}
              />
            )}
            {!isOpenPreview && (
              <div className="containertable">
                <TableLimenkaGeneral
                  onRowClick={item => handleOnClickRow(item)}
                  mainColumn={"Fecha"}
                  heads={tableData.heads}
                  data={tableData.data}
                  actions={tableData.actions}
                  customColumns={tableData.customColumns}
                  // orderBy={orderBy}
                  // setOrderBy={setOrderBy}
                  typeTable="border"
                  isLoading={allFormation?.isFetching}
                  rowsLoader={allFormation?.total >= 20 ? 20 : allFormation?.total}
                  paginationData={{
                    ...paginationData,
                    total: allFormation?.total,
                  }}
                />
              </div>
            )}
          </Grid>
          {isOpenPreview && (
            <Fade in={isOpenPreview} timeout={500}>
              <Grid item md={9} className="preview">
                <PreviewTrainingProducts
                  selectedTraining={selectedTraining}
                  handleOnClickClosePreview={() => setIsOpenPreview(false)}
                  dataproducts={productsTraining}
                  isFechingProduct={productsTraining?.isFetching}
                  totalProducts={productsTraining?.total}
                  modalAssignBiome={modalAssignBiome}
                />
              </Grid>
            </Fade>
          )}

          <ModalAssignBio
            open={modalAssignBiome?.openAssignBio}
            handleToggle={modalAssignBiome?.handleToggleBio}
            optionsSelect={optionsSelect}
            addResponsible={addResponsible}
          />
        </Grid>
      </div>
    </BiomedicaFormationStyles>
  );
}

export default BiomedicalManagerTraining;
