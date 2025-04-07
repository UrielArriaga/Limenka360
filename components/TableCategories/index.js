import { Button, Grid, CircularProgress, LinearProgress } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import Dialog from "@material-ui/core/Dialog";
import styled from "styled-components";
import TableCustom from "../TableCustom";
import { useForm } from "react-hook-form";
import { api } from "../../services/api";
import { useSelector } from "react-redux";
import { companySelector } from "../../redux/slices/companySlice";
import AlertGlobal from "../Alerts/AlertGlobal";
import { Pagination } from "@material-ui/lab";

const CategoriesTable = ({
  totalCategories,
  setTotalCategories,
  setSearchKey,
  searchKey,
  flag,
  setShowChipsProducts,
  localstorage,
}) => {
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
  const [all, setAll] = useState(false);
  const [Alert, setAlert] = useState({ severity: null, show: null, message: "", type: null });
  //paginacion
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const totalPages = Math.ceil(totalCategories / limit);
  const [readyLocalStorage, setReadyLocalStorage] = useState(false);
  const handleChange = (event, value) => {
    setPage(value);
  };

  const handleCloseDelete = () => {
    setShowDelete(false);
    resetForm();
  };
  const handleCloseDeleteMany = () => {
    setShowDeleteMany(false);
    resetForm();
  };
  const handleClose = () => {
    setshowUpload(false);
    resetForm();
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
      setIsLoading(true);
      return () => (mounted = false);
    }
  }, [refetch, page, flag, limit, all, readyLocalStorage]);

  useEffect(() => {
    getLocalStorage();
  }, []);

  const getLocalStorage = () => {
    let searchkeyword = localStorage.getItem(localstorage);

    if (searchkeyword) {
      setSearchKey(searchkeyword);
    }
    setShowChipsProducts(true);
    setReadyLocalStorage(true);
  };

  const saveDataLocalStorage = (value, type, key) => {
    switch (type) {
      case "keyword":
        localStorage.setItem(key, value);
        break;
    }
  };
  const hasValue = value => (value === "" || value === undefined || value == null ? false : true);

  const getData = async () => {
    if (readyLocalStorage === false) return;
    try {
      let query = {};
      if (hasValue(searchKey)) {
        query.name = { iRegexp: `${searchKey.toLocaleLowerCase()}` };
        saveDataLocalStorage(searchKey, "keyword", localstorage);
      }
      let count = "count=1";
      let limite = `limit=${limit}`;
      let al = `all=1`;
      let skip = `skip=${page}`;
      let order = "order=name";
      let queryString = `where=${JSON.stringify(query)}`;

      if (all === true) {
        let categorie = await api.get(`categories?${queryString}&${count}&${al}&${skip}&${order}`);
        setTotalCategories(categorie.data.count);
        normalizeData(categorie.data.results);
      } else {
        let categorie = await api.get(`categories?${queryString}&${count}&${limite}&${skip}&${order}`);
        setTotalCategories(categorie.data.count);
        normalizeData(categorie.data.results);
      }
    } catch (error) {
      setIsLoading(false);
      handleAlert("error", "Categorías - Error al cargar los datos!", "basic");
    }
  };

  const handleAlert = (severity, message, type) => {
    setAlert({ severity: severity, show: true, message: message, type: type });
    setTimeout(() => {
      setAlert({ severity: severity, show: false, message: message, type: null });
    }, 3000);
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

  const handleNextPage = () => {
    if (page < totalPages) {
      setPage(page + 1);
    }
  };

  const handlePreviousPage = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  const uploadGroup = categoria => {
    setDataToUpdate(categoria);
    setshowUpload(true);
    setValue("name", categoria.name);
    setName(categoria.name);
  };

  const deleteGroup = categoria => {
    setDataToDelete(categoria);
    setShowDelete(true);
  };

  const handleDeleteGroup = () => {
    api.delete(`categories/${dataToDelete.id}`).then(res => {
      setRefetch(!refetch);
      handleCloseDelete();
    });
  };

  const handleUpdateGroup = formData => {
    let jsonUpdate = {};
    jsonUpdate.name = formData.name.toLocaleLowerCase();
    api.put(`categories/${dataToUpdate.id}`, jsonUpdate).then(res => {
      console.log(res);
      setRefetch(!refetch);
      resetForm();
      handleClose();
    });
  };
  const resetForm = () => {
    setValue("name", "");
    setName("");
  };

  const deleteMany = items => {
    console.log("hola mundo");
    setDataToManyDelete(items);
    setShowDeleteMany(true);
  };

  const handleDeleteMany = () => {
    console.log("eliminando");
    dataToManyDelete.forEach(item => {
      api.delete(`categories/${item.id}`);
    });
    setRefetch(!refetch);
    setShowDeleteMany(false);
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
  return (
    <TableCategories>
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
          {" "}
          <TableCustom
            heads={["id", "Categoría"]}
            data={data || [{ id: "Sin Datos", name: "Sin Datos" }]}
            identificador={"id"}
            custom={true}
            selectmultiple={true}
            primaryColor={"#405189"}
            secondaryColor={"#dce1f6"}
            deleteItem={items => deleteMany(items)}
            keyStorage="categoria"
            actionsPerItem={[
              { title: "modificar", action: e => uploadGroup(e) },
              { title: "eliminar", action: e => deleteGroup(e) },
            ]}
            actionsItemsSelect={[]}
            actionItem={action => action(action)}
          />{" "}
        </>
      )}

      <Grid container className="container">
        <Grid item md={12} className="pagination">
          <p>Mostrar :</p>
          <select
            className="input"
            onChange={e => {
              if (e.target.value == "todos") {
                setAll(true);
              } else {
                setLimit(e.target.value);
                setAll(false);
              }
            }}
          >
            <option value={"10"}> 10</option>
            <option value={"25"}> 25</option>
            <option value={"50"}> 50</option>
            <option value={"100"}> 100</option>
            <option value={"150"}> 150</option>
            <option value={"todos"}> Todos</option>
          </select>
          {all == true ? (
            ""
          ) : (
            <>
              <Pagination count={totalPages} page={page} onChange={handleChange} color="primary" />
            </>
          )}
        </Grid>
      </Grid>

      <Dialog
        open={showUpload}
        keepMounted
        onClose={handleClose}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogContainer>
          <p className="title">Editar Categoría</p>
          {Inputs()}
          <Grid container className="ctr_buttons">
            <Button variant="contained" color="secondary" className="btn_cancel" onClick={handleClose}>
              Cancelar
            </Button>
            <Button
              variant="contained"
              color="primary"
              className="btn_upload"
              onClick={handleSubmit(handleUpdateGroup)}
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
          <p className="title">Eliminar Categoría {dataToDelete?.name}</p>
          <Grid container className="ctr_buttons" style={{ justifyContent: "center" }}>
            <Button variant="contained" color="secondary" className="btn_cancel" onClick={handleCloseDelete}>
              Cancelar
            </Button>
            <Button variant="contained" color="primary" className="btn_upload" onClick={handleDeleteGroup}>
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
          <p className="title">Eliminar Categorías</p>
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
    </TableCategories>
  );
};

export default CategoriesTable;

const TableCategories = styled.div`
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

  .container {
    .pagination {
      width: 100%;
      margin-top: 15px;
      display: flex;
      align-items: right;
      justify-content: right;

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
        padding: 0.47rem;
        transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
        width: 6%;
        min-height: 38px;
        margin-right: 1%;
      }

      p {
        margin-top: 0.4%;
        margin-right: 1%;
      }
    }
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
