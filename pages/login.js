import { useRouter } from "next/router";
import React, { useState, useEffect, useRef, useContext } from "react";
import { LoginStyled } from "../styles/iniciosesion";
import { useForm } from "react-hook-form";
import { toast, ToastContainer } from "react-toastify";
import { api } from "../services/api";
import { Grain } from "@material-ui/icons";
import { useDispatch, useSelector } from "react-redux";
import { login, userSelector } from "../redux/slices/userSlice";
import { RedirectPage } from "../utils";
import "react-toastify/dist/ReactToastify.css";
import { Dialog } from "@material-ui/core";
import { DialogAlert } from "../styles/Herramientas/metas.styles";

export default function Login() {
  const {
    register,
    handleSubmit,
    watch,
    trigger,
    formState: { errors },
  } = useForm();
  const router = useRouter();
  const toastRef = useRef(null);
  const [isLoading, setLoading] = useState(false);
  const [openAlert, setOpenAlert] = useState(false);
  const [infoAlert, setInfoAlert] = useState({ title: "", message: "" });
  const dispatch = useDispatch();
  const { isFetching, isSuccess, isError, roleId, email, isLogged_User } =
    useSelector(userSelector);
  console.log("asdasdasd", errors);
  useEffect(() => {
    if (isError) {
    }
    if (isSuccess) {
    }
    console.table({
      isLogged_User: isLogged_User,
      isFetching: isFetching,
    });
    if (isLogged_User === false && isFetching === true) {
      console.log("validando login");
      return;
    }
    if (isLogged_User === false && isFetching === false) {
      console.log("No logeado");
    }

    if (isLogged_User === true && isFetching === false) {
      console.log("succes loading");
      RedirectPage(roleId, router);
    }
  }, [isFetching, isLogged_User]);

  const handleOpenAlert = (title, message) => {
    setInfoAlert({ title, message });
    setOpenAlert(true);
  };
  const handleAlertClose = () => {
    setOpenAlert(false);
  };
  const handleLogin = async (data) => {
    try {
      setLoading(true);
      const { email, password } = data;
      const body = { email: email.trim(), password };
      const responseLogin = await api.post("auth/login", body);
      const {
        _id,
        name,
        lastname,
        role,
        group,
        groupId,
        phone,
        type,
        username,
      } = responseLogin.data.data;
      const { tokenSession, refreshToken } = responseLogin.data;

      dispatch(login(responseLogin.data));
      api.defaults.headers.common["Authorization"] =
        responseLogin.data.tokenSession;

      localStorage.setItem("token", responseLogin.data.tokenSession);
      setLoading(false);
    } catch (error) {
      switch (error?.response?.data?.internalCode) {
        case "00001":
          toast.error("El correo o usuario no existe", {
            position: toast.POSITION.TOP_RIGHT,
          });
          setLoading(false);
          break;
        case "10002":
          toast.error("Correo o contraseña incorrecta", {
            position: toast.POSITION.TOP_RIGHT,
          });
          setLoading(false);
          break;
        default:
          toast.error("Ocurrió algún problema, intentalo mas tarde", {
            position: toast.POSITION.TOP_RIGHT,
          });
          setLoading(false);
          break;
      }
    }
  };

  return (
    <LoginStyled>
      <div className="login_container">
        <div className="login_container__form_side">
          <div className="login_container__form_side__topnav">
            <Grain />
            <p>
              CRM <span>plataform</span>
            </p>
          </div>

          <div className="login_container__form_side__content">
            <form
              onSubmit={handleSubmit(handleLogin)}
              className="login_container__form_side__content__container"
            >
              <p className="title">Inciar sesión</p>
              <p className="subtitle">
                Bienvenido a <span>Limenka360</span>, Gestiona las relaciones
                con tus clientes
              </p>
              <div className="input_item">
                <div className="input_item__label">
                  <p className="input_item__label__labeltxt">E-mail</p>
                </div>
                <div className="input_item__input">
                  <input
                    {...register("email", { required: "Email requiered" })}
                    className="input_item__input__field"
                    type="text"
                    placeholder="micorreo@empresa.com"
                  />
                  {errors?.email && (
                    <span className="input_item__input__error">
                      {errors?.email?.message}
                    </span>
                  )}
                </div>
              </div>
              <div className="input_item">
                <div className="input_item__label ">
                  <p className="input_item__label__labeltxt">Contraseña</p>
                  <span className="input_item__input__error"> </span>
                </div>
                <div className="input_item__input">
                  <input
                    {...register("password", {
                      required: "Password requiered",
                    })}
                    type="password"
                    className="input_item__input__field"
                    placeholder="password_123"
                  />
                  {errors?.password && (
                    <span className="input_item__input__error">
                      {errors?.password?.message}
                    </span>
                  )}
                </div>
              </div>
              <div className="forgot_password">
                <p
                  onClick={() =>
                    handleOpenAlert(
                      "Forgot Password",
                      "Contact support to change your password"
                    )
                  }
                >
                  ¿Olvidaste tu contraseña?
                </p>
              </div>
              <div className="divider" />
              <div className="actionlogin">
                <button type="submit">{isLoading ? "Loading" : "Login"}</button>
              </div>
              <div className="donthaveaccount">
                <p>
                  ¿No tienes cuenta?{" "}
                  <span
                    onClick={() =>
                      handleOpenAlert(
                        "Don't have an account?",
                        "Contact your manager"
                      )
                    }
                  >
                    Habla con tu gerente
                  </span>
                </p>
              </div>
            </form>
          </div>
        </div>
        <div className="login_container__info_side">
          <div className="login_container__info_side__content">
            <div className="login_container__info_side__content__images">
              <div className="shadow1"></div>
              <div className="shadow2"></div>
              <div className="shadow3"></div>
              {/* <img src="/login_image.jpeg" alt="" /> */}
            </div>
            <p>Manage relationships with customers</p>
          </div>
        </div>
      </div>

      <Dialog
        open={openAlert}
        onClose={handleAlertClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogAlert>
          <p className="title">{infoAlert.title}</p>
          <p className="message">{infoAlert.message}</p>
          <div className="buttons">
            <button className="buttons__accept" onClick={handleAlertClose}>
              Aceptar
            </button>
          </div>
        </DialogAlert>
      </Dialog>
      <ToastContainer ref={toastRef} />
    </LoginStyled>
  );
}
