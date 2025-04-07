import React from "react";
import { EntriesGenerateInputStyles } from "./styles";
import FormAddRoutes from "./components/FormAddRoutes/FormAddRoutes";
import ListOrders from "./components/ListOrders";
import useDepEntiressupplises from "./hooks/useDepEntiressupplises";
export default function DepEntriesGenerateInput() {
  const {
    dataSupplies,
    setDataSupplies,
    handleAdd,
    entriesProduct,
    setEntriesProduct,
    orderSelectedLocal,
    setOrderSelectedLocal,
    isInternational,
  } = useDepEntiressupplises();

  return (
    <EntriesGenerateInputStyles>
      <FormAddRoutes dataSupplies={dataSupplies} setDataSupplies={setDataSupplies} />
      <ListOrders
        isInternational={isInternational}
        supplises={dataSupplies}
        setDataSupplies={setDataSupplies}
        handleAdd={handleAdd}
        entriesProduct={entriesProduct}
        setEntriesProduct={setEntriesProduct}
        orderSelectedLocal={orderSelectedLocal}
        setOrderSelectedLocal={setOrderSelectedLocal}
      />
    </EntriesGenerateInputStyles>
  );
}
