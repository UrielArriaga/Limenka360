import { BudgetStyled } from "../../styles/Presupuestos";
import React, { useState } from "react";
import Head from "next/head";
import { Box } from "@material-ui/core";
import TableComponent from "../../components/TableDataBudgets";
import useBudgets from "./hooks/useBudgets";
import OrderFilterBudgets from "./components/OrdersFilters";
import { LoaderDataBudgets } from "./components/loaderData";
import PaginationtTable from "./components/PaginationTable";
import { HeaderBudget, SearchBudget } from "./components/SearchBudgets";

function EjecutivesBudget() {
  const { budgets, paginationData, keySearch, setKeySearch, filterOrder, heads } = useBudgets();
  return (
    <BudgetStyled>
      <Head>
        <title>CRM JOBS - Cuentas por Cobrar</title>
      </Head>

      <div className="main">
        <div className="ctr_prospects">
          <HeaderBudget />
          <SearchBudget keySearch={keySearch} setKeySearch={setKeySearch} paginationData={paginationData} />

          <Box className="ordersAndView">
            <OrderFilterBudgets
              ASC={filterOrder.ASC}
              setASC={filterOrder.setASC}
              setOrderby={filterOrder.setOrderby}
              orderby={filterOrder.orderby}
            />
          </Box>

          {budgets?.isfetching && <LoaderDataBudgets />}

          {!budgets?.isfetching && (
            <TableComponent
              id="FOLIO"
              data={budgets?.data}
              heads={heads}
              secondaryColor="#dce1f6"
              primaryColor="#405189"
              discartedTable={true}
            />
          )}

          {budgets?.total > 0 && <PaginationtTable budgets={budgets} paginationData={paginationData} />}
        </div>
      </div>
    </BudgetStyled>
  );
}

export default EjecutivesBudget;
