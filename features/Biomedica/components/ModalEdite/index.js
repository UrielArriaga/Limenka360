import React, { useEffect, useState } from "react";
import { Modal, Button, Box, Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Select, { components } from "react-select"; 
import { Controller, useForm } from "react-hook-form";

const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(3),  
    borderRadius: 8,          
    boxShadow: theme.shadows[5],
    width: "550px",
  },
  title: {
    fontSize: "1.4rem",        
    fontWeight: "bold",       
    marginBottom: theme.spacing(2),  
  },
  selectLabel: {
    fontSize: "1rem",          
    marginBottom: theme.spacing(1),
  },
  select: {
    fontSize: "1.2rem",          
    padding: theme.spacing(1),  
    width: "100%", 
  },
  button: {
    fontSize: "1rem",            
    padding: theme.spacing(1.5, 3), 
    borderRadius: 4,           
  },
  grid: {
    padding: theme.spacing(2),
  },
}));


const customSingleValue = ({ data }) => {
  const colorMap = {
    Verde: 'green',
    Amarillo: 'yellow',
    Rojo: 'red',
    Azul: 'blue',
  };
  
  return (
    <div style={{ display: 'flex', alignItems: 'center' }}>
      <div 
        style={{
          width: 20,
          height: 20,
          borderRadius: '50%',
          backgroundColor: colorMap[data.value], 
          marginRight: 31,
          paddingLeft: 10,
        }}
      />
      {data.label} 
    </div>
  );
};

export default function EditModal({ open, onClose, indicators, product, onSave, productSelect }) {
  const classes = useStyles();
  const { handleSubmit, control, reset } = useForm();
  const [selectedIndicator, setSelectedIndicator] = useState(null);

  useEffect(() => {
    if (product) {
      const indicatorValue = product?.indicator;
      const indicatorOption = indicators.find(ind => ind.value === indicatorValue);
      setSelectedIndicator(indicatorOption || null);  
      reset({ indicator: indicatorValue });
    }
  }, [product, indicators, reset]);

  const handleSave = (data) => {
    if (product && product.id) {
      onSave({ id: product.id, indicator: data.indicator }, product, productSelect);
    }
    onClose();
  };

  const handleIndicatorChange = (selectedOption) => {
    setSelectedIndicator(selectedOption);
  };

  return (
    <Modal open={open} onClose={onClose} className={classes.modal}>
      <Box className={classes.paper}>
        <form onSubmit={handleSubmit(handleSave)}>
          <Grid container spacing={3} className={classes.grid}> 
            <Grid item xs={12}>
              <p className={classes.title}>Seleccionar el color del Semáforo:</p>
              <Controller
                name="indicator"
                control={control}
                defaultValue={product?.indicator || 'Verde'}
                rules={{ required: "Requerido" }}
                render={({ field }) => (
                  <Select
                    {...field}
                    value={selectedIndicator}
                    onChange={(selectedOption) => {
                      handleIndicatorChange(selectedOption);
                      field.onChange(selectedOption.value);
                    }}
                    options={indicators}
                    components={{ SingleValue: customSingleValue }}
                    className={classes.select} 
                    isSearchable={false} 
                  />
                )}
              />

            </Grid>
            <Grid item xs={12} container justifyContent="space-between">
              <Button variant="outlined" onClick={onClose} className={classes.button}>
                Cerrar
              </Button>
              <Button variant="contained" color="primary" type="submit" className={classes.button}>
                Guardar
              </Button>
            </Grid>
          </Grid>
        </form>
      </Box>
    </Modal>
  );
}
