import { Dialog } from "@material-ui/core";
import { DialogContainer } from "./styles";
import { Button } from "@material-ui/core";

export default function ReviewedStatus({open,onClose,productSelect,handleReviwed}){
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
    <p>El producto <strong>{productSelect?.product} </strong> se marcara como revisado.</p>
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
    onClick={() => handleReviwed(productSelect)}
    >Guardar</Button>   
    </div>   
    </div>
    </DialogContainer>

    </Dialog>
    

  )  
}