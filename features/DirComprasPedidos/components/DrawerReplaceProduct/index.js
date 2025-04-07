import React, { useState } from "react";
import { DrawerReplaceProductStyled } from "./styles";
import { Cached, CloseOutlined, Search } from "@material-ui/icons";
import { Button,IconButton,LinearProgress,Tooltip,Checkbox,Dialog,DialogTitle,DialogContent,DialogActions, } from "@material-ui/core";
import { Pagination } from "@material-ui/lab";

function DrawerReplaceProduct({ products, paginationData,open,onClose,fetchAllProducts,keyWord,handleSearchProduct,handleClickAddProduct,originalProduct, }) {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [openConfirmModal, setOpenConfirmModal] = useState(false);

  const handleSelectProduct = product => {
    setSelectedProduct(prev => (prev?.id === product.id ? null : product));
  };

  const handleOpenConfirmModal = () => {
    setOpenConfirmModal(true);
  };

  const handleCloseConfirmModal = () => {
    setOpenConfirmModal(false);
  };

  const handleConfirmReplace = () => {
    if (selectedProduct) {
      handleClickAddProduct(selectedProduct);
      setSelectedProduct(null);
      handleCloseConfirmModal();
      onClose();
    }
  };

  return (
    <>
      <DrawerReplaceProductStyled anchor="right" open={open} keepMounted onClose={onClose}>
        <div className="header">
          <div className="close">
            <CloseOutlined className="close" onClick={onClose} />
            <p className="title">Selecciona el Producto para Reemplazar</p>
          </div>
        </div>

        <div className="search_container">
          <h4>Buscar:</h4>
          <div className="inputContainer">
            <Search className="inputContainer__icon" />
            <input
              value={keyWord}
              onChange={e => handleSearchProduct(e.target.value)}
              className="inputContainer__input"
              placeholder="Buscar por nombre de producto"
            />
          </div>
          <div>
            <Tooltip title="Recargar">
              <IconButton onClick={() => fetchAllProducts()} aria-label="Recargar" style={{ color: "#405189" }}>
                <Cached />
              </IconButton>
            </Tooltip>
          </div>
        </div>

        <div className="contentPreview">
          <div className="headbutton">
            <Button
              variant="contained"
              color="secondary"
              disabled={!selectedProduct}
              onClick={handleOpenConfirmModal}
              className="confirm-button"
            >
              Reemplazar
            </Button>
          </div>
          <div className="containerTable">
            <div className="containerTable__products">
              <div className="table">
                <div className="tableheader">
                  <div className="tablehead"></div>
                  <div className="tablehead">
                    <p>Codigo</p>
                  </div>
                  <div className="tablehead tableheadproductname">
                    <p>Producto</p>
                  </div>
                  <div className="tablehead">
                    <p>Stock</p>
                  </div>
                  <div className="tablehead">
                    <p>Marca</p>
                  </div>
                </div>
                {products?.isFetching ? (
                  <LinearProgress />
                ) : (
                  <div className="tablebody">
                    {products?.data?.map((product, index) => (
                      <div key={index} className={`tablerow-container ${index % 2 === 0 ? "even-row" : "odd-row"}`}>
                        <div className="tablerow">
                          <div className="tablecell">
                            <Checkbox
                              checked={selectedProduct?.id === product.id}
                              onChange={() => handleSelectProduct(product)}
                              color="secondary"
                            />
                          </div>
                          <div className="tablecell code">{product?.code}</div>
                          <div className="tablecell tableheadproductrow">
                            <div className="content">{product?.name}</div>
                          </div>
                          <div className="tablecell code">{product?.stock}</div>
                          <div className="tablecell code">{product?.brand?.name}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        <Pagination
          className="pagination"
          page={paginationData?.page}
          count={Math.ceil(products?.count / paginationData?.limit)}
          onChange={paginationData?.handlePagination}
          color="primary"
        />
      </DrawerReplaceProductStyled>

      <Dialog open={openConfirmModal} onClose={handleCloseConfirmModal}>
        <DialogTitle>Confirmar Reemplazo de Producto</DialogTitle>
        <DialogContent>
          <p>
            ¿Estás seguro que deseas reemplazar el producto:
            <br />
            <strong>{originalProduct?.product?.name}</strong>
            <br />
            por:
            <br />
            <strong>{selectedProduct?.name}</strong>?
          </p>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseConfirmModal} color="primary">
            Cancelar
          </Button>
          <Button onClick={handleConfirmReplace} color="secondary" variant="contained">
            Confirmar
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default DrawerReplaceProduct;
