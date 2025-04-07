import React, { useEffect, useState, useContext } from "react";
import { Button, Chip, IconButton, LinearProgress, Tooltip } from "@material-ui/core";
import {
  Add,
  AddAlert,
  AttachMoney,
  Cached,
  Delete,
  Edit,
  EmojiPeople,
  OpenInNew,
  People,
  SearchOutlined,
  TableChartOutlined,
  Today,
} from "@material-ui/icons";
import dayjs from "dayjs";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import { OportunidadesStyled } from "../../../styles/Director/oportunidades/index.style";
import { api } from "../../../services/api";
import RequestCommon from "../../../services/request_Common";
import { normalizeTableDataOpotunity, normalizeTableDataOpotunityDrDiscarted } from "../../../utils/normalizeData";
import TableLimenka from "../../../components/UI/organism/TableLimenka";
import { TableDataId } from "../../../components/UI/organism/TableLimenka/styles";
import { commonSelector } from "../../../redux/slices/commonSlice";
import Filters from "../../../components/Filters";
import PreviewOportunity from "../../../components/PreviewOportunity";
import useModal from "../../../hooks/useModal";
import DirectorLayout from "../../../layouts/DirectorLayout";
import DataOrder from "../../../components/DataOrder";
import PaginationDirector from "../../../components/UI/molecules/PaginationTable";
import usePagination from "../../../hooks/usePagination";
import { CommonFiltersContext } from "../../../context/commonFiltersContext";
import SearchBox from "../../../components/SearchBox";
import Chips from "../../../components/ChipsFilters";
import ModalReasigned from "../../../components/ModalReasigned";
import ModalNoReassigned from "../../../components/ModalNoReassigned";

const heads = [
  "id",
  // "prospectId",
  "nombre",
  "correo",
  "télefono",
  "monto",
  "certeza",
  "categoría de interes",
  "concepto",
  "fase",
  "origen",
  "género",
  "puesto",
  "Empresa",
  "etiquetas",
  "ultimo Seguimiento",
  "fecha de cierre",
  "fecha de creacion",
];
const headsDiscarted = [
  "id",
  // "prospectId",
  "nombre",
  "correo",
  "télefono",
  "concepto",
  "certeza",
  "ejecutivo",
  "ultimo Seguimiento",
  "razon de descarte",
  "fecha de descartado",
];
export default function Oportunidades() {
  const { directorOptionsOportunities: options } = useContext(CommonFiltersContext);
  const { open, toggleModal } = useModal();
  const [oportunitiesTable, setOportunitiesTable] = useState([]);
  const [filters, setFilters] = useState([]);
  const [totalOportunities, setTotalOportunities] = useState(0);
  const { page, setPage, limit, handlePage } = usePagination({ defaultLimit: 15, defaultPage: 1 });
  const [ASC, setASC] = useState("");
  const [order, setOrder] = useState("createdAt");
  const [valueToFind, setValueToFind] = useState({ search: false, keySearch: "", type: "inQuery" });
  const [isReadyLocalStorage, setIsReadyLocalStorage] = useState(false);
  const [isLoaderData, setIsLoaderData] = useState(false);
  const [refetch, setRefetch] = useState(false);
  const [dataOportunity, setDataOportunity] = useState({});
  const dateNowMonth = [dayjs().startOf("month").format(), dayjs().endOf("month").format()];
  const [showDiscatedTable, setshowDiscatedTable] = useState(false);
  const [checkedUsers, setCheckedUsers] = useState([]);
  const [isMultiReasign, setIsMultiReasign] = useState(false);
  const [openReasing, setopenReasing] = useState(false);
  const [Prospect, setProspect] = useState({});
  const [openNoAdd, setOpenNoAdd] = useState(false);
  const [usersNoAdded, setUsersNoAdded] = useState([]);

  const defaultFilter = [
    {
      deleteId: ["lastTrackingcreatedAt"],
      getNameChip: "label",
      getValue: "value",
      id: "createdAt",
      identifier: "createdAt",
      label: "Fecha de Creación",
      name: "Mes Actual",
      type: "query",
      typeof: "date",
      value: dateNowMonth,
    },
  ];
  useEffect(() => {
    getLocalStorage();
  }, []);

  useEffect(() => {
    getAllOportunities();
    setCheckedUsers([]);
  }, [page, refetch, isReadyLocalStorage, ASC, order]);

  useEffect(() => {
    if (filters.length !== 0) {
      for (var i = 0; i < filters.length; i++) {
        if (filters[i].id == "discarted") {
          setshowDiscatedTable(true);
          break;
        } else {
          setshowDiscatedTable(false);
        }
      }
    } else {
      setshowDiscatedTable(false);
    }
  }, [filters]);

  const handleRefetch = () => setRefetch(!refetch);
  const getLocalStorage = () => {
    let filtersDirectorOportunity = localStorage.getItem("filtersDirectorOportunity");
    let orderDirectorOportunity = localStorage.getItem("orderDirectorOportunities");
    if (filtersDirectorOportunity) {
      let formatFilters = JSON.parse(filtersDirectorOportunity);
      if (formatFilters.length > 0) {
        setFilters(formatFilters);
      } else {
        setFilters(defaultFilter);
      }
    } else {
      setFilters(defaultFilter);
    }
    if (orderDirectorOportunity) {
      let formatOrders = JSON.parse(orderDirectorOportunity);
      let isDescendent = formatOrders.isDescendent ? "-" : "";
      setASC(isDescendent);
      setOrder(formatOrders.orderBy);
    }
    setIsReadyLocalStorage(true);
  };
  const generateQuery = () => {
    let query = {};
    query.iscloseout = false;
    let queryFilters = filters?.filter(item => item.type === "query");
    for (let i = 0; i < queryFilters?.length; i++) {
      if (queryFilters[i].value) {
        switch (queryFilters[i].id) {
          default:
            if (queryFilters[i].typeof === "date") {
              query[queryFilters[i].id] = {
                between: queryFilters[i].value,
              };
            } else {
              query[queryFilters[i].id] = queryFilters[i].value;
            }
            break;
        }
      }
    }
    query.prospect = generateInQuery();
    return JSON.stringify(query);
  };
  const generateInQuery = () => {
    let inQuery = {};
    inQuery.isoportunity = true;
    let inQueryFilters = filters?.filter(item => item.type === "inQuery");
    for (let i = 0; i < inQueryFilters?.length; i++) {
      switch (inQueryFilters[i].id) {
        case "keySearch":
          let key = inQueryFilters[i].value;
          if (key) {
            if (key.includes("@")) {
              inQuery.email = { iRegexp: `${key.trim().toLocaleLowerCase()}` };
            } else if (/^[\+]?[(]?[0-9]{1,3}[)]?[-\s\.]?[0-9]{1,3}[-\s\.]?[0-9]{1,4}$/im.test(key.trim())) {
              inQuery.phone = { iRegexp: `${key.trim()}` };
            } else {
              inQuery.fullname = { iRegexp: `${key.trim()}` };
            }
          }
          break;
        case "prospectslabels":
          let label = inQueryFilters[i].value;
          if (label) {
            inQuery[inQueryFilters[i].id] = {
              labelId: inQueryFilters[i].value,
            };
          }
          break;
        case "groupId":
          inQuery.ejecutive = {
            groupId: inQueryFilters[i].value,
          };
          break;

        default:
          if (inQueryFilters[i].value) {
            inQuery[inQueryFilters[i].id] = inQueryFilters[i].value;
          }
          break;
      }
    }
    return inQuery;
  };
  const validateJoins = filtersOportu => {
    let joins;
    if (filtersOportu?.length > 0) {
      let searchFilterLabel = filtersOportu?.filter(item => item.id === "prospectslabels");
      let validateValue = searchFilterLabel[0]?.value;
      if (validateValue) {
        joins = "prospect,prospect.phase,prospect.origin,prospect.ejecutive,cd,cli,pc,prospect.prospectslabels";
      } else {
        joins = "prospect,prospect.phase,prospect.origin,prospect.ejecutive,cd,cli,pc,pl";
      }
    }
    return joins;
  };
  const validateOrder = () => {
    let objectOrderLocalStorage = {
      isDescendent: ASC ? true : false,
      orderBy: order,
    };
    localStorage.setItem("orderDirectorOportunities", JSON.stringify(objectOrderLocalStorage));
    return `${ASC}${order}`;
  };
  const getAllOportunities = async () => {
    setIsLoaderData(true);
    if (isReadyLocalStorage === false) return;
    try {
      let includeValue =
        "prospect,prospect.phase,prospect.origin,prospect.ejecutive,prospect.category,prospect.clientcompany,prospect.clienttype,prospect.prospectslabels";
      let params = {
        where: generateQuery(),
        count: 1,
        include: includeValue,
        join: validateJoins(filters),
        order: validateOrder(),
        subquery: "1",
        skip: page,
        limit: limit,
      };
      let response = await api.get(`oportunities`, { params });
      let dataResults = response.data.results;
      if (showDiscatedTable == true) {
        let normalizeData = dataResults.map(item => normalizeTableDataOpotunityDrDiscarted(item));
        setOportunitiesTable(normalizeData);
      } else {
        let normalizeData = dataResults.map(item => normalizeTableDataOpotunity(item));
        setOportunitiesTable(normalizeData);
      }
      setTotalOportunities(response.data.count);
      saveLocalStorage(filters);
      setIsLoaderData(false);
    } catch (error) {
      setIsLoaderData(false);
      console.log(error);
    }
  };
  const restorePage = () => {
    if (page > 1) setPage(1);
  };
  const saveLocalStorage = filters => localStorage.setItem("filtersDirectorOportunity", JSON.stringify(filters));

  const handleOpenReasignMulti = () => {
    setIsMultiReasign(true);
    setopenReasing(true);
  };
  const handleOpenReasignMultiAll = () => {
    setCheckedUsers(oportunitiesTable);
  };

  const handleDesOpenReasignMultiAll = () => {
    setCheckedUsers([]);
  };

  const handleOpenNoAdd = () => {
    setOpenNoAdd(true);
  };
  const handleCloseNoAdd = () => {
    setOpenNoAdd(false);
  };

  return (
    <DirectorLayout>
      <OportunidadesStyled>
        <div className="main">
          <div className="container">
            <HeadOportunities count={totalOportunities} refetch={handleRefetch} />
            <SearchBox value={valueToFind} setValue={setValueToFind} restorePage={restorePage} />
            <div className="filters">
              <DataOrder
                falling={ASC}
                setFalling={setASC}
                order={order}
                setOrder={setOrder}
                addOptions={[
                  { label: "Fecha Creación ", value: "createdAt" },
                  { label: "Fecha Actualización", value: "updatedAt" },
                  { label: "Fecha de Cierre", value: "estimatedclossing" },
                  { label: "Fecha Ultimo Seguimiento", value: "lastTrackingcreatedAt" },
                  { label: "Monto Cotizado", value: "amount" },
                  { label: "Monto de Productos ", value: "quantity" },
                  { label: "Certeza", value: "certainty" },
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
            <Chips filters={filters} setFilters={setFilters} refetch={handleRefetch} notDelete={"date"} />
            <TableLimenka
              data={oportunitiesTable}
              activeCheck
              primaryColor="#776ceb"
              secondaryColor="#dce1f6"
              id={!showDiscatedTable ? "drtableoportunities" : "drtableoportunitiesDiscarted"}
              heads={!showDiscatedTable ? heads : headsDiscarted}
              isFetching={isLoaderData}
              messageEmptyData={null}
              showConfiguration={true}
              actions={[
                { title: "Editar", action: e => console.log(e), icon: <Edit /> },
                { title: "Crear Venta", action: e => console.log(e), icon: <AttachMoney /> },
                { title: "Cotizar Nuevamente", action: e => console.log(e), icon: <AttachMoney /> },
                { title: "Agregar Seguimiento", action: e => console.log(e), icon: <TableChartOutlined /> },
                { title: "Agregar Pendiente", action: e => console.log(e), icon: <AddAlert /> },
                { title: "Descartar", action: e => console.log(e), icon: <Delete /> },
              ]}
              generalActions={[
                { title: "Reasignar", action: e => handleOpenReasignMulti(e), icon: <EmojiPeople /> },
                {
                  title: `Seleccionar todos (${oportunitiesTable.length})`,
                  action: e => handleOpenReasignMultiAll(e),
                  icon: <EmojiPeople />,
                },
                {
                  title: `Desseleccionar todo`,
                  action: e => handleDesOpenReasignMultiAll(e),
                  icon: <EmojiPeople />,
                },
              ]}
              customColums={[
                {
                  columname: "nombre",
                  component: (item, itemData, isPar, isNew) => {
                    return (
                      <TableIndex
                        item={item}
                        itemData={itemData}
                        isPar={isPar}
                        isNew={isNew}
                        openPreview={toggleModal}
                        setData={setDataOportunity}
                      />
                    );
                  },
                },
              ]}
              showActions
              showGeneralActions
              checkedUsers={checkedUsers}
              setCheckedUsers={setCheckedUsers}
              fromOportunity
            />
            {!isLoaderData && (
              <PaginationDirector
                count={totalOportunities}
                limit={limit}
                handlePage={handlePage}
                page={page}
                typeOfTitle={"oportunidades"}
              />
            )}
          </div>
        </div>
        <ModalReasigned
          open={openReasing}
          setopen={setopenReasing}
          Prospect={Prospect.itemBD}
          prospects={checkedUsers}
          isMultiReasign={isMultiReasign}
          setIsMultiReasign={setIsMultiReasign}
          setProspect={setProspect}
          setFlag={setRefetch}
          flag={refetch}
          handleOpenNoAdd={handleOpenNoAdd}
          setNoAdded={setUsersNoAdded}
          fromOportunity
        />
        <PreviewOportunity isOpen={open} close={toggleModal} oportunity={dataOportunity} />
        <ModalNoReassigned open={openNoAdd} handleCloseNoAdd={handleCloseNoAdd} usersNoAdded={usersNoAdded} />
      </OportunidadesStyled>
    </DirectorLayout>
  );
}

function HeadOportunities({ count = 0, refetch }) {
  const router = useRouter();
  return (
    <div className="head">
      <div className="title">
        <h1>Oportunidades</h1>
        <div className="totalrows">
          <People />
          <p> {count} Registros</p>
          <Cached onClick={() => refetch()} />
        </div>
      </div>
    </div>
  );
}

function TableIndex({ item, itemData, isPar, isNew, openPreview, setData }) {
  const router = useRouter();

  const handleClickName = (item, isClickOpenPreview) => {
    // router.push({ pathname: "/oportunidades/[oportunidad]", query: { oportunidad: item.id } });
    openPreview();
    setData(itemData);
  };

  const getDiferrenceDates = date => {
    if (date == null) return "Sin seguimiento";

    let diference = dayjs(date).fromNow();

    return diference;
  };

  const getSubTitle = (text = "") => {
    if (text.length > 20) {
      return text.slice(0, 20) + "...";
    }

    return text;
  };

  return (
    <TableDataId className="column_id" isPar={isPar} isNew={isNew}>
      <div className="content">
        <div className="content__flex">
          <div className="content__more"></div>
          <Tooltip title="Abrir Vista Previa">
            <p
              onClick={() => {
                console.log(itemData);
                openPreview();
                setData(itemData);
              }}
              className="name"
            >
              {item}
            </p>
          </Tooltip>
          <div className="icon-bg">
            <Tooltip title="Abrir Oportunidad">
              <OpenInNew className="openprospect" onClick={() => handleClickName(itemData, false)} />
            </Tooltip>
          </div>
        </div>
        <div className="content__more">
          <p className="txt-lastracking">
            Ultimo seguimiento: <span>{getDiferrenceDates(itemData?.oportunityData?.lastTrackingcreatedAt)} </span>
          </p>
          <Tooltip title={itemData?.oportunityData?.lastTracking?.observations}>
            <p className="txt-lastracking">
              Seguimiento: <span>{getSubTitle(itemData?.oportunityData?.lastTracking?.observations)} </span>
            </p>
          </Tooltip>
          <p className="txt-createdAt">
            Creado el <span>{dayjs(itemData?.oportunityData?.createdAt).format("DD/MM/YYYY")} </span>
          </p>
        </div>
      </div>
    </TableDataId>
  );
}
