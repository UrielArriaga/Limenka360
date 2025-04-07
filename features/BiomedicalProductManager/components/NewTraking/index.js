import { Dialog } from "@material-ui/core";
import { TrakingContainer } from "./styles";
import { Button,Grid } from "@material-ui/core";
import useNewTracking from "../../hooks/useNewTraking";

export default function NewTraking({open,productSelect,handleToggleTraking,getTrankings}){
    const { register, handleSubmit, errors, handleAddTraking,handleFileChange,handleClose} = useNewTracking(productSelect,handleToggleTraking,getTrankings);

    return(
     <Dialog 
     open={open} 
    onClose={handleClose}
    aria-labelledby="alert-dialog-slide-title"
    aria-describedby="alert-dialog-slide-description"
     >
        <TrakingContainer>
        <div className="headerDialog">
    <div className="title">
    Agregar Seguimiento
    </div>
    </div>
    <div className="formDialog">
    <form onSubmit={handleSubmit(handleAddTraking)}>
    <Grid spacing={1} container className="ctr_inputs">
    <Grid item xs={12} md={12} className="resons">
    <label className="ctr_inputs__label">Asunto*</label>
    <input
    {...register("reason", {require:true})}
    id="reason"
    name="reason"
    className={errors?.reason?.type === "required" ? "ctr_inputs__input error" : "ctr_inputs__input"}
    />
    </Grid> 
    <Grid item xs={12} md={12}>
    <label className="ctr_inputs__label">Comentarios*</label>
    <textarea 
    {...register("observations", { required: true })}
    id="observations"
    name="observations"
    className={
        errors?.observations?.type === "required" ? "ctr_inputs__input error" : "ctr_inputs__input"
      }
    />
    </Grid> 
    <Grid item xs={12} md={12}>
     <input
    type="file"
    onChange={handleFileChange}
     />   
    </Grid>
    <div className="btn">
     <Button 
     variant="contained"
     className="btn_cancel"
     onClick={() => handleClose()}
     >
    Cancelar    
    </Button>
    <Button
    type="submit"
    variant="contained"
    className="btn_save"
                                >
                                    Guardar
                                </Button>
    </div> 
    </Grid>   
    </form>
    </div>
        </TrakingContainer>

     </Dialog>
    )
}