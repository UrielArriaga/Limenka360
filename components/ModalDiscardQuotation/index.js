// Ejemplo de uso del componente, descartar prospectoname
// <ModalDiscardQuotation
//   name={`${prospect?.name} ${prospect?.lastname}`}
//   email={prospect?.email}
//   id={prospect?.id}
//   handleAlert={handleAlert}
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
  progressAutocomplete: {
    marginTop: "10px",
    textAlign: "center",
    height: "45px",
    paddingTop: "7px",
  },
}));

const ModalDiscardQuotation = ({ name, id, email, handleAlert, activityFrom }) => {
  const classes = useStyles();
  const commonApi = new RequestCommon();
  const [modalStyle] = useState(getModalStyle);
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState();
  const [discartReasons, setdiscartReasons] = useState([]);
  const [loader, setLoader] = useState(false);
  const [arrayReasons, setArrayReasons] = useState();
  const [messageRequired, setMessageRequired] = useState("");
  const [oportunities, setOportunities] = useState();
  const [concept, setConcept] = useState();
  const [selectConcept, setSelectConcept] = useState();
  const { id_user, groupId } = useSelector(userSelector);
  const router = useRouter();
  const { id_company } = useSelector(companySelector);
  const { socket } = useContext(SocketContext);

  useEffect(() => {
    getDiscartReasons();
    getConcept();
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

  const discardOportunity = async () => {
    if (value == undefined || selectConcept == undefined) {
      setMessageRequired("*Requerido");
      return;
    } else {
      setMessageRequired("");
    }
    setLoader(true);
    try {
      let reason;
      let selectOportunity = [];
      //Dividir el concepto del monto
      let conceptWithoutAmount = selectConcept.split(",", 1)[0];
      //Buscamos los datos de la oportunidad que seleccionamos
      oportunities.map(item => (item.concept == conceptWithoutAmount ? selectOportunity.push(item) : null));
      //Obtiene todos los valores de la razon que seleccionamos
      arrayReasons.map(item => (item.reason == value ? (reason = item) : null));
      let objPut = {
        status: 0,
        discartedbyId: id_user,
        oporeasonId: reason.id,
        opodiscartedreason: reason.reason,
      };

      let deleteProspect = await api.put(`oportunities/discardoportunity/${selectOportunity[0].id}`, objPut);

      if (deleteProspect.status == 200) {
        socket?.emit("send_notify_activity", {
          activity: {
            type: "delete",
            from: activityFrom,
            message: `Se descartó la oportunidad ${selectOportunity[0].id}`,
            data: deleteProspect.data,
            ejecutiveId: id_user,
            groupId: groupId,
            companyId: id_company,
          },
        });
        handleClose();
        handleAlert("success", "Oportunidad - Descartada!", "basic");
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

  const getConcept = async () => {
    let arrayConcept = [];
    try {
      let params = {
        where: { prospectId: id, discarted: false },
        keys: "id,amount,concept",
        order: "-createdAt",
        all: "1",
      };
      let oportuntiesResponse = await api.get(`oportunities`, { params });
      oportuntiesResponse.data.results.map(item => arrayConcept.push(`${item.concept}, $${item.amount}`));
      setConcept(arrayConcept);
      setOportunities(oportuntiesResponse.data.results);
      console.log("getConcept in ModalDiscardQuotation: ", oportuntiesResponse.data.results);
    } catch (error) {
      handleAlert("error", "Error al cargar datos!", "basic");
      console.log(error);
    }
  };

  return (
    <ComponentStyle>
      <div className="container">
        <div />
        <Button className={classes.button} onClick={handleOpen} variant="outlined" color={"secondary"}>
          <p>Descartar Cotización</p>
        </Button>
      </div>
      <Modal open={open} onClose={handleClose}>
        <div style={modalStyle} className={classes.paper}>
          <h3 id="simple-modal-title" className={classes.title}>
            Descartar Cotización
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
            <Grid item md={2}>
              <p className={classes.text}>Concepto:</p>
            </Grid>
            <Grid item md={10}>
              <p className={classes.required}>{messageRequired != "" && messageRequired}</p>
            </Grid>
            <Grid item md={12}>
              {concept ? (
                <Autocomplete
                  className={classes.select}
                  onChange={(event, newValue) => {
                    setSelectConcept(newValue);
                  }}
                  options={concept}
                  renderInput={params => <TextField {...params} label="" />}
                  size="small"
                />
              ) : (
                <div className={classes.progressAutocomplete}>
                  <CircularProgress size={30} />
                </div>
              )}
            </Grid>
            <Grid item md={2}>
              <p className={classes.text}>Razón:</p>
            </Grid>
            <Grid item md={10}>
              <p className={classes.required}>{messageRequired != "" && messageRequired}</p>
            </Grid>
            <Grid item md={12}>
              {discartReasons.length > 0 ? (
                <Autocomplete
                  className={classes.select}
                  onChange={(event, newValue) => {
                    setValue(newValue);
                  }}
                  options={discartReasons}
                  renderInput={params => <TextField {...params} label="" />}
                  size="small"
                />
              ) : (
                <div className={classes.progressAutocomplete}>
                  <CircularProgress size={30} />
                </div>
              )}
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
                <Button className={classes.buttonModal} variant="contained" color="primary" onClick={discardOportunity}>
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

export default ModalDiscardQuotation;

const ComponentStyle = styled.div`
  font-family: "Roboto", "Helvetica", "Arial", sans-serif;
  .container {
    display: grid;
    grid-template-columns: auto 200px;
  }
`;
