import { IconButton, LinearProgress } from "@material-ui/core";
import React from "react";
import { formatNumber } from "../../../../utils";
import { Cached, Delete, Edit } from "@material-ui/icons";

export default function TableProducts({
  toggleProductDelete,
  dataProduct,
  setDataProductSelected,
  refetchProducts,
  uploadProduct,
}) {
  const handleDelete = productOrder => {
    toggleProductDelete();
    setDataProductSelected(productOrder);
  };

  return (
    <div>
      <div className="refresh">
        <h4 className="titleProducts">Productos </h4>
        <IconButton className="icon" onClick={() => refetchProducts()}>
          <Cached />
        </IconButton>
      </div>
      <table>
        <thead>
          <tr>
            <th>Código</th>
            <th>Nombre</th>
            <th>Proveedor</th>
            <th>Precio Unitario</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody className="bodyTable">
          {dataProduct?.fetching ? (
            <tr>
              <td colSpan="5" style={{ textAlign: "center" }}>
                Cargando Productos...
              </td>
            </tr>
          ) : dataProduct?.data?.length > 0 ? (
            dataProduct?.data?.map((productOrder, index) => (
              <tr key={index}>
                <td>{productOrder?.product?.code}</td>
                <td>{productOrder?.product?.name}</td>
                <td>{productOrder?.product?.provider?.companyname}</td>
                <td>{formatNumber(productOrder?.product?.amount)}</td>
                <td className="icons">
                  <IconButton onClick={() => handleDelete(productOrder)}>
                    <Delete className="icon" />
                  </IconButton>
                  <IconButton onClick={() => uploadProduct(productOrder)}>
                    <Edit className="icon" />
                  </IconButton>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" style={{ textAlign: "center" }}>
                No hay resultados.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
