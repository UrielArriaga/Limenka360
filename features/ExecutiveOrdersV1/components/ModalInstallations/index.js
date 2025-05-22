import React, { useState, useEffect } from "react";
import {
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Switch,
  FormControlLabel,
  CircularProgress,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormHelperText,
} from "@material-ui/core";
import { StyledModalInstallations } from "./styles";
import { useSelector } from "react-redux";
import { userSelector } from "../../../../redux/slices/userSlice";
import dayjs from "dayjs";
import useAlertToast from "../../../../hooks/useAlertToast";
import { api } from "../../../../services/api";
import { EntitiesLocal } from "../../../../BD/databd";

const ModalInstallations = ({ installationModalOpen, onCloseInstallation, orderrSelected, addreesssId }) => {
  console.log("ssss",orderrSelected);
  const { id_user } = useSelector(userSelector);
  const { showAlertError, showAlertSucces } = useAlertToast();
  const [manualAddress, setManualAddress] = useState(false);

  const [postalCode, setPostalCode] = useState("");
  const [entity, setEntity] = useState(null);
  const [city, setCity] = useState(null);
  const [citiesByEntity, setCitiesByEntity] = useState([]);
  const [loadCities, setLoadCities] = useState(false);

  const getEntitieCityByPostals = async code => {
    try {
      if (code.length !== 5) return;
      let where = JSON.stringify({ postal_code: code });
      const postals = await api.get(`/postals?where=${where}&include=city,city.entity`);

      if (postals.data.results.length > 0) {
        const postalData = postals.data.results[0];
        setPostalCode(code);
        setEntity(postalData?.city?.entity);
        setCity(postalData?.city);
        getCities(postalData?.city?.entity?.id);

        setFormData(prev => ({
          ...prev,
          address: {
            ...prev.address,
            postalId: postalData.id,
            postalCode: code,
            cityId: postalData?.city?.id,
            entityId: postalData?.city?.entity?.id,
          },
        }));
      }
    } catch (error) {
      console.error("Error al obtener datos postales:", error);
    }
  };

  const handleSelectEntities = selectedEntity => {
    setEntity(selectedEntity);
    setCity(null);
    getCities(selectedEntity?.id);
    setFormData(prev => ({
      ...prev,
      address: {
        ...prev.address,
        entityId: selectedEntity?.id,
        cityId: null,
      },
    }));
  };

  const handleSelectCity = selectedCity => {
    setCity(selectedCity);
    setFormData(prev => ({
      ...prev,
      address: {
        ...prev.address,
        cityId: selectedCity?.id,
      },
    }));
  };

  const getCities = async entityId => {
    try {
      setLoadCities(true);
      const response = await api.get(`cities?where=${JSON.stringify({ entityId })}&include=entity&limit=1013`);
      setCitiesByEntity(response.data.results);
    } catch (error) {
      console.error("Error al buscar cities:", error);
    } finally {
      setLoadCities(false);
    }
  };

  const [formData, setFormData] = useState({
    assignmentdate: dayjs().format("YYYY-MM-DD HH:mm:ss.SSS ZZ"),
    installationdate: "",
    responsibleId: null,
    createdbyId: id_user,
    address: addreesssId,
    iproducts: [],
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const generateFolio = () => {
    const year = new Date().getFullYear();
    const serial = Math.floor(100000 + Math.random() * 900000);
    return `INT${year}${serial}`;
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.installationdate) newErrors.installationdate = "Fecha de instalación requerida";
    if (manualAddress) {
      if (!formData.address?.street) newErrors.address = { street: "Calle requerida" };
      if (!formData.address?.ext_number) newErrors.address = { ext_number: "Número exterior requerido" };
      if (!formData.address?.postalId || postalCode.length !== 5) { newErrors.address = { ...newErrors.address, postalId: "Código postal inválido" }; }
      if (!formData.address?.settlement) newErrors.address = { settlement: "Colonia requerida" };
    } else {
      if (!addreesssId) newErrors.address = "Selecciona una dirección existente";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = e => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleAddressSwitch = e => {
    const isManual = e.target.checked;
    setManualAddress(isManual);
    setFormData(prev => ({
      ...prev,
      address: isManual ? {} : addreesssId,
    }));
  };

  const handleNestedChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      address: {
        ...prev.address,
        [field]: value,
      },
    }));
  };

  const createInstallation = async () => {
    if (!validateForm()) return;
    setLoading(true);
    try {
      let body = {
        ...formData,
        folio: generateFolio(),
        assignmentdate: dayjs().format("YYYY-MM-DD HH:mm:ss.SSS ZZ"),
        installationdate: dayjs(formData.installationdate).format("YYYY-MM-DD HH:mm:ss.SSS ZZ"),
        iproducts: [
          {
            status: 1,
            warehouseproductId: orderrSelected?.id,
          },
        ],
      };
      if (manualAddress) {
        body.address = {
          street: formData.address.street,
          references: formData.address.references,
          settlement: formData.address.settlement,
          int_number: formData.address.int_number,
          ext_number: formData.address.ext_number,
          postalId: formData.address.postalId,
          cityId: city?.id,
          entityId: entity?.id,
          companyId: null,
        };
      } else {
        body.address = addreesssId;
      }

      let response = await api.post(`installations/manual`, body);

      if (response.status === 201) {
        showAlertSucces("Solicitud de instalación creada correctamente");
        handleClose();
      }
    } catch (error) {
      console.error("ERROR_createInstallation", error);
      showAlertError("Error al crear la solicitud de capacitación");
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setFormData(prev => ({
      ...prev,
      installationdate: "",
      address: addreesssId ? { id: addreesssId } : {},
    }));
    setManualAddress(false);
    setPostalCode("");
    setEntity(null);
    setCity(null);
    setCitiesByEntity([]);
    setErrors({});
    onCloseInstallation();
  };

  useEffect(() => {
    if (orderrSelected) {
      setFormData(prev => ({
        ...prev,
        address: manualAddress ? prev.address : addreesssId,
        iproducts: [
          {
            status: 1,
            warehouseproductId: orderrSelected?.id,
          },
        ],
      }));
    }
  }, [orderrSelected, addreesssId, manualAddress]);

  return (
    <StyledModalInstallations open={installationModalOpen} onClose={handleClose} maxWidth="md" fullWidth>
      <h3>
        {orderrSelected
          ? `¿Deseas solicitar Instalación para "${orderrSelected.product?.name}" (${orderrSelected.serialnumber})?`
          : "Nueva Instalación"}
      </h3>

      <DialogContent>
        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          <TextField
            label="Fecha para la instalación"
            type="date"
            variant="outlined"
            name="installationdate"
            value={formData.installationdate}
            onChange={handleChange}
            InputLabelProps={{ shrink: true }}
            inputProps={{ min: dayjs().format("YYYY-MM-DD") }}
            error={!!errors.installationdate}
            helperText={errors.installationdate}
            fullWidth
            required
          />

          <FormControlLabel
            control={<Switch checked={manualAddress} onChange={handleAddressSwitch} color="primary" />}
            label="Ingresar dirección"
            labelPlacement="start"
          />

          {manualAddress && (
            <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              <div style={{ display: "flex", gap: "1rem" }}>
                <TextField
                  label="Código Postal"
                  value={postalCode}
                  onChange={e => {
                    const value = e.target.value.replace(/[^0-9]/g, "").slice(0, 5);
                    setPostalCode(value);
                  }}
                  onKeyDown={e => {
                    if (
                      !/[0-9]/.test(e.key) &&
                      e.key !== "Backspace" &&
                      e.key !== "Delete" &&
                      e.key !== "ArrowLeft" &&
                      e.key !== "ArrowRight" &&
                      e.key !== "Tab"
                    ) {
                      e.preventDefault();
                    }
                  }}
                  onBlur={() => {
                    if (postalCode.length === 5) {
                      getEntitieCityByPostals(postalCode);
                    }
                  }}
                  inputProps={{
                    pattern: "[0-9]*",
                    inputMode: "numeric",
                    maxLength: 5,
                  }}
                  error={!!errors.address?.postalId || (postalCode.length > 0 && postalCode.length !== 5)}
                  helperText={
                    errors.address?.postalId ||
                    (postalCode.length > 0 && postalCode.length !== 5 ? "El código postal debe tener 5 dígitos" : "")
                  }
                  fullWidth
                  required
                />

                <FormControl fullWidth error={!!errors.address?.entityId}>
                  <InputLabel required>Estado</InputLabel>
                  <Select
                    value={entity?.id || ""}
                    onChange={e => handleSelectEntities(EntitiesLocal.find(ent => ent.id === e.target.value))}
                    label="Estado"
                  >
                    {EntitiesLocal.map(ent => (
                      <MenuItem key={ent.id} value={ent.id}>
                        {ent.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>

                <FormControl fullWidth error={!!errors.address?.cityId} disabled={!entity || loadCities}>
                  <InputLabel required>Municipio</InputLabel>
                  {loadCities ? (
                    <CircularProgress size={24} />
                  ) : (
                    <Select
                      value={city?.id || ""}
                      onChange={e => handleSelectCity(citiesByEntity.find(c => c.id === e.target.value))}
                      label="Municipio"
                    >
                      {citiesByEntity.map(municipio => (
                        <MenuItem key={municipio.id} value={municipio.id}>
                          {municipio.name}
                        </MenuItem>
                      ))}
                    </Select>
                  )}
                  <FormHelperText>{errors.address?.cityId}</FormHelperText>
                </FormControl>
              </div>
              <div style={{ display: "flex", gap: "1rem" }}>
                <TextField
                  label="Colonia"
                  value={formData.address.settlement || ""}
                  onChange={e =>
                    setFormData(prev => ({
                      ...prev,
                      address: { ...prev.address, settlement: e.target.value },
                    }))
                  }
                  fullWidth
                  required
                />
                <TextField
                  label="Calle"
                  value={formData.address.street || ""}
                  onChange={e =>
                    setFormData(prev => ({
                      ...prev,
                      address: { ...prev.address, street: e.target.value },
                    }))
                  }
                  fullWidth
                  required
                />
              </div>
              <div style={{ display: "flex", gap: "1rem" }}>
                <TextField
                  label="Número exterior"
                  value={formData.address.ext_number || ""}
                  onChange={e => {
                    const value = e.target.value.replace(/[^0-9]/g, "");
                    handleNestedChange("ext_number", value);
                  }}
                  onKeyDown={e => {
                    if (
                      !/[0-9]/.test(e.key) &&
                      e.key !== "Backspace" &&
                      e.key !== "Delete" &&
                      e.key !== "ArrowLeft" &&
                      e.key !== "ArrowRight" &&
                      e.key !== "Tab"
                    ) {
                      e.preventDefault();
                    }
                  }}
                  inputProps={{
                    pattern: "[0-9]*",
                    inputMode: "numeric",
                    maxLength: 10,
                  }}
                  required
                  error={!!errors.address?.ext_number}
                  helperText={errors.address?.ext_number}
                />

                <TextField
                  label="Número interior"
                  value={formData.address.int_number || ""}
                  onChange={e => {
                    const value = e.target.value.replace(/[^0-9]/g, "");
                    handleNestedChange("int_number", value);
                  }}
                  onKeyDown={e => {
                    if (
                      !/[0-9]/.test(e.key) &&
                      e.key !== "Backspace" &&
                      e.key !== "Delete" &&
                      e.key !== "ArrowLeft" &&
                      e.key !== "ArrowRight" &&
                      e.key !== "Tab"
                    ) {
                      e.preventDefault();
                    }
                  }}
                  inputProps={{
                    pattern: "[0-9]*",
                    inputMode: "numeric",
                    maxLength: 10,
                  }}
                  error={!!errors.address?.int_number}
                  helperText={errors.address?.int_number}
                />
              </div>
              <TextField
                label="Referencias"
                value={formData.address.references || ""}
                onChange={e =>
                  setFormData(prev => ({
                    ...prev,
                    address: { ...prev.address, references: e.target.value },
                  }))
                }
                fullWidth
              />
            </div>
          )}
        </div>
      </DialogContent>
      <DialogActions>
        <Button size="small" onClick={handleClose} color="secondary" disabled={loading} variant="outlined">
          Cancelar
        </Button>
        <Button size="small" onClick={createInstallation} color="primary" variant="contained" disabled={loading}>
          {loading ? <CircularProgress size={24} style={{ color: "#faf6f6" }} /> : "Aceptar"}
        </Button>
      </DialogActions>
    </StyledModalInstallations>
  );
};

export default ModalInstallations;
