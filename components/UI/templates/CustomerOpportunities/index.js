import React, { useEffect, useState } from "react";
import { MenuFile, PreviewOportunitiesStyle } from "../../../MenuInfoClient/styles";
import EmptyData from "../../../PreviewEmpty";
import LoaderPreview from "../../../LoaderPreviews";
import { AttachMoney, FiberManualRecord, MoreVert, Today } from "@material-ui/icons";
import dayjs from "dayjs";
import { Box, Button, LinearProgress, Tooltip } from "@material-ui/core";
import { formatNumberNoSymbol, toUpperCaseChart } from "../../../../utils";
import { useRouter } from "next/router";
import { setArrayProducts } from "../../../../redux/slices/quotesSlice";
import { useDispatch } from "react-redux";

export default function CustomerOportunity({ isFetching, oportunities }) {
  const dispatch = useDispatch();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const [fileSelected, setFileSelected] = useState({});
  const id = open ? "simple-popover" : undefined;
  const router = useRouter();
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
  const handleClickQuoteAgain = () => {
    handleClose();
    dispatch(setArrayProducts([]));
    router.push({
      pathname: `/oportunidades/nuevo/`,
      query: { o: fileSelected?.id },
    });
  };
  const handleClickEditOportunity = () => {
    handleClose();
    router.push({
      pathname: `/oportunidades/editar/`,
      query: { o: fileSelected?.id },
    });
  };
  const convertToSale = () => {
    handleClose();
    router.push({
      pathname: `/clientes/nuevo/`,
      query: { o: fileSelected?.id, p: fileSelected?.prospectId },
    });
  };
  const OportunityView = item => {
    console.log("fiñle", item);

    router.push({
      pathname: `/oportunidades/${item?.prospectId}`,
    });
  };
  return (
    <PreviewOportunitiesStyle>
      {!isFetching?.oportunities && oportunities?.count <= 0 && <EmptyData />}
      {isFetching?.oportunities && <LoaderPreview />}
      {!isFetching?.oportunities &&
        oportunities?.results?.map(oportunity => {
          return (
            <div key={oportunity.id} className="card">
              <div className="card-body">
                <div className="top">
                  <div className="item">
                    <FiberManualRecord className="iconStatus" />
                    <Tooltip title="Ver Cotizacion ">
                      <p className="dateRedirect" onClick={e => OportunityView(oportunity)}>
                        Concepto: {oportunity?.concept}
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
                        <Button className="option" onClick={handleClickEditOportunity}>
                          Editar Cotización
                        </Button>
                        <Button className="option" onClick={handleClickQuoteAgain}>
                          Cotizar Nuevamente
                        </Button>
                        <Button className="option" onClick={convertToSale}>
                          Crear Venta
                        </Button>
                      </div>
                    </MenuFile>
                  </div>
                </div>
                <div className="totalTop">
                  <div>
                    <p className="title">Monto Total:</p>
                    <div className="card-header">
                      <p className="location">
                        <AttachMoney className="icon" />
                        {formatNumberNoSymbol(oportunity?.amount)}
                      </p>
                    </div>
                  </div>
                  <div>
                    <p className="title">Comision:</p>
                    <div className="card-header">
                      <p className="location">
                        <AttachMoney className="icon" />
                        {formatNumberNoSymbol(oportunity?.comission)}
                      </p>
                    </div>
                  </div>
                  <div>
                    <p className="title">Fase:</p>
                    <p className="data status">{toUpperCaseChart(oportunity?.phase?.name)}</p>
                  </div>
                </div>
                <p className="title">Productos Cotizados: ({oportunity?.productsoportunities?.length})</p>
                <div className="products" style={{ width: "100%" }}>
                  <div className="containerProducts">
                    {oportunity?.productsoportunities &&
                      oportunity?.productsoportunities.map(
                        (pro, i) =>
                          i < oportunity?.productsoportunities.length && (
                            <p className="products" key={pro.id}>
                              {i + 1 + ") "} {pro?.product?.name}
                            </p>
                          )
                      )}
                  </div>
                </div>
                <p className="title">Observaciones:</p>
                <textarea
                  className="observations"
                  value={oportunity?.generalobservations ? oportunity?.generalobservations : "Sin Observaciones"}
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
    </PreviewOportunitiesStyle>
  );
}
