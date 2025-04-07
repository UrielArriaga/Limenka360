import React, { useEffect, useState } from "react";
import { MenuFile, PreviewSalesStyle } from "../../../MenuInfoClient/styles";
import EmptyData from "../../../PreviewEmpty";
import LoaderPreview from "../../../LoaderPreviews";
import { AttachMoney, FiberManualRecord, MoreVert, ShoppingBasket, Today, Visibility } from "@material-ui/icons";
import dayjs from "dayjs";
import { Box, Button, LinearProgress, Tooltip } from "@material-ui/core";
import { formatNumberNoSymbol } from "../../../../utils";
import { useRouter } from "next/router";
import { api } from "../../../../services/api";
import { setArrayProducts } from "../../../../redux/slices/quotesSlice";
import { useDispatch } from "react-redux";

export default function CustomerSales({ isFetching, sales }) {
  const dispatch = useDispatch();
  const [anchorEl, setAnchorEl] = useState(null);
  const [fileSelected, setFileSelected] = useState({});
  const open = Boolean(anchorEl);
  const router = useRouter();
  const id = open ? "simple-popover" : undefined;

  const handleClose = () => setAnchorEl(null);

  function LinearProgressWithLabel(props) {
    return (
      <Box display="flex" alignItems="center">
        <Box width="100%" mr={1}>
          <LinearProgress variant="determinate" {...props} />
        </Box>
        <Box minWidth={35}>
          <div variant="body2" color="textSecondary">{`${Math.round(props.value)}%`}</div>
        </Box>
      </Box>
    );
  }

  const handleClick = (event, file) => {
    setFileSelected(file);
    setAnchorEl(event.currentTarget);
  };

  const handleMakeOrder = item => {
    if (item.isorder) {
      let params = {
        where: JSON.stringify({
          oportunityId: item.id,
        }),
        keys: "id",
      };
      api
        .get(`orders`, { params })
        .then(res => {
          let idOrder = res.data.results[0].id;
          router.push({
            pathname: "pedidos/pedido",
            query: {
              pe: idOrder,
              pr: item?.prospectId,
              op: item?.id,
            },
          });
        })
        .catch(err => console.log(err));
    } else {
      router.push({
        pathname: "pedidos/nuevo",
        query: { o: item.id, p: item.prospectId },
      });
      dispatch(setArrayProducts([]));
    }
  };
  const salesEdit = () => {
    handleClose();
    router.push({
      pathname: "/clientes/editar",
      query: {
        o: fileSelected.id,
      },
    });
  };
  const handleClickView = item => {
    handleClose();
    router.push({
      pathname: "ventas/[prospecto]",
      query: { prospecto: item.prospectId, o: item.id },
    });
  };
  return (
    <PreviewSalesStyle>
      {!isFetching?.sales && sales?.count <= 0 && <EmptyData />}
      {isFetching?.sales && <LoaderPreview />}
      {!isFetching?.sales &&
        sales?.results?.map(oportunity => {
          return (
            <div key={oportunity.id} className="card">
              <div className="card-body">
                <div className="top">
                  <div className="item">
                    <FiberManualRecord className="iconStatus" />
                    <Tooltip title="Ver Venta">
                      <p className="dateRedirect" onClick={e => handleClickView(oportunity)}>
                        Concepto: {oportunity.concept}{" "}
                      </p>
                    </Tooltip>
                  </div>
                  <div className="item">
                    <Today className="icon" />
                    <p className="date">
                      Fecha de cierre: {dayjs(oportunity?.estimatedclossing).format("MMMM DD, YYYY")}.
                    </p>
                    <Tooltip title="Opciones" arrow={true} className="menuButton">
                      <MoreVert className="options" aria-describedby={id} onClick={e => handleClick(e, oportunity)} />
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
                        <Button className="option" onClick={salesEdit}>
                          Editar
                        </Button>

                        {fileSelected?.isorder ? (
                          <Button
                            endIcon={<ShoppingBasket className="icon_option" />}
                            className="optionDisabled"
                            disabled={true}
                          >
                            Realizar Pedido
                          </Button>
                        ) : (
                          <Button
                            className="option"
                            endIcon={<ShoppingBasket className="icon_option" />}
                            onClick={() => {
                              handleClose();
                              handleMakeOrder(fileSelected);
                            }}
                          >
                            Realizar Pedido
                          </Button>
                        )}
                      </div>
                    </MenuFile>
                  </div>
                </div>
                <div className="headTop">
                  <div>
                    <p className="title">Monto Total:</p>
                    <div className="text-Amount">
                      <p className="amount">
                        <AttachMoney className="icon" />
                        {formatNumberNoSymbol(oportunity?.amount)}
                      </p>
                    </div>
                  </div>
                  <div>
                    <p className="title">Comision Total:</p>
                    <div className="text-Amount">
                      <p className="amount">
                        <AttachMoney className="icon" />
                        {formatNumberNoSymbol(oportunity?.comission)}
                      </p>
                    </div>
                  </div>
                </div>
                <p className="title">Productos: ({oportunity?.productsoportunities?.length})</p>
                <div className="products" style={{ width: "100%" }}>
                  <div className="containerProducts">
                    {oportunity?.productsoportunities &&
                      oportunity?.productsoportunities.map(
                        (pro, i) =>
                          i < oportunity?.productsoportunities.length && (
                            <p className="products" key={pro?.id}>
                              {i + 1 + ") "} {pro?.product?.name}
                            </p>
                          )
                      )}
                  </div>
                </div>
                <p className="title">Observaciones:</p>
                <textarea
                  className="observations"
                  value={oportunity?.generalobservations ? oportunity.generalobservations : "Sin Observaciones"}
                  readOnly={true}
                />
              </div>
              <div className="card-footer">
                <p className="title">Certeza:</p>
                <LinearProgressWithLabel value={oportunity?.certainty}></LinearProgressWithLabel>
              </div>
            </div>
          );
        })}
    </PreviewSalesStyle>
  );
}
