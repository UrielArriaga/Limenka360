import React, { useEffect } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Select, MenuItem, FormControl, InputLabel, CircularProgress } from '@mui/material';
import { useUpdateWarehouse } from '../../hooks/useUpdateWarehouse';

export const ModalUpdateWarehouse = ({ open, handleClose, warehouseOrder, onUpdate }) => {
  const { selectedWarehouse, setSelectedWarehouse, warehouses, fetchWarehouses, handleUpdateWarehouse, loading } = useUpdateWarehouse();

  useEffect(() => {
    if (open) {
      fetchWarehouses();
      if (warehouseOrder) {
        setSelectedWarehouse(warehouseOrder.warehouseId);
      }
    }
  }, [open, warehouseOrder]);

  const handleSubmit = async () => {
    const success = await handleUpdateWarehouse(warehouseOrder.id, warehouseOrder.orderId);
    if (success) {
      onUpdate?.();
      handleClose();
    }
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth sx={{ '& .MuiPaper-root': { borderRadius: 3, boxShadow: 8, padding: 2, } }} >
      <DialogTitle sx={{ fontWeight: 'bold', fontSize: 20, textAlign: 'center' }}>
        Actualizar Almacen
      </DialogTitle>
      <DialogContent>
        <FormControl fullWidth variant="outlined" margin="normal">
          <InputLabel>Almacen</InputLabel>
          <Select
            value={selectedWarehouse || ''}
            onChange={(e) => setSelectedWarehouse(e.target.value)}
            label="Almacén"
            disabled={loading}
            MenuProps={{ PaperProps: { sx: { '& .MuiMenu-list': { display: 'flex', flexDirection: 'column', }, }, }, }} >
            {warehouses.length > 0 ? (
              warehouses.map((warehouse) => (
                <MenuItem key={warehouse.id} value={warehouse.id}>
                  {warehouse.name}
                </MenuItem>
              ))
            ) : (
              <MenuItem disabled>Cargando almacenes...</MenuItem>
            )}
          </Select>
        </FormControl>
      </DialogContent>
      <DialogActions sx={{ justifyContent: 'center', gap: 2, pb: 2 }}>
        <Button onClick={handleClose} variant="outlined" sx={{ borderRadius: 2, px: 3, color: 'gray' }} disabled={loading} >
          Cancelar
        </Button>
        <Button onClick={handleSubmit} color="primary" variant="contained" sx={{ borderRadius: 2, px: 3 }} disabled={loading} >
          {loading ? <CircularProgress size={24} sx={{ color: 'white' }} /> : 'Actualizar'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};