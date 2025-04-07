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

const EspecealitiesTable = ({ totalEspecealities, setTotalEspecealities, searchKey, filterEspecealities, flag }) => {
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
  const totalPages = Math.ceil(totalEspecealities / limit);

  useEffect(() => {
    let mounted = true;
    if (mounted) {
      getData();
      setIsLoading(true);
      return () => (mounted = false);
    }
  }, [refetch, page, flag, limit]);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  function formatUpperCase(str) {
    return str[0]?.toUpperCase() + str.slice(1);
  }
  const handleChange = (event, value) => {
    setPage(value);
  };

  const getData = async () => {
    try {
      let query = {};

      query.name = { iRegexp: `${searchKey.toLocaleLowerCase()}` };

      let count = "count=1";
      let limite = `limit=${limit}`;
      let skip = `skip=${page}`;
      let order = "order=name";
      let queryString = `where=${JSON.stringify(query)}`;
      let specealities = await api.get(`specialties?${queryString}&${count}&${limite}&${skip}&${order}`);
      setTotalEspecealities(specealities.data.count);
      normalizeData(specealities.data.results);
    } catch (error) {
      handleAlert("error", "Especialidades - Error al cargar los datos!", "basic");
      setIsLoading(false);
    }
  };

  const normalizeData = data => {
    let dataNormalize = [];
    for (let i = 0; i < data?.length; i++) {
      const element = data[i];
      let itemNormalize = {};
      itemNormalize.id = element?.id;
      itemNormalize.name = formatUpperCase(element?.name);
      dataNormalize.push(itemNormalize);
    }
    setData(dataNormalize);
    setIsLoading(false);
  };

  const uploadData = origen => {
    setDataToUpdate(origen);
    setshowUpload(true);
    setValue("name", origen.name);
    setName(origen.name);
  };

  const handleUpdateData = formData => {
    let jsonUpdate = {};
    jsonUpdate.name = formData.name.toLocaleLowerCase();
    api.put(`specialties/${dataToUpdate.id}`, jsonUpdate).then(res => {
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

  const deleteData = origen => {
    setDataToDelete(origen);
    setShowDelete(true);
  };

  const handleDeleteData = () => {
    api.delete(`specialties/${dataToDelete.id}`).then(res => {
      setRefetch(!refetch);
      handleCloseDelete();
    });
  };

  const resetForm = () => {
    setValue("name", "");
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

  const deleteMany = items => {
    setDataToManyDelete(items);
    setShowDeleteMany(true);
  };

  const handleDeleteMany = () => {
    dataToManyDelete.forEach(item => {
      api.delete(`specialties/${item.id}`).then(res => {
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
            value={name}
            onChange={e => {
              setName(e.target.value);
              setValue("name", e.target.value);
            }}
            className={errors?.name?.type === "required" ? "ctr_inputs__input error" : "ctr_inputs__input"}
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
    <TableEspecealities>
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
            heads={["id", "Especialidades"]}
            data={data || [{ id: "Sin Datos", name: "Sin Datos" }]}
            identificador={"id"}
            custom={true}
            selectmultiple={true}
            primaryColor={"#405189"}
            secondaryColor={"#dce1f6"}
            deleteItem={items => deleteMany(items)}
            keyJson="especialidades"
            keyStorage="especialidades"
            actionsPerItem={[
              { title: "modificar", action: e => uploadData(e) },
              { title: "eliminar", action: e => deleteData(e) },
            ]}
            actionsItemsSelect={[
              {
                title: "Nada",
                action: () => console.log("enviooo"),
              },
            ]}
            actionItem={action => action(action)}
          />
        </>
      )}

      <div className="pagination">
        <p>Mostrar :</p>
        <select className="input" onChange={e => setLimit(e.target.value)}>
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
          <p className="title">Editar Especialidad</p>
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
          <p className="title">Eliminar Especialidad {dataToDelete?.name}</p>
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
          <p className="title">Eliminar Especialidades</p>
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
      {Alert?.show && (
        <AlertGlobal severity={Alert.severity} message={Alert.message} show={Alert.show} type={Alert.type} />
      )}
    </TableEspecealities>
  );
};

export default EspecealitiesTable;

const TableEspecealities = styled.div`
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
    margin-right: 1%;
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
