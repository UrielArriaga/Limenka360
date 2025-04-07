import { Grid } from "@material-ui/core";
import React from "react";
import ReactSelect from "react-select";
import InputMoney from "./MoneyInput";
import { formatNumber } from "../../../../utils";

const optionsDistribute = [
  { value: 1, label: "Todos los productos" },
  { value: 2, label: "Primer Producto" },
  { value: 3, label: "Ultimo producto" },
];

export default function FormDistributeShipping({ products = [], totalShipping = 0, handleOnChangeTotal }) {
  return (
    <div className="body formdistribute">
      <Grid container spacing={1}>
        <Grid item md={12}>
          <div className="inputlabel">
            <label htmlFor="">Total de envio</label>
            <InputMoney onChange={handleOnChangeTotal} value={totalShipping} />
          </div>
        </Grid>

        {/* <Grid item md={12}>
          <div className="inputlabel">
            <label htmlFor="">Dividir en</label>
            <ReactSelect
              placeholder="Selecciona como sera distribuido el envio"
              options={optionsDistribute}
              //   value={valueSelected}
              //   onChange={handleOnChangeProduct}
            />
          </div>
        </Grid> */}

        <Grid item md={12}>
          <div className="listcontainer">
            <p className="listtitle">Productos</p>
            {products?.map((product, index) => {
              return (
                <div key={index} className="product">
                  <div className="productname">
                    <span className="code">{product?.product?.code}</span>
                    {product?.product?.name}
                  </div>
                  {/* <div className="productinput">{product?.totalShipping}</div> */}

                  <div className="producttotal">
                    <p>
                      {formatNumber(product?.total)}{" "}
                      <span className="green"> + {formatNumber(product?.totalShipping)}</span>
                      <span> = {formatNumber(product?.totalwithshipping)}</span>
                    </p>
                    {/* <p>{product?.totalwithshipping}</p> */}
                  </div>
                </div>
              );
            })}
          </div>
        </Grid>
      </Grid>
    </div>
  );
}
