import { Button, DialogActions, TextField, CircularProgress, MenuItem, DialogContent } from "@mui/material";
import React, { useEffect, useState } from "react";
import { StylesWarrantyModal } from "./styles";
import { Controller, useForm } from "react-hook-form";
import useGlobalCommons from "../../hooks/useGlobalCommons";
import { useSelector } from "react-redux";
import { userSelector } from "../../redux/slices/userSlice";
import { commonSelector } from "../../redux/slices/commonSlice";
import useAlertToast from "../../hooks/useAlertToast";
import dayjs from "dayjs";
import { api } from "../../services/api";

export default function ModalWarranty({ warrantyModalOpen, onCloseWarranty, orderSelected }) {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const { id_user } = useSelector(userSelector);
  const { reasonwarranties } = useSelector(commonSelector);
  const { getCatalogBy } = useGlobalCommons();
  const { showAlertError, showAlertSucces } = useAlertToast();
  const [isLoadingWarranty, setIsLoadingWarranty] = useState(false);

  useEffect(() => {
    getCatalogBy("reasonwarranties");
  }, []);

  const generateFolio = () => {
    const year = new Date().getFullYear();
    const serial = Math.floor(100000 + Math.random() * 900000);
    return `WTY${year}${serial}`;
  };

  const createWarranty = async data => {
    setIsLoadingWarranty(true);
    try {
      let body = {
        folio: generateFolio(),
        warrantystartAt: dayjs().format("YYYY-MM-DD HH:mm:ss.SSS ZZ"),
        comments: data?.comments,
        warehouseproductId: orderSelected?.id,
        purchaseorderId: orderSelected?.purchaseorderId,
        reasonwarrantyId: data?.reasonwarrantyId,
        createdbyId: id_user,
      };
      let response = await api.post(`warrantywarehouseproduct`, body);
      if (response.status == 201) {
        showAlertSucces("Solicitud de garantía creada correctamente");
        handleClose();
      }
    } catch (error) {
      console.error("ERROR_createWarranty", error);
      showAlertError("Error al generar la garantia");
    } finally {
      setIsLoadingWarranty(false);
    }
  };

  const handleClose = () => {
    reset();
    onCloseWarranty();
  };

  return (
    <StylesWarrantyModal open={warrantyModalOpen} onClose={handleClose} maxWidth="md" fullWidth>
      <h3>
        {orderSelected
          ? `¿Deseas solicitar Garantía para "${orderSelected.product?.name}" (${orderSelected.serialnumber})?`
          : "Nueva Garantía"}
      </h3>
      <form onSubmit={handleSubmit(createWarranty)}>
        <DialogContent>
          <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            <Controller
              name="reasonwarrantyId"
              control={control}
              defaultValue=""
              rules={{ required: true }}
              render={({ field }) => (
                <TextField
                  {...field}
                  select
                  label="Razón de la garantía"
                  variant="outlined"
                  fullWidth
                  error={!!errors.reasonwarrantyId}
                  helperText={errors.reasonwarrantyId && "Por favor, selecciona una razón"}
                  required
                >
                  {reasonwarranties?.results?.map(option => (
                    <MenuItem key={option.id} value={option.id}>
                      {option.name}
                    </MenuItem>
                  ))}
                </TextField>
              )}
            />

            <Controller
              name="comments"
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Comentarios"
                  variant="outlined"
                  fullWidth
                  multiline
                  rows={4}
                  error={!!errors.comments}
                  helperText={errors.comments && "Por favor, agrega un comentario"}
                  required
                />
              )}
            />
          </div>
        </DialogContent>
        <DialogActions>
          <Button size="small" color="secondary" onClick={handleClose} disabled={isLoadingWarranty} variant="outlined">
            Cancelar
          </Button>
          <Button type="submit" size="small" color="primary" variant="contained" disabled={isLoadingWarranty}>
            {isLoadingWarranty ? <CircularProgress size={24} style={{ color: "#faf6f6" }} /> : "Aceptar"}
          </Button>
        </DialogActions>
      </form>
    </StylesWarrantyModal>
  );
}
