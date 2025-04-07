import React, {useState} from "react";
import { Grid, Input, Fade, IconButton } from "@material-ui/core";
import { Search, UpdateSharp } from "@material-ui/icons";
import { BiomedicaStyle } from "./styles";
import FilesUpload from "../../componentx/common/DirLog/FilesUpload";
import useBiome from "./hooks/useBiome";
import useBiomeTranking from "./hooks/useBiomeTraking";
import TableLimenkaGeneral from "../../components/TableLimenkaGeneral";
import ListProducts from "./components/ListProducts";
import PreviewProduct from "./components/PreviewProduct";
import useRepairStatus from "./hooks/useRepairStatus";
import StatusRepair from "./components/StatusRepair";
import NewTraking from "./components/NewTraking";
import LogisticsFilters from "../../components/LogisticsFilters";
import useLogisticsFilters from "../../hooks/useLogisticsFilters";
import ActiveFilters from "./components/ActiveFilters";
import ReviewedStatus from "./components/ReviewedStatus";
import useReview from "./hooks/useReview";
import PreviewFile from "./components/PreviewFile";
import useNewRevision from "./hooks/useNewRevision";
import FormatReview from "./components/FormatReview";
import useBimedicaFiles from "./hooks/useBimedicaFiles";
import EditModal from "./components/ModalEdite";
import useGeneratePDF from "./hooks/useModalPdf";

export default function ProductosBiome({type}) {
  console.log("type", type);
  const { activeFilters, setActiveFilters, handleOnChangeFilter } = useLogisticsFilters();
  const [openEditModal, setOpenEditModal] = useState(false);
  const [productToEdit, setProductToEdit] = useState(null);
  const { products, updateProductIndicator } = useBiome();
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleEditClick = (product) => {
    setProductToEdit(product); 
    setOpenEditModal(true); 
  };


  const handleCloseEditModal = () => {
    setOpenEditModal(false);
  };
const {generatePDF}= useGeneratePDF();
  const handleSaveProduct = async (updatedProduct,productSelectModal) => {
    if (updatedProduct?.id && updatedProduct?.indicator) {
      console.log("Guardando producto editado:", updatedProduct);
      try {
        await updateProductIndicator(updatedProduct.id, updatedProduct.indicator);
      generatePDF(updatedProduct,productSelectModal); 
 
        setProductToEdit(null); 
        setOpenEditModal(false); 
        refreshData(); 
      } catch (error) {
        console.error("Error al actualizar el producto:", error);
      }
    } else {
      console.error("Datos del producto no válidos:", updatedProduct);
    }
  };
  
  const {
    isFetchingData,
    paginationData,
    tableData,
    searchName,
    isOpenPreview,
    productSelect,
    totalProducts,
    filtersBiomedica,
    setProductSelect,
    refreshData,
    setIsOpenPreview,
    setIsFetchingData,
    handleOnClickRow,
    handleOnClickClosePreview,
    handleOnChangeKeyWord,
  } = useBiome({type});

  const { handleOnClickRepair, openRepair, handleToggleRepair, handleRepair } = useRepairStatus({
    setIsOpenPreview,
    setIsFetchingData,
    refreshData,
    setProductSelect,
    type,
  });
  const { openReviewed, handleOnClickReviwed, handleToggleReviwed, handleReviwed,indicators } = useReview({
    setIsOpenPreview,
    setIsFetchingData,
    refreshData,
    setProductSelect,
  });
  const {
    trakingSelect,
    tableDataTrakings,
    openTraking,
    handleOnClickTraking,
    isFetchingTraking,
    totalTrakigs,
    paginationDataTrackigs,
    openPreview,
    handleDrawerClose,
    handleOnClickRowTraking,
    handleToggleTraking,
    getTrankings,
  } = useBiomeTranking(productSelect);
  const {
    openFormat,
    handleToggleFormat,
    register,
    handleSubmit,
    errors,
    handleOnClickReview,
    control,
    reset,
    handleCancel,
    onSubmit,
    items,
  } = useNewRevision();
    const { openFiles, handleToggleFiles, paginationFiles, statesFiles, actionsFiles } =
    useBimedicaFiles(productSelect);
  
    let actions = [
      {
        name: "Editar",
        action: (product) => handleEditClick(product), 
      },
    ];

  return (
    <BiomedicaStyle>
      <div className="content_biome">
        <div className="content_biome__header">
          <h4 className="title_header">
            {type === 'general' ? 'Productos' : 'Reparaciones'} <span>( Total: {totalProducts})</span>
          </h4>

          <div className="search_box">
            <div className="inputContainer">
              <Input
                className="inputContainer__input"
                placeholder="Buscar numero de serie"
                startAdornment={<Search className="inputContainer__icon" />}
                fullWidth
                disableUnderline
                value={searchName}
                onChange={e => handleOnChangeKeyWord(e)}
              />
            </div>
          </div>
          <LogisticsFilters
            filters={filtersBiomedica}
            activeFilters={activeFilters}
            setActiveFilters={setActiveFilters}
            handleOnChangeFilter={handleOnChangeFilter}
          />

          <IconButton onClick={() => refreshData()}>
            <UpdateSharp />
          </IconButton>
        </div>
        <ActiveFilters
          activeFilters={activeFilters}
          handleOnChangeFilter={handleOnChangeFilter}
          setActiveFilters={setActiveFilters}
        />
        <div className="content_biome__body">
          <Grid container>
            <Grid item md={isOpenPreview ? 3 : 12}>
              {isOpenPreview && (
                <ListProducts
                  productSelect={productSelect}
                  data={tableData.products}
                  onRowClick={item => handleOnClickRow(item)}
                  rowsLoader={totalProducts >= 20 ? 20 : totalProducts}
                  isLoading={isFetchingData}
                  paginationData={{
                    ...paginationData,
                    total: totalProducts,
                  }}
                />
              )}
              {!isOpenPreview && (
                <div className="table_products">
                  <div className="table">
                    <TableLimenkaGeneral
                      onRowClick={item => handleOnClickRow(item)}
                      heads={tableData.heads}
                      data={tableData.products}
                      actions={tableData.actions.map(action => ({
                        ...action,
                        action: e => {
                          if (action.name === "Editar") {
                            handleEditClick(e);
                          }
                        },
                      }))}
                      customColumns={tableData.customColumns}
                      mainColumn={"Codigo"}
                      typeTable="border"
                      isSelectable={false}
                      isLoading={isFetchingData}
                      rowsLoader={totalProducts >= 20 ? 20 : totalProducts}
                      paginationData={{
                        ...paginationData,
                        total: totalProducts,
                      }}
                    />
                  </div>
                </div>
              )}

              <EditModal
                open={openEditModal}
                onClose={() => setOpenEditModal(false)}
                product={productToEdit}
                indicators={indicators}
                onSave={handleSaveProduct} 
                productSelect={productSelect}
              />
            </Grid>
            {isOpenPreview && (
              <Fade in={isOpenPreview} timeout={500}>
                <Grid item md={9}>
                  <PreviewProduct
                    productSelect={productSelect}
                    isFetchingProduct={isFetchingData}
                    handleToggleFiles={handleToggleFiles}
                    handleOnClickClosePreview={handleOnClickClosePreview}
                    handleOnClickRepair={handleOnClickRepair}
                    handleOnClickTraking={handleOnClickTraking}
                    handleOnClickReviwed={handleOnClickReviwed}
                    tableDataTrakings={tableDataTrakings}
                    isFetchingTraking={isFetchingTraking}
                    totalTrakigs={totalTrakigs}
                    paginationDataTrackigs={paginationDataTrackigs}
                    handleOnClickRowTraking={handleOnClickRowTraking}
                    handleOnClickReview={handleOnClickReview}
                  />
                </Grid>
              </Fade>
            )}
            <StatusRepair
              open={openRepair}
              onClose={handleToggleRepair}
              handleRepair={handleRepair}
              productSelect={productSelect}
              type={type}
            />
            <ReviewedStatus
              open={openReviewed}
              onClose={handleToggleReviwed}
              handleReviwed={handleReviwed}
              productSelect={productSelect}
            />
            <NewTraking
              open={openTraking}
              productSelect={productSelect}
              handleToggleTraking={handleToggleTraking}
              getTrankings={getTrankings}
            />
             <FilesUpload
                    open={openFiles}
                    handletoogle={handleToggleFiles}
                    articleData={productSelect}
                    statesFiles={statesFiles}
                    actionsFiles={actionsFiles}
                    paginationFiles={paginationFiles}
                  />
            <FormatReview
              open={openFormat}
              control={control}
              indicators={indicators}
              onClose={handleToggleFormat}
              register={register}
              handleSubmit={handleSubmit}
              errors={errors}
              reset={reset}
              handleCancel={handleCancel}
              onSubmit={onSubmit}
              items={items}
              productSelect={productSelect}
            />
            {trakingSelect !== undefined && trakingSelect !== null && (
              <PreviewFile open={openPreview} close={handleDrawerClose} trakingSelect={trakingSelect} />
            )}
          </Grid>
        </div>
      </div>
    </BiomedicaStyle>
  );
}