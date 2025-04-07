import React, { useEffect, useState, useContext } from "react";
import NavBarDashboard from "../../components/NavBarDashboard";
import { LinearProgress, Box } from "@material-ui/core";
import { People, Cached } from "@material-ui/icons";
import SideBar from "../../components/SideBar";
import TableComponent from "../../components/TableOrders";
import CompleteOrder from "./completeOrder";
import Router, { useRouter } from "next/router";
import { normalizeTableDataOrdersShopping } from "../../utils/normalizeData";
import Filters from "../../components/Filters";
import DataOrder from "../../components/DataOrder";
import { api } from "../../services/api";
import { CommonFiltersContext } from "../../context/commonFiltersContext";
import DrawerPursaches from "../../components/DrawerPreviewPursaches";
import Chips from "../../components/ChipsFilters";
import SearchBox from "../../components/SearchBox";
import PaginationDirector from "../../components/UI/molecules/PaginationTable";
import usePagination from "../../hooks/usePagination";
import Head from "next/head";
import { OrdersStyled } from "../../styles/Compras/pedidos/styles";
import VerifyOrder from "../../components/ModalVerifyOrder";
import useModal from "../../hooks/useModal";
import { handleGlobalAlert } from "../../utils";
import { useDispatch } from "react-redux";
import RemoveVerifyOrder from "../../components/ModalRemoveVerifiedOrder";
import MainLayout from "../../components/MainLayout";
export default function Pedidos() {
  const router = useRouter();
  const dispatch = useDispatch();
  const { PursachesOptionsOrders: options } = useContext(CommonFiltersContext);
  const { open: openVerify, toggleModal: toggleOpenVerify, closeModal: closeModalVerify } = useModal();
  const { open: openRemoveVerify, toggleModal: toggleRemoveVerify, closeModal: closeRemoveVerify } = useModal();
  const [seeCompleteOrder, setSeeCompleteOrder] = useState(false);
  //Drawer preview orders
  const [openDrawerPreviewOrder, setOpenDrawerPreviewOrder] = useState(false);
  const [dataDrawerPreviewOrder, setDataDrawerPreviewOrder] = useState({});
  //Table data
  const [isLoaderTable, setIsLoaderTable] = useState(false);
  const [orders, setOrders] = useState();
  const [orderCount, setOrderCount] = useState(0);
  const { page, setPage, limit, handlePage } = usePagination({ defaultLimit: 15, defaultPage: 1 });
  const [order, setOrder] = useState("createdAt");
  const [ASC, setASC] = useState("");
  const [readyLocalStorage, setReadyLocalStorage] = useState(false);
  const [open, setOpen] = useState(false);
  const [flag, setFlag] = useState(false);
  const [flagTrackings, setFlagTrackings] = useState(false);
  // new states filters
  const [valueToFind, setValueToFind] = useState({ search: false, keySearch: "", type: "inQuery" });
  const [filters, setFilters] = useState([]);
  const handleRefetch = () => setFlag(!flag);

  const [ordersVerify, setOrdersVerify] = useState({});
  const heads = [
    "id",
    "nombre",
    "correo",
    "teléfono",
    "folio",
    "total",
    "estado",
    "Metodo de Pago",
    "forma de pago",
    "cuenta de pago",
    "fecha de creación",
  ];

  useEffect(() => {
    getLocalStorage();
  }, []);

  //Carga los datos de la tabla
  useEffect(() => {
    getOrders();
  }, [flag, page, order, ASC, readyLocalStorage]);

  //* Get Data Local Storage
  const getLocalStorage = () => {
    let filtersOportunity = localStorage.getItem("filtersOrders_shopping");
    if (filtersOportunity) {
      let formatFilters = JSON.parse(filtersOportunity);
      setFilters(formatFilters);
    }
    let asc = localStorage.getItem("orderCompras_asc");
    if (asc) {
      setASC(JSON.parse(asc));
    }
    let orderby = localStorage.getItem("orderCompras_order");
    if (orderby) {
      setOrder(JSON.parse(orderby));
    }
    setReadyLocalStorage(true);
  };

  //Funion para obteber los pedidos
  const getOrders = async () => {
    setIsLoaderTable(true);
    if (readyLocalStorage === false) return;
    try {
      let params = {
        include:
          "oportunity,oportunity.soldby,oportunity.productsoportunities,orderstatus,address,address.city,address.entity,address.postal,bill,bill.cfdi,bill.paymentmethod,bill.paymentway,bill.address,bill.taxregime,createdbyid,paymentaccount",
        count: 1,
        limit: limit,
        skip: page,
        showproducts: "2",
        order: ASC ? order : `-${order}`,
        where: generateQuery(),
        join: validateJoins(filters),
        showbilladdress: 0,
        subquery: 1,
      };

      let getOrders = await api.get("orders", { params });
      let Normalized = normalizeTableDataOrdersShopping(getOrders.data.results);
      saveDataLocalStorage(ASC, "orderCompras_asc", "orderCompras_asc");
      saveDataLocalStorage(order, "orderCompras_order", "orderCompras_order");
      saveDataLocalStorage(filters, "filtersOrders_shopping", "filtersOrders_shopping");
      setOrders(Normalized);
      setOrderCount(getOrders.data.count);
      setIsLoaderTable(false);
      setFlagTrackings(!flagTrackings);
    } catch (error) {
      setIsLoaderTable(false);
      console.log("Error getOrders, ", error);
    }
  };

  const generateQuery = () => {
    let query = {};
    let inQueryEjecutive = {};
    let inQueryBill = {};
    let inQueryOportunity = {};
    query.createdbyid = inQueryEjecutive;
    query.bill = inQueryBill;
    query.oportunity = inQueryOportunity;
    for (let i = 0; i < filters?.length; i++) {
      const currentQuery = filters[i];
      switch (currentQuery.id) {
        case "keySearch":
          let key = currentQuery.value;
          if (key) {
            if (key.includes("@")) {
              inQueryOportunity.soldby = { email: { iRegexp: `${key.trim().toLocaleLowerCase()}` } };
            } else if (/^[\+]?[(]?[0-9]{1,3}[)]?[-\s\.]?[0-9]{1,3}[-\s\.]?[0-9]{1,4}$/im.test(key.trim())) {
              inQueryOportunity.soldby = { phone: { iRegexp: `${key.trim()}` } };
            } else {
              inQueryOportunity.soldby = { fullname: { iRegexp: `${key.trim()}` } };
            }
          }
          break;
        case "id":
          inQueryEjecutive[currentQuery.id] = currentQuery.value;
          break;
        case "groupId":
          inQueryEjecutive[currentQuery.id] = currentQuery.value;
          break;
        case "cfdiId":
          inQueryBill[currentQuery.id] = currentQuery.value;
          break;
        case "paymentmethodId":
          inQueryBill[currentQuery.id] = currentQuery.value;
          break;
        case "paymentwayId":
          inQueryBill[currentQuery.id] = currentQuery.value;
          break;
        case "taxregimeId":
          inQueryBill[currentQuery.id] = currentQuery.value;
          break;
        default:
          if (currentQuery.typeof === "date") {
            query[currentQuery.id] = {
              between: currentQuery.value,
            };
          } else {
            query[currentQuery.id] = currentQuery.value;
          }
          break;
      }
    }
    return JSON.stringify(query);
  };

  const validateJoins = filtersOrder => {
    let joins;
    let searchFilterLabel = filtersOrder?.filter(item => item.id === "cfdiId");
    let cfdi = Object.keys(searchFilterLabel).length === 0;
    let Filterpaymentmethod = filtersOrder?.filter(item => item.id === "paymentmethodId");
    let paymentmethod = Object.keys(Filterpaymentmethod).length === 0;
    let Filterpaymentway = filtersOrder?.filter(item => item.id === "paymentwayId");
    let paymentway = Object.keys(Filterpaymentway).length === 0;
    let Filtertaxregime = filtersOrder?.filter(item => item.id === "taxregimeId");
    let taxregime = Object.keys(Filtertaxregime).length === 0;
    if (cfdi !== true || paymentmethod !== true || paymentway !== true || taxregime !== true) {
      joins =
        "oportunity,oportunity.soldby,oportunity.productsoportunities,orderstatus,address,address.c,address.e,address.p,bill,bill.cfdi,bill.paymentmethod,bill.paymentway,bill.address,bill.taxregime,createdbyid,p";
    } else {
      joins =
        "oportunity,oportunity.soldby,oportunity.productsoportunities,orderstatus,address,address.c,address.e,address.p,bil,bill.cfd,bill.paymentmetho,bill.paymentwa,bill.add,bill.taxre,createdbyid,p";
    }
    return joins;
  };

  //* Save Filters Local Storage
  const saveDataLocalStorage = (value, type, key) => {
    switch (type) {
      case "keyword":
        localStorage.setItem(key, value);
        break;

      case "query":
        localStorage.setItem(key, JSON.stringify(value));
        break;

      default:
        localStorage.setItem(key, JSON.stringify(value));
        break;
    }
  };

  const handleClickName = (item, value) => {
    if (value) {
      setDataDrawerPreviewOrder(item);
      setOpenDrawerPreviewOrder(true);
      setFlagTrackings(!flagTrackings);
    } else {
      router.push({
        pathname: "/compras/pedidos/pedido",
        query: { pe: item.id, pr: item?.prospectId, op: item?.data?.oportunityId },
      });
    }
  };

  const handleClickEditOrders = item => {
    router.push({
      pathname: "/compras/EditarPedido",
      query: {
        pe: item.id,
        op: item?.data?.oportunityId,
      },
    });
  };

  const handleClickVerify = item => {
    if (item?.data?.isverified !== true) {
      setOrdersVerify(item);
      toggleOpenVerify();
    } else {
      return handleGlobalAlert("error", "¡El pedido ya está verificado!", "basic", dispatch);
    }
  };
  const handleClickRemoveVerify = item => {
    if (item?.data?.isverified !== false) {
      setOrdersVerify(item);
      toggleRemoveVerify();
    } else {
      return handleGlobalAlert("error", "¡El pedido se removio de verificados!", "basic", dispatch);
    }
  };

  const restorePage = () => {
    if (page > 1) setPage(1);
  };

  return (
    <MainLayout>
      <OrdersStyled>
        <Head>
          <title>CRM JOBS - Pedidos</title>
        </Head>
        {/* <SideBar open={open} setOpen={setOpen} />
      <NavBarDashboard sideBar={true} /> */}
        <div className="main">
          {!seeCompleteOrder.state ? (
            <div className="ctr_orders">
              <div className="head">
                <div className="head__title">
                  <h1>Pedidos</h1>
                  <p className="total">
                    <People />
                    {orderCount} Registros
                    <Cached
                      className="reloadIcon"
                      onClick={() => {
                        getOrders();
                      }}
                    />
                  </p>
                </div>
              </div>
              <SearchBox value={valueToFind} setValue={setValueToFind} restorePage={restorePage} />
              <Box display="flex" justifyContent="flex-end" alignItems="center">
                <DataOrder
                  falling={ASC}
                  setFalling={setASC}
                  order={order}
                  setOrder={setOrder}
                  addOptions={[
                    { label: "Fecha Creación ", value: "createdAt" },
                    { label: "Fecha Actualización", value: "updatedAt" },
                    { label: "Verificados", value: "isverified" },
                  ]}
                  addOptionsOrderBy={[
                    { label: "Descendente", value: "-" },
                    { label: "Ascendente ", value: "" },
                  ]}
                ></DataOrder>
                <div className="filters">
                  <Filters
                    options={options.optionsFilters}
                    keySearchValue={valueToFind}
                    refetch={handleRefetch}
                    filters={filters}
                    setFilters={setFilters}
                    restorePage={restorePage}
                  />
                </div>
              </Box>
              <Chips filters={filters} setFilters={setFilters} refetch={handleRefetch} notDelete={null} />
              {isLoaderTable ? (
                <div className="ctr_load">
                  <div className="ctr_load__img">
                    <img src="/load.png" />
                  </div>
                  <div className="ctr_load__load">
                    <p>Cargando</p>
                    <LinearProgress color="primary" />
                  </div>
                </div>
              ) : (
                <TableComponent
                  data={orders}
                  id="nombre"
                  heads={heads}
                  secondaryColor="#dce1f6"
                  primaryColor="#405189"
                  handleClickName={handleClickName}
                  handleClickEditProspect={handleClickEditOrders}
                  handleClickVerify={handleClickVerify}
                  handleClickRemoveVerify={handleClickRemoveVerify}
                />
              )}

              {!isLoaderTable && (
                <PaginationDirector
                  count={orderCount}
                  limit={limit}
                  handlePage={handlePage}
                  page={page}
                  typeOfTitle={"pedidos"}
                />
              )}
            </div>
          ) : (
            <div className="ctr_orders">
              <CompleteOrder seeCompleteOrder={seeCompleteOrder} setSeeCompleteOrder={setSeeCompleteOrder} />
            </div>
          )}
        </div>

        <DrawerPursaches
          openDrawerPreviewOrder={openDrawerPreviewOrder}
          setOpenDrawerPreviewOrder={setOpenDrawerPreviewOrder}
          dataDrawerPreviewOrder={dataDrawerPreviewOrder}
          setDataDrawerPreviewOrder={setDataDrawerPreviewOrder}
          flag={flag}
          setFlag={setFlag}
          isRoleShopping={true}
        />
        <VerifyOrder
          isRoleShopping={false}
          open={openVerify}
          ordersVerify={ordersVerify}
          close={closeModalVerify}
          refetch={flag}
          setRefetch={setFlag}
          toggleVerify={toggleOpenVerify}
        />
        <RemoveVerifyOrder
          open={openRemoveVerify}
          ordersVerify={ordersVerify}
          close={closeRemoveVerify}
          refetch={flag}
          setRefetch={setFlag}
          toggleVerify={toggleRemoveVerify}
        />
      </OrdersStyled>
    </MainLayout>
  );
}
