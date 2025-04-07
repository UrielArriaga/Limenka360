import { Dialog, Grid, Button } from "@material-ui/core";
import { DriversContainer } from "./styles";
import useNewDriver from "../../hooks/useNewDriver";
export default function NewDriver({open,handleToggleDriver,refreshData,isEditing,driverSelect,setDriverSelect}){
    const { register, handleSubmit, errors, handleAddDriver,handleEditDriver,resetForm} = useNewDriver({handleToggleDriver,refreshData,isEditing,driverSelect});

     const HandleOnclose = () => {
        handleToggleDriver();
        resetForm();
        setDriverSelect();
     }

     const onSubmit = isEditing ? handleEditDriver : handleAddDriver;

    return(
        <Dialog
        open={open}
        onClose={HandleOnclose}
            aria-labelledby="alert-dialog-slide-title"
    aria-describedby="alert-dialog-slide-description"
        >
        <DriversContainer>
        <div className="headerDialog">
    <div className="title">
    {isEditing ? "Editar chofer" : "Agregar nuevo chofer"}
    </div>
    </div>
    <div className="formDialog">
    <form onSubmit={handleSubmit(onSubmit)}>
    <Grid spacing={1} container className="ctr_inputs">
    <Grid item xs={12} md={12} className="resons">
    <label className="ctr_inputs__label">Nombre*</label>
    <input
    {...register("name", {require:true})}
    id="name"
    name="name"
    defaultValue={driverSelect?.name || ""}
    className={errors?.name?.type === "required" ? "ctr_inputs__input error" : "ctr_inputs__input"}
    />   
    </Grid>
    <Grid item xs={12} md={12} className="resons">
    <label className="ctr_inputs__label">RFC</label>
    <input
    {...register("RFC", {require:false})}
    id="RFC"
    name="RFC"
    defaultValue={driverSelect?.rfc || ""}
    className={errors?.RFC?.type === "required" ? "ctr_inputs__input error" : "ctr_inputs__input"}
    />   
    </Grid>
    <Grid item xs={12} md={12} className="resons">
    <label className="ctr_inputs__label">Licencia</label>
    <input
    {...register("license", {require:true})}
    id="license"
    name="license"
    defaultValue={driverSelect?.license || ""}
    className={errors?.license?.type === "required" ? "ctr_inputs__input error" : "ctr_inputs__input"}
    /> 
        <Grid item xs={12} md={12} className="resons">
    <label className="ctr_inputs__label">Fecha de expiración</label>
    <input
    type="date"
    {...register("expiration_date", {require:true})}
    id="expiration_date"
    name="expiration_date"
    defaultValue={driverSelect?.expiration_date || ""}
    className={errors?.expiration_date?.type === "required" ? "ctr_inputs__input error" : "ctr_inputs__input"}
    />  
    </Grid>
    <div className="btn">
     <Button 
     variant="contained"
     className="btn_cancel"
     onClick={() => HandleOnclose()}
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
    </Grid>
    </form>
    </div>
        </DriversContainer>

        </Dialog>
    )
}