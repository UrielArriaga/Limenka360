import { Button, Dialog } from "@material-ui/core";
import React, { useState } from "react";
import styled from "styled-components";
function ModalViewSerialProducts({ open, handletoogle, serialProducts }) {
  console.log(serialProducts, "serikales");

  return (
    <Dialog
      open={open}
      keepMounted
      onClose={handletoogle}
      aria-labelledby="alert-dialog-slide-title"
      aria-describedby="alert-dialog-slide-description"
    >
      <Modal>
        <div className="header">
          <p>Productos de la orden por numero de serie</p>
        </div>

        <div className="body">
          <div className="table">
            <div className="tableheader">
              <div className="tablehead">
                <p>Serial</p>
              </div>
              <div className="tablehead">
                <p>Código</p>
              </div>
              <div className="tablehead tableheadproductname">
                <p>Producto</p>
              </div>
              
            </div>

            <div className="tablebody">
              {serialProducts?.data?.map((productOportunity, index) => {
                return (
                  <div key={`${productOportunity.id}-${index}`}>
                    <div className={`tablerow`}>
                      <div className="tablecell code">{productOportunity?.serialnumber}</div>
                      <div className="tablecell code">{productOportunity?.product?.code}</div>
                      <div className="tablecell tableheadproductrow">
                        <div className="content">{productOportunity?.product?.name}</div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <div className="actions"></div>
      </Modal>
    </Dialog>
  );
}

export default ModalViewSerialProducts;

const Modal = styled.div`
  background-color: white;
  border-radius: 10px;
  width: 500px;

  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px;
    border-bottom: 1px solid #e0e0e0;

    p {
      font-size: 18px;
      font-weight: 600;
    }
  }
  .body {
    padding: 10px;
  }
  .actions {
    display: flex;
    justify-content: flex-end;
    padding: 10px;
  }

  .tablebody {
    max-height: 350px;
    overflow-y: auto;
  }
  .table {
    width: 100%;
    border-collapse: collapse;
    font-size: 11px;
  }
  .tableheader {
    display: flex;
    background-color: #405189;
    color: white;

    padding: 10px;
    font-weight: bold;
    position: sticky;

    .tablehead {
      flex: 1;

      text-align: left;
      font-weight: bold;
    }

    .tableheadproductname {
      flex: 3;
    }
    .center {
      text-align: center;
    }
  }
  .tablerow {
    display: flex;
    border-bottom: 1px solid #e0e0e0;
    padding: 10px;
    font-weight: bold;
    min-height: 40px;

    color: #616161;
    cursor: pointer;

    .tablecell {
      flex: 1;
      display: flex;
      align-items: center;
      text-align: left;
      color: #616161;
      font-weight: bold;
    }

    .totalToExit {
      flex: 1;

      color: #fff;
      font-weight: bold;
      background-color: #039be5;
      border-radius: 8px;
      padding: 4px;
      text-align: center;
    }
    .code {
      color: #000;
    }

    .actions {
      button {
        margin-right: 10px;
        background-color: #d9e2ff;
        color: #fff;
        border: 1px solid #ccc;
        border-radius: 5px;
        padding: 5px 10px;
      }
    }

    .tableheadproductrow {
      flex: 3;

      .content {
        width: 80%;
      }
    }
    .center {
      display: flex;
      align-items: center; /* Centrado vertical */
      justify-content: center; /* Centrado horizontal */
      text-align: center;
      font-size: 14px;
    }
  }
`;
