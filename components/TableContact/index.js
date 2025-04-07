import { Button, Grid, Modal, Chip, CircularProgress, TextField } from "@material-ui/core";
import React, { useState, useEffect } from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Slide from "@material-ui/core/Slide";
import {
  NavigateBefore,
  NavigateNext,
  TableChartOutlined,
  AccountBox,
  RecentActors,
  FilterList,
  Close,
  Cached,
  SearchOutlined,
  MailOutline,
  Phone,
  PhoneAndroid,
} from "@material-ui/icons";
import styled from "styled-components";
import TableCustom from "../TableCustom";
import { useForm } from "react-hook-form";
import { api } from "../../services/api";
import { useRouter } from "next/router";
import { DrawerContainer, TableQuoteStyled } from "../TableQuotes/tablequotes.styles";
import AlertGlobal from "../../components/Alerts/AlertGlobal";
import { Pagination } from "@material-ui/lab";

const RelatedContacts = ({ scrollTo }) => {
  const [data, setData] = useState([]);
  const [refetch, setRefetch] = useState(false);
  const router = useRouter();
  const [dataToDelete, setDataToDelete] = useState(null);
  const [dataToManyDelete, setDataToManyDelete] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [Alert, setAlert] = useState({ severity: null, show: null, message: "", type: null });

  const [showDeleteMany, setShowDeleteMany] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const handleCloseDelete = () => {
    setShowDelete(false);
    resetForm();
  };
  const handleCloseDeleteMany = () => {
    setShowDeleteMany(false);
    resetForm();
  };
  //paginacion
  const [totalContacts, setTotalContacts] = useState(0);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const totalPages = Math.ceil(totalContacts / limit);

  const [showAdd, setshowAdd] = useState(false);
  const handleCloseAdd = () => setshowAdd(false);
  const [showUpload, setshowUpload] = useState(false);
  const [dataUpload, setdataUpload] = useState({});
  const handleClose = () => setshowUpload(false);

  const [highlight, setHighlight] = useState(false);

  //filtros
  const [showFilters, setShowFilters] = useState(false);
  const [showChips, setShowChips] = useState(false);
  const [filterName, setFilterName] = useState("");
  const [filterEmail, setFilterEmail] = useState("");
  const [filterPhone, setFilterPhone] = useState("");
  const [filterOPhone, setFilterOPhone] = useState("");
  const [filterLastname, setFilterLastname] = useState("");
  const [searchKey, setSearchKey] = useState("");
  const [showChipsProducts, setShowChipsProducts] = useState(false);
  const [optionChecked, setOptionChecked] = useState("");
  const [isLoadingAdd, setIsLoadingAdd] = useState(false);
  const closeDrawerFilters = () => {
    setShowFilters(!showFilters);
    setShowChipsProducts(!showChipsProducts);
  };

  const handleCloseFilter = () => {
    setShowChips(true);
    setShowFilters(!showFilters);
    closeDrawerFilters();
  };

  const handleChange = (event, value) => {
    setPage(value);
  };

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    reset,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    let mounted = true;

    if (mounted) {
      setHighlight(scrollTo);
      getTraking();
      console.log(router.query.prospecto);
    }
    return () => (mounted = false);
  }, [router.query.prospecto, refetch, page]);

  const getTraking = async () => {
    try {
      let query = {
        prospectId: router.query.prospecto,
      };

      if (searchKey === null || searchKey === "" || searchKey === undefined) {
      } else {
        if (filterName === null || filterName === "" || filterName === undefined) {
          delete query.name;
        } else {
          query.name = { match: `${searchKey.toLocaleLowerCase()}` };
        }

        if (filterEmail === null || filterEmail === "" || filterEmail === undefined) {
          delete query.email;
        } else {
          query.email = { match: `${searchKey.toLocaleLowerCase()}` };
        }

        if (filterPhone === null || filterPhone === "" || filterPhone === undefined) {
          delete query.phone;
        } else {
          query.phone = { match: `${searchKey.toLocaleLowerCase()}` };
        }

        if (filterOPhone === null || filterOPhone === "" || filterOPhone === undefined) {
          delete query.optionalophone;
        } else {
          query.optionalophone = { match: `${searchKey.toLocaleLowerCase()}` };
        }

        if (filterLastname === null || filterLastname === "" || filterLastname === undefined) {
          delete query.lastname;
        } else {
          query.lastname = { match: `${searchKey.toLocaleLowerCase()}` };
        }
      }
      setIsLoading(true);
      let relatedcontacts = await api.get(
        `/relatedcontacts?where=${JSON.stringify(query)}&count=1&limit=${limit}&skip=${page}&order=-createdAt`
      );
      setData(relatedcontacts.data.results);
      setTotalContacts(relatedcontacts.data.count);
      console.log("RelatedContacts:", relatedcontacts.data.results);
      console.log("Total de contactos:", relatedcontacts.data.count);
      setTimeout(setHighlight(false), 4000);

      setIsLoading(false);
    } catch (error) {
      handleAlert("error", "Contactos Relacionados - Error al cargar los datos!", "basic");
      setTimeout(setHighlight(false), 4000);
    }
  };

  const handleAddContact = formData => {
    console.log(formData);
    setIsLoadingAdd(true);
    let element = {};
    element.prospectId = router.query.prospecto;
    element.name = formData.name;
    element.lastname = formData.lastname;
    element.relation = formData.relation;
    element.email = formData.email;
    element.phone = formData.phone;
    element.optionalophone = formData.optionalophone;
    element.observations = formData.observations;

    api
      .post(`relatedcontacts`, element)
      .then(res => {
        console.log(element);
        resetForm();
        setRefetch(!refetch);
        handleCloseAdd();
      })
      .catch(err => {
        console.log(err);
        console.log(element);
      })
      .finally(() => {
        setIsLoadingAdd(false);
      });
  };

  const uploadContact = contacto => {
    setshowUpload(true);
    setdataUpload(contacto);
    setValue("name", contacto.name);
    setValue("lastname", contacto.lastname);
    setValue("relation", contacto.relation);
    setValue("phone", contacto.phone);
    setValue("optionalophone", contacto.optionalophone);
    setValue("observations", contacto.observations);
    setValue("email", contacto.email);
  };

  const handleUploadContact = formData => {
    let newData = {};

    newData.name = formData.name.toLocaleLowerCase();
    newData.lastname = formData.lastname.toLocaleLowerCase();
    newData.relation = formData.relation.toLocaleLowerCase();
    newData.phone = formData.phone;
    newData.optionalophone = formData.optionalophone;
    newData.email = formData.email;
    newData.observations = formData.observations;
    console.log(newData);

    api.put(`relatedcontacts/${dataUpload.id}`, newData).then(res => {
      console.log(res);
      resetForm();
      setRefetch(!refetch);
      handleClose();
    });
  };

  const resetForm = () => {
    setValue("name", "");
    setValue("lastname", "");
    setValue("email", "");
    setValue("phone", "");
    setValue("optionalophone", "");
    setValue("relation", "");
    setValue("observations", "");
  };

  const deleteContact = contacto => {
    setDataToDelete(contacto);
    setShowDelete(true);
  };

  const deleteItem = () => {
    api.delete(`relatedcontacts/${dataToDelete.id}`).then(res => {
      setRefetch(!refetch);
      handleCloseDelete();
    });
  };

  const deleteMany = items => {
    setDataToManyDelete(items);
    setShowDeleteMany(true);
  };

  const handleDeleteMany = () => {
    dataToManyDelete.forEach(item => {
      api.delete(`relatedcontacts/${item.id}`);
    });
    setRefetch(!refetch);
    setShowDeleteMany(false);
  };

  const handleFilters = () => {
    if (page > 1) {
      setPage(1);
    }
    setShowChips(!showChips);
    setRefetch(!refetch);
    handleCloseFilter();
  };
  const cleanPagination = () => {
    setRefetch(!refetch);
    if (page > 1) {
      setPage(page - 1);
    }
  };
  const removeName = () => {
    setFilterName("");
    if (page > 1) {
      setPage(1);
    }
    setSearchKey("");
    cleanPagination();
    setRefetch(!refetch);
  };
  const removeEmail = () => {
    setFilterEmail("");
    if (page > 1) {
      setPage(1);
    }
    setSearchKey("");
    cleanPagination();
    setRefetch(!refetch);
  };

  const removePhone = () => {
    setFilterPhone("");
    if (page > 1) {
      setPage(1);
    }
    setSearchKey("");
    cleanPagination();
    setRefetch(!refetch);
  };
  const removeOpPhone = () => {
    setFilterOPhone("");
    if (page > 1) {
      setPage(1);
    }
    setSearchKey("");
    cleanPagination();
    setRefetch(!refetch);
  };

  const removeLast = () => {
    setFilterLastname("");
    if (page > 1) {
      setPage(1);
    }
    setSearchKey("");
    cleanPagination();
    setRefetch(!refetch);
  };

  const removeSearches = () => {
    setSearchKey("");
    cleanPagination();
  };

  const Chips = () => {
    if (showChipsProducts) {
      return (
        <div>
          {filterName !== "" && (
            <Chip
              color="primary"
              size="small"
              onDelete={removeName}
              label={`${"Buscando por Nombre:"}`}
              className="chip"
            />
          )}
          {filterEmail !== "" && (
            <Chip
              color="primary"
              size="small"
              onDelete={removeEmail}
              label={`${"Buscando por Correo:"}`}
              className="chip"
            />
          )}
          {filterPhone !== "" && (
            <Chip
              color="primary"
              size="small"
              onDelete={removePhone}
              label={`${"Buscando por Teléfono:"}`}
              className="chip"
            />
          )}
          {filterOPhone !== "" && (
            <Chip
              color="primary"
              size="small"
              onDelete={removeOpPhone}
              label={`${"Buscando por Movil:"}`}
              className="chip"
            />
          )}
          {filterLastname !== "" && (
            <Chip
              color="primary"
              size="small"
              onDelete={removeLast}
              label={`${"Buscando por Apellido:"}`}
              className="chip"
            />
          )}
          {searchKey && (
            <Chip color="primary" size="small" onDelete={removeSearches} label={` ${searchKey}`} className="chip" />
          )}
        </div>
      );
    }
  };

  const handleAlert = (severity, message, type) => {
    setAlert({ severity: severity, show: true, message: message, type: type });
    setTimeout(() => {
      setAlert({ severity: severity, show: false, message: message, type: null });
    }, 3000);
  };
  function Inputs() {
    return (
      <Grid spacing={1} container className="ctr_inputs">
        <Grid item xs={12} md={6}>
          <label className="ctr_inputs__label">Nombre *</label>
          <input
            {...register("name", { required: true })}
            id="name"
            name="name"
            onChange={e => {
              setValue("name", e.target.value);
            }}
            className={errors?.name?.type === "required" ? "ctr_inputs__input error" : "ctr_inputs__input"}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <label className="ctr_inputs__label">Apellido *</label>
          <input
            {...register("lastname", { required: true })}
            id="lastname"
            name="lastname"
            onChange={e => {
              setValue("lastname", e.target.value);
            }}
            className={errors?.lastname?.type === "required" ? "ctr_inputs__input error" : "ctr_inputs__input"}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <label className="ctr_inputs__label">Puesto/Relación *</label>
          <input
            {...register("relation", { required: true })}
            id="relation"
            name="relation"
            onChange={e => {
              setValue("relation", e.target.value);
            }}
            className={errors?.related?.type === "required" ? "ctr_inputs__input error" : "ctr_inputs__input"}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <label className="ctr_inputs__label">Correo</label>
          <input
            {...register("email", {
              required: false,
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              },
            })}
            id="email"
            name="email"
            onChange={e => {
              setValue("email", e.target.value);
            }}
            className={errors?.email?.type === "pattern" ? "ctr_inputs__input error" : "ctr_inputs__input"}
          />
          <div className="ctr_inputs__span_error">
            <p>{errors.email && errors.email.type == "pattern" && "Correo no valido"}</p>
          </div>
        </Grid>
        <Grid item xs={12} md={6}>
          <label className="ctr_inputs__label ContentTitleandAlert">
            Movil *{console.log("Errors", errors)}
            {errors.phone && (
              <>
                <div className="point"></div> <Error>{errors.phone?.message}</Error>
              </>
            )}
          </label>
          <input
            {...register("phone", {
              required: { value: true, message: "Requerido" },
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
            id="phone"
            type="number"
            name="phone"
            maxLength={10}
            onChange={e => {
              setValue("phone", e.target.value);
            }}
            className={errors?.phone?.type === "required" ? "ctr_inputs__input error" : "ctr_inputs__input"}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <label className="ctr_inputs__label">Teléfono</label>
          <input
            {...register("optionalophone", {
              required: false,
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
            type="number"
            id="optionalophone"
            maxLength={10}
            name="optionalophone"
            onChange={e => {
              setValue("optionalophone", e.target.value);
            }}
            className="ctr_inputs__input"
          />
        </Grid>
        <Grid item xs={12}>
          <label className="ctr_inputs__label">Comentarios</label>
          <input
            {...register("observations", { required: false })}
            id="observations"
            name="observations"
            onChange={e => {
              setValue("observations", e.target.value);
            }}
            className="ctr_inputs__input"
          />
        </Grid>
      </Grid>
    );
  }
  return (
    <TableContact highlight={highlight}>
      <div className="title_table">
        <div className="primary">
          <TableChartOutlined className="icon_primary" />
          <p>Contactos Relacionados ({totalContacts})</p>
          {isLoading ? (
            <CircularProgress size={20} className="load" />
          ) : (
            <Cached className="reload" onClick={() => setRefetch(!refetch)} />
          )}
        </div>

        <div className="ctr_filter">
          <div className="ctr_filter__ctr_input">
            <TextField
              variant="outlined"
              type="search"
              value={searchKey}
              onChange={e => {
                setSearchKey(e.target.value);

                if (e.target.value == "") {
                  setRefetch(!refetch);
                }
              }}
              label={searchKey !== "" && "Buscar grupo"}
              placeholder="Búsqueda"
              size="small"
              className="inputText"
              onKeyDown={e => {
                if (e.key === "Enter") {
                  setSearchKey(e.target.value);
                  setRefetch(!refetch);
                  setShowChipsProducts(true);
                }
              }}
            />
            <SearchOutlined className="search" />
            <FilterList
              className="filters"
              onClick={() => {
                setShowChipsProducts(false);
                setShowFilters(!showFilters);
              }}
            />
          </div>
        </div>

        <div className="chip" style={{ marginBlockEnd: "0.5%", marginTop: "0.5%" }}>
          {Chips()}{" "}
        </div>
      </div>

      <TableCustom
        heads={["id", "Nombre", "Apellidos", "correo", "Teléfono", "Movil", "puesto/Relación", "comentarios"]}
        data={data}
        identificador={"id"}
        custom={false}
        selectmultiple={true}
        deleteItem={items => deleteMany(items)}
        keyJson="contacto"
        actionsPerItem={[
          { title: "modificar", action: e => uploadContact(e) },

          { title: "eliminar", action: e => deleteContact(e) },
        ]}
        actionsItemsSelect={[
          {
            title: "enviar correo múltiple",
            action: () => console.log("enviooo"),
          },
        ]}
        actionItem={action => action(action)}
      />
      <div className="tfooter">
        <div className="tfooter__ctr_button">
          <Button
            variant="contained"
            color="primary"
            className="add_buton"
            disabled={isLoadingAdd}
            onClick={() => setshowAdd(true)}
          >
            Agregar Contacto
          </Button>
        </div>
        <div className="pagination">
          <Pagination disabled={isLoadingAdd} count={totalPages} page={page} onChange={handleChange} color="primary" />
        </div>
      </div>
      <Dialog
        open={showUpload}
        keepMounted
        data={data}
        onClose={handleClose}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogContainer>
          <p className="title">Editar Contacto</p>
          {Inputs()}
          <Grid container className="ctr_buttons">
            <Button variant="contained" color="secondary" className="btn_cancel" onClick={handleClose}>
              Cancelar
            </Button>
            <Button
              variant="contained"
              color="primary"
              className="btn_upload"
              onClick={handleSubmit(handleUploadContact)}
            >
              Guardar
            </Button>
          </Grid>
        </DialogContainer>
      </Dialog>
      <Dialog
        open={showAdd}
        keepMounted
        onClose={handleCloseAdd}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogContainer>
          <div className="loader">
            <p className="title">Agregar Contacto</p>
            {isLoadingAdd && <CircularProgress className="loaders" size={25} />}
          </div>
          {Inputs()}
          <Grid container className="ctr_buttons">
            <Button
              variant="contained"
              color="secondary"
              className={isLoadingAdd ? "btn_cancelDisabled" : "btn_cancel"}
              onClick={handleCloseAdd}
            >
              Cancelar
            </Button>
            <Button
              variant="contained"
              color="primary"
              className={isLoadingAdd ? "disabled" : "btn_upload"}
              onClick={handleSubmit(handleAddContact)}
            >
              Guardar
            </Button>
          </Grid>
        </DialogContainer>
      </Dialog>

      <Dialog
        open={showDelete}
        keepMounted
        onClose={handleCloseDelete}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogContainer>
          <p className="title">
            Eliminar Contacto {dataToDelete?.name} {dataToDelete?.lastname}
          </p>
          <Grid container className="ctr_buttons" style={{ justifyContent: "center" }}>
            <Button variant="contained" color="secondary" className="btn_cancel" onClick={handleCloseDelete}>
              Cancelar
            </Button>
            <Button variant="contained" color="primary" className="btn_upload" onClick={deleteItem}>
              Eliminar
            </Button>
          </Grid>
        </DialogContainer>
      </Dialog>

      <Dialog
        open={showDeleteMany}
        keepMounted
        onClose={handleCloseDelete}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogContainer>
          <p className="title">Eliminar Contactos</p>
          <Grid container className="ctr_buttons" style={{ justifyContent: "center" }}>
            <Grid item xs={12} md={12}>
              <div
                style={{
                  display: "flex",
                  flexFlow: "column",
                  justifyContent: "center",
                  alignItems: "center",
                  marginBottom: "15px",
                }}
              >
                {dataToManyDelete?.map(item => (
                  <b key={item.id}>
                    {item.name} {item.lastname}
                  </b>
                ))}
              </div>
            </Grid>
            <Button variant="contained" color="secondary" className="btn_cancel" onClick={handleCloseDeleteMany}>
              Cancelar
            </Button>
            <Button variant="contained" color="primary" className="btn_upload" onClick={handleDeleteMany}>
              Eliminar
            </Button>
          </Grid>
        </DialogContainer>
      </Dialog>

      <DrawerContainer anchor="right" open={showFilters} onClose={handleCloseFilter}>
        <div className="ctr_drawer">
          <div className="ctr_drawer__top">
            <p className="title">Filtra por tu preferencia</p>
            <Close className="close_icon" onClick={handleCloseFilter} />
          </div>

          <Grid container className="filtro" spacing={2}>
            <label className="label"> Buscar por </label>

            <select
              onChange={e => {
                if (e.target.value === "nombre") {
                  setFilterName(e.target.value);
                  console.log(e.target.value);
                }

                if (e.target.value === "apellido") {
                  setFilterLastname(e.target.value);
                  console.log(e.target.value);
                }

                if (e.target.value === "correo") {
                  setFilterEmail(e.target.value);
                  console.log(e.target.value);
                }

                if (e.target.value === "telefono") {
                  setFilterPhone(e.target.value);
                  console.log(e.target.value);
                }

                if (e.target.value === "movil") {
                  setFilterOPhone(e.target.value);
                  console.log(e.target.value);
                }
              }}
              className="selectFilter"
            >
              <option value="" hidden>
                {" "}
                Seleccione una opción
              </option>
              <option value="nombre">Nombre</option>
              <option value="apellido">Apellido</option>
              <option value="correo">Correo</option>
              <option value="telefono">Teléfono</option>
              <option value="movil">Móvil</option>
            </select>
          </Grid>
          <div className="ctr_drawer__ctr_buttons">
            <Button variant="contained" className="btn_cancel" onClick={handleCloseFilter}>
              Cancelar
            </Button>

            <Button variant="contained" className="btn_apply" onClick={() => handleFilters()}>
              Aplicar
            </Button>
          </div>
        </div>
        {Alert?.show && (
          <AlertGlobal severity={Alert.severity} message={Alert.message} show={Alert.show} type={Alert.type} />
        )}
      </DrawerContainer>
    </TableContact>
  );
};

export default RelatedContacts;

const TableContact = styled.div`
  transition: background-color 1s;
  transition: box-shadow 0.3s ease-in-out;
  transition: padding 1s ease-in-out;

  padding: ${props => (props.highlight ? "20px" : "0")};
  background-color: ${props => (props.highlight ? "white" : "none")};
  box-shadow: ${props =>
    props.highlight
      ? "rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px;"
      : "none"};

  p {
    margin: 0;
  }

  .title_table {
    display: flex;
    flex-direction: column;
    align-items: start;
    justify-content: space-between;
    margin-bottom: 10px;

    .primary {
      display: flex;
      align-items: start;
      justify-content: start;
      margin-block-end: 1%;
      .icon_primary {
        width: 30px;
        height: 30px;
        padding: 5px;
        margin-right: 5px;
        background: #dce1f6;
        color: #0c203b;
        border-radius: 50%;
      }
      p {
        font-size: 18px;
        letter-spacing: 0.04em;
        font-weight: 600;
        margin-right: 10px;
      }
      .load {
        color: #103c82;
      }
      .reload {
        color: #103c82;
        font-size: 18px;
        cursor: pointer;
      }
    }

    .ctr_filter {
      display: flex;
      flex-direction: column;
      align-items: center;
      width: 100%;

      justify-content: space-between;
      &__ctr_input {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 100%;
        position: relative;
        margin-bottom: 5px;
        .inputText {
          width: 90%;
          height: 40px;

          input {
            padding-left: 40px;
            padding-right: 40px;
          }
        }
        .MuiInputBase-root.MuiOutlinedInput-root.MuiInputBase-formControl.MuiInputBase-marginDense.MuiOutlinedInput-marginDense {
          border-radius: 10px;
        }
        .search {
          width: 30px;
          height: 30px;
          padding: 5px;
          color: #8a8a8a;
          transition: all 0.4s ease;
          position: absolute;
          left: 15px;
        }
        .filters {
          width: 30px;
          height: 30px;
          padding: 5px;
          color: #8a8a8a;
          transition: all 0.4s ease;
          position: absolute;
          right: 10px;
          &:hover {
            padding: 3px;
            cursor: pointer;
          }
        }
      }
    }

    .chip {
      margin-right: 5px;
      text-transform: capitalize;
    }
    .secondary {
      display: flex;
      align-items: center;
      color: #8a8a8a;
      font-size: 12px;
      svg {
        font-size: 18px;
        transition: all 0.3s ease;
      }
      &:hover {
        cursor: pointer;
        svg {
          font-size: 20px;
        }
      }
    }
  }
  .tfooter {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    &__ctr_button {
      margin-top: 10px;
      margin-bottom: 10px;
      .add_buton {
        text-transform: capitalize;
      }
    }
    &__ctr_pagination {
      display: flex;
      align-items: center;
      justify-content: space-around;
      &__pagination {
        display: flex;
        align-items: center;
        .before {
          display: flex;
          justify-content: center;
          align-items: center;
          width: 30px;
          height: 30px;
          background: #f3f3f3;
          border-radius: 8px;
          margin-right: 5px;
          margin-left: 10px;
          color: #0c203b;
          border: none;
          transition: all 0.2s ease;
          &:hover {
            cursor: pointer;
            background: #dce1f6;
          }
        }
        .next {
          display: flex;
          justify-content: center;
          align-items: center;
          width: 30px;
          height: 30px;
          background: #f3f3f3;
          border-radius: 8px;
          margin-left: 5px;
          color: #0c203b;
          border: none;
          transition: all 0.2s ease;
          &:hover {
            cursor: pointer;
            background: #dce1f6;
          }
        }
      }
    }
  }
  .MuiPaper-root.MuiDialog-paper.MuiDialog-paperScrollPaper.MuiDialog-paperWidthSm.MuiPaper-elevation24.MuiPaper-rounded {
    margin: 10px;
    width: 100%;
    max-width: 600px;
  }
`;

const DialogContainer = styled.div`
  P {
    margin: 0;
  }
  display: flex;
  flex-direction: column;
  overflow: hidden;
  .ContentTitleandAlert {
    font-size: 12px;
    font-weight: bold;
    color: rgb(79, 79, 79);
    display: flex;
    margin-bottom: 4px;
    padding-right: 4px;
  }
  .point {
    width: 0;
    height: 0;
    border-top: 7px solid transparent;
    border-bottom: 7px solid transparent;
    border-right: 16px solid rgba(241, 113, 113, 0.9);
    height: 18px;
    float: left;
  }
  .loader {
    display: flex;
    /* align-items: center; */
    justify-content: space-between;
    background: #0c203b;
    padding: 12px 18px;
    svg {
      color: #fff;
    }
  }
  .title {
    font-size: 18px;
    margin-bottom: 4px;
    font-weight: bold;
    background: #0c203b;
    /* padding: 10px 20px; */
    color: #fff;
    letter-spacing: 0.05em;
  }
  .ctr_inputs {
    padding: 13px 20px 20px 20px;

    &__label {
      font-size: 12px;
      font-weight: bold;
    }
    &__input {
      width: 100%;
      padding: 5px 0;
      border: none;
      border-bottom: 1.5px solid #ccc;
      transition: all 0.3s ease;
      font-size: 16px;
      &:focus {
        outline: none;
        border: none;
        transition: all 0.3s ease;

        border-bottom: 1.5px solid #0d0d0d;
      }
    }
    .error {
      border-bottom: 1.5px solid #f50f;
    }
    &__span_error {
      height: 16px;
      font-weight: bold;
      letter-spacing: 0.05em;
      font-size: 10px;
      color: #f50;
      margin-top: 5px;
    }
  }
  .ctr_buttons {
    display: flex;
    padding: 0 20px;
    padding-bottom: 20px;
    justify-content: flex-end;
    .btn_cancel {
      margin-right: 10px;
      text-transform: capitalize;
      background: #0d0d0d;
    }
    .btn_upload {
      text-transform: capitalize;
      background: #0c203b;
    }
    .disabled {
      text-transform: capitalize;
      color: #fff;
      background: #c7c7c7;
    }
    .btn_cancelDisabled {
      margin-right: 10px;
      text-transform: capitalize;
      color: #fff;
      background: #c7c7c7;
    }
  }
`;

export const Error = styled.div`
  display: flex;
  align-items: center;
  font-size: 12px;
  color: #fff;
  background-color: rgba(241, 113, 113, 0.9);
  border-top-right-radius: 0.2rem;
  border-bottom-right-radius: 0.2rem;
  height: 18px;
  ::before {
    display: inline;
  }
  svg {
    font-size: 18px;
  }
`;
