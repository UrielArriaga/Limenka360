import React, { useEffect } from "react";
import { Button, Grid, Tooltip } from "@material-ui/core";
import { EditStyle } from "./style";
import { headersTableProductsForm } from "../../utils/normalizeOrder";
import { formatNumber } from "../../../../utils";
import NumberFormat from "react-number-format";
import { Delete } from "@material-ui/icons";
import useEditPackage from "../../hooks/useEditPackage";

export default function EditPackage(props) {
  const heads = headersTableProductsForm;
  const { open, close, functionsProducts, packageSelected } = props;
  const { states, functions } = useEditPackage({ packageSelected, functionsProducts, close, open });
  const { products } = states;
  const { handleEditTable, handleSaveChangesPackage, handleDeleteProduct } = functions;

  return (
    <EditStyle open={open} onClose={close}>
      <div className="header">
        <p className="title_header">Editar Productos del Paquete</p>
      </div>
      <div className="content_package">
        <p className="title_package">Datos del Paquete</p>
        <Grid className="data_package" container spacing={1}>
          <Grid md={4} item>
            <p className="title_data">Nombre del Paquete</p>
            <p className="data">{packageSelected.product?.name}</p>
          </Grid>
          <Grid md={4} item>
            <p className="title_data">Código </p>
            <p className="data">{packageSelected.product?.code}</p>
          </Grid>

          <Grid md={4} item>
            <p className="title_data">Total </p>
            <p className="data">{formatNumber(packageSelected.total)}</p>
          </Grid>
          <Grid md={12} item>
            <p className="title_data">Observaciones </p>
            <p className="data">{packageSelected.observations || "Sin Observaciones"}</p>
          </Grid>
        </Grid>
        {products.length !== 0 ? (
          <div className="content_table">
            <table className="table" cellSpacing={0}>
              <thead className="thead">
                <tr className="tr_head">
                  {heads.map((item, index) => (
                    <th className={`th ${item === "Nombre del Producto" && "principal"}`} key={index}>
                      {item}
                    </th>
                  ))}
                  <th className="th" />
                </tr>
              </thead>
              <tbody className="tbody">
                {products?.map((item, index) => (
                  <tr key={index} className="tr_body">
                    <td className="td">{item.name_product}</td>
                    <td className="td">{item.code}</td>
                    <td className="td">
                      <NumberFormat
                        className="input_value"
                        value={item.cantidad}
                        thousandSeparator
                        allowNegative={false}
                        onValueChange={e => handleEditTable(index, "cantidad", e)}
                      />
                    </td>
                    <td className="td">
                      $
                      <NumberFormat
                        className="input_value"
                        value={item.precio}
                        thousandSeparator
                        allowNegative={false}
                        onValueChange={e => handleEditTable(index, "precio", e)}
                      />
                    </td>
                    <td className="td">
                      $
                      <NumberFormat
                        className="input_value"
                        value={item.total_product}
                        thousandSeparator
                        allowNegative={false}
                        onValueChange={e => handleEditTable(index, "total_product", e)}
                      />
                    </td>
                    <td className="td">
                      <Tooltip title="Quitar Producto">
                        <Delete className="icon_delete" onClick={() => handleDeleteProduct(item.local_id)} />
                      </Tooltip>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="empty">
            <img src="/empty_table.svg" className="empty__image" />
            <p className="empty__title">Sin Productos</p>
          </div>
        )}
      </div>
      <div className="buttons">
        <Button className="bt_save" onClick={() => handleSaveChangesPackage()}>
          Guardar Cambios
        </Button>
      </div>
    </EditStyle>
  );
}
