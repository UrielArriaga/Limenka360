import styled, { keyframes } from "styled-components";

export const PreviewOrderStyled = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 20px;
  background-color: #f5f7fa;
  z-index: 3;
  position: relative;
  .headerpreview {
    position: sticky;
    top: 0;
    background: white;
    border-radius: 8px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px;
    z-index: 1000;

    .concept {
      font-weight: bold;
    }

    .headerpreview__listactions {
      display: flex;
      align-items: center;
      gap: 10px;

      &--item {
        display: flex;
        align-items: center;
        padding: 0 10px;
        cursor: pointer;
        color: #616161;

        .icon {
          font-size: 15px;
        }

        .text {
          font-size: 13px;
          margin-left: 5px;
        }

        .button {
          background-color: #039be5;
          color: #fff;
          border: 1px solid #ccc;
          border-radius: 5px;
        }

        .buttondisabled {
          background-color: #ccc;
          color: #fff;
          border: 1px solid #ccc;
          border-radius: 5px;
        }
      }
    }
  }

  .tabs {
    display: flex;
    gap: 20px;
    margin-top: 0px;
    .tab {
      background: #cfd8dc;
      padding: 10px 20px;

      border-radius: 8px;
      cursor: pointer;
      .tab__title {
        color: #263238;
        font-size: 12px;
        font-weight: bold;
      }
    }
  }

  .text_observations {
    color: #858585;
    margin: 10px 0px 10px 0px;
    font-weight: 500;
  }
  .contentpreview {
    flex: 1;
    overflow-y: auto;
    padding: 20px;
    background-color: #ffffff;
    border-radius: 9px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

    .headerinstructions {
      border: 1px solid #ccc;
      padding: 20px 10px;
      margin-bottom: 20px;
      display: flex;
      align-items: center;

      .icon {
        font-size: 20px;
        margin-right: 10px;
        color: #039be5;
      }

      .guide {
        font-size: 14px;
        font-weight: bold;
      }

      .guidedescription {
        font-size: 12px;
        color: #757575;
        margin-left: 10px;
      }
    }

    .content_day {
      background: red;
      color: white;
      border-radius: 5px;
      font-size: 12px;
      padding: 5px;
    }
    .content_daypast {
      background: #00e676;
      color: white;
      border-radius: 5px;
      font-size: 12px;
      padding: 5px;
    }
    max-height: calc(100vh - 268px);
    overflow: auto;
    ::-webkit-scrollbar {
      width: 6px;
      height: 6px;
    }
    ::-webkit-scrollbar-track {
      -webkit-box-shadow: inset 0 0 6px rgb(166 164 164 / 20%);
    }
    ::-webkit-scrollbar-thumb {
      -webkit-box-shadow: inset 0 0 20px #585858;
    }

    .rowprev {
      display: flex;
      justify-content: space-between;
      margin-top: 30px;
    }

    .rowprevalig {
      display: flex;
      justify-content: space-between;
      align-items: center;

      .row {
        display: flex;
        align-items: center;
        gap: 10px;

        .rowedit {
          display: flex;
          align-items: center;
          gap: 10px;
          cursor: pointer;

          &:hover {
            .icon {
              color: #039be5;
            }

            p {
              color: #039be5;
              visibility: visible;
            }
          }

          .icon {
            font-size: 16px;
            color: #757575;
          }
          p {
            font-size: 12px;
            color: #757575;
            visibility: hidden;
          }
        }
      }
    }

    &__customer {
      background-color: #fbf9f9;
      width: 40%;
      padding: 10px;
      position: relative;
      &--title {
        font-size: 16px;
        font-weight: bold;
        margin-bottom: 20px;
      }

      &--action {
        position: absolute;
        top: 10px;
        right: 10px;
        display: flex;
        align-items: center;
        cursor: pointer;
        animation: slide 3s infinite;
        transition: visibility 1s ease-in-out;

        &:hover {
          .icon {
            color: #039be5;
          }

          p {
            color: #039be5;
            visibility: visible;
          }
        }

        .icon {
          font-size: 16px;
          color: #757575;
        }
        p {
          font-size: 12px;
          color: #757575;
          visibility: hidden;
        }
      }

      &--item {
        display: flex;
        color: #757575;
        margin-bottom: 4px;
        font-size: 13px;

        .hightligth {
          margin-left: 10px;
        }
      }
    }
    &__clientinfo {
      margin-top: 5px;
      &--title {
        font-size: 16px;
        font-weight: bold;
      }
      &--item {
        display: flex;
        margin-bottom: 4px;
      }
      .hightligth {
        margin-left: 10px;
      }
    }
    &__address {
      background-color: #fbf9f9;
      width: 40%;
      padding: 10px;
      position: relative;
      &--title {
        font-size: 16px;
        font-weight: bold;
        margin-bottom: 20px;
      }

      &--action {
        position: absolute;
        top: 10px;
        right: 10px;
        display: flex;
        align-items: center;
        cursor: pointer;
        animation: slide 3s infinite;
        transition: visibility 1s ease-in-out;

        &:hover {
          .icon {
            color: #039be5;
          }

          p {
            color: #039be5;
            visibility: visible;
          }
        }

        .icon {
          font-size: 16px;
          color: #757575;
        }
        p {
          font-size: 12px;
          color: #757575;
          visibility: hidden;
        }
      }

      &--item {
        display: flex;
        color: #757575;
        margin-bottom: 4px;
        font-size: 13px;

        .hightligth {
          margin-left: 10px;
        }
      }
    }

    &__containerTable {
      margin-bottom: 20px;
      box-shadow: rgb(0 0 0 / 15%) 1.95px 1.95px 7.6px;
      margin-top: 29px;
    }

    &__products {
      .tablebody {
      }
      .table {
        width: 100%;
        border-collapse: collapse;
        font-size: 11px;
      }

      .tableheader {
        display: flex;
        background-color: #405189;
        color: white;
        border-top-left-radius: 9px;
        border-top-right-radius: 9px;
        padding: 10px;
        font-weight: bold;
        position: sticky;

        .tablehead {
          flex: 1;

          text-align: left;
          font-weight: bold;
        }

        .tableheadproductname {
          flex: 3;
        }
        .center {
          text-align: center;
        }
      }

      .tablerowpackage .tablerow {
        background-color: #b3e5fc;
      }

      .tablerowpackage .tablerowchild {
        background-color: #dbf4ff;
      }

      .tablerow {
        display: flex;
        /* border-bottom: 1px solid #e0e0e0; */
        padding: 10px;
        font-weight: bold;
        min-height: 40px;

        color: #616161;
        cursor: pointer;

        .tablecell {
          flex: 1;

          text-align: left;
          color: #616161;
          font-weight: bold;
        }

        .totalToExit {
          flex: 1;

          color: #fff;
          font-weight: bold;
          background-color: #039be5;
          border-radius: 8px;
          padding: 4px;
          text-align: center;
        }
        .code {
          color: #000;
        }

        .actions {
          button {
            margin-right: 10px;

            background-color: #405189;
            color: #fff;
            border: 1px solid #ccc;
            border-radius: 5px;
            padding: 5px 10px;
          }
        }

        .tableheadproductrow {
          flex: 3;

          .content {
            width: 80%;
          }
        }
        .center {
          text-align: center;
          font-size: 14px;
        }
      }

      .selected {
        background-color: #f1f1fa;
      }

      .stocksavailables {
        background-color: #f1f1fa;
        padding: 10px;
        font-size: 12px;
        h4 {
          margin-bottom: 10px;
          font-size: 14px;
        }

        .content {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 10px;
        }

        .itemwerehouse {
          padding: 10px;
          background-color: rgba(0, 230, 118, 0.3);
          border-radius: 8px;
        }

        .unit {
          color: #616161;
          font-weight: bold;
          margin-top: 10px;
        }
      }
    }

    &__products {
      table {
        width: 100%;
        border-collapse: collapse;
        font-size: 11px;

        thead {
          position: sticky;
          top: 0;
          z-index: 1;
          background-color: #405189;

          tr {
            th {
              color: white;
              padding: 10px;
              text-align: left;
              font-weight: bold;
              min-width: 150px;
            }

            .thproduct {
            }
          }
        }

        tbody {
          tr {
            border-bottom: 1px solid #e0e0e0;
            td {
              padding: 10px;

              text-align: left;
              color: #616161;
              font-weight: bold;
              height: 40px;
            }

            .actions {
              display: flex;

              button {
                margin-right: 10px;

                background-color: #405189;
                color: #fff;
                border: 1px solid #ccc;
                border-radius: 5px;

                cursor: pointer;
                font-size: 12px;
                padding: 5px 6px;
              }
              .iconButton {
                margin: 0;
                padding: 0;
              }

              .icon {
              }
            }
          }
        }

        .load {
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          width: 100%;

          &__img {
            width: 150px;
            animation: slide 3s infinite;

            img {
              width: 100%;
              object-fit: contain;
            }
          }
        }
      }
    }

    &__amounts {
      padding: 10px;
      margin-top: 50px;
      display: flex;
      justify-content: flex-end;

      .row {
        display: flex;
        margin-bottom: 10px;

        p {
          font-size: 16px;
          font-weight: bold;
        }
      }
    }

    &__observations {
      &--title {
        font-size: 16px;
        font-weight: bold;
        margin-bottom: 20px;
      }
    }
  }
  &__containerTable {
    margin-bottom: 20px;
    box-shadow: rgb(0 0 0 / 15%) 1.95px 1.95px 7.6px;

    max-height: 70vh;
    margin-top: 29px;
  }

  &__products {
    .tablebody {
    }
    .table {
      width: 100%;
      border-collapse: collapse;
      font-size: 11px;
    }

    .tableheader {
      display: flex;
      background-color: #405189;
      color: white;
      border-top-left-radius: 9px;
      border-top-right-radius: 9px;
      padding: 10px;
      font-weight: bold;
      position: sticky;

      .tablehead {
        flex: 1;

        text-align: left;
        font-weight: bold;
      }

      .tableheadproductname {
        flex: 3;
      }
    }

    .tablerow {
      display: flex;
      border-bottom: 1px solid #e0e0e0;
      padding: 10px;
      font-weight: bold;
      min-height: 40px;

      color: #616161;
      cursor: pointer;

      .tablecell {
        flex: 1;

        text-align: left;
        color: #616161;
        font-weight: bold;

        strong {
          font-weight: bold;
          color: #000;
        }
      }
      .code {
        color: #000;
      }

      .actions {
        button {
          margin-right: 10px;

          background-color: #405189;
          color: #fff;
          border: 1px solid #ccc;
          border-radius: 5px;
          padding: 5px 10px;
        }
      }

      .tableheadproductrow {
        flex: 3;
      }
    }

    .selected {
      background-color: #f1f1fa;
    }

    .stocksavailables {
      background-color: #f1f1fa;
      padding: 10px;
      font-size: 12px;
      h4 {
        margin-bottom: 10px;
        font-size: 14px;
      }

      .content {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 10px;
      }

      .itemwerehouse {
        padding: 10px;
        background-color: rgba(0, 230, 118, 0.3);
        border-radius: 8px;
      }

      .unit {
        color: #616161;
        font-weight: bold;
        margin-top: 10px;
      }
    }
  }

  &__products {
    table {
      width: 100%;
      border-collapse: collapse;
      font-size: 11px;

      thead {
        position: sticky;
        top: 0;
        z-index: 1;
        background-color: #405189;

        tr {
          th {
            color: white;
            padding: 10px;
            text-align: left;
            font-weight: bold;
            min-width: 150px;
          }

          .thproduct {
          }
        }
      }

      tbody {
        tr {
          border-bottom: 1px solid #e0e0e0;
          td {
            padding: 10px;

            text-align: left;
            color: #616161;
            font-weight: bold;
            height: 40px;
          }

          .actions {
            display: flex;

            button {
              margin-right: 10px;

              background-color: #405189;
              color: #fff;
              border: 1px solid #ccc;
              border-radius: 5px;

              cursor: pointer;
              font-size: 12px;
              padding: 5px 6px;
            }
            .iconButton {
              margin: 0;
              padding: 0;
            }

            .icon {
            }
          }
        }
      }

      .load {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        width: 100%;

        &__img {
          width: 150px;
          animation: slide 3s infinite;

          img {
            width: 100%;
            object-fit: contain;
          }
        }
      }
    }
  }
  .contentpreview_orderinfo {
    display: flex;
    justify-content: space-between;
    width: 100%;
    span {
      font-weight: 500;
      text-transform: capitalize;

      h3 {
        margin-bottom: 30px;
      }
    }
    .detailsInfo {
      .accountpay {
        background-color: #fbf9f9;
        padding: 5px;
        display: flex;
        align-items: center;
        cursor: pointer;
        span {
          font-size: 14px;
        }
        .iconEdit {
          font-size: 17px;
          color: #757575;
          cursor: pointer;
          :hover{
            color: #007aff;
          }
        }
      }
    }
  }
`;

export const bounce = keyframes`
  0%, 80%, 100% {
    transform: scale(0);
  }
  40% {
    transform: scale(1);
  }
`;

export const LoaderWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding-top: 40px;
  /* border: 1px solid #ccc; */
  height: 600px;
`;

export const Dot = styled.div`
  width: 10px;
  height: 10px;
  margin: 0 5px;
  background-color: #333;
  border-radius: 50%;
  display: inline-block;
  animation: ${bounce} 1.4s infinite ease-in-out both;

  &:nth-child(1) {
    animation-delay: -0.32s;
  }
  &:nth-child(2) {
    animation-delay: -0.16s;
  }
`;

// import { Button, IconButton } from "@material-ui/core";
// import { AttachFile, BubbleChart, ChatBubbleOutline, Close } from "@material-ui/icons";
// import dayjs from "dayjs";
// import { AnimatePresence, motion } from "framer-motion";
// import { useRouter } from "next/router";
// import React, { useEffect, useState } from "react";
// import { ORDERSTATUS_ALMACEN } from "../../../../constants";
// import { getColor, MoreDaysHavePassed, getLargestNumber } from "../../utils";
// import AddressInfo from "./AddressInfo";
// import BillingInfo from "./BillingInfo";
// import { Dot, LoaderWrapper, PreviewOrderStyled } from "./styles";
// import useModal from "../../../../hooks/useModal";
// import ModalWereHoseCount from "./ModalWereHoseCount";
// import ClientInfo from "./ClientInfo";
// import { formatNumberNoSymbol } from "../../../../utils";
// import TrackinsHistory from "../TrackingsHistory";
// import { api } from "../../../../services/api";
// import { useSelector } from "react-redux";
// import { userSelector } from "../../../../redux/slices/userSlice";
// import MenuOptions from "../MenuOptions";
// import ModalRejectedOrder from "../ModalRejectedOrder";
// import { getColorStatusOrder } from "../../../../utils/DirLog";
// import ModalPdfPrint from "../../../../components/ModalPdfPrint";

// export default function PreviewOrder({
//   isFetchingOrder,
//   orderSelectedData,
//   handleOnClickClosePreview,
//   toggleTrackingsModal,
//   handleToggleFiles,
//   productsData,
//   handleClickFillOrder,
//   refetchPedido,
//   getAvailableWereHousesByProduct,
//   werehouseProductsData,
//   actionsPedido,
//   statesPedido,
//   handleToggleWereHouses,
//   handleOnClickSaveOrder,
//   handleOnClickViewProduct,
//   markedDeliveryProduct,
//   handleRejectOrder,
//   handleMenuOpen,
//   handleMenuClose,
//   anchorEl,
//   openRejected,
//   closeModalReject,
//   handleReject,
//   toggleModalRejected,
//   setRejectedOptionSelected,
//   openModal,
// }) {
//   const { productOportunitySelected, wereHouseSelected, allProductsHaveWereHouse } = statesPedido;
//   const { handleOnClickwerehouse, setProductOportunitySelected, setWereHouseSelected, handleOnSendNotification } =
//     actionsPedido;

//   const { open, toggleModal } = useModal();

//   const isMarked = productsData?.results?.some(product => product.totalToExit > 0);

//   const isNew = orderSelectedData?.exitstatus === ORDERSTATUS_ALMACEN.pedidonuevo;

//   const [isOpen, setIsOpen] = useState(false);

//   const router = useRouter();

//   const getIndicatorClass = productOportunity => {
//     // let className = ""
//     // if(productOportunity?.)
//   };

//   if (isFetchingOrder) {
//     return (
//       <LoaderWrapper>
//         <Dot />
//         <Dot />
//         <Dot />
//       </LoaderWrapper>
//     );
//   }

//   const getMenuOptions = () => {
//     return [
//       { label: "Enviar a completados", action: markedDeliveryProduct },
//       { label: "Rechazar Pedido", action: handleRejectOrder },
//     ];
//   };

//   return (
//     <PreviewOrderStyled>
//       <div className="headerpreview">
//         <p className="concept" onClick={() => router.push(`./directorlogistica/pedidos/${orderSelectedData?.id}`)}>
//           {orderSelectedData?.folio}
//         </p>

//         <div className="headerpreview__listactions">
//           <div className="headerpreview__listactions--item">
//             <Button
//               // className="button"

//               // onClick={() => console.log("e")}
//               disabled={!isMarked}
//               className={` button ${!isMarked && "buttondisabled"}`}
//               onClick={() => {
//                 handleOnClickSaveOrder();
//               }}
//             >
//               Guardar Pedido
//             </Button>
//           </div>
//           <div className="headerpreview__listactions--item">
//             <ModalPdfPrint pdfUrl={orderSelectedData?.url} />
//           </div>

//           <div className="headerpreview__listactions--item" onClick={() => handleToggleFiles()}>
//             <AttachFile className="icon" />
//             <p className="text">Archivos Adjuntos</p>
//           </div>
//           <div className="headerpreview__listactions--item" onClick={() => toggleTrackingsModal()}>
//             <ChatBubbleOutline className="icon" />
//             <p className="text">Ver Seguimientos</p>
//           </div>
//           <div className="headerpreview__listactions--item">
//             <MenuOptions
//               handleMenuOpen={handleMenuOpen}
//               anchorEl={anchorEl}
//               handleMenuClose={handleMenuClose}
//               handleRejectOrder={handleRejectOrder}
//               options={getMenuOptions()}
//             />
//           </div>
//           <IconButton onClick={handleOnClickClosePreview}>
//             <Close />
//           </IconButton>
//         </div>
//       </div>

//       <div className="contentpreview">
//         <div className="headerinstructions">
//           <BubbleChart className="icon" />
//           <p className="guide">
//             ¿CÓMO CONTINUAR?
//             <span className="guidedescription">
//               Dependiendo la cantidad solicitada, selecciona en asignar, para asignar la cantidad a los almacenes
//               correspondientes. Para finalizar el pedido, selecciona en guardar pedido. Si ya fueron asignadas da click
//               en ver
//             </span>
//           </p>
//         </div>

//         <div className="rowprevalig">
//           <div className="contentpreview__clientinfo">
//             <p className="contentpreview__clientinfo--title">Datos del cliente</p>
//             <ClientInfo orderSelectedData={orderSelectedData} />
//           </div>

//           <div className="contentpreview_orderinfo">
//             <h4>Datos del pedido</h4>
//             <div style={{ display: "flex", alignItems: "center" }}>
//               <p style={{ marginRight: 6 }}>Estatus del Pedido</p>

//               <div
//                 className="TableName"
//                 style={{
//                   display: "inline-block",
//                   padding: "2px 10px",
//                   borderRadius: 15,
//                   background: getColorStatusOrder(orderSelectedData?.exitstatus).bgColor,
//                 }}
//               >
//                 <p
//                   className="name"
//                   style={{
//                     color: getColorStatusOrder(orderSelectedData?.exitstatus).color,
//                     fontSize: 11,
//                   }}
//                   onClick={() => {}}
//                 >
//                   {orderSelectedData?.exitstatus}
//                 </p>
//               </div>
//             </div>
//             <p>
//               Folio de Orden: <span>{orderSelectedData?.folio}</span>
//             </p>
//             <p>
//               Fecha del Pedido: <span>{dayjs(orderSelectedData?.createdAt).format("DD/MM/YYYY")}</span>
//             </p>
//             <p>
//               Ejecutivo: <span>{orderSelectedData?.createdbyid?.fullname}</span>
//             </p>
//             <p>
//               Grupo: <span>{orderSelectedData?.createdbyid?.group?.name}</span>{" "}
//             </p>
//             <p>
//               Aprobador por: <span>{orderSelectedData?.approvedby?.fullname}</span>
//             </p>
//           </div>
//         </div>

//         <div className="rowprev">
//           <div className="contentpreview__address">
//             <p className="contentpreview__address--title">Datos de Envio</p>
//             <AddressInfo orderSelectedData={orderSelectedData} />
//           </div>
//           <div className="contentpreview__customer">
//             <p className="contentpreview__customer--title">Dirección de Facturación</p>
//             <BillingInfo orderSelectedData={orderSelectedData} />
//           </div>
//         </div>

//         <div className="contentpreview__containerTable">
//           <div className="contentpreview__products">
//             <div className="table">
//               <div className="tableheader">
//                 <div className="tablehead">
//                   <p>Codigo</p>
//                 </div>
//                 <div className="tablehead tableheadproductname">
//                   <p>Producto</p>
//                 </div>
//                 <div className="tablehead center">
//                   <p>Tiempo de entrega</p>
//                 </div>
//                 <div className="tablehead center">
//                   <p>Precio total de lista</p>
//                 </div>
//                 <div className="tablehead center">
//                   <p>Precio total de venta</p>
//                 </div>
//                 <div className="tablehead center">
//                   <p>Cantidad en proceso</p>
//                 </div>
//                 <div className="tablehead center">
//                   <p>Cantidad Solicitada</p>
//                 </div>

//                 <div className="tablehead center">
//                   <p>Cantidad seleccionada</p>
//                 </div>
//                 <div className="tablehead center">
//                   <p>Stock</p>
//                 </div>
//                 <div className="tablehead">
//                   <p>Acciones</p>
//                 </div>
//               </div>

//               <div className="tablebody">
//                 {productsData?.results?.map((productOportunity, index) => {
//                   const isSelected = productOportunity.id === productOportunitySelected?.id;
//                   const isOrderComplete = productOportunity?.totalorder === productOportunity?.quantity;
//                   const isOrderIncomplete =
//                     productOportunity?.totalorder > 0 && productOportunity?.totalorder < productOportunity?.quantity;
//                   const hasNoOrder = productOportunity?.totalorder == 0 && productOportunity?.quantity > 0;
//                   const fecha = getLargestNumber(productOportunity?.deliverytime?.deliverytimes || "0");
//                   const resultDay = MoreDaysHavePassed(orderSelectedData?.createdAt, fecha);
//                   return (
//                     <div key={index}>
//                       <div className={`tablerow ${isSelected && "selected"}`} onClick={() => {}}>
//                         <div className="tablecell code">{productOportunity?.product?.code}</div>
//                         <div className="tablecell tableheadproductrow">
//                           <div className="content">{productOportunity?.product?.name}</div>
//                         </div>
//                         <div className="tablecell center">
//                           <div
//                             className={`
//     ${orderSelectedData?.exitstatus === "surtido" ? "clase-surtido" : ""}
//     ${orderSelectedData?.exitstatus !== "surtido" && resultDay ? "content_day" : ""}
//     ${orderSelectedData?.exitstatus !== "surtido" && !resultDay ? "content_daypast" : ""}
//   `}
//                           >
//                             {productOportunity?.deliverytime?.deliverytimes || "Sin Fecha"}
//                           </div>
//                         </div>
//                         <div className="tablecell center">
//                           <div className="content">
//                             $
//                             {formatNumberNoSymbol(
//                               productOportunity?.product?.callamount * productOportunity?.quantity +
//                                 productOportunity?.iva
//                             )}
//                           </div>
//                         </div>
//                         <div className="tablecell center">
//                           <div className="content">${formatNumberNoSymbol(productOportunity?.total)}</div>
//                         </div>
//                         <div className="tablecell center">{productOportunity?.totalorder}</div>
//                         <div className="tablecell center">{productOportunity?.quantity}</div>
//                         <div className="tablecell center">
//                           <div className="totalToExit">{productOportunity?.totalToExit || 0}</div>
//                         </div>
//                         <div className="tablecell center">{productOportunity?.product?.stock}</div>
//                         <div className="tablecell actions">
//                           <div>
//                             {isOrderComplete && (
//                               <button onClick={() => handleOnClickViewProduct(productOportunity)}>Ver</button>
//                             )}

//                             {hasNoOrder && (
//                               <button onClick={() => handleToggleWereHouses()}>
//                                 {productOportunity?.isComplete
//                                   ? "Listo"
//                                   : productOportunity?.isMajor
//                                   ? "Mayor"
//                                   : "Asignar"}
//                               </button>
//                             )}

//                             {isOrderIncomplete && (
//                               <div>
//                                 <button onClick={() => handleOnClickViewProduct(productOportunity)}>Ver</button>
//                                 <button onClick={() => handleToggleWereHouses()}>
//                                   {productOportunity?.isComplete
//                                     ? "Listo"
//                                     : productOportunity?.isMajor
//                                     ? "Mayor"
//                                     : "Asignar"}
//                                 </button>
//                               </div>
//                             )}

//                             {productOportunity?.quantity > productOportunity?.product?.stock && (
//                               <button
//                                 onClick={() => {
//                                   // handleOnSendNotification(productOportunity);
//                                   openModal();
//                                 }}
//                               >
//                                 Notificar
//                               </button>
//                             )}
//                           </div>
//                         </div>
//                       </div>

//                       <AnimatePresence initial={false}>
//                         {isOpen && productOportunitySelected?.id === productOportunity?.id && (
//                           <motion.div
//                             key="content"
//                             initial={{ height: 0, opacity: 0 }}
//                             animate={{ height: "auto", opacity: 1 }}
//                             exit={{ height: 0, opacity: 0 }}
//                             transition={{ duration: 0.2 }}
//                             style={{ overflow: "hidden" }}
//                           >
//                             <div className="stocksavailables">
//                               <div className="sectionstock">
//                                 <h4>
//                                   Producto {productOportunitySelected?.product?.code} disponible en los siguientes
//                                   almacenes:
//                                 </h4>
//                               </div>
//                               <div className="content">
//                                 {werehouseProductsData?.results?.map((item, index) => {
//                                   const isAssigned = productOportunity?.x?.some(
//                                     x => x.werehouseId === item.warehouseId
//                                   );

//                                   return (
//                                     <div
//                                       key={index}
//                                       className="itemwerehouse"
//                                       onClick={() => {
//                                         handleOnClickwerehouse(productOportunitySelected, item);
//                                         toggleModal();
//                                       }}
//                                     >
//                                       {isAssigned && <p>Ya asignado</p>}
//                                       <p>{item?.warehouseName}</p>
//                                       <p>
//                                         <span className="unit">({item?.stock} Unidades)</span>
//                                       </p>
//                                       <p>
//                                         Piezas
//                                         {
//                                           productOportunity?.x?.filter(y => y.werehouseId === item.warehouseId)[0]
//                                             ?.quantity
//                                         }
//                                       </p>
//                                     </div>
//                                   );
//                                 })}
//                               </div>
//                             </div>
//                           </motion.div>
//                         )}
//                       </AnimatePresence>
//                     </div>
//                   );
//                 })}
//               </div>
//             </div>
//           </div>
//         </div>
//         <div className="observations">
//           <div>
//             <h4>Observaciones Generales</h4>
//             <p className="text_observations">{orderSelectedData?.observations || "Sin observaciones"}</p>
//           </div>
//         </div>

//         <TrackinsHistory orderData={orderSelectedData} />
//       </div>

//       <ModalWereHoseCount
//         open={open}
//         handletoogle={toggleModal}
//         productOportunitySelected={productOportunitySelected}
//         wereHouseSelected={wereHouseSelected}
//         actionsPedido={actionsPedido}
//       />

//       <ModalRejectedOrder
//         open={openRejected}
//         close={closeModalReject}
//         handleReject={handleReject}
//         toggleModalRejected={toggleModalRejected}
//         setRejectedOptionSelected={setRejectedOptionSelected}
//       />
//     </PreviewOrderStyled>
//   );
// }
