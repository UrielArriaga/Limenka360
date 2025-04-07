import React from "react";
import { DirLogNewEntryStyles } from "./styles";
import { FiberManualRecord } from "@material-ui/icons";
import useProducts from "./hooks/useProducts";
import { Button } from "@material-ui/core";
import ModalAddProduct from "./components/ModalAddProduct";
import TableArticles from "./components/TableArticles";
import FormDataProduct from "./components/FormDataProduct";

function MasterNewExit() {
  const {
    products,
    paginationData,
    handleOpenModalProduct,
    onClose,
    open,
    fetchAllProducts,
    keyWord,
    handleSearchProduct,
    handleClickAddProduct,
    productToArticle,
    handleValidateDataInputs,
    deleteToList,
    setProvider,
    setObservations,
    createNewEntry,
    setFolio,
    setTipeEntry,
  } = useProducts();

  return (
    <DirLogNewEntryStyles>
      <div className="header">
        <div className="header__title">
          <h4> Generar Salida Nueva</h4>
        </div>

        <div className="header__btnActions">
          <Button className="btnSelect" onClick={() => createNewEntry()}>
            Guardar Salida
          </Button>
        </div>
      </div>

      <FormDataProduct
        setProvider={setProvider}
        setObservations={setObservations}
        setFolio={setFolio}
        setTipeEntry={setTipeEntry}
      />

      <div className="actions">
        <Button className="btnSelect" onClick={() => handleOpenModalProduct()}>
          Seleccionar Producto
        </Button>
      </div>

      <TableArticles
        productToArticle={productToArticle}
        handleValidateDataInputs={handleValidateDataInputs}
        deleteToList={deleteToList}
      />

      <ModalAddProduct
        products={products}
        paginationData={paginationData}
        open={open}
        onClose={onClose}
        fetchAllProducts={fetchAllProducts}
        keyWord={keyWord}
        handleSearchProduct={handleSearchProduct}
        handleClickAddProduct={handleClickAddProduct}
      />
    </DirLogNewEntryStyles>
  );
}

export default MasterNewExit;
