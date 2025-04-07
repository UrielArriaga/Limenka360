import { FilterList, SearchOutlined, People, Cached, Email, AccountBox, Note } from "@material-ui/icons";
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
import TableComponent from "../../../components/TableShippings";
import { dialogSelector } from "../../../redux/slices/dialogSlice";
import { normalizeShippings } from "../../../utils/normalizeData";
import { ShippingsStyled } from "../../../styles/Shippings";
import { api } from "../../../services/api";

import useModal from "../../../hooks/useModal";
import ConfirmShipment from "../../../components/ModalConfirmShipment";
import PreviewShipping from "../../../components/DrawerPreviewShipping";
import Filters from "../../../components/Filters";
import DataOrder from "../../../components/DataOrder";

export default function Envios() {
  const router = useRouter();
  const { openMenuSide } = useSelector(dialogSelector);
  const { isLoadingPage } = useValidateLogin(["logistica"]);
  const { id_user, roleId, groupId } = useSelector(userSelector);
  const { open: openConfirm, toggleModal: toggleConfirm, closeModal: closeModal } = useModal();
  const { open: openConfirmShipping, toggleModal: toggleConfirmModal, closeModal: closeModalConfirm } = useModal();
  const [Alert, setAlert] = useState({ severity: null, show: null, message: "", type: null });
  const [open, setOpen] = useState(false);
  const [isLoading, setisLoading] = useState(true);
  const [openFilters, setOpenFilters] = useState(false);
  const [flag, setFlag] = useState(false);
  const [shippings, setShippings] = useState([]);
  const [nameSearch, setNameSearch] = useState("");
  const [searchKey, setSearchKey] = useState("");
  const [totalShippings, setTotalShippings] = useState(0);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(20);

  const totalPages = Math.ceil(totalShippings / limit);
  const [shippingConfirm, setShippingConfirm] = useState();
  const heads = [
    "id",
    "nombre",
    "correo",
    "folio",
    "Producto",
    "teléfono",
    "calle",
    "Numero Interior",
    "Numero Exterior",
    "Colonia",
    "codigo postal",
    "estado",
    "Municipio",
    "Referencias",
    "fecha de creación",
  ];

  useEffect(() => {
    getShippings();
  }, [id_user, page, flag, limit]);

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
        order: "-createdAt",
        skip: page,
      };
      let responseShippings = await api.get(`shippings`, { params });
      let results = responseShippings?.data?.results;
      console.log("results", results);
      normalizeShipping(results);
      setisLoading(false);
      setTotalShippings(responseShippings.data?.count);
    } catch (error) {
      console.log(error);
      setisLoading(false);
    }
  };

  const normalizeShipping = results => {
    let normalizeData = results.map(item => normalizeShippings(item));
    setShippings(normalizeData);
    setisLoading(false);
  };

  const handlePagination = (event, page) => {
    setPage(page);
  };

  const handleClickConfirm = item => {
    setShippingConfirm(item);
    toggleConfirmModal();
  };

  const handleClickName = (item, value) => {
    if (value) {
      setShippingConfirm(item);
      toggleConfirm();
    } else {
      router.push({
        pathname: "/logistica/envios",
      });
    }
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
          <div className="ctr_filter">
            <div className="ctr_filter__ctr_input">
              <TextField
                variant="outlined"
                type="search"
                value={searchKey}
                onChange={e => validateSearchBoxEmpty(e.target.value)}
                placeholder="Ingresa Nombre o Correo"
                size="small"
                className="inputText"
                onKeyDown={e => {
                  if (e.key === "Enter") {
                    setNameSearch(searchKey);
                    setFlag(!flag);
                    if (page > 1) {
                      setPage(1);
                    }
                  }
                }}
              />
              <SearchOutlined className="search" />
              {/* <FilterList className="filters" onClick={() => setOpenFilters(true)} /> */}
            </div>
          </div>
          <Box display="flex" justifyContent="flex-end" alignItems="center">
            <DataOrder
              // falling={falling}
              // setFalling={setFalling}
              // order={order}
              // setOrder={setOrder}
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
              // options={options.optionsFilters}
              // // options_by={filterOptionsSelect}
              // keySearchValue={valueToFind}
              // refetch={handleRefetch}
              // filters={filters}
              // setFilters={setFilters}
              // restorePage={restorePage}
              />
            </div>
          </Box>
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
                handleClickConfirm={handleClickConfirm}
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
      <ConfirmShipment
        open={openConfirmShipping}
        dataShipping={shippingConfirm}
        close={closeModalConfirm}
        handleAlert={""}
        refetch={flag}
        setRefetch={setFlag}
        // setLoaderCompleteApproved={setLoaderCompleteApproved}
        // loaderCompleteApproved={loaderCompleteApproved}
        toggleApprovedModal={toggleConfirmModal}
      />
      <PreviewShipping isOpen={openConfirm} close={closeModal} shipment={shippingConfirm} />

      {Alert?.show && (
        <AlertGlobal severity={Alert.severity} message={Alert.message} show={Alert.show} type={Alert.type} />
      )}
    </ShippingsStyled>
  );
}
