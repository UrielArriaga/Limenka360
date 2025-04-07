import {
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  Button,
  FormControlLabel,
  Checkbox,
  CircularProgress,
} from "@material-ui/core";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { handleGlobalAlert } from "../../../../utils";
import { Skeleton } from "@material-ui/lab";
import { Controller, useForm } from "react-hook-form";
import Select from "react-select";
import { ArrowDropDown, ArrowDropUp, Warning } from "@material-ui/icons";
import { useEffect } from "react";
import { api } from "../../../../services/api";
import { DialogContainer } from "./style";

export default function ModalDeleteGroup(props) {
  const { open, setOpen, ejecutives, dataToDelete, isLoadingExecutive, setRefetch, refetch } = props;
  const dispatch = useDispatch();
  const [isOpenSelect, setIsOpenSelect] = useState(false);
  const [step, setStep] = useState(0);
  //checks
  const [checkbox1, setCheckbox1] = useState(false);
  const [checkbox2, setCheckbox2] = useState(false);
  const [guardarHabilitado, setGuardarHabilitado] = useState(false);
  //mostrar mas de manera local
  const [ejecutivosPorPagina, setEjecutivosPorPagina] = useState(5);
  const [pagina, setPagina] = useState(1);
  const [isLoadingDelete, setIsLoadingDelete] = useState(false);
  const [mostrarBotonOcultar, setMostrarBotonOcultar] = useState(false);
  //grupos
  const [groups, setGroups] = useState([]);
  const {
    register,
    handleSubmit,
    setValue,
    control,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    if (open) {
      getData();
    }
  }, [open]);

  const getData = async () => {
    try {
      let params = {
        limit: 100,
        all: 1,
      };
      let grupo = await api.get(`groups`, { params });
      let results = grupo?.data?.results;
      let WithouGroups = results.filter(item => item?.id !== dataToDelete.id);
      setGroups(WithouGroups);
    } catch (error) {
      console.log(error);
      handleGlobalAlert("warning", "Ocurrion un error al cargar los grupos", "basic", dispatch);
    }
  };

  const deleteGroup = async formData => {
    try {
      if (guardarHabilitado === false) {
        return handleGlobalAlert("warning", "Elige una opcion para continuar a eliminar grupo", "basic", dispatch);
      } else {
        switch (step) {
          case 0:
            setStep(prev => prev + 1);
            break;
          case 1:
            setStep(prev => prev + 1);
            break;
          case 2:
            //eliminar ejecutivos y grupo
            setIsLoadingDelete(true);
            let datas = {};
            if (checkbox1) {
              datas.deleteejecutives = true;
            }
            //eliminar grupo y asignar ejecutivos a otro grupo
            if (checkbox2) {
              datas.deleteejecutives = false;
              datas.groupreplace = formData?.groupSelect?.id;
            }

            let deleteGroup = await api.delete(`groups/${dataToDelete.id}`, {
              data: datas,
            });

            if (deleteGroup.status == 200) {
              handleGlobalAlert("success", "Grupos-se elimino correctamente", "basic", dispatch);
              handleCloseConfirmDelete();
              setRefetch(!refetch);
              setIsLoadingDelete(false);
            }
            break;
        }
      }
    } catch (error) {
      setIsLoadingDelete(false);
      handleGlobalAlert("error", "Ocurrió un problema - No se elimino el grupo!", "basic", dispatch);
    }
  };

  //Eliminar grupo sin ejecutivos
  const deleteGroupWithoutExecutives = async () => {
    try {
      setIsLoadingDelete(true);
      let datas = {};
      datas.deleteejecutives = true;
      let deleteGroup = await api.delete(`groups/${dataToDelete.id}`, {
        data: datas,
      });
      if (deleteGroup.status === 200) {
        handleGlobalAlert("success", "Grupos-El grupo se elimino correctamente", "basic", dispatch);
        handleCloseConfirmDelete();
        setRefetch(!refetch);
        setIsLoadingDelete(false);
      }
    } catch (error) {
      setIsLoadingDelete(false);
      handleGlobalAlert("error", "Ocurrió un problema - No se elimino el grupo!", "basic", dispatch);
      console.log(error);
    }
  };

  const handleCloseConfirmDelete = () => {
    setOpen(false);
    setStep(0);
    setCheckbox1(false);
    setCheckbox2(false);
    setGuardarHabilitado(false);
    setEjecutivosPorPagina(5);
    setPagina(1);
    setMostrarBotonOcultar(false);
    setValue("groupSelect", "");
  };

  const handleCheckbox1Change = event => {
    setCheckbox1(event.target.checked);
    setCheckbox2(false); // Desmarcar la otra opción si esta se selecciona
    if (event.target.checked) {
      setGuardarHabilitado(true);
    } else {
      setGuardarHabilitado(false);
    }
  };

  const handleCheckbox2Change = event => {
    setCheckbox2(event.target.checked);
    setCheckbox1(false); // Desmarcar la otra opción si esta se selecciona
    if (event.target.checked) {
      setGuardarHabilitado(true);
    } else {
      setGuardarHabilitado(false);
    }
  };

  //mostrar mas
  const mostrarMas = () => {
    setEjecutivosPorPagina(ejecutivosPorPagina + 5);
    setPagina(pagina + 1);

    if (ejecutivosPorPagina >= ejecutives.length) {
      setMostrarBotonOcultar(true);
    }
  };

  const ocultarResultados = () => {
    setEjecutivosPorPagina(5);
    setPagina(1);
    setMostrarBotonOcultar(false);
  };

  const bodyModalEjecutives = () => {
    return (
      <>
        {isLoadingExecutive && (
          <>
            <p className="tileEjecutives">Cargando Ejecutivos </p>
            <div className="containerProspectsSkeleton">
              <Skeleton variant="text" height={40} width={180} />
              <Skeleton variant="text" height={40} width={180} />
              <Skeleton variant="text" height={40} width={180} />
            </div>
          </>
        )}
        {!isLoadingExecutive && (
          <>
            <div className="containerProspects">
              {ejecutives.slice(0, ejecutivosPorPagina).map(ejecutivo => (
                <p key={ejecutivo.id}>{ejecutivo.fullname}</p>
              ))}

              {ejecutives.length > 10 && (
                <>
                  {mostrarBotonOcultar ? (
                    <div className="containerOcultar">
                      <p className="ocultar" onClick={ocultarResultados}>
                        Ocultar ejecutivos.
                      </p>
                      <ArrowDropUp onClick={ocultarResultados} />
                    </div>
                  ) : (
                    <div className="containerOcultar">
                      <p className="ocultar" onClick={mostrarMas}>
                        Ver más Ejecutivos.
                      </p>
                      <ArrowDropDown onClick={mostrarMas} />
                    </div>
                  )}
                </>
              )}
            </div>
          </>
        )}
      </>
    );
  };

  const bodyModal = () => {
    switch (step) {
      case 0:
        return (
          <>
            {isLoadingExecutive && (
              <>
                <p>Cargando</p>
              </>
            )}

            {!isLoadingExecutive && ejecutives.length > 0 && (
              <Grid container className={`dialogContainer ${isOpenSelect && "addHeight"}`}>
                <Grid item md={12} sm={12} xs={12} className="item">
                  <div className="header">
                    <p className="titleDelete">
                      ¿Estas seguro de eliminar el grupo: <span>{dataToDelete?.name}</span>?
                    </p>
                  </div>
                </Grid>
                <Grid item md={12} sm={12} xs={12} className="itemOptions">
                  <p className="tileOption">Selecciona una opción: </p>
                  <div>
                    <FormControlLabel
                      control={<Checkbox checked={checkbox1} onChange={handleCheckbox1Change} color="primary" />}
                      label="Eliminar grupo y ejecutivos."
                    />
                    <FormControlLabel
                      control={<Checkbox checked={checkbox2} onChange={handleCheckbox2Change} color="primary" />}
                      label="Eliminar grupo y asignar ejecutivos a otro grupo."
                    />
                  </div>
                </Grid>
                <Grid item md={12} sm={12} xs={12} className="itemEjecutives">
                  {ejecutives.length === 0 ? (
                    <p className="titleEjecutives">No hay ejecutivos en este grupo</p>
                  ) : (
                    <p className="titleEjecutives">Ejecutivos del Grupo ({ejecutives.length}) </p>
                  )}
                  {bodyModalEjecutives()}
                </Grid>
              </Grid>
            )}
            {!isLoadingExecutive && ejecutives.length === 0 && (
              <Grid container className={`dialogContainer ${isOpenSelect && "addHeight"}`}>
                <Grid item md={12} sm={12} xs={12} className="item">
                  <div className="header">
                    <p className="titleDelete">
                      ¿Estas seguro de eliminar el grupo: <span>{dataToDelete?.name}</span>?
                    </p>
                  </div>
                  <p className="titleEjecutives">No hay ejecutivos en este grupo</p>
                </Grid>
              </Grid>
            )}
          </>
        );
      case 1:
        return (
          <Grid container className="dialogContainer">
            {checkbox1 === true && (
              <>
                <Grid item md={12} sm={12} xs={12} className="itemDelete">
                  <div className="deletes">
                    <div className="warning">
                      <p className="tileDeleteAcept">Se Eliminara el grupo y ejecutivos de este grupo.</p>
                      <p className="titleDel"></p>
                      <p className="tileDeleteAcept">Grupo a Eliminar: {dataToDelete.name}</p>
                    </div>
                  </div>
                </Grid>
                <Grid item md={12} sm={12} xs={12} className="itemEjecutives">
                  <p className="titleEjecutives">Ejecutivos a Eliminar ({ejecutives.length}) </p>
                  {bodyModalEjecutives()}
                </Grid>
              </>
            )}
            {checkbox2 === true && (
              <>
                <Grid item md={12} sm={12} xs={12} className="itemDeleteAssing">
                  <div>
                    <p className="titleDel">
                      Se Eliminará el grupo ({dataToDelete?.name}), los ejecutivos de este grupo se asignaran a otro
                      grupo.
                    </p>
                    <p className="selectedOption">
                      Selecciona el Grupo a donde se asignaran tus ejecutivos ({groups.length}).
                    </p>

                    <Controller
                      name="groupSelect"
                      control={control}
                      rules={{ required: true }}
                      render={({ field }) => (
                        <Select
                          {...field}
                          placeholder="Selecciona una Opción"
                          options={groups}
                          maxMenuHeight={150}
                          getOptionLabel={option => option.name}
                          getOptionValue={option => option.id}
                          onMenuOpen={() => setIsOpenSelect(true)}
                          onMenuClose={() => setIsOpenSelect(false)}
                        />
                      )}
                    />
                  </div>
                </Grid>
                <Grid item md={12} sm={12} xs={12} className="itemEjecutives">
                  <p className="titleEjecutives">Ejecutivos a Asignar ({ejecutives.length}) </p>
                  {bodyModalEjecutives()}
                </Grid>
              </>
            )}
          </Grid>
        );
      case 2:
        return (
          <Grid container className="dialogContainer">
            {checkbox2 === true && (
              <Grid item md={12} sm={12} xs={12} className="itemDelete">
                <div className="deletes">
                  <div className="warning">
                    <Warning className="icon"></Warning>
                    <p className="tileDelete">¿Estas seguro de esto? </p>
                    <p className="tileDeleteAcept">
                      Se Eliminara el grupo ({dataToDelete.name}) y los ejecutivos de este grupo se asignaran a otro
                      grupo
                    </p>
                  </div>
                </div>
              </Grid>
            )}
            {checkbox1 === true && (
              <>
                <Grid item md={12} sm={12} xs={12} className="itemDelete">
                  <div className="deletes">
                    <div className="warning">
                      <Warning className="icon"></Warning>
                      <p className="tileDelete">¿Estas seguro de esto? </p>
                      <p className="tileDeleteAcept">
                        Se Eliminará el grupo ({dataToDelete.name}) y los ejecutivos de tus registros , no podras
                        recuperar la informacion.
                      </p>
                    </div>
                  </div>
                </Grid>
              </>
            )}
          </Grid>
        );
      default:
        break;
    }
  };

  const handleClickNext = type => {
    if (type === "next") {
    } else {
      if (step > 0) setStep(prev => prev - 1);
    }
  };

  return (
    <DialogContainer
      open={open}
      onClose={handleCloseConfirmDelete}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle className="title" id="alert-dialog-title">
        {"Eliminar Grupo"} ({dataToDelete?.name}).
        {isLoadingDelete && <CircularProgress className="loader" size={20} />}
      </DialogTitle>

      <DialogContent className="containerBody">{bodyModal()}</DialogContent>

      <DialogActions className="buttons">
        <Button
          disabled={isLoadingDelete}
          className={`cancel ${isLoadingDelete && "disabled"}`}
          onClick={handleCloseConfirmDelete}
          color="primary"
        >
          Cancelar
        </Button>

        {!isLoadingExecutive && ejecutives.length > 0 && (
          <>
            {step >= 1 && (
              <Button
                disabled={isLoadingDelete}
                className={`cancel ${isLoadingDelete && "disabled"}`}
                onClick={() => handleClickNext("goback")}
                color="primary"
              >
                Regresar
              </Button>
            )}
            {step === 0 && (
              <Button className="acept" onClick={handleSubmit(deleteGroup)} type="submit" color="primary" autoFocus>
                Continuar
              </Button>
            )}
            {step === 1 && checkbox1 && (
              <Button className="acept" onClick={handleSubmit(deleteGroup)} type="submit" color="primary" autoFocus>
                Continuar
              </Button>
            )}
            {step === 1 && checkbox2 && (
              <Button className="acept" onClick={handleSubmit(deleteGroup)} type="submit" color="primary" autoFocus>
                Continuar
              </Button>
            )}
            {step === 2 && checkbox1 && (
              <Button
                className={`acept ${isLoadingDelete && "disabled"}`}
                disabled={isLoadingDelete}
                onClick={handleSubmit(deleteGroup)}
                type="submit"
                color="primary"
                autoFocus
              >
                Aplicar
              </Button>
            )}
            {step === 2 && checkbox2 && (
              <Button
                className={`acept ${isLoadingDelete && "disabled"}`}
                disabled={isLoadingDelete}
                onClick={handleSubmit(deleteGroup)}
                type="submit"
                color="primary"
                autoFocus
              >
                Aplicar
              </Button>
            )}
          </>
        )}
        {!isLoadingExecutive && ejecutives.length === 0 && (
          <>
            {step === 0 && (
              <Button
                className={`acept ${isLoadingDelete && "disabled"}`}
                onClick={handleSubmit(deleteGroupWithoutExecutives)}
                type="submit"
                color="primary"
                autoFocus
                disabled={isLoadingDelete}
              >
                Aplicar
              </Button>
            )}
          </>
        )}
      </DialogActions>
    </DialogContainer>
  );
}
