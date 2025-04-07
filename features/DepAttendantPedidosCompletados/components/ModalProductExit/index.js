import React, { useEffect, useState } from "react";
import { ModalProductExitStyled } from "./styles";
import { Close, CloseOutlined, Search, UpdateSharp } from "@material-ui/icons";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
  Divider,
  Grid,
  IconButton,
  Tooltip,
  Typography,
} from "@material-ui/core";
import TableLimenkaGeneral from "../../../../components/TableLimenkaGeneral";
import useDirLogProducts from "../../hooks/useDirLogProducts";
import useAlertToast from "../../../../hooks/useAlertToast";

import useDirLogPedidos from "../../hooks/useFloorManagerPedidos";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { Pagination, Skeleton } from "@material-ui/lab";
import { api } from "../../../../services/api";
import dayjs from "dayjs";
// import { table } from "console";

export default function ModalProductExit({
  open = true,
  onClose = () => {},
  keyword,
  articlesData,
  productToSearch,
  productSelected,
  handleExitProducts,
  products,
  articles,
  handleAddArticleToProduct,
}) {
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
              console.log(products?.results);

              console.log(productToSearch);
            }}
          >
            Guardar
          </Button>
        </div>

        <div className="search_container">
          <h4>Buscar :</h4>
          <div className="inputContainer">
            <Search className="inputContainer__icon" />
            <input
              value={productToSearch?.product.code}
              // value={keyword}
              onChange={e => {}}
              className="inputContainer__input"
              placeholder="Buscar por folio, producto"
            />

            {"asdasdas"?.length > 3 && (
              <IconButton className="inputContainer__clean" onClick={() => deleteKeyWord()}>
                <Close />
              </IconButton>
            )}
          </div>
        </div>

        <div className="container_table">
          <div className="container_table__products">
            <div className="table">
              <div className="tableheader">
                <div className="tablehead tablecellcheck"></div>
                <div className="tablehead">
                  <p>Fecha de Alta</p>
                </div>

                <div className="tablehead">
                  <p>No. Serie</p>
                </div>
                <div className="tablehead">
                  <p>Codigo de Producto</p>
                </div>
                <div className="tablehead tableheadproductname">
                  <p>Producto</p>
                </div>
                {/* <div className="tablehead center">
                  <p>Cantidad Solicitada</p>
                </div>
                <div className="tablehead">
                  <p>Acciones</p>
                </div> */}
              </div>
              {articlesData?.isFetching && <p>Obteniendo productos</p>}
              {!articlesData?.isFetching && (
                <div className="tablebody">
                  {articles.map((article, index) => {
                    return (
                      <div key={article.id}>
                        <div className="tablerow">
                          <div className="tablecell tablecellcheck">
                            <input
                              type="checkbox"
                              checked={productToSearch?.articles?.some(i => i.id === article.id)}
                              onChange={e => {
                                handleAddArticleToProduct(productToSearch, article, e.target.checked);
                              }}
                            />
                          </div>

                          <div className="tablecell code">{dayjs(article?.createdAt).format("DD/MM/YYYY")}</div>
                          <div className="tablecell code">{article?.serialnumber}</div>
                          <div className="tablecell code">{article?.product?.code}</div>
                          <div className="tablecell tableheadproductrow">{article?.product?.name}</div>
                          {/* <div className="tablecell code">adsa</div>
                        <div className="tablecell code">adsa</div> */}
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </ModalProductExitStyled>
  );
}
