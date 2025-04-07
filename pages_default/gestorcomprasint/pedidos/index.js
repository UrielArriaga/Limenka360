import CommoShoppingLayout from "../../../layouts/CommoShoppingLayout";
import InternationalPurchasingManagerOrders from "./../../../features/InternationalPurchasingManagerOrders";

export default function pedidos(){
    return(
        <CommoShoppingLayout role="gestor_de_compras_int">
           <InternationalPurchasingManagerOrders/>
        </CommoShoppingLayout>

    )
}