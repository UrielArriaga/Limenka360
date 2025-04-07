import React, { useEffect, useState } from "react";
import { MenuFile, PreviewOportunitiesStyle } from "../../../MenuInfoClient/styles";
import EmptyData from "../../../PreviewEmpty";
import LoaderPreview from "../../../LoaderPreviews";
import { FiberManualRecord, MoreVert, Today } from "@material-ui/icons";
import { Box, Button, Tooltip } from "@material-ui/core";
import { formatDate, formatNumber, toUpperCaseChart } from "../../../../utils";
import { useRouter } from "next/router";

export default function CustomerOrders({ isFetching, orders }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const [fileSelected, setFileSelected] = useState({});
  const open = Boolean(anchorEl);
  const router = useRouter();
  const id = open ? "simple-popover" : undefined;
  const handleClose = () => setAnchorEl(null);

  const handleClick = (event, file) => {
    setFileSelected(file);
    setAnchorEl(event.currentTarget);
  };
  const handleClickRedirect = itemClient => {
    router.push({
      pathname: "pedidos/pedido",
      query: {
        pe: itemClient?.id,
        pr: itemClient?.oportunity?.prospectId,
        op: itemClient?.oportunityId,
      },
    });
  };

  return (
    <PreviewOportunitiesStyle>
      {!isFetching?.orders && orders?.count <= 0 && <EmptyData />}
      {isFetching?.orders && <LoaderPreview />}
      {!isFetching?.orders &&
        orders?.results?.map((item, index) => {
          return (
            <div key={index} className="card">
              <div className="top">
                <div className="item">
                  <FiberManualRecord className="iconStatus" />
                  <Tooltip title="Ver Pedido">
                    <p className="dateRedirect" onClick={e => handleClickRedirect(item)}>
                      Concepto: {item?.folio}
                    </p>
                  </Tooltip>
                </div>
                <div className="item">
                  <Today className="icon" />
                  <p className="date">Fecha Creación: {formatDate(item.createdAt)}</p>
                  <Tooltip title="Opciones" arrow={true} className="menuButton">
                    <MoreVert className="options" aria-describedby={id} onClick={e => handleClick(e, item)} />
                  </Tooltip>
                  <MenuFile
                    id={id}
                    open={open}
                    anchorEl={anchorEl}
                    onClose={handleClose}
                    anchorOrigin={{
                      vertical: "bottom",
                      horizontal: "center",
                    }}
                    transformOrigin={{
                      vertical: "top",
                      horizontal: "center",
                    }}
                  >
                    <div className="container">
                      <Button
                        className="option"
                        onClick={() => {
                          handleClose();

                          router.push({
                            pathname: "/pedidos/EditarPedido",
                            query: {
                              pe: fileSelected?.id,
                              op: fileSelected?.oportunityId,
                            },
                          });
                        }}
                      >
                        Editar
                      </Button>
                      <Button
                        className="option"
                        onClick={() => {
                          handleClose();
                          router.push({
                            pathname: "pedidos/pedido",
                            query: {
                              pe: item.id,
                              pr: item?.oportunity?.prospectId,
                              op: item?.oportunity?.id,
                            },
                          });
                        }}
                      >
                        Ver Pedido
                      </Button>
                    </div>
                  </MenuFile>
                </div>
              </div>

              <div className="itemDiv">
                <p className="title">Total:</p>
                <p className="data status">{formatNumber(item?.total)}</p>
              </div>
              <div className="itemDiv">
                <p className="title">Estado Pedido:</p>
                <p className="data status">{item?.orderstatus?.name}</p>
              </div>
              <div className="itemDiv">
                <p className="title">Cuenta:</p>
                <p className="data status">{toUpperCaseChart(item?.paymentaccount?.name)}</p>
              </div>

              <div className="itemDiv">
                <p className="title">Télefono Envio:</p>
                <p className="data status"> {item?.phone}</p>
              </div>
              <div className="itemDiv">
                <p className="title">Estado Envio:</p>
                <p className="data status">{item?.address?.entity?.name}</p>
              </div>
              <div className="itemDiv">
                <p className="title">Municipio Envio:</p>
                <p className="data status">{item?.address?.city?.name}</p>
              </div>
              <div className="itemDiv">
                <p className="title">Factura:</p>
                <p className="data status"> {item?.billing ? "con factura" : "sin factura"}</p>
              </div>
              <div className="itemDiv">
                <p className="title">Observaciones:</p>
                <p className="data status">{item?.observations}</p>
              </div>
            </div>
          );
        })}
    </PreviewOportunitiesStyle>
  );
}
