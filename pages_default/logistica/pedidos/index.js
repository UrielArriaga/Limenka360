import React, { useEffect, useState } from "react";
import Head from "next/head";
import { useContext } from "react";
import { useRouter } from "next/router";
import { LinearProgress, Box } from "@material-ui/core";
import { People, Cached } from "@material-ui/icons";
import { normalizeTableDataOrdersShopping } from "../../../utils/normalizeData";
import Filters from "../../../components/Filters";
import DataOrder from "../../../components/DataOrder";
import DrawerPreviewsOrders from "../../../components/DrawerPreviewsOrdersLogistics";
import { api } from "../../../services/api";
import { CommonFiltersContext } from "../../../context/commonFiltersContext";
import CompleteOrder from "../../compras/completeOrder";
import PaginationDirector from "../../../components/UI/molecules/PaginationTable";
import Chips from "../../../components/ChipsFilters";
import SearchBox from "../../../components/SearchBox";
import usePagination from "../../../hooks/usePagination";
import { PedidosStyled } from "../../../styles/Logistica/pedidos";
import TableComponent from "../../../components/TableLogisticsOrders";
import MainLayout from "../../../components/MainLayout";
export default function Pedidos() {
  const { logisticsOptionsOrders: options } = useContext(CommonFiltersContext);
  const router = useRouter();
  const [seeCompleteOrder, setSeeCompleteOrder] = useState(false);
  //Drawer preview orders
  const [openDrawerPreviewOrder, setOpenDrawerPreviewOrder] = useState(false);
  const [dataDrawerPreviewOrder, setDataDrawerPreviewOrder] = useState({});
  //Table data
  const [isLoaderTable, setIsLoaderTable] = useState(false);
  const [orders, setOrders] = useState();
  const [readyLocalStorage, setReadyLocalStorage] = useState(false);
  const [orderCount, setOrderCount] = useState(0);
  const { page, setPage, limit, handlePage } = usePagination({ defaultLimit: 15, defaultPage: 1 });
  const [order, setOrder] = useState("createdAt");
  const [falling, setFalling] = useState(true);
  const [flag, setFlag] = useState(false);
  const [flagTrackings, setFlagTrackings] = useState(false);
  // new states filters
  const [valueToFind, setValueToFind] = useState({ search: false, keySearch: "", type: "inQuery" });
  const [filters, setFilters] = useState([]);
  const handleRefetch = () => setFlag(!flag);
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
  }, [flag, page, order, falling, readyLocalStorage]);

  //* Get Data Local Storage
  const getLocalStorage = () => {
    let filtersOportunity = localStorage.getItem("filtersLogistics_shopping");
    if (filtersOportunity) {
      let formatFilters = JSON.parse(filtersOportunity);
      setFilters(formatFilters);
    }
    let asc = localStorage.getItem("orderLogistics_asc");
    if (asc) {
      setFalling(JSON.parse(asc));
    }
    let orderby = localStorage.getItem("orderLogistics_order");
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
        order: falling ? order : `-${order}`,
        where: generateQuery(),
        join: validateJoins(filters),
        showbilladdress: 0,
        subquery: 1,
      };

      let getOrders = await api.get("orders", { params });
      let Normalized = normalizeTableDataOrdersShopping(getOrders.data.results);
      saveDataLocalStorage(falling, "orderLogistics_asc", "orderLogistics_asc");
      saveDataLocalStorage(order, "orderLogistics_order", "orderLogistics_order");
      saveDataLocalStorage(filters, "filterLogistics_shopping", "filtersLogistics_shopping");
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
    // query.orderstatusId = "9eQCIBnRvc990VlJfgswanCh";
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
      //coincide con los filtros de cfdi metodo de pago forma de pago y regimen fiscal
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
      item.orderId = item.id;
      setDataDrawerPreviewOrder(item);
      setOpenDrawerPreviewOrder(true);
      setFlagTrackings(!flagTrackings);
    } else {
      router.push({
        pathname: "/logistica/pedidos/pedido",
        query: { pe: item.id, pr: item?.prospectId, op: item?.data?.oportunityId },
      });
    }
  };

  const restorePage = () => {
    if (page > 1) setPage(1);
  };

  return (
    <MainLayout>
      <PedidosStyled>
        <Head>
          <title>CRM JOBS - Pedidos</title>
        </Head>
        <div className="main">
          {!seeCompleteOrder.state ? (
            <div className="ctr_prospects">
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
                  falling={falling}
                  setFalling={setFalling}
                  order={order}
                  setOrder={setOrder}
                  addOptions={[
                    { label: "Fecha Creación ", value: "createdAt" },
                    { label: "Fecha Actualización", value: "updatedAt" },
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
            <div className="ctr_prospects">
              <CompleteOrder seeCompleteOrder={seeCompleteOrder} setSeeCompleteOrder={setSeeCompleteOrder} />
            </div>
          )}
        </div>
        <DrawerPreviewsOrders
          openDrawerPreviewOrder={openDrawerPreviewOrder}
          setOpenDrawerPreviewOrder={setOpenDrawerPreviewOrder}
          dataDrawerPreviewOrder={dataDrawerPreviewOrder}
          setDataDrawerPreviewOrder={setDataDrawerPreviewOrder}
          flag={flag}
          setFlag={setFlag}
          isRoleShopping={true}
        />
      </PedidosStyled>
    </MainLayout>
  );
}
