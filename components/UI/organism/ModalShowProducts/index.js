import { DialogContent, Dialog, IconButton, Paper } from "@material-ui/core";
import { Close } from "@material-ui/icons";
import React from "react";

import styled from "styled-components";
import NumberFormat from "react-number-format";

export default function ModalShowProducts(props) {
  const { open, setOpen, closeProducts, allProducts } = props;

  return (
    <DialogContainer
      open={open}
      onClose={closeProducts}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <div className="header">
        <p className="header__title">Productos</p>
        <IconButton onClick={() => closeProducts()}>
          <Close className="header__icon" />
        </IconButton>
      </div>
      <DialogContent className="contenido">
        {allProducts.map((item, index) => (
          <Paper elevation={2} className="product" key={index}>
            <div className="product__infoName">
              <p className="product__infoName__title">Nombre</p>
              <p className="product__infoName__info">{item.product.name}</p>
            </div>
            <div className="quantities">
              <div className="quantities__infoPrice">
                <p className="quantities__infoPrice__title">Precio Unitario</p>
                <NumberFormat
                  value={item.product.callamount}
                  displayType="text"
                  thousandSeparator=","
                  prefix="$"
                  className="quantities__infoPrice__info"
                />
              </div>
              <div className="quantities__infoQuantity">
                <p className="quantities__infoQuantity__title">Cantidad</p>
                <NumberFormat
                  value={item.quantity}
                  displayType="text"
                  thousandSeparator=","
                  className="quantities__infoQuantity__info"
                />
              </div>
            </div>
          </Paper>
        ))}
      </DialogContent>
    </DialogContainer>
  );
}

const DialogContainer = styled(Dialog)`
  * {
    margin: 0;
    padding: 0;
  }
  .MuiDialogContent-root:first-child {
    padding-top: 0px;
  }
  .header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    &__title {
      font-size: 20px;
      margin-left: 10px;
      font-weight: 500;
    }
    &__icon {
      color: red;
    }
  }
  .contenido {
    .product {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
      padding: 7px;
      margin-bottom: 15px;
      &__infoName {
        display: flex;
        flex-direction: column;
        &__title {
          font-size: 12px;
        }
        &__info {
          font-weight: 500;
          font-size: 14px;
        }
      }
      .quantities {
        display: flex;
        margin-left: 15px;
        &__infoPrice {
          display: flex;
          flex-direction: column;
          align-items: center;
          &__title {
            font-size: 12px;
            white-space: nowrap;
          }
          &__info {
            font-weight: 500;
            font-size: 14px;
          }
        }
        &__infoQuantity {
          margin-left: 20px;
          display: flex;
          flex-direction: column;
          align-items: center;
          &__title {
            font-size: 12px;
          }
          &__info {
            font-weight: 500;
            font-size: 14px;
          }
        }
      }
    }
  }
  .ctr_load {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 80px;
    width: 100%;
    /* height: 400px; */
    &__img {
      width: 150px;
      animation: slide 3s infinite;
      img {
        width: 100%;
        object-fit: contain;
      }
    }
    &__load {
      display: flex;
      flex-direction: column;
      justify-content: center;
      line-height: 30px;
      width: 200px;
      p {
        text-align: center;
        font-weight: bold;
      }
    }
    @keyframes slide {
      0% {
        transform: translateY(0px);
      }
      50% {
        transform: translateY(10px);
      }
      100% {
        transform: translateY(0px);
      }
    }
  }
`;
