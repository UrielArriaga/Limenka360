import { React, useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Avatar,
  IconButton,
  Chip,
  Select,
  FormControl,
  InputLabel,
  MenuItem,
  Button,
  Grid,
  Drawer,
  Dialog,
} from "@material-ui/core";
import {
  Clear,
  FilterList,
  Close,
  Search,
  PeopleAlt,
  PersonAdd,
  ArrowBackIos,
  ArrowForwardIos,
  FiberManualRecord,
  AccountCircle,
  LocalPhone,
  PermIdentity,
  EmailOutlined,
  GroupOutlined,
  SettingsOutlined,
  EventAvailableOutlined,
  EditOutlined,
  DeleteOutlineOutlined,
  FontDownloadOutlined,
  School,
  LockOutlined,
  VisibilityOff,
  Visibility,
} from "@material-ui/icons";
import { UsuariosStyle, DraweFilters, DrawerUser } from "../../../styles/Usuarios/usuarios.style";
import Edit from "../../../components/EditUser";
import NavBarDashboard from "../../../components/NavBarDashboard";
import SideBar from "../../../components/SideBar";
import { useRouter } from "next/router";
import Head from "next/head";
import { api } from "../../../services/api";
import { handleGlobalAlert, toUpperCaseChart } from "../../../utils";
import RequestCommon from "../../../services/request_Common";
import AlertGlobal from "../../../components/Alerts/AlertGlobal";
import NumberFormat from "react-number-format";
import dayjs from "dayjs";
import styled from "styled-components";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import DialogDeleteAllFromExecutive from "../../../components/Catalogos/Usuarios/DialogDeleteAllFromExecutive";
import DialogDeleteUser from "../../../components/Catalogos/Usuarios/DialogDeleteUser";
import DialogDeleteAllFromExecutiveAndMoveItsData from "../../../components/Catalogos/Usuarios/DialogDeleteAllFromExecutiveAndMoveItsData";
import DirectorLayout from "../../../layouts/DirectorLayout";
import LoaderPage from "../../../components/LoaderPage";
import useValidateLogin from "../../../hooks/useValidateLogin";

export default function Usuarios() {
  const token = localStorage.getItem("token");
  const dispatch = useDispatch();
  const commonApi = new RequestCommon();
  const [Alert, setAlert] = useState({ severity: null, show: null, message: "", type: null });
  const [dataRoles, setDataRoles] = useState([]);
  const [dataGroups, setDataGroups] = useState([]);
  const [dataUsers, setDataUsers] = useState([]);
  const [dataUsersAcces, setDataUsersAcces] = useState([]);
  const [ejecutives, setEjecutives] = useState([]); // Para borrar los ejecutivos
  const [userToEdit, setUserToEdit] = useState({});
  const [chips, setChips] = useState([]);
  const [user, setUser] = useState({});
  const [userPermissions, setUserPermissions] = useState([]);
  const [idUserDelete, setIdUserDelete] = useState("");
  const [optionShowUser, setOptionShowUser] = useState(0);
  const [totalUsers, setTotalUsers] = useState(0);
  const [limitUser, setLimitUser] = useState(10);
  const [selectGroup, setSelectGroup] = useState("");
  const [selectSituation, setSelectSituation] = useState("");
  const [selectLevel, setSelectLevel] = useState("");
  const [keySearch, setSearchKey] = useState("");
  const [searchUser, setSearchUser] = useState("");
  const [loaderTable, setLoaderTable] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [showUser, setShowUser] = useState(false);
  const [refetchUsers, setRefetchUsers] = useState(false);
  const [btClearSearch, setbtClearSearch] = useState(false);
  const router = useRouter();
  const [page, setPage] = useState(1);
  const [openEditUser, setOpenEditUser] = useState(false);
  const [openDeleteUser, setOpenDeleteUser] = useState(false);
  const [openModalPassword, setOpenModalPassword] = useState(false);
  const [flagPassword, setFlagPassword] = useState(false);
  const [password, setPassword] = useState("");
  const [idNewUser, setIdNewUser] = useState();
  const [warehouses, setWarehouses] = useState([])
  const [selectedStore, setSelectedStore] = useState ("");
  const [openDialogDeleteAllFromExecutive, setOpenDialogDeleteAllFromExecutive] = useState(false);
  const [openDialogDeleteAllFromExecutiveAndMoveItsData, setOpenDialogDeleteAllFromExecutiveAndMoveItsData] =
    useState(false);
  const { isLoadingPage } = useValidateLogin(["Admin_compania", "admin", "director"]);
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  const totalPages = Math.ceil(totalUsers / limitUser);
  useEffect(() => {
    getDataRoles();
    getDataGroups();
    getUsersAcces();
    getEjecutives();
    getwarehouses();
  }, []);

  useEffect(() => {
    // other code
    getDataUsers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [refetchUsers, page, password]);

  const handleDeleteUserClose = () => {
    setIdNewUser();
    setOpenDeleteUser(false);
  };
  const handleLimit = event => {
    setLimitUser(event.target.value);
    setRefetchUsers(!refetchUsers);
  };
  const search = () => {
    if (page > 1) {
      setPage(1);
    }
    setShowFilters(false);
    setSearchUser(keySearch.toLowerCase());
    setRefetchUsers(!refetchUsers);
  };

  const getDataUsers = () => {
    setLoaderTable(true);
    let query = {};

    if (keySearch !== "") {
      query.or = [
        { name: { iRegexp: `${keySearch.toLocaleLowerCase()}` } },
        { lastname: { iRegexp: `${keySearch.toLocaleLowerCase()}` } },
        { email: { regexp: `${keySearch.toLocaleLowerCase()}` } },
      ];
    } else {
      delete query.or;
    }

    if (searchUser === undefined || searchUser === null || searchUser === "") {
      delete query.name;
    } else {
      query.name = { match: searchUser };
    }
    if ((selectGroup === undefined) | (selectGroup === null) || selectGroup === "") {
      delete query.groupId;
      chips[0] = {};
    } else {
      let g = dataGroups.filter(item => item.id === selectGroup);
      chips[0] = {
        id: g[0].id,
        type: "group",
        name: g[0].name,
      };
      query.groupId = selectGroup;
    }
    if ((selectSituation === undefined) | (selectSituation === null) || selectSituation === "") {
      delete query.situation;
    } else {
      query.situation = selectSituation;
    }
    if (selectLevel === null || selectLevel === "") {
      delete query.roleId;
      chips[1] = {};
    } else {
      let b = dataRoles.filter(item => item.id === selectLevel);
      chips[1] = {
        id: b[0].id,
        type: "role",
        name: b[0].name,
      };
      query.roleId = selectLevel;
    }    
    if ((selectedStore === undefined) | (selectedStore === null) || selectedStore === "") {
      delete query.warehouseId;
      chips[0] = {};
    } else {
      let g = warehouses.filter(item => item.id === selectedStore);
      chips[0] = {
        id: g[0].id,
        type: "warehouse",
        name: g[0].name,
      };
      query.warehouseId = selectedStore;
    }
    api
      .get(
        `ejecutives?where=${JSON.stringify(
          query
        )}&limit=${limitUser}&order=-createdAt&skip=${page}&count=0&include=group,role,company,warehouse&join=gr,ro,com,wa`
      )
      .then(res => {
        setDataUsers(res.data.results);
        setTotalUsers(res.data.count);
      })
      .catch(err => console.log(err))
      .finally(() => setLoaderTable(false));
  };
  const getDataRoles = async () => {
    try {
      let roles = await commonApi.getRoles();
      formatNameRoles(roles.data.results);
    } catch (error) {
      console.log(error);
    }
  };
  const getDataGroups = async () => {
    try {
      let groups = await commonApi.getGroups();
      setDataGroups(groups.data.results);
    } catch (error) {
      console.log(error);
    }
  };
  const getUsersAcces = () => {  
    api
      .get(`ejecutives?limit=100&order=name&include=group`)
      .then(res => {
        setDataUsersAcces(res.data.results);
      })
      .catch(err => console.log(err));
  };

  const getEjecutives = () => {
    api
      .get(`ejecutives?all=1&order=name&include=group`)
      .then(res => {
        setEjecutives(res.data.results);
      })
      .catch(err => console.log(err));
  };

  const getwarehouses = async () => {
    try {
      let warehouses = await commonApi.getwarehouses();
      setWarehouses(warehouses.data.results);
    } catch (error) {
      console.log(error);
    }
  };

  const cleanFilters = () => {
    setSelectGroup("");
    setSelectLevel("");
    setSelectedStore("");
    setRefetchUsers(!refetchUsers);
    setShowFilters(false);
  };
  const drawerClose = () => {
    setShowFilters(false);
  };
  const drawerCloseUser = () => {
    setUser({});
    setUserPermissions([]);
    setShowUser(false);
    setOptionShowUser(0);
  };
  const sendUserShow = userData => {
    setShowUser(true);
    setUser(userData);
    api
      .get(`permissionsusers?where={"ejecutiveId":"${userData.id}"}&include=permission,types_permission&limit=100`)
      .then(res => {
        setUserPermissions(res.data.results);
      })
      .catch(err => {
        console.log(err);
      });
  };
  const namePermission = name => {
    switch (name) {
      case "Crearetiquetas":
        return "Crear Etiquetas";
      case "ModificarPrecio":
        return "Modificar Precio";
      case "Cancelarfactura":
        return "Cancelar Factura";
      case "CompartirContactos":
        return "Compartir Contactos";
      case "Campanasdecomunicacion":
        return "Campañas de Comunicación";
      default:
        return name;
    }
  };
  const handleSelect = (event) => {
    setSelectedStore(event.target.value);
  };
  const handleGroup = event => {
    setSelectGroup(event.target.value);
  };
  const handleLevel = value => {
    setSelectLevel(value);
  };
  const formatNameRoles = roles => {
    let newRol = [];
    roles.forEach(role => {
      if (role.name === null) {
        newRol.push({ id: role.id, name: "Sin Nombre" });
      } else {
        let noneSpace = role.name.replace(/[^a-zA-Z0-9Ññ]/g, " ");
        newRol.push({ id: role.id, name: (noneSpace) });
      }toUpperCaseChart
    });
    setDataRoles(newRol);
  };
  const deleteChip = valor => {
    switch (valor.type) {
      case "role":
        setSelectLevel("");
        break;
      case "group":
        setSelectGroup("");
        break;
      case "warehouse":
        setSelectedStore("");
    }
    setRefetchUsers(!refetchUsers);
  };
  const nameChips = item => {
    switch (item) {
      case "role":
        return "rol";

      case "group":
        return "grupo";

      case "warehouse":
        return "warehouses";  
    }
  };
  const handleAlert = (severity, message, type) => {
    setAlert({ severity: severity, show: true, message: message, type: type });
    setTimeout(() => {
      setAlert({ severity: severity, show: false, message: message, type: null });
    }, 3000);
  };

  const removeSearchKey = () => {
    setSearchKey("");
    setSearchUser("");
    setRefetchUsers(!refetchUsers);
    if (page > 1) {
      setPage(page - 1);
    }
  };

  const cleanPassword = () => {
    setValue("password", "");
    setValue("password", "");
  };

  const editPassword = async formData => {
    setOpenModalPassword(false);
    try {
      let queryInitials = {};
      queryInitials.password = formData?.password;
      queryInitials.email = userToEdit?.email;
      queryInitials.authorization = token;
      // console.log(queryInitials);

      let updatePassword = await api.post(`auth/changepassword`, queryInitials);
      if (updatePassword.status === 201) {
        handleGlobalAlert("success", "Contraseña actualizada correctamente!", "basic", dispatch, 6000);
        cleanPassword();
      }
    } catch (err) {
      handleGlobalAlert("error", "Error al actualizar contraseña!", "basic", dispatch, 6000);
      cleanPassword();
      console.log(err);
    }
  };

  const ShowAlert = ({ info }) => {
    return <span className="requiredAlert">{info}</span>;
  };

  const openDialogDeleteUser = item => {
    if (item.role.id == "62d94hH7xnfeqrfYLLDSKAtR") {
      //setOpenDeleteUser(true);
      setOpenDialogDeleteAllFromExecutiveAndMoveItsData(true);
      setIdUserDelete(item);
    } else {
      handleGlobalAlert("warning", `No es posible borrar el rol ${item.role.name}`, "basic", dispatch, 6000);
    }
  };
  if (isLoadingPage) return <LoaderPage />;
  return (
    <DirectorLayout>
      <UsuariosStyle>
        <Head>
          <title>CRM JOBS - Usuarios</title>
        </Head>
        {/* <SideBar /> */}
        <NavBarDashboard sideBar={true} />
        <div className="main_container">
          <div className="contenido">
            <Grid container className="headerUser">
              <Grid item md={6} sm={6} xs={12} className="headerUser__text">
                <PeopleAlt className="headerUser__text__icon" />
                <p className="headerUser__text__titleUsers">Usuarios</p>

                <p className="headerUser__text__totalUsers">
                  (
                  <NumberFormat value={totalUsers} displayType="text" thousandSeparator={true} />)
                </p>
              </Grid>
              <Grid item md={6} sm={6} xs={12} className="headerUser__button">
                <Button className="addUser" onClick={() => router.push("usuarios/nuevo")}>
                  <PersonAdd className="addUser__icon" />
                  Agregar
                </Button>
              </Grid>
            </Grid>
            <div className="filters">
              <Search onClick={() => search()} className="filterButton" />
              <input
                onChange={e => {
                  setSearchKey(e.target.value);
                  if (e.target.value == "") {
                    setbtClearSearch(false);
                  } else {
                    setbtClearSearch(true);
                  }
                }}
                placeholder="Buscar por nombre, por apellido ó correo electrónico..."
                className="inputText"
                value={keySearch}
                onKeyDown={e => {
                  if (e.key === "Enter" && e.target.value.length > 0) {
                    // search();

                    setSearchKey(e.target.value);
                    setRefetchUsers(!refetchUsers);
                  }
                }}
              />
              {btClearSearch == true && (
                <Clear
                  className="clear"
                  onClick={() => {
                    setSearchKey("");
                    setSearchUser("");
                    setRefetchUsers(!refetchUsers);
                    setbtClearSearch(false);
                  }}
                />
              )}
              <FilterList
                className="arrayOptions"
                onClick={() => {
                  setShowFilters(!showFilters);
                }}
              />
              <Drawer onClose={drawerClose} open={showFilters} anchor="right">
                <DraweFilters>
                  <div className="headFilters">
                    <p className="titleHead">Filtros </p>
                    <Close className="iconHead" onClick={() => setShowFilters(false)} />
                  </div>
                  <div className="contenido">
                    <FormControl variant="outlined" className="select">
                      <InputLabel className="headSelect">Elige un Grupo</InputLabel>
                      <Select value={selectGroup} onChange={handleGroup} label="Elige una Grupo" className="select">
                        <MenuItem value="">Ninguno</MenuItem>
                        {dataGroups?.map((item, index) => (
                          <MenuItem key={index} value={item.id}>
                            {toUpperCaseChart(item?.name)}
                          </MenuItem>
                        ))}
                        ;
                      </Select>
                    </FormControl>
                    <FormControl variant="outlined" className="select">
                      <InputLabel className="headSelect">Elige un Nivel</InputLabel>
                      <Select
                        value={selectLevel}
                        onChange={e => handleLevel(e.target.value)}
                        label="Elige un Nivel"
                        className="select"
                      >
                        <MenuItem value="">Ninguno</MenuItem>
                        {dataRoles?.map((item, index) => (
                          <MenuItem key={index} value={item.id}>
                            {toUpperCaseChart(item?.name)}
                          </MenuItem>
                        ))}
                        ;
                      </Select>
                    </FormControl>
                    <FormControl variant="outlined" className="select">
                      <InputLabel className="headSelect">Elige un Almacén</InputLabel>
                        <Select 
                          value={selectedStore} 
                          onChange={handleSelect} 
                          label="Elige un Almacén" 
                          className="select"
                        >
                          <MenuItem value="">Ninguno</MenuItem>
                          {warehouses?.map((item, index) => (
                            <MenuItem key={index} value={item.id}>
                              {toUpperCaseChart(item?.name)}
                            </MenuItem>
                          ))}
                          ;
                        </Select>
                    </FormControl>
                    <div className="buttonsFilter">
                      <Button className="buttonsFilter__clean" onClick={() => cleanFilters()}>
                        Limpiar
                      </Button>
                      <Button className="buttonsFilter__apply" onClick={() => search()}>
                        Aplicar
                      </Button>
                    </div>
                  </div>
                </DraweFilters>
              </Drawer>
            </div>
            <div className="table">
              {loaderTable ? (
                <>
                  <TableContainer className="table__TableUsers">
                    <Table>
                      <TableHead>
                        <TableRow className="rowHead">
                          <TableCell className="cellHead hold">Nombre</TableCell>
                          <TableCell className="cellHead center">Iniciales</TableCell>
                          <TableCell className="cellHead">Correo</TableCell>
                          <TableCell className="cellHead center">Titulo</TableCell>
                          <TableCell className="cellHead">Teléfono</TableCell>
                          <TableCell className="cellHead">Grupo</TableCell>
                          <TableCell className="cellHead">Nivel</TableCell>
                          <TableCell className="cellHead">Almacén</TableCell>
                          <TableCell className="cellHead center">Estatus</TableCell>
                          <TableCell className="cellHead center"></TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody></TableBody>
                    </Table>
                  </TableContainer>
                  <div className="table__loader">cargando.......</div>
                </>
              ) : (
                <>
                  <div className="chips_filter">
                    {chips.map((item, index) => {
                      if (item.id !== undefined) {
                        return (
                          <Chip
                            className="chips_filter__item"
                            key={index}
                            label={nameChips(item?.type) + ": " + item?.name}
                            onDelete={() => deleteChip(item)}
                          />
                        );
                      }
                    })}

                    {keySearch && (
                      <Chip
                        color="primary"
                        size="small"
                        onDelete={removeSearchKey}
                        label={keySearch}
                        className="chip"
                      />
                    )}
                  </div>
                  <TableContainer className="table__TableUsers">
                    <Table>
                      <TableHead>
                        <TableRow className="rowHead">
                          <TableCell className="cellHead hold">Nombre</TableCell>
                          <TableCell className="cellHead center">Iniciales</TableCell>
                          <TableCell className="cellHead">Correo</TableCell>
                          <TableCell className="cellHead center">Titulo</TableCell>
                          <TableCell className="cellHead">Teléfono</TableCell>
                          <TableCell className="cellHead">Grupo</TableCell>
                          <TableCell className="cellHead">Nivel</TableCell>
                          <TableCell className="cellHead">Almacén</TableCell>
                          <TableCell className="cellHead center">Estatus</TableCell>
                          <TableCell className="cellHead"></TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {dataUsers.map((item, index) => (
                          <TableRow key={index} className="rowBody">
                            <TableCell className="cell cellHold">
                              <p onClick={() => sendUserShow(item)}>
                                {item?.name} {item?.lastname}
                              </p>
                            </TableCell>
                            <TableCell className="cell centerAvatar">
                              {item?.username === null ? (
                                <Avatar className="avatarEmpty"></Avatar>
                              ) : (
                                <p className="initials">{item?.username}</p>
                              )}
                            </TableCell>
                            <TableCell className="cell">{item.email}</TableCell>
                            <TableCell className="cell">
                              {item.title === undefined ? "Sin Titulo" : toUpperCaseChart(item.title)}
                            </TableCell>
                            <TableCell className="cell">{item.phone}</TableCell>
                            <TableCell className="cell">{toUpperCaseChart(item.group?.name)}</TableCell>
                            <TableCell className="cell">{toUpperCaseChart(item.role?.name)}</TableCell>
                            <TableCell className="cell">
                            {item.warehouse?.name ? item.warehouse.name : "N/A"}
                              </TableCell>
                            <TableCell className="cell centerCell">
                              {item.isonline == true && (
                                <p className="cell__statusActive">
                                  <FiberManualRecord className="cell__statusActive__icon" /> Activo
                                </p>
                              )}
                            </TableCell>
                            <TableCell className="cellHorizontal ">
                              <IconButton onClick={() => openDialogDeleteUser(item)}>
                                <DeleteOutlineOutlined />
                              </IconButton>
                              <IconButton
                                onClick={() => {
                                  setUserToEdit(item);
                                  setOpenEditUser(true);
                                }}
                              >
                                <EditOutlined />
                              </IconButton>

                              <IconButton
                                onClick={() => {
                                  setUserToEdit(item);
                                  setOpenModalPassword(true);
                                }}
                              >
                                <LockOutlined />
                              </IconButton>
                            </TableCell>
                          </TableRow>
                        ))}
                        <Drawer onClose={drawerCloseUser} open={showUser} anchor="right">
                          <DrawerUser>
                            <div className="contenido">
                              <div className="header">
                                <AccountCircle className="header__iconUser" />
                                <div className="header__back"></div>
                                <div className="header__options">
                                  <p
                                    className={
                                      optionShowUser == 0 ? "header__options__active" : "header__options__btData"
                                    }
                                    onClick={() => setOptionShowUser(0)}
                                  >
                                    Datos
                                  </p>
                                  <p
                                    className={
                                      optionShowUser == 1 ? "header__options__active" : "header__options__btPermi"
                                    }
                                    onClick={() => setOptionShowUser(1)}
                                  >
                                    Permisos
                                  </p>
                                  <p
                                    className={
                                      optionShowUser == 2 ? "header__options__active" : "header__options__btPermi"
                                    }
                                    onClick={() => setOptionShowUser(2)}
                                  >
                                    Accesos
                                  </p>
                                </div>
                              </div>
                              {optionShowUser == 0 && (
                                <Grid container className="information">
                                  <Grid item xs={6} md={6} className="information_item">
                                    <p className="information_item__title">
                                      Nombre <PermIdentity className="information_item__title__icon" />
                                    </p>
                                    <p className="information_item__content">{user.name}</p>
                                  </Grid>
                                  <Grid item xs={6} md={6} className="information_item">
                                    <p className="information_item__title">
                                      Apellidos <PermIdentity className="information_item__title__icon" />
                                    </p>
                                    <p className="information_item__content">{user.lastname}</p>
                                  </Grid>
                                  <Grid item xs={12} md={12} className="information_item">
                                    <p className="information_item__title">
                                      Correo Electrónico <EmailOutlined className="information_item__title__icon" />{" "}
                                    </p>
                                    <p className="information_item__email">{user?.email}</p>
                                  </Grid>
                                  <Grid item xs={6} md={6} className="information_item">
                                    <p className="information_item__title">
                                      Teléfono
                                      <LocalPhone className="information_item__title__icon" />
                                    </p>
                                    <p className="information_item__content">{user?.phone}</p>
                                  </Grid>
                                  <Grid item xs={6} md={6} className="information_item">
                                    <p className="information_item__title">
                                      Teléfono Opcional <LocalPhone className="information_item__title__icon" />
                                    </p>
                                    <p className="information_item__content">
                                      {user?.optionalphone === "" ? "Sin Información" : user?.optionalphone}
                                    </p>
                                  </Grid>
                                  <Grid item xs={12} md={6} className="information_item">
                                    <p className="information_item__title">
                                      Iniciales <FontDownloadOutlined className="information_item__title__icon" />{" "}
                                    </p>
                                    <p className="information_item__email">
                                      {user?.username === null ? "Sin Iniciales" : user?.username}
                                    </p>
                                  </Grid>
                                  <Grid item xs={12} md={6} className="information_item">
                                    <p className="information_item__title">
                                      Titulo <School className="information_item__title__icon" />{" "}
                                    </p>
                                    <p className="information_item__email">
                                      {user?.title === null ? "Sin Titulo" : toUpperCaseChart(user?.title)}
                                    </p>
                                  </Grid>
                                  <Grid item xs={6} md={6} className="information_item">
                                    <p className="information_item__title">
                                      Grupo <GroupOutlined className="information_item__title__icon" />
                                    </p>
                                    <p className="information_item__content">{user?.group?.name}</p>
                                  </Grid>
                                  <Grid item xs={6} md={6} className="information_item">
                                    <p className="information_item__title">
                                      Rol <SettingsOutlined className="information_item__title__icon" />
                                    </p>
                                    <p className="information_item__content">{user?.role?.name}</p>
                                  </Grid>
                                  <Grid item xs={12} md={6} className="information_item">
                                    <p className="information_item__title">
                                      Usuario Creado el{" "}
                                      <EventAvailableOutlined className="information_item__title__icon" />
                                    </p>
                                    <p className="information_item__content">
                                      {dayjs(user?.createdAt).format("DD/MMMM/YYYY")}
                                    </p>
                                  </Grid>
                                </Grid>
                              )}
                              {optionShowUser == 1 && (
                                <Grid container className="permit">
                                  {userPermissions.map((item, index) => (
                                    <Grid key={index} item xs={6} md={6} className="permit_item">
                                      <p className="permit_item__title">{namePermission(item.permission?.name)}</p>
                                      <p className="permit_item__content">{item.types_permission?.name}</p>
                                    </Grid>
                                  ))}
                                </Grid>
                              )}
                              {optionShowUser == 2 && (
                                <Grid container className="acces">
                                  <Grid container className="acces__prospects">
                                    <Grid item xs={12} md={12} className="acces_item">
                                      <p className="acces_item__title">
                                        Acceso a Prospectos, Oportunidades y Clientes de Otros Usuarios
                                      </p>
                                      <p className="acces_item__title__sub">
                                        Usuarios <PermIdentity className="acces_item__title__sub__icon" />
                                      </p>
                                      <ul className="acces_item__content">
                                        <li>Usuario 1</li>
                                        <li>Usuario 2</li>
                                        <li>Usuario 3</li>
                                        <li>Usuario 4</li>
                                      </ul>
                                      <p className="acces_item__title__sub">
                                        Grupos
                                        <GroupOutlined className="acces_item__title__sub__icon" />
                                      </p>
                                      <ul className="acces_item__content">
                                        <li>Grupo 1</li>
                                        <li>Grupo 2</li>
                                        <li>Grupo 3</li>
                                        <li>Grupo 4</li>
                                      </ul>
                                    </Grid>
                                  </Grid>
                                  <Grid container className="acces__interaction">
                                    <Grid item xs={12} md={12} className="acces_item">
                                      <p className="acces_item__title">Interacción con Otros Usuarios de la Empresa </p>
                                      <p className="acces_item__title__sub">
                                        Usuarios <PermIdentity className="acces_item__title__sub__icon" />
                                      </p>
                                      <ul className="acces_item__content">
                                        <li>Usuario 1</li>
                                        <li>Usuario 2</li>
                                        <li>Usuario 3</li>
                                        <li>Usuario 4</li>
                                      </ul>
                                      <p className="acces_item__title__sub">
                                        Grupos <GroupOutlined className="acces_item__title__sub__icon" />
                                      </p>
                                      <ul className="acces_item__content">
                                        <li>Grupo 1</li>
                                        <li>Grupo 2</li>
                                        <li>Grupo 3</li>
                                        <li>Grupo 4</li>
                                      </ul>
                                    </Grid>
                                  </Grid>
                                </Grid>
                              )}
                            </div>
                          </DrawerUser>
                        </Drawer>
                      </TableBody>
                    </Table>
                  </TableContainer>
                  {totalUsers == 0 && <div className="table__empty">Sin resultados</div>}
                  <div className="table__pagination">
                    <p className="table__pagination__totalUsers">
                      Total de Usuarios:{" "}
                      <strong>
                        {" "}
                        <NumberFormat value={totalUsers} displayType="text" thousandSeparator={true} />
                      </strong>
                    </p>
                    <p>Filas por Página: </p>
                    <select value={limitUser} onChange={handleLimit} className="table__pagination__selectLimit">
                      <option value={10}>10</option>
                      <option value={20}>20</option>
                      <option value={30}>30</option>
                    </select>
                    <button
                      className="table__pagination__button"
                      onClick={() => setPage(page - 1)}
                      disabled={page <= 1 ? true : false}
                    >
                      <ArrowBackIos
                        className={
                          page <= 1 ? "table__pagination__button__left__disabled" : "table__pagination__button__left"
                        }
                      />
                    </button>
                    <p className="table__pagination__title">
                      <strong>
                        <NumberFormat value={page} displayType="text" thousandSeparator={true} />
                      </strong>{" "}
                      de{" "}
                      <strong>
                        {" "}
                        <NumberFormat value={totalPages} displayType="text" thousandSeparator={true} />
                      </strong>
                    </p>
                    <button
                      className="table__pagination__button"
                      onClick={() => setPage(page + 1)}
                      disabled={page >= totalPages ? true : false}
                    >
                      <ArrowForwardIos
                        className={
                          page >= totalPages
                            ? "table__pagination__button__right__disabled"
                            : "table__pagination__button__right"
                        }
                      />
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
          <Edit
            openEditUser={openEditUser}
            setOpen={setOpenEditUser}
            dataRoles={dataRoles}
            dataGroups={dataGroups}
            userToEdit={userToEdit}
            warehouses={warehouses}
            setUserToEdit={setUserToEdit}
            refetchUsers={refetchUsers}
            setRefetchUsers={setRefetchUsers}
            dataUsersAcces={dataUsersAcces}
            handleAlert={handleAlert}
          />

          <DialogDeleteUser
            openDeleteUser={openDeleteUser}
            handleDeleteUserClose={handleDeleteUserClose}
            idUserDelete={idUserDelete}
            setOpenDialogDeleteAllFromExecutive={setOpenDialogDeleteAllFromExecutive}
            setOpenDialogDeleteAllFromExecutiveAndMoveItsData={setOpenDialogDeleteAllFromExecutiveAndMoveItsData}
            idNewUser={idNewUser}
            setRefetchUsers={setRefetchUsers}
            refetchUsers={refetchUsers}
          />

          <DialogDeleteAllFromExecutive
            openDialogDeleteAllFromExecutive={openDialogDeleteAllFromExecutive}
            handleClose={() => setOpenDialogDeleteAllFromExecutive(false)}
          />

          <DialogDeleteAllFromExecutiveAndMoveItsData
            open={openDialogDeleteAllFromExecutiveAndMoveItsData}
            handleClose={() => setOpenDialogDeleteAllFromExecutiveAndMoveItsData(false)}
            dataUsersAcces={ejecutives}
            idUserDelete={idUserDelete}
            setRefetchUsers={setRefetchUsers}
            refetchUsers={refetchUsers}
            setOpenDeleteUser={setOpenDeleteUser}
            idNewUser={idNewUser}
            setIdNewUser={setIdNewUser}
          />

          <Dialog open={openModalPassword} keepMounted>
            <DialogContainer>
              <div className="headerDialog">
                <h4>Editar Contraseña</h4>
              </div>
              <form onSubmit={handleSubmit(editPassword)}>
                <Grid container className="ctr_tracking">
                  <Grid className="grid" md={12}>
                    <p>
                      {" "}
                      Usuario: {toUpperCaseChart(userToEdit.name)} {toUpperCaseChart(userToEdit.lastname)}{" "}
                    </p>
                  </Grid>

                  <Grid item xs={12} md={12} className="grid">
                    {flagPassword ? (
                      <>
                        <label>
                          Contraseña{" "}
                          <span>
                            {errors.password && errors.password.type === "required" && <ShowAlert info="Requerido" />}
                          </span>
                          <input {...register("password", { required: true })} type="text" />
                          <Visibility className="icon" onClick={() => setFlagPassword(false)} />
                        </label>
                      </>
                    ) : (
                      <>
                        <label>
                          Contraseña{" "}
                          <span>
                            {errors.password && errors.password.type === "required" && <ShowAlert info="Requerido" />}
                          </span>
                          <input {...register("password", { required: true })} type="password" />
                          <VisibilityOff className="icon" onClick={() => setFlagPassword(true)} />
                        </label>
                      </>
                    )}
                  </Grid>

                  <Grid item xs={12} md={12} className="Buttons">
                    <Button
                      onClick={() => {
                        setOpenModalPassword(false);
                        cleanPassword();
                      }}
                      className="btn_cancel"
                    >
                      Cancelar
                    </Button>
                    <Button type="submit" className="btn_done">
                      Guardar
                    </Button>
                  </Grid>
                </Grid>
              </form>
            </DialogContainer>
          </Dialog>

          {Alert?.show && (
            <AlertGlobal severity={Alert.severity} message={Alert.message} show={Alert.show} type={Alert.type} />
          )}
        </div>
      </UsuariosStyle>
    </DirectorLayout>
  );
}

const DialogContainer = styled.div`
  P {
    margin: 0;
  }
  display: flex;
  flex-direction: column;
  overflow: hidden;
  height: 35vh;
  width: 45vh;

  @media only screen and (max-width: 600px) {
    height: 40vh;
    width: 35vh;
  }

  .headerDialog {
    display: flex;
    flex-direction: row;
    padding: 10px;
    background: #eeeeee;
    font-size: 20px;
    color: #4527a0;
    letter-spacing: 0.05em;
    height: 15%;
    font-weight: bold;
    /* margin-block-end: 3px; */
    p {
      font-size: 20px;
      margin-top: 2%;
    }

    .icon {
      margin-left: 90%;
      font-size: 31px;
      margin-top: 2%;
      cursor: pointer;
    }
  }

  .ctr_tracking {
    display: flex;
    background: white;

    .grid {
      display: flex;
      flex-direction: row;
      padding: 5px;
      margin-top: 5px;

      .icon {
        color: #7e57c2;
        /* background-color: */
        border-radius: 40px;
        font-size: 35px;
        margin-left: 10px;
        /* padding-top:3px ; */
        /* margin: 0 auto; */
        /* margin-block-end: 15px; */
        /* object-fit: contain; */
        /* animation: slide 2s infinite; */
      }

      p {
        margin-left: 8%;
        font-weight: bold;
        opacity: 0.8;
        /* margin: 0 auto; */
      }

      label {
        margin: 0 auto;
        opacity: 0.7;
        font-weight: bold;
        font-size: 16px;
        margin-top: 20px;
      }

      input {
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans",
          "Helvetica Neue", sans-serif;
        width: 85%;
        padding: 10px 15px 15px 15px;
        border: 0.5px solid #e0e0e0;
        font-size: 16px;
        /* resize: none; */
        border-radius: 15px;
        /* margin-block-end: 2%; */
        /* background-color: #e8f0fe; */
      }
    }
    .Buttons {
      margin-top: 8%;
      margin-block-end: 8%;
      display: flex;
      flex-direction: row;

      .btn_done {
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans",
          "Helvetica Neue", sans-serif;
        background-color: #7e57c2;
        color: white;
        /* width: 80%; */
        letter-spacing: 0.1rem;
        padding: 10px;
        border-radius: 15px;
      }
      .delete {
        margin-right: 2px;
      }

      .btn_cancel {
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans",
          "Helvetica Neue", sans-serif;
        /* background-color: #e0e0e0; */
        color: black;
        /* width: 80%; */
        border: 2px solid #7e57c2;
        letter-spacing: 0.1rem;
        padding: 10px;
        border-radius: 15px;
        margin-top: 2%;
        margin-left: 40%;
        margin-right: 5%;
      }
    }
  }
`;
