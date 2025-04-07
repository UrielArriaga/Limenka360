// Ejemplo de uso del componente, descartar prospectoname
// <ModalDiscardProspect
//   name={`${prospect?.name} ${prospect?.lastname}`} // nombre del prospecto
//   email={prospect?.email} // email del prospecto
//   id={prospect?.id} // id del prospecto
//   handleAlert={handleAlert} // mensaje de alerta
// />

import React, { useContext, useEffect, useState } from "react";
import { Button, Grid } from "@material-ui/core";
import styled from "styled-components";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import EmailIcon from "@material-ui/icons/Email";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import RequestCommon from "../../services/request_Common";
import { api } from "../../services/api";
import { useSelector } from "react-redux";
import { userSelector } from "../../redux/slices/userSlice";
import { useRouter } from "next/router";
import CircularProgress from "@mui/material/CircularProgress";
import { companySelector } from "../../redux/slices/companySlice";
import { SocketContext } from "../../context/socketContext";

function getModalStyle() {
  const top = 45;
  const left = 50;
  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles(theme => ({
  paper: {
    position: "absolute",
    width: 600,
    backgroundColor: "#fff",
    boxShadow: theme.shadows[5],
    borderRadius: 4,
  },
  title: {
    backgroundColor: "#405189",
    padding: theme.spacing(1, 2, 1),
    color: "#fff",
    fontSize: "1.25rem",
    ontWeight: 500,
    lineHeight: 1.6,
    letterSpacing: "0.0075em",
  },
  container: {
    padding: theme.spacing(1, 2, 1),
  },
  bold: {
    fontWeight: 700,
    color: "#000",
    fontSize: "15px",
    marginLeft: "6px",
  },
  name: {
    fontWeight: 700,
    color: "#000",
    fontSize: "15px",
    textTransform: "capitalize",
    marginLeft: "6px",
  },
  text: {
    marginTop: "10px",
    color: "grey",
  },
  required: {
    marginTop: "10px",
    marginLeft: "5px",
    color: "red",
  },
  select: {
    width: "100%",
    marginTop: "15px",
  },
  button: {
    marginTop: "15px",
    textTransform: "capitalize",
  },
  buttonModal: {
    marginTop: "15px",
    textTransform: "capitalize",
    height: "30px",
    width: "90px",
  },
  icon: {
    paddingTop: "10px",
  },
}));

const ModalDiscardProspect = ({ isShow, name, id, email, handleAlert, activityFrom,discarted }) => {
  const classes = useStyles();
  const commonApi = new RequestCommon();
  const [modalStyle] = useState(getModalStyle);
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState();
  const [inputValue, setInputValue] = useState("");
  const [discartReasons, setdiscartReasons] = useState([]);
  const [loader, setLoader] = useState(false);
  const [arrayReasons, setArrayReasons] = useState();
  const [messageRequired, setMessageRequired] = useState("");
  const { id_user, groupId } = useSelector(userSelector);
  const router = useRouter();
  const { id_company } = useSelector(companySelector);
  const { socket } = useContext(SocketContext);

  useEffect(() => {
    getDiscartReasons();
  }, []);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setValue(undefined);
    setMessageRequired("");
    setOpen(false);
  };

  const getDiscartReasons = async () => {
    try {
      let array = [];
      let reasons = await commonApi.getReasons();
      reasons.data.results.map(item => array.push(item.reason));
      setdiscartReasons(array);
      setArrayReasons(reasons.data.results);
    } catch (error) {
      console.log(error);
    }
  };

  const discardProspect = async () => {
    console.log("Descartando proceso iniciado -", value);
    if (value == undefined) {
      setMessageRequired("*Requerido");
      return console.log("Selecciona un razón");
    }
    setLoader(true);
    try {
      let reason;
      console.log("Arreglo de razones: ", arrayReasons);
      //Obtiene todos los valores de la razon que seleccionamos
      arrayReasons.map(item => (item.reason == value ? (reason = item) : null));
      console.log("Arreglo filtrado: ", reason);

      let objPut = {
        status: 0,
        discartedbyId: id_user,
        reasonId: reason.id,
        discartedreason: reason.reason,
      };

      console.log("obj put: ", objPut);

      let deleteProspect = await api.put(`prospects/discardprospect/${id}`, objPut);

      if (deleteProspect.status == 200) {
        socket?.emit("send_notify_activity", {
          activity: {
            type: "delete",
            from: activityFrom,
            message: `${name} e descartó`,
            data: deleteProspect.data,
            ejecutiveId: name,
            groupId: groupId,
            companyId: id_company,
          },
        });
        handleClose();
        handleAlert("success", "Prospecto - Descartado!", "basic");
        setTimeout(function () {
          router.back();
        }, 2000);
      }
    } catch (error) {
      console.log("Ocurrio un error al descartar", error);
      handleAlert("error", "Ocurrio un error", "basic");
    }
    setLoader(false);
  };
  if (isShow) return <></>;
  return (
    <ComponentStyle>
      <div className="container">
        <div />
        <Button className={classes.button} onClick={handleOpen} variant="outlined" color={"secondary"} disabled={discarted}>
          <p>Descartar prospecto</p>
        </Button>
      </div>
      <Modal open={open} onClose={handleClose}>
        <div style={modalStyle} className={classes.paper}>
          <h3 id="simple-modal-title" className={classes.title}>
            ¿Estás seguro de esto?
          </h3>
          <Grid container className={classes.container}>
            <Grid item md={12}>
              <p className={classes.text} id="simple-modal-description">
                Se descartará el prospecto de tus registros.
              </p>
            </Grid>
            <Grid item md={6}>
              <p className={classes.text}>
                <AccountCircleIcon className={classes.icon} fontSize="medium" /> Nombre:
              </p>
              <p className={classes.name}>{name}</p>
            </Grid>
            <Grid item md={6}>
              <p className={classes.text}>
                <EmailIcon className={classes.icon} fontSize="medium" /> Correo:
              </p>
              <p className={classes.bold}>{email}</p>
            </Grid>
            <Grid item md={1}>
              <p className={classes.text}>Razón:</p>
            </Grid>
            <Grid item md={11}>
              <p className={classes.required}>{messageRequired != "" && messageRequired}</p>
            </Grid>
            <Grid item md={12}>
              <Autocomplete
                className={classes.select}
                onChange={(event, newValue) => {
                  setValue(newValue);
                }}
                inputValue={inputValue}
                onInputChange={(event, newInputValue) => {
                  setInputValue(newInputValue);
                }}
                id="controllable-states-demo"
                options={discartReasons}
                renderInput={params => <TextField {...params} label="" />}
                size="small"
              />
            </Grid>
            <Grid item md={8} />

            {loader ? (
              <Grid item md={2} />
            ) : (
              <Grid item md={2}>
                <Button className={classes.buttonModal} variant="outlined" color="primary" onClick={handleClose}>
                  Cancelar
                </Button>
              </Grid>
            )}

            {loader ? (
              <Grid item md={2}>
                <Button className={classes.buttonModal} variant="contained" color="primary">
                  <CircularProgress size={24} />
                </Button>
              </Grid>
            ) : (
              <Grid item md={2}>
                <Button className={classes.buttonModal} variant="contained" color="primary" onClick={discardProspect}>
                  Continuar
                </Button>
              </Grid>
            )}
          </Grid>
        </div>
      </Modal>
    </ComponentStyle>
  );
};

export default ModalDiscardProspect;

const ComponentStyle = styled.div`
  font-family: "Roboto", "Helvetica", "Arial", sans-serif;
  .container {
    display: grid;
    grid-template-columns: auto 200px;
  }
`;
