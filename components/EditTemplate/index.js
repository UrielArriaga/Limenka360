import { Button, Drawer, Grid } from "@material-ui/core";
import { CloseOutlined, Person, DescriptionOutlined } from "@material-ui/icons";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useForm } from "react-hook-form";
import { device } from "../../styles/global.styles";
import Select from "react-select";
import { api } from "../../services/api";
import AlertGlobal from "../Alerts/AlertGlobal";
import { useSelector } from "react-redux";
import { userSelector } from "../../redux/slices/userSlice";
import RequestCommon from "../../services/request_Common";
import { useRouter } from "next/router";

const DrawerEditTemplate = ({ openEdit, setOpenEdit, templateEdit, flag, setFlag }) => {
  const { id_user, groupId, company } = useSelector(userSelector);
  const [mensaje, setMensaje] = useState("");

  const router = useRouter();

  const commonApi = new RequestCommon();
  const [Alert, setAlert] = useState({ severity: null, show: null, message: "", type: null });

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    let mounted = true;

    if (openEdit) {
      SetValues(templateEdit);
    }
    return () => (mounted = false);
  }, [openEdit]);

  const handleUploadProspect = async formData => {
    // let putTemplate = {};
    // console.log(putTemplate);
    // console.log(templateEdit);
    // putTemplate.type = formData.type;
    // putTemplate.description = formData?.description?.toLowerCase();
    // putTemplate.message = formData?.message;
    // putTemplate.share = Number(formData?.share);

    // if (formData.share === "0") {
    //   putTemplate.ejecutiveId = id_user;
    //   putTemplate.groupId = null;
    //   putTemplate.companyId = null;
    // }

    // if (formData.share === "1") {
    //   putTemplate.groupId = groupId;
    // }
    // if (formData.share === "2") {
    //   putTemplate.companyId = company;
    // }

    // console.log(putTemplate);
    // return;
    try {
      setAlert({ severity: "info", show: true, message: "Un momento - Actualizando prospecto", type: "load" });
      let putTemplate = {};

      putTemplate.type = formData.type;
      putTemplate.description = formData?.description?.toLowerCase();
      putTemplate.message = formData?.message;
      putTemplate.share = Number(formData?.share);

      if (formData.share === "0") {
        console.log("hereeee");
        putTemplate.ejecutiveId = id_user;
        putTemplate.groupId = "";
        putTemplate.companyId = "";
      }

      if (formData.share === "1") {
        putTemplate.ejecutiveId = "";
        putTemplate.groupId = groupId;
        putTemplate.companyId = "";
      }
      if (formData.share === "2") {
        putTemplate.ejecutiveId = "";
        putTemplate.groupId = "";
        putTemplate.companyId = company;
      }
      console.log(putTemplate);

      let templateNew = await api.put(`templates/${templateEdit.id}`, putTemplate);
      if (templateNew.status == 200) {
        setAlert({ severity: null, show: false, message: null, type: null });
        handleAlert("success", "Plantilla  - Editado correctamente!", "basic");
        setTimeout(() => {
          setFlag(!flag);
          resetInputs();
          setOpenEdit(!openEdit);
        }, 1000);
      }
    } catch (error) {
      handleAlert("error", "Plantilla - Ocurrió un problema!", "basic");
      console.log(error.response);
      console.log(error);
    }
  };

  function SetValues(template) {
    setValue("description", template?.description);
    setValue("type", template?.type);
    setValue("message", template?.message);
    setValue("share", template?.share);
  }

  function resetInputs() {
    setValue("description", "");
    setValue("type", "");
    setValue("message", "");
    setValue("share", "");
  }

  const handleCloseEdit = () => {
    resetInputs();
    setOpenEdit(!openEdit);
  };

  const handleAlert = (severity, message, type) => {
    setAlert({ severity: severity, show: true, message: message, type: type });
    setTimeout(() => {
      setAlert({ severity: severity, show: false, message: message, type: null });
    }, 3000);
  };

  return (
    <DialogFullScreen anchor="right" open={openEdit} onClose={handleCloseEdit}>
      <div className="ctr_edit">
        <div className="ctr_edit__header">
          <div className="ctr_edit__header__close">
            <CloseOutlined className="close" onClick={handleCloseEdit} />
            <p className="title">Editar Plantilla</p>
          </div>
          <Button variant="contained" className="btn_save" onClick={handleSubmit(handleUploadProspect)}>
            Guardar
          </Button>
        </div>
        <div style={{ height: "60px" }} />
        <div className="ctr_edit__ctr_info">
          <p className="ctr_edit__ctr_info__title">
            <DescriptionOutlined />
            Plantilla <span>{`${templateEdit?.description}`}</span>
          </p>

          <Grid container className="form">
            <Grid item xs={12} md={12}>
              <div className="item">
                <div className="container-tag">
                  <p>
                    Descripción <strong>*</strong>
                  </p>
                  {errors.description && (
                    <>
                      <div className="point"></div>
                      <Error>{errors.description?.message}</Error>
                    </>
                  )}
                </div>

                <input
                  placeholder=" Ingrese la Descripción"
                  className="input capitalize"
                  {...register("description", {
                    required: "*Requerido",
                  })}
                />
              </div>
            </Grid>

            <Grid item xs={12} md={6}>
              <div className="item">
                <p>
                  Tipo <strong>*</strong>
                </p>

                <select className="input" {...register("type")}>
                  <option>{templateEdit?.type}</option>
                  <option value={"WhatsApp"}> Whats App</option>
                  <option value={"Correo"}> Correo</option>
                </select>
              </div>
            </Grid>

            <Grid item xs={12} md={6}>
              <div className="item">
                <p>
                  Compartir <strong>*</strong>
                </p>

                <select
                  className="input"
                  {...register("share", {
                    required: false,
                  })}
                >
                  <option value="" hidden>
                    Seleccione con quien compartir
                  </option>
                  <option value="0"> Solo para mi </option>
                  <option value="1"> Compartir con mi grupo </option>
                  <option value="2"> Compartir para todos </option>
                </select>
              </div>
            </Grid>

            <Grid item xs={12} sm={12} md={12}>
              <label className="item">
                <p>Mensaje</p>
                <textarea
                  className="textarea"
                  {...register("message", { required: true })}
                  onChange={e => {
                    setMensaje(e.target.value);
                    console.log(e.target.value);
                  }}
                  value={mensaje}
                />
              </label>
            </Grid>

            <Grid item xs={12} md={6}>
              <label className="item">
                <p>Datos del ejecutivo</p>
                <select className="input" onChange={e => setMensaje(mensaje + e.target.value)}>
                  <option hidden> Seleccione</option>
                  <option value={"*_${ejecutive.name}_*"}>Nombre del ejecutivo</option>
                  <option value={"*_${ejecutive.lastname}_*"}>Apellido del ejecutivo</option>
                  <option value={"*_${ejecutive.email}_*"}>Correo del ejecutivo</option>
                  <option value={"*_${ejecutive.phone}_*"}> Numero del ejecutivo</option>
                  <option value={"*_${ejecutive.optionalphone}_*"}> Movil del ejecutivo</option>
                  <option value={"*_${ejecutive.company}_*"}> Compañía del ejecutivo</option>
                </select>
              </label>
            </Grid>

            <Grid item xs={12} md={6}>
              <label className="item">
                <p>Datos del Prospecto</p>
                <select className="input" onChange={e => setMensaje(mensaje + e.target.value)}>
                  <option hidden> Seleccione</option>
                  <option value={"*_${prospect.name}_*"}>Nombre del prospecto</option>
                  <option value={"*_${prospect.lastname}_*"}>Apellido del prospecto</option>
                  <option value={"*_${prospect.email}_*"}>Correo del prospecto</option>
                  <option value={"*_${prospect.phone}_*"}> Numero del prospecto</option>
                  <option value={"*_${prospect.optionalphone}_*"}> Numero opcional del prospecto</option>
                  <option value={"*_${prospect.product}_*"}> Producto del prospecto</option>
                </select>
              </label>
            </Grid>

            <Grid item xs={12} className="ctr_buttons">
              <Button variant="contained" className="btn_cancel" onClick={handleCloseEdit}>
                Cancelar
              </Button>
              <Button variant="contained" className="btn_upload" onClick={handleSubmit(handleUploadProspect)}>
                Guardar
              </Button>
            </Grid>
          </Grid>
        </div>
      </div>
      {Alert?.show && (
        <AlertGlobal severity={Alert.severity} message={Alert.message} show={Alert.show} type={Alert.type} />
      )}
    </DialogFullScreen>
  );
};

export default DrawerEditTemplate;

const DialogFullScreen = styled(Drawer)`
  p {
    margin: 0;
  }
  .MuiPaper-root.MuiDrawer-paper.MuiDrawer-paperAnchorRight.MuiPaper-elevation16 {
    width: 100%;
    background: #f3f3f3;
    min-height: 100vh;
    ::-webkit-scrollbar {
      width: 6px;
      height: 6px;
    }
    ::-webkit-scrollbar-track {
      -webkit-box-shadow: inset 0 0 6px rgb(166 164 164 / 20%);
    }
    ::-webkit-scrollbar-thumb {
      -webkit-box-shadow: inset 0 0 20px #585858;
    }
  }
  .ctr_edit {
    &__header {
      position: fixed;
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 10px 20px;
      height: 60px;
      background-color: #103c82;

      &__close {
        display: flex;
        align-items: center;
        .title {
          font-weight: bold;
          color: #fff;
          font-size: 20px;
        }
        .close {
          width: 30px;
          height: 30px;
          padding: 5px;
          background: rgba(255, 255, 255, 0.2);
          border-radius: 50%;
          color: #fff;
          margin-right: 10px;
          cursor: pointer;
        }
      }
      .btn_save {
        text-transform: capitalize;
        border-radius: 8px;
        background: rgba(255, 255, 255, 0.1);
        color: #fff;
      }
    }
    &__ctr_info {
      width: 100%;
      max-width: 1300px;
      margin: auto;
      padding: 20px;
      background: #fff;
      margin-top: 20px;
      margin-bottom: 20px;
      height: calc(100% - 100px);
      border-radius: 8px;
      box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
      &__title {
        display: flex;
        align-items: center;
        font-size: 20px;
        font-weight: 500;
        margin-bottom: 20px;

        svg {
          margin-right: 10px;
          width: 30px;
          height: 30px;
          padding: 5px;
          border-radius: 50%;
          background: rgba(16, 60, 130, 0.5);
          color: #fff;
        }
        span {
          font-weight: bold;
          color: #103c82;
          text-transform: capitalize;
          margin-left: 5px;
        }
      }

      .form {
        .ContentTitleandAlert {
          display: flex;
        }
        .container-tag {
          display: flex;
        }
        .item {
          display: flex;
          align-content: center;
          flex-direction: column;
          font-size: 15px;
          width: auto;
          padding: 5px 9px;
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
            min-height: 398px;
            resize: none;
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
            padding: 0.47rem 0.75rem;
            transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
            width: 100%;
            height: 38px;
          }
          .capitalize {
            text-transform: capitalize;
          }
          .inputComments {
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
            height: 25px;
          }
          input[type="number"]::-webkit-inner-spin-button,
          input[type="number"]::-webkit-outer-spin-button {
            -webkit-appearance: none;
            margin: 0;
          }

          input[type="number"] {
            -moz-appearance: textfield;
          }

          p {
            margin-bottom: 2px;
            font-size: 14px;
            margin-top: 5px;
            margin-bottom: 10px;
            font-weight: 600;
            letter-spacing: 1px;
            color: rgb(86 86 86);
          }
          strong {
            color: red;
          }
        }
        .ctr_buttons {
          display: flex;
          justify-content: end;
          margin-top: 20px;

          .btn_cancel {
            background: #0c203b;
            color: #fff;
            text-transform: capitalize;
            margin-right: 10px;
          }
          .btn_upload {
            background: #103c82;
            color: #fff;
            text-transform: capitalize;
          }
        }
        .point {
          width: 0;
          height: 0;
          border-top: 13px solid transparent;
          border-bottom: 13px solid transparent;
          border-right: 13px solid rgba(241, 113, 113, 0.9);
          height: 27px;
          float: left;
        }
      }
    }
  }
`;

const Error = styled.div`
  display: flex;
  align-items: center;
  font-size: 15px;
  color: #fff;
  background-color: rgba(241, 113, 113, 0.9);
  border-top-right-radius: 0.2rem;
  border-bottom-right-radius: 0.2rem;

  @media ${device.sm} {
    width: 40%;
  }
  height: 27px;
  ::before {
    display: inline;
  }
  svg {
    font-size: 18px;
  }
`;
