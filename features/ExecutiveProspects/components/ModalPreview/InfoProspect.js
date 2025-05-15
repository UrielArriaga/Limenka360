import { Grid, Tooltip } from "@material-ui/core";
import React from "react";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { EntitiesLocal } from "../../../../BD/databd";
import dayjs from "dayjs";
import { useSelector } from "react-redux";
import { commonSelector } from "../../../../redux/slices/commonSlice";
import { colors } from "../../../../styles/global.styles";
import { type } from "os";
import InputField from "./InputField";
import ProspectsApi from "../../services";
import { toast } from "react-toastify";

export default function InfoProspect({
  prospectSelected,
  onTrackingCreated,
  setTrackingData,
}) {
  const [showAllInfo, setShowAllInfo] = useState(false);
  let separation = 5;
  const boldFields = [
    "Nombre",
    "Correo",
    "No. Celular",
    "Producto de Interes",
    "Categoria de Interes",
    "Tipo de Cliente",
  ];

  const [prospectDetails, setProspectDetails] = useState(null);
  const prospectsApi = new ProspectsApi();
  useEffect(() => {
    if (showAllInfo && prospectSelected?.id && !prospectDetails) {
      prospectsApi.getProspectDetails(prospectSelected.id).then((response) => {
        setProspectDetails(response.data);
      });
    }
  }, [showAllInfo, prospectSelected]);

  const printNa = (value) => {
    return value ? value : "N/A";
  };

  const formatDate = (date) => {
    return date ? dayjs(date).format("DD/MM/YYYY") : "N/A";
  };

  const [itemToUpdate, setfieldToUpdate] = useState({
    value: "",
    currentValue: "",
    identifier: "",
  });
  const [trackings, setTrackings] = useState([]);

  const clientTypeCatalog = useSelector(commonSelector)?.clientTypes?.results;

  const getClientTypeName = (id) => {
    return clientTypeCatalog?.find((item) => item.id === id)?.name || "N/A";
  };
  const categoryCatalog = useSelector(commonSelector)?.categories?.results;

  const getCategoryName = (id) => {
    return categoryCatalog?.find((item) => item.id === id)?.name || "N/A";
  };

  const channelCatalog = useSelector(commonSelector)?.channels?.results;
  const getChannelName = (id) =>
    channelCatalog?.find((item) => item.id === id)?.name || "N/A";

  const phaseCatalog = useSelector(commonSelector)?.phases?.results;
  const getPhaseName = (id) =>
    phaseCatalog?.find((item) => item.id === id)?.name || "N/A";

  const getLocalEntityName = (id) => {
    return EntitiesLocal.find((entity) => entity.id === id)?.name || "N/A";
  };

  const prospectFields = [
    { label: "Nombre", value: prospectSelected?.fullname, type: "text" },
    { label: "Correo", value: prospectSelected?.email, type: "text" },
    { label: "No. Celular", value: prospectSelected?.phone, type: "text" },
    {
      label: "Producto de Interes",
      value: prospectSelected?.product,
      type: "text",
    },
    {
      label: "Categoria de Interes",
      id: "categories",
      value: getCategoryName(prospectSelected?.categoryId),
      type: "select",
    },
    {
      label: "Tipo de Cliente",
      id: "clientTypes",
      value: getClientTypeName(prospectSelected?.clientTypeId),
      type: "select",
    },
    ...(showAllInfo && prospectDetails
      ? [
          {
            label: "Genero",
            value: prospectDetails?.gender,
            type: "select",
            id: "gender",
            options: [
              { label: "Hombre", value: "Hombre" },
              { label: "Mujer", value: "Mujer" },
            ],
          },
          {
            label: "Telefono Opcional",
            value: prospectDetails?.optionalphone,
            type: "text",
          },
          {
            label: "Canal",
            id: "channels",
            value: prospectDetails?.channel?.name || "N/A",
            type: "select",
          },
          {
            label: "Fase",
            id: "phases",
            value: prospectDetails?.phase?.name || "N/A",
            type: "select",
          },
          {
            label: "Origen",
            id: "origins",
            value: prospectDetails?.origin?.name || "N/A",
            type: "select",
          },
          {
            label: "Título",
            value: prospectDetails?.title,
            type: "text",
          },

          /* 
          {
            label: "Codigo Postal",
            id: "postals",
            value: prospectDetails?.postal?.postal_code || "N/A",
            type: "text",
          }*/

          {
            label: "Estado",
            id: "EntitiesLocal",
            value: getLocalEntityName(prospectDetails?.entity?.id),
            type: "select",
          },
          {
            label: "Municipio",
            id: "cityId",
            value: prospectDetails?.city?.name || "",
            type: "select",
          },
          {
            label: "Calle",
            value: prospectDetails?.street,
            type: "text",
          },
          {
            label: "Google Maps",
            value: prospectDetails?.location,
            type: "text",
          },
          {
            label: "Facebook",
            value: prospectDetails?.facebook,
            type: "text",
          },
          {
            label: "Pagina Web",
            value: prospectDetails?.url,
            type: "text",
          },
        ]
      : []),
  ];
  const handleOnUpdateTracking = async (fieldName, oldValue, newValue) => {
    if (oldValue !== newValue) {
      try {
        const actions = await prospectsApi.getActions();
        const seguimientoAction = actions.data.results.find(
          (a) => a.name === "Seguimiento Automatico"
        );

        if (!seguimientoAction) {
          toast.error("No se encontró la acción 'Seguimiento Automatico'");
          return;
        }

        const newTracking = {
          actionId: seguimientoAction.id,
          reason: `Actualización de campo ${fieldName}`,
          observations: `Campo actualizado: ${fieldName}. De: ${oldValue} a: ${newValue}`,
          prospectId: prospectSelected.id,
          status: 1,
        };

        await prospectsApi.addAutomaticTracking(newTracking); // Crea el seguimiento
        toast.success("Seguimiento creado exitosamente");

        const updatedProspect = { [fieldName]: newValue };
        await prospectsApi.updateProspectField(
          prospectSelected.id,
          updatedProspect
        );
        prospectSelected[fieldName] = newValue;

        const trackingResponse = await prospectsApi.getTrackings({
          where: JSON.stringify({
            prospectId: prospectSelected.id,
          }),
        });

        setTrackingData((prevState) => ({
          ...prevState,
          results: trackingResponse.data.results,
          count: trackingResponse.data.count,
        }));

        if (typeof onTrackingCreated === "function") {
          onTrackingCreated();
        }
      } catch (error) {
        console.error(error);
        toast.error("Error al guardar el seguimiento");
      }
    }
  };

  const handleOnClickField = (field) => {
    let extraProps = {};

    if (field.label === "Municipio") {
      extraProps.entityId = prospectDetails?.entity?.id;
    }

    setfieldToUpdate({
      value: field.value ?? "",
      currentValue: field.value ?? "",
      identifier: field.label,
      id: field.id || null,
      ...extraProps,
    });
  };
  const handlePhoneChange = (e) => {
    // Permitir solo números y asegurarse de que el número tenga solo 10 dígitos
    const phoneValue = e.target.value.replace(/\D/g, ""); // Eliminar cualquier caracter no numérico
    if (phoneValue.length <= 10) {
      setfieldToUpdate({
        ...itemToUpdate,
        value: phoneValue,
      });
    }
  };

  const handleEmailChange = (e) => {
    // Convertir el correo a minúsculas
    const emailValue = e.target.value.toLowerCase();
    setfieldToUpdate({
      ...itemToUpdate,
      value: emailValue,
    });
  };
  return (
    <InfoProspectStyled>
      <Grid container spacing={2}>
        {prospectFields.map((field, index) => {
          const isRequired =
            field.label === "Nombre" ||
            field.label === "Origen" ||
            field.label === "Fase" ||
            field.label === "Tipo de Cliente";
          return (
            <Grid item md={separation} xs={12} key={index}>
              {field.label === itemToUpdate.identifier && (
                <div
                  className="itemData toUpdate"
                  onClick={() => handleOnClickField(field)}
                >
                  <p className="label">
                    {field.label}{" "}
                    {isRequired && <span className="required">*</span>}
                  </p>
                  <InputField
                    type={field.type}
                    itemToUpdate={itemToUpdate}
                    setfieldToUpdate={setfieldToUpdate}
                    prospectId={prospectSelected.id}
                    onUpdate={() => {
                      prospectsApi
                        .getProspectDetails(prospectSelected.id)
                        .then((response) => {
                          const updatedData = response.data;

                          prospectSelected.fullname = updatedData.fullname;
                          prospectSelected.email = updatedData.email;
                          prospectSelected.phone = updatedData.phone;
                          prospectSelected.product = updatedData.product;
                          prospectSelected.category =
                            updatedData.category?.name;
                          prospectSelected.clienttype = updatedData.clienttype;

                          if (showAllInfo) {
                            setProspectDetails(updatedData);
                          }

                          if (itemToUpdate.identifier === "Nombre") {
                            handleOnUpdateTracking(
                              "Nombre",
                              itemToUpdate.currentValue,
                              updatedData.fullname
                            );
                          } else if (itemToUpdate.identifier === "Correo") {
                            handleOnUpdateTracking(
                              "Correo",
                              itemToUpdate.currentValue,
                              updatedData.email
                            );
                          } else if (
                            itemToUpdate.identifier === "No. Celular"
                          ) {
                            handleOnUpdateTracking(
                              "No. Celular",
                              itemToUpdate.currentValue,
                              updatedData.phone
                            );
                          }

                          toast.success("Campo actualizado correctamente", {
                            autoClose: 2000,
                          });
                          setfieldToUpdate({
                            value: "",
                            currentValue: "",
                            identifier: "",
                            id: field.id || null,
                          });
                        })
                        .catch(() => {
                          toast.error("Hubo un error al actualizar el campo");
                        });
                    }}
                  />
                  <div className="saveLegend">
                    <p>Presiona Enter para guardar los cambios</p>
                  </div>
                </div>
              )}

              {field.label !== itemToUpdate.identifier && (
                <div
                  className="itemData"
                  onClick={() => handleOnClickField(field)}
                >
                  <p className="label">
                    {field.label}{" "}
                    {isRequired && <span className="required">*</span>}
                  </p>
                  <Tooltip title={printNa(field?.value)}>
                    <FieldValue
                      style={{
                        fontWeight: boldFields.includes(field.label)
                          ? "bold"
                          : "normal",
                      }}
                    >
                      {printNa(field?.value)}
                    </FieldValue>
                  </Tooltip>
                </div>
              )}
            </Grid>
          );
        })}
      </Grid>

      <div className="center">
        <button
          onClick={() => {
            setShowAllInfo(!showAllInfo);
          }}
        >
          {showAllInfo ? "Ver menos" : "Ver más datos"}
        </button>
      </div>
    </InfoProspectStyled>
  );
}

const InfoProspectStyled = styled.div`
  background-color: #fff;
  box-shadow: rgba(17, 12, 46, 0.15) 0px 48px 100px 0px;
  padding: 10px;
  border-radius: 8px;
  margin-bottom: 30px;

  .itemData {
    margin-bottom: 10px;
    padding-right: 8px;
    padding-left: 8px;
    cursor: pointer;
  }
  .saveLegend {
    margin-top: 5px;
    font-size: 13px;
    color: ${colors.gray};
    font-style: italic;
  }

  .toUpdate {
    .labe {
      color: red;
    }
  }
  .label {
    font-weight: 600;
    margin-bottom: 8px;
    color: #1576b6;
    font-size: 16px;
    font-family: "Inter", sans-serif;
    transition: color 0.3s ease;
  }
  .required {
    color: red;
    font-size: 18px;
    margin-left: 4px;
  }
  .value {
    font-weight: bold;

    color: #000;
  }

  .inputItemData {
    background-color: #f8fafc;
    border: 1px solid #d1d5db;
    border-radius: 6px;
    padding: 8px 12px;
    width: 100%;
    font-size: 14px;
    color: #1e293b;
    font-family: "Inter", sans-serif;
    outline: none;
    transition: border-color 0.2s ease, box-shadow 0.2s ease;
  }

  .inputItemData:focus {
    border-color: #1976d2;
    box-shadow: 0 0 0 2px rgba(25, 118, 210, 0.2);
  }

  .inputItemData::placeholder {
    color: #94a3b8;
    font-style: italic;
  }

  .center {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: flex-start;
  }

  button {
    background-color: ${colors.primaryColor};
    border: none;
    color: #fff;
    padding: 8px 16px;
    border-radius: 6px;
    cursor: pointer;
    transition: background-color 0.2s ease;

    &:hover {
      background-color: #004085;
    }
  }
`;
const FieldValue = styled.p`
  font-weight: bold;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 250px;
  margin: 0;
`;
