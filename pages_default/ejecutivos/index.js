import { SearchOutlined } from "@material-ui/icons";
import dayjs from "dayjs";
import Head from "next/head";
import React, { useEffect, useState } from "react";
import ModalExecutiveDetails from "../../components/ModalExecutiveDetails";
import CardsPageExecutives from "../../components/UI/organism/CardsPageExecutives";
import TablePageExecutives from "../../components/UI/organism/TablePageExecutives";
import useModal from "../../hooks/useModal";
import { Box, TextField } from "@mui/material";
import { api } from "../../services/api";
import { Button } from "@material-ui/core";
import { Controller, useForm } from "react-hook-form";
import TablePageExecutivesCommissions from "../../components/UI/organism/TablePageExecutivesCommissions";
import { useDispatch, useSelector } from "react-redux";
import { userSelector } from "../../redux/slices/userSlice";
import { handleGlobalAlert } from "../../utils";
import NumberFormat from "react-number-format";
import { ModalEdit } from "../../styles/PageExecutives/Modal.styles";
import { ExecutivesLayout } from "../../styles/PageExecutives/Layout.styles";
import MainLayout from "../../components/MainLayout";
import { Pagination } from "@material-ui/lab";

export default function Executives() {
  // Variables
  const dispatch = useDispatch();
  const { groupId, userData } = useSelector(userSelector);

  const { open, setOpen } = useModal();
  const { open: openExecutiveModal, setOpen: setOpenExecutiveModal } = useModal();

  const [executiveSelected, setExecutiveSelected] = useState(undefined);

  const [startDate, setStartDate] = useState(dayjs().startOf("month").format());
  const [finishDate, setFinishDate] = useState(dayjs().endOf("month").format());
  const [nameSearch, setNameSearch] = useState("");
  const [flag, setFlag] = useState(false);

  const [executives, setExecutives] = useState([]);
  const [executivesResults, setExecutivesResults] = useState([]);
  const [fetchingExecutives, setFetchingExecutives] = useState(true);

  const [openEditCommission, setOpenEditCommission] = useState(false);
  const [rowSelected, setRowSelected] = useState(undefined);
  const [isLoadingUpdate, setIsLoadingUpdate] = useState(false);

  const [openAddCommission, setOpenAddCommission] = useState(false);
  const [isAddingCommission, setIsAddingCommission] = useState(false);

  const [fetchingCommissions, setFetchingCommissions] = useState(true);
  const [commissionsResults, setCommissionsResults] = useState([]);

  const [commissionSelected, setCommissionSelected] = useState(undefined);
  const [refetchCommissions, setRefetchCommissions] = useState(false);

  const [showDeleteCommission, setShowDeleteCommission] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const [calculateCommission, setCalculateCommission] = useState(false);
  const [isValidCommission, setIsValidCommission] = useState(true);
  const [page, setPage] = useState(1);
  const [totalExecutives, setTotalExecutives] = useState(0);
  const totalPages = Math.ceil(totalExecutives / 10);

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors: errorsExecutives },
  } = useForm();

  const {
    control: controlNewCommission,
    register: registerNewCommission,
    handleSubmit: handleSubmitNewCommission,
    setValue: setValueNewCommision,
    reset: resetNewCommission,
    watch: watchNewCommission,
    formState: { errors: errorCommissions },
  } = useForm();

  // Effects

  useEffect(() => {
    const requestExecutives = async () => {
      setFetchingExecutives(true);
      try {
        let query = {
          roleId: "62d94hH7xnfeqrfYLLDSKAtR",
          oportunity: {
            soldat: {
              $gte: startDate,
              $lte: finishDate,
            },
          },
        };
        let params = {
          where: JSON.stringify(query),
          all: 1,
          order: "-createdAt",
          count: 1,
          skip: page,
        };
        let response = await api.get("dashboard/ejecutivesamount", { params });
        setExecutives(response.data.results);
        setTotalExecutives(response.data.count);
        setExecutivesResults(response.data.results);
      } catch (error) {
        console.log(error);
      }
      setFetchingExecutives(false);
    };

    requestExecutives();
  }, [page]);

  useEffect(() => {
    const requestCommissions = async () => {
      setFetchingCommissions(true);
      try {
        let query = {
          companyId: userData.companyId,
          groupId: groupId,
        };
        let params = {
          where: JSON.stringify(query),
          all: 1,
          order: "min",
        };
        let response = await api.get("commissions", { params });
        setCommissionsResults(response.data.results);
      } catch (error) {
        console.log(error);
      }
      setFetchingCommissions(false);
    };
    requestCommissions();
  }, [refetchCommissions]);

  useEffect(() => {
    const handleSearch = () => {
      if (nameSearch === "") {
        setExecutivesResults(executives);
        return;
      }
      var condition = new RegExp(nameSearch);

      var result = executives.filter(function (el) {
        return condition.test(el.fullname);
      });

      setExecutivesResults(result);
    };
    handleSearch();
  }, [nameSearch]);

  // Api calls
  const updateExecutive = async formData => {
    setIsLoadingUpdate(true);
    if (!isValidCommission || !rowSelected) {
      return;
    }
    try {
      setIsLoadingUpdate(true);
      let body = { newcomission: formData.newcomission };
      let NewGoal = await api.put(`ejecutives/${rowSelected.id}`, body);
      if (NewGoal.status == 200) {
        handleGlobalAlert("success", "Comisión - ¡Agregada correctamente!", "basic", dispatch, 6000);
        setTimeout(() => {
          handleClickEditProspect();
        }, 6000);
      }
    } catch (err) {
      handleGlobalAlert("error", "Comisión - Error, vuelva a intentar más tarde", "basic", dispatch, 6000);
      console.log(err);
    }
    setIsLoadingUpdate(false);
  };

  const addNewCommission = async formData => {
    setIsAddingCommission(true);
    formData.companyname = "";
    formData.companyId = userData.companyId;
    formData.groupId = groupId;

    if (typeof formData.min === "string") {
      formData.min = formData.min.replace(",", "");
    }
    if (typeof formData.max === "string") {
      formData.max = +formData.max.replace(",", "");
    }

    formData.min = +formData.min;
    formData.max = +formData.max;
    try {
      let newCommission;

      if (commissionSelected) {
        console.log("Here editing");
        newCommission = await api.put(`commissions/${commissionSelected.id}`, formData);
        if (newCommission.status == 200) {
          handleGlobalAlert("success", "Comisión - ¡Actualizada correctamente!", "basic", dispatch, 6000);
          setTimeout(() => {
            setOpenAddCommission(false);
            setRefetchCommissions(!refetchCommissions);
          }, 2000);
        }
      } else {
        newCommission = await api.post(`commissions`, formData);

        if (newCommission.status == 201) {
          handleGlobalAlert("success", "Comisión - ¡Agregada correctamente!", "basic", dispatch, 6000);
          setTimeout(() => {
            setOpenAddCommission(false);
            setRefetchCommissions(!refetchCommissions);
          }, 2000);
        }
      }

      setCommissionSelected(undefined);
    } catch (err) {
      console.log(err);
      handleGlobalAlert("error", "Comisión - Hubo un problema, intenta despues", "basic", dispatch, 6000);
      setOpenAddCommission(false);
    }
    resetNewCommission();
    setIsAddingCommission(false);
  };

  const deleteCommission = async () => {
    setIsDeleting(true);
    try {
      let newCommission;

      if (commissionSelected) {
        newCommission = await api.delete(`commissions/${commissionSelected.id}`);

        if (newCommission.status == 200) {
          handleGlobalAlert("success", "Comisión - ¡Borrado correctamente!", "basic", dispatch, 6000);
          setTimeout(() => {
            setShowDeleteCommission(false);
            setCommissionSelected(undefined);
            setRefetchCommissions(!refetchCommissions);
          }, 2000);
        }
      }

      setCommissionSelected(undefined);
    } catch (err) {
      console.log(err);
      handleGlobalAlert("error", "Comisión - Hubo un problema, intenta despues", "basic", dispatch, 6000);
    }
    handleCloseAddCommission();
    setShowDeleteCommission(false);
    setIsDeleting(false);
  };

  // Handlers
  const handleEditCommission = () => {
    setValueNewCommision("name", commissionSelected.name);
    setValueNewCommision("commission", commissionSelected.commission);
    setValueNewCommision("min", commissionSelected.min);
    setValueNewCommision("max", commissionSelected.max);
    setOpenAddCommission(true);
  };

  const handleClickEditProspect = item => {
    setCommissionSelected(item);
    setOpenEditCommission(true);
  };

  const handleCloseEditProspect = () => {
    setOpenEditCommission(false);
    setRowSelected(undefined);
    setCommissionSelected(undefined);
    setValue("newcomission", 0);
  };

  const addCommission = () => {
    setOpenAddCommission(true);
  };

  const handleCloseAddCommission = () => {
    setOpenAddCommission(false);
    setCommissionSelected(undefined);
    resetNewCommission();
    setValue("newcomission", 0);
    setIsValidCommission(true);
  };

  const handleDeleteCommission = () => {
    setShowDeleteCommission(true);
  };

  const handleCloseDeleteCommission = () => {
    setShowDeleteCommission(false);
    setCommissionSelected(undefined);
  };

  const handleCalculateCommission = e => {
    setCalculateCommission(e.target.checked);

    if (e.target.checked) {
      let result = getCommissionRange(commissionsResults, rowSelected.salesAmount);
      if (result === -1) {
        setIsValidCommission(false);
        handleGlobalAlert("error", "Comisión - No hay regla comission para monto vendido", "basic", dispatch, 6000);
      } else {
        handleGlobalAlert(
          "success",
          `Comisión - se agregó un ${result}% de comisión al monto ${rowSelected?.salesAmount}`,
          "basic",
          dispatch,
          6000
        );

        setValue("newcomission", (rowSelected.salesAmount * result) / 100);
      }
    }
  };

  const getCommissionRange = (arr, n) => {
    let maxRange = -1;
    for (let i = 0; i < arr.length; i++) {
      if (n >= arr[i].min && n <= arr[i].max) {
        if (maxRange === -1 || arr[i].max - arr[i].min > arr[maxRange].max - arr[maxRange].min) {
          maxRange = i;
        }
      }
    }
    return maxRange !== -1 ? arr[maxRange].commission : -1;
  };

  const handlePage = (_, value) => {
    setPage(value);
    setFlag(!flag);
  };

  const openCommission = comm => {
    setCommissionSelected(comm);
    setValueNewCommision("name", comm.name);
    setValueNewCommision("commission", comm.commission);
    setValueNewCommision("min", comm.min);
    setValueNewCommision("max", comm.max);
    setOpenAddCommission(true);
  };

  // Main
  return (
    <MainLayout>
      <ExecutivesLayout>
        <Head>Ejecutivos</Head>
        {/* <SideBar open={open} setOpen={setOpen} />
      <NavBarDashboard sideBar={true} /> */}

        <div className="main">
          <CardsPageExecutives startDate={startDate} finishDate={finishDate} />
          <Box p={2}>
            <p style={{ textAlign: "right" }}>
              Datos mostrados de la fecha{" "}
              <span style={{ fontWeight: "bold" }}>{dayjs(startDate).format("DD/MM/YYYY")}</span> a{" "}
              <span style={{ fontWeight: "bold" }}>{dayjs(finishDate).format("DD/MM/YYYY")}</span>
            </p>
          </Box>
          <div className="ctr_filter">
            <div className="ctr_filter__ctr_input">
              <TextField
                variant="outlined"
                type="search"
                value={nameSearch}
                onChange={e => setNameSearch(e.target.value)}
                label={nameSearch === "" ? "" : "Buscar prospecto"}
                placeholder="Ingresa Nombre o correo"
                size="small"
                className="inputText"
              />
              <SearchOutlined className="search" />
            </div>
          </div>

          {/* Tabla de ejecutivos */}
          <TablePageExecutives
            headers={headersTableExecutives}
            executives={executivesResults}
            isLoading={fetchingExecutives}
            setRowSelected={setRowSelected}
            setOpenEditCommission={setOpenEditCommission}
            handleClickEditProspect={handleClickEditProspect}
          />
          <div className="pag">
            <Pagination page={page} defaultPage={1} onChange={handlePage} count={totalPages} color="primary" />
          </div>

          {/* Tabla de reglas de comisiones */}
          <TablePageExecutivesCommissions
            headers={headersTableCommissions}
            commissions={commissionsResults}
            isLoading={fetchingCommissions}
            setCommissionSelected={setCommissionSelected}
            setOpenEditCommission={setOpenEditCommission}
            handleEditCommission={handleEditCommission}
            handleDeleteCommission={handleDeleteCommission}
            addCommission={addCommission}
            openCommission={openCommission}
          />

          {/* Modales */}
          {/* Modal editar comisiones ejecutivo*/}
          <ModalEdit
            open={openEditCommission}
            onClose={handleCloseEditProspect}
            aria-labelledby="simple-modal-title"
            aria-describedby="simple-modal-description"
            className="modal"
          >
            <form className="modal-body" onSubmit={handleSubmit(updateExecutive)}>
              <h2>Cambiar comisiones de: {rowSelected?.fullname}</h2>
              <div className="container-input">
                <label className="ctr_inputs__label">Comisión base:</label>
                <span className="symbol">%</span>
                <input disabled className="ctr_inputs__input input_symbol" value={rowSelected?.comission} />
              </div>

              <div className="container-input">
                {errorsExecutives?.newcomission && <span className="ctr_inputs__span">Comisión obligatoria</span>}

                <label className="ctr_inputs__label">
                  *Comisión de Ventas:{" "}
                  <div className="ctr_inputs__label_checkbox">
                    (
                    <input
                      type="checkbox"
                      className="checkbox"
                      value={calculateCommission}
                      onChange={e => handleCalculateCommission(e)}
                    />
                    Calculo automatico)
                  </div>
                </label>
                <span className="symbol">%</span>
                <input
                  {...register("newcomission", { required: true })}
                  className="ctr_inputs__input input_symbol"
                  placeholder="0"
                />
              </div>
              <div className="container-buttons">
                <Button
                  disabled={isLoadingUpdate}
                  variant="outlined"
                  color="primary"
                  className={`btnsalir ${isLoadingUpdate && "disabled"}`}
                  onClick={handleCloseEditProspect}
                >
                  Cancelar
                </Button>
                <Button
                  disabled={isLoadingUpdate}
                  variant="contained"
                  color="primary"
                  className={`btnGuardar ${isLoadingUpdate && "disabled"}`}
                  type="submit"
                >
                  Guardar
                </Button>
              </div>
            </form>
          </ModalEdit>

          {/* Modal editar reglas de comisiones*/}
          <ModalEdit
            open={openAddCommission}
            onClose={handleCloseAddCommission}
            aria-labelledby="simple-modal-title"
            aria-describedby="simple-modal-description"
            className="modal"
          >
            <form className="modal-body" onSubmit={handleSubmitNewCommission(addNewCommission)}>
              {commissionSelected?.name ? (
                <>
                  <h2>Cambiar regla de comisión de:</h2>
                  <h3>{commissionSelected.name}</h3>
                </>
              ) : (
                <h2>Agregar nueva regla de comisión</h2>
              )}

              <div className="container-input">
                <label className="ctr_inputs__label">Nombre:</label>
                <span className="ctr_inputs__span"> </span>
                {errorCommissions?.name && <span className="ctr_inputs__span">Nombre obligatorio</span>}
                <input
                  {...registerNewCommission("name", { required: true })}
                  className={`ctr_inputs__input ${errorCommissions?.name && "error"}`}
                  placeholder="Ej: Comisiones menores a $5,000"
                />
              </div>

              <div className="container-input">
                <label className="ctr_inputs__label">Porcentaje de comisión (0-100):</label>
                {errorCommissions?.commission?.type === "required" && (
                  <span className="ctr_inputs__span">Minímo obligatoria</span>
                )}
                {errorCommissions?.commission?.type === "min" && (
                  <span className="ctr_inputs__span">Valor mínimo 0%</span>
                )}
                {errorCommissions?.commission?.type === "max" && (
                  <span className="ctr_inputs__span">Valor máximo 100%</span>
                )}

                <div className={`textfield__input ${blur && "textfield__input--focused"}`}>
                  <div className="textfield__input-adornment">
                    <span className="textfield__adornment-text">%</span>
                  </div>
                  <input
                    placeholder="Ej: 3"
                    {...registerNewCommission("commission", { required: true, min: 0, max: 100 })}
                    className={`textfield__input-field ${errorCommissions?.commission && "error"}`}
                  />
                </div>
              </div>

              <div className="container-input">
                <label className="ctr_inputs__label">Rango mínimo de la comisión:</label>
                {errorCommissions?.min?.type === "required" && (
                  <span className="ctr_inputs__span">Máximo obligatorio</span>
                )}
                {errorCommissions?.min?.type === "min" && <span className="ctr_inputs__span">Valor mínimo $0.00</span>}

                <div className={`textfield__input ${blur && "textfield__input--focused"}`}>
                  <div className="textfield__input-adornment">
                    <span className="textfield__adornment-text">$</span>
                  </div>
                  <Controller
                    render={({ field: { onChange, name, value } }) => (
                      <NumberFormat
                        allowNegative={false}
                        placeholder="Ej: 0"
                        thousandSeparator={true}
                        value={value}
                        name={name}
                        onChange={onChange}
                        className={`textfield__input-field ${errorCommissions?.min && "error"}`}
                      />
                    )}
                    control={controlNewCommission}
                    name="min"
                    rules={{ required: true, min: 0 }}
                  />
                </div>
              </div>

              <div className="container-input">
                <label className="ctr_inputs__label">Rango máximo de la comisión:</label>
                {errorCommissions?.max?.type === "required" && (
                  <span className="ctr_inputs__span">Mínimo obligatorio</span>
                )}
                {errorCommissions?.max?.type === "min" && <span className="ctr_inputs__span">Valor mínimo $0.00</span>}

                <div className={`textfield__input ${blur && "textfield__input--focused"}`}>
                  <div className="textfield__input-adornment">
                    <span className="textfield__adornment-text">$</span>
                  </div>
                  <Controller
                    render={({ field: { onChange, name, value } }) => (
                      <NumberFormat
                        allowNegative={false}
                        placeholder="Ej: 5,000,000"
                        thousandSeparator={true}
                        name={name}
                        value={value}
                        onChange={onChange}
                        className={`textfield__input-field ${errorCommissions?.max && "error"}`}
                      />
                    )}
                    control={controlNewCommission}
                    name="max"
                    rules={{ required: true, min: 0 }}
                  />
                </div>
              </div>

              <div className="container-buttons">
                <Button
                  disabled={isAddingCommission}
                  variant="outlined"
                  color="primary"
                  className={`btnsalir ${isAddingCommission && "disabled"}`}
                  onClick={handleCloseAddCommission}
                >
                  Cancelar
                </Button>
                <Button
                  disabled={isAddingCommission}
                  variant="contained"
                  color="primary"
                  className={`btnGuardar ${isAddingCommission && "disabled"}`}
                  type="submit"
                >
                  Guardar
                </Button>
              </div>
            </form>
          </ModalEdit>

          {/* Modal borrar reglas de comisiones */}
          <ModalEdit
            open={showDeleteCommission}
            onClose={handleCloseDeleteCommission}
            aria-labelledby="simple-modal-title"
            aria-describedby="simple-modal-description"
            className="modal"
          >
            <div className="modal-body">
              <>
                <h2>¿Seguro que desea borrar ?</h2>
                <h3>
                  <i>{commissionSelected?.name}</i>
                </h3>
              </>

              <div className="container-buttons">
                <Button
                  disabled={isDeleting}
                  variant="outlined"
                  color="primary"
                  className={`btnsalir ${isDeleting && "disabled"}`}
                  onClick={handleCloseDeleteCommission}
                >
                  Conservar regla
                </Button>
                <Button
                  disabled={isDeleting}
                  variant="contained"
                  color="primary"
                  className={`btnDelete ${isDeleting && "disabled"}`}
                  onClick={deleteCommission}
                >
                  Borrar regla
                </Button>
              </div>
            </div>
          </ModalEdit>
        </div>

        <ModalExecutiveDetails
          startDate={startDate}
          finishDate={finishDate}
          executive={executiveSelected}
          open={openExecutiveModal}
          setOpen={setOpenExecutiveModal}
        />
      </ExecutivesLayout>
    </MainLayout>
  );
}

const headersTableExecutives = ["Nombre", "Monto vendido", "Monto de comisión", "Comisión base"];
const headersTableCommissions = ["Nombre", "Comisión", "Rango mínimo", "Rango máximo"];
