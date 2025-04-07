import { FilterList, SearchOutlined, People, Cached } from "@material-ui/icons";
import { Box, Chip, Grid, LinearProgress, TextField, Switch, withStyles, CircularProgress } from "@material-ui/core";
import Head from "next/head";
import { Pagination } from "@material-ui/lab";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";
import { userSelector } from "../../../redux/slices/userSlice";
import LoaderPage from "../../../components/LoaderPage";
import NavBarDashboard from "../../../components/NavBarDashboard";
import SideBar from "../../../components/SideBar";
import useValidateLogin from "../../../hooks/useValidateLogin";
import AlertGlobal from "../../../components/Alerts/AlertGlobal";
import { dialogSelector } from "../../../redux/slices/dialogSlice";
import { normalizeShippingsPurchases } from "../../../utils/normalizeData";
import { ShippingsStyled } from "../../../styles/Shippings";
import { api } from "../../../services/api";
import useModal from "../../../hooks/useModal";
import PreviewShipping from "../../../components/DrawerPreviewShipping";
import DataOrder from "../../../components/DataOrder";
import TableComponent from "../../../components/TableShippingsPursaches";
import ModifyPhase from "../../../components/UI/organism/ModalModifyShippingPhase";
import Filters from "../../../components/Filters";

export default function Envios() {
  const { isLoadingPage } = useValidateLogin(["compras"]);
  const router = useRouter();
  const { openMenuSide } = useSelector(dialogSelector);
  const { id_user } = useSelector(userSelector);
  const { open: openConfirm, toggleModal: toggleConfirm, closeModal: closeModal } = useModal();
  const { open: openConfirmShipping, toggleModal: toggleConfirmModal, closeModal: closeModalConfirm } = useModal();
  const [Alert, setAlert] = useState({ severity: null, show: null, message: "", type: null });
  const [open, setOpen] = useState(false);
  const [isLoading, setisLoading] = useState(true);
  const [flag, setFlag] = useState(false);
  const [shippings, setShippings] = useState([]);
  const [shippingConfirm, setShippingConfirm] = useState();
  const [isReadyLocalStorage, setIsReadyLocalStorage] = useState(false);
  const [filters, setFilters] = useState([]);
  const [totalShippings, setTotalShippings] = useState(0);
  const totalPages = Math.ceil(totalShippings / limit);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(20);
  //ORDEN
  const [order, setOrder] = useState("createdAt");
  const [falling, setFalling] = useState(true);
  //BUSCADOR
  const [valueToFind, setValueToFind] = useState({ search: false, keySearch: "", type: "inQuery" });
  const heads = ["id", "folio", "Producto", "Codigo Producto", "Fecha de creación", "Fecha de actualización"];

  useEffect(() => {
    getLocalStorage();
  }, []);

  useEffect(() => {
    getShippings();
  }, [id_user, page, flag, limit, order, falling, isReadyLocalStorage]);

  const getLocalStorage = () => {
    let filtersProspects = localStorage.getItem("filtersShippings_Compras");
    if (filtersProspects) {
      let formatFilters = JSON.parse(filtersProspects);
      setFilters(formatFilters);
    }
    let orderby = localStorage.getItem("filtersShippings_order");
    if (orderby) {
      setOrder(JSON.parse(orderby));
    }

    let asc = localStorage.getItem("filtersShippings_asc");
    if (asc) {
      setFalling(JSON.parse(asc));
    }

    setIsReadyLocalStorage(true);
  };
  const generateFilters = () => {
    let query = {};

    return query;
  };

  const getShippings = async () => {
    setisLoading(true);
    try {
      let query = generateFilters();
      let params = {
        include:
          "productsoportunity,order,order.createdbyid,order.orderstatus,order.paymentaccount,address,address.city,address.entity,address.postal",
        where: JSON.stringify(query),
        limit: limit,
        count: 1,
        order: falling ? order : `-${order}`,
        skip: page,
      };
      let responseShippings = await api.get(`shippings`, { params });
      let results = responseShippings?.data?.results;
      console.log("rwe", results);
      normalizeShipping(results);
      setisLoading(false);
      setTotalShippings(responseShippings.data?.count);
      saveLocalStorage(filters, "filtersShippings_Compras");
      saveLocalStorage(order, "filtersShippings_order");
      saveLocalStorage(falling, "filtersShippings_asc");
    } catch (error) {
      console.log(error);
      setisLoading(false);
    }
  };

  const saveLocalStorage = (value, key) => {
    switch (key) {
      case "filtersShippings_Compras":
        localStorage.setItem(key, JSON.stringify(value));
        break;

      default:
        localStorage.setItem(key, JSON.stringify(value));
        break;
    }
  };

  const normalizeShipping = results => {
    let normalizeData = results.map(item => normalizeShippingsPurchases(item));
    setShippings(normalizeData);
    setisLoading(false);
  };

  const handlePagination = (event, page) => {
    setPage(page);
  };

  const handleClickEditPhase = item => {
    setShippingConfirm(item);
    toggleConfirmModal();
  };

  const handleClickName = (item, value) => {
    if (value) {
      setShippingConfirm(item);
      toggleConfirm();
    } else {
      router.push({
        pathname: "/compras/envios",
      });
    }
  };
  const handlClickDeleteFilter = (_, itemXX) => {
    let newArrayFilters = [...filters];
    let query = newArrayFilters.filter((item, index) => item.identifier !== itemXX.identifier);
    setFilters(query);
    setFlag(!flag);
  };
  const restorePage = () => {
    if (page > 1) setPage(1);
  };

  if (isLoadingPage) return <LoaderPage />;
  return (
    <ShippingsStyled isOpen={openMenuSide}>
      <Head>
        <title>CRM JOBS - Envios</title>
      </Head>
      <SideBar open={open} setOpen={setOpen} />
      <NavBarDashboard sideBar={true} />
      <div className="main">
        <div className="ctr_oportunities">
          <div className="head">
            <div className="head__title">
              <h1>Envios</h1>
              <p className="total">
                <People />
                {totalShippings} Registros
                <Cached className="reloadIcon" onClick={() => setFlag(!flag)} />
              </p>
            </div>
          </div>
          <SearchOrders
            value={valueToFind}
            setValue={setValueToFind}
            refetch={() => setFlag(!flag)}
            restorePage={restorePage}
          />
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
            />
            {/* <Filters
              options={options.optionsFilters}
              keySearchValue={valueToFind}
              refetch={handleRefetch}
              filters={filters}
              setFilters={setFilters}
              restorePage={restorePage}
            /> */}
          </Box>
          <div className="filters_chip">
            <ActiveFilters filters={filters} onClickDelete={handlClickDeleteFilter} />
          </div>
          {isLoading && (
            <div className="ctr_load">
              <div className="ctr_load__img">
                <img src="/load.png" />
              </div>
              <div className="ctr_load__load">
                <p>Cargando</p>
                <LinearProgress color="primary" />
              </div>
            </div>
          )}
          {!isLoading && (
            <>
              <TableComponent
                data={shippings}
                id="nombre"
                heads={heads}
                secondaryColor="#dce1f6"
                primaryColor="#405189"
                handleClickEditPhase={handleClickEditPhase}
                handleClickName={handleClickName}
              />
              {shippings.length > 0 && (
                <div className="table__pagination">
                  <Pagination
                    shape="rounded"
                    color="primary"
                    count={totalPages}
                    defaultPage={1}
                    page={page}
                    onChange={handlePagination}
                  />
                </div>
              )}
            </>
          )}
        </div>
      </div>

      <PreviewShipping isOpen={openConfirm} close={closeModal} shipment={shippingConfirm} />

      <ModifyPhase
        open={openConfirmShipping}
        dataShipping={shippingConfirm}
        close={closeModalConfirm}
        handleAlert={""}
        refetch={flag}
        setRefetch={setFlag}
        toggleApprovedModal={toggleConfirmModal}
      />
      {Alert?.show && (
        <AlertGlobal severity={Alert.severity} message={Alert.message} show={Alert.show} type={Alert.type} />
      )}
    </ShippingsStyled>
  );
}
function SearchOrders({ value, setValue, refetch, restorePage, handleFilters }) {
  const handleChange = e => {
    setValue({ search: false, keySearch: e.target.value });
  };

  const handleKeyDown = e => {
    if (e.key === "Enter") {
      setValue({ search: true, keySearch: e.target.value });
      restorePage();
    }
  };

  return (
    <div className="search">
      <div className="inputicon">
        <SearchOutlined className="searchicon" />
        <input
          value={value?.keySearch}
          onChange={e => handleChange(e)}
          onKeyDown={e => handleKeyDown(e)}
          type="text"
          placeholder="Ingresa Folio de la Orden"
        />
      </div>
    </div>
  );
}
function ActiveFilters({ filters = [], onClickDelete }) {
  if (filters.length <= 0) return <div />;
  return (
    <div className="activefilterssection">
      {filters.map((item, index) => {
        return (
          <Chip
            key={index}
            color="primary"
            size="small"
            onDelete={() => onClickDelete(index, item)}
            label={`${item.label} : ${item.name}`}
            className="chip"
            style={{ marginRight: 10 }}
          />
        );
      })}
    </div>
  );
}
