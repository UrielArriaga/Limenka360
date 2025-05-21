import React, { useState, useEffect } from "react";
import ReactSelect from "react-select";
import useGlobalCommons from "../../../../hooks/useGlobalCommons";
import { useSelector } from "react-redux";
import { commonSelector } from "../../../../redux/slices/commonSlice";
import ProspectsApi from "../../services";
import { EntitiesLocal } from "../../../../BD/databd";
import { toast } from "react-toastify";
import { api } from "../../../../services/api";

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
  const [citiesByEntity, setCitiesByEntity] = useState({ results: [] });
  const [menuIsOpen, setMenuIsOpen] = useState(false);

  const getCitiesByEntitys = async (entityId) => {
    try {
      console.log("Obteniendo municipios para entidad:", entityId);
      const query = { entityId };
      const response = await api.get(
        `cities?where=${JSON.stringify(
          query
        )}&include=entity&limit=1000&order=name`
      );
      const cities = response.data?.results ?? [];
      setCitiesByEntity({ results: cities, count: cities.length });
      console.log("Ciudades recibidas:", cities);
    } catch (err) {
      console.error("Error al obtener municipios:", err);
      setCitiesByEntity({ results: [] });
    }
  };

  useEffect(() => {
    if (
      itemToUpdate.identifier === "Municipio" &&
      citiesByEntity.results.length === 0 &&
      itemToUpdate.entityId
    ) {
      getCitiesByEntitys(itemToUpdate.entityId);
    }
  }, [itemToUpdate.identifier]);

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
    } catch (error) {
      console.error("Error actualizando el prospecto:", error);
      toast.error("Error al guardar los cambios.");
    } finally {
      setfieldToUpdate({ value: "", currentValue: "", identifier: "" });
      setHasSaved(false);
    }
  };

  const handleInputChange = (e) => {
    const { value } = e.target;

    if (itemToUpdate.identifier === "No. Celular") {
      let phoneValue = value.replace(/\D/g, "");

      if (phoneValue.length > 10) {
        phoneValue = phoneValue.slice(0, 10);
      }

      setfieldToUpdate({
        ...itemToUpdate,
        value: phoneValue,
      });
    } else if (itemToUpdate.identifier === "Correo") {
      const emailValue = value.toLowerCase().replace(/[^a-z0-9@._-]/g, "");

      setfieldToUpdate({
        ...itemToUpdate,
        value: emailValue,
      });
    } else {
      setfieldToUpdate({
        ...itemToUpdate,
        value: value,
      });
    }
  };

  if (type === "text") {
    const handleConfirmAndSave = (value) => {
      if (value === itemToUpdate.currentValue) {
        setfieldToUpdate({ value: "", currentValue: "", identifier: "" });
        return;
      }

      if (hasSaved) return;

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
        value={itemToUpdate.value || ""}
        placeholder={itemToUpdate.value ? "" : itemToUpdate.currentValue}
        autoFocus
        onChange={handleInputChange}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            e.preventDefault();
            handleConfirmAndSave(e.target.value);
          }
        }}
        onBlur={(e) => handleConfirmAndSave(e.target.value)}
      />
    );
  } else {
    if (itemToUpdate.id === "gender") {
      const genderOptions = [
        { label: "Hombre", value: "Hombre" },
        { label: "Mujer", value: "Mujer" },
      ];

      const selectedOption = genderOptions.find(
        (opt) => opt.value === itemToUpdate.value
      );

      return (
        <div
          onMouseLeave={() => {
            if (!hasSaved) {
              setfieldToUpdate({ value: "", currentValue: "", identifier: "" });
            }
          }}
        >
          <ReactSelect
            placeholder="Selecciona un género"
            className="reactSelect"
            options={genderOptions}
            value={selectedOption}
            onChange={(selectedOption) => {
              const isConfirm = window.confirm("¿Desea guardar los cambios?");
              if (isConfirm) {
                setHasSaved(true);
                handleSave(selectedOption);
              } else {
                setfieldToUpdate({
                  value: "",
                  currentValue: "",
                  identifier: "",
                });
              }
            }}
            styles={selectStyle}
          />
        </div>
      );
    } else if (itemToUpdate.identifier === "Estado") {
      return (
        <div
          onMouseLeave={() => {
            if (!hasSaved) {
              setfieldToUpdate({ value: "", currentValue: "", identifier: "" });
            }
          }}
        >
          <ReactSelect
            className="reactSelect"
            placeholder="Selecciona un estado"
            options={EntitiesLocal}
            getOptionValue={(option) => option.id}
            getOptionLabel={(option) => option.name}
            value={EntitiesLocal.find(
              (option) => option.name === itemToUpdate.value
            )}
            onChange={async (selectedOption) => {
              const isConfirm = window.confirm("¿Desea guardar los cambios?");
              if (!isConfirm) {
                setfieldToUpdate({
                  value: "",
                  currentValue: "",
                  identifier: "",
                });
                return;
              }

              try {
                setHasSaved(true);
                await handleSave(selectedOption);
                await getCitiesByEntitys(selectedOption.id);
                setfieldToUpdate({
                  identifier: "Municipio",
                  id: "cityId",
                  value: "",
                  currentValue: "",
                  entityId: selectedOption.id,
                });
                toast.success("Estado actualizado. Selecciona un municipio.");
              } catch (error) {
                console.error("Error actualizando estado y municipios:", error);
                toast.error("Error al actualizar.");
              }
            }}
            styles={selectStyle}
          />
        </div>
      );
    }

    if (itemToUpdate.identifier === "Municipio") {
      if (citiesByEntity.results.length === 0) {
        return <span>Selecciona primero un estado</span>;
      }

      const selectedCity = citiesByEntity.results.find(
        (option) => option.id === itemToUpdate.value
      );

      return (
        <div
          onMouseLeave={() => {
            if (!hasSaved) {
              setfieldToUpdate({ value: "", currentValue: "", identifier: "" });
            }
          }}
        >
          <ReactSelect
            className="reactSelect"
            placeholder="Selecciona un municipio"
            options={citiesByEntity.results}
            getOptionValue={(option) => option.id}
            getOptionLabel={(option) => option.name}
            value={selectedCity}
            onChange={(selectedOption) => {
              console.log("Opción seleccionada:", selectedOption);
              const isConfirm = window.confirm("¿Desea guardar los cambios?");
              if (isConfirm) {
                setHasSaved(true);
                handleSave(selectedOption);
              } else {
                setfieldToUpdate({
                  value: "",
                  currentValue: "",
                  identifier: "",
                });
              }
            }}
            styles={selectStyle}
          />
        </div>
      );
    }

    const options = commonValues[itemToUpdate.id]?.results || [];
    const optionsWithPlaceholder = [
      { label: "Selecciona una opción", value: "", isDisabled: true },
      ...options,
    ];
    const selectedOption =
      options?.find(
        (opt) =>
          opt.id === itemToUpdate.value ||
          opt.value === itemToUpdate.value ||
          opt.name === itemToUpdate.value
      ) ??
      (itemToUpdate.value
        ? {
            label: itemToUpdate.value,
            value: itemToUpdate.value,
            isDisabled: true,
          }
        : null);

    if (!options) return <span>Cargando opciones...</span>;

    return (
      <div
        onMouseLeave={() => {
          if (!hasSaved) {
            setfieldToUpdate({ value: "", currentValue: "", identifier: "" });
          }
        }}
      >
        <ReactSelect
          placeholder="Selecciona una opción"
          className="reactSelect"
          onMenuOpen={() => getCatalogBy(itemToUpdate.id)}
          options={optionsWithPlaceholder}
          value={selectedOption}
          isLoading={commonValues[itemToUpdate?.id]?.isFetching}
          getOptionValue={(option) => option.id || option.value}
          getOptionLabel={(option) => option.name || option.label}
          onChange={(selectedOption) => {
            const isConfirm = window.confirm("¿Desea guardar los cambios?");
            if (isConfirm) {
              setHasSaved(true);
              handleSave(selectedOption);
            } else {
              setfieldToUpdate({ value: "", currentValue: "", identifier: "" });
            }
          }}
          styles={selectStyle}
        />
      </div>
    );
  }
}

export const selectStyle = {
  control: (base, state) => ({
    ...base,
    //  minHeight: "38px",
    height: 38,
    fontSize: 15,
    width: "100%",
    backgroundColor: "#ffffff",
    border: state.isFocused ? "1px solid #1976d2" : "1px solid #dcdcdc",
    borderRadius: 6,
    boxShadow: state.isFocused ? "0 0 0 1px #1976d2" : "none",
    //  transition: "border-color 0.2s ease, box-shadow 0.2s ease",
    "&:hover": {
      borderColor: "#1976d2",
    },
  }),

  singleValue: (provided) => ({
    ...provided,
    margin: 0,
    fontSize: 15,
    fontWeight: 500,
    //   color: "#1e293b",
    lineHeight: "38px",
  }),

  input: (provided) => ({
    ...provided,
    margin: 0,
    padding: "6px 10px",
    fontSize: 14,
    //  color: "#0f172a",
    //backgroundColor: "#f8fafc",
    border: "none",
    boxShadow: "none",
    fontFamily: "'Inter', sans-serif",
    transition: "all 0.2s ease-in-out",
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
    // zIndex: 999,
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
