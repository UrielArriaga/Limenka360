import React, { useEffect, useState } from "react";
import { api } from "../services/api";
import { Skeleton } from "@mui/material";
import dayjs from "dayjs";
import NumberFormat from "react-number-format";
import { generateTemporalId, handleGlobalAlert } from "../utils";
import { EntitiesLocal } from "../BD/databd";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { userSelector } from "../redux/slices/userSlice";
import { renderTemplateDemo } from "../templates";
import { URL_SPACE } from "../services/api";
import { saveAs } from "file-saver";
export default function useNewDemo(idOportunity) {
  const router = useRouter();
  const dispatch = useDispatch();
  const [oportunity, setOportunity] = useState({});
  const [executive, setExecutive] = useState({});
  const [cities, setCities] = useState([]);
  const [settlements, setSettlemets] = useState([]);
  const [products, setProducts] = useState([]);
  const [openAddProduct, setOpenAddProduct] = useState(false);
  const [loadData, setLoadData] = useState(false);
  const [seeMore, setSeeMore] = useState(false);
  const [isCreatingDemo, setIsCreatingDemo] = useState(false);
  const { id_user, roleId, userData, company, groupId } = useSelector(userSelector);
  const [openPreviewModal, setOpenPreviewModal] = useState(false);
  const [DataTemplateNormalize, setDataTemplateNormalize] = useState({});
  const [statusDemo, setStatusDemo] = useState();
console.log("---------------------------->",statusDemo,"statusssssDemo");

  const {
    setValue,
    handleSubmit,
    register,
    control,
    clearErrors,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    setValue("executive", userData.name);
    setValue("business_sphere", userData.groupName);
  }, []);

  useEffect(() => {
    handleGetDataOportunity();
    handleGetProductsOportunity();
    orderstatus();
  }, []);
  useEffect(() => {}, [openPreviewModal]);

  const handleGetDataOportunity = async () => {
    setLoadData(true);
    try {
      let params = {
        include:
          "prospect,prospect.ejecutive,prospect.origin,prospect.category,prospect.phase,prospect.clienttype,prospect.channel,phase",
      };
      let response = await api.get(`oportunities/${idOportunity}`, { params });
      let oportunity = response.data || {};
      setOportunity(oportunity);
      handleGetDataExecutive(oportunity?.prospect?.ejecutiveId);
      setLoadData(false);
    } catch (error) {
      setLoadData(false);
      console.log(error);
    }
  };
  const handleGetDataExecutive = async idExecutive => {
    try {
      let params = {
        include: "group",
      };
      let response = await api.get(`ejecutives/${idExecutive}`, { params });
      let executive = response.data || {};
    } catch (error) {
      console.log(error);
    }
  };
  const handleGetProductsOportunity = async () => {
    try {
      let query = {
        oportunityId: idOportunity,
      };
      let params = {
        where: JSON.stringify(query),
        include: "product",
      };
      let response = await api.get("productsoportunities", { params });
      let products = normalizeProducts(response.data.results) || [];
      setProducts(products);
    } catch (error) {
      console.log(error);
    }
  };
  const handleEditProduct = (value, identifier, position) => {
    let copyProducts = [...products];
    copyProducts[position][identifier] = value;
    setProducts(copyProducts);
  };
  const handleAddProduct = product => {
    let copyProducts = [...products];
    copyProducts.push(product);
    setProducts(copyProducts);
  };
  const handleDeleteProduct = idProd => {
    let copyProducts = [...products];
    let deleteProduct = copyProducts.filter(item => item.id !== idProd);
    setProducts(deleteProduct);
  };
  const normalizeProducts = products => {
    let normalize = products.map(item => ({
      id: generateTemporalId(5),
      model: item.product.code,
      description: item.product.name,
      quantity: item.quantity,
      serial: "",
    }));
    return normalize;
  };
  const validateData = (data, typeOf) => {
    if (loadData) return <Skeleton animation="wave" />;
    if (data) {
      switch (typeOf) {
        case "date":
          return dayjs(data).format("MMMM D, YYYY");
        case "money":
          return <NumberFormat className="data" value={data} displayType="text" thousandSeparator="," prefix="$" />;
        default:
          return data;
      }
    } else {
      return <>N/A</>;
    }
  };
  const handlePostalCode = async postal => {
    if (postal.length < 5) return;
    try {
      let query = {
        postal_code: postal,
      };
      let params = {
        where: JSON.stringify(query),
        all: 1,
      };

      let response = await api.get("postals", { params });
      let postals = response.data.results || [];
      setSettlemets(postals);
      let singlePostal = postals.length > 0 ? postals[0] : {};
      if (singlePostal.cityId) {
        getCityPostal(singlePostal);
      } else {
        handleHooks(["address.entity", "address.city"], true);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const getCityPostal = async postal => {
    if (!postal) return;
    try {
      let response = await api.get(`cities/${postal.cityId}`);
      let city = response.data || null;
      if (city) {
        let entity = EntitiesLocal.find(item => item.id === city.entityId);
        handleHooks(
          [
            { name: "address.entity", value: entity },
            { name: "address.city", value: city },
          ],
          false
        );
        getOptionsCities(false, entity);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const getOptionsCities = async (isHandle, entity) => {
    if (!entity.id) return;
    try {
      let query = {
        entityId: entity.id,
      };
      let params = {
        where: JSON.stringify(query),
        all: 1,
      };
      let response = await api.get("cities", { params });
      let cities = response.data.results;
      if (isHandle) {
        handleHooks(["address.postal", "address.city"], true);
        handleHooks([{ name: "address.entity", value: entity }], false);
        setCities([]);
      }
      setCities(cities);
    } catch (error) {
      console.log(error);
    }
  };
  const handleCityPostal = async city => {
    try {
      let query = {
        cityId: city.id,
      };
      let params = {
        where: JSON.stringify(query),
        all: 1,
      };
      let response = await api.get("postals", { params });
      let postal = response.data.results;
      if (postal.length > 0) {
        handleHooks([{ name: "address.postal", value: postal[0].postal_code }]);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleHooks = (nameHooks, clean) => {
    for (let i = 0; i < nameHooks.length; i++) {
      if (clean) {
        setValue(nameHooks[i], "");
      } else {
        clearErrors(nameHooks[i].name);
        setValue(nameHooks[i].name, nameHooks[i].value);
      }
    }
  };

  const orderstatus = async () => {
    try {
      let response = await api.get(`orderstatus`);
      let demo = response.data.results;
      console.log();
      
      setStatusDemo(demo);
    } catch (error) {
      console.log(error);
    }
  };

  const handleCreateDemo = async formData => {
    const NomrmalizeDataTemplate = formData => {
      return {
        dateActuality: dayjs(formData.time).format("DD/MMM/YYYY"),
        ejecutive: formData.executive, //EJECUTIVO
        sphere: formData.business_sphere, // ESFERA
        instructor: formData.instructor,
        customer: formData.client, // cliente
        demonstrationPlace: `${formData.address.city.name},${formData.address.entity.name}`, //lugar
        demoDate: dayjs(formData.time).format("DD/MMM/YYYY"), //fehca
        hoursDate: dayjs(formData.time).format("H:mm:ss A"), // hora
        assignedUnit: formData.unityassign, // unidad asignada
        phonoCustomer: formData.phone, // numero Cliente
        travelExpenses: formData.travel_expenses, // viativos
        products: products,
        document: {
          ine: "-",
          proffaddress: "-",
          cedula: "-",
          typleCustomer: "-",
          closingcertainty: "-",
        },
      };
    };

    let dato = NomrmalizeDataTemplate(formData);
    setDataTemplateNormalize(dato);
    // handleModalPreviewDemo();

    setIsCreatingDemo(true);
    try {
      let bodyDemo = await normalizeForm(formData);
      let response = await api.post("demosales", bodyDemo);
      router.push({
        pathname: `/demos`,
      });
      handleGlobalAlert("success", "Se creo Correctamente la Demo", "basic", dispatch, 6000);
      generatePDF();
    } catch (error) {
      setIsCreatingDemo(false);
      console.log(error);
      handleGlobalAlert("error", "Error Al Crear la Demo", "basic", dispatch, 6000);
    }
  };


  const generatePDF = async datapdf => {
    try {
      let user = id_user;
      let group = userData.groupId;
      let response = renderTemplateDemo(datapdf);
      let company = userData.companyId;
      const form = new FormData();
      form.append("name", "FormatoDemo");
      form.append("data", response);
      form.append("company", company);
      form.append("group", group);
      form.append("ejecutive", user);
      let dataresults = await api.post(`convert/pdf`, form);

      let responsePDFSAVE = await api
        .post(
          "convert/pdfbuffer",
          {
            pdfurl: URL_SPACE + dataresults.data.url,
          },
          {
            responseType: "blob",
          }
        )
        .catch(() => {
          alert("PEE-PF1");
        });

      const pdfBlob = new Blob([responsePDFSAVE.data], {
        type: "application/pdf;charset=utf-8",
      });
      saveAs(pdfBlob, `FormatoDemo.pdf`);
    } catch (error) {
      console.log(error, "ERROR NO HAY PDF");
    }
  };

  const normalizeForm = async formData => {
    return {
      date: formData.time,
      dessignatedunit: formData?.unityassign,
      expensebudget: Number(parseFloat(formData?.travel_expenses.replace(/[^\d.]/g, "")).toFixed(2)),
      assignedinstructor: formData.instructor,
      oportunityId: idOportunity,
      addressId: await handleCreateAddress(formData.address),
      orderstatusId: statusDemo[2]?.id,
    };
  };

  const handleCreateAddress = async addressData => {
    try {
      let bodyAddress = {
        street: addressData.street,
        int_number: addressData.no_int,
        ext_number: addressData.no_ext,
        settlement: addressData.settlement.settlement,
        references: addressData.references,
        postalId: addressData.settlement.id,
        cityId: addressData.city.id,
        entityId: addressData.entity.id,
      };
      let response = await api.post("addresses", bodyAddress);
      let address = response.data || {};
      return address.id;
    } catch (error) {
      setIsCreatingDemo(false);
      console.log(error);
      handleGlobalAlert("error", "Error Al Guardar la Dirección", "basic", dispatch, 6000);
    }
  };

  const handleProof = async () => {
    try {
      let response = await api.get("postals");
      console.log("respuesta", response);
    } catch (error) {
      console.log(error);
    }
  };
  const handleModalPreviewDemo = () => {
    setOpenPreviewModal(true);
  };
  const CloseModalPreview = () => {
    setOpenPreviewModal(!openPreviewModal);
  };

  const handleOpenAddProduct = () => setOpenAddProduct(true);
  const handleCloseAddProduct = () => setOpenAddProduct(false);
  const handleSeeMore = () => setSeeMore(!seeMore);
  return {
    oportunity,
    seeMore,
    products,
    EntitiesLocal,
    cities,
    settlements,
    isCreatingDemo,
    openAddProduct,
    validateData,
    getOptionsCities,
    handleSeeMore,
    handleEditProduct,
    handleAddProduct,
    handleDeleteProduct,
    handleOpenAddProduct,
    handleCloseAddProduct,
    handleCreateDemo,
    handlePostalCode,
    handleCityPostal,
    handleProof,
    setValue,
    handleSubmit,
    register,
    control,
    errors,
    openPreviewModal,
    CloseModalPreview,
    DataTemplateNormalize,
    handleModalPreviewDemo,
  };
}
