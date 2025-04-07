import React from "react";
import { DirNewEntryStyles } from "./styles";
import { Button } from "@material-ui/core";
import ModalAddProduct from "./components/ModalAddProduct";
import TableArticles from "./components/TableArticles";
import FormDataProduct from "./components/FormDataProduct";
import useProducts from "./hooks/useProducts";
import { useSelector } from "react-redux";
import { userSelector } from "../../redux/slices/userSlice.js";

export default function DirLogEntryNew() {
  const { userData } = useSelector(userSelector);

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
    setTipeEntry,
    productQuantities,
    setProductQuantities,
    handleQuantityChange,
    selectedProducts,
    conmProductSelection,
    generateUniqueSerials,
    toggleSelectAll,
  } = useProducts();
  return (
    <DirNewEntryStyles>
      {" "}
      <div className="header">
        <div className="header__title">
          <h4>Generar Entrada Nueva</h4>
        </div>

        <div className="header__btnActions">
          <Button className="btnSelect" onClick={() => createNewEntry()}>
            Crear Entrada
          </Button>
        </div>
      </div>
      <FormDataProduct setProvider={setProvider} setObservations={setObservations} setTipeEntry={setTipeEntry} />
      <div className="actions">
        <Button className="btnSelect" onClick={() => handleOpenModalProduct()}>
          Seleccionar Producto
        </Button>
      </div>
      <TableArticles
        userData={userData}
        productToArticle={productToArticle}
        handleValidateDataInputs={handleValidateDataInputs}
        deleteToList={deleteToList}
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
    </DirNewEntryStyles>
  );
}
