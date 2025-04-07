import { Dialog } from "@material-ui/core";
import { DialogContainer } from "./styles";
import { Button } from "@material-ui/core";

export default function StatusRepair({open,onClose,productSelect,handleRepair, type}){
  return(
    <Dialog 
    open={open} 
    onClose={onClose}
    aria-labelledby="alert-dialog-slide-title"
    aria-describedby="alert-dialog-slide-description"
    >
    <DialogContainer>
    <div className="headerDialog">
    <div className="title">
    ¿Estas seguro de esto?   
    </div>
    </div>
    <div className="Dialogbody">
      {type === "general" ? (
        <p>El producto pasara a reparación <strong>{productSelect?.product}</strong> y dejara de estar en almacen.</p>
        ) : (
        <p>El producto pasara a almacen <strong>{productSelect?.product}</strong> y dejara de estar en reparación.</p>
      )}
    <div className="btn">
     <Button 
     variant="contained"
     className="btn_cancel"
     onClick={() => onClose()}
     >
    Cancelar    
    </Button>
    <Button
    variant="contained"
    className="btn_save"
    onClick={() => handleRepair(productSelect)}
    >Guardar</Button>   
    </div>   
    </div>
    </DialogContainer>

    </Dialog>
    

  )  
}