import React, { useState } from "react";
import ReactSelect from "react-select";
import useGlobalCommons from "../../../../hooks/useGlobalCommons";
import { useSelector } from "react-redux";
import { commonSelector } from "../../../../redux/slices/commonSlice";
import ProspectsApi from "../../services";
import { EntitiesLocal } from "../../../../BD/databd";
import { toast } from "react-toastify";

const fieldMap = {
  Nombre: "fullname",
  Correo: "email",
  "No. Celular": "phone",
  "Producto de Interes": "product",
  "Categoria de Interes": "categoryId",
  "Tipo de Cliente": "clientTypeId",
  Municipio: "cityId",
  Origen: "originId",
  Canal: "channelId",
  Genero: "gender",
  "Telefono Opcional": "optionalphone",
  Fase: "phaseId",
  Título: "title",
  "Codigo Postal": "postalId",
  Estado: "entityId",
  Calle: "street",
  "Google Maps": "location",
  Facebook: "facebook",
  "Pagina Web": "url",
};

export default function InputField({
  type,
  itemToUpdate,
  setfieldToUpdate,
  prospectId,
  onUpdate,
}) {
  const { getCatalogBy } = useGlobalCommons();
  const commonValues = useSelector(commonSelector);
  const prospectsApi = new ProspectsApi();
  const [hasSaved, setHasSaved] = useState(false);

  const handleSave = async (newValue) => {
    const fieldKey = fieldMap[itemToUpdate.identifier];
    if (!fieldKey) {
      alert("Campo no reconocido.");
      return;
    }

    try {
      const payload = {};
      payload[fieldKey] =
        typeof newValue === "object" ? newValue.id || newValue.value : newValue;

      await prospectsApi.updateProspectField(prospectId, payload);
      onUpdate?.();
      toast.success("Datos actualizados correctamente.");
    } catch (error) {
      console.error("Error actualizando el prospecto:", error);
      toast.error("Error al guardar los cambios.");
    } finally {
      setfieldToUpdate({ value: "", currentValue: "", identifier: "" });
      setHasSaved(false);
    }
  };
  if (itemToUpdate.identifier === "Codigo Postal") {
    const [loadingPostal, setLoadingPostal] = useState(false);

    const handlePostalChange = async (code) => {
      if (code.length !== 5) return;

      try {
        setLoadingPostal(true);
        const response = await prospectsApi.getEntitieCityByPostals(code);
        const postal = response?.data?.results?.[0];

        if (!postal) {
          alert("Código postal no encontrado.");
          return;
        }

        const payload = {
          postalId: postal.id,
          cityId: postal.city?.id,
          entityId: postal.city?.entity?.id,
        };

        await prospectsApi.updateProspectField(prospectId, payload);
        alert("Código postal y ubicación actualizados correctamente.");
        onUpdate?.();
      } catch (error) {
        console.error("Error al actualizar postal:", error);
        alert("Error al actualizar el código postal.");
      } finally {
        setLoadingPostal(false);
        setfieldToUpdate({ value: "", currentValue: "", identifier: "" });
      }
    };

    return (
      <input
        className="inputItemData"
        placeholder="Código Postal"
        value={itemToUpdate.value}
        autoFocus
        disabled={loadingPostal}
        onChange={(e) =>
          setfieldToUpdate({ ...itemToUpdate, value: e.target.value })
        }
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            e.preventDefault();
            handlePostalChange(itemToUpdate.value);
          }
        }}
        onBlur={() => handlePostalChange(itemToUpdate.value)}
      />
    );
  }

  if (type === "text") {
    const handleConfirmAndSave = (value) => {
      if (hasSaved || value === itemToUpdate.currentValue) return;
      const isConfirm = window.confirm("¿Desea guardar los cambios?");
      if (isConfirm) {
        setHasSaved(true);
        handleSave(value);
      } else {
        setfieldToUpdate({ value: "", currentValue: "", identifier: "" });
      }
    };

    return (
      <input
        className="inputItemData"
        placeholder={itemToUpdate.identifier}
        value={itemToUpdate.value}
        autoFocus
        onBlur={() => handleConfirmAndSave(itemToUpdate.value)}
        onChange={(e) =>
          setfieldToUpdate({ ...itemToUpdate, value: e.target.value })
        }
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            e.preventDefault();
            handleConfirmAndSave(itemToUpdate.value);
          }
        }}
      />
    );
  } else {
    if (itemToUpdate.id === "gender") {
      const genderOptions = [
        { label: "Hombre", value: "Hombre" },
        { label: "Mujer", value: "Mujer" },
      ];

      return (
        <ReactSelect
          className="reactSelect"
          placeholder="Selecciona un género"
          options={genderOptions}
          value={genderOptions.find(
            (option) => option.value === itemToUpdate.value
          )}
          onChange={(selectedOption) => {
            const isConfirm = window.confirm("¿Desea guardar los cambios?");
            if (isConfirm) {
              handleSave(selectedOption);
            } else {
              setfieldToUpdate({ value: "", currentValue: "", identifier: "" });
            }
          }}
          styles={selectStyle}
        />
      );
    } else if (itemToUpdate.identifier === "Estado") {
      return (
        <ReactSelect
          className="reactSelect"
          placeholder="Selecciona un estado"
          options={EntitiesLocal}
          getOptionValue={(option) => option.id}
          getOptionLabel={(option) => option.name}
          value={EntitiesLocal.find(
            (option) => option.name === itemToUpdate.value
          )}
          onChange={(selectedOption) => {
            const isConfirm = window.confirm("¿Desea guardar los cambios?");
            if (isConfirm) {
              handleSave(selectedOption);
            } else {
              setfieldToUpdate({ value: "", currentValue: "", identifier: "" });
            }
          }}
          styles={selectStyle}
        />
      );
    } else {
      const options = commonValues[itemToUpdate.id]?.results;

      if (!options) return <span>Cargando opciones...</span>;

      return (
        <ReactSelect
          className="reactSelect"
          placeholder="Selecciona una opción"
          onMenuOpen={() => getCatalogBy(itemToUpdate.id)}
          options={options}
          isLoading={commonValues[itemToUpdate?.id]?.isFetching}
          getOptionValue={(option) => option.id}
          getOptionLabel={(option) => option.name}
          value={
            options.find(
              (opt) =>
                opt.id === itemToUpdate.value ||
                opt.value === itemToUpdate.value ||
                opt.name === itemToUpdate.value
            ) ?? null
          }
          onChange={(selectedOption) => {
            const isConfirm = window.confirm("¿Desea guardar los cambios?");
            if (isConfirm) {
              handleSave(selectedOption);
            } else {
              setfieldToUpdate({ value: "", currentValue: "", identifier: "" });
            }
          }}
          styles={selectStyle}
        />
      );
    }
  }
}

export const selectStyle = {
  control: (base, state) => ({
    ...base,
    minHeight: 38,
    height: 38,
    fontSize: 15,
    width: "100%",
    backgroundColor: "#f8fafc",
    border: state.isFocused ? "1px solid #1976d2" : "1px solid #dcdcdc",
    borderRadius: 6,
    boxShadow: state.isFocused ? "0 0 0 1px #1976d2" : "none",
    transition: "border-color 0.2s ease, box-shadow 0.2s ease",
    "&:hover": {
      borderColor: "#1976d2",
    },
  }),

  singleValue: (provided) => ({
    ...provided,
    margin: 0,
    fontSize: 15,
    fontWeight: 500,
    color: "#1e293b",
    lineHeight: "38px",
  }),

  input: (provided) => ({
    ...provided,
    margin: 0,
    padding: "6px 10px",
    fontSize: 14,
    color: "#0f172a",
    backgroundColor: "#f8fafc",
    border: "none",
    boxShadow: "none",
    fontFamily: "'Inter', sans-serif",
    transition: "all 0.2s ease-in-out",

    "::placeholder": {
      color: "#94a3b8",
      fontStyle: "italic",
    },
  }),

  dropdownIndicator: (base) => ({
    ...base,
    padding: 6,
    color: "#64748b",
    "&:hover": {
      color: "#1976d2",
    },
  }),

  indicatorSeparator: () => ({
    display: "none",
  }),

  menu: (base) => ({
    ...base,
    backgroundColor: "#ffffff",
    borderRadius: 6,
    boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
    marginTop: 8,
    zIndex: 999,
  }),

  menuList: (base) => ({
    ...base,
    padding: 4,
  }),

  option: (base, state) => ({
    ...base,
    backgroundColor: state.isSelected
      ? "#1976d2"
      : state.isFocused
      ? "#e3f2fd"
      : "#fff",
    color: state.isSelected ? "#fff" : "#1e293b",
    fontSize: 15,
    padding: "8px 12px",
    cursor: "pointer",
    borderRadius: 4,
    margin: "2px 4px",
    transition: "background-color 0.15s ease",
  }),
};
