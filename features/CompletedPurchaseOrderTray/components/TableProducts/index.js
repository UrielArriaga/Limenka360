import React from 'react'
import { formatNumber } from '../../../../utils';
import { LinearProgress } from '@material-ui/core';
import { TableStyled } from './styles';

function TableProducts({productOrder}) {
  const { isFeching, data } = productOrder;
  const sumField = (array, field) => {
    return array.reduce((accumulator, current) => {
      return accumulator + (current[field] || 0);
    }, 0);
  };

  const totalAmount = sumField(data, "importe");
  return (
    <TableStyled>
      <div className="products">
          <table>
            <thead>
              <tr>
                <th>Codigo</th>
                <th>Nombre</th>
                <th>Cantidad</th>
                <th>Unidad</th>
                <th>Precio Unidad</th>
                <th>Importe</th>
              </tr>
            </thead>

            <tbody className="bodyTable">
              {isFeching && (
                <tr>
                  <td colSpan="6" style={{ textAlign: "center" }}>
                    <div className="load">
                      <div className="load__img">
                        <img src="/load.png" />
                      </div>
                      <div className="content_loadtext">
                        <p>Cargando Productos</p>
                        <LinearProgress color="primary" />
                      </div>
                    </div>
                  </td>
                </tr>
              )}
              {!isFeching &&
                data?.map((productOrder, index) => (
                  <tr key={index}>
                    <td>{productOrder?.codigo}</td>
                    <td>{productOrder?.producto}</td>
                    <td>{productOrder?.cantidad}</td>
                    <td>{productOrder?.unidad}</td>
                    <td>{formatNumber(productOrder?.["precio unitario"])}</td>
                    <td>{formatNumber(productOrder?.importe)}</td>
                  </tr>
                ))}
              {data?.length === 0 && <tr>No hay datos</tr>}
            </tbody>
          </table>
        </div>
        <div className="totalAmount">
          <p>Subtotal {formatNumber(totalAmount)}</p>
        </div>
    </TableStyled>
  )
}

export default TableProducts;
