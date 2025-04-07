import React from "react";
import { DirLogNewEntryStyles } from "./styles";
import { FiberManualRecord } from "@material-ui/icons";
import useProducts from "./hooks/useProducts";
import { Button } from "@material-ui/core";
import ModalAddProduct from "./components/ModalAddProduct";
import TableArticles from "./components/TableArticles";
import FormDataProduct from "./components/FormDataProduct";

function DirLogNewEntry() {
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
    setWareHouse,
    setObservations,
    createNewEntry,
    setTipeEntry,
    productQuantities,
    warehouse,
    setProductQuantities,
    handleQuantityChange,
    selectedProducts,
    conmProductSelection,
    generateUniqueSerials,
    toggleSelectAll,
  } = useProducts();

  return (
    <DirLogNewEntryStyles>
      <div className="header">
        <div className="header__title">
          <h4> Generar Entrada Nueva</h4>
        </div>
        <div className="header__btnActions">
          <Button className="btnSelect" onClick={() => createNewEntry()}>
            Crear Entrada
          </Button>
        </div>
      </div>

      <FormDataProduct
        setProvider={setProvider}
        setObservations={setObservations}
        setTipeEntry={setTipeEntry}
        setWareHouse={setWareHouse}
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
        warehouses={warehouse}
        selectedProducts={selectedProducts}
        conmProductSelection={conmProductSelection}
        generateUniqueSerials={generateUniqueSerials}
        toggleSelectAll={toggleSelectAll}
      />

      <ModalAddProduct
        handleQuantityChange={handleQuantityChange}
        productQuantities={productQuantities}
        setProductQuantities={setProductQuantities}
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

export default DirLogNewEntry;
