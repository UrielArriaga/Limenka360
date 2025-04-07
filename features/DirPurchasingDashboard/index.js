import React from "react";
import BigCalendarComponent from "./components/BigCalendarComponent";
import LateralCards from "./components/LateralCards";
import Greeting from "./components/wellow";
import ModalDate from "./components/ModalDate";
import { StylesDirectCompras } from "./styles";
import useOrderPeddings from "./hooks/useOrderPeddings";
import Graph from "./components/Graph";
import useCalendarSupplierActivities from "./hooks/useCalendarSupplierActivities";
import Select from "react-select";
import ModalEdit from "./components/ModalEdit";
import ModalFinishPending from "./components/ModalFinishPending";
import GraficaResumen from "./components/DataChart";

export default function DirPurchasingDashboard() {
  const { dataAllProducts, dataOrders, countOrders, getDates, selectRange, setSelectRange, countAmountProvider, peddinsData } =
    useOrderPeddings();

  const {
    pendingsShopping,
    handleSelectSlot,
    handleClickOpenModal,
    handleCloseModal,
    openModal,
    openModalEdit,
    handleFormData,
    setSelectDate,
    selectDate,
    providerData,
    ejecutivesData,
    typesData,
    handleCloseModalEdit,
    handleClickOpenModalEdit,
    setSelectDateEdit,
    selectDateEdit,
    handleFormDataEdit,
    modalFinish,
    finishPending,
  } = useCalendarSupplierActivities();

  return (
    <StylesDirectCompras>
      <div className="head_content">
        <Greeting />
        <div className="content_filters">
          <p className="title_filter">Filtrar por : </p>
          <Select
            className="select-options"
            placeholder="selecciona aun rango de fechas"
            options={getDates}
            // isClearable={true}
            onChange={e => setSelectRange(e)}
            value={selectRange}
            getOptionValue={option => option.value}
            getOptionLabel={option => option.label}
          />
        </div>
      </div>

      <LateralCards dataAllProducts={dataAllProducts} dataOrders={dataOrders} countOrders={countOrders} peddinsData={peddinsData} />
      <div className="content_calendar">
        <div className="calendar">
          <BigCalendarComponent
            handleClickOpenModal={handleClickOpenModal}
            handleSelectSlot={handleSelectSlot}
            eventsDate={pendingsShopping}
            setSelectDate={setSelectDate}
            setSelectDateEdit={setSelectDateEdit}
            handleClickOpenModalEdit={handleClickOpenModalEdit}
          />
        </div>
        <div className="calendar">
          <GraficaResumen countAmountProvider={countAmountProvider} />
        </div>
      </div>

      <ModalDate
        openModal={openModal}
        handleCloseModal={handleCloseModal}
        handleFormData={handleFormData}
        selectDate={selectDate}
        providerData={providerData}
        ejecutivesData={ejecutivesData}
        typesData={typesData}
      />
      <ModalEdit
        selectDate={selectDateEdit}
        typesData={typesData}
        ejecutivesData={ejecutivesData}
        openModalEdit={openModalEdit}
        handleCloseModalEdit={handleCloseModalEdit}
        handleFormDataEdit={handleFormDataEdit}
        modalFinish={modalFinish}
      />

      <ModalFinishPending modalFinish={modalFinish} finishPending={finishPending} />
    </StylesDirectCompras>
  );
}
