import { useContext, useEffect, useState } from "react";
import { SalesStyle } from "../../../styles/Administracion/ventas/ventas.style";
import { Tooltip } from "@material-ui/core";
import { Cached } from "@material-ui/icons";
import TableComponent from "../../../components/TableDataComponentAdminSales";
import { api } from "../../../services/api";
import { normalizeTableDataSales } from "../../../utils/normalizeData";
import { useRouter } from "next/router";
import PaginationWithText from "../../../components/UI/molecules/PaginationWithText";
import LoadingImage from "../../../components/UI/atoms/LoadingImage";
import Filters from "../../../components/Filters";
import { CommonFiltersContext } from "../../../context/commonFiltersContext";
import Chips from "../../../components/ChipsFilters";
import DataOrder from "../../../components/DataOrder";
import SearchBox from "../../../components/SearchBox";
import MainLayout from "../../../components/MainLayout";
import DrawerAdminSales from "../../../components/DrawerAdminSales";
import PreviewCuote from "../../../components/DrawerPreview";
import AdminLayout from "../../../layouts/AdminLayout";

export default function SalesAdministration() {
  const { adminAndPursachesOptionsSales: options } = useContext(CommonFiltersContext);
  const [valueToFind, setValueToFind] = useState({
    search: false,
    keySearch: "",
    inQueryBy: "prospect",
    identifier: "fullname",
  });
  const router = useRouter();
  const [falling, setFalling] = useState("");
  const [order, setOrder] = useState("createdAt");
  const [refetch, setRefetch] = useState(false);
  const [isShowSalesDiscarted, setIsShowSalesDiscarted] = useState(false);
  const [isReadyLocalStorage, setIsReadyLocalStorage] = useState(false);
  const [isLoading, setisLoading] = useState(false);
  const [sales, setSales] = useState([]);
  const [filters, setFilters] = useState([]);
  const [page, setPage] = useState(1);
  const [totalProspects, setTotalProspects] = useState(0);
  const [openpreview, setOpenpreview] = useState(false);
  const [oportunitySelect, setOportunitySelect] = useState(undefined);
  const [showNameSearch, setShowNameSearch] = useState({
    active: false,
    name: "",
  });
  const limit = 20;

  const [openDrawerName, setOpenDrawerName] = useState(false);
  const [prospectId, setProspectId] = useState();
  const [dataOpo, setDataOpo] = useState();

  const headsDiscarted = ["id", "nombre", "correo", "concepto", "motivo de descarte", "fecha de descarte"];

  const headsHidden = ["correo", "género", "puesto", "origen", "certeza", "empresa", "fecha de cierre"];
  const heads = [
    "id",
    "nombre",
    "correo",
    "concepto",
    "monto total",
    "comisión total",
    "certeza",
    "télefono",
    "género",
    "puesto",
    "categoría de interés",
    "origen",
    "empresa",
    "fase",
    "ultimo seguimiento",
    "fecha de cierre",
    "fecha de venta",
  ];

  useEffect(() => {
    getOportunitiesSales();
    setisLoading(true);
  }, [page, showNameSearch, refetch, falling, order, isReadyLocalStorage]);

  useEffect(() => {
    getLocalStorage();
  }, []);

  const getLocalStorage = () => {
    let filters = localStorage.getItem("filters_adminSales");
    let orderData = localStorage.getItem("orderData_adminSales");
    if (filters) {
      let formatFilters = JSON.parse(filters);
      setFilters(formatFilters);
    }
    if (orderData) {
      let formatOrder = JSON.parse(orderData);
      setFalling(formatOrder.falling);
      setOrder(formatOrder.order);
    }
    setIsReadyLocalStorage(true);
  };

  const ConfirmDelete = sales => {
    setSalesDelete(sales);
    setOpenModal({ ...openModal, activate: true });
  };
  const handleClickAddTracking = item => {
    setProspectTrackings(item);
    setShowAddTrackings(true);
  };
  //Realizar pedido
  const handleMakeOrder = item => {
    if (item.isorder) {
      let params = {
        where: JSON.stringify({
          oportunityId: item.id,
        }),
        keys: "id",
      };
      api
        .get(`orders`, { params })
        .then(res => {
          let idOrder = res.data.results[0].id;
          router.push({
            pathname: "pedidos/pedido",
            query: {
              pe: idOrder,
              pr: item?.prospectId,
            },
          });
        })
        .catch(err => console.log(err));
    } else {
      router.push({
        pathname: "/pedidos/nuevo",
        query: { o: item.id, p: item.prospectId },
      });
      // dispatch(setArrayProducts([]));
    }
  };
  const confirmRestore = sales => {
    setSalesDelete(sales);
    setOpenModal({ ...openModal, activate: true, type: "restore" });
  };
  const handleClickAddPending = item => {
    setProspectPending(item);
    setShowAddPending(true);
  };
  const handleClickOpenWhatsApp = item => {
    item.itemBD.idOportunity = item.id;
    setProspectSelected(item.itemBD);
    setOpenWhatsApp(true);
  };
  const handleAlertDeleteSale = item => {
    setDataSaleSelected(item);
    toggleModalAlertDelete();
  };
  const handleValidateFilters = filters => {
    let query = {
      discarted: false,
      iscloseout: true,
    };
    for (let i = 0; i < filters.length; i++) {
      if (!query[filters[i].inQueryBy] && filters[i].inQueryBy) query[filters[i].inQueryBy] = {};
      if (filters[i].inQueryBy) {
        if (filters[i].id === "keySearch") {
          query[filters[i].inQueryBy][filters[i].identifier] = { iRegexp: filters[i].value };
        } else {
          query[filters[i].inQueryBy][filters[i].identifier] = filters[i].value;
        }
      } else {
        if (filters[i].id === "keySearch") {
          query[filters[i].identifier] = { iRegexp: filters[i].value };
        } else {
          query[filters[i].identifier] = filters[i].value;
        }
      }
    }
    return JSON.stringify(query);
  };
  const getOportunitiesSales = async () => {
    if (!isReadyLocalStorage) return;
    try {
      let params = {
        include: "phase,prospect,prospect.origin,prospect.category,prospect.clientcompany,prospect.postal,soldby",
        where: handleValidateFilters(filters),
        limit: limit,
        count: 1,
        join: "ph,prospect,prospect.origin,prospect.category,prospect.clientcompany,prospect.postal,soldby",
        order: validateOrder(),
        skip: page,
        // showlabel: "1",
      };
      let response = await api.get(`oportunities`, { params });
      let results = response?.data.results;
      let count = response.data.count;
      let normalizeData = results.map(item => normalizeTableDataSales(item));
      setSales(normalizeData);
      setTotalProspects(count);
      setisLoading(false);
      saveLocalStorage("filters_adminSales", filters);
      saveLocalStorage("orderData_adminSales", { falling: falling, order: order });
    } catch (error) {
      setisLoading(false);
      console.log(error);
    }
  };
  const validateOrder = () => {
    let valueOrder = "createdAt";
    switch (order) {
      case "createdAtProspect":
        valueOrder = `prospect.${falling ? "" : "-"}createdAt`;
        break;
      case "updatedAtProspect":
        valueOrder = `prospect.${falling ? "" : "-"}updatedAt`;
        break;
      default:
        valueOrder = `${falling ? "" : "-"}${order}`;
        break;
    }
    return valueOrder;
  };
  const handleRefetch = () => setRefetch(!refetch);
  const restorePage = () => {
    if (page > 1) setPage(1);
  };
  const saveLocalStorage = (key, value) => localStorage.setItem(key, JSON.stringify(value));

  const handleClickEditProspect = item => {
    let params = {
      where: JSON.stringify({
        oportunityId: item.id,
      }),
      keys: "id",
    };
    api
      .get(`orders`, { params })
      .then(res => {
        let idOrder = res.data.results[0].id;
        router.push({
          pathname: "pedidos/EditarPedido",
          query: {
            pe: idOrder,
            pr: item?.id,
          },
        });
      })
      .catch(err => console.log(err));
  };

  const handleClickName = e => {
    setOpenDrawerName(true);
    setProspectId(e.prospectId);
    setDataOpo(e);
  };

  return (
    <AdminLayout>
      <SalesStyle>
        <div className="main">
          <div className="sales_content">
            <div className="sales_content__header">
              <div className="containerTitle">
                <h1>Ventas</h1>
                <div className="total">
                  {totalProspects} Registros
                  <Tooltip title="Recargar">
                    <Cached className="reloadIcon" onClick={handleRefetch} />
                  </Tooltip>
                </div>
              </div>
            </div>
            <div className="sales_content__body">
              <SearchBox
                value={valueToFind}
                setValue={setValueToFind}
                restorePage={restorePage}
                placeholder={"Ingresa Nombre del Cliente"}
              />

              <div className="filtersOrders">
                <div className="orders">
                  <DataOrder
                    falling={falling}
                    setFalling={setFalling}
                    order={order}
                    setOrder={setOrder}
                    addOptions={[
                      { label: "Fecha de Actualización", value: "updatedAt" },
                      { label: "Fecha de Venta", value: "soldat" },
                      { label: "Fecha Ultimo Seguimiento", value: "lastTrackingcreatedAt" },
                      { label: "Fecha Creación Prospecto", value: "createdAtProspect" },
                      { label: "Fecha Actualización Prospecto", value: "updatedAtProspect" },
                      { label: "Concepto", value: "concept" },
                      { label: "Monto Cotizado", value: "amount" },
                    ]}
                    addOptionsOrderBy={[
                      { label: "Descendente", value: "-" },
                      { label: "Ascendente ", value: "" },
                    ]}
                  />
                  <Filters
                    options={options.optionsFilters}
                    keySearchValue={valueToFind}
                    refetch={handleRefetch}
                    filters={filters}
                    setFilters={setFilters}
                    restorePage={restorePage}
                  />
                </div>
              </div>
              <div>
                <Chips filters={filters} setFilters={setFilters} refetch={handleRefetch} notDelete={"date"} />
              </div>
              {isLoading ? (
                <LoadingImage />
              ) : (
                <>
                  <TableComponent
                    data={sales}
                    id="nombre"
                    discartedTable={isShowSalesDiscarted}
                    heads={isShowSalesDiscarted ? headsDiscarted : heads}
                    headsHidden={headsHidden}
                    secondaryColor="#dce1f6"
                    primaryColor="#405189"
                    handleClickName={e => handleClickName(e)}
                    handleClickDiscardSales={() => {}}
                    handleClickAddTracking={() => {}}
                    handleClickEditProspect={handleClickEditProspect}
                    handleMakeOrder={handleMakeOrder} // Realizar pedido
                    handleClickRestore={() => {}}
                    handleClickAddPending={() => {}}
                    handleClickOpenWhatsApp={() => {}}
                    handleDeleteSale={() => {}}
                  />
                  <PaginationWithText
                    total={totalProspects}
                    actualPage={page}
                    setActualPage={setPage}
                    totalPages={Math.ceil(totalProspects / limit)}
                  />
                </>
              )}
            </div>
            <div className="sales_content__footer"></div>
          </div>
        </div>
      </SalesStyle>
      <DrawerAdminSales
        open={openDrawerName}
        setOpen={setOpenDrawerName}
        prospectId={prospectId}
        dataOpo={dataOpo}
        handleMakeOrder={handleMakeOrder}
        setOpenpreview={setOpenpreview}
        setOportunitySelect={setOportunitySelect}
      />
      <PreviewCuote open={openpreview} setOpen={setOpenpreview} oportunitySelect={oportunitySelect} />
    </AdminLayout>
  );
}
