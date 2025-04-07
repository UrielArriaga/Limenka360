import { useSelector } from "react-redux";
import { api } from "../../../../services/api";
import { userSelector } from "../../../../redux/slices/userSlice";


export function NewTemplate() {
  const { id_user, groupId, company } = useSelector(userSelector);
  const [mensaje, setMensaje] = useState("");
  const [showAll, setShowAll] = useState(false);
  const [Alert, setAlert] = useState({ severity: null, show: null, message: "", type: null });
 }


  export const createData = async (formData, e) => {
    try {
      setAlert({ severity: "info", show: true, message: "Un momento - Creando plantilla", type: "load" });
      let body = {};
      body.description = formData.description.toLocaleLowerCase();
      body.type = formData.type.toLocaleLowerCase();
      body.share = formData.share;
      body.message = mensaje;
      body.createdbyId = id_user;

      if (formData.share === "0") {
        body.ejecutiveId = id_user;
        body.groupId = "";
        body.companyId = "";
      }

      if (formData.share === "1") {
        body.groupId = groupId;
        body.ejecutiveId = "";
        body.companyId = "";
      }
      if (formData.share === "2") {
        body.groupId = "";
        body.ejecutiveId = "";
        body.companyId = company;
      }

      console.log(body);
      let plantillanew = await api.post("templates", body);
      if (plantillanew.status == 201) {
        handleAlert("success", "Plantilla - ¡Agregada correctamente!", "basic");
        // console.log(plantillanew.status);
        setTimeout(() => {
          router.push("../plantillas");
        }, 2000);
      }
    } catch (err) {
      switch (err.request?.status) {
        case 401:
          return handleAlert("error", "Plantilla - ¡No cuentas con las credenciales!", "basic");
        case 403:
          return handleAlert("error", "Plantilla - ¡No tienes permisos!", "basic");
        case 404:
          return handleAlert("error", "Plantilla - ¡Ruta no encontrada!", "basic");

        default:
          return handleAlert("error", "Plantilla - ¡Error al cargar los datos!", "basic");
      }
    }
  };

  export const handleAlert = (severity, message, type) => {
    setAlert({ severity: severity, show: true, message: message, type: type });
    setTimeout(() => {
      setAlert({ severity: severity, show: false, message: message, type: null });
    }, 3000);
  };

 
