import React from "react";
import { formatNumber } from "../../../../utils";
import { MoreDaysHavePassed, getLargestNumber } from "../../utils.js";

export default function TableProducts({ products = [] }) {
  return (
    <div className="table">
      <div className="tableheader">
        <div className="tablehead">
          <p>Codigo</p>
        </div>
        <div className="tablehead ">
          <p>Cantidad</p>
        </div>
        <div className="tablehead tablecellproductname">
          <p>Marca</p>
        </div>
        <div className="tablehead tablecellproductname">
          <p>Producto</p>
        </div>
        <div className="tablehead center">
          <p>Precio</p>
        </div>
        <div className="tablehead center">
          <p>Iva</p>
        </div>
        <div className="tablehead center">
          <p>SubTotal</p>
        </div>
        <div className="tablehead center">
          <p>Nota</p>
        </div>
        <div className="tablehead center">
          <p>Plazos de Entrega</p>
        </div>
        <div className="tablehead center">
          <p>Fecha estimada de entrega</p>
        </div>
      </div>
      <div className="tablebody">
        {products.map((productoportunity, index) => {
          const product = productoportunity.product;
          const fecha = getLargestNumber(productoportunity?.deliverytime?.deliverytimes || "0");
          const resultDay = MoreDaysHavePassed(productoportunity?.createdAt, fecha);

          if (product?.ispackage)
            return (
              <div className="tablerowpackage">
                <div className="tablerow" key={index}>
                  <div className="tablecell">
                    <p>{productoportunity?.product?.code}</p>
                  </div>
                  <div className="tablecell">
                    <p>{productoportunity?.quantity}</p>
                  </div>
                  <div className="tablecell">
                    <p>{productoportunity?.product?.brand?.name}</p>
                  </div>
                  <div className="tablecell tablecellproductname">
                    <p>
                      <strong>(Producto con el que se cotizo)</strong> {productoportunity?.product?.name}
                    </p>
                  </div>
                  <div className="tablecell center">
                    <p>{formatNumber(productoportunity?.newprice)}</p>
                  </div>
                  <div className="tablecell center">
                    <p>{formatNumber(productoportunity?.iva)}</p>
                  </div>
                  <div className="tablecell center">
                    <p>{formatNumber(productoportunity?.total)}</p>
                  </div>
                  <div className="tablecell center">
                      <p>{productoportunity?.note ? productoportunity?.note : "N/A"}</p>
                      </div>
                  <div className="tablecell center">
                    <div className={`
                      ${productoportunity?.exitstatus !== "surtido" && resultDay ? "content_day" : ""}
                      ${productoportunity?.exitstatus !== "surtido" && !resultDay ? "content_daypast" : ""}
                      `} >
                          {productoportunity?.deliverytime?.deliverytimes || "Sin Fecha"}
                    </div>
                   </div>
                  <div className="tablecell center">
                  <p>{productoportunity?.deliverytimedone ? productoportunity?.deliverytimedone : "No aplica"}</p>

                  </div>
                </div>

                {productoportunity?.productslocal?.map((childproductOportunity, index) => {
                  const product = childproductOportunity.product;

                  return (
                    <div className="tablerow" key={index}>
                      <div className="tablecell">
                        <p>{product?.code}</p>
                      </div>
                      <div className="tablecell">
                        <p>{productoportunity?.quantity}</p>
                      </div>
                      <div className="tablecell">
                        <p>{product?.brand?.name}</p>
                      </div>
                      <div className="tablecell tablecellproductname">
                        <p>{product?.name}</p>
                      </div>
                      <div className="tablecell center">
                        <p>{formatNumber(0)}</p>
                      </div>
                      <div className="tablecell center">
                        <p>{formatNumber(0)}</p>
                      </div>
                      <div className="tablecell center">
                        <p>{formatNumber(0)}</p>
                      </div>
                      <div className="tablecell center">
                      <p>{productoportunity?.note ? productoportunity?.note : "N/A"}</p>
                      </div>
                    <div className="tablecell center">
                     <div className={`
                      ${productoportunity?.exitstatus !== "surtido" && resultDay ? "content_day" : ""}
                      ${productoportunity?.exitstatus !== "surtido" && !resultDay ? "content_daypast" : ""}
                      `} >
                          {productoportunity?.deliverytime?.deliverytimes || "Sin Fecha"}
                     </div>
                    </div>
                      <div className="tablecell center">
                      <p>{productoportunity?.deliverytimedone ? productoportunity?.deliverytimedone : "Sin fecha"}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            );

          return (
            <div className="tablerow" key={index}>
              <div className="tablecell">
                <p>{productoportunity?.product?.code}</p>
              </div>
              <div className="tablecell">
                <p>{productoportunity?.quantity}</p>
              </div>
              <div className="tablecell">
                <p>{productoportunity?.product?.brand?.name}</p>
              </div>
              <div className="tablecell tablecellproductname">
                <p>{productoportunity?.product?.name}</p>
              </div>
              <div className="tablecell center">
                <p>{formatNumber(productoportunity?.newprice)}</p>
              </div>
              <div className="tablecell center">
                <p>{formatNumber(productoportunity?.iva)}</p>
              </div>
              <div className="tablecell center">
                <p>{formatNumber(productoportunity?.total)}</p>
              </div>
              <div className="tablecell center">
                      <p>{productoportunity?.note ? productoportunity?.note : "N/A"}</p>
                      </div>
               <div className="tablecell center">
                 <div className={`
                    ${productoportunity?.exitstatus !== "surtido" && resultDay ? "content_day" : ""}
                    ${productoportunity?.exitstatus !== "surtido" && !resultDay ? "content_daypast" : ""}
                    `} >
                    {productoportunity?.deliverytime?.deliverytimes || "Sin Fecha"}
                </div>
              </div>
              <div className="tablecell center">
              <p>{productoportunity?.deliverytimedone ? productoportunity?.deliverytimedone : "Sin fecha"}</p>
              </div>
            </div>
          );
        })}

        {/* {products.map((productoportunity, index) => (
          <div className="tablerow" key={index}>
            <pre>{JSON.stringify(productoportunity, null, 2)}</pre>
            <div className="tablecell">
              <p>{productoportunity?.product?.code}</p>
            </div>
            <div className="tablecell">
              <p>{productoportunity?.quantity}</p>
            </div>
            <div className="tablecell">
              <p>{productoportunity?.product?.brand?.name}</p>
            </div>
            <div className="tablecell tablecellproductname">
              <p>{productoportunity?.product?.name}</p>
            </div>
            <div className="tablecell center">
              <p>{formatNumber(productoportunity?.newprice)}</p>
            </div>
            <div className="tablecell center">
              <p>{formatNumber(productoportunity?.iva)}</p>
            </div>
            <div className="tablecell center">
              <p>{formatNumber(productoportunity?.total)}</p>
            </div>

            <div className="tablecell center">
              <p>{productoportunity?.note ? productoportunity?.note : "N/A"}</p>
            </div>
          </div>
        ))} */}
      </div>
    </div>
  );
}
