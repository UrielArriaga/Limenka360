import React from "react";
import { FormControl, FormControlLabel, Radio } from "@material-ui/core";

const ProductRow = ({ product, warehouses, selectedWarehouse, onChange }) => (
  <div className="tablerow" key={product.productId}>
    <div className="tablecell code">{product.product.code}</div>
    <div className="tablecell tableheadproductrow">{product.product.name}</div>
    <div className="tablecell">{product.quantity}</div>
    <div className="tablecell">{product.product.stock}</div>

    <div className="tablecell">
      {warehouses?.map(warehouse => (
        <div key={warehouse.id}>
          <FormControl component="fieldset" style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
            <p>{warehouse?.warehouseName}</p>

            <p>Total {warehouse?.stock}</p>
            <FormControlLabel
              control={
                <Radio
                  checked={selectedWarehouse === warehouse.id}
                  onChange={() => onChange(product.productId, warehouse.id)}
                />
              }
              label=""
            />
          </FormControl>
        </div>
      ))}
    </div>
  </div>
);

export default ProductRow;
