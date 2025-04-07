import React from "react";
import { Button, Grid } from "@material-ui/core";
import { ModalAssingWereHouseStyled } from "./styles";
import { Cancel, Check, CloseOutlined } from "@material-ui/icons";
import useModalAssingWereHouse from "../../hooks/useModalAssingWereHouse";

export default function ModalAssingWereHouse({
  open,
  handleToggle,
  warehousesData,
  handleAssing,
  selectedWarehouse,
  productsData,
  setProductsDataX,
}) {
  const { handleSubmit } = useModalAssingWereHouse(
    open,
    warehousesData,
    productsData,
    selectedWarehouse,
    handleAssing,
    handleToggle
  );

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

          let totalAdded = 0;
          updatedWarehouses.forEach(({ totalToExit }) => {
            totalAdded += totalToExit;
          });

          const isComplete = totalAdded === product.quantity;
          const isMajor = totalAdded > product.quantity;

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
                    <div className="tableheadstock">
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
                  </div>
                  <div className="tablebody">
                    {productsData?.results
                      .filter(pro => pro?.product?.ispackage !== true)
                      .map(product => (
                        <div
                          className={`tablerow  ${product?.isComplete && "complete"} ${product?.isMajor && "major"}`}
                          key={product.id}
                          id={product.id}
                        >
                          <div className="tablecell code">{product.product.code}</div>
                          <div className="tablecell tableheadproductrow">{product?.product?.name}</div>
                          <div className="tablecell">{product?.quantity}</div>
                          <div className="tablecell">{product?.totalToExit}</div>
                          <div className="tablecell ">{product?.product?.stock}</div>

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

                                  <p>
                                    Pzas <span>({warehouse?.stock})</span>
                                  </p>

                                  <input
                                    value={warehouse?.totalToExit}
                                    type="number"
                                    className="numberInput"
                                    defaultValue={0}
                                    max={product?.quantity}
                                    min={0}
                                    onChange={e =>
                                      handleSelectWareHouse(e.target.value, product.id, warehouse.warehouseId)
                                    }
                                    placeholder="Total"
                                  />
                                </div>
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
                              {product?.isComplete ? <Check /> : product?.isMajor ? "Mayor" : <Cancel />}
                            </div>
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
              </div>
            </Grid>
          </Grid>
        </div>
      </div>
    </ModalAssingWereHouseStyled>
  );
}
