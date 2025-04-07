import { React, useEffect, useState } from "react";
import { EditUser } from "../../styles/Usuarios/usuarios.style";
import { Dialog, IconButton, Grid, Button, Backdrop, CircularProgress, LinearProgress } from "@material-ui/core";
import { Close, Person, LockOpen, Group, SupervisorAccount, Lock } from "@material-ui/icons";
import SelectAcces from "react-select";
import { api } from "../../services/api";
import { useForm } from "react-hook-form";
import { normalizeEditUser, normalizeEditUserPermissions } from "../../utils/normalizeData";
import { makeStyles } from "@material-ui/core/styles";
const useStyles = makeStyles(theme => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: "#fff",
  },
}));
export default function Edit({
  openEditUser,
  setOpen,
  dataRoles,
  dataGroups,
  userToEdit,
  setUserToEdit,
  refetchUsers,
  setRefetchUsers,
  dataUsersAcces,
  handleAlert,
  warehouses,
  ...props
}) {
  const classes = useStyles();
  const [firstBar, setFirstBar] = useState(0);
  const [secondBar, setSecondtBar] = useState(0);
  const [activestep, setActiveStep] = useState(0);
  const [usersAccess, setUsersAccess] = useState([]);
  const [groupsAccess, setGroupsAccess] = useState([]);
  const [loaderBack, setLoaderBack] = useState(false);
  const [initialsExist, setInitialExist] = useState(false);
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();


  useEffect(() => {
    // other code
    if (userToEdit !== undefined) {
      handleEditUserOpen();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userToEdit]);

  useEffect(() => {
    // other code
    nextStep();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activestep]);

  const usersAcces = event => {
    setUsersAccess(event);
  };
  const groupsAcces = event => {
    setGroupsAccess(event);
  };
  const editData = async formData => {
    setLoaderBack(true);
    try {
      console.log(formData)
      formData.idUser = userToEdit.id;
      let queryInitials = {};
      queryInitials.username = formData.username;
      queryInitials.id = { notLike: userToEdit.id };
      let queryUser = normalizeEditUser(formData);
      let userPermission = normalizeEditUserPermissions(formData);
      let dataValidateInitials = await api.get(`ejecutives?where=${JSON.stringify(queryInitials)}&count=0&limit=0`);
      console.log(dataValidateInitials.data);
      if (dataValidateInitials >= 1) {
        // console.log("existe");
      } else {
        if (!allowedRoles.includes(formData.role)) {
          formData.warehouse = null;
        }
        let queryUser = normalizeEditUser(formData);
        let updateDataUser = await api.put(`ejecutives/${userToEdit.id}`, queryUser);
        let updatePermissions = await api.put(`permissionsusers/permissions`, userPermission);
        if (updateDataUser.status === 200) {
          setLoaderBack(false);
          setRefetchUsers(!refetchUsers);
          handleEditUserClose();
          handleAlert("success", "Usuario - Actualizado!", "basic");
        }
      }
    } catch (err) {
      setInitialExist(true);
      setActiveStep(0);
      setLoaderBack(false);
      if (err.response.config.url.includes(`ejecutives`))
        handleAlert("error", "Usuario - Error al Actualizar Datos!", "basic");
      if (err.response.config.url.includes(`permissionsusers`))
        handleAlert("error", "Usuario - Error al Actualizar Permisos!", "basic");
      console.log(err);
    }
  };
  const handleEditUserOpen = () => {
    setValue("name", userToEdit?.name);
    setValue("lastname", userToEdit?.lastname);
    setValue("username", userToEdit?.username);
    setValue("phone", userToEdit?.phone);
    if (userToEdit?.optionalphone === null) {
      setValue("optionalphone", "");
    } else {
      setValue("optionalphone", userToEdit?.optionalphone);
    }
    setValue("email", userToEdit?.email);
    setValue("group", userToEdit?.groupId);
    setValue("role", userToEdit?.roleId);
    setValue("title", userToEdit?.title);
    setValue("warehouse", userToEdit?.warehouseId);
    api
      .get(`permissionsusers?where={"ejecutiveId":"${userToEdit?.id}"}&include=permission,types_permission&limit=100`)
      .then(res => {
        setInfoPermissions(res.data.results);
      })
      .catch(err => {
        console.log(err);
      });
  };
  const setInfoPermissions = value => {
    value.forEach(permi => {
      switch (permi.permission.name) {
        case "Empresa":
          setValue("company", permi.types_permission.name);
          break;
        case "Crearetiquetas":
          setValue("label", permi.types_permission.name);
          break;
        case "Plantillas":
          setValue("templates", permi.types_permission.name);
          break;
        case "Documentos":
          setValue("documents", permi.types_permission.name);
          break;
        case "Mantenimiento":
          setValue("maintenance", permi.types_permission.name);
          break;
        case "Descuentos":
          setValue("discounts", permi.types_permission.name);
          break;
        case "ModificarPrecio":
          setValue("editPrice", permi.types_permission.name);
          break;
        case "Etiquetar":
          setValue("tagging", permi.types_permission.name);
          break;
        case "Importar":
          setValue("import", permi.types_permission.name);
          break;
        case "Exportar":
          setValue("export", permi.types_permission.name);
          break;
        case "Reasignar":
          setValue("reasign", permi.types_permission.name);
          break;
        case "Facturar":
          setValue("checkin", permi.types_permission.name);
          break;
        case "Cancelarfactura":
          setValue("checkinCancel", permi.types_permission.name);
          break;
        case "CompartirContactos":
          setValue("shareContacts", permi.types_permission.name);
          break;
        case "Campanasdecomunicacion":
          setValue("companyComunications", permi.types_permission.name);
          break;
        default:
          break;
      }
    });
  };
  const handleEditUserClose = () => {
    setOpen(false);
    setUserToEdit({});
    setValue("name", "");
    setValue("lastname", "");
    setValue("phone", "");
    setValue("optionalphone", "");
    setValue("email", "");
    setValue("group", "");
    setValue("role", "");
    setValue("username", "");
    setValue("warehouse", "");
    setInitialExist(false);
    setActiveStep(0);
  };
  const validateInitials = item => {
    let initial = item.toUpperCase();
    let noneSpace = initial.replace(/ /g, "");
    let nonecharacters = noneSpace.replace(/[^a-z0-9Ñ]/gi, "");
    setValue("username", nonecharacters);
  };
  const ShowAlert = ({ info }) => {
    return <span className="requiredAlert">{info}</span>;
  };
  const nextStep = () => {
    switch (activestep) {
      case 0:
        setFirstBar(0);
        setSecondtBar(0);
        break;
      case 1:
        setFirstBar(100);
        setSecondtBar(0);
        break;
      case 2:
        setFirstBar(100);
        setSecondtBar(100);
        break;
    }
  };


  const allowedRoles = [
    "6FlYtoDij8kIqrzweJuXxXtj",  
    "KkVwwAtPVox77x2ZX55pKcmp", 
    "l8tozrnw6k5O5wRjSMV4zxhx", 
    "O0aFrqB9WFJiOy003VP2Ooe6",
    "LOsRTEdJgT0462Um78bJH4kM",
  ];
  const [selectedRole, setSelectedRole] = useState('');
  const [showWarehouseSelect, setShowWarehouseSelect] = useState(true);


  const handleRoleChange = (event) => {
    const role = event.target.value;
    setSelectedRole(role);
    
    if (!allowedRoles.includes(role)) {
      setValue('warehouse', null); 
    }
    setShowWarehouseSelect(allowedRoles.includes(role));
  };

  return (
    <Dialog open={openEditUser} onClose={handleEditUserClose}>
      <EditUser>
        <div className="headerUser">
          <p className="headerUser__title">Editar Usuario</p>
          <IconButton className="headerUser__icon" onClick={handleEditUserClose}>
            <Close />
          </IconButton>
        </div>
        <div className="containerUser">
          <div className="stepperUser">
            <div className="stepperUser__stepp" onClick={() => setActiveStep(0)}>
              <Person
                className={activestep >= 0 ? "stepperUser__stepp__icon iconActive" : "stepperUser__stepp__icon"}
              />
              <p className={activestep >= 0 ? "stepperUser__stepp__title active" : "stepperUser__stepp__title"}>
                Datos
              </p>
            </div>
            <LinearProgress variant="determinate" value={firstBar} className="stepperUser__bar" />
            <div className="stepperUser__stepp" onClick={() => setActiveStep(1)}>
              <LockOpen
                className={activestep >= 1 ? "stepperUser__stepp__icon iconActive" : "stepperUser__stepp__icon"}
              />
              <p className={activestep >= 1 ? "stepperUser__stepp__title active" : "stepperUser__stepp__title"}>
                Permisos
              </p>
            </div>
            <LinearProgress variant="determinate" value={secondBar} className="stepperUser__bar" />
            <div className="stepperUser__stepp" onClick={() => setActiveStep(2)}>
              <Group className={activestep >= 2 ? "stepperUser__stepp__icon iconActive" : "stepperUser__stepp__icon"} />
              <p className={activestep >= 2 ? "stepperUser__stepp__title active" : "stepperUser__stepp__title"}>
                Accesos
              </p>
            </div>
          </div>
          <form onSubmit={handleSubmit(editData)}>
            <Grid container spacing={1} className="mainUser">
              {activestep == 0 && (
                <>
                  <Grid item xs={12} md={6} className="formUser">
                    <p className="formUser__title">
                      Nombre{" "}
                      <span>{errors.name && errors.name.type === "required" && <ShowAlert info="Requerido" />}</span>
                    </p>
                    <input
                      {...register("name", { required: true })}
                      id="name"
                      name="name"
                      type="text"
                      className="formUser__input"
                    />
                  </Grid>
                  <Grid item xs={12} md={6} className="formUser">
                    <p className="formUser__title">
                      Apellidos{" "}
                      <span>
                        {errors.lastname && errors.lastname.type === "required" && <ShowAlert info="Requerido" />}
                      </span>
                    </p>
                    <input
                      {...register("lastname", { required: true })}
                      id="lastname"
                      name="lastname"
                      type="text"
                      className="formUser__input"
                    />
                  </Grid>
                  <Grid item xs={12} md={6} className="formUser">
                    <p className="formUser__title">
                      Iniciales
                      {initialsExist == true && <span className="requiredAlert"> Iniciales en Uso</span>}
                      <span>
                        {errors.username && errors.username.type === "required" && <ShowAlert info="Requerido" />}
                        {errors.username && errors.username.type === "maxLength" && <ShowAlert info="5 Caracteres" />}
                      </span>
                    </p>
                    <input
                      {...register("username", {
                        required: true,
                        maxLength: 5,
                      })}
                      id="username"
                      name="username"
                      type="text"
                      maxLength={5}
                      onChange={e => validateInitials(e.target.value)}
                      className="formUser__input"
                    />
                  </Grid>
                  <Grid item xs={12} md={6} className="formUser">
                    <p className="formUser__title">Titulo</p>
                    <input
                      {...register("title", {
                        required: false,
                      })}
                      id="title"
                      name="title"
                      type="text"
                      placeholder="Ingresa el Titulo del Ejecutivo"
                      className="formUser__input"
                    />
                  </Grid>
                  <Grid item xs={12} md={6} className="formUser">
                    <p className="formUser__title">
                      Teléfono{" "}
                      <span>
                        {errors.phone && errors.phone.type === "required" && <ShowAlert info="Requerido" />}
                        {errors.phone && errors.phone.type === "maxLength" && <ShowAlert info="10 Dígitos" />}
                        {errors.phone && errors.phone.type === "minLength" && <ShowAlert info="10 Dígitos" />}
                      </span>
                    </p>
                    <input
                      {...register("phone", {
                        required: true,
                        maxLength: 10,
                        minLength: 10,
                      })}
                      id="phone"
                      name="phone"
                      type="number"
                      className="formUser__input"
                    />
                  </Grid>
                  <Grid item xs={12} md={6} className="formUser">
                    <p className="formUser__title">
                      Teléfono Opcional{" "}
                      <span>
                        {errors.optionalphone && errors.optionalphone.type === "maxLength" && (
                          <ShowAlert info="10 Dígitos" />
                        )}
                        {errors.optionalphone && errors.optionalphone.type === "minLength" && (
                          <ShowAlert info="10 Dígitos" />
                        )}
                      </span>
                    </p>
                    <input
                      {...register("optionalphone", {
                        maxLength: 10,
                        minLength: 10,
                      })}
                      id="optionalphone"
                      name="optionalphone"
                      type="number"
                      className="formUser__input"
                    />
                  </Grid>
                  <Grid item xs={12} md={6} className="formUser">
                    <p className="formUser__title">
                      Correo Electrónico{" "}
                      <span>{errors.email && errors.email?.message && <ShowAlert info="Requerido" />}</span>
                    </p>
                    <input
                      {...register("email", { required: false })}
                      id="email"
                      name="email"
                      type="email"
                      autoComplete="off"
                      className="formUser__input"
                    />
                  </Grid>
                  <Grid item xs={12} md={6} className="formUser">
                    <p className="formUser__title">
                      Grupo{" "}
                      <span>{errors.group && errors.group.type === "required" && <ShowAlert info="Requerido" />}</span>
                    </p>
                    <select
                      {...register("group", { required: true })}
                      id="group"
                      name="group"
                      className="formUser__input"
                    >
                      <option value="">Seleccione una Opción</option>
                      {dataGroups?.map((item, index) => (
                        <option value={item.id} key={index}>
                          {item.name}
                        </option>
                      ))}
                    </select>
                  </Grid>

                  <Grid container spacing={2}>
                    <Grid item xs={12} md={6} className="formUser">
                      <p className="formUser__title">
                        Rol{" "}
                        <span>{errors.role && errors.role.type === "required" && <ShowAlert info="Requerido" />}</span>
                      </p>
                      <select
                        {...register("role", { required: true })}
                        id="role"
                        name="role"
                        className="formUser__input"
                        onChange={handleRoleChange}
                      >
                        <option value="">Seleccione una Opción</option>
                        {dataRoles?.map((item, index) => (
                          <option value={item.id} key={index}>
                            {item.name}
                          </option>
                        ))}
                      </select>
                    </Grid>

                    {showWarehouseSelect && (
                      <Grid item xs={12} md={6} className="formUser">
                        <p className="formUser__title">
                          Almacén{" "}
                          <span>{errors.warehouses && errors.warehouses.type === "required" && <ShowAlert info="Requerido" />}</span>
                        </p>
                        <select
                          {...register("warehouse", { required: true })}
                          id="warehouse"
                          name="warehouse"
                          className="formUser__input"
                        >
                          <option value="">Seleccione una Opción</option>
                          {warehouses?.map((item, index) => (
                            <option value={item.id} key={index}>
                              {item.name}
                            </option>
                          ))}
                        </select>
                      </Grid>
                    )}
                  </Grid>
                </>
              )}
              {activestep == 1 && (
                <>
                  <Grid item xs={6} sm={6} md={3} className="formUser">
                    <p className="formUser__title">Empresa </p>
                    <select {...register("company")} id="company" name="company" className="formUser__input">
                      <option value="Solo uso">Solo uso</option>
                      <option value="Uso y creación">Uso y Creación</option>
                    </select>
                  </Grid>
                  <Grid item xs={6} sm={6} md={3} className="formUser">
                    <p className="formUser__title">Crear Etiquetas</p>
                    <select {...register("label")} id="label" name="label" className="formUser__input">
                      <option value="No permitido">No permitido</option>
                      <option value="Crear y eliminar">Crear y eliminar</option>
                    </select>
                  </Grid>
                  <Grid item xs={6} sm={6} md={3} className="formUser">
                    <p className="formUser__title">Plantillas</p>
                    <select {...register("templates")} id="templates" name="templates" className="formUser__input">
                      <option value="No permitido">No permitido</option>
                      <option value="Solo uso">Solo Uso</option>
                      <option value="Uso y creación">Uso y Creación</option>
                    </select>
                  </Grid>
                  <Grid item xs={6} sm={6} md={3} className="formUser">
                    <p className="formUser__title">Documentos</p>
                    <select {...register("documents")} id="documents" name="documents" className="formUser__input">
                      <option value="No permitido">No permitido</option>
                      <option value="Solo uso">Solo Uso</option>
                      <option value="Uso y creación">Uso y Creación</option>
                    </select>
                  </Grid>
                  <Grid item xs={6} sm={6} md={3} className="formUser">
                    <p className="formUser__title">Mantenimiento</p>
                    <select
                      {...register("maintenance")}
                      id="maintenance"
                      name="maintenance"
                      className="formUser__input"
                    >
                      <option value="No permitido">No permitido</option>
                      <option value="Combinar registros">Combinar Registros</option>
                      <option value="Combinar y mostrar inconsistencias">Combinar y Mostrar Inconsistencias</option>
                    </select>
                  </Grid>
                  <Grid item xs={6} sm={6} md={3} className="formUser">
                    <p className="formUser__title"> Descuentos</p>
                    <select {...register("discounts")} id="discounts" name="discounts" className="formUser__input">
                      <option value="No permitido">No permitido</option>
                      <option value="Solo uso">Solo Uso</option>
                      <option value="Uso y creación">Uso y Creación</option>
                    </select>
                  </Grid>
                  <Grid item xs={6} sm={6} md={3} className="formUser">
                    <p className="formUser__title">Modificar Precios</p>
                    <select {...register("editPrice")} id="editPrice" name="editPrice" className="formUser__input">
                      <option value="No permitido">No permitido</option>
                      <option value="Permitido">Permitido</option>
                    </select>
                  </Grid>
                  <Grid item xs={6} sm={6} md={3} className="formUser">
                    <p className="formUser__title">Comisiones</p>
                    <select
                      {...register("commissions")}
                      id="commissions"
                      name="commissions"
                      className="formUser__input"
                    >
                      <option value="Sin comision">Sin Comisión</option>
                      <option value="comision">Comisión</option>
                    </select>
                  </Grid>
                  <Grid item xs={6} sm={6} md={3} className="formUser">
                    <p className="formUser__title">Etiquetar</p>
                    <select {...register("tagging")} id="tagging" name="tagging" className="formUser__input">
                      <option value="No permitido">No permitido</option>
                      <option value="Solo agregar etiquetas">Solo Agregar Etiquetas</option>
                      <option value="Solo quitar etiquetas">Solo Quitar Etiquetas</option>
                      <option value="Agregar o quitar etiquetas">Agregar o Quitar Etiquetas</option>
                    </select>
                  </Grid>
                  <Grid item xs={6} sm={6} md={3} className="formUser">
                    <p className="formUser__title">Importar</p>
                    <select {...register("import")} id="import" name="import" className="formUser__input">
                      <option value="No permitido">No permitido</option>
                      <option value="Permitido">Permitido</option>
                    </select>
                  </Grid>
                  <Grid item xs={6} sm={6} md={3} className="formUser">
                    <p className="formUser__title">Exportar</p>
                    <select {...register("export")} id="export" name="export" className="formUser__input">
                      <option value="No permitido">No permitido</option>
                      <option value="Permitido">Permitido</option>
                    </select>
                  </Grid>
                  <Grid item xs={6} sm={6} md={3} className="formUser">
                    <p className="formUser__title">Reasignar</p>
                    <select {...register("reasign")} id="reasign" name="reasign" className="formUser__input">
                      <option value="No permitido">No permitido</option>
                      <option value="Permitido">Permitido</option>
                    </select>
                  </Grid>
                  <Grid item xs={6} sm={6} md={3} className="formUser">
                    <p className="formUser__title">Facturar</p>
                    <select {...register("checkin")} id="checkin" name="checkin" className="formUser__input">
                      <option value="No permitido">No Permitido</option>
                      <option value="Permitido">Permitido</option>
                    </select>
                  </Grid>
                  <Grid item xs={6} sm={6} md={3} className="formUser">
                    <p className="formUser__title">Cancelar Factura</p>
                    <select
                      {...register("checkinCancel")}
                      id="checkinCancel"
                      name="checkinCancel"
                      className="formUser__input"
                    >
                      <option value="No permitido">No Permitido</option>
                      <option value="Permitido">Permitido</option>
                    </select>
                  </Grid>
                  <Grid item xs={6} sm={6} md={3} className="formUser">
                    <p className="formUser__title">Compartir Contactos</p>
                    <select
                      {...register("shareContacts")}
                      id="shareContacts"
                      name="shareContacts"
                      className="formUser__input"
                    >
                      <option value="No permitido">No Permitido</option>
                      <option value="Solo descompartir">Solo Descompartir</option>
                      <option value="Solo compartir">Solo Compartir</option>
                      <option value="Compartir y descompartir">Compartir y Descompartir</option>
                    </select>
                  </Grid>
                  <Grid item xs={6} sm={6} md={3} className="formUser">
                    <p className="formUser__title">Campañas de Comunicación</p>
                    <select
                      {...register("companyComunications")}
                      id="companyComunications"
                      name="companyComunications"
                      className="formUser__input"
                    >
                      <option value="No permitido">No permitido</option>
                      <option value="Solo uso">Solo Uso</option>
                      <option value="Uso y creación">Uso y Creación</option>
                    </select>
                  </Grid>
                </>
              )}
              {activestep == 2 && (
                <>
                  <Grid item xs={12} md={12} className="formUser">
                    <div className="headAccessItem">
                      <div className="iconHeadAccess">
                        <Person className="iconPerson" />
                        <Lock className="iconLock" />
                      </div>
                      <p className="titleAccess">Acceso a Prospectos, Oportunidades y Clientes de Otros Usuarios</p>
                    </div>
                    <p className="titleA">Usuarios</p>
                    <SelectAcces
                      value={usersAccess}
                      options={dataUsersAcces}
                      isMulti
                      className="selectAccess"
                      placeholder="Selecciona uno o más Usuarios"
                      onChange={usersAcces}
                      getOptionValue={option => `${option["id"]}`}
                      getOptionLabel={option => `${option.name} ${option.lastname}`}
                    />
                    <p className="titleA">Grupos</p>
                    <SelectAcces
                      value={groupsAccess}
                      options={dataGroups}
                      isMulti
                      className="selectAccess"
                      placeholder="Selecciona uno o más Usuarios"
                      onChange={groupsAcces}
                      getOptionValue={option => `${option["id"]}`}
                      getOptionLabel={option => `${option.name} ${option.lastname}`}
                    />
                  </Grid>
                  <Grid item xs={12} md={12} className="formUser">
                    <div className="headAccessItem">
                      <SupervisorAccount className="iconPersons" />
                      <p className="titleAccess">Interacción con Otros Usuarios de la Empresa</p>
                    </div>
                    <p className="titleA">Usuarios</p>
                    <SelectAcces
                      value={usersAccess}
                      options={dataUsersAcces}
                      isMulti
                      className="selectAccess"
                      placeholder="Selecciona uno o más Usuarios"
                      onChange={usersAcces}
                      getOptionValue={option => `${option["id"]}`}
                      getOptionLabel={option => `${option.name} ${option.lastname}`}
                    />
                    <p className="titleA">Grupos</p>
                    <SelectAcces
                      value={groupsAccess}
                      options={dataGroups}
                      isMulti
                      className="selectAccess"
                      placeholder="Selecciona uno o más Usuarios"
                      onChange={groupsAcces}
                      getOptionValue={option => `${option["id"]}`}
                      getOptionLabel={option => `${option.name} ${option.lastname}`}
                    />
                  </Grid>
                </>
              )}
              <Grid item xs={12} md={12} className="formButtons">
                <Button className="formButtons__cancel" onClick={handleEditUserClose}>
                  Cancelar
                </Button>
                <Button type="submit" className="formButtons__submit">
                  Actualizar
                </Button>
              </Grid>
            </Grid>
          </form>
          <Backdrop className={classes.backdrop} open={loaderBack}>
            <CircularProgress color="inherit" />
          </Backdrop>
        </div>
      </EditUser>
    </Dialog>
  );
}
