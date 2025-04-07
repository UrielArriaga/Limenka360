import { Button, DialogActions, DialogContent, DialogContentText, DialogTitle,  } from "@material-ui/core";
import React from "react";
import { DialogContainer } from "./styles";
import useDeleteProduct from "../../hooks/useDeleteProduct";
export default function ModalDeleteProduct(props) {
  const {
    openConfirmDelete, 
    handleToggleDelete,
    refetchData,
    idDelete,
    productDelete,
  } = props;
  const {deleteProduct} = useDeleteProduct(refetchData, idDelete);
  const product = productDelete; //la data del productDelete que estoy por eliminar y que estoy cachando 
  const code = product?.data?.code;
  const name = product?.data?.name;
  const provider = product?.providerId;
  const stock = product?.stock;
  const amount = product?.amount;
  const storeamount = product?.storeamount;
  const callamount = product?.callamount;
  const description = product?.data?.description;
  const importt = product?.import;

  return (
    <DialogContainer
      open={openConfirmDelete}
      onClose={handleToggleDelete}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle className="title" id="alert-dialog-title">
        ¿Estás seguro de eliminar el producto seleccionado?
      </DialogTitle>
      <DialogContent className="containerBody">
        <DialogContentText className="DialogText" id="alert-dialog-description">
          <>
            Tiene registrado las siguientes características:
            <hr />
            <br />
            <b> - Código: </b> <span> {code} </span>  
            <br />
            <b> - Nombre: </b> <span> {name} </span>
            <br /> 
            <b> - Proveedor:</b> <span> {provider} </span>
            <br />
            <b> - Producto de importación: </b> <span> {importt} </span>
            <br />
            <b> - Precio Unitario:</b> <span> {amount} </span>
            <br />
            <b> - Precio Tienda:</b> <span> {storeamount} </span>
            <br />
            <b> - Tipo Call Center:</b> <span> {callamount} </span>
            <br />
            <b> - Stock:</b> <span> {stock} </span>
            <br />
            <b> - Descripción:</b> <span> {description? description : "N/A"} </span>
            <br />
            <br />
          </>
        </DialogContentText>
      </DialogContent>
      <DialogActions className="buttons">
        <Button 
          className="cancel" 
          onClick={handleToggleDelete} 
          color="primary">
          Cancelar
        </Button>
        <Button
          className="acept"
          color="primary"
          autoFocus
          onClick={() => {
            deleteProduct(idDelete); // Ejecuta la eliminación solo cuando se da clic en "Continuar"
            handleToggleDelete();
            refetchData();
          }}
        >
          Continuar
        </Button>
      </DialogActions>
    </DialogContainer>
  );
}
