import { Button, DialogActions, DialogContent, DialogTitle, IconButton, LinearProgress } from "@material-ui/core";
import { Add, AttachFile, BubbleChart, ChatBubbleOutline, CheckCircle, Close } from "@material-ui/icons";
import React, { useEffect, useMemo, useState } from "react";
import { ORDERSTATUS_ALMACEN } from "../../../../constants";
import { formatNumber } from "../../../../utils";
import BillingInfo from "./BillingInfo";
import AddressInfo from "./AddressInfo";
import { Dot, LoaderWrapper, PreviewOrderStyled } from "./styles";
import ModalRejectedOrder from "../ModalRejectedOrder";
import MenuOptions from "../MenuOptions";
import InfoProspect from "../InfoProspect/infoProspect.js";
import { useSelector } from "react-redux";
import { userSelector } from "../../../../redux/slices/userSlice.js";
import ModalSelectedProvider from "../ModalSelectedProvider/index.js";
import DifferentProvider from "../DifferentProvider/index.js";
import Headerinstructions from "../Headerinstructions/index.js";
import SalesOrderData from "./SalesOrderData.js";
import OrderButtons from "./OrderButtons .js";
import ProductTable from "./ProductTable.js";
import useSelectedProducts from "../../hooks/useSelectedProducts.js";
import NewTrackinsOrder from "../../../../componentx/common/NewTrackinsOrder";
import ModalPdfPrint from "../../../../components/ModalPdfPrint/index.js";
import ModalDowloandPdf from "../../../../components/ModalDowloandPdf/index.js";
import ModalStatusOrder from "../ModalStatusOrder/index.js";

export default function PreviewOrder({
  isFetchingOrder,
  orderSelectedData,
  handleOnClickClosePreview,
  toggleTrackingsModal,
  handleToggleFiles,
  productsData,
  handleClickFillOrder,
  handleClickProduct,
  markedDeliveryProduct,
  isChecked,
  setRejectedOptionSelected,
  handleReject,
  handleRejectOrder,
  handleMenuOpen,
  anchorEl,
  openRejected,
  closeModalReject,
  handleMenuClose,
  toggleModalRejected,
  handleRemoveRejectOrder,
  totalOrdersShopping,
  productToOrderSelected,
  setProductToOrderSelected,
  toggleModal,
}) {
  if (isFetchingOrder) {
    return (
      <LoaderWrapper>
        <Dot />
        <Dot />
        <Dot />
      </LoaderWrapper>
    );
  }
  const { roleId } = useSelector(userSelector);
  const isMarked = orderSelectedData?.exitstatus === ORDERSTATUS_ALMACEN.revisado;
  const {
    purcharseOrdersToPickups,
    setPurcharseOrdersToPickups,
    selectedProvider,
    setSelectedProvider,
    selectAll,
    setSelectAll,
    openWarningModal,
    openProviderWarningModal,
    setOpenProviderWarningModal,
    currentProduct,
    getSortedProductsByRole,
    canSelectProduct,
    getAvailableProviders,
    handleAccept,
    handleSelectAll,
    handleAddPurcharseOrder,
    handleCloseWarningModal,
  } = useSelectedProducts(productsData);

  const handleAddToOrder = data => {
    setProductToOrderSelected(data);
    toggleModal();
  };

  const calculateUtility = (pList, pNewPrice) => {
    if (pList === 0) {
      return {
        valueString: "na",
        percent: 0,
        value: 0,
      };
    }
    const utility = pNewPrice - pList;
    let valueString = "";

    if (utility == 32) {
      valueString = "normal";
    }

    if (utility > 32) {
      valueString = "alto";
    }

    if (utility < 32) {
      valueString = "bajo";
    }

    return {
      valueString,
      percent: ((utility / pList) * 100).toFixed(2),
      value: utility,
    };
  };

  const getMenuOptions = () => {
    return [
      {label: "Cambiar Status",action: handleRejectOrder},
      { label: "Enviar a completados", action: markedDeliveryProduct },
    ];
  };

  const calculateAverageUtility = productsData => {
    if (!productsData?.results?.length) {
      return 0;
    }

    const totalUtility = productsData.results.reduce((acc, product) => {
      const amount = product?.product?.amount;
      const newPrice = product?.newprice;

      if (amount !== undefined && newPrice !== undefined) {
        const utility = calculateUtility(amount, newPrice)?.percent;
        return acc + (utility || 0);
      }

      return acc;
    }, 0);

    return totalUtility / productsData.results.length;
  };

  const averageUtility = useMemo(() => calculateAverageUtility(productsData), [productsData]);

  const getColor = avg => {
    if (avg < 0) {
      return "red";
    }
    if (avg > 1.6) {
      return "green";
    }
    return "black";
  };

  return (
    <PreviewOrderStyled>
      <div className="headerpreview">
        <p className="concept">{orderSelectedData?.folio}</p>
        <div className="headerpreview__listactions">
          <div className="headerpreview__listactions--item">
            <ModalDowloandPdf pdfUrl={orderSelectedData?.url} />
          </div>

          <div className="headerpreview__listactions--item" onClick={() => handleToggleFiles()}>
            <AttachFile className="icon" />
            <p className="text">Archivos Adjuntos</p>
          </div>
          <div className="headerpreview__listactions--item" onClick={() => toggleTrackingsModal()}>
            <ChatBubbleOutline className="icon" />
            <p className="text">Ver Seguimientos</p>
          </div>

          <div className="headerpreview__listactions--item">
            <Button
              variant="contained"
              color="primary"
              className={`button ${totalOrdersShopping === 0 ? "buttondisabled" : ""}`}
              disabled={totalOrdersShopping === 0}
              onClick={() => markedDeliveryProduct()}
            >
              Ver Estatus
            </Button>
          </div>
          <div className="headerpreview__listactions--item">
            <MenuOptions
              handleMenuOpen={handleMenuOpen}
              anchorEl={anchorEl}
              handleMenuClose={handleMenuClose}
              handleRejectOrder={handleRejectOrder}
              options={getMenuOptions()}
            />
          </div>

          <IconButton onClick={handleOnClickClosePreview}>
            <Close />
          </IconButton>
        </div>
      </div>
      <div className="contentpreview">
        <Headerinstructions />
        <div className="rowprevalig">
          <SalesOrderData orderSelectedData={orderSelectedData} />
          <div className={`averagestatus ${getColor(averageUtility)}`}>
            <p style={{ fontWeight: "bold", fontSize: 18 }}>Utilidad promedio: {averageUtility || 0}%</p>
            {/* {orderSelectedData?.statuspoo?.name && <p>{orderSelectedData?.statuspoo?.name}</p>} */}
          </div>
        </div>
        <div className="rowprev">
          <div className="contentpreview__address">
            <p className="contentpreview__address--title">Datos del Cliente</p>
            <InfoProspect dataProspect={orderSelectedData?.oportunity?.prospect} />
          </div>
          <div className="contentpreview__address">
            <p className="contentpreview__address--title">Datos de Envio</p>
            <AddressInfo orderSelectedData={orderSelectedData} />
          </div>
          <div className="contentpreview__customer">
            <p className="contentpreview__customer--title">Dirección de Facturación</p>
            <BillingInfo orderSelectedData={orderSelectedData} />
          </div>
        </div>

        <div className="contentpreview__containerTable">
          <OrderButtons
            purcharseOrdersToPickups={purcharseOrdersToPickups}
            handleAddToOrder={handleAddToOrder}
            setPurcharseOrdersToPickups={setPurcharseOrdersToPickups}
            setSelectAll={setSelectAll}
            setSelectedProvider={setSelectedProvider}
          />

          <div className="contentpreview__products">
            <ProductTable
              productsData={productsData}
              purcharseOrdersToPickups={purcharseOrdersToPickups}
              handleAddPurcharseOrder={handleAddPurcharseOrder}
              canSelectProduct={canSelectProduct}
              handleClickProduct={handleClickProduct}
              getSortedProductsByRole={getSortedProductsByRole}
              roleId={roleId}
              formatNumber={formatNumber}
              calculateUtility={calculateUtility}
              selectAll={selectAll}
              handleSelectAll={handleSelectAll}
              handleAddToOrder={handleAddToOrder}
              setPurcharseOrdersToPickups={setPurcharseOrdersToPickups}
              setSelectAll={setSelectAll}
              setSelectedProvider={setSelectedProvider}
            />
          </div>

          <div className="contentpreview__amounts">
            <div className="row">
              <p>Subtotal: </p>
              <p> {formatNumber(orderSelectedData?.oportunity?.subtotal)} </p>
            </div>
          </div>
        </div>

        <NewTrackinsOrder orderData={orderSelectedData} />
      </div>

      <DifferentProvider
        currentProduct={currentProduct}
        openProviderWarningModal={openProviderWarningModal}
        setOpenProviderWarningModal={setOpenProviderWarningModal}
      />

      <ModalSelectedProvider
        openWarningModal={openWarningModal}
        handleCloseWarningModal={handleCloseWarningModal}
        selectedProvider={selectedProvider}
        setSelectedProvider={setSelectedProvider}
        getAvailableProviders={getAvailableProviders}
        handleAccept={handleAccept}
      />

      <ModalRejectedOrder
        open={openRejected}
        close={closeModalReject}
        handleReject={handleReject}
        toggleModalRejected={toggleModalRejected}
        setRejectedOptionSelected={setRejectedOptionSelected}
      />
      <ModalStatusOrder
      open={openRejected}
      close={closeModalReject}
      handleReject={handleReject}
      toggleModalRejected={toggleModalRejected}
      setRejectedOptionSelected={setRejectedOptionSelected}
      />

    </PreviewOrderStyled>
  );
}
