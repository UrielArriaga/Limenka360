/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { Button, Grid, Avatar, CircularProgress, LinearProgress } from "@material-ui/core";
import Dialog from "@material-ui/core/Dialog";
import { NavigateBefore, NavigateNext, TableChartOutlined, Group, CameraAlt } from "@material-ui/icons";
import styled from "styled-components";
import TableCustomGroups from "../TableCustomGroups";
import { useForm } from "react-hook-form";
import { api, url_filesCompanies } from "../../services/api";
import { useDispatch, useSelector } from "react-redux";
import { companySelector } from "../../redux/slices/companySlice";
import { Pagination } from "@material-ui/lab";
import { handleGlobalAlert, validateURL } from "../../utils";
import RequestCommon from "../../services/request_Common";
import ModalDeleteGroup from "../UI/organism/ModalDeleteGroup";

const GroupsTable = ({ handleAlert, totalGroups, setTotalGroups, searchKey, filterGroup, flag }) => {
  const { id_company } = useSelector(companySelector);
  const [logo, setLogo] = useState({ url: "", file: undefined });
  const [linkLogo, setLinkLogo] = useState("");
  const [deleteLinkLogo, setDeleteLinkLogo] = useState("");
  const [showUpload, setshowUpload] = useState(false);
  const [isDeleteLogo, setIsDeleteLogo] = useState(false);
  const [name, setName] = useState("");
  const [code, setCode] = useState("");
  const [primaryColor, setPrimaryColor] = useState("");
  const [secondaryColor, setSecondaryColor] = useState("");
  const [company, setCompany] = useState("");
  const [data, setData] = useState(null);
  const [dataToUpdate, setDataToUpdate] = useState(null);
  const [dataToDelete, setDataToDelete] = useState(null);
  const [dataToManyDelete, setDataToManyDelete] = useState(null);
  const [refetch, setRefetch] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [showDeleteMany, setShowDeleteMany] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  //paginacion
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);
  const totalPages = Math.ceil(totalGroups / limit);
  const [loaderEdit, setLoaderEdit] = useState(false);
  const [ejecutives, setEjecutives] = useState([]);
  const [flagEjecutivesx, setFlagEjecutives] = useState(false);
  const [isLoadingExecutive, setIsLoadingExecutive] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    let mounted = true;
    if (mounted) {
      getData();
      setIsLoading(true);
    }
    return () => (mounted = false);
  }, [refetch, page, flag]);

  const getUsers = async group => {
    setIsLoadingExecutive(true);
    try {
      let query = {};
      query.groupId = group?.id;
      let ejecutives = await api.get(`ejecutives?where=${JSON.stringify(query)}&order=-createdAt&all=1&include=role`);
      let EjecutivesResults = ejecutives?.data?.results;
      setEjecutives(EjecutivesResults);
      setIsLoadingExecutive(false);
    } catch (error) {
      setIsLoadingExecutive(false);
      handleGlobalAlert(
        "warning",
        "Grupos-Ocurrio un error al cargar los ejecutivos del grupo",
        "basic",
        dispatch,
        6000
      );
      console.log(error);
    }
  };

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
    setLogo({ url: "", file: undefined });
    setLinkLogo("");
    setIsDeleteLogo(false);
    setDeleteLinkLogo("");
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

  const getData = async () => {
    try {
      let query = {};
      query.name = { iRegexp: `${searchKey.toLocaleLowerCase()}` };
      setIsLoading(true);
      let count = "count=1";
      let limite = `limit=${limit}`;
      let skip = `skip=${page}`;
      let order = "order=-createdAt";
      let group = await api.get(`groups?where=${JSON.stringify(query)}&${count}&${limite}&${skip}&${order}`);
      setTotalGroups(group.data.count);
      normalizeData(group.data.results);
    } catch (error) {
      setIsLoading(false);
      handleAlert("error", "Grupos - Error al cargar los datos!", "basic");
    }
  };

  const normalizeData = data => {
    let dataNormalize = [];
    for (let i = 0; i < data?.length; i++) {
      const element = data[i];
      let itemNormalize = {};
      itemNormalize.id = element?.id;
      itemNormalize.logo = element?.logo;
      itemNormalize.name = formatUpperCase(element?.name);
      itemNormalize.code = element?.code;
      itemNormalize.primarycolor = element?.primarycolor;
      itemNormalize.secondarycolor = element?.secondarycolor;
      itemNormalize.createdAt = element?.createdAt;
      dataNormalize.push(itemNormalize);
    }
    setData(dataNormalize);
    setIsLoading(false);
  };

  const uploadGroup = grupo => {
    // console.log("gupo", grupo);
    setDataToUpdate(grupo);
    setshowUpload(true);
    setValue("name", grupo.name);
    setValue("code", grupo.code);
    setValue("company", id_company);
    setName(grupo.name);
    setCode(grupo.code);
    setCompany(grupo.company);
    grupo.primarycolor === "" ? setPrimaryColor("#0c203b") : setPrimaryColor(grupo.primarycolor);
    grupo.secondarycolor === "" ? setSecondaryColor("#dce1f6") : setSecondaryColor(grupo.secondarycolor);
    setLinkLogo(grupo.logo);
  };

  const deleteGroup = grupo => {
    setDataToDelete(grupo);
    setShowDelete(true);
    setFlagEjecutives(!flagEjecutivesx);
    getUsers(grupo);
  };

  const handleUpdateGroup = async (formData, nameLogo) => {
    setLoaderEdit(true);

    try {
      let jsonUpdate = {};
      jsonUpdate.companyId = id_company;
      jsonUpdate.name = formData.name.toLocaleLowerCase();
      jsonUpdate.code = formData.code;
      jsonUpdate.primarycolor = primaryColor;
      jsonUpdate.secondarycolor = secondaryColor;
      // console.log(jsonUpdate);
      if (isDeleteLogo === true) {
        jsonUpdate.logo = "";
        let deleteLogo = await api.delete(`files/delete`, { data: { name: deleteLinkLogo } });
      } else {
        jsonUpdate.logo = nameLogo;
      }
      let updateGroup = await api.put(`groups/${dataToUpdate.id}`, jsonUpdate).then(res => {
        setRefetch(!refetch);
        resetForm();
        handleClose();
        handleAlert("success", "Grupo - Actualizado!", "basic");
        setLoaderEdit(false);
      });
    } catch (error) {
      console.log(error);
      handleAlert("error", "Grupo - No se Pudo Actualizar!", "basic");
      setLoaderEdit(false);
    }
  };

  const showTheLogo = e => {
    if (e.target.files[0] === undefined) return;
    let typeFile = e.target.files[0].name.split(".").pop().toLocaleLowerCase();
    let acceptFile = ["jpg", "png", "jpeg"];
    let validate = acceptFile.filter(item => item === typeFile);
    if (validate.length === 0)
      return handleGlobalAlert("warning", "Grupos-Tipo de archivo no adminitido", "basic", dispatch, 6000);

    const url = URL.createObjectURL(e.target.files[0]);
    setLogo({ url: url, file: e.target.files[0] });
  };
  const string_to_slug = str => {
    str = str.replace(/(<([^>]+)>)/gi, " ");
    str = str.replace(/^\s+|\s+$/g, "");
    str = str.toLowerCase();
    var from = "åàáãäâèéëêìíïîòóöôùúüûñç·/_,:;";
    var to = "aaaaaaeeeeiiiioooouuuunc------";
    for (var i = 0, l = from.length; i < l; i++) {
      str = str.replace(new RegExp(from.charAt(i), "g"), to.charAt(i));
    }

    str = str
      .replace(/[^a-z0-9 -]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-")
      .replace(/^-+/, "")
      .replace(/-+$/, "");

    return str;
  };

  const deleteLogo = () => {
    setIsDeleteLogo(true);
    setLinkLogo("");
    setLogo("");
    setDeleteLinkLogo(linkLogo);
  };

  const onSubmit = data => {
    uploadLogo(logo?.file, logo.file?.name, true, data);
  };
  const uploadLogo = async (file, name, type, data) => {
    if (file !== undefined) {
      setLoaderEdit(true);
      try {
        let cleanName = string_to_slug(name);
        let newData = new FormData();
        newData.append("name", name);
        newData.append("file", file);
        let results = await api.post(`files/upload/${cleanName}`, newData);
        handleUpdateGroup(data, results.data.name);
        setLoaderEdit(false);
      } catch (error) {
        // console.log("no entro");
        console.log(error);
        props.handleAlert("error", "Error - No se Subió la Imagen", "basic", props.setAlert);
        setLoaderEdit(false);
      }
    } else {
      handleUpdateGroup(data, linkLogo);
    }
  };
  const resetForm = () => {
    setValue("name", "");
    setValue("company", "");
    setValue("code", "");
    setName("");
    setCompany("");
    setCode("");
  };
  const deleteMany = items => {
    setDataToManyDelete(items);
    setShowDeleteMany(true);
  };

  const handleDeleteMany = () => {
    dataToManyDelete.forEach(item => {
      api.delete(`groups/${item.id}`);
    });
    setRefetch(!refetch);
    setShowDeleteMany(false);
  };
  const printColor = (value, type) => {
    switch (type) {
      case "primary":
        setPrimaryColor(value);
        break;
      case "secondary":
        setSecondaryColor(value);
        break;
      default:
        break;
    }
  };

  function Inputs() {
    return (
      <Grid spacing={1} container className="ctr_inputs">
        <Grid item xs={12} sm={4} md={4} className="imageContainer">
          <Grid item xs={12} md={12} className="logo">
            <label className="logo__label">
              {logo.file === undefined ? (
                linkLogo === "" ? (
                  <CameraAlt className="logo__icon" />
                ) : (
                  <img className="logo__img" src={validateURL(linkLogo)} alt="" />
                )
              ) : (
                <img className="logo__img" src={validateURL(logo.url)} alt="" />
              )}

              <input
                className="logo__input"
                type="file"
                id="logo"
                name="logo"
                accept="image/png, image/jpeg, image/jpg"
                onChange={e => showTheLogo(e)}
                onClick={e => (e.target.value = null)}
              />
            </label>
          </Grid>
          {linkLogo !== "" && (
            <Grid item xs={6} md={6}>
              <Button className="imageContainer__deleteImage" onClick={() => deleteLogo()}>
                Eliminar
              </Button>
            </Grid>
          )}
        </Grid>
        <Grid item xs={12} sm={8} md={8} className="infoContainer">
          <Grid spacing={2} container>
            <Grid item xs={12} md={12}>
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
            <Grid item xs={12} md={12}>
              <label className="ctr_inputs__label">Codigo *</label>
              <input
                {...register("code", { required: true })}
                id="code"
                name="code"
                value={code}
                onChange={e => {
                  setCode(e.target.value);
                  setValue("code", e.target.value);
                }}
                className={errors?.code?.type === "required" ? "ctr_inputs__input error" : "ctr_inputs__input"}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={6} className="colorsContainer">
              <label className="ctr_inputs__label">Color Primario</label>
              <input
                id="primarycolor"
                name="primarycolor"
                type="color"
                value={primaryColor}
                onChange={e => {
                  printColor(e.target.value, "primary");
                  setValue("primarycolor", e.target.value);
                }}
                className="ctr_inputs__inputColor"
              />
            </Grid>
            <Grid item xs={12} sm={6} md={6} className="colorsContainer">
              <label className="ctr_inputs__label">Color Secundario</label>
              <input
                id="secondarycolor"
                name="secondarycolor"
                type="color"
                value={secondaryColor}
                onChange={e => {
                  printColor(e.target.value, "secondary");
                  setValue("secondarycolor", e.target.value);
                }}
                className="ctr_inputs__inputColor"
              />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    );
  }
  return (
    <TableGroup>
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
          <TableCustomGroups
            heads={["id", "logo", "grupo", "codigo", "color primario", "color secundario"]}
            data={data || [{ id: "Sin Datos", name: "Sin Datos", auditoria: "Sin Datos" }]}
            identificador={"id"}
            custom={true}
            selectmultiple={false}
            primaryColor={"#405189"}
            secondaryColor={"#dce1f6"}
            deleteItem={items => deleteMany(items)}
            keyJson="grupo"
            keyStorage="grupo"
            actionsPerItem={[
              { title: "modificar", action: e => uploadGroup(e) },
              { title: "eliminar", action: e => deleteGroup(e) },
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
          <div className="head">
            <p className="title">Editar Grupo</p>
            {loaderEdit && <CircularProgress size={20} className="loader" />}
          </div>
          {Inputs()}
          <Grid container className="ctr_buttons">
            <Button
              disabled={loaderEdit}
              variant="contained"
              color="secondary"
              className="btn_cancel"
              onClick={handleClose}
            >
              Cancelar
            </Button>
            <Button
              disabled={loaderEdit}
              variant="contained"
              color="primary"
              className="btn_upload"
              onClick={handleSubmit(onSubmit)}
            >
              Guardar
            </Button>
          </Grid>
        </DialogContainer>
      </Dialog>
      <ModalDeleteGroup
        open={showDelete}
        setOpen={setShowDelete}
        ejecutives={ejecutives}
        dataToDelete={dataToDelete}
        isLoadingExecutive={isLoadingExecutive}
        setIsLoadingExecutive={setIsLoadingExecutive}
        dataGroups={data}
        setRefetch={setRefetch}
        refetch={refetch}
      />

      <Dialog
        open={showDeleteMany}
        keepMounted
        onClose={handleCloseDelete}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogContainer>
          <div className="head">
            <p className="title">Eliminar grupos</p>
          </div>

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
    </TableGroup>
  );
};

export default GroupsTable;

const TableGroup = styled.div`
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
`;

const DialogContainer = styled.div`
  P {
    margin: 0;
  }
  display: flex;
  flex-direction: column;
  overflow: hidden;
  .head {
    display: flex;
    align-items: center;
    justify-content: space-between;
    background: #0c203b;
    padding: 10px 20px;
    .loader {
      color: #fff;
    }
  }
  .title {
    font-size: 18px;
    /* margin-bottom: 15px; */
    font-weight: bold;
    color: #fff;
    letter-spacing: 0.05em;
  }
  .ctr_inputs {
    padding: 0 20px 20px 20px;
    margin-top: 14px;

    .logo {
      display: flex;
      align-items: center;
      flex-direction: column;
      margin-top: 30px;
      &__img {
        width: 120px;
        height: 120px;
        border-radius: 50%;
        object-fit: contain;
      }
      &__icon {
        font-size: 60px;
      }
      &__input {
        display: none;
      }
      &__label {
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: white;
        text-align: center;
        padding: 5px;
        margin-bottom: 10px;
        border: 1px solid #ced4da;
        border-radius: 50%;
        transition: 0.3s;
        &:hover {
          -webkit-filter: blur(2px);
          cursor: pointer;
          &__logoFooter {
            z-index: 0;
          }
        }
      }
      &__buttonUploadImage {
        margin-bottom: 10px;
      }
      &__buttonDeleteImage {
      }
      &__logoFooter {
        position: fixed;
        color: red;
        color: black;
        font-size: 40px;
        text-align: center;
        margin-top: 100px;
        z-index: -1;
        transition: 0.2s;
        font-weight: bold;
      }
    }
    .imageContainer {
      display: flex;
      flex-direction: column;
      align-items: center;
      &__deleteImage {
        margin-top: 15px;
        border-radius: 5px;
        padding: 2px;
        background-color: red;
        color: #fff;
        border-color: red;
        transition: 0.3s;
        text-transform: capitalize;
        &:hover {
          cursor: pointer;
          background-color: #fff;
          color: red;
        }
      }
    }
    .infoContainer {
      .colorsContainer {
        display: flex;
        flex-direction: column;
      }
    }
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
    &__inputColor {
      border: none;
      &:hover {
        cursor: pointer;
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
  .ctr_buttonsDelete {
    display: flex;
    padding: 0 20px;
    padding-bottom: 20px;
    justify-content: flex-end;
    margin-top: 15px;
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
