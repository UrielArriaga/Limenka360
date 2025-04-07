import { Button, Grid } from "@material-ui/core";
import { CloseOutlined, Person } from "@material-ui/icons";
import React, { useEffect, useState } from "react";
import { DialogFullScreen } from "./styles";
import { useForm } from "react-hook-form";
import { api } from "../../services/api";
const DrawerEditOrder = ({ openEdit, setOpenEdit, selectOrder, handleAlert, setFlag }) => {
  const handleCloseEdit = () => {
    setOpenEdit(!openEdit);
  };
  const {
    register,
    handleSubmit,
    setValue,
    control,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    setValue("folio", selectOrder?.folio);
    setValue("receive", selectOrder?.receive);
    setValue("phone", selectOrder?.phone);
    setValue("total", selectOrder?.total);
    setValue("observations", selectOrder?.observations);
  }, [selectOrder]);

  //Actuzlia el pedido
  const handleUploadOrders = async (formData) => {
    console.log("Datos del formulario: ", formData);
    try {
      let res = await api.put(`orders/${selectOrder.id}`, formData);
      setFlag();
      handleAlert("success", "Pedido - Actualizado!", "basic");
      console.log("Res: ", res);
    } catch (error) {
      console.log("Error al actualizar pedido: ", error);
      handleAlert("error", "Error al actualizar pedido", "basic");
    }
  };

  return (
    <DialogFullScreen anchor="right" open={openEdit} onClose={handleCloseEdit}>
      <div className="ctr_edit">
        <div className="ctr_edit__header">
          <div className="ctr_edit__header__close">
            <CloseOutlined className="close" onClick={handleCloseEdit} />
            <p className="title">Editar Pedido</p>
          </div>
        </div>
        <div style={{ height: "60px" }} />
        <div className="ctr_edit__ctr_info">
          <p className="ctr_edit__ctr_info__title" onClick={() => console.log(selectOrder)}>
            <Person />
            Datos del pedido
          </p>
          <Grid container className="form">
            {selectOrder?.estado == "Aprobado" ? (
              <Grid item xs={12} md={4}>
                <div className="item">
                  <div className="ContentTitleandAlert">
                    <p>
                      Folio, el pedido ya fue aprobado
                    </p>
                  </div>
                  <input
                    placeholder="Folio del pedido"
                    className="input capitalize"
                    value={selectOrder?.folio}
                  />
                </div>
              </Grid>
            ) : (
              <Grid item xs={12} md={4}>
                <div className="item">
                  <div className="ContentTitleandAlert">
                    <p>
                      Folio <strong>*</strong>
                    </p>
                  </div>
                  <input
                    placeholder="Folio del pedido"
                    className="input capitalize"
                    {...register("folio", {
                      required: true,
                    })}
                  />
                </div>
              </Grid>
            )}
            <Grid item xs={12} md={4}>
              <div className="item">
                <div className="ContentTitleandAlert">
                  <p>
                    Recibe <strong>*</strong>
                  </p>
                </div>
                <input
                  placeholder="Quien recibe"
                  className="input capitalize"
                  {...register("receive", {
                    required: true,
                  })}
                />
              </div>
            </Grid>
            <Grid item xs={12} md={4}>
              <div className="item">
                <div className="ContentTitleandAlert">
                  <p>
                    Teléfono <strong>* {errors.phone && errors.phone.message}</strong>
                  </p>
                </div>
                <input
                  {...register("phone", {
                    required: true,
                    maxLength: {
                      value: 10,
                      message: "Máximo 10 Caracteres",
                    },
                    minLength: {
                      value: 10,
                      message: "Minimo 10 Caracteres",
                    },
                    pattern: {
                      value: /[0-9]+/i,
                      message: "Caracter Invalido",
                    },
                  })}
                  placeholder="Teléfono"
                  className="input capitalize"
                  type="number"
                />
              </div>
            </Grid>
            <Grid item xs={12} md={4}>
              <div className="item">
                <div className="ContentTitleandAlert">
                  <p>
                    Total <strong>*</strong>
                  </p>
                </div>
                <input
                  placeholder="Total"
                  className="input capitalize"
                  {...register("total", {
                    required: true,
                  })}
                />
              </div>
            </Grid>
            <Grid item xs={12} md={8}>
              <div className="item">
                <div className="ContentTitleandAlert">
                  <p>Observaciones</p>
                </div>
                <input placeholder="Observaciones" className="input capitalize" {...register("observations")} />
              </div>
            </Grid>
            <Grid item xs={12} className="ctr_buttons">
              <Button variant="contained" className="btn_cancel" onClick={handleCloseEdit}>
                Cancelar
              </Button>
              <Button variant="contained" className="btn_upload" onClick={handleSubmit(handleUploadOrders)}>
                Guardar
              </Button>
            </Grid>
          </Grid>
        </div>
      </div>
    </DialogFullScreen>
  );
};

export default DrawerEditOrder;
