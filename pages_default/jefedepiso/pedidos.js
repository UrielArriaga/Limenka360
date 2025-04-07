import FloorManagerPedidosSurtidos from "../../features/FloorManagerPedidosSurtidos"
import CommonLogLayout from "../../layouts/CommonLogLayout"

export default function Pedidos(){
    return(
        <CommonLogLayout role={"jefedepiso"}>
            <FloorManagerPedidosSurtidos/>
        </CommonLogLayout>
    )
}