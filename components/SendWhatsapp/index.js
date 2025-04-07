import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { CircularProgress, Dialog, Grid, IconButton, Tooltip } from "@material-ui/core";
import { ACTIONIDPRODUCTIONMODE, api } from "../../services/api";
import { handleGlobalAlert, RedirectPage, toUpperCaseChart } from "../../utils";
import { useDispatch } from "react-redux";
import { userSelector } from "../../redux/slices/userSlice";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";
import { formatDate } from "../../utils";
import Select from "react-select";
import { AssignmentOutlined } from "@material-ui/icons";
import useGlobalCommons from "../../hooks/useGlobalCommons";
import { commonSelector } from "../../redux/slices/commonSlice";
const FormWhatsapp = ({
  openWhats,
  setOpenWhats,
  prospect,
  handleCloseMenu,
  isOportunity,
  isProspect,
  idOportunity,
  isClient,
  isSale,
  flag,
  setFlag,
  reloadDataCompletePending,
  setReloadDataCompletePending,
}) => {
  const router = useRouter();

  const { getCatalogBy } = useGlobalCommons();
  const { templateswp } = useSelector(commonSelector);

  const dispatch = useDispatch();
  const { id_user, groupId, roleId } = useSelector(userSelector);
  const [msj, setMsj] = useState("");
  const [templates, setTemplates] = useState([]);
  const [isLoaderSave, setIsLoaderSave] = useState(false);

  useEffect(() => {
    // getTemplates();
  }, []);

  const getTemplates = () => {
    switch (roleId) {
      case "ejecutivo":
        let params = {
          where: JSON.stringify({
            or: [{ ejecutiveId: id_user }, { share: 1 }, { share: 2 }],
          }),
          order: "description",
          all: 1,
        };

        getCatalogBy("templateswp", params);

        // api
        //   .get(
        //     `templates?where={"or":[{"ejecutiveId":"${id_user}"},{"share":"1"},{"share":"2"}]}&order=description&all=1`
        //   )
        //   .then(res => {
        //     setTemplates(res.data.results);
        //   })
        //   .catch(err => console.log(err));
        break;

      case "gerente":
        api
          .get(`templates?where={"ejecutive":{"groupId":"${groupId}"}}&order=description&all=1&include=ejecutive`)
          .then(res => {
            setTemplates(res.data.results);
          })
          .catch(err => console.log(err));
        break;

      case "Admin_compania":
        api
          .get(`templates?order=description&all=1&include=ejecutive`)
          .then(res => {
            setTemplates(res.data.results);
          })
          .catch(err => console.log(err));
        break;

      default:
        break;
    }
  };
  const handleClickProspect = () => {
    // if (isClient === true) {
    //   router.push({ pathname: "/clientes/[prospecto]", query: { prospecto: prospect.id } });
    // }
    // if (isOportunity === true) {
    //   router.push({ pathname: "/oportunidades/[prospecto]", query: { prospecto: prospect.id } });
    // }
    // if (isProspect === true) {
    //   router.push({ pathname: "/prospectos/[prospecto]", query: { prospecto: prospect.id } });
    // }
  };

  const createTracking = async () => {
    try {
      let today = new Date();
      let query = {};
      query.prospectId = prospect.id;
      query.observations = `Se envió mensaje WhatsApp el dia ${formatDate(today)}, ${msj}`;
      query.actionId = ACTIONIDPRODUCTIONMODE;
      query.reason = "Seguimiento automático";
      query.phaseId = prospect.phaseId;
      query.createdbyId = id_user;

      if (isProspect === true) {
        query.oportunityId = "";
        query.status = "1";
      }
      if (isOportunity === true) {
        query.oportunityId = idOportunity;
        query.status = "2";
      }

      if (isClient === true) {
        query.oportunityId = "";
        query.status = "3";
      }
      if (isSale === true) {
        query.oportunityId = idOportunity;
        query.status = "4";
      }

      // handleClickProspect();
      await api.post(`trackings`, query);
    } catch (error) {
      console.log(error.response);
    }
    console.log("se crea tracking");
  };

  const handleClose = () => {
    setOpenWhats(false);
    setMsj("");
    handleCloseMenu();
    if (flag !== undefined) {
      setFlag(!flag);
    }
  };

  const NoOptionsMessage = () => {
    return (
      <div style={{ padding: "15px", width: "100%", display: "flex", justifyContent: "center" }}>
        <p style={{ color: "grey", fontSize: 13, textAlign: "justify" }}>
          Sin Plantillas (para crear una, diríjase a Herramientas - Plantillas Observaciones)
        </p>
      </div>
    );
  };

  const handlePlantillas = id => {
    setMsj("Cargando Plantilla...");
    if (id !== "") {
      api
        .put(`templates/replace/${prospect.id}`, { template: id })
        .then(res => setMsj(res.data.message))
        .catch(err => {
          console.log(err);
        });
    } else {
      setMsj("");
    }
  };

  const sendMessage = option => {
    setIsLoaderSave(true);
    copyMsj();
    handleGlobalAlert("success", "Mensaje Guardado en el Portapapeles", "basic", dispatch, 6000);
    setTimeout(() => {
      let msjEncode = encodeURIComponent(msj);
      if (option === "desktop") {
        window.open(`whatsapp://send?phone=52${prospect?.phone}&text=${msjEncode}`);
      } else {
        window.open(`https://web.whatsapp.com/send?phone=52${prospect?.phone}&text=${msjEncode}`);
      }
      handleClose();
      setIsLoaderSave(false);
      setReloadDataCompletePending(!reloadDataCompletePending);
    }, 2000);
    createTracking();
  };

  const copyMsj = () => {
    let textarea = document.getElementById("textarea");
    textarea.select();
    document.execCommand("copy");
  };

  return (
    <Dialog open={openWhats} onClose={handleClose}>
      <DialogWhatsapp>
        <div className="header">
          <p className="header__title">Seguimiento / WhatsApp</p>
        </div>
        <Grid container className="mainContainer">
          <Grid item md={6} xs={12} className="itemContainer">
            <p className="itemContainer__title">Nombre</p>
            <p className="itemContainer__info">{prospect?.name + " " + prospect?.lastname}</p>
          </Grid>
          <Grid item md={6} xs={12} className="itemContainer">
            <p className="itemContainer__title">Compañía</p>
            <p className="itemContainer__info">company</p>
          </Grid>
          <Grid item md={6} xs={12} className="itemContainer">
            <p className="itemContainer__title">Teléfono</p>
            <p className="itemContainer__info">{prospect?.phone}</p>
          </Grid>
          <Grid item md={6} xs={12} className="itemContainer">
            <p className="itemContainer__title">Plantilla</p>
            <Select
              onMenuOpen={() => getTemplates()}
              loadingMessage={() => "Cargando Opciones..."}
              isLoading={templateswp.isFetching}
              options={templateswp.results}
              getOptionValue={option => `${option["id"]}`}
              getOptionLabel={option => `${option.description} `}
              onChange={e => handlePlantillas(e.id)}
              components={{ NoOptionsMessage }}
              maxMenuHeight={195}
              placeholder="Selecciona una Plantilla"
              className="itemContainer__select"
            />
          </Grid>
          <Grid item md={12} xs={12} className="itemContainer">
            <p className="itemContainer__title">Mensaje</p>
            <div className="itemContainer__divButton">
              <Tooltip title="Copiar Mensaje" arrow>
                <IconButton className="itemContainer__divButton__iconButton" onClick={() => copyMsj()}>
                  <AssignmentOutlined className="itemContainer__divButton__iconButton__icon" />
                </IconButton>
              </Tooltip>
            </div>
            <textarea
              id="textarea"
              className="itemContainer__textArea"
              value={msj}
              onChange={e => setMsj(e.target.value)}
            />
          </Grid>
          <Grid item md={6} xs={12} className="itemContainer">
            <p className="itemContainer__title">Fase</p>
            <p className="itemContainer__info">{prospect?.phase?.name}</p>
          </Grid>
          <Grid item md={6} xs={12} className="itemContainer">
            <p className="itemContainer__title">Tipo</p>
            <p className="itemContainer__info">{prospect?.clienttype?.name}</p>
          </Grid>
        </Grid>
        <div className="buttons">
          {isLoaderSave ? (
            <CircularProgress className="loaderSave" />
          ) : (
            <>
              <button className="buttons__cancel" onClick={() => handleClose()}>
                Cancelar
              </button>
              <button
                className="buttons__send"
                disabled={msj === "" ? true : false}
                onClick={() => sendMessage("desktop")}
              >
                Enviar por WhatsApp Desktop
              </button>
              <button className="buttons__send" disabled={msj === "" ? true : false} onClick={() => sendMessage("web")}>
                Enviar por WhatsApp Web
              </button>
            </>
          )}
        </div>
      </DialogWhatsapp>
    </Dialog>
  );
};

export default FormWhatsapp;

const DialogWhatsapp = styled.div`
  .header {
    padding: 10px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 5px;
    position: sticky;
    background-color: #0c203b;
    color: #fff;
    box-shadow: 0 2px 2px -2px gray;
    top: 0;
    &__title {
      font-size: 18px;
      font-weight: 500;
    }
    &__button {
      height: 35px;
      width: 35px;
      &__icon {
        font-size: 20px;
        color: red;
      }
    }
  }
  .mainContainer {
    padding: 5px;
    .itemContainer {
      padding: 10px;
      &__title {
        color: grey;
        font-size: 14px;
      }
      &__info {
        width: 100%;
      }
      &__textArea {
        width: 100%;
        min-height: 100px;
        resize: vertical;
        padding: 2px;
        outline: none;
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans",
          "Helvetica Neue", sans-serif;
      }
      &__select {
        width: 100%;
        border-radius: 5px;
        padding: 5px;
      }
      &__divButton {
        display: flex;
        justify-content: flex-end;
        width: 100%;
        &__iconButton {
          height: 10px;
          width: 10px;
          position: fixed;
          margin-top: -23px;
          margin-right: 10px;
          &__icon {
            font-size: 19px;
            color: #0c203b;
          }
        }
      }
    }
  }
  .buttons {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    padding: 15px;
    &__cancel {
      font-size: 15px;
      border-radius: 7px;
      padding: 7px;
      transition: 0.3s;
      background-color: #0d0d0d;
      color: #fff;
      border-color: #0d0d0d;
      &:hover {
        cursor: pointer;
        background-color: #fff;
        color: #0d0d0d;
      }
    }
    &__send {
      font-size: 15px;
      border-radius: 7px;
      padding: 7px;
      margin-left: 5px;
      transition: 0.3s;
      background-color: #0c203b;
      border-color: #0c203b;
      color: #fff;
      &:hover {
        cursor: pointer;
        color: #0c203b;
        background-color: #fff;
      }
    }
    .loaderSave {
      margin-right: 20px;
    }
  }
`;
