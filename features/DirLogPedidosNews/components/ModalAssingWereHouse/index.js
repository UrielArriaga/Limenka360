import React, { useEffect, useState } from "react";
import { Button, FormControl, FormControlLabel, Grid, Radio } from "@material-ui/core";
import { ModalAssingWereHouseStyled } from "./styles";
import { Cancel, Check, CloseOutlined } from "@material-ui/icons";
import WarehouseSelect from "./WarehouseSelect";
import ProductRow from "./ProductRow";
import useModalAssingWereHouse from "../../hooks/useModalAssingWereHouse";

export default function ModalAssingWereHouse({
  open,
  handleToggle,
  warehousesData,
  handleAssing,
  selectedWarehouse,
  productsData,
  setProductsDataX,
  orderId,
}) {
  const {
    error,
    selectedWarehousePerProduct,
    warehouseToApply,
    warehouseOptions,
    handleWarehouseChange,
    handleWarehouseSelectChange,
    handleSubmit,
  } = useModalAssingWereHouse(open, warehousesData, productsData, selectedWarehouse, handleAssing, handleToggle);

  const [heads, setHeads] = useState(["Codigo", "Producto", "Cantidad", "Stock"]);

  useEffect(() => {}, []);

  const handleSelectWareHouse = (quantityToExit, productOportunityId, warehouseToApplylocal) => {
    const newProductsData = {
      ...productsData,
      results: productsData.results.map(product => {
        if (product.id === productOportunityId) {
          const updatedWarehouses = product.wherehousesavailability.map(warehouse => {
            if (warehouse.warehouseId === warehouseToApplylocal) {
              return { ...warehouse, totalToExit: Number(quantityToExit) };
            }
            return warehouse;
          });

          // const isMajor = updatedWarehouses.some(({ totalToExit }) => {
          //   return totalToExit > product.quantity;
          // });
          let totalAdded = 0;
          updatedWarehouses.forEach(({ totalToExit }) => {
            totalAdded += totalToExit;
          });

          const isComplete = totalAdded === product.quantity;
          const isMajor = totalAdded > product.quantity;

          console.log(isMajor);

          console.log(totalAdded);

          return {
            ...product,
            wherehousesavailability: updatedWarehouses,
            totalToExit: totalAdded,
            isComplete,
            isMajor,
          };
        }
        return product;
      }),
    };

    //

    setProductsDataX(newProductsData);
  };

  return (
    <ModalAssingWereHouseStyled
      anchor="left"
      open={open}
      keepMounted
      onClose={handleToggle}
      aria-labelledby="alert-dialog-slide-title"
      aria-describedby="alert-dialog-slide-description"
    >
      <div className="ctr_edit">
        <div className="ctr_edit__header">
          <div className="ctr_edit__header__close">
            <CloseOutlined className="close" onClick={handleToggle} />
            <p className="title">Asignar Almacen</p>
          </div>
          <Button variant="contained" className="btn_save" onClick={handleSubmit}>
            Guardar
          </Button>
        </div>
        <div style={{ height: "60px" }} />
        <div className="ctr_edit__containerTable">
          <div className="header">
            <h3>Productos</h3>
          </div>
          {/* 
          <WarehouseSelect
            warehouseOptions={warehouseOptions}
            selectedWarehouse={warehouseToApply}
            onChange={handleWarehouseSelectChange}
          /> */}

          {/* <button onClick={() => {}}>click </button> */}
          <Grid container>
            <Grid item xs={12}>
              <div className="ctr_edit__products">
                <div className="table">
                  <div className="tableheader">
                    <div className="tablehead">
                      <p>Codigo</p>
                    </div>
                    <div className="tablehead tableheadproductname">
                      <p>Producto</p>
                    </div>
                    <div className="tablehead">
                      <p>Cantidad solicitada</p>
                    </div>
                    <div className="tablehead">
                      <p>Cantidad surtida</p>
                    </div>
                    <div className="tablehead">
                      <p>Stock</p>
                    </div>

                    <div
                      className="tablehead 
                    tablewarehouses"
                    >
                      Almacenes
                    </div>

                    <div className="tablehead">
                      <p>Estatus</p>
                    </div>

                    {/* {warehousesData?.map(warehouse => (
                      <div className="tablehead" key={warehouse.id}>
                        <p>{warehouse.name}</p>
                      </div>
                    ))} */}
                  </div>
                  <div className="tablebody">
                    {productsData?.results?.map(product => (
                      <div
                        className={`tablerow  ${product.isComplete && "complete"} ${product.isMajor && "major"}`}
                        key={product.id}
                        id={product.id}
                      >
                        <div className="tablecell code">{product.product.code}</div>
                        <div className="tablecell tableheadproductrow">{product.product.name}</div>
                        <div className="tablecell">{product.quantity}</div>
                        <div className="tablecell">{product.totalorder}</div>
                        <div className="tablecell ">{product.product.stock}</div>

                        <div
                          className="tablecell tablewarehouses"
                          style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "flex-start",
                            border: "1px solid #e0e0e0",
                            width: "100%",
                            padding: 10,
                          }}
                        >
                          {product?.wherehousesavailability?.map(warehouse => (
                            <div key={warehouse.warehouseId}>
                              <div className={"itemWareHouse"}>
                                <p>{warehouse?.warehouseName}</p>
                                {/* <p>{warehouse?.stock}</p> */}

                                <p>
                                  Pzas <span>({warehouse?.stock})</span>
                                </p>

                                <input
                                  value={warehouse?.totalToExit}
                                  type="number"
                                  defaultValue={0}
                                  max={warehouse?.stock}
                                  min={0}
                                  style={{
                                    width: 80,
                                    height: 40,
                                    fontSize: 10,
                                    textAlign: "center",
                                  }}
                                  // disabled={warehouse?.totalToExit == product.quantity}
                                  onChange={e =>
                                    handleSelectWareHouse(e.target.value, product.id, warehouse.warehouseId)
                                  }
                                  placeholder="Total"
                                />
                              </div>
                              {/* <FormControl
                                component="fieldset"
                                style={{
                                  display: "flex",
                                  alignItems: "center",
                                  justifyContent: "center",
                                  textAlign: "center",
                                  fontSize: 10,
                                  marginRight: 20,
                                }}
                              >
                                <p>{warehouse?.warehouseName}</p>
                                <p>{warehouse?.stock}</p>
                                <FormControlLabel
                                  control={
                                    <Radio
                                      checked={selectedWarehouse === warehouse.id}
                                      onChange={() => onChange(product.productId, warehouse.id)}
                                    />
                                  }
                                  label=""
                                />
                              </FormControl> */}
                            </div>
                          ))}
                        </div>

                        <div className="tablecell">
                          <div
                            style={{
                              height: "100%",
                              display: "flex",
                              justifyContent: "center",
                              alignItems: "center",
                            }}
                          >
                            {product.isComplete ? <Check /> : product.isMajor ? "Mayor" : <Cancel />}
                          </div>
                        </div>
                      </div>
                      // <ProductRow
                      //   key={product.productId}
                      //   product={product}
                      //   warehouses={product?.wherehousesavailability}
                      //   selectedWarehouse={selectedWarehousePerProduct[product.productId]}
                      //   onChange={handleWarehouseChange}
                      // />
                    ))}
                  </div>
                </div>

                {/* <Button
                  onClick={() => {
                    let products = productsData.results;

                    // are all complete

                    if (products.every(product => product.isComplete)) {
                      console.log("all complete");
                    }

                    let objects = [];
                    for (let i = 0; i < products.length; i++) {
                      const productOportunity = products[i];

                      if (productOportunity.isComplete) {
                        productOportunity.wherehousesavailability.forEach(warehouse => {
                          if (warehouse.totalToExit > 0) {
                            objects.push({
                              productId: productOportunity.product.id,
                              werehouseId: warehouse.warehouseId,
                              orderId: orderId,
                              quantity: warehouse.totalToExit,
                            });
                          }
                        });
                      }
                    }

                    console.log(objects);
                  }}
                >
                  List WareHouse
                </Button> */}
              </div>
            </Grid>
          </Grid>
        </div>
      </div>
    </ModalAssingWereHouseStyled>
  );
}
