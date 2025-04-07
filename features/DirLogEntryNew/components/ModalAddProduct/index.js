import React, { useEffect, useState } from "react";
import { ModalAddProductStyled } from "./styles";
import { Cached, CloseOutlined, Replay, Search } from "@material-ui/icons";
import { Button, IconButton, LinearProgress, Tooltip } from "@material-ui/core";
import dayjs from "dayjs";
import { Pagination } from "@material-ui/lab";

function ModalAddProduct({
  products,
  paginationData,
  open,
  onClose,
  fetchAllProducts,
  keyWord,
  handleSearchProduct,
  handleClickAddProduct,
  productQuantities,
  handleQuantityChange,
}) {
  return (
    <ModalAddProductStyled
      anchor="left"
      open={open}
      keepMounted
      onClose={onClose}
      aria-labelledby="alert-dialog-slide-title"
      aria-describedby="alert-dialog-slide-description"
    >
      <div className="header">
        <div className="close">
          <CloseOutlined className="close" onClick={onClose} />
          <p className="title">Selecciona productos por articulo</p>
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
        <div className="containerTable">
          <div className="containerTable__products">
            <div className="table">
              <div className="tableheader">
                <div className="tablehead">
                  <p>Codigo</p>
                </div>
                <div className="tablehead tableheadproductname">
                  <p>Producto</p>
                </div>
                <div className="tablehead">
                  <p>Marca</p>
                </div>
                <div className="tablehead">
                  <p>Stock</p>
                </div>
                <div className="tablehead">
                  <p>Cantidad</p>
                </div>
                <div className="tablehead">
                  <p>Accion</p>
                </div>
              </div>
              {products?.isFetching == true ? (
                <LinearProgress />
              ) : (
                <div className="tablebody">
                  {products?.data?.map((product, index) => (
                    <div key={index} className={`tablerow-container ${index % 2 === 0 ? "even-row" : "odd-row"}`}>
                      <div className="tablerow">
                        <div className="tablecell code">{product?.code}</div>
                        <div className="tablecell tableheadproductrow">
                          <div className="content">{product?.name}</div>
                        </div>
                        <div className="tablecell code">{product?.brand?.name}</div>
                        <div className="tablecell code">{product?.stock}</div>
                        <div className="tablecell code">
                          <input
                            className="input_data"
                            placeholder="Ingresa la cantidad de articulos"
                            type="number"
                            min="0"
                            onChange={e => handleQuantityChange(index, e.target.value)}
                          />
                        </div>
                        <div className="tablecell code">
                          <Button
                            className="button_add"
                            onClick={() => handleClickAddProduct(product, index, productQuantities)}
                          >
                            Agregar
                          </Button>
                        </div>

                        {/* <div className="tablecell actions">
                                <div>
                                  {productOportunity?.totalorder === productOportunity?.total ? (
                                    <div
                                      style={{
                                        display: "flex",
                                        alignItems: "center",
                                      }}
                                    >
                                      <p>Asignado </p>
                                      <CheckCircle
                                        style={{
                                          color: "green",
                                        }}
                                      />
                                    </div>
                                  ) : (
                                    <button onClick={() => handleClickProduct(productOportunity)}>
                                      {productOportunity?.isComplete
                                        ? "Completo"
                                        : productOportunity?.isMajor
                                        ? "Mayor"
                                        : "Asignar No. Serie"}
                                    </button>
                                  )}
                                </div>
                              </div> */}
                      </div>
                      {/* <div className="tablelist">
                              {productOportunity?.articles?.map((article, index) => (
                                <div className="tablelititem" key={index}>
                                  <div className="description">
                                    <FiberManualRecord className="icon" />
                                    <p
                                      onClick={() => handleAddArticleToProduct(productOportunity, article, false)}
                                      className="serialnumber"
                                    >
                                      {article?.serialnumber}
                                    </p>
        
                                    <p className="name">
                                      {article?.product?.name}
                                      <span style={{ color: "#50C878" }}>
                                        {article?.isapart == true ? " (Se marcara como apartado)" : ""}
                                      </span>
                                    </p>
                                  </div>
                                  <textarea
                                    onChange={e => handleOnChangeComments(productOportunity, article, e.target.value)}
                                    value={article?.comments}
                                    placeholder="Comentarios"
                                    rows="4"
                                  />
        
                                </div>
                              ))}
                            </div>
                            <div className="tablelistsaved">
                              {productOportunity?.articlessaved?.map((article, index) => (
                                <div className="tablelititem" key={index}>
                                  <div className="description">
                                    <FiberManualRecord className="icon" />
                                    <p className="serialnumber">{article?.serialnumber}</p>
        
                                    <p className="name">{article?.product?.name}</p>
                                  </div>
                                  <textarea disabled value={article?.comments} placeholder="Comentarios" rows="4" />
                                </div>
                              ))}
                            </div> */}
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
        defaultPage={paginationData?.page}
        onChange={paginationData?.handlePagination}
        shape="rounded"
        count={Math.ceil(products?.count / paginationData?.limit)}
        color="primary"
      />
    </ModalAddProductStyled>
  );
}

export default ModalAddProduct;
