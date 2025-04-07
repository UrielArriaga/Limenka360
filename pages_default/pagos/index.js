import React, { useEffect, useState } from "react";
import Head from "next/head";
import { api } from "../../services/api";
import { useRouter } from "next/router";
import { OportinitiesStyled } from "../../styles/Pagos";
import DrawerPagos from "../../components/DrawerPagos";
import SeeFullPayment from "../../components/SeeFullPayment";
import TableComponent from "../../components/TableDataComponentPayments";
import { checkIfItExpired, formatDate, formatNumber, toUpperCaseChart } from "../../utils";
import { Cached, People } from "@material-ui/icons";
import { useSelector } from "react-redux";
import { userSelector } from "../../redux/slices/userSlice";
import PaginationWithText from "../../components/UI/molecules/PaginationWithText";
import InputFilter from "../../components/UI/molecules/InputFilter";
import LoadingImage from "../../components/UI/atoms/LoadingImage";
import ChipsPayments from "../../components/UI/molecules/ChipsPayments";
import DrawerPayments from "../../components/UI/molecules/DrawerPayments";
import AscendingAndDescendingOrder from "../../components/UI/molecules/AscendingAndDescendingOrder";
import AlertGlobal from "../../components/Alerts/AlertGlobal";
import MainLayout from "../../components/MainLayout";
import ModalMarkAsPaid from "../../components/ModalMarkAsPaid";

export default function Pagos() {
  const { id_user, groupId, companyId, roleId } = useSelector(userSelector);
  const router = useRouter();

  const [openModalMarkAsPaid, setOpenModalMarkAsPaid] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState();

  const [order, setOrder] = useState("date");
  const [falling, setFalling] = useState();
  const [paymentsTable, setpaymentsTable] = useState([]);
  const limit = 10;
  const [skip, setSkip] = useState(1);
  const [count, setCount] = useState(0);
  const [nameSearch, setNameSearch] = useState("");
  const [showChips, setShowChips] = useState(false);
  const [flag, setFlag] = useState(false);
  const [showFilters, setshowFilters] = useState(false);
  const [isLoading, setisLoading] = useState(true);
  const [recharge, setRecharge] = useState(false);
  const [openDrawerPagos, setOpenDrawerPagos] = useState(false);
  const [activeteSeeFullPayment, setActiveteSeeFullPayment] = useState(false);
  const [dataDrawerPagos, setDataDrawerPagos] = useState();
  const [load, setload] = useState(true);
  const [drawerFilters, setDrawerFilters] = useState({ ispaid: false });
  const [oportunityId, setOportunityId] = useState();
  const [alert, setAlert] = useState({ severity: null, show: null, message: "", type: null });
  const [filters, setFilters] = useState({
    ispaid: { id: false, name: "Pendiente", fullname: undefined },
    phaseoportunity: "",
    phaseprospect: "",
    date: "",
    datestart: "",
    datefinish: "",
    soldin: "",
    soldinstart: "",
    soldinfinish: "",
    ejecutive: "",
    group: "",
  });
  const [showNameSearch, setShowNameSearch] = useState({
    active: false,
    name: "",
  });
  const heads = ["id", "nombre", "comision", "monto", "pagado", "fecha limite", "expirado", "Se vendio en"];

  //new skip page
  useEffect(() => {
    getPayments();
    setisLoading(true);
  }, [skip]);

  useEffect(() => {
    getPayments();
    setSkip(1);
  }, [drawerFilters, recharge, falling, order]);

  useEffect(() => {
    getPayments();
  }, [showNameSearch]);

  const getProspect = async id => {
    try {
      setload(true);

      let query = {
        params: {
          include: "city,postal,entity,phase,origin,specialty,clientcompany,clienttype",
          where: { id: id },
          join: "c",
        },
      };

      let prospect = await api.get("prospects", query);

      query = {
        params: {
          include: "oportunity,oportunity.prospect",
          where: { oportunity: { prospect: { id: id } } },
          order: "date",
        },
      };

      let pagos = await api.get("salespayments", query);

      setDataDrawerPagos({ ...dataDrawerPagos, prospect: prospect?.data?.results[0], payments: pagos?.data?.results });
    } catch (error) {
      console.log(error);
    }

    setload(false);
  };

  const getPayments = async () => {
    setisLoading(true);
    try {
      let params = {
        include: "oportunity,oportunity.prospect,oportunity.phase",
        where: drawerFilters,
        join: "oportunity,oportunity.prospect,oportunity.phase",
        count: "1",
        limit: limit,
        skip: skip,
        order: falling ? order : `-${order}`,
        showphase: "2",
      };

      switch (roleId) {
        case "ejecutivo":
          params.where = { ...params.where, ejecutiveId: id_user };
          break;
        case "gerente":
          if (params.where?.ejecutiveId) {
            params.where = { ...params.where };
          } else {
            params.where = { ...params.where, ejecutiveId: await getExecutivesFromManager() };
          }
          break;
        case "director":
          //Sin filtros iniciales
          break;
        default:
          params.where = { ...params.where, ejecutiveId: id_user };
          break;
      }

      if (showNameSearch.active) {
        if (params?.where?.oportunity) {
          params.where.oportunity = {
            ...params.where.oportunity,
            prospect: { fullname: { iRegexp: nameSearch.toLowerCase().trim() } },
          };
        } else {
          params.where = {
            ...params.where,
            oportunity: { prospect: { fullname: { iRegexp: nameSearch.toLowerCase().trim() } } },
          };
        }
      }

      let payments = await api.get("salespayments", { params });
      let normalizeData = payments.data?.results.map(item => normalizeTableDataPayments(item));

      setpaymentsTable(normalizeData);
      setCount(payments.data?.count);
    } catch (error) {
      console.log(error);
    }
    setisLoading(false);
  };

  const closeDrawerFilters = () => {
    setshowFilters(false);
    setShowChips(!showChips);
  };

  const normalizeTableDataPayments = payments => {
    let normalize = {};
    normalize["id"] = payments?.id;
    normalize["nombre"] = `${toUpperCaseChart(payments?.oportunity?.prospect?.name)} ${
      payments?.oportunity?.prospect?.lastname && toUpperCaseChart(payments?.oportunity?.prospect?.lastname)
    } `;
    normalize["comision"] = formatNumber(payments?.comission);
    normalize["monto"] = formatNumber(payments?.payment);
    normalize["pagado"] = payments?.ispaid ? "Pagado" : "Pendiente";
    normalize["fecha limite"] = formatDate(payments?.date);
    normalize["expirado"] = checkIfItExpired(payments?.date);
    normalize["Se vendio en"] = formatDate(payments?.oportunity?.soldat);
    normalize["fase oportunidad"] = payments?.oportunity?.phase;
    normalize["fase prospecto"] = payments?.oportunity?.prospect?.phase;
    normalize["concepto"] = payments?.oportunity?.concept;
    normalize.oportunityId = payments?.oportunityId;
    normalize.lastTrackingDate = payments?.oportunity?.prospect?.lastTrackingcreatedAt;
    normalize.itemBD = payments?.oportunity?.prospect;

    return normalize;
  };

  const drawerPagos = (itemPayment, isClickOpenPreview) => {
    if (isClickOpenPreview) {
      setOportunityId(itemPayment.oportunityId);
      getProspect(itemPayment.itemBD.id);
      setOpenDrawerPagos(true);
    } else {
      router.push({ pathname: `/pagos/pago_completo/`, query: { i: itemPayment.id, o: itemPayment.oportunityId } });
    }
  };

  const handleClickPaymentComplete = itemPayment => {
    router.push({ pathname: `/pagos/pago_completo/`, query: { i: itemPayment.id, o: itemPayment.oportunityId } });
  };

  const handleClickEditPayment = itemPayment => {
    router.push({ pathname: `/pagos/editarPagos/`, query: { i: itemPayment.id, o: itemPayment.oportunityId } });
  };

  //Marcar como pagado
  const checkPayment = async itemClient => {
    let payment = await api.get(`salespayments/${itemClient.id}`);

    setSelectedPayment(payment.data);
    handleOpenModalMarkAsPaid(true);
  };

  const startNameOrEmailSearch = () => {
    setShowNameSearch({ ...showNameSearch, active: true, name: nameSearch?.toLowerCase() });
  };

  const cancelFilters = () => {
    setShowChips(!showChips);
    setFlag(!flag);
    closeDrawerFilters();
  };

  const getExecutivesFromManager = async () => {
    let params = { where: { groupId: groupId, companyId: companyId }, keys: "id", all: "1" };
    let res = await api.get("/ejecutives", { params });
    return res.data.results.map(item => item.id);
  };

  const handleOpenModalMarkAsPaid = () => setOpenModalMarkAsPaid(true);
  const handleCloseModalMarkAsPaid = () => setOpenModalMarkAsPaid(false);

  return (
    <MainLayout>
      <OportinitiesStyled>
        <Head>
          <title>CRM JOBS - Cuentas por Cobrar</title>
        </Head>
        {/* <SideBar open={open} setOpen={setOpen} />
      <NavBarDashboard sideBar={true} /> */}
        <div className="main">
          <div className="ctr_oportunities">
            {activeteSeeFullPayment ? (
              <SeeFullPayment
                activeteSeeFullPayment={activeteSeeFullPayment}
                setActiveteSeeFullPayment={setActiveteSeeFullPayment}
                dataDrawerPagos={dataDrawerPagos}
              />
            ) : (
              <>
                <div className="head__title">
                  <h1>Cuentas Por Cobrar</h1>
                  <p className="total">
                    <People />
                    {count} Registros
                    <Cached className="reloadIcon" onClick={() => setRecharge(!recharge)} />
                  </p>
                </div>

                <InputFilter
                  searchNameOrEmail={nameSearch}
                  setSearchNameOrEmail={setNameSearch}
                  openDrawer={() => setshowFilters(true)}
                  startNameOrEmailSearch={startNameOrEmailSearch}
                  setOrderTablePage={setSkip}
                  placeholder={"Ingresa Nombre"}
                />

                <ChipsPayments
                  filters={filters}
                  setFilters={setFilters}
                  recharge={recharge}
                  setRecharge={setRecharge}
                  showNameSearch={showNameSearch}
                  setShowNameSearch={setShowNameSearch}
                  setNameSearch={setNameSearch}
                  drawerFilters={drawerFilters}
                  setDrawerFilters={setDrawerFilters}
                />

                <AscendingAndDescendingOrder
                  falling={falling}
                  setFalling={setFalling}
                  order={order}
                  setOrder={setOrder}
                  addOptions={[{ label: "Fecha límite", value: "date" }]}
                />

                {isLoading ? (
                  <LoadingImage />
                ) : (
                  <>
                    <TableComponent
                      data={paymentsTable}
                      id="nombre"
                      heads={heads}
                      secondaryColor="#dce1f6"
                      primaryColor="#405189"
                      handleClickName={drawerPagos}
                      handleClickPaymentComplete={handleClickPaymentComplete}
                      handleClickCheckPayment={checkPayment}
                      handleClickEditPayment={handleClickEditPayment}
                    />
                    <PaginationWithText
                      total={count}
                      actualPage={skip}
                      setActualPage={setSkip}
                      totalPages={Math.ceil(count / limit)}
                    />
                  </>
                )}
              </>
            )}
          </div>
        </div>

        <DrawerPayments
          showFilters={showFilters}
          closeDrawerFilters={closeDrawerFilters}
          filters={filters}
          setFilters={setFilters}
          cancelFilters={cancelFilters}
          setDrawerFilters={setDrawerFilters}
        />

        <DrawerPagos
          setActiveteSeeFullPayment={setActiveteSeeFullPayment}
          activeteSeeFullPayment={activeteSeeFullPayment}
          openDrawerPagos={openDrawerPagos}
          setOpenDrawerPagos={setOpenDrawerPagos}
          dataDrawerPagos={dataDrawerPagos}
          load={load}
          oportunityId={oportunityId}
          recharge={recharge}
        />

        {selectedPayment && (
          <ModalMarkAsPaid
            open={openModalMarkAsPaid}
            handleClose={handleCloseModalMarkAsPaid}
            item={selectedPayment}
            setRecharge={setRecharge}
            recharge={recharge}
          />
        )}

        {alert?.show && (
          <AlertGlobal
            severity={alert.severity}
            message={alert.message}
            show={alert.show}
            type={alert.type}
            recharge={recharge}
          />
        )}
      </OportinitiesStyled>
    </MainLayout>
  );
}
