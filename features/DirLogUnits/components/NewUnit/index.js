import { Dialog, Grid, Button } from "@material-ui/core";
import { DriversContainer } from "./styles";
import useNewUnit from "../../hooks/useNewUnit";
export default function NewUnit({open,handleToggleUnits,refreshData,isEditing,unitSelect,setUnitSelect}){
    const { register, handleSubmit, errors, handleAddUnit,handleEditUnit,resetForm} = useNewUnit({handleToggleUnits,refreshData,isEditing,unitSelect});

     const HandleOnclose = () => {
        handleToggleUnits();
        resetForm();
        setUnitSelect();
     }

     const onSubmit = isEditing ? handleEditUnit : handleAddUnit;

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
    {isEditing ? "Editar Unidad" : "Agregar nueva unidad"}
    </div>
    </div>
    <div className="formDialog">
    <form onSubmit={handleSubmit(onSubmit)}>
    <Grid spacing={1} container className="ctr_inputs">
    <Grid item xs={12} md={12} className="resons">
    <label className="ctr_inputs__label">Marca*</label>
    <input
    {...register("brand", {require:true})}
    id="brand"
    name="brand"
    defaultValue={unitSelect?.brand || ""}
    className={errors?.brand?.type === "required" ? "ctr_inputs__input error" : "ctr_inputs__input"}
    />   
    </Grid>
    <Grid item xs={12} md={12} className="resons">
    <label className="ctr_inputs__label">Modelo*</label>
    <input
    {...register("model", {require:true})}
    id="model"
    name="model"
    defaultValue={unitSelect?.model || ""}
    className={errors?.model?.type === "required" ? "ctr_inputs__input error" : "ctr_inputs__input"}
    />   
    </Grid>
    <Grid item xs={12} md={12} className="resons">
    <label className="ctr_inputs__label">kilometraje</label>
    <input
    {...register("mileage", {require:false})}
    id="mileage"
    name="mileage"
    defaultValue={unitSelect?.mileage || ""}
    className={errors?.mileage?.type === "required" ? "ctr_inputs__input error" : "ctr_inputs__input"}
    /> 
        <Grid item xs={12} md={12} className="resons">
    <label className="ctr_inputs__label">Matrícula</label>
    <input
    {...register("tuition", {require:false})}
    id="tuition"
    name="tuition"
    defaultValue={unitSelect?.tuition || ""}
    className={errors?.tuition?.type === "required" ? "ctr_inputs__input error" : "ctr_inputs__input"}
    />  
    </Grid>
    {/*<Grid item xs={12} md={12} className="resons">
    <label className="ctr_inputs__label">Número de motor</label>
    <input
    {...register("engine_number", {require:true})}
    id="engine_number"
    name="engine_number"
    defaultValue={unitSelect?.engine_number || ""}
    className={errors?.engine_number?.type === "required" ? "ctr_inputs__input error" : "ctr_inputs__input"}
    />  
    </Grid>*/}
    <Grid item xs={12} md={12} className="resons">
    <label className="ctr_inputs__label">Serie Vehicular</label>
    <input
    {...register("vehicle_series", {require:true})}
    id="vehicle_series"
    name="vehicle_series"
    defaultValue={unitSelect?.vehicle_series || ""}
    className={errors?.vehicle_series?.type === "required" ? "ctr_inputs__input error" : "ctr_inputs__input"}
    />  
    </Grid>
    {/*<Grid item xs={12} md={12} className="resons">
    <label className="ctr_inputs__label">Tarjeta de ciculación</label>
    <input
    {...register("circulation_card", {require:true})}
    id="circulation_card"
    name="circulation_card"
    defaultValue={unitSelect?.circulation_card || ""}
    className={errors?.circulation_card?.type === "required" ? "ctr_inputs__input error" : "ctr_inputs__input"}
    />  
    </Grid>*/}
    <Grid item xs={12} md={12} className="resons">
    <label className="ctr_inputs__label">Poliza de seguro</label>
    <input
    {...register("insurance_policy", {require:true})}
    id="insurance_policy"
    name="insurance_policy"
    defaultValue={unitSelect?.insurance_policy || ""}
    className={errors?.insurance_policy?.type === "required" ? "ctr_inputs__input error" : "ctr_inputs__input"}
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