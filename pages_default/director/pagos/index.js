import React, { useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import DirectorLayout from "../../../layouts/DirectorLayout";
import { AttachMoney, Check, Edit } from "@material-ui/icons";
import { api } from "../../../services/api";
import { PaymentStyle } from "../../../styles/Director/pagos";
import TableLimenka from "../../../components/UI/organism/TableLimenka";
import PaginationDirector from "../../../components/UI/molecules/PaginationTable";
import usePagination from "../../../hooks/usePagination";
import { handleGlobalAlert } from "../../../utils";
import { Box } from "@material-ui/core";
import Filters from "../../../components/Filters";
import { useDispatch, useSelector } from "react-redux";
import DataOrder from "../../../components/DataOrder";
import useModal from "../../../hooks/useModal";
import { SocketContext } from "../../../context/socketContext";
import { userSelector } from "../../../redux/slices/userSlice";
import { companySelector } from "../../../redux/slices/companySlice";
import DirectorDrawerForPayments from "../../../components/DirectorDrawerForPayments";
import { CommonFiltersContext } from "../../../context/commonFiltersContext";
import SearchProspects from "./components/SearchProspect";
import HeadPayment from "./components/HeadPayment";
import InfoPayments from "./components/InfoPayments";
import PaymentDialog from "./components/PaymentDialog";
import EditPaymentDialog from "./components/EditPaymentDialog";
import TableIndex from "./components/TableIndex";
import ActiveFilters from "./components/ActiveFilters";
import { normalizePayments } from "../../../utils/utils_payments";

export default function Pagos() {
  const router = useRouter();
  const dispatch = useDispatch();
  const directorPayFilters = JSON.parse(localStorage.getItem("directorPayFilters"));
  const { socket } = useContext(SocketContext);
  const { open, toggleModal } = useModal();
  const [count, setCount] = useState(0);
  const [valueToFind, setValueToFind] = useState({ search: false, keySearch: "" });
  const [paymentsTable, setPaymentsTable] = useState();
  const [isFetching, setIsFetching] = useState(false);
  const { page, setPage, limit, handlePage } = usePagination({ defaultLimit: 10, defaultPage: 1 });
  const [refetch, setRefetch] = useState(false);
  const [filters, setFilters] = useState(directorPayFilters ? directorPayFilters : []);
  const [ASC, setASC] = useState(true);
  const [order, setOrder] = useState("createdAt");
  const [dataOportunity, setDataOportunity] = useState({});
  const [recharge, setRecharge] = useState(false);
  const { id_user, name, groupId } = useSelector(userSelector);
  const { id_company } = useSelector(companySelector);
  const [optionSelected, setOptionSelected] = useState("tracking");
  const [drawerHead, setDrawerHead] = useState("");
  const [openConfirmPayment, setOpenConfirmPayment] = useState(false);
  const [openEditPaymentDialog, setOpenEditPaymentDialog] = useState(false);
  const [dataEditPaymentDialog, setDataEditPaymentDialog] = useState();
  const [idToConfirmPayment, setIdToConfirmPayment] = useState();
  const { directorOptionsPayments: options } = useContext(CommonFiltersContext);

  //Regresar a la primer pagina
  useEffect(() => {
    setPage(1);
  }, [filters, order, ASC]);

  //Recargar la pagina
  useEffect(() => {
    getPayments();
    setPage(1);
  }, [recharge]);

  //Aplica el filtro de la barra de busqueda
  useEffect(() => {
    getPayments();
  }, [filters, page, ASC, order]);

  useEffect(() => {
    saveLocalStorage(filters);
  }, [filters]);

  const heads = ["id", "nombre", "comisión", "monto", "pagado", "expirado", "fecha limite", "se vendió en"];

  const addOptions = [
    { label: "Fecha Creación ", value: "createdAt" },
    { label: "Fecha Actualización", value: "updatedAt" },
    { label: "Fecha Limite", value: "date" },
  ];

  const addOptionsOrderBy = [
    { label: "Descendente", value: "-" },
    { label: "Ascendente ", value: "" },
  ];

  const actions = [
    {
      title: "Ver todos los pagos",
      action: e =>
        setFilters([
          {
            label: "Todos los Pagos",
            id: "allPayments",
            value: e.itemBD.oportunityId,
            name: e.nombre,
            getValue: "value",
            identifier: "oportunityId",
            type: "query",
          },
        ]),
      icon: <AttachMoney />,
    },
    { title: "Editar Pago", action: e => editPayment(e), icon: <Edit /> },
    { title: "Marcar Como Pagado", action: e => checkPayment(e), icon: <Check /> },
  ];

  const customColums = [
    {
      columname: "nombre",
      component: (item, itemData, isPar, isNew) => {
        return (
          <TableIndex
            handleClickName={handleClickName}
            item={item}
            itemData={itemData}
            isPar={isPar}
            isNew={isNew}
            openPreview={toggleModal}
            setData={setDataOportunity}
            setDrawerHead={setDrawerHead}
            setOptionSelected={setOptionSelected}
            option={"payments"}
          />
        );
      },
    },
  ];

  const saveLocalStorage = valor => {
    localStorage.setItem("directorPayFilters", JSON.stringify(valor));
  };

  const handleRefetchRequest = () => {
    setRefetch(!refetch);
  };

  const handlClickDeleteFilter = (_, itemXX) => {
    let newArrayFilters = [...filters];
    let query = newArrayFilters.filter((item, index) => item.identifier !== itemXX.identifier);
    setFilters(query);
    setRefetch(!refetch);
  };

  const getExecutivesFromManager = async groupId => {
    let params = { where: { groupId: groupId }, keys: "id", all: "1" };
    let res = await api.get("/ejecutives", { params });
    return res.data.results.map(item => item.id);
  };

  const gerateQuery = async () => {
    let query = { ejecutiveId: [] };
    for (let i = 0; i < filters?.length; i++) {
      const currentQuery = filters[i];
      console.log("QQ", currentQuery.id);
      switch (currentQuery.id) {
        case "allPayments":
          query = { ...query, oportunityId: currentQuery.value };
          break;
        case "keySearch":
          let key = currentQuery.value;
          if (key) {
            query = { oportunity: { prospect: { fullname: { iRegexp: `${key.trim().toLocaleLowerCase()}` } } } };
          }
          break;
        case "ejecutiveId":
          query = { ...query, ejecutiveId: [...query.ejecutiveId, currentQuery.value] };
          break;
        case "ispaid":
          query = { ...query, ispaid: currentQuery.value };
          break;
        case "groupId":
          let res = await getExecutivesFromManager(currentQuery.value);
          res.map(id => (query = { ...query, ejecutiveId: [...query.ejecutiveId, id] }));
          break;
        default:
          if (currentQuery.typeof === "date") {
            query[currentQuery.id] = {
              between: currentQuery.value,
            };
          } else if (currentQuery.typeof === "soldat") {
            query = {
              ...query,
              oportunity: {
                [currentQuery.id]: {
                  between: currentQuery.value,
                },
              },
            };
          }
          break;
      }
    }
    if (Array.isArray(query.ejecutiveId) && query.ejecutiveId.length === 0) {
      delete query.ejecutiveId;
    }

    return query;
  };

  const getPayments = async () => {
    setIsFetching(true);
    let params = {
      order: `${ASC ? "" : "-"}${order}`,
      count: "1",
      skip: page,
      limit: limit,
      join: "oportunity,oportunity.prospect,oportunity.phase",
      include: "oportunity,oportunity.prospect,oportunity.phase",
      where: await gerateQuery(),
    };

    const { data } = await api.get(`/salespayments`, { params });

    //Elimina los id repetidos
    const uniqueArrEntityId = [...new Set(data.results.map(item => item.oportunity.prospect.entityId))];
    const uniqueArrEjecutiveId = [...new Set(data.results.map(item => item.oportunity.prospect.ejecutiveId))];

    const [entityResponse, ejecutiveResponse] = await Promise.all([
      api.get(`/entities/`, { params: { where: { id: uniqueArrEntityId } } }),
      api.get(`/ejecutives/`, { params: { include: "group", where: { id: uniqueArrEjecutiveId } } }),
    ]);

    setPaymentsTable(normalizePayments(data.results, entityResponse.data.results, ejecutiveResponse.data.results));
    setCount(data.count);
    setIsFetching(false);
  };

  const handleClickName = rowSelected => {
    setOptionSelected("payments"); //Cambia a pagos ??
    toggleModal();
  };

  const checkPayment = async pay => {
    if (pay.itemBD.ispaid) {
      handleGlobalAlert("warning", "El pago ya fue marcado como pagado!", "basic", dispatch);
    } else {
      setIdToConfirmPayment(pay);
      handleClickOpenConfirmPayment(true);
    }
  };

  const confirmCheckPayment = async () => {
    handleCloseConfirmPayment();

    const payment = await api.get(`salespayments/${idToConfirmPayment.id}`);

    if (!payment.data.ispaid) {
      payment.data.ispaid = true;
      payment.data.paymentId = payment.data.id;
      delete payment.data.id;

      await api.put("salespayments", { payments: [payment.data] });

      socket?.emit("send_notify_activity", {
        activity: {
          type: "update",
          from: "payments",
          message: `${name} marcó como completado un pago`,
          data: payment.data,
          ejecutiveId: id_user,
          groupId: groupId,
          companyId: id_company,
        },
      });

      handleGlobalAlert("success", "Se marcó como pagado!", "basic", dispatch);
      setRecharge(!recharge);
    }
  };

  const handleClickOpenConfirmPayment = () => {
    setOpenConfirmPayment(true);
  };

  const handleCloseConfirmPayment = () => {
    setOpenConfirmPayment(false);
  };

  //Icono de editar pago en la tabla
  const editPayment = e => {
    console.log("Datos e:", e.itemBD.oportunityId);
    router.push({
      pathname: `/director/pagos/editar`,
      query: {
        o: e.itemBD.oportunityId,
      },
    });
  };

  const handleCloseEditPayment = () => {
    setOpenEditPaymentDialog(false);
  };

  return (
    <DirectorLayout>
      <PaymentStyle>
        <HeadPayment count={count} getPayments={getPayments} title={"Pagos"} recharge={recharge} />

        <SearchProspects setValue={setValueToFind} />

        <Box className="Filter" mb={3}>
          <DataOrder
            falling={ASC}
            setFalling={setASC}
            order={order}
            setOrder={setOrder}
            addOptions={addOptions}
            addOptionsOrderBy={addOptionsOrderBy}
          />
          <Filters
            keySearchValue={valueToFind}
            primaryColor=""
            filters={filters}
            setFilters={setFilters}
            options={options.optionsFilters}
            refetch={handleRefetchRequest}
            closeAfter
          />
        </Box>

        <ActiveFilters filters={filters} onClickDelete={handlClickDeleteFilter} />

        {filters[0]?.id == "allPayments" && (
          <InfoPayments
            info={paymentsTable}
            setDataOportunity={setDataOportunity}
            toggleModal={toggleModal}
            setOptionSelected={setOptionSelected}
            setDrawerHead={setDrawerHead}
            dataOportunity={dataOportunity}
          />
        )}

        <TableLimenka
          data={paymentsTable}
          activeCheck
          primaryColor="#776ceb"
          secondaryColor="#dce1f6"
          heads={heads}
          id="tablepaymentsdirx"
          isFetching={isFetching}
          showActions
          actions={actions}
          customColums={customColums}
        />

        <PaginationDirector count={count} limit={limit} handlePage={handlePage} page={page} typeOfTitle={"pagos"} />

        <DirectorDrawerForPayments
          isOpen={open}
          close={toggleModal}
          oportunity={dataOportunity}
          optionSelected={optionSelected}
          setOptionSelected={setOptionSelected}
          drawerHead={drawerHead}
        />

        <PaymentDialog
          openConfirmPayment={openConfirmPayment}
          idToConfirmPayment={idToConfirmPayment}
          handleCloseConfirmPayment={handleCloseConfirmPayment}
          confirmCheckPayment={confirmCheckPayment}
        />

        <EditPaymentDialog
          openEditPaymentDialog={openEditPaymentDialog}
          handleCloseEditPayment={handleCloseEditPayment}
          dataEditPaymentDialog={dataEditPaymentDialog}
          setRecharge={setRecharge}
          recharge={recharge}
        />
      </PaymentStyle>
    </DirectorLayout>
  );
}
