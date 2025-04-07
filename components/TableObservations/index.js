//components/TableObservations

import { Button, Grid, CircularProgress, LinearProgress } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import Dialog from "@material-ui/core/Dialog";
import router from "next/router";
import { NavigateBefore, NavigateNext, TableChartOutlined, Group, Cached } from "@material-ui/icons";
import styled from "styled-components";
import TableCustom from "../TableCustom";
import { useForm } from "react-hook-form";
import { api } from "../../services/api";
import { useSelector } from "react-redux";
import { companySelector } from "../../redux/slices/companySlice";
import { ifError } from "assert";
import AlertGlobal from "../Alerts/AlertGlobal";
import { Pagination } from "@material-ui/lab";
import { userSelector } from "../../redux/slices/userSlice";

const ObservationsTable = ({ totalOrigins, setTotalOrigins, searchKey, filterOrigin, flag }) => {
  const { id_user } = useSelector(userSelector);
  const [showUpload, setshowUpload] = useState(false);
  const [name, setName] = useState("");
  const [data, setData] = useState(null);
  const [dataToUpdate, setDataToUpdate] = useState(null);
  const [dataToDelete, setDataToDelete] = useState(null);
  const [dataToManyDelete, setDataToManyDelete] = useState(null);
  const [refetch, setRefetch] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [showDeleteMany, setShowDeleteMany] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [Alert, setAlert] = useState({ severity: null, show: null, message: "", type: null });
  //paginacion
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const totalPages = Math.ceil(totalOrigins / limit);
  const [primaryColor, setPrimaryColor] = useState("");
  const [ejecutivesBd, SetEjecutivesBd] = useState([]);
  const [ejecutive, setEjecutive] = useState({});

  const handleChange = (event, value) => {
    setPage(value);
  };

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  function formatUpperCase(str) {
    return str[0]?.toUpperCase() + str.slice(1);
  }

  useEffect(() => {
    let mounted = true;
    if (mounted) {
      getData();
      getEjecutives();
      setIsLoading(true);
      return () => (mounted = false);
    }
  }, [refetch, page, flag, limit]);

  const getEjecutives = async () => {
    try {
      let ejecutive = await api.get(`ejecutives?limit=200`);
      SetEjecutivesBd(ejecutive.data.results);
      console.log(ejecutive.data.results);
    } catch (err) {
      handleAlert("error", " ¡Error al cargar observaciones refresca la página!", "basic");
    }
  };

  const getData = async () => {
    try {
      let query = {};

      query.ejecutiveId = id_user;
      query.name = { iRegexp: `${searchKey.toLocaleLowerCase()}` };

      let count = "count=1";
      let limite = `limit=${limit}`;
      let skip = `skip=${page}`;
      let order = "order=name";
      let origin = await api.get(`observations?where=${JSON.stringify(query)}&${count}&${limite}&${skip}&${order}&include=ejecutive`);
      setTotalOrigins(origin.data.count);
      normalizeData(origin.data.results);
    } catch (error) {
      setIsLoading(false);
      handleAlert("error", "Observaciones - Error al cargar los datos!", "basic");
    }
  };

  const normalizeData = (data) => {
    let dataNormalize = [];
    for (let i = 0; i < data?.length; i++) {
      const element = data[i];
      let itemNormalize = {};
      itemNormalize.id = element?.id;
      itemNormalize.name = element?.name;
      itemNormalize.ejecutiveId = `${element?.ejecutive?.name} ${element?.ejecutive?.lastname}`;
      itemNormalize.data = element?.data;
      itemNormalize.color = element?.color;
      dataNormalize.push(itemNormalize);
    }
    setData(dataNormalize);
    setIsLoading(false);
  };

  const uploadData = (observa) => {
    setDataToUpdate(observa);
    setshowUpload(true);

    setValue("ejecutive", observa?.ejecutiveId);
    setValue("data", observa.data);
    setValue("name", observa.name);
    observa.color === "" ? setPrimaryColor("#0c203b") : setPrimaryColor(observa.color);
    console.log(observa?.ejecutiveId);
    console.log(observa);
    // setName(observa.ejecutive?.name);
  };

  const printColor = (value) => {
    setPrimaryColor(value);
  };

  const handleUpdateData = (formData) => {
    let jsonUpdate = {};
    jsonUpdate.data = formData.data.toLocaleLowerCase();
    jsonUpdate.name = formData.name.toLocaleLowerCase();
    jsonUpdate.color = primaryColor;
    console.log(jsonUpdate);
    api.put(`observations/${dataToUpdate.id}`, jsonUpdate).then((res) => {
      console.log(res);
      setRefetch(!refetch);
      resetForm();
      handleClose();
    });
  };

  const handleClose = () => {
    setshowUpload(false);
    resetForm();
  };

  const deleteData = (observa) => {
    setDataToDelete(observa);
    setShowDelete(true);
  };

  const handleDeleteData = () => {
    api.delete(`observations/${dataToDelete.id}`).then((res) => {
      setRefetch(!refetch);
      handleCloseDelete();
    });
  };

  const resetForm = () => {
    setValue("ejecutive", "");
    setValue("data", "");
    setValue("name", "");
    setValue("color", "");
    setName("");
  };

  const handleCloseDelete = () => {
    setShowDelete(false);
    resetForm();
  };
  const handleCloseDeleteMany = () => {
    setShowDeleteMany(false);
    resetForm();
  };

  const deleteMany = (items) => {
    setDataToManyDelete(items);
    setShowDeleteMany(true);
  };

  const handleDeleteMany = () => {
    dataToManyDelete.forEach((item) => {
      api.delete(`observations/${item.id}`).then((res) => {
        setShowDeleteMany(false);

        setRefetch(!refetch);
      });
    });
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
            // value={name}
            onChange={(e) => {
              setName(e.target.value);
              setValue("name", e.target.value);
            }}
            className={errors?.name?.type === "required" ? "ctr_inputs__input error" : "ctr_inputs__input"}
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <label className="ctr_inputs__label">Ejecutivo </label>
          <input
            {...register("ejecutive", { required: false })}
            id="ejecutive"
            name="ejecutive"
            disabled
            // value={name}
            onChange={(e) => {
              setName(e.target.value);
              setValue("ejecutive", e.target.value);
            }}
            className={errors?.ejecutive?.type === "required" ? "ctr_inputs__input error" : "ctr_inputs__input"}
          />
        </Grid>
        <Grid item xs={12} md={4} className="colorsContainer">
          <p className="obsv">Color Primario</p>
          <input
            id="color"
            name="color"
            type="color"
            value={primaryColor}
            onChange={(e) => {
              printColor(e.target.value, "primary");
              setValue("color", e.target.value);
            }}
            className="color"
          />
        </Grid>

        <Grid item md={12}>
          <p className="obsv">Observación</p>
          <textarea
            className="textarea"
            {...register("data", {
              required: "*Requerido",
            })}
            onChange={(e) => {
              // setName(e.target.value);
              setValue("data", e.target.value);
            }}
          />
        </Grid>
      </Grid>
    );
  }

  const handleAlert = (severity, message, type) => {
    setAlert({ severity: severity, show: true, message: message, type: type });
    setTimeout(() => {
      setAlert({ severity: severity, show: false, message: message, type: null });
    }, 3000);
  };

  return (
    <TableOrigins>
      {isLoading ? (
        <div className="ctr_load">
          <div className="ctr_load__img">
            <img src="/load.png" />
          </div>
          <div className="ctr_load__load">
            <p>Cargando</p>
            <LinearProgress color="primary" />
          </div>
        </div>
      ) : (
        <>
          <TableCustom
            heads={["id", "Nombre", "Ejecutivo", "Observaciones", "color"]}
            data={data || [{ id: "Sin Datos", name: "Sin Datos" }]}
            identificador={"id"}
            custom={true}
            selectmultiple={true}
            primaryColor={"#405189"}
            secondaryColor={"#dce1f6"}
            deleteItem={(items) => deleteMany(items)}
            keyJson="origenes"
            actionsPerItem={[
              { title: "modificar", action: (e) => uploadData(e) },
              { title: "eliminar", action: (e) => deleteData(e) },
            ]}
            actionsItemsSelect={[
              {
                title: "Nada",
                action: () => console.log("enviooo"),
              },
            ]}
            actionItem={(action) => action(action)}
          />
        </>
      )}

      <div className="pagination">
        <p>Mostrar</p>
        <select className="input" onChange={(e) => setLimit(e.target.value)}>
          <option value={"10"}> 10</option>
          <option value={"20"}> 20</option>
          <option value={"50"}> 50</option>
          <option value={"100"}> 100</option>
        </select>
        <Pagination count={totalPages} page={page} onChange={handleChange} color="primary" />
      </div>

      <Dialog
        open={showUpload}
        keepMounted
        onClose={handleClose}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogContainer>
          <p className="title">Editar Observación</p>
          {Inputs()}
          <Grid container className="ctr_buttons">
            <Button variant="contained" color="secondary" className="btn_cancel" onClick={handleClose}>
              Cancelar
            </Button>
            <Button variant="contained" color="primary" className="btn_upload" onClick={handleSubmit(handleUpdateData)}>
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
          <p className="title">Eliminar Observación : {dataToDelete?.name} </p>
          <Grid container className="ctr_buttons" style={{ justifyContent: "center" }}>
            <Button variant="contained" color="secondary" className="btn_cancel" onClick={handleCloseDelete}>
              Cancelar
            </Button>
            <Button variant="contained" color="primary" className="btn_upload" onClick={handleDeleteData}>
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
          <p className="title">Eliminar Observaciones : </p>
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
                {dataToManyDelete?.map((item) => (
                  <p key={item.id}>{item.name}</p>
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
      {Alert?.show && <AlertGlobal severity={Alert.severity} message={Alert.message} show={Alert.show} type={Alert.type} />}
    </TableOrigins>
  );
};

export default ObservationsTable;

const TableOrigins = styled.div`
  .ctr_load {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    /* height: 400px; */
    &__img {
      width: 150px;
      animation: slide 3s infinite;
      img {
        width: 100%;
        object-fit: contain;
      }
    }
    &__load {
      display: flex;
      flex-direction: column;
      justify-content: center;
      line-height: 30px;
      width: 200px;
      p {
        text-align: center;
        font-weight: bold;
      }
    }
    @keyframes slide {
      0% {
        transform: translateY(0px);
      }
      50% {
        transform: translateY(10px);
      }
      100% {
        transform: translateY(0px);
      }
    }
  }

  p {
    margin: 0;
  }
  .title_table {
    display: flex;
    align-items: center;
    margin-bottom: 10px;
    margin-top: 30px;
    svg {
      width: 30px;
      height: 30px;
      padding: 5px;
      margin-right: 5px;
      background: #ffffff;
      color: #1a7ee0;
      border-radius: 50%;
    }
    p {
      font-size: 18px;
      letter-spacing: 0.04em;
      font-weight: 600;
    }
  }

  .pagination {
    width: 100%;
    margin-top: 15px;
    display: flex;
    align-items: right;
    justify-content: right;
  }

  .input {
    background-clip: padding-box;
    background-color: #fff;
    border: 1px solid #ced4da;
    border-radius: 0.25rem;
    color: #495057;
    display: block;
    font-size: 0.8125rem;
    font-weight: 400;
    line-height: 1.5;
    padding: 0.27rem;
    transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
    width: 4%;
    min-height: 18px;
  }

  p {
    font-weight: bold;
    margin-top: 0.4%;
    margin-right: 1%;
    font-size: 13px;
  }

  .tfooter {
    width: 100%;
    margin-top: 15px;
    display: flex;
    align-items: center;
    justify-content: right;
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

  .title {
    font-size: 18px;
    margin-bottom: 15px;
    font-weight: bold;
    background: #0c203b;
    padding: 10px 20px;
    color: #fff;
    letter-spacing: 0.05em;
  }
  .ctr_inputs {
    padding: 0 20px 40px 50px;

    .obsv {
      font-size: 12px;
      font-weight: bold;
      margin-top: 2%;
    }

    .color {
      margin-top: 5px;
      background-clip: padding-box;
      background-color: #fff;
      border: 1px solid #ced4da;
      border-radius: 0.25rem;
      color: #495057;
      display: block;
      font-size: 0.8125rem;
      font-weight: 400;
      line-height: 1.5;
      padding: 0.47rem 0.75rem;
      transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
      width: 50%;
      min-height: 48px;
      resize: none;
      margin-top: 3%;
    }
    .textarea {
      background-clip: padding-box;
      background-color: #fff;
      border: 1px solid #ced4da;
      border-radius: 0.25rem;
      color: #495057;
      display: block;
      font-size: 0.8125rem;
      font-weight: 400;
      line-height: 1.5;
      padding: 0.47rem 0.75rem;
      transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
      width: 100%;
      min-height: 98px;
      resize: none;
      margin-top: 3%;
    }

    &__label {
      font-size: 12px;
      font-weight: bold;
    }
    &__input {
      width: 250px;
      /* padding: 5px 0; */
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
  }
`;
