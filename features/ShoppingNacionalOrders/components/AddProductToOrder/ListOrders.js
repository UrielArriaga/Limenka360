import React, { useEffect, useState } from "react";
import { DialogContainer } from "./styled";
import { CircularProgress, IconButton, Pagination } from "@mui/material";
import { ArrowBackIos, Close, Delete, LowPriority, Search } from "@material-ui/icons";
import { Button, Input, Tooltip } from "@material-ui/core";
import dayjs from "dayjs";

export default function ListOrders({
  orders,
  orderSelected,
  setShowAddProduct,
  setOrderSelected,
  setView,
  setIsCreatingNew,
  setSearch,
  resetView,
  search,
  totalPage,
  page,
  handlePagination,
  setIsAscending,
  isAscending,
}) {
  const showNA = value => {
    if (value === null) {
      return "N/A";
    }
    return value;
  };

  return (
    <DialogContainer>
      <div className="headerDialog">
        <div className="headerDialog__title">
          {orderSelected && (
            <IconButton
              className="btnback"
              onClick={() => {
                setShowAddProduct(false);
                setOrderSelected(null);
              }}
            >
              <ArrowBackIos />
            </IconButton>
          )}
          <p className="">Agregar a orden de compra</p>
        </div>
      </div>

      <div className="bodymodal">
        <p className="title">Seleccion o crea una nueva orden de pago</p>
        <div className="row">
          <div className="bodymodal__inputContainer">
            <input
              value={search}
              onChange={e => setSearch(e.target.value)}
              type="text"
              placeholder="Buscar por alias o folio"
            />
            {search?.length > 0 && (
              <Close
                color="error"
                onClick={() => {
                  setOrderSelected(null);
                  setSearch("");
                }}
              />
            )}
          </div>

          <div className="bodymodal__new">
            <button
              className="bodymodal__new"
              onClick={() => {
                setIsCreatingNew(true), setView("newOrder");
              }}
            >
              Crear nueva
            </button>
          </div>
        </div>
        <div className="bodymodal__ButtonIcon">
          <Tooltip title={isAscending ? "Ordernar Descendente" : "Ordenar Ascendente"}>
            <div className="content_ascdes" onClick={() => setIsAscending(!isAscending)}>
              <p className="text__Button">{isAscending ? "Descendente" : "Ascendente"} </p>
              <IconButton
                className={`icon ${isAscending ? "desen" : "Asc"}`}
              >
                <LowPriority className="ilow" />
              </IconButton>
            </div>
          </Tooltip>
        </div>
        <br />
        {orders?.isFeching && (
          <div className="containerLoad">
            <CircularProgress size={50} color="primary" />
          </div>
        )}
        <div className="list" style={{ height: 250, overflowY: "scroll" }}>
          {!orders.isFeching &&
            orders?.data?.map((item, index) => {
              return (
                <div key={index} className={`bodymodal__item  ${orderSelected?.id === item.id && "selected"}`}>
                  <div className="row">
                    <div>
                      <p className="bodymodal__item--provider">Folio: {showNA(item?.folio)}</p>
                      <p className="bodymodal__item--name">{item.alias}</p>
                      <p className="bodymodal__item--date">{dayjs(item.createdAt).format("DD MMM H:mm A")}</p>
                      <p className="bodymodal__item--provider">Proveedor: {showNA(item?.provider?.companyname)}</p>
                    </div>

                    <div className={"actions"}>
                      <button onClick={() => setOrderSelected(item)}>
                        <p>Seleccionar</p>
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
      <div className="containerPagination">
        {/* <p className="totalProducts">{`Total de Ordenes: ${orders?.count} Página: ${page} - ${totalPage}`}</p> */}
        <Pagination color="primary" shape="rounded" page={page} count={totalPage} onChange={handlePagination} />
      </div>
      <div className="actions">
        <Button
          variant="contained"
          className={`btn_cancel ${false && "disabled"}`}
          onClick={() => resetView()}
        //disabled={isLoadingUpdate}
        >
          Cancelar
        </Button>

        <Button
          variant="contained"
          disabled={orderSelected === null}
          className={`btn_upload ${orderSelected === null && "disabled"}`}
          onClick={() => {
            setShowAddProduct(true);

            setView("addProduct");
          }}
        >
          Continuar
        </Button>
      </div>
    </DialogContainer>
  );
}
