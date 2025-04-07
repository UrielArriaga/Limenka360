import { Dialog } from "@material-ui/core";
import { Button } from "@material-ui/core";
import styled from "styled-components";
export default function DeleteDriver({openDriver,onCloseDriver,driverSelect,handledeleteDriver}){
    return(
<Dialog
    open={openDriver} 
    onClose={onCloseDriver}
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
    <p>El chofer <strong>{driverSelect?.name} </strong> se eliminira de forma permanente.</p>
    <div className="btn">
     <Button 
     variant="contained"
     className="btn_cancel"
     onClick={() => onCloseDriver()}
     >
    Cancelar    
    </Button>
    <Button
    variant="contained"
    className="btn_save"
    onClick={() => handledeleteDriver(driverSelect)}
    >Guardar</Button>   
    </div>   
    </div>
</DialogContainer>
</Dialog>
    )
}


export const DialogContainer = styled.div`
.headerDialog {
    display: flex;
    background: #0c203b;
    margin-bottom: 15px;
    padding: 10px 20px;

  }
  .title {
    color: white;
    font-weight: bold;
    font-size: 18px;
}
    .Dialogbody {
    padding: 0 20px 20px 20px;
}
    .btn {
    display: flex;
    justify-content: center;
    margin-top: 15px;
}
    .btn_cancel {
    background: black;
    margin-right: 10px;
    color: white;
    text-transform: capitalize;
}
    .btn_save {
    background: #0c203b;
    color: white;
    text-transform: capitalize;
}
    }
`;
