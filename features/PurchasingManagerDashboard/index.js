import { Badge, Button, Fade, Grid, IconButton } from "@material-ui/core";
import { AssignmentTurnedIn, Cached, Close, LibraryBooks, Search, UpdateSharp } from "@material-ui/icons";
import React, { useContext, useEffect } from "react";
import TableLimenkaGeneral from "../../components/TableLimenkaGeneral";
import ListOrders from "./components/ListOrders";
import LateralCards from "./components/LateralCards";
import { useRouter } from "next/router";
import { StyledDash } from "./styled";
import Select from "react-select";
import useDashboard from "./hooks/useDashboard";
import PendingsCalendar from "./components/PendingsCalendar";
import useOrderPeddings from "./hooks/useOrderPeddings";
import ModalCreatePending from "./components/ModalCreatePending";
import ModalEditPending from "./components/ModalEditPending";
import ModalFinishPending from "./components/ModalFinishPending";
import Greeting from "./components/wellow";

export default function PurchasingManagerDashboard({ isAdmin = false }) {
  const router = useRouter();
  const { folio } = router.query;
  const {
    dataAllProducts = [],
    dataOrders = [],
    countOrders = [],
    getDates,
    selectRange,
    setSelectRange,
    countAmountProvider,
  } = useOrderPeddings();

  const {
    pendingsShopping,
    paginationData,
    openModalCreate,
    toggleModalCreate,
    setSlotSelected,
    slotSelected,
    createNewPending,
    slotToEdit,
    setSlotToEdit,
    openModalEdit,
    toggleModalEdit,
    updatePending,
    closeModalCreate,
    setAvaliableModal,
    avaliableModal,
    modalFinish,
    finishPending,
    ejecutivesData,
  } = useDashboard(isAdmin, folio);

  return (
    <StyledDash>
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
        <LateralCards dataAllProducts={dataAllProducts} dataOrders={dataOrders} countOrders={countOrders} />
  

      <div className="main">
        <Grid container spacing={3} className="contentDataPendings">
          <Grid item md={8}>
            <PendingsCalendar
              eventsDate={pendingsShopping}
              toggleModalCreate={toggleModalCreate}
              setSlotSelected={setSlotSelected}
              setSlotToEdit={setSlotToEdit}
              toggleModalEdit={toggleModalEdit}
            />
          </Grid>

          <Grid item md={4}>
            <ListOrders
              data={pendingsShopping?.data}
              rowsLoader={pendingsShopping?.total >= 10 ? 10 : pendingsShopping?.total}
              isLoading={pendingsShopping?.isFetching}
              paginationData={{
                ...paginationData,
                total: pendingsShopping?.total,
              }}
            />
          </Grid>
        </Grid>

        <ModalCreatePending
          openModalCreate={openModalCreate}
          toggleModalCreate={toggleModalCreate}
          slotSelected={slotSelected}
          createNewPending={createNewPending}
          closeModalCreate={closeModalCreate}
          setAvaliableModal={setAvaliableModal}
          avaliableModal={avaliableModal}
          ejecutivesData={ejecutivesData}
        />

        <ModalEditPending
          openModalEdit={openModalEdit}
          toggleModalEdit={toggleModalEdit}
          slotToEdit={slotToEdit}
          updatePending={updatePending}
          modalFinish={modalFinish}
          ejecutivesData={ejecutivesData}
        />
        <ModalFinishPending modalFinish={modalFinish} finishPending={finishPending} />
      </div>
    </StyledDash>
  );
}
