import { Modal } from "@material-ui/core";
import AlertGlobal from "../../../../components/Alerts/AlertGlobal";
import { useForm } from "react-hook-form";

export default function ModalStock() {
    const [open, setOpen] = useState(false);
    const [Alert, setAlert] = useState({ severity: null, show: null, message: "", type: null });
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const handledatainventory = async (formData, e) => {
        try {
            let totalstoks = {};
            let id_stoks = stockEdit?.stocks?.id;
            totalstoks.productId = stockEdit.id;
            totalstoks.total = formData.total;

            if (stockEdit?.stocks?.total !== null) {
                let stockEdit = await api.put(`stocks/${id_stoks}`, totalstoks);
                if (stockEdit.status == 200) {
                    handleAlert("success", "Se modifico correctamente", "basic", setAlert);
                    setFlag(!flag);
                    setOpen(false);
                }
            } else {
                let stockNew = await api.post("stocks", totalstoks);
                if (stockNew.status == 201) {
                    handleAlert("success", "Se modifico correctamente", "basic", setAlert);
                    setFlag(!flag);
                    setOpen(false);
                }
            }
        } catch (error) {
            handleAlert("error", `Error al modificar!`, "basic");
            console.log(error);
        }
    };

    const showStock = () => {
        stockEdit?.stocks?.total !== null ? <span>{stockEdit?.stocks?.total}</span> : <span>0</span>;
    };

    return (
        <>
            <Modal
                open={open}
                style={{ display: "flex", justifyContent: "center", alignItems: "center" }}
                onClose={handleActions.handleClose}
            >
                <ModalStock>
                    <p className="title" Producto>
                        {stockEdit?.name}
                    </p>
                    <p className="stocks">
                        <strong>Existencia Actual : </strong>
                        {showStock()}
                    </p>
                    <form onSubmit={handleSubmit(handledatainventory)}>
                        <input className="input" {...register("total")} placeholder="Ingresa la cantidad a cambiar" />
                        <button className="btn-save">Guardar</button>
                    </form>
                </ModalStock>
            </Modal>
            {Alert?.show && (
                <AlertGlobal severity={Alert.severity} message={Alert.message} show={Alert.show} type={Alert.type} />
            )}
        </>
    );
}