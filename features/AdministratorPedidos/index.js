import React from "react";
import TableLimenkaGeneral from "../../components/TableLimenkaGeneral";
// import { styles } from "../../components/TableLimenkaGeneral/config";
import PaginationTable from "../../components/TableLimenkaGeneral/PaginationTable";
import InputSearch from "./components/InputSearch";
import PreviewOrder from "./components/PreviewOrder";
import useAdministratorPedidos from "./hooks/useAdministratorPedidos";
import useAdmnistratorPedido from "./hooks/useAdmnistratorPedido";
import { AdministratorPedidosStyled } from "./styles";

export default function AdministratorPedidos() {
  const {
    paginationData,
    open,
    tableData,
    orders,
    keyword,
    orderSelected,
    handleOnChangeInput,
    handleOnCloseModal,
    handleOnClickRow,
  } = useAdministratorPedidos();
  const { orderData, productsData, showPdf, handleOnChangeShowPdf } = useAdmnistratorPedido(orderSelected);

  return (
    <AdministratorPedidosStyled>
      <div className="main">
        <div className="header">
          <h1>Pedidos</h1>
          <div className="totalcounters">
            <p>
              <span>{paginationData?.total}</span>
              Registros
            </p>
          </div>
        </div>

        <InputSearch value={keyword} onChange={handleOnChangeInput} />
        <div style={{ height: 40 }} />
        <TableLimenkaGeneral
          heads={tableData.heads}
          mainColumn={"createdAt"}
          data={tableData.data}
          // typeActions="icon"
          customColumns={tableData.customColumns}
          actions={tableData.actions}
          onRowClick={row => handleOnClickRow(row)}
          // styles={styles.tabledefault}
        />
        <PaginationTable paginationData={paginationData} />
      </div>

      <PreviewOrder
        showPdf={showPdf}
        handleOnChangeShowPdf={handleOnChangeShowPdf}
        orderData={orderData}
        productsData={productsData}
        open={open}
        onClose={handleOnCloseModal}
      />
    </AdministratorPedidosStyled>
  );
}
