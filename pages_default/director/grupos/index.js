import React, { useContext, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import DirectorLayout from "../../../layouts/DirectorLayout";
import { userSelector } from "../../../redux/slices/userSlice";
import { saveAs } from "file-saver";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const heads = ["id", "nombre", "Monto Vendido", "Total Prospectos", "Total Oportunidades", "Total Clientes"];

export default function Grupos() {
  const router = useRouter();
  const { directorOptionsGroups: options } = useContext(CommonFiltersContext);
  const [valueToFind, setValueToFind] = useState({ search: false, keySearch: "", type: "inQuery" });
  const [order, setOrder] = useState("totalAmount");
  const [groupsTable, setGroupsTable] = useState([]);
  const [count, setCount] = useState(0);
  const [refetch, setRefetch] = useState(false);
  const [isReadyLocalStorage, setIsReadyLocalStorage] = useState(false);
  const { page, limit, handlePage } = usePagination({ defaultLimit: 10, defaultPage: 1 });
  const [isFetchingGroups, setIsFetchingGroups] = useState(false);
  const [falling, setFalling] = useState("");
  const [filters, setFilters] = useState([]);
  const [orderByData, setOrderByData] = useState([]);
  const [dataDrawer, setDataDrawer] = useState([]);
  const { open, toggleModal } = useModal();
  const [checkedUsers, setCheckedUsers] = useState([]);
  const [idsGroupsToCompare, setIdsGroupsToCompare] = useState([undefined, undefined]);
  const [groupsList, setGroupsList] = useState([]);
  const [showCompares, setShowCompares] = useState(false);
  const [openCompare, setOpenCompare] = useState(false);
  const [loadCompare, setLoadCompare] = useState(false);
  const [openModalReports, setOpenModalReports] = useState(false);
  const [groupsToCompare, setGroupsToCompare] = useState([undefined, undefined]);
  const [rowSelected, setRowSelected] = useState(undefined);
  const defaultFilter = [
    {
      id: "soldat",
      label: "Fecha de Venta",
      value: [dayjs().startOf("month"), dayjs().endOf("month").format()],
      getNameChip: "label",
      getValue: "value",
      identifier: "soldat",
      type: "inQuery",
      inQueryParent: "oportunity",
      typeof: "date",
      name: "Mes Actual",
    },
  ];
  const generateQuery = () => {
    let query = {};
    for (let i = 0; i < filters.length; i++) {
      const currentQuery = filters[i];
      if (currentQuery.type === "inQuery") {
        if (currentQuery.typeof === "date") {
          query[currentQuery.inQueryParent] = {
            [currentQuery.id]: {
              between: currentQuery.value,
            },
          };
        }
      } else {
        if (currentQuery.typeof === "date") {
          query[currentQuery.id] = {
            between: currentQuery.value,
          };
        } else {
          if (currentQuery.id === "keySearch") {
            query.name = currentQuery.value;
          } else {
            query[currentQuery.id] = currentQuery.value;
          }
        }
      }
    }
    return query;
  };

  useEffect(() => {
    const getGroups = async () => {
      let res = await api.get("groups?all=1");
      setGroupsList(res.data.results);
    };
    getGroups();
    getLocalStorage();
  }, []);

  useEffect(() => {
    getGroups();
  }, [page, order, falling, refetch, isReadyLocalStorage]);

  useEffect(() => {}, []);

  const validateOrder = () => {
    let objectOrderLocalStorage = {
      isDescendent: falling ? true : false,
      orderBy: order,
    };
    //valida como se ordenaran los datos, y los guarda como un objecto en el localstorage al momento se hacer un cambio
    saveInLocalStorage(objectOrderLocalStorage, "orderDirectorGroups");
    return `${falling}${order}`;
  };

  const getLocalStorage = () => {
    let orderDirectorGroups = localStorage.getItem("orderDirectorGroups");
    let filtersDirectorGroups = localStorage.getItem("filtersDirectorGroups");
    if (filtersDirectorGroups) {
      let formatFilters = JSON.parse(filtersDirectorGroups);
      setFilters(formatFilters);
    } else {
      setFilters(defaultFilter);
      saveInLocalStorage(defaultFilter, "filtersDirectorGroups");
    }

    if (orderDirectorGroups) {
      let formatOrders = JSON.parse(orderDirectorGroups);
      let isDescendent = formatOrders.isDescendent ? "-" : "";
      if (formatOrders.orderBy) {
        setOrder(formatOrders.orderBy);
      } else {
        setOrder("");
      }
      setFalling(isDescendent);
    }
    setIsReadyLocalStorage(true);
  };

  const getGroups = async () => {
    setIsFetchingGroups(true);
    if (isReadyLocalStorage === false) return;
    try {
      let params = {
        where: JSON.stringify(generateQuery()),
        order: "-totalAmount",
        count: 1,
        skip: page,
        limit: limit,
      };
      if (order) {
        params.order = validateOrder();
      }
      let responseGroups = await api.get("dashboard/groupssacpq", { params: params });
      let groupsNormalized = normalizeGroupsDR(responseGroups.data.results);
      setGroupsTable(groupsNormalized);
      setCount(responseGroups.data.count);
      saveInLocalStorage(filters, "filtersDirectorGroups");
      setIsFetchingGroups(false);
    } catch (error) {
      setIsFetchingGroups(false);
      console.log(error);
    }
  };

  const saveInLocalStorage = (data, identifier) => localStorage.setItem(identifier, JSON.stringify(data));

  const handleRefetchRequest = () => setRefetch(!refetch);

  const handleClickName = item => {
    router.push(`/director/grupos/${item.id}`);
  };
  const handleOpenGroup = rowSelected => {
    setDataDrawer(rowSelected);
    toggleModal();
  };

  const exportReportByGroup = e => {
    setRowSelected(e);
    setOpenModalReports(true);
  };

  const handleOnChangeSelectCompare = (e, index) => {
    setIdsGroupsToCompare(idsGroupsToCompare => {
      return [...idsGroupsToCompare.slice(0, index), e ? e : undefined, ...idsGroupsToCompare.slice(index + 1)];
    });
  };

  const handleClickCompare = value => {
    setShowCompares(value);
    if (idsGroupsToCompare[0] === undefined || idsGroupsToCompare[1] === undefined) return;
  };

  const handleClose = () => {
    setIdsGroupsToCompare([undefined, undefined]);
    handleClickCompare(false);
  };
  const handleOpenCompare = () => {
    setShowCompares(true);
  };
  const handleCompare = () => {
    if (
      idsGroupsToCompare[0]?.id === undefined ||
      idsGroupsToCompare[1]?.id === undefined ||
      idsGroupsToCompare[0]?.id === idsGroupsToCompare[1]?.id
    )
      return;
    setLoadCompare(true);
    let query1 = { id: idsGroupsToCompare[0]?.id };
    let query2 = { id: idsGroupsToCompare[1]?.id };

    let query3 = { groupId: idsGroupsToCompare[0]?.id };
    let query4 = { groupId: idsGroupsToCompare[1]?.id };

    Promise.all([
      api
        .get(`dashboard/groupssacpq?where=${JSON.stringify(query1)}`)
        .then(res1 => {
          setGroupsToCompare(groupsToCompare => {
            return [...groupsToCompare.slice(0, 0), res1.data.results[0], ...groupsToCompare.slice(1)];
          });
          return api.get(`dashboard/ejecutivessopc?where=${JSON.stringify(query3)}`);
        })
        .then(res3 => {
          if (res3.data.results.length !== 0) {
            let clients = 0;
            let oportunities = 0;
            let prospects = 0;
            let sales = 0;

            res3.data.results.map(user => {
              clients += +user.totalClients;
              oportunities = +user.totalOportunities;
              prospects = +user.totalProspects;
              sales = +user.totalSales;
            });
            setGroupsToCompare(prevState => {
              const updatedGroups = [...prevState];
              updatedGroups[0] = {
                ...updatedGroups[0],
                totalClients: clients,
                totalOportunities: oportunities,
                totalProspects: prospects,
                totalSales: sales,
              };
              return updatedGroups;
            });
          }
        }),
      api
        .get(`dashboard/groupssacpq?where=${JSON.stringify(query2)}`)
        .then(res2 => {
          setGroupsToCompare(groupsToCompare => {
            return [...groupsToCompare.slice(0, 1), res2.data.results[0], ...groupsToCompare.slice(2)];
          });
          return api.get(`dashboard/ejecutivessopc?where=${JSON.stringify(query4)}`);
        })
        .then(res4 => {
          if (res4.data.results.length !== 0) {
            let clients = 0;
            let oportunities = 0;
            let prospects = 0;
            let sales = 0;

            res4.data.results.map(user => {
              clients += +user.totalClients;
              oportunities = +user.totalOportunities;
              prospects = +user.totalProspects;
              sales = +user.totalSales;
            });

            setGroupsToCompare(prevState => {
              const updatedGroups = [...prevState];
              updatedGroups[1] = {
                ...updatedGroups[1],
                totalClients: clients,
                totalOportunities: oportunities,
                totalProspects: prospects,
                totalSales: sales,
              };
              return updatedGroups;
            });
          }
        }),
    ])
      .then(([]) => {
        setLoadCompare(false);
        setOpenCompare(true);
      })
      .catch(error => console.log("error", error));
  };
  const restorePage = () => {
    if (page > 1) {
      setPage(1);
    }
  };
  return (
    <DirectorLayout>
      <ProspectosStyled>
        <div className="main">
          <div className="container">
            <HeadProspects count={count} refetch={() => setRefetch(!refetch)} title="Grupos" />
            <SearchBox
              value={valueToFind}
              setValue={setValueToFind}
              restorePage={restorePage}
              placeholder={"Ingresa Nombre del Grupo"}
            />
            <Box display="flex" justifyContent="right" mb={1}>
              <DataOrder
                falling={falling}
                setFalling={setFalling}
                order={order}
                setOrder={setOrder}
                addOptions={options.orderByOptions}
                addOptionsOrderBy={[
                  { label: "Descendente", value: "-" },
                  { label: "Ascendente ", value: "" },
                ]}
              />
              <Filters
                options={options.optionsFilters}
                keySearchValue={valueToFind}
                filters={filters}
                setFilters={setFilters}
                refetch={handleRefetchRequest}
              />
            </Box>
            <Chips filters={filters} setFilters={setFilters} refetch={handleRefetchRequest} notDelete={"date"} />
            <TableLimenka
              data={groupsTable}
              activeCheck
              primaryColor="#776ceb"
              secondaryColor="#dce1f6"
              heads={heads}
              id="tablegroupsdirx"
              isFetching={isFetchingGroups}
              showActions
              showGeneralActions
              isCompare
              checkedUsers={checkedUsers}
              setCheckedUsers={setCheckedUsers}
              actions={[
                {
                  title: "Descargar reporte por mes",
                  action: e => exportReportByGroup(e),
                  icon: <Edit />,
                },
              ]}
              generalActions={[
                {
                  title: "Comparar",
                  action: e => handleOpenCompare(true),
                  icon: <CompareArrows />,
                  isLoading: loadCompare,
                },
              ]}
              customColums={[
                {
                  columname: "nombre",
                  component: (item, itemData, isPar, isNew) => {
                    return <TableIndex item={item} itemData={itemData} isPar={isPar} isNew={isNew} />;
                  },
                },
              ]}
              generalActionsExtra={
                <SelectCompareExecutives
                  selectOptions={groupsList}
                  handleOnChangeSelectCompare={handleOnChangeSelectCompare}
                  handleClickCompare={handleClickCompare}
                  showCompares={true}
                  setOpenCompare={handleCompare}
                  idsExecutivesToCompare={idsGroupsToCompare}
                  handleClose={handleClose}
                  loadCompare={loadCompare}
                />
              }
              showCompares={showCompares}
              handleCloseCompare={handleClose}
            />
            <PaginationDirector count={count} limit={limit} handlePage={handlePage} page={page} typeOfTitle="grupos" />
          </div>
          <ModalDates open={openModalReports} setOpen={setOpenModalReports} rowSelected={rowSelected} />
        </div>

        <ModalCompare
          open={openCompare}
          setOpen={setOpenCompare}
          toCompare={groupsToCompare}
          setOpenCompare={setOpenCompare}
        />
      </ProspectosStyled>
      <PreviewGroup isOpen={open} close={toggleModal} group={dataDrawer} />
    </DirectorLayout>
  );

  function TableIndex({ item, itemData, isPar, isNew }) {
    const getDiferrenceDates = date => dayjs(date).fromNow();

    return (
      <TableDataId className="column_id" isPar={isPar} isNew={isNew}>
        <div className="content">
          <div className="content__flex">
            <div className="content__more"></div>
            <Tooltip title="Abrir Vista Previa">
              <p onClick={() => handleOpenGroup(itemData, true)} className="name">
                {item}
              </p>
            </Tooltip>
            <div className="icon-bg">
              <Tooltip title="Abrir Prospecto">
                <OpenInNew className="openprospect" onClick={() => handleClickName(itemData, false)} />
              </Tooltip>
            </div>
          </div>
          <div className="content__more">
            <p className="txt-lastracking">
              Ultimo seguimiento <span>{getDiferrenceDates(itemData?.lastTrackingDate)} </span>
            </p>
            <p className="txt-createdAt">
              Creado el <span>{dayjs(itemData?.createdAt).format("DD/MM/YYYY")} </span>
            </p>
          </div>
        </div>
      </TableDataId>
    );
  }

  function HeadProspects({ count = 0, title = "", refetch }) {
    //* Styles from index prospects
    const router = useRouter();
    const navigate = () => router.push("/prospectos/nuevo");

    return (
      <div className="head">
        <div className="title">
          <h1>{title}</h1>
          <div className="totalrows">
            <People />
            <p> {count} Registros</p>
            <Cached onClick={refetch} />
          </div>
        </div>
      </div>
    );
  }
}

function SearchProspects({ value, setValue }) {
  const handleOnChange = e => {
    setValue(e.target.value);
  };

  const handleKeyDown = e => {
    if (e.key === "Enter" && e.target.value.length > 0) {
      setValue(e.target.value);
    }
  };

  return (
    <div className="search">
      <div className="inputicon">
        <SearchOutlined className="searchicon" />
        <input
          value={value}
          onChange={e => handleOnChange(e)}
          onKeyDown={e => handleKeyDown(e)}
          type="text"
          placeholder="Ingresa nombre o correo de prospecto"
        />
      </div>
    </div>
  );
}

import styled from "styled-components";
import Head from "next/head";
import SideBar from "../../../components/SideBar";
import NavBarDashboard from "../../../components/NavBarDashboard";
import RecentActivityDirector from "../../../components/UI/organism/RecentActivityDirector";
import {
  Add,
  AddAlert,
  AttachMoney,
  Cached,
  CompareArrows,
  Edit,
  OpenInNew,
  People,
  SearchOutlined,
  TableChartOutlined,
} from "@material-ui/icons";
import { Box, Button, Checkbox, Chip, Tooltip } from "@material-ui/core";
import { colors } from "../../../styles/global.styles";
import TableLimenka from "../../../components/UI/organism/TableLimenka";
import useFetch from "../../../hooks/useFetch";
import { api } from "../../../services/api";
import { normalizeGroupsDR, normalizeTableDataProspect } from "../../../utils/normalizeData";
import { useEffect } from "react";
import { TableDataId } from "../../../components/UI/organism/TableLimenka/styles";
import dayjs from "dayjs";
import PaginationDirector from "../../../components/UI/molecules/PaginationTable";
import usePagination from "../../../hooks/usePagination";
import { useRouter } from "next/router";
import { commonSelector } from "../../../redux/slices/commonSlice";
import Filters from "../../../components/Filters";
import { handleGlobalAlert } from "../../../utils";
import useModal from "../../../hooks/useModal";
import PreviewGroup from "../../../components/previewGroup";
import SelectCompareExecutives from "../../../components/UI/atoms/SelectCompareExecutives";
import ModalCompare from "../../../components/ModalCompare";
import ModalDateDirector from "../../../components/UI/organism/ModalDateDirector";
import ReactDatePicker from "react-datepicker";
import ModalDates from "../../../components/ModalDates";
import { CommonFiltersContext } from "../../../context/commonFiltersContext";
import Chips from "../../../components/ChipsFilters";
import DataOrder from "../../../components/DataOrder";
import SearchBox from "../../../components/SearchBox";

export const ProspectosStyled = styled.div`
  /* width: 100%; */
  /* display: flex; */
  overflow: hidden;
  height: 100%;
  background-color: #f1f1f1;

  * {
    margin: 0;
  }

  .main {
    height: 100%;
    overflow-y: auto;
  }

  .main h1 {
    font-size: 24px;
    margin-bottom: 10px;
  }

  .container {
    width: calc(100% - 40px);
    margin: auto;
    margin-top: 20px;
    margin-bottom: 20px;
    /* min-height: calc(100% - 200px); */
    padding: 25px 20px;
    background: #fff;
    border-radius: 10px;
    box-shadow: rgb(149 157 165 / 20%) 0px 8px 24px;
    /* overflow: scroll; */
  }

  .head {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 20px;
  }
  .head .totalrows {
    display: flex;
  }

  .head .btnadd {
    text-transform: capitalize;
    color: #fff;
    background-color: #405189;
  }
  // ** Start Search
  .search {
    margin-bottom: 20px;
  }

  .inputicon {
    position: relative;

    .searchicon {
      position: absolute;
      top: 10px;
      left: 8px;
    }

    input {
      width: 100%;
      height: 40px;
      border: none;
      border-radius: 4px;
      border: 1px solid #bdbdbd;
      padding-left: 40px;

      &:focus {
        outline: 1px solid ${colors.primaryColor};
      }
    }
  }
  // ** Finish Search

  // ** Start Filter Section

  .filters {
    display: inline-block;
    background-color: #dad8db;
    select {
      height: 30px;
      border: none;
      border-radius: 4px;
      border: 1px solid #bdbdbd;
    }
  }
  .currentfilters {
    .chip {
      background-color: #fff;
      color: ${colors.primaryColor};
      border: 1px solid ${colors.primaryColor};

      svg {
        color: ${colors.primaryColor};
      }
    }
  }
  // ** Finish Filter Section
`;
