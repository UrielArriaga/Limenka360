import React from 'react'
import Dialog from "@material-ui/core/Dialog";
import { DialogContainer } from "./styles";
import { Button, Grid } from "@material-ui/core";

function ModalDelete({showDelete,handleCloseDelete,handleDeleteCategory,selectItemCategory,handleSubmit}) {
  return (
    <Dialog
      open={showDelete}
      keepMounted
      onClose={handleCloseDelete}
      aria-labelledby="alert-dialog-slide-title"
      aria-describedby="alert-dialog-slide-description"
    >
      <DialogContainer>
        <p className="title">Eliminar Categoría</p>
        <h5>Deseas eliminar la categoria {selectItemCategory.name}?</h5>
        <Grid container className="ctr_buttons">
          <Button variant="contained" color="secondary" className="btn_cancel" onClick={handleCloseDelete}>
            Cancelar
          </Button>
          <Button
            variant="contained"
            color="primary"
            className="btn_upload"
            onClick={handleSubmit(handleDeleteCategory)}
          >
            Eliminar
          </Button>
        </Grid>
      </DialogContainer>
    </Dialog>
  )
}

export default ModalDelete;
