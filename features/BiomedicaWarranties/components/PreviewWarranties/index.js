import { ContainerStyled } from "./styles";
import { IconButton, Tooltip } from "@material-ui/core";
import { Close } from "@material-ui/icons";
import dayjs from "dayjs";

export default function PreviewWarranties({ setIsOpenPreview, warrantySelected }) {
    let { purchaseorder, warehouseproduct, createdby } = warrantySelected?.dataItem;

    return (
        <ContainerStyled>
            <div className="headerpreview">
                <h4 className="concept">{warrantySelected?.folio || "N/A"}</h4>
                <div className="headerpreview__listactions">
                    <div className="headerpreview__listactions--item">
                        <Tooltip title="Cerrar Vista Previa">
                            <IconButton onClick={() => setIsOpenPreview(false)}>
                                <Close />
                            </IconButton>
                        </Tooltip>
                    </div>
                </div>
            </div>

            <div className="contentpreview">
                <div className="contentpreview__info">
                    <div className="cardData">
                        <h4>Datos de la Garantia</h4>
                        <p>Folio de la Garantía: <span>{warrantySelected?.folio || "N/A"}</span></p>
                        <p>Razon de la Garantía: <span>{warrantySelected?.dataItem?.reasonwarranty?.name}</span></p>
                        <p>Metodo de entrega: <span>{purchaseorder?.methoddelivery}</span></p>
                        <p>Condiciones de pago: <span>{purchaseorder?.paymentcondition}</span></p>
                        <p>Serial: <span>{warehouseproduct?.serialnumber}</span></p>
                        <p>Creado Por: <span>{createdby?.fullname}</span></p>
                        <p>Fecha de la Garantía: <span>{dayjs(warrantySelected?.dataItem?.createdAt).format("DD/MM/YYYY")}</span></p>
                        <p>Comentarios: <span>{warrantySelected?.dataItem?.comments}</span></p>
                    </div>
                </div>

                <div className="contentpreview__products">
                    <h3 className="titleTable">Tabla de Productos</h3>
                    <table>
                        <thead>
                            <tr>
                                <th>Serial</th>
                                <th>Producto</th>
                                <th>Codigo</th>
                                <th>Internacional</th>
                            </tr>
                        </thead>

                        <tbody className="bodyTable">
                            <tr>
                                <td>{warehouseproduct?.serialnumber}</td>
                                <td>{warehouseproduct?.product?.name}</td>
                                <td>{warehouseproduct?.product?.code}</td>
                                <td>{warehouseproduct?.import == true ? "Si" : "No"}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </ContainerStyled>
    );
}
