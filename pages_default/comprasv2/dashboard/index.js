import React from "react";
import CommoShoppingLayout from "../../../layouts/CommoShoppingLayout";
import ShoppingNacionalDashBoard from "../../../features/ShoppingNacionalDashBoard" 

export default function Dashboard() {
  return (
    <CommoShoppingLayout role='compras'>
    <ShoppingNacionalDashBoard/>
    </CommoShoppingLayout>
  );
}
