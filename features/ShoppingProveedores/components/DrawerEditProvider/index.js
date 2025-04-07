import React, { useEffect, useState } from "react";
import { CloseOutlined, Edit, Map, Phone, Room } from "@material-ui/icons";
import { Button, Grid } from "@material-ui/core";
import { DialogFullScreen, Error } from "./styled";
import { EntitiesLocal } from "../../../../BD/databd";
import useModal from "../../../../hooks/useModal";
import AddDirection from "../../../ShoppingProviderNew/components/AddDirection";
import ListDirections from "../../../ShoppingProviderNew/components/ListDirections";
import ListContacts from "../listContacts";
import AddContact from "../addContacts/AddContact";

export default function DrawerEditProvider(props) {
  const { open: openDirection, toggleModal } = useModal();
  const {
    openDrawer,
    selectedProvider,
    handleCloseEdit,
    closeDrawer,
    errors,
    register,
    handleSubmit,
    handleUploadProspect,
    dataAddress,
    removeAddress,
    setPostalCode,
    postalCode,
    addDirection,
    suplierProvider,
    removeSupplier,
    openContact,
    toggleContact,
    relations,
    handleAddContact,
    stateHookForm,
  } = props;

  return (
    <DialogFullScreen anchor="right" open={openDrawer} onClose={closeDrawer}>
      <div className="ctr_edit">
        <div className="ctr_edit__header">
          <div className="ctr_edit__header__close">
            <CloseOutlined className="close" onClick={closeDrawer} />
            <p className="title">Editar Proveedor</p>
          </div>
          <Button variant="contained" onClick={handleSubmit(handleUploadProspect)} className="btn_save">
            Guardar
          </Button>
        </div>
        <div style={{ height: "60px" }} />
        <div className="ctr_edit__ctr_info">
          <p className="ctr_edit__ctr_info__title">
            <Edit />
            Proveedor <span>{`${selectedProvider?.companyname || "N/A"} `}</span>
          </p>

          <Grid container className="form">
            <Grid container className="form">
              <Grid item xs={12} md={4}>
                <div className="item">
                  <div className="ContentTitleandAlert">
                    <p>
                      Nombre Contacto<strong>*</strong>
                    </p>

                    {errors.name && errors.name.type == "required" && (
                      <>
                        <div className="point"></div>
                        <Error> Requerido</Error>
                      </>
                    )}
                  </div>
                  <input
                    placeholder="Nombre"
                    className="input capitalize"
                    {...register("name", {
                      required: true,
                    })}
                  />
                </div>
              </Grid>
              <Grid item xs={12} md={4}>
                <div className="item">
                  <div className="ContentTitleandAlert">
                    <p>
                      Apellidos <strong>*</strong>
                    </p>

                    {errors.lastname && errors.lastname.type == "required" && (
                      <>
                        <div className="point"></div>
                        <Error> Requerido</Error>
                      </>
                    )}
                  </div>
                  <input
                    placeholder="Apellido"
                    className="input capitalize"
                    {...register("lastname", {
                      required: true,
                    })}
                  />
                </div>
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <div className="item">
                  <div className="ContentTitleandAlert">
                    <p>
                      Correo <strong>*</strong>
                    </p>
                    {errors.email && (
                      <>
                        <div className="point"></div> <Error>Requerido</Error>
                      </>
                    )}
                  </div>
                  <input
                    placeholder="ejemplo@gmail.com "
                    {...register("email", {
                      required: true,
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[0-9A-Z.-]+\.[A-Z]{2,4}$/i,
                        message: "*Correo Invalido",
                      },
                    })}
                    className="input"
                  />
                </div>
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <div className="item">
                  <div className="ContentTitleandAlert">
                    <p>
                      Teléfono <strong>*</strong>
                    </p>
                    {errors.phone && (
                      <>
                        <div className="point"></div> <Error>{errors.phone?.message}</Error>
                      </>
                    )}
                  </div>
                  <input
                    {...register("phone", {
                      required: { value: true, message: "Requerido" },
                      maxLength: {
                        value: 10,
                        message: "10 Caracteres",
                      },
                      minLength: {
                        value: 10,
                        message: "10 Caracteres",
                      },
                      pattern: {
                        value: /[0-9]+/i,
                        message: "Caracter Invalido",
                      },
                    })}
                    placeholder="Digíte número a 10 dígitos "
                    className="input"
                    type="number"
                  />
                </div>
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <div className="item">
                  <p>Teléfono opcional</p>
                  <input
                    type="number"
                    {...register("phoneOptional", {
                      required: {
                        value: false,
                      },
                      maxLength: {
                        value: 10,
                        message: "10 Caracteres",
                      },
                      minLength: {
                        value: 10,
                        message: "10 Caracteres",
                      },
                      pattern: {
                        value: /[0-9]+/i,
                        message: "Caracter Invalido",
                      },
                    })}
                    placeholder="Digíte número a 10 dígitos "
                    className="input"
                  />
                </div>
              </Grid>

              <Grid item xs={12} sm={6} md={4}>
                <div className="item">
                  <div className="ContentTitleandAlert">
                    <p>
                      Compañía o Nombre Proveedor <strong>*</strong>{" "}
                    </p>
                    {errors.companyname && (
                      <>
                        <div className="point"></div> <Error>Requerido</Error>
                      </>
                    )}
                  </div>
                  <input
                    {...register("companyname", { value: true, message: "Requerido" })}
                    placeholder="Ingrese nombre de la Compañía"
                    className="input"
                  />
                </div>
              </Grid>

              <Grid item xs={12} sm={6} md={4}>
                <div className="item">
                  <p> Tipo </p>
                  <select className="input" {...register("national")}>
                    <option value={""} hidden>
                      Selecciona una Opción
                    </option>
                    <option value={"true"}>Nacional</option>
                    <option value={"false"}>Importación</option>
                  </select>
                </div>
              </Grid>

              <Grid item xs={12} sm={6} md={4}>
                <div className="item">
                  <div className="ContentTitleandAlert">
                    <p>
                      RFC <strong>*</strong>
                    </p>
                    {errors.rfc && (
                      <>
                        <div className="point"></div> <Error>{errors.rfc?.message}</Error>
                      </>
                    )}
                  </div>

                  <input
                    placeholder="Ingrese RFC"
                    className="input"
                    {...register("rfc", {
                      required: "*Requerido",
                      pattern: {
                        value:
                          /^([A-ZÑ&]{3,4}) ?(?:- ?)?(\d{2}(?:0[1-9]|1[0-2])(?:0[1-9]|[12]\d|3[01])) ?(?:- ?)?([A-Z\d]{2})([A\d])$/,
                        message: "*RFC Incorrecto",
                      },
                    })}
                  />
                </div>
              </Grid>

              <Grid item xs={12} sm={6} md={4}>
                <div className="item">
                  <p>Identificador</p>
                  <input {...register("identifier")} placeholder="Ingrese identificador" className="input" />
                </div>
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <div className="item">
                  <p>NIFCIF</p>
                  <input {...register("nifcif")} placeholder="Ingrese nifcif" className="input" />
                </div>
              </Grid>
              <Grid item xs={12} sm={8} md={8}>
                <div className="item">
                  <p>Comentarios</p>
                  <input placeholder="Comentarios" className="input" {...register("observations")} />
                </div>
              </Grid>

              <Grid item xs={12}>
                <div className="subtitles">
                  <Room className="icon" />
                  <p className="titleDirection">Direcciónes</p>
                </div>
              </Grid>
              <Grid item xs={12}>
                <ListDirections storedAddresses={dataAddress?.data} removeAddress={removeAddress} />
              </Grid>
              <Grid item xs={12} className="MoreDirection">
                <Button className="actionDirection" type="button" onClick={() => toggleModal()} startIcon={<Map />}>
                  Agregar Dirección
                </Button>
              </Grid>
              <Grid item xs={12}>
                <div className="subtitles">
                  <Phone className="icon" />
                  <p className="titleDirection">Contactos</p>
                </div>
              </Grid>
              <Grid item xs={12}>
                <ListContacts allContact={suplierProvider?.data} removeContact={removeSupplier} />
              </Grid>
              <Grid item xs={12} className="MoreDirection">
                <Button className="actionDirection" onClick={() => toggleContact()} type="button" startIcon={<Phone />}>
                  Agregar Contacto
                </Button>
              </Grid>

              <Grid item xs={12} className="ctr_buttons">
                <Button variant="contained" className="btn_cancel" onClick={handleCloseEdit}>
                  Cancelar
                </Button>
                <Button variant="contained" className="btn_upload" onClick={handleSubmit(handleUploadProspect)}>
                  Guardar
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </div>
      </div>
      <AddDirection
        open={openDirection}
        toggleModal={toggleModal}
        storedAddresses={dataAddress?.data}
        setStoredAddresses={addDirection}
        postalCode={postalCode}
        setPostalCode={setPostalCode}
      />
      <AddContact
        open={openContact}
        toggleModal={toggleContact}
        relations={relations}
        handleAddContact={handleAddContact}
        stateHookForm={stateHookForm}
      />
    </DialogFullScreen>
  );
}
