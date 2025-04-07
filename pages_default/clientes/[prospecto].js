import { Button, Dialog, Divider, Grid, LinearProgress, Popover, Tooltip } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import TableTracing from "../../components/TableTracing";
import TableSlopes from "../../components/TableSlopes";
import { useRouter } from "next/router";
import { api } from "../../services/api";
import DrawerEditProspect from "../../components/EditProspect";
import AlertGlobal from "../../components/Alerts/AlertGlobal";
import RelatedContacts from "../../components/TableContact";
import TableSales from "../../components/TableSales";
import DrawerPreviewSale from "../../components/DrawerPreviewSale";
import TableQuotes from "../../components/TableQuotes";
import DrawerPreviewQuote from "../../components/DrawerPreviewQuote";
import ReturnButton from "../../components/ReturnButton";
import TableOrder from "../../components/TableOrder";
import ModalReasigned from "../../components/ModalReasigned";
import MainLayout from "../../components/MainLayout";
import { ProspectoStyled } from "../../styles/Clientes/cliente.styled";
import InfoClient from "../../components/InformationClientProfile";
import TableSalesPayments from "../../components/TableSalesPayments";
import ClientsFiles from "../../components/TableClientsFiles";
import DrawerOrder from "../../components/DrawerOrder";
import LoadingImage from "../../components/UI/atoms/LoadingImage";
const Cliente = () => {
  const router = useRouter();
  const [prospect, setProspect] = useState({});
  const [prospectDataReasign, setProspectDataReasign] = useState({});
  const [oportunities, setoportunities] = useState([]);
  const [isLoading, setIsLoading] = useState([]);
  const [flag, setFlag] = useState(false);
  const [Alert, setAlert] = useState({ severity: null, show: null, message: "", type: null });
  const [prospectEdit, setprospectEdit] = useState({});
  const [openEdit, setOpenEdit] = useState(false);
  const [openReasign, setOpenReasign] = useState(false);
  const { prospecto, cve } = router.query;
  // OportunityStatesquotes
  const [openPreviewQuoteOportunity, setOpenPreviewQuoteOportunity] = useState(false);
  // OportunityStates
  const [openPreviewQuote, setOpenPreviewQuote] = useState(false);
  const [oportunitySelect, setOportunitySelect] = useState(undefined);
  //tabs
  const [optionSelected, setOptionSelected] = useState("quotes");
  // PREVIEW oRDERS
  const [showDrawer, setshowDrawer] = useState(false);
  useEffect(() => {
    let mounted = true;
    if (mounted) {
      getDataInitial(mounted);
    }

    return () => (mounted = false);
  }, [flag, prospecto]);

  useEffect(() => {
    if (openReasign === false) setProspectDataReasign(prospect);
  }, [prospectDataReasign]);

  useEffect(() => {
    const scroll = () => {
      const element = document.getElementById(router.query.scrollTo);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    };
    scroll();
  });

  const getDataInitial = async () => {
    if (!prospecto) return;
    try {
      let Prospect = await api.get(
        `prospects/${prospecto}?include=city,category,entity,phase,origin,clientcompany,clienttype,specialty,postal,prospectslabels,prospectslabels.label,channel`
      );
      setProspect(Prospect.data);
      setProspectDataReasign(Prospect.data);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const handleAlert = (severity, message, type) => {
    setAlert({ severity: severity, show: true, message: message, type: type });
    setTimeout(() => {
      setAlert({ severity: severity, show: false, message: message, type: null });
    }, 3000);
  };

  const handleClickSales = item => {
    setOportunitySelect(item);
    setOpenPreviewQuote(true);
  };
  const handleClickQuotes = item => {
    setOportunitySelect(item);
    setOpenPreviewQuoteOportunity(true);
  };
  const handleClickOrder = item => {
    setOportunitySelect(item);
    setshowDrawer(true);
  };

  const handleTabs = option => setOptionSelected(option);
  const renderContent = () => {
    switch (optionSelected) {
      case "quotes":
        return (
          <div id="quotes">
            <TableQuotes
              scrollTo={router.query.scrollTo === "quotes"}
              handleClickQuote={handleClickQuotes}
              footer={true}
              prospect={prospect}
              handleAlert={handleAlert}
              setAlert={setAlert}
              setFlag={() => setFlag(!flag)}
            />
          </div>
        );
      case "orders":
        return (
          <div id="order">
            <TableOrder
              scrollTo={router.query.scrollTo === "order"}
              handleClickOrder={handleClickOrder}
              footer={true}
              prospect={prospect}
              handleAlert={handleAlert}
              setAlert={setAlert}
              setFlag={() => setFlag(!flag)}
            />
          </div>
        );
      case "payments":
        return (
          <TableSalesPayments
            footer={true}
            prospect={prospect}
            oportunity={null}
            handleAlert={handleAlert}
            setAlert={setAlert}
            setFlag={() => setFlag(!flag)}
          />
        );
      case "files":
        return (
          <ClientsFiles
            footer={true}
            prospect={prospect}
            handleAlert={handleAlert}
            isProspecto={true}
            setAlert={setAlert}
            setFlag={() => setFlag(!flag)}
          />
        );

      case "trackings":
        return (
          <div id="seguimientos">
            <TableTracing
              scrollTo={router.query.scrollTo === "seguimientos"}
              footer={true}
              prospect={prospect}
              trackingFlag={true}
              handleAlert={handleAlert}
              setAlert={setAlert}
              setFlag={() => setFlag(!flag)}
            />
          </div>
        );

      case "pendings":
        return (
          <div id="pendientes">
            <TableSlopes
              scrollTo={router.query.scrollTo === "pendientes"}
              footer={true}
              prospect={prospect}
              oportunities={oportunities}
              isCloseout={true}
              handleAlert={handleAlert}
              setAlert={setAlert}
              setFlag={() => setFlag(!flag)}
            />
          </div>
        );

      case "sales":
        return (
          <div id="ventas">
            <TableSales
              scrollTo={router.query.scrollTo === "ventas"}
              handleClickSales={handleClickSales}
              footer={true}
              prospect={prospect}
              handleAlert={handleAlert}
              setAlert={setAlert}
              setFlag={() => setFlag(!flag)}
            />
          </div>
        );
      case "contacts":
        return <RelatedContacts prospect={prospect} />;
      default:
        break;
    }
  };
  return (
    <MainLayout>
      <ProspectoStyled>
        <div className="main">
          <div className="ctr_prospecto">
            <ReturnButton text={"Cliente"} />
            {!isLoading && (
              <div className="ctr_prospecto__info">
                <InfoClient
                  flag={flag}
                  setFlag={setFlag}
                  prospect={prospect}
                  setprospectEdit={setprospectEdit}
                  setOpenEdit={setOpenEdit}
                  openEdit={openEdit}
                  openReasign={openReasign}
                  setOpenReasign={setOpenReasign}
                />
                <div className="divider" />
                <div className="tabs">
                  <p
                    className={`title ${optionSelected === "quotes" && "selected"}`}
                    onClick={() => handleTabs("quotes")}
                  >
                    Cotizaciones
                  </p>
                  <p
                    className={`title ${optionSelected === "sales" && "selected"}`}
                    onClick={() => handleTabs("sales")}
                  >
                    ventas
                  </p>
                  <p
                    className={`title ${optionSelected === "orders" && "selected"}`}
                    onClick={() => handleTabs("orders")}
                  >
                    Pedidos
                  </p>
                  <p
                    className={`title ${optionSelected === "payments" && "selected"}`}
                    onClick={() => handleTabs("payments")}
                  >
                    Pagos
                  </p>
                  <p
                    className={`title ${optionSelected === "files" && "selected"}`}
                    onClick={() => handleTabs("files")}
                  >
                    Archivos
                  </p>
                  <p
                    className={`title ${optionSelected === "trackings" && "selected"}`}
                    onClick={() => handleTabs("trackings")}
                  >
                    Seguimientos
                  </p>
                  <p
                    className={`title ${optionSelected === "pendings" && "selected"}`}
                    onClick={() => handleTabs("pendings")}
                  >
                    Pendientes
                  </p>
                  <p
                    className={`title ${optionSelected === "contacts" && "selected"}`}
                    onClick={() => handleTabs("contacts")}
                  >
                    Contactos Relacionados
                  </p>
                </div>
                <div className="divider" />
                <div className="render_container">{renderContent()}</div>
              </div>
            )}
            {isLoading && <LoadingImage />}
          </div>
        </div>

        <DrawerEditProspect
          openEdit={openEdit}
          setOpenEdit={setOpenEdit}
          prospectEdit={prospectEdit}
          setFlag={() => setFlag(!flag)}
          activityFrom="clients"
        />
        {Alert?.show && (
          <AlertGlobal severity={Alert.severity} message={Alert.message} show={Alert.show} type={Alert.type} />
        )}

        <DrawerPreviewSale
          prospect={prospect}
          oportunitySelect={oportunitySelect}
          open={openPreviewQuote}
          setOpen={setOpenPreviewQuote}
        />
        <DrawerPreviewQuote
          prospect={prospect}
          oportunitySelect={oportunitySelect}
          open={openPreviewQuoteOportunity}
          setOpen={setOpenPreviewQuoteOportunity}
        />
        <DrawerOrder
          width={"60%"}
          closeDrawer={() => setshowDrawer(!showDrawer)}
          show={showDrawer}
          isOportunity={true}
          prospectId={oportunitySelect?.oportunity?.prospectId}
          oportunityId={oportunitySelect?.oportunityId}
          ordersId={oportunitySelect?.id}
        />
        <ModalReasigned
          Prospect={prospectDataReasign}
          setProspect={setProspectDataReasign}
          open={openReasign}
          setopen={setOpenReasign}
          flag={flag}
          setFlag={setFlag}
        />
      </ProspectoStyled>
    </MainLayout>
  );
};

export default Cliente;
