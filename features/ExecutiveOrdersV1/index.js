import React, { useState, useEffect } from "react";
import FilterProspects from "./components/FilterProspects";
import LimiBotChatIA from "./components/LimiBotChatIA";
import useOrders from "./hooks/useOrders";
import { ExecutiveProspectsStyled, HeaderContainer } from "./styled";
import CalendarLimenK from "./components/CalendarLimenK";
import TableLimenK from "./components/TableLimenK";
import OrderStatusCards from "./components/OrderStatusCards";
import DrawerPreview from "./components/DrawerPreview";
import { Refresh } from "@material-ui/icons";
import { IconButton, Badge } from "@material-ui/core";

export default function ExecutiveOrdersV1() {
  const [viewType, setViewType] = useState("table");
  const [orderSelected, setOrderSelected] = useState(null);
  const [openLimiBotChat, setOpenLimiBotChat] = useState(false);
  const [orderBy, setOrderBy] = useState(null);
  const [orderDirection, setOrderDirection] = useState("asc");
  const [searchTerm, setSearchTerm] = useState("");
  const {
    ordersData,
    modalActions,
    heads,
    events,
    customColumns,
    paginationData,
    count,
    refetchData,
  } = useOrders({
    viewType,
    orderBy,
    orderDirection,
    searchTerm,
  });
  // ---> BUSQUEDA
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const [filteredResults, setFilteredResults] = useState([]);
  useEffect(() => {
    if (query) {
      const filtered = ordersData.results.filter((item) => {
        const name = (item?.fullname || "").toLowerCase();
        const phone = (item?.telEnvio || "").toLowerCase();
        const folio = (item?.folio || "").toLowerCase();
        return (
          name.includes(query) || phone.includes(query) || folio.includes(query)
        );
      });

      const maxPage = Math.ceil(filtered.length / paginationData.limit);
      if (page > maxPage && maxPage > 0) {
        setPage(maxPage);
      }

      setFilteredResults(filtered);
    } else {
      setFilteredResults(ordersData.results);
      setPage(paginationData.page || 1);
    }
  }, [query, ordersData.results, page, paginationData.limit]);

  /*const paginatedResults = filteredResults.slice(
    (page - 1) * paginationData.limit,
    page * paginationData.limit
  );*/

  const handleSearch = (value) => {
    setSearchTerm(value);
    setPage(1);
  };

  const handleOrder = (column, direction) => {
    setOrderBy(column);
    setOrderDirection(direction);
    setPage(1);
  };
  // <---
  const onClickProspect = (item) => {
    setOrderSelected(item);
    modalActions.handleToggleModal("preview");
  };

  const toogleLimiBotChat = (item) => {
    setOrderSelected(item);
    setOpenLimiBotChat(!openLimiBotChat);
  };

  return (
    <ExecutiveProspectsStyled>
      <HeaderContainer>
        <h1>Pedidos ({ordersData.count})</h1>
        <IconButton className="refresh-button" onClick={() => refetchData()}>
          <Badge overlap="rectangular" color="primary">
            <Refresh />
          </Badge>
        </IconButton>
        <FilterProspects
          viewType={viewType}
          setViewType={setViewType}
          onSearch={handleSearch}
          onOrder={handleOrder}
        />
        <OrderStatusCards />
      </HeaderContainer>
      {viewType === "calendar" && (
        <CalendarLimenK
          actions={{
            onClickProspect,
            toogleLimiBotChat,
          }}
          events={events}
        />
      )}
      {viewType === "table" && (
        <TableLimenK
          onRowClick={(e) => {
            setOrderSelected(e);
            modalActions.handleToggleModal("preview");
          }}
          heads={heads}
          data={ordersData.results}
          customColumns={customColumns}
          rowsLoader={paginationData.limit}
          count={count}
          isLoading={ordersData.isFetching}
          paginationData={{
            ...paginationData,
            total: count,
          }}
        />
      )}
      <DrawerPreview
        trackings={[]}
        pendingsData={[]}
        orderSelected={orderSelected}
        open={modalActions.modalViews.preview}
        toggleModal={() => modalActions.handleToggleModal("preview")}
      />
      <LimiBotChatIA
        trackings={[]}
        pendingsData={[]}
        prospectSelected={orderSelected}
        open={openLimiBotChat}
        toggleModal={toogleLimiBotChat}
      />
    </ExecutiveProspectsStyled>
  );
}
