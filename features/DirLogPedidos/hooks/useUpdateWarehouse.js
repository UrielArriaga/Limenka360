import { useState } from 'react';
import { api } from '../../../services/api';
import useAlertToast from '../../../hooks/useAlertToast';

export const useUpdateWarehouse = () => {
  const { showAlertError, showAlertSucces } = useAlertToast();
  const [selectedWarehouse, setSelectedWarehouse] = useState('');
  const [loading, setLoading] = useState(false);
  const [warehouses, setWarehouses] = useState([]);

  const fetchWarehouses = async () => {
    try {
      const response = await api.get('/warehouses', {
        params: { limit: 1000 }
      });
      setWarehouses(response.data.results);
    } catch (error) {
      showAlertError('Error al cargar almacenes');
    }
  };

  const handleUpdateWarehouse = async (warehouseId, orderId) => {
    if (!selectedWarehouse) {
      showAlertError('Selecciona un almacen');
      return;
    }
    setLoading(true);
    try {
      await api.put(`/warehouseorders/${warehouseId}`, {
        warehouseId: selectedWarehouse
      });
      showAlertSucces('Almacen actualizado correctamente');
      return true;
    } catch (error) {
      showAlertError('Error al actualizar almacen');
      return false;
    } finally {
      setLoading(false);
    }
  };

  return {
    selectedWarehouse,
    setSelectedWarehouse,
    warehouses,
    fetchWarehouses,
    handleUpdateWarehouse,
    loading
  };
};