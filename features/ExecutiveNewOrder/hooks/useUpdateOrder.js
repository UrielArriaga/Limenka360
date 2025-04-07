import dayjs from "dayjs";
import { useRouter } from "next/router";
import { useContext, useState } from "react";
import { useSelector } from "react-redux";
import useAlertToast from "../../../hooks/useAlertToast";
import { userSelector } from "../../../redux/slices/userSlice";
import { api, URL_SPACE } from "../../../services/api";
import { makeTemplateOrderUpdate } from "../../../templates/makeTemplate";
import { validateChildProducts, validateFiles, validateOrderData } from "../helpers/validations";
import { EditOrderService } from "../services";
import { NormalizeDataOrder } from "../services/normalizeData";
import { saveAs } from "file-saver";
import useSaveError from "../../../hooks/useSaveError";
import { generateTemporalId } from "../../../utils";
import { SocketContext } from "../../../context/socketContext";
import useNotifications from "../../../hooks/useNotifications";
import { typeSockets } from "../../../constants";

export default function useUpdateOrder(formControls, productsData, filesData, orderData, oportunity) {
  const router = useRouter();
  const { socket, online } = useContext(SocketContext);
  const { pushNotification } = useNotifications();

  const { saveError } = useSaveError();
  const { userData, roleId, company, groupId, id_user } = useSelector(userSelector);
  const orderService = new EditOrderService();
  const normalizeMethods = new NormalizeDataOrder();
  const { showAlertError, showAlertSucces } = useAlertToast();
  const [isCreatingOrder, setIsCreatingOrder] = useState(false);

  const saveDocument = async (fileData, orderId) => {
    let bodyfile = {
      url: fileData.url,
      name: fileData.name,
      filestypeId: fileData.filestypeId,
      fileextension: fileData.fileextension,
      orderId: orderId,
      size: fileData.size,
    };

    return await api.post(`documents`, bodyfile);
  };

  const uploadFile = async (file, orderId) => {
    const newData = new FormData();
    newData.append("name", file.file?.name);
    newData.append("file", file.file);

    return await api.post(`files/uploadtofolder/${orderId}/archivopedido-${file?.name}`, newData);
  };

  const createOrder = async data => {
    let response = makeTemplateOrderUpdate(data);
    const form = new FormData();
    form.append("name", data?.concept);
    form.append("data", response);
    form.append("company", company);
    form.append("group", groupId);
    form.append("ejecutive", userData?.id);
    return await api.post("convert/pdf", form);
  };

  const onSubmit = async data => {
    try {
      const formData = formControls.getValues();
      let products = [];
      productsData.results.forEach(product => {
        products.push(product);
        product.productslocal.forEach(productlocal => {
          products.push(productlocal);
        });
      });

      let orderDataPut = normalizeMethods.normalizeOrderPost(
        formData.order,
        formData.address,
        formData.billing,
        formControls.shippingOrder,
        products,
        formData,
        formControls.requireBilling,
        oportunity,
        userData
      );

      let isValid = validateOrderData(orderDataPut, formControls.requireBilling, showAlertError);

      let isValidFiles = validateFiles(filesData?.results, showAlertError);

      let isValidProducts = validateChildProducts(productsData.results, showAlertError);

      if (!isValidFiles || !isValidProducts || !isValid) {
        return;
      }

      setIsCreatingOrder(true);

      const files = filesData?.results;

      let newFiles = files?.filter(x => x?.isNew);

      let productsToPdf = [];

      console.log(productsData.results);

      productsData.results.forEach(productOportunity => {
        let newProduct = productOportunity;

        let newLocalProducts = productOportunity.productslocal.filter(e => !e.isDeleted);
        newProduct.productslocal = newLocalProducts;

        productsToPdf.push(newProduct);
      });

      console.log(productsToPdf);

      // return;

      const today = dayjs().format("DD-MM-YYYY");
      const ejecutive = normalizeMethods.formatEjecutive(roleId, userData, formData, orderData);
      const resUpdateData = await api.post(`orders/alldata`, orderDataPut);

      showAlertSucces("Pedido actualizado correctamente");

      console.log(productsData.results);

      const finalDataPdf = normalizeMethods.prepareData(
        today,
        company,
        ejecutive,
        formData,
        orderData,
        formControls.requireBilling,
        userData,
        productsToPdf,
        resUpdateData,
        oportunity
      );
      finalDataPdf.concept = resUpdateData?.data?.orderData?.folio;

      try {
        let resp = await Promise.all(
          newFiles.map(async file => {
            try {
              let response = await uploadFile(file, resUpdateData?.data?.orderData?.id);
              let data = response.data;

              return await saveDocument(
                {
                  url: data.url,
                  name: file.name,
                  filestypeId: file.filestypeId,
                  fileextension: file.fileextension,
                  size: file.size,
                },
                resUpdateData?.data?.orderData?.id
              );
            } catch (error) {
              saveError(error, null, "useUpdateOrderFiles");
              console.error(`Error al procesar el archivo ${file.name}:`, error);
              return null;
            }
          })
        );
      } catch (error) {}

      const response = await createOrder(finalDataPdf);

      try {
        let responsePDFSAVE = await api.post(
          "convert/pdfbuffer",
          {
            pdfurl: URL_SPACE + response.data.url,
          },
          {
            responseType: "blob",
          }
        );

        const pdfBlob = new Blob([responsePDFSAVE.data], {
          type: "application/pdf;charset=utf-8",
        });

        saveAs(pdfBlob, `${finalDataPdf.concept}.pdf`);
      } catch (error) {
        saveError(error, null, "convert/pdfbuffer-neworder");
      }

      const dataUrl = { url: response?.data?.url };
      try {
        await api.put(`orders/${resUpdateData?.data?.orderData?.id}`, dataUrl);
      } catch (error) {
        console.error("Error al actualizar la URL del pedido:", error);
      }
      router.push("/pedidos");

      socket?.emit("send_notifyorder_individual", {
        id_user,
        companyId: company,
        idOrder: resUpdateData?.data?.orderData?.id,
        approved: false,
      });

      setIsCreatingOrder(false);

      pushNotification(typeSockets.new_order.value, {
        orderId: orderData.id,
        folio: orderData.folio,
      });
    } catch (error) {
      console.log(error);

      return;
      let idError = "ERROR-" + generateTemporalId(5);

      showAlertError(`Error al procesar la información ${idError}`);
      saveError(error, idError, "useUpdateOrder");
      setIsCreatingOrder(false);
    }
  };

  const handleSaveChangesOrder = () => {
    formControls.handleSubmit(onSubmit)();
  };

  return {
    handleSaveChangesOrder,
    isCreatingOrder,
  };
}
