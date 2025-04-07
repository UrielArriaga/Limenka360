import CommoShoppingLayout from "../../../layouts/CommoShoppingLayout";
import InternationalPurchasingManager from "./../../../features/InternationalPurchasingManager";

export default function ordenes(){
    return(
        <CommoShoppingLayout role="gestor_de_compras_int" >
           <InternationalPurchasingManager/>
        </CommoShoppingLayout>

    )
}