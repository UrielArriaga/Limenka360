import React, { useContext, useEffect, useState } from "react";
import usePagination from "../../../hooks/usePagination";
import useAlertToast from "../../../hooks/useAlertToast";
import { ShippingsOrdersServices } from "../services";
import { useRouter } from "next/router";
import { getColorStatusSHOPPINGORDER } from "../../../utils/DirLog";
import { useSelector } from "react-redux";
import { userSelector } from "../../../redux/slices/userSlice";
import useModal from "../../../hooks/useModal";
import { api } from "../../../services/api";
import { useDispatch } from "react-redux";
import dayjs from "dayjs";
import { handleGlobalAlert } from "../../../utils";

export default function useShippingOrders(activeFilters) {
  const { showAlertSucces, showAlertError } = useAlertToast();
  const { open: openModalGaranties, toggleModal: toggleModalGaranties, closeModal: closeModalGaranties } = useModal();
  const { roleId } = useSelector(userSelector);
  const { page, limit, handlePage } = usePagination({ defaultLimit: 20, defaultPage: 1 });
  const [orderBy, setOrderBy] = useState("-createdAt"); // se modifica el orderby a createdAt por que por proveedor lo muestra en asendente, el parametro anterior era *"provider.name"*.
  const [openModal, setOpenModal] = useState(false);
  const [keyword, setKeyword] = useState("");
  const [isOpenPreview, setIsOpenPreview] = useState(false);
  const [data, setData] = useState();
  const [orderSelected, setOrderSelected] = useState(null);
  const [totalOrders, setTotalOrders] = useState(0);
  const [isFetchingData, setIsFetchingData] = useState(true);
  const [rowSelected, setRowSelected] = useState([]);
  const [isValid, setIsValid] = useState(false);
  const [type, setType] = useState([]);
  const dispatch = useDispatch();
  const [dataProducts, setDataProducts] = useState({
    isFeching: false,
    data: [],
    count: 0,
  });
  const [articleSelected, setArticleSelected] = useState({});
  const {
    page: pageProduct,
    limit: limitProduct,
    handlePage: handlePageProduct,
  } = usePagination({ defaultLimit: 20, defaultPage: 1 });
  const router = useRouter();
  const folioParamUrl = router?.query?.folio;
  const ordersService = new ShippingsOrdersServices();

  useEffect(() => {
    if (rowSelected.length > 0) {
      const invalidIdentifiers = rowSelected.filter(item => item.identifier !== "borrador");

      if (invalidIdentifiers.length > 0) {
        showAlertError("Todos los elementos deben tener el identificador 'borrador'.");
        setIsValid(false); // No cumple con las condiciones
      } else if (rowSelected.length > 1) {
        const baseProveedor = rowSelected[0].proveedor;
        const hasDifferentProveedor = rowSelected.some(item => item.proveedor !== baseProveedor);

        if (hasDifferentProveedor) {
          showAlertError(
            "El último proveedor seleccionado no es el mismo que los anteriores. Asegúrate de que todos sean del mismo proveedor."
          );
          setIsValid(false);
        } else {
          setIsValid(true);
        }
      } else {
        setIsValid(true);
      }
    } else {
      setIsValid(false);
    }
  }, [rowSelected]);

  useEffect(() => {
    getData();
    getTypes();
  }, [page, orderBy, keyword, activeFilters, folioParamUrl]);

  useEffect(() => {
    if (orderSelected) {
      getProducts(orderSelected?.id);
    } else {
      return;
    }
  }, [orderSelected]);

  const getData = async removeKeyword => {
    try {
      setIsFetchingData(true);
      let query = {
        // este se comento por que no aparecian todas las ordenesde compra u diorector comprar puede ver todas, de lo contrario con la condicion el nactional esta en false
        // national: roleId === "compras" ? true : false,
      };

      if (activeFilters.length > 0) {
        activeFilters.forEach(element => {
          if (element.parent) {
            switch (element.parent) {
              case "draft":1
                query[element.parent] = element.value === "Mostrar Borradores" ? true : false;
                break;
              case "providers":
                query[element.valuedb] = element.value;
                break;
                case "national":
                  query[element.parent] = element.value === "national" ? true : false;  
                  break;
            }
          }
        });
      }
      if (!removeKeyword && keyword.length > 3) {
        query.folio = {
          $iRegexp: keyword.trim(),
        };
      }
      if (!removeKeyword && folioParamUrl) {
        query.folio = {
          $iRegexp: folioParamUrl,
        };
        setKeyword(folioParamUrl);
      }
      const response = await ordersService.getShippingsOrders(limit, page, orderBy, query);
      let results = response.data.results;
      let normalizeData = results.map(item => ordersService.normalizeDataOrdersShipping(item));
      setData(normalizeData);
      setTotalOrders(response?.data?.count);
      setIsFetchingData(false);
      if (folioParamUrl) {
        let purchase = normalizeData?.find(item => item.folio == folioParamUrl);
        handleOnClickRow(purchase);
      }
    } catch (error) {
      console.log(error);
      showAlertError("Ocurrio un error al obtener ordenes de compra");
      setIsFetchingData(false);
    }
  };
  const getTypes = async () => {
    try {
      let response = await api.get("/pendingstypes");
      setType(response.data.results);
      console.log("getTypes", response.data.results);
    } catch (error) {}
  };
  const getProducts = async id => {
    try {
      setDataProducts({ ...dataProducts, isFeching: true });
      let query = {
        purchaseorderId: id,
      };

      let response = await ordersService.getSupplies(limitProduct, pageProduct, query);
      let resultsProducts = response.data.results;
      let normalizeDataProducts = resultsProducts.map(item => ordersService.normalizeDataProduct(item));
      setDataProducts({ isFeching: false, data: normalizeDataProducts, count: response.data.count });
    } catch (error) {
      setDataProducts({ ...dataProducts, isFeching: false });
      console.log(error);
    }
  };
  const Normalize = item => {
    return {
      id: item.id,
    };
  };

  const UnifyOrders = async () => {
    let Objet = rowSelected[0];
    let NewArrayOrder = rowSelected.map(item => Normalize(item));
    try {
      let data = {
        paymentcondition: Objet.item.paymentcondition,
        phone: Objet.item.phone,
        observations: Objet.item.observations || "Sin observación",
        methoddelivery: Objet.item.methoddelivery,
        providerId: Objet.item.providerId,
        taxinformationId: Objet.item.taxinformationId,
        url: "",
        draft: false,
        national: false,
        provideraddressId: Objet.item.provideraddressId,
        deliveryDate: Objet.item.deliveryDate || new Date(),
        estimateddeliverydate: Objet.item.estimateddeliverydate,
        purchasesordersIds: NewArrayOrder,
      };

      const response = await api.put(`purchaseorders/joinpurchase/${Objet?.id}`, data);
      closeModalGaranties();
      setRowSelected([]);
      getData();
      console.log("-------RESPUESTA---------->", response);
    } catch (error) {
      console.log("-------ERRRRORRRRR---------->", error);
    }
  };

  const handleOnChangeKeyWord = e => setKeyword(e.target.value);

  const handleOnClickRow = item => {
    setIsOpenPreview(true);
    setOrderSelected(item);
  };

  const handleOnClickClosePreview = () => setIsOpenPreview(false);

  const deleteKeyWord = () => {
    getData(true);
    setKeyword("");
    delete router?.query;
    if (folioParamUrl) router.push("/directorcompras/ordenes");
  };

  const refetchData = () => getData();
  const handleOpenModal = () => {
    setOpenModal(true);
  };
  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const handleClickName = item => {
    router.push({
      pathname: "/directorcompras/ordenes/[orden]",
      query: {
        orden: item.id,
      },
    });
  };
  const postPending = async data => {
    try {
      let body = {
        notify_by: "Correo",
        remember_by: "Correo",
        remember: true,
        place: "",
        description: data.comment,
        subject: data.name,
        date_from: new Date(data.dateStart),
        date_to: null,
        isdone: true,
        status: 1,
        zone: "GMT-06:00",
        priority: 0,
        recurrent: false,
        postponedtime: new Date(data.dateEnd),
        pendingstypeId: data.typePendding?.id,
        purchaseorderId: orderSelected?.id,
      };

      const response = await ordersService.PendigsShopping(body);

      console.log("Evento creado", response);
      handleGlobalAlert("success", "Pendiente creado correctamente", "basic", dispatch);
    } catch (error) {
      console.log(error);
      handleGlobalAlert("warning", "No se pudo crear el pendiente", "basic", dispatch);
    }
  };

  let actions = [
    {
      name: "Ver",
      action: e => {
        handleOnClickRow(e);
      },
    },
    {
      name: "Editar",
      action: e =>
        router.push({
          pathname: `/directorcompras/ordenes/editarorden`,
          query: {
            o: e?.id,
          },
        }),
    },
  ];
  return {
    isOpenPreview,
    orderSelected,
    keyword,
    isFetchingData,
    orderBy,
    tableData: {
      heads,
      actions,
      data,
      customColumns,
    },
    paginationData: {
      handlePage,
      page,
      limit,
    },
    totalOrders,
    handleOpenModal,
    handleCloseModal,
    setOrderBy,
    handleOnClickRow,
    handleOnClickClosePreview,
    handleOnChangeKeyWord,
    deleteKeyWord,
    refetchData,
    postPending,
    dataProducts,
    articleSelected,
    setArticleSelected,
    UnifyOrders,
    rowSelected,
    setRowSelected,
    isValid,
    closeModalGaranties,
    toggleModalGaranties,
    openModalGaranties,
    openModal,
    type,
  };
}

let heads = [
  {
    headText: "Folio",
    headNormalize: "folio",
    orderby: null,
  },

  {
    headText: "Estatus Orden",
    headNormalize: "statuspoo",
    orderby: null,
  },

  {
    headText: "Proveedor",
    headNormalize: "proveedor",
    orderby: null,
  },
  {
    headText: "Condicion",
    headNormalize: "condicion",
    orderby: null,
  },
  {
    headText: "Telefono",
    headNormalize: "telefono",
    orderby: null,
  },
  {
    headText: "Observaciones",
    headNormalize: "observaciones",
    orderby: null,
  },
  {
    headText: "Metodo de entrega",
    headNormalize: "metodo de entrega",
    orderby: null,
  },
  {
    headText: "Fecha de creacion",
    headNormalize: "fecha de creacion",
    orderby: null,
  },
];

const customColumns = {
  folio: {
    columname: "folio",
    component: item => {
      return (
        <div className="TableName">
          <p
            className="name"
            style={{
              color: "#034D6F",
              fontWeight: "bold",
            }}
          >
            {item.folio}
          </p>
          {/* {console.log("iotem", item)} */}
          {item?.item?.draft && <span className="badge">Borrador</span>}
          {item?.item?.national && (
            <span className="badge" style={{ background: "#6D83FE" }}>
              Nacional
            </span>
          )}
        </div>
      );
    },
  },

  statuspoo: {
    columname: "Estatus",
    component: item => {
      return (
        <div
          className="TableName"
          style={{
            display: "inline-block",
            padding: "2px 10px",
            borderRadius: 15,
            background: getColorStatusSHOPPINGORDER(item.statuspoo).bgColor,
          }}
        >
          <p
            className="name"
            style={{
              color: getColorStatusSHOPPINGORDER(item.statuspoo).color,
            }}
            onClick={() => {}}
          >
            {item.statuspoo}
          </p>
        </div>
      );
    },
  },
};
