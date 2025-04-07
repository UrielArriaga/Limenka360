import { React, useEffect, useState } from "react";
import Select from "react-select";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { Person, LockOpen, Group, SupervisorAccount, Lock, Visibility, VisibilityOff } from "@material-ui/icons";
import { Main } from "../../../../styles/Usuarios/nuevo/nuevousuario.styles";
import { Grid, Button, LinearProgress, Backdrop, CircularProgress } from "@material-ui/core";
import NavBarDashboard from "../../../../components/NavBarDashboard";
import SideBar from "../../../../components/SideBar";
import { useRouter } from "next/router";
import { api } from "../../../../services/api";
import { companySelector } from "../../../../redux/slices/companySlice";
import AlertGlobal from "../../../../components/Alerts/AlertGlobal";
import { makeStyles } from "@material-ui/core/styles";
import RequestCommon from "../../../../services/request_Common";
import { normalizeNewUser } from "../../../../utils/normalizeData";
import { toUpperCaseChart } from "../../../../utils";
import DirectorLayout from "../../../../layouts/DirectorLayout";
import Head from "next/head";

const useStyles = makeStyles(theme => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: "#fff",
  },
}));
export default function NuevoUsuario() {
  const [Alert, setAlert] = useState({ severity: null, show: null, message: "", type: null });
  const classes = useStyles();
  const commonApi = new RequestCommon();
  const { id_company } = useSelector(companySelector);
  const [dataRole, setDataRole] = useState([]);
  const [dataGroups, setDataGroups] = useState([]);
  const [dataUsers, setDataUsers] = useState([]);
  const [activeStep, setActiveStep] = useState(0);
  const [firstProgres, setFirstProgress] = useState(0);
  const [secondProgress, setSecondProgress] = useState(0);
  const [usersAccess, setUsersAccess] = useState([]);
  const [groupsAccess, setGroupsAccess] = useState([]);
  const [groupsInteraction, setGroupsInteraction] = useState([]);
  const [usersInteraction, setUsersInteraction] = useState([]);
  const [showPass, setShowPass] = useState(false);
  const [emailExist, setEmailExist] = useState(false);
  const [initialsExist, setInitialExist] = useState(false);
  const [formDatos, setFormDatos] = useState(true);
  const [formPermit, setFormPermit] = useState(false);
  const [formAccess, setFormAccess] = useState(false);
  const [loaderBack, setLoaderBack] = useState(false);
  const router = useRouter();
  const [showSecondSelect, setShowSecondSelect] = useState(false);
  const [selectedRole, setSelectedRole] = useState("");
  const [warehouses, setWarehouses] = useState ([]);
  const [selectedWarehouses, setSelectedWarehouses] = useState ("");
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    getGroups();
    getRoles();
    getUsers();
    getwarehouses();
  }, []);

  useEffect(() => {
    let obj = new Object(errors);
    let isEmpty = Object.entries(obj).length === 0;
    if (isEmpty === false) setActiveStep(0);
  }, [errors]);

  useEffect(() => {
    // other code
    showForms();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeStep]);

  const getGroups = async () => {
    try {
      let groups = await commonApi.getGroups();
      setDataGroups(groups.data.results);
    } catch (error) {
      console.log(error);
    }
  };
  const getRoles = async () => {
    try {
      let roles = await commonApi.getRoles();
      formatNameRoles(roles.data.results);
    } catch (error) {
      console.log(error);
    }
  };
  const getUsers = async () => {
    try {
      let users = await commonApi.getUsers();
      setDataUsers(users.data.results);
    } catch (error) {
      console.log(error);
    }
  };

  const getwarehouses = async () => {
    try {
      let warehouses = await commonApi.getwarehouses();
      setWarehouses(warehouses.data.results);
    } catch (error) {
      console.log(error);
    }
  };
  const showForms = () => {
    switch (activeStep) {
      case 0:
        setFormDatos(true);
        setFormPermit(false);
        setFormAccess(false);
        setFirstProgress(0);
        setSecondProgress(0);
        break;
      case 1:
        setFormDatos(false);
        setFormPermit(true);
        setFormAccess(false);
        setFirstProgress(100);
        setSecondProgress(0);
        break;
      case 2:
        setFormDatos(false);
        setFormPermit(false);
        setFormAccess(true);
        setSecondProgress(100);
        break;
    }
  };
  const prevStep = () => {
    setActiveStep(activeStep - 1);
  };
  const addUser = async formData => {
    setActiveStep(activeStep + 1);
    let newUser = normalizeNewUser(formData);
    newUser.companyId = id_company;
    if (activeStep == 0) {
      api
        .get(`ejecutives?where={"email":"${formData.email}"}&count=0&limit=0`)
        .then(res => {
          let results = res.data.count;
          results >= 1 ? setEmailExist(true) : setEmailExist(false);
        })
        .catch(err => console.log(err));

      api
        .get(`ejecutives?where={"username":"${formData.username}"}&count=0&limit=0`)
        .then(res => {
          let results = res.data.count;
          results >= 1 ? setInitialExist(true) : setInitialExist(false);
        })
        .catch(err => console.log(err));
    }

    if (activeStep >= 1)
      if (activeStep >= 2) {
        setLoaderBack(true);
        if (emailExist === false && initialsExist === false) {
          api
            .post(`auth/register/`, newUser)
            .then(res => {
              handleAlert("success", "Usuario - Agregado!", "basic");
              setTimeout(() => {
                router.back();
                setLoaderBack(false);
                setActiveStep(2);
              }, 2100);
            })
            .catch(err => {
              handleAlert("error", "Usuario - Ocurrió un Problema!", "basic");
              setTimeout(() => {
                setLoaderBack(false);
                setActiveStep(2);
              }, 2100);
            });
        } else {
          setLoaderBack(false);
          setActiveStep(0);
        }
      }
  };
  const usersAcces = event => {
    setUsersAccess(event);
  };
  const groupsAcces = event => {
    setGroupsAccess(event);
  };
  const groupsInt = event => {
    setGroupsInteraction(event);
  };
  const usersInt = event => {
    setUsersInteraction(event);
  };

  const validateInitials = item => {
    let initial = item.toUpperCase();
    let noneSpace = initial.replace(/ /g, "");
    let nonecharacters = noneSpace.replace(/[^a-z0-9Ñ]/gi, "");
    setValue("username", nonecharacters);
  };
  const formatNameRoles = roles => {
    let newRol = [];
    roles.forEach(role => {
      if (role.name === null) {
        newRol.push({ id: role.id, name: "Sin Nombre" });
      } else {
        let noneSpace = role.name.replace(/[^a-zA-Z0-9Ññ]/g, " ");
        newRol.push({ id: role.id, name: toUpperCaseChart(noneSpace) });
      }
    });
    setDataRole(newRol);
  };
  const handleAlert = (severity, message, type) => {
    setAlert({ severity: severity, show: true, message: message, type: type });
    setTimeout(() => {
      setAlert({ severity: severity, show: false, message: message, type: null });
    }, 3000);
  };
  const ShowAlert = ({ info }) => {
    return <span className="requiredAlert">{info}</span>;
  };

  const allowedRoles = [
    "6FlYtoDij8kIqrzweJuXxXtj",  
    "KkVwwAtPVox77x2ZX55pKcmp", 
    "l8tozrnw6k5O5wRjSMV4zxhx", 
    "O0aFrqB9WFJiOy003VP2Ooe6",
    "LOsRTEdJgT0462Um78bJH4kM",
  ];

  const handleRoleChange = (e) => {
    const value = e.target.value;
    setSelectedRole(value);
    setShowSecondSelect(allowedRoles.includes(value));
  };



  const handleSelect = (e) => {
    setSelectedWarehouses(e.target.value);
  };

  return (
    <DirectorLayout>
      <Head>
        <title>CRM JOBS - Agregar Usuario</title>
      </Head>
      <Main>
        {/* <SideBar />
      <NavBarDashboard sideBar={true} /> */}
        <div className="main_container">
          <div className="contenido">
            <p className="titleForm">Agregar Nuevo Usuario</p>
            <div className="stepper">
              <div className="step">
                <Person className={activeStep >= 0 ? "icon iconActive" : "icon"} />
                <p className={activeStep >= 0 ? "titleStep active" : "titleStep"}>Datos Generales</p>
              </div>
              <LinearProgress variant="determinate" value={firstProgres} className="progress" />
              <div className="step">
                <LockOpen className={activeStep >= 1 ? "icon iconActive" : "icon"} />
                <p className={activeStep >= 1 ? "titleStep active" : "titleStep"}>Permisos</p>
              </div>
              <LinearProgress variant="determinate" value={secondProgress} className="progress" />
              <div className="step">
                <Group className={activeStep >= 2 ? "icon iconActive" : "icon"} />
                <p className={activeStep >= 2 ? "titleStep active" : "titleStep"}>Acceso e Interacción</p>
              </div>
            </div>
            <form onSubmit={handleSubmit(addUser)}>
              {formDatos === true && (
                <Grid container spacing={1} className={formDatos == false ? " hidden" : "form"}>
                  <Grid item xs={12} md={6} className="itemForm">
                    <p>Nombre</p>
                    <input
                      {...register("name", { required: true })}
                      id="name"
                      name="name"
                      type="text"
                      placeholder="Nombre del Usuario"
                    />
                    <p className="itemForm__alert">
                      {errors.name && errors.name.type === "required" && <ShowAlert info="Requerido" />}*
                    </p>
                  </Grid>
                  <Grid item xs={12} md={6} className="itemForm">
                    <p>Apellidos</p>
                    <input
                      {...register("lastname", { required: true })}
                      id="lastname"
                      name="lastname"
                      type="text"
                      placeholder="Apellidos del Usuario"
                    />
                    <p className="itemForm__alert">
                      {errors.lastname && errors.lastname.type === "required" && <ShowAlert info="Requerido" />}*
                    </p>
                  </Grid>
                  <Grid item xs={12} md={6} className="itemForm">
                    <p>
                      Iniciales
                      {initialsExist == true && <span className="requiredAlert"> Iniciales en Uso</span>}
                    </p>
                    <input
                      {...register("username", {
                        required: true,
                        maxLength: 5,
                      })}
                      id="username"
                      name="username"
                      type="text"
                      placeholder="Iniciales del Usuario"
                      maxLength={5}
                      onChange={e => validateInitials(e.target.value)}
                    />
                    <p className="itemForm__alert">
                      {errors.username && errors.username?.type === "required" && <ShowAlert info="Requerido" />}
                      {errors.username && errors.username?.type === "maxLength" && <ShowAlert info="5 Caracteres" />}*
                    </p>
                  </Grid>
                  <Grid item xs={12} md={6} className="itemForm">
                    <p>Titulo</p>
                    <input
                      {...register("title", {
                        required: true,
                      })}
                      id="title"
                      name="title"
                      type="text"
                      placeholder="Ingresa el Titulo del Ejecutivo"
                    />
                  </Grid>
                  <Grid item xs={12} md={6} className="itemForm">
                    <p>Teléfono</p>
                    <input
                      {...register("phone", {
                        required: true,
                        maxLength: 10,
                        minLength: 10,
                      })}
                      id="phone"
                      name="phone"
                      type="number"
                      placeholder="Ejemplo: 5512345678"
                    />
                    <p className="itemForm__alert">
                      {errors.phone && errors.phone.type === "required" && <ShowAlert info="Requerido" />}
                      {errors.phone && errors.phone.type === "maxLength" && <ShowAlert info="10 Dígitos" />}
                      {errors.phone && errors.phone.type === "minLength" && <ShowAlert info="10 Dígitos" />}*
                    </p>
                  </Grid>
                  <Grid item xs={12} md={6} className="itemForm">
                    <p>Teléfono Opcional</p>
                    <input
                      {...register("opphone", {
                        maxLength: 10,
                        minLength: 10,
                      })}
                      id="opphone"
                      name="opphone"
                      type="number"
                      placeholder="Ejemplo: 5512345678"
                    />
                    <p className="itemForm__alert">
                      {errors.opphone && errors.opphone.type === "maxLength" && <ShowAlert info="10 Dígitos" />}
                      {errors.opphone && errors.opphone.type === "minLength" && <ShowAlert info="10 Dígitos" />}*
                    </p>
                  </Grid>
                  <Grid item xs={12} md={6} className="itemForm">
                    <p>
                      Correo
                      {emailExist == true && <span className="requiredAlert"> Este correo ya esta en uso</span>}
                    </p>
                    <input
                      placeholder="ejemplo@gmail.com "
                      {...register("email", {
                        required: "Requerido",
                        pattern: {
                          value: /^[A-Z0-9._%+-]+@[0-9A-Z.-]+\.[A-Z]{2,4}$/i,
                          message: "Correo Invalido",
                        },
                      })}
                      id="email"
                      name="email"
                      type="email"
                      autoComplete="off"
                    />
                    <p className="itemForm__alert">
                      {errors.email && errors.email?.message && <ShowAlert info="Requerido" />}*
                    </p>
                  </Grid>
                  <Grid item xs={12} md={6} className="itemForm">
                    <p>Contraseña</p>
                    <div className="password">
                      <input
                        {...register("password", { required: true })}
                        id="password"
                        name="password"
                        type={showPass == false ? "password" : "text"}
                        autoComplete="off"
                      />
                      {showPass == false ? (
                        <VisibilityOff className="icon" onClick={() => setShowPass(true)} />
                      ) : (
                        <Visibility className="icon" onClick={() => setShowPass(false)} />
                      )}
                    </div>
                    <p className="itemForm__alert">
                      {errors.password && errors.password.type === "required" && <ShowAlert info="Requerido" />}*
                    </p>
                  </Grid>
                  <Grid item xs={12} md={6} className="itemForm">
                    <p>Grupo</p>
                    <select {...register("group", { required: true })} id="group" name="group" className="select">
                      <option value="">Seleccione una Opción</option>
                      {dataGroups.map((item, index) => (
                        <option value={item.id} key={index}>
                          {item.name}
                        </option>
                      ))}
                    </select>
                    <p className="itemForm__alert">
                      {errors.group && errors.group.type === "required" && <ShowAlert info="Requerido" />}*
                    </p>
                  </Grid>
                    <Grid container spacing={2}>
                      <Grid item xs={12} md={6} className="itemForm">
                        <p>Rol</p>
                        <select {...register("rol", { required: true })} 
                          id="rol" 
                          name="rol" 
                          className="select"
                          value={selectedRole}
                          onChange={handleRoleChange}
                        >
                          <option value="">Seleccione una Opción</option>
                          {console.log("345",dataRole)}
                          {dataRole.map((item, index) => (
                            <option value={item.id} key={index}>
                              {item.name}
                            </option>
                          ))}
                        </select>
                        <p className="itemForm__alert">
                          {errors.rol && errors.rol.type === "required" && <ShowAlert info="Requerido" />}*
                        </p>
                    </Grid>
                      {showSecondSelect && (
                        <Grid item xs={12} md={6} className="itemForm">
                          <p>Almacen</p>
                          <select {...register("warehouse", { required: true })} 
                            id="warehouse" 
                            name="warehouse" 
                            className="select"
                            value={selectedWarehouses}
                            onChange={handleSelect}
                          >
                            <option value="">Seleccione una Opción</option>
                            {console.log("123",warehouses)}
                            {warehouses.map((item, index) => (
                              <option value={item.id} key={index}>
                                {item.name}
                              </option>
                            ))}
                          </select>
                          <p className="itemForm__alert">
                          {errors.warehouses && errors.warehouses.type === "required" && <ShowAlert info="Requerido" />}*
                          </p>
                        </Grid>
                      )}
                    </Grid>
                </Grid>
              )}
              {formPermit === true && (
                <Grid container spacing={3} className="form">
                  <Grid item xs={12} sm={6} md={3} className="itemForm">
                    <p>Empresa</p>
                    <select {...register("company")} id="company" name="company" className="select">
                      <option value="Solo uso" defaultValue={true}>
                        Solo uso
                      </option>
                      <option value="Uso y creación">Uso y Creación</option>
                    </select>
                  </Grid>
                  <Grid item xs={12} sm={6} md={3} className="itemForm">
                    <p>Crear Etiquetas</p>
                    <select {...register("label")} id="label" name="label" className="select">
                      <option value="No permitido" defaultValue={true}>
                        No permitido
                      </option>
                      <option value="Crear y eliminar">Crear y eliminar</option>
                    </select>
                  </Grid>
                  <Grid item xs={12} sm={6} md={3} className="itemForm">
                    <p>Plantillas</p>
                    <select {...register("templates")} id="templates" name="templates" className="select">
                      <option value="No permitido" defaultValue={true}>
                        No permitido
                      </option>
                      <option value="Solo uso">Solo Uso</option>
                      <option value="Uso y creación">Uso y Creación</option>
                    </select>
                  </Grid>
                  <Grid item xs={12} sm={6} md={3} className="itemForm">
                    <p>Campañas de Comunicación</p>
                    <select
                      {...register("companyComunications")}
                      id="companyComunications"
                      name="companyComunications"
                      className="select"
                    >
                      <option value="No permitido" defaultValue={true}>
                        No permitido
                      </option>
                      <option value="Solo uso">Solo Uso</option>
                      <option value="Uso y creación">Uso y Creación</option>
                    </select>
                  </Grid>
                  <Grid item xs={12} sm={6} md={3} className="itemForm">
                    <p>Documentos</p>
                    <select {...register("documents")} id="documents" name="documents" className="select">
                      <option value="No permitido" defaultValue={true}>
                        No permitido
                      </option>
                      <option value="Solo uso">Solo Uso</option>
                      <option value="Uso y creación">Uso y Creación</option>
                    </select>
                  </Grid>
                  <Grid item xs={12} sm={6} md={3} className="itemForm">
                    <p>Mantenimiento</p>
                    <select {...register("maintenance")} id="maintenance" name="maintenance" className="select">
                      <option value="No permitido" defaultValue={true}>
                        No permitido
                      </option>
                      <option value="Combinar registros">Combinar Registros</option>
                      <option value="Combinar y mostrar inconsistencias">Combinar y Mostrar Inconsistencias</option>
                    </select>
                  </Grid>
                  <Grid item xs={12} sm={6} md={3} className="itemForm">
                    <p>Descuentos</p>
                    <select {...register("discounts")} id="discounts" name="discounts" className="select">
                      <option value="No permitido" defaultValue={true}>
                        No permitido
                      </option>
                      <option value="Solo uso">Solo Uso</option>
                      <option value="Uso y creación">Uso y Creación</option>
                    </select>
                  </Grid>
                  <Grid item xs={12} sm={6} md={3} className="itemForm">
                    <p>Modificar Precios</p>
                    <select {...register("editPrice")} id="editPrice" name="editPrice" className="select">
                      <option value="No permitido" defaultValue={true}>
                        No permitido
                      </option>
                      <option value="Permitido">Permitido</option>
                    </select>
                  </Grid>
                  <Grid item xs={12} sm={6} md={3} className="itemForm">
                    <p>Comisiones</p>
                    <select {...register("commissions")} id="commissions" name="commissions" className="select">
                      <option value="Sin comision" defaultValue={true}>
                        Sin Comisión
                      </option>
                      <option value="comision">Comisión</option>
                    </select>
                  </Grid>
                  <Grid item xs={12} sm={6} md={3} className="itemForm">
                    <p>Etiquetar</p>
                    <select {...register("tagging")} id="tagging" name="tagging" className="select">
                      <option value="No permitido" defaultValue={true}>
                        No permitido
                      </option>
                      <option value="Solo agregar etiquetas">Solo Agregar Etiquetas</option>
                      <option value="Solo quitar etiquetas">Solo Quitar Etiquetas</option>
                      <option value="Agregar o quitar etiquetas">Agregar o Quitar Etiquetas</option>
                    </select>
                  </Grid>
                  <Grid item xs={12} sm={6} md={3} className="itemForm">
                    <p>Importar</p>
                    <select {...register("import")} id="import" name="import" className="select">
                      <option value="No permitido" defaultValue={true}>
                        No permitido
                      </option>
                      <option value="Permitido">Permitido</option>
                    </select>
                  </Grid>
                  <Grid item xs={12} sm={6} md={3} className="itemForm">
                    <p>Exportar</p>
                    <select {...register("export")} id="export" name="export" className="select">
                      <option value="No permitido" defaultValue={true}>
                        No permitido
                      </option>
                      <option value="Permitido">Permitido</option>
                    </select>
                  </Grid>
                  <Grid item xs={12} sm={6} md={3} className="itemForm">
                    <p>Reasignar</p>
                    <select {...register("reasign")} id="reasign" name="reasign" className="select">
                      <option value="No permitido" defaultValue={true}>
                        No permitido
                      </option>
                      <option value="Permitido">Permitido</option>
                    </select>
                  </Grid>
                  <Grid item xs={12} sm={6} md={3} className="itemForm">
                    <p>Compartir Contactos</p>
                    <select {...register("shareContacts")} id="shareContacts" name="shareContacts" className="select">
                      <option value="No permitido" defaultValue={true}>
                        No Permitido
                      </option>
                      <option value="Solo descompartir">Solo Descompartir</option>
                      <option value="Solo compartir">Solo Compartir</option>
                      <option value="Compartir y descompartir">Compartir y Descompartir</option>
                    </select>
                  </Grid>
                  <Grid item xs={12} sm={6} md={3} className="itemForm">
                    <p>Facturar</p>
                    <select {...register("checkin")} id="checkin" name="checkin" className="select">
                      <option value="No permitido" defaultValue={true}>
                        No Permitido
                      </option>
                      <option value="Permitido">Permitido</option>
                    </select>
                  </Grid>
                  <Grid item xs={12} sm={6} md={3} className="itemForm">
                    <p>Cancelar Factura</p>
                    <select {...register("checkinCancel")} id="checkinCancel" name="checkinCancel" className="select">
                      <option value="No permitido" defaultValue={true}>
                        No Permitido
                      </option>
                      <option value="Permitido">Permitido</option>
                    </select>
                  </Grid>
                </Grid>
              )}
              {formAccess === true && (
                <Grid container spacing={1} className="form">
                  <Grid item xs={12} md={12} className="itemForm">
                    <div className="headAccessItem">
                      <div className="iconHeadAccess">
                        <Person className="iconPerson" />
                        <Lock className="iconLock" />
                      </div>
                      <p className="titleAccess">Acceso a Prospectos, Oportunidades y Clientes de Otros Usuarios</p>
                    </div>
                  </Grid>
                  <Grid item xs={12} md={6} className="itemForm">
                    <p>Usuarios</p>
                    <Select
                      value={usersAccess}
                      options={dataUsers}
                      isMulti
                      className="selectAccess"
                      placeholder="Selecciona uno o más Usuarios"
                      onChange={usersAcces}
                      getOptionValue={option => `${option["id"]}`}
                      getOptionLabel={option => `${option.name} ${option.lastname}`}
                    />
                  </Grid>
                  <Grid item xs={12} md={6} className="itemForm">
                    <p>Grupos</p>
                    <Select
                      value={groupsAccess}
                      isMulti
                      className="selectAccess"
                      placeholder="Selecciona uno o más Grupos"
                      options={dataGroups}
                      getOptionValue={option => `${option["id"]}`}
                      getOptionLabel={option => `${option.name} `}
                      onChange={groupsAcces}
                    />
                  </Grid>
                  <Grid item xs={12} md={12} className="itemForm">
                    <div className="headAccessItem marginTop ">
                      <SupervisorAccount className="iconPersons" />
                      <p className="titleAccess">Interacción con Otros Usuarios de la Empresa</p>
                    </div>
                  </Grid>
                  <Grid item xs={12} md={6} className="itemForm">
                    <p>Usuarios</p>
                    <Select
                      value={usersInteraction}
                      options={dataUsers}
                      isMulti
                      className="selectAccess"
                      placeholder="Selecciona uno o más Usuarios"
                      onChange={usersInt}
                      getOptionValue={option => `${option["id"]}`}
                      getOptionLabel={option => `${option.name} ${option.lastname}`}
                    />
                  </Grid>
                  <Grid item xs={12} md={6} className="itemForm">
                    <p>Grupos</p>
                    <Select
                      value={groupsInteraction}
                      options={dataGroups}
                      isMulti
                      className="selectAccess"
                      placeholder="Selecciona uno o más Grupos"
                      getOptionLabel={option => `${option.name} `}
                      onChange={groupsInt}
                    />
                  </Grid>
                </Grid>
              )}

              <Grid container spacing={1} className="buttons">
                <Grid item xs={12} md={12} className="itemButtons">
                  <div className="itemButtons__submit">
                    <Button className="btnBack" onClick={() => router.back()}>
                      Cancelar
                    </Button>
                    {activeStep >= 1 && (
                      <Button className="btnSubmit" onClick={prevStep}>
                        Atrás
                      </Button>
                    )}
                    {activeStep <= 1 && (
                      <Button className="btnSubmit" type="submit">
                        Siguiente
                      </Button>
                    )}
                    {activeStep >= 2 && (
                      <Button type="submit" className="btnSubmit">
                        Guardar
                      </Button>
                    )}
                  </div>
                </Grid>
              </Grid>
            </form>
          </div>
          <Backdrop className={classes.backdrop} open={loaderBack}>
            {Alert?.show && (
              <AlertGlobal severity={Alert.severity} message={Alert.message} show={Alert.show} type={Alert.type} />
            )}
            <CircularProgress color="inherit" />
          </Backdrop>
        </div>
      </Main>
    </DirectorLayout>
  );
}
