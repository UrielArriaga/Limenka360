import React, { useEffect, useState } from "react";
import { Grid, Typography } from "@material-ui/core";
import { Person } from "@material-ui/icons";
import { InfoProspectStyled, FieldValue } from "./styles";
import { formatDate } from "../../../../utils";

export default function InfoProspect({ prospectData }) {
  const [showAllInfo, setShowAllInfo] = useState(false);

  return (
    <InfoProspectStyled>
      <Typography variant="h6" gutterBottom>
        <Person
          style={{
            fontSize: "1.8rem",
            verticalAlign: "middle",
            marginRight: 8,
            color: "#0D9B00",
          }}
        />{" "}
        Datos del cliente
      </Typography>
      <Grid container spacing={1}>
        <Grid item xs={12} sm={6} md={5} className="itemData">
          <span className="label">Nombre:</span>{" "}
          <FieldValue>{prospectData?.fullname || "N/A"}</FieldValue>
        </Grid>
        <Grid item xs={12} sm={6} md={5} className="itemData">
          <span className="label">Género:</span>{" "}
          <FieldValue>{prospectData?.gender || "N/A"}</FieldValue>
        </Grid>
        <Grid item xs={12} sm={6} md={5} className="itemData">
          <span className="label">Teléfono:</span>{" "}
          <FieldValue>{prospectData?.optionalphone || "N/A"}</FieldValue>
        </Grid>
        <Grid item xs={12} sm={6} md={5} className="itemData">
          <span className="label">Celular:</span>{" "}
          <FieldValue>{prospectData?.phone || "N/A"}</FieldValue>
        </Grid>
        <Grid item xs={12} sm={6} md={5} className="itemData">
          <span className="label">Correo:</span>{" "}
          <FieldValue>{prospectData?.email || "N/A"}</FieldValue>
        </Grid>
        <Grid item xs={12} sm={6} md={5} className="itemData">
          <span className="label">Empresa:</span>{" "}
          <FieldValue>
            {prospectData?.clientcompany?.companyname || "N/A"}
          </FieldValue>
        </Grid>
        <Grid item xs={12} sm={6} md={5} className="itemData">
          <span className="label">Categoría de interés:</span>{" "}
          <FieldValue>{prospectData?.category?.name || "N/A"}</FieldValue>
        </Grid>
        <Grid item xs={12} sm={6} md={5} className="itemData">
          <span className="label">Tipo de cliente:</span>{" "}
          <FieldValue>{prospectData?.clienttype?.name || "N/A"}</FieldValue>
        </Grid>
        <Grid item xs={12} sm={6} md={5} className="itemData">
          <span className="label">Especialidad:</span>{" "}
          <FieldValue>{prospectData?.specialty?.name || "N/A"}</FieldValue>
        </Grid>
        <Grid item xs={12} sm={6} md={5} className="itemData">
          <span className="label">Facebook:</span>{" "}
          <FieldValue>
            {prospectData?.facebook ? (
              <a
                href={prospectData.facebook}
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: "#0056b3" }}
              >
                {prospectData.facebook}
              </a>
            ) : (
              "N/A"
            )}
          </FieldValue>
        </Grid>
        <Grid item xs={12} sm={6} md={5} className="itemData">
          <span className="label">Página web:</span>{" "}
          <FieldValue>
            {prospectData?.url ? (
              <a
                href={prospectData.url}
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: "#0056b3" }}
              >
                {prospectData.url}
              </a>
            ) : (
              "N/A"
            )}
          </FieldValue>
        </Grid>
        <Grid item xs={12} sm={6} md={5} className="itemData">
          <span className="label">Origen:</span>{" "}
          <FieldValue>{prospectData?.origin?.name || "N/A"}</FieldValue>
        </Grid>
        {showAllInfo && (
          <>
            <Grid item xs={12} sm={6} md={5} className="itemData">
              <span className="label">Estado:</span>{" "}
              <FieldValue>{prospectData?.entity?.name || "N/A"}</FieldValue>
            </Grid>
            <Grid item xs={12} sm={6} md={5} className="itemData">
              <span className="label">Código postal:</span>{" "}
              <FieldValue>
                {prospectData?.postal?.postal_code || "N/A"}
              </FieldValue>
            </Grid>
            <Grid item xs={12} sm={6} md={5} className="itemData">
              <span className="label">Ciudad / Municipio:</span>{" "}
              <FieldValue>{prospectData?.city?.name || "N/A"}</FieldValue>
            </Grid>
            <Grid item xs={12} sm={6} md={5} className="itemData">
              <span className="label">Calle:</span>{" "}
              <FieldValue>{prospectData?.street || "N/A"}</FieldValue>
            </Grid>
            <Grid item xs={12} sm={6} md={5} className="itemData">
              <span className="label">Colonia:</span>{" "}
              <FieldValue>
                {prospectData?.postal?.settlement || "N/A"}
              </FieldValue>
            </Grid>
            <Grid item xs={12} sm={6} md={5} className="itemData">
              <span className="label">Google maps:</span>{" "}
              <FieldValue>
                {prospectData?.location ? (
                  <a
                    href={prospectData.location}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ color: "#0056b3" }}
                  >
                    {prospectData.location}
                  </a>
                ) : (
                  "N/A"
                )}
              </FieldValue>
            </Grid>
            <Grid item xs={12} sm={6} md={5} className="itemData">
              <span className="label">Fecha de creación:</span>{" "}
              <FieldValue>
                {formatDate(prospectData?.createdAt) || "N/A"}
              </FieldValue>
            </Grid>
            <Grid item xs={12} sm={6} md={5} className="itemData">
              <span className="label">Fecha de actualización:</span>{" "}
              <FieldValue>
                {formatDate(prospectData?.updatedAt) || "N/A"}
              </FieldValue>
            </Grid>
            <Grid item xs={12} sm={6} md={5} className="itemData">
              <span className="label">Observaciones:</span>{" "}
              <FieldValue>{prospectData?.observations || "N/A"}</FieldValue>
            </Grid>
            <Grid item xs={12} sm={6} md={5} className="itemData">
              <span className="label">Etiquetas:</span>{" "}
              <FieldValue>{prospectData?.prospectslabels || "N/A"}</FieldValue>
            </Grid>
          </>
        )}
        <Grid item xs={12}>
          <button onClick={() => setShowAllInfo(!showAllInfo)}>
            {showAllInfo ? "Ver menos" : "Ver más"}
          </button>
        </Grid>
      </Grid>
    </InfoProspectStyled>
  );
}
