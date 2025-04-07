import React, { useEffect, useState } from "react";
import { ContainerNew, Error } from "./styled";
import Head from "next/head";
import { ArrowBack, Assignment, Map, Phone, Room } from "@material-ui/icons";
import { Button, Grid } from "@material-ui/core";
import AddDirection from "./components/AddDirection";
import useNewProvider from "./hooks/useNewProvider";
import ListDirections from "./components/ListDirections";
import LoaderCompleteScreen from "../../components/LoaderCompleteScreen";
import AddContact from "./components/addContacts/AddContact";
import useAddContact from "./hooks/useAddContact";
import ListContacts from "./components/listContacts";

export default function PurchasingManagerNewProvider() {
  const {
    openContact,
    toggleContact,
    relations,
    setSelectRelation,
    handleAddContact,
    stateHookForm,
    allContact,
    removeContact,
  } = useAddContact();
  const {
    handleCreateProspect,
    removeAddress,
    errors,
    handleSubmit,
    router,
    register,
    toggleModal,
    openDirection,
    storedAddresses,
    setStoredAddresses,
    postalCode,
    setPostalCode,
    isCreating,
  } = useNewProvider(allContact);

  return (
    <ContainerNew>
      <Head>
        <title>CRM JOBS - Nuevo Proveedor</title>
      </Head>
      <div className="main">
        <div className="ctr_provider">
          <div className="head">
            <div className="head__comeback" onClick={() => router.back()} aria-label="Regresar">
              <ArrowBack />
              <h3>Agregar Proveedor</h3>
            </div>
          </div>
          <form onSubmit={handleSubmit(handleCreateProspect)}>
            <Grid container className="form">
              <Grid item xs={12} sm={12} md={12}>
                <div className="subtitles">
                  <Assignment className="icon" />
                  <p className="titleDirection">Datos de Proveedor</p>
                </div>
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <div className="item">
                  <div className="ContentTitleandAlert">
                    <p>
                      Nombre Contacto<strong>*</strong>
                    </p>

                    {errors.name && (
                      <>
                        <div className="point"></div>
                        <Error> {errors.name?.message}</Error>
                      </>
                    )}
                  </div>
                  <input
                    placeholder="Nombre del Proveedor"
                    className="input"
                    {...register("name", {
                      required: "*Requerido",
                    })}
                  />
                </div>
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <div className="item">
                  <div className="ContentTitleandAlert">
                    <p>
                      Apellidos <strong>*</strong>
                    </p>

                    {errors.lastname && (
                      <>
                        <div className="point"></div>
                        <Error> {errors.lastname?.message}</Error>
                      </>
                    )}
                  </div>
                  <input
                    placeholder="Apellidos"
                    className="input"
                    {...register("lastname", { required: "*Requerido" })}
                  />
                </div>
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <div className="item">
                  <div className="ContentTitleandAlert">
                    <p>
                      Correo <strong>*</strong>
                    </p>
                    {errors.email && (
                      <>
                        <div className="point"></div> <Error>{errors.email?.message}</Error>
                      </>
                    )}
                  </div>
                  <input
                    placeholder="ejemplo@gmail.com "
                    {...register("email", {
                      required: "*Requerido",
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[0-9A-Z.-]+\.[A-Z]{2,4}$/i,
                        message: "*Correo Invalido",
                      },
                    })}
                    className="input"
                  />
                </div>
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
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
                      required: "*Requerido",
                      maxLength: {
                        value: 10,
                        message: "*10 Caracteres",
                      },
                      minLength: {
                        value: 10,
                        message: "*10 Caracteres",
                      },
                      pattern: {
                        value: /[0-9]+/i,
                        message: "*Caracter Invalido",
                      },
                    })}
                    placeholder="Digíte número a 10 dígitos "
                    className="input"
                    type="number"
                  />
                </div>
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <div className="item">
                  <div className="ContentTitleandAlert">
                    <p>Teléfono opcional</p>

                    {errors.optionalphone && (
                      <>
                        <div className="point"></div> <Error>{errors.optionalphone?.message}</Error>
                      </>
                    )}
                  </div>
                  <input
                    type="number"
                    {...register("optionalphone", {
                      maxLength: {
                        value: 10,
                        message: "*10 Caracteres",
                      },
                      minLength: {
                        value: 10,
                        message: "*10 Caracteres",
                      },
                      pattern: {
                        value: /[0-9]+/i,
                        message: "*Caracter Invalido",
                      },
                    })}
                    placeholder="Digíte número a 10 dígitos "
                    className="input"
                  />
                </div>
              </Grid>

              <Grid item xs={12} sm={6} md={3}>
                <div className="item">
                  <div className="ContentTitleandAlert">
                    <p>Compañía o Nombre Proveedor </p> <strong>*</strong>
                    {errors?.companyname && (
                      <>
                        <div className="point"></div>
                        <Error> {errors.companyname?.message} </Error>
                      </>
                    )}
                  </div>
                  <input
                    {...register("companyname", { required: "*Requerido" })}
                    placeholder="Ingrese nombre de la Compañía"
                    className="input"
                  />
                </div>
              </Grid>

              <Grid item xs={12} sm={6} md={3}>
                <div className="item">
                  <p> Tipo </p>
                  <select className="input" {...register("type")}>
                    <option value={""} hidden>
                      Selecciona una Opción
                    </option>
                    <option value={"Mujer"}>Servicios</option>
                    <option value={"Hombre"}>Hombre</option>
                  </select>
                </div>
              </Grid>

              <Grid item xs={12} sm={6} md={3}>
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

              <Grid item xs={12} sm={6} md={3}>
                <div className="item">
                  <p>NIFCIF</p>
                  <input {...register("nifcif")} placeholder="Ingrese nifcif" className="input" />
                </div>
              </Grid>

              <Grid item xs={12} sm={6} md={3}>
                <div className="item">
                  <p>Identificador</p>
                  <input {...register("identifier")} placeholder="Ingrese identificador" className="input" />
                </div>
              </Grid>
              <Grid item xs={12} sm={6} md={6}>
                <div className="item">
                  <p>Observaciones</p>
                  <input placeholder="Ingresa observaciones" className="input" {...register("observations")} />
                </div>
              </Grid>

              <Grid item xs={12}>
                <div className="subtitles">
                  <Room className="icon" />
                  <p className="titleDirection">Direcciónes</p>
                </div>
              </Grid>
              <Grid item xs={12}>
                <ListDirections storedAddresses={storedAddresses} removeAddress={removeAddress} />
              </Grid>

              <Grid item xs={12}>
                <div className="subtitles">
                  <Phone className="icon" />
                  <p className="titleDirection">Contactos de Proveedor</p>
                </div>
              </Grid>
              <Grid item xs={12}>
                <ListContacts allContact={allContact} removeContact={removeContact} />
              </Grid>

              <Grid item xs={12} className="actions">
                <Button className="actionDirection" type="button" onClick={() => toggleModal()} startIcon={<Map />}>
                  Agregar Dirección
                </Button>
                <Button className="actionDirection" type="button" onClick={() => toggleContact()} startIcon={<Phone />}>
                  Agregar Contactos
                </Button>
                <Button variant="outlined" className="cancel" onClick={() => router.back()}>
                  Cancelar
                </Button>
                <Button disabled={alert.show} variant="contained" className="btnGuardar" type="submit">
                  Guardar
                </Button>
              </Grid>
            </Grid>
          </form>
        </div>
      </div>
      <AddDirection
        open={openDirection}
        toggleModal={toggleModal}
        storedAddresses={storedAddresses}
        setStoredAddresses={setStoredAddresses}
        postalCode={postalCode}
        setPostalCode={setPostalCode}
      />
      <AddContact
        open={openContact}
        toggleModal={toggleContact}
        relations={relations}
        setSelectRelation={setSelectRelation}
        handleAddContact={handleAddContact}
        stateHookForm={stateHookForm}
      />
      {isCreating && <LoaderCompleteScreen />}
    </ContainerNew>
  );
}
