import dayjs from "dayjs";
import { useRouter } from "next/router";
import { useState } from "react";
import { useSelector } from "react-redux";
import useAlertToast from "../../../hooks/useAlertToast";
import { userSelector } from "../../../redux/slices/userSlice";
import { api, URL_SPACE } from "../../../services/api";
import { makeTemplateOrderUpdate } from "../../../templates/makeTemplate";
import { validateFiles, validateOrderData } from "../helpers/validations";
import { EditOrderService } from "../services";
import { NormalizeDataOrder } from "../services/normalizeData";
import { saveAs } from "file-saver";
import useSaveError from "../../../hooks/useSaveError";
import { generateTemporalId } from "../../../utils";
import { validateChildProducts } from "../../ExecutiveNewOrder/helpers/validations";
import useNotifications from "../../../hooks/useNotifications";
import { typeSockets } from "../../../constants";

export default function useUpdateOrder(formControls, productsData, filesData, orderData) {
  const router = useRouter();
  const { version = "v1" } = router.query;

  const { pushNotification } = useNotifications();

  const { userData, roleId, company, groupId } = useSelector(userSelector);
  const orderService = new EditOrderService();
  const normalizeMethods = new NormalizeDataOrder();
  const { showAlertError, showAlertSucces } = useAlertToast();
  const [isCreatingOrder, setIsCreatingOrder] = useState(false);

  const { saveError } = useSaveError();

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
    return await api.post(`files/uploadtofolder/${orderData.id}/archivopedido${file?.name}`, newData);
  };

  const updateFile = async (id, fileData) => {
    let bodyfile = {
      name: fileData.name,
      filestypeId: fileData.filestypeId,
      fileextension: fileData.fileextension,
    };

    return await api.put(`documents/${id}`, bodyfile);
  };

  const createOrder = async data => {
    let response = makeTemplateOrderUpdate(data);

    console.log(response);
    const form = new FormData();
    form.append("name", orderData.folio);
    form.append("data", response);
    form.append("company", company);
    form.append("group", groupId);
    form.append("ejecutive", userData?.id);
    return await api.post("convert/pdf", form);
  };

  const onSubmit = async data => {
    try {
      setIsCreatingOrder(true);
      const formData = formControls.getValues();
      let products = [];
      productsData.results.forEach(product => {
        products.push(product);
        product.productslocal.forEach(productlocal => {
          products.push(productlocal);
        });
      });

      let orderDataPut = normalizeMethods.normalizeOrderPut(
        formData.order,
        formData.address,
        formData.billing,
        formControls.shippingOrder,
        products,
        orderData,
        formData,
        formControls.requireBilling
      );

      let isValid = validateOrderData(orderDataPut, formControls.requireBilling, showAlertError);

      let isValidFiles = validateFiles(filesData.results, showAlertError);

      let isValidProducts = validateChildProducts(productsData.results, showAlertError);

      if (!isValidFiles || !isValidProducts || !isValid) {
        return;
      }

      // TODOD UPLOAD AND UPDATE FILES

      const files = filesData.results;

      let newFiles = files?.filter(x => x.isNew);
      let filesToUpdate = files?.filter(x => x.isChanged && !x.isNew);

      try {
        let resp = await Promise.all(
          newFiles.map(async file => {
            try {
              let response = await uploadFile(file, orderData.id);
              let data = response.data;

              return await saveDocument(
                {
                  url: data.url,
                  name: file.name,
                  filestypeId: file.filestypeId,
                  fileextension: file.fileextension,
                  size: file.size,
                },
                orderData.id
              );
            } catch (error) {
              console.error(`Error al procesar el archivo ${file.name}:`, error);
              return null;
            }
          })
        );
        let respUpdate = await Promise.all(
          filesToUpdate.map(async file => {
            return await updateFile(file.id, file);
          })
        );
      } catch (error) {}

      let productsToPdf = [];

      console.log(productsData.results);

      productsData.results.forEach(productOportunity => {
        let newProduct = productOportunity;

        let newLocalProducts = productOportunity.productslocal.filter(e => !e.isDeleted);
        newProduct.productslocal = newLocalProducts;

        productsToPdf.push(newProduct);
      });

      console.log(productsToPdf);

      const today = dayjs().format("DD-MM-YYYY");

      const ejecutive = normalizeMethods.formatEjecutive(roleId, userData, formData, orderData);

      const finalDataPdf = normalizeMethods.prepareData(
        today,
        company,
        ejecutive,
        formData,
        orderData,
        formControls.requireBilling,
        userData,
        productsToPdf
      );

      const response = await createOrder(finalDataPdf);

      const resUpdateData = await api.put(`orders/alldata/${orderData.id}`, orderDataPut);
      showAlertSucces("Pedido actualizado correctamente");

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

        saveAs(pdfBlob, `${orderData.folio}.pdf`);

        router.push(`/ejecutivo/pedidos/${version}`);

        pushNotification(typeSockets.new_order_edit.value, {
          orderId: orderData.id,
          folio: orderData.folio,
        });
      } catch (error) {}
      setIsCreatingOrder(false);
    } catch (error) {
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
  };
}
