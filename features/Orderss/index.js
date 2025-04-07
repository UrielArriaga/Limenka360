import React from "react";
import { AssignmentTurnedIn, Cached, CancelPresentation, ListAlt, LiveHelp, Menu, Search } from "@material-ui/icons";
import { Grid, Tooltip } from "@material-ui/core";
import { OrderStyle } from "./style";
import Filters from "../../components/Filters";
import Card from "./components/CounterCard";
import useOrders from "./hooks/useOrders";
import TableOrders from "./components/TableOrders";
import SearchBox from "./components/SearchBox";
import Chips from "../../components/ChipsFilters";

export default function Orderss() {
  const {
    dataPagination,
    optionsFilters,
    filters,
    ordersData,
    orderBy,
    counters,
    valueToFind,
    setValueToFind,
    setFilters,
    restorePage,
    handleRefetch,
    handleDataOrder,
    handleOrderDesc,
  } = useOrders();

  return (
    <OrderStyle>
      <div className="content_orders">
        <div className="content_orders__header"></div>
        <div className="content_orders__body">
          <div className="title_orders">
            <p className="title">Pedidos</p>
            <div className="count_orders">
              <p className="count">{ordersData?.count}</p>
              <p className="title_count">Registros</p>
              <Cached className="icon_reload" onClick={() => ordersData.refetch()} />
            </div>
          </div>
          <Grid className="container_cards" spacing={3} container>
            <Grid item md={3}>
              <Card icon={<ListAlt />} title={"total de pedidos"} count={counters.all} color={"#3f51b5"} />
            </Grid>
            <Grid item md={3}>
              <Card
                icon={<AssignmentTurnedIn />}
                title={"pedidos aprobados"}
                count={counters.approve}
                color={"#00C853"}
              />
            </Grid>

            <Grid item md={3}>
              <Card icon={<LiveHelp />} title={"pedidos pendientes"} count={counters.pending} color={"#ffa500"} />
            </Grid>
            <Grid item md={3}>
              <Card icon={<CancelPresentation />} title={"pedidos rechazados"} count={counters.denied} color={"red"} />
            </Grid>
          </Grid>
          <SearchBox value={valueToFind} setValue={setValueToFind} restorePage={restorePage} />

          <div className="order_filters">
            <Filters
              options={optionsFilters}
              // options_by={filterOptionsSelect}
              keySearchValue={valueToFind}
              refetch={handleRefetch}
              filters={filters}
              setFilters={setFilters}
              restorePage={restorePage}
              showName={"FILTRAR"}
            />
            <div className="section_order">
              <p className="title_orderBy">Ordenar Por:</p>
              <select className="order_data" onChange={handleDataOrder} value={orderBy.by}>
                <option value={"createdAt"}>Fecha de Creación</option>
                <option value={"updatedAt"}>Fecha de Actualización</option>
                <option value={"orderstatusId"}>Estado de Pedido</option>
              </select>
              <select className="order_data" onChange={handleOrderDesc} value={orderBy.desc}>
                <option value={false}>Ascendente</option>
                <option value={true}>Descendente</option>
              </select>
            </div>
          </div>
          <div className="chips">
            <Chips
              filters={filters}
              setFilters={setFilters}
              refetch={handleRefetch}
              notDelete={null}
              setKey={setValueToFind}
            />
          </div>
          <div className="table_order">
            <TableOrders ordersData={ordersData} dataPagination={dataPagination} />
          </div>
        </div>
        <div className="content_orders__footer"></div>
      </div>
    </OrderStyle>
  );
}
