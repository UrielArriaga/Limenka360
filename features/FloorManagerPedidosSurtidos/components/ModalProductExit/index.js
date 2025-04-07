import React, { useState } from "react";
import { ModalProductExitStyled } from "./styles";
import { Cached, CloseOutlined, Replay, Search } from "@material-ui/icons";
import { Button, IconButton, LinearProgress, Tooltip } from "@material-ui/core";
import dayjs from "dayjs";
import { Pagination } from "@material-ui/lab";

export default function ModalProductExit({
  open = true,
  onClose = () => {},
  keyword,
  handleKeyWord,
  articlesData,
  productToSearch,
  productSelected,
  handleExitProducts,
  products,
  articles,
  isLoadingArticles,
  handleAddArticleToProduct,
  handleSearch,
  fetchWarehouseProductsByProduct,
  paginationProducts,
  countProducts,
  sortBy,
  handleSortBy,
  maxSelection,
  selectedCount
}) {
  const { handlePagination, page, limit, paginationCount } = paginationProducts;
  return (
    <ModalProductExitStyled
      anchor="left"
      open={open}
      keepMounted
      onClose={onClose}
      aria-labelledby="alert-dialog-slide-title"
      aria-describedby="alert-dialog-slide-description"
    >
      <div className="container_exit">
        <div className="header">
          <div className="close">
            <CloseOutlined className="close" onClick={onClose} />
            <p className="title">Seleccionar articulos por numeo de serie</p>
          </div>
          <Button
            variant="contained"
            className="btn_save"
            onClick={() => {
              onClose();
            }}
          >
            Confirmar
          </Button>
        </div>

        <div className="search_container">
          <h4>Buscar:</h4>
          <div className="inputContainer">
            <Search className="inputContainer__icon" />
            <input
              value={productToSearch?.product?.code}
              // value={keyword}
              // onChange={e => handleSearch(e)}
              className="inputContainer__input"
              placeholder="Buscar por folio, producto"
              disabled
            />

            {/* {"asdasdas"?.length > 3 && (
              <IconButton className="inputContainer__clean" onClick={() => handleSearch("")}>
                <Close />
              </IconButton>
            )} */}
          </div>
        </div>

        <div className="search_container">
          <div className="textSerial">
            <h4>Buscar:</h4>
          </div>

          <div className="inputSerial">
            <Search className="inputContainer__icon" />
            <input
              value={keyword}
              onChange={e => handleKeyWord(e)}
              className="inputContainer__input"
              placeholder="Buscar por número de serie"
            />
          </div>

          <div className="container_order">
            <div className="select">
              <p>Ordenar por:</p>
              <select value={sortBy} onChange={handleSortBy}>
                <option value="createdAt">Fecha Ascendente</option>
                <option value="-createdAt">Fecha Descendente</option>
                <option value="serialnumber">Número de Serie</option>
              </select>
            </div>
          </div>
          <div>
            <Tooltip title="Recargar">
              <IconButton
                onClick={() => fetchWarehouseProductsByProduct()}
                aria-label="Recargar"
                style={{ color: "#405189" }}
              >
                <Cached />
              </IconButton>
            </Tooltip>
          </div>
        </div>

        <div className="container_table">
          <h4 style={{ marginBottom: "5px", marginLeft: "5px" }}>Artículos: {countProducts}</h4>
          {isLoadingArticles ? (
            <LinearProgress />
          ) : articles.length != 0 ? (
            <div>
              <table className="table">
                <thead>
                  <tr>
                    <th onClick={() => console.log(articles)}>Check</th>
                    <th>Fecha de alta</th>
                    <th>No. Serie</th>
                    <th>Código de producto</th>
                    <th>Producto</th>
                    <th>Estatus de Reparación</th>
                    <th>Revisado por biomedica</th>
                  </tr>
                </thead>
                <tbody>
                  {articles.map(article => (
                    <tr
                      key={article.id}
                      onClick={() =>
                        handleAddArticleToProduct(
                          productToSearch,
                          article,
                          !productToSearch?.articles?.some(i => i.id === article.id)
                        )
                      }
                    >
                      <td className="table-checkbox">
                        <input
                          type="checkbox"
                          checked={productToSearch?.articles?.some(i => i.id === article.id)}
                          onChange={e => handleAddArticleToProduct(productToSearch, article, e.target.checked)}
                        />
                      </td>
                      <td>{dayjs(article?.createdAt).format("DD/MM/YYYY")}</td>
                      <td>{article?.serialnumber}</td>
                      <td>{article?.product?.code}</td>
                      <td>{article?.product?.name}</td>
                      <td>{article?.product?.statusrepair ? "Si" : "No"}</td>
                      <td>{article?.reviewed ? "Si" : "No"}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {paginationCount > 1 && (
                <Pagination
                  count={paginationCount} // Total de páginas
                  page={page}
                  onChange={handlePagination} // Función para manejar cambios de página
                  style={{ marginTop: "10px" }}
                />
              )}
            </div>
          ) : (
            <p>No hay productos...</p>
          )}
        </div>
      </div>
    </ModalProductExitStyled>
  );
}
