import { useRouter } from "next/router";
import React, { useContext, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import DirectorLayout from "../../../layouts/DirectorLayout";
import { userSelector } from "../../../redux/slices/userSlice";

export default function Prospectos() {
  const { directorOptionsProspects: options } = useContext(CommonFiltersContext);
  const [Alert, setAlert] = useState({ severity: null, show: null, message: "", type: null });
  const { open, toggleModal } = useModal();
  const [dataProspect, setDataProspect] = useState({});
  const [valueToFind, setValueToFind] = useState({ search: false, keySearch: "" });
  const [filters, setFilters] = useState([]);
  const [prospectsTable, setProspectsTable] = useState([]);
  const [totalProspects, setTotalProspects] = useState(0);
  const [refetch, setRefetch] = useState(false);
  const { page, setPage, limit, handlePage } = usePagination({ defaultLimit: 15, defaultPage: 1 });
  const [isFetching, setIsFetching] = useState(false);
  // * Actions
  const [isOpenDrawer, setIsOpenDrawer] = useState(false);
  // * Actions
  const [openReasing, setopenReasing] = useState(false);
  const [Prospect, setProspect] = useState({});
  const [openEdit, setOpenEdit] = useState(false);
  const [isReadyLocalStorage, setIsReadyLocalStorage] = useState(false);
  const [ASC, setASC] = useState(true);
  const [order, setOrder] = useState("createdAt");
  const [prospectPending, setProspectPending] = useState({});
  const [showAddPending, setShowAddPending] = useState(false);
  const handleCloseAddPending = () => setShowAddPending(false);
  const [prospectTrackings, setProspectTrackings] = useState({});
  const handleCloseAddTrackigns = () => setShowAddTrackings(false);
  const [showAddTrackings, setShowAddTrackings] = useState(false);
  const [openWhatsApp, setOpenWhatsApp] = useState(false);
  const handleRefetch = () => setRefetch(!refetch);
  const [checkedUsers, setCheckedUsers] = useState([]);
  const [isMultiReasign, setIsMultiReasign] = useState(false);
  const [openAddPendingMulti, setOpenAddPendingMulti] = useState(false);
  const [openNoAdd, setOpenNoAdd] = useState(false);
  const [usersNoAdded, setUsersNoAdded] = useState([]);
  const dateNowMonth = [dayjs().startOf("month").format(), dayjs().endOf("month").format()];
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
    getAllProspects();
  }, [refetch, page, ASC, order, isReadyLocalStorage]);

  const getLocalStorage = () => {
    let filtersProspects = localStorage.getItem("filtersProspects_Director");
    if (filtersProspects) {
      let formatFilters = JSON.parse(filtersProspects);
      if (formatFilters.length > 0) {
        setFilters(formatFilters);
      } else {
        setFilters(defaultFilter);
      }
    } else {
      setFilters(defaultFilter);
    }
    let orderby = localStorage.getItem("ProspectsDirector_order");
    if (orderby) {
      setOrder(JSON.parse(orderby));
    }

    let asc = localStorage.getItem("ProspectsDirector_asc");
    if (asc) {
      setASC(JSON.parse(asc));
    }
    setIsReadyLocalStorage(true);
  };

  const gerateQuery = () => {
    // handlePage(1);
    let query = {
      isclient: false,
      isoportunity: false,
      discarted: false,
    };
    for (let i = 0; i < filters?.length; i++) {
      const currentQuery = filters[i];
      if (currentQuery.value) {
        switch (currentQuery.id) {
          case "keySearch":
            let key = currentQuery.value;
            if (key) {
              if (key.includes("@")) {
                query.email = { iRegexp: `${key.trim().toLocaleLowerCase()}` };
              } else if (/^[\+]?[(]?[0-9]{1,3}[)]?[-\s\.]?[0-9]{1,3}[-\s\.]?[0-9]{1,4}$/im.test(key.trim())) {
                query.phone = { iRegexp: `${key.trim().toLocaleLowerCase()}` };
              } else {
                query.fullname = { iRegexp: `${key.trim().toLocaleLowerCase()}` };
              }
            }
            break;
          case "groupId":
            query[currentQuery.inQueryParent] = {
              [currentQuery.id]: currentQuery.value,
            };
          default:
            if (currentQuery.typeof === "date") {
              query[currentQuery.id] = {
                between: currentQuery.value,
              };
            } else {
              if (currentQuery.id !== "groupId") {
                query[currentQuery.id] = currentQuery.value;
              }
            }
            break;
        }
      }
    }

    // console.log(query);

    return query;
  };

  const getAllProspects = async () => {
    if (isReadyLocalStorage === false) return;
    setIsFetching(true);
    try {
      // let includeValue =
      //   "category,city,entity,phase,ejecutive,ejecutive.group,clientcompany,origin,clienttype,specialty,postal,prospectslabels,prospectslabels.label";
      let includeValue = "category,city,entity,clienttype,specialty,ejecutive,ejecutive.group,postal,phase,channel";
      let params = {
        count: 1,
        include: includeValue,
        order: `${ASC ? "" : "-"}${order}`,
        // subquery: "1",
        // join: "cat,cy,ey,pe,ejecutive,eg,cy,on,ce,sy,pl,prl,k",
        join: "cat,cy,ey,pe,sp,ejecutive,ejecutive.g,p,ph,ch",
        limit: limit,
        skip: page,
        where: gerateQuery(),
      };

      let resProspects = await api.get("prospects", { params });
      // console.log("resProspects", resProspects.data.results);
      let newProspect = normalizeTableDataProspectDr(resProspects.data.results);
      setProspectsTable(newProspect);
      setTotalProspects(resProspects.data.count);
      saveLocalStorage(filters, "filtersProspects_Director");
      saveLocalStorage(order, "ProspectsDirector_order");
      saveLocalStorage(ASC, "ProspectsDirector_asc");
      setIsFetching(false);
    } catch (error) {
      console.log(error);
      setIsFetching(false);
    }
  };
  const saveLocalStorage = (data, keyLocal) => localStorage.setItem(keyLocal, JSON.stringify(data));
  const handleClickName = rowSelected => {
    rowSelected.prospectId = rowSelected.id;
    setDataProspect(rowSelected);
    toggleModal();
  };
  //reasignacion
  const handleClickReasingProspect = item => {
    setProspect(item);
    setopenReasing(!openReasing);
  };
  //Edicion de prospecto
  const handleClickEditProspect = item => {
    setDataProspect(item.itemBD);
    setOpenEdit(!openEdit);
  };
  const handleClickAddPending = item => {
    setProspectPending(item);
    setShowAddPending(true);
  };
  const handleClickAddTracking = item => {
    setProspectTrackings(item);
    setShowAddTrackings(true);
  };
  const handleClickOpenWhatsApp = item => {
    setDataProspect(item.itemBD);
    setOpenWhatsApp(true);
  };
  const restorePage = () => {
    if (page > 1) setPage(1);
  };
  const handleAlert = (severity, message, type) => {
    setAlert({ severity: severity, show: true, message: message, type: type });
    setTimeout(() => {
      setAlert({ severity: severity, show: false, message: message, type: null });
    }, 3000);
  };
  const handleOpenReasignMulti = () => {
    setIsMultiReasign(true);
    setopenReasing(true);
  };
  const handleOpenPendingMulti = () => {
    setOpenAddPendingMulti(true);
  };
  const handleOpenNoAdd = () => {
    setOpenNoAdd(true);
  };
  const handleCloseNoAdd = () => {
    setOpenNoAdd(false);
  };
  return (
    <DirectorLayout>
      <ProspectosStyled>
        <div className="main">
          <div className="container">
            <HeadProspects count={totalProspects} />
            <SearchProspects value={valueToFind} setValue={setValueToFind} restorePage={restorePage} />
            <Box className="dataOrder" mb={2}>
              <DataOrder
                falling={ASC}
                setFalling={setASC}
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
              <Filters
                options={options.optionsFilters}
                keySearchValue={valueToFind}
                refetch={handleRefetch}
                filters={filters}
                setFilters={setFilters}
                restorePage={restorePage}
              />
            </Box>
            <Chips filters={filters} setFilters={setFilters} refetch={handleRefetch} notDelete={"date"} />
            <TableLimenka
              data={prospectsTable}
              activeCheck
              primaryColor="#776ceb"
              secondaryColor="#dce1f6"
              heads={headsProspectDR}
              id="tableprospects"
              isFetching={isFetching}
              handleClickOpenWhatsApp={handleClickOpenWhatsApp}
              showActions
              showGeneralActions
              checkedUsers={checkedUsers}
              setCheckedUsers={setCheckedUsers}
              actions={[
                {
                  title: "Editar",
                  action: e => handleClickEditProspect(e),
                  icon: <Edit />,
                },

                { title: "Agregar Seguimiento", action: e => handleClickAddTracking(e), icon: <TableChartOutlined /> },
                { title: "Agregar Pendiente", action: e => handleClickAddPending(e), icon: <AddAlert /> },
                { title: "Reasignar", action: e => handleClickReasingProspect(e), icon: <Person /> },
              ]}
              generalActions={[
                { title: "Reasignar", action: e => handleOpenReasignMulti(e), icon: <EmojiPeople /> },
                { title: "Agregar pendientes", action: e => handleOpenPendingMulti(e), icon: <Today /> },
              ]}
              customColums={[
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
                      />
                    );
                  },
                },
              ]}
            />
            <PaginationDirector
              count={totalProspects}
              limit={limit}
              handlePage={handlePage}
              page={page}
              typeOfTitle={"prospectos"}
            />
          </div>
        </div>
        <PreviewProspect isOpen={open} close={toggleModal} prospect={dataProspect} />
      </ProspectosStyled>
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
      />

      <AddPending
        prospect={prospectPending}
        open={showAddPending}
        close={handleCloseAddPending}
        handleAlert={handleAlert}
        setAlert={setAlert}
        flag={refetch}
        setFlag={setRefetch}
      />
      <ModalTracking
        prospect={prospectTrackings}
        open={showAddTrackings}
        close={handleCloseAddTrackigns}
        handleAlert={handleAlert}
        setAlert={setAlert}
        flag={refetch}
        setFlag={setRefetch}
        prospectEdit={prospectTrackings}
      />
      <DrawerEditProspect
        openEdit={openEdit}
        setOpenEdit={setOpenEdit}
        prospectEdit={dataProspect}
        setFlag={() => setRefetch(!refetch)}
      />
      <WhatsappV2
        // idOportunity={idOportunity}
        prospect={dataProspect}
        openWhats={openWhatsApp}
        setOpenWhats={setOpenWhatsApp}
        handleCloseMenu={() => setOpenWhatsApp(!openWhatsApp)}
        isOportunity={false}
        isClient={false}
        isProspect={true}
        flag={refetch}
        setFlag={setRefetch}
      />
      <ModalAssignPendingMulti
        open={openAddPendingMulti}
        setopen={setOpenAddPendingMulti}
        setCheckedUsers={setCheckedUsers}
        setFlag={setRefetch}
        flag={refetch}
        status={"1"}
        setProspects={setCheckedUsers}
        prospects={checkedUsers}
        handleAlert={handleAlert}
        setAlert={setAlert}
      />
      <ModalNoReassigned open={openNoAdd} handleCloseNoAdd={handleCloseNoAdd} usersNoAdded={usersNoAdded} />
    </DirectorLayout>
  );

  function TableIndex({ item, itemData, isPar, isNew, handleClickName }) {
    const getDiferrenceDates = date => dayjs(date).fromNow();

    return (
      <TableDataId className="column_id" isPar={isPar} isNew={isNew}>
        <div className="content">
          <div className="content__flex">
            <div className="content__more"></div>
            {/* <div> */}

            <Tooltip title="Abrir Vista Previa">
              <p
                onClick={() => {
                  // console.log(item);
                  handleClickName(itemData.itemBD);
                }}
                className="name"
              >
                {item}
              </p>
            </Tooltip>
            {/* </div> */}

            <div className="icon-bg">
              <Tooltip title="Abrir Prospecto">
                <OpenInNew className="openprospect" onClick={() => handleClickName(itemData, false)} />
              </Tooltip>
            </div>
          </div>

          <div className="content__more">
            <p className="txt-lastracking">
              Ultimo seguimiento: <span>{getDiferrenceDates(itemData?.lastTrackingDate)} </span>
            </p>

            <p className="txt-createdAt">
              Creado el: <span>{dayjs(itemData?.itemBD?.createdAt).format("DD/MM/YYYY")} </span>
            </p>

            <p className="txt-group">
              Grupo: <span>{itemData?.itemBD?.ejecutive?.group?.name} </span>
            </p>
          </div>
        </div>
      </TableDataId>
    );
  }

  function HeadProspects({ count = 0 }) {
    //* Styles from index prospects
    const router = useRouter();
    const navigate = () => router.push("/prospectos/nuevo");

    return (
      <div className="head">
        <div className="title">
          <h1>Prospectos</h1>
          <div className="totalrows">
            {" "}
            <People className="people" /> <p className="count"> {count} Registros</p>
            <Tooltip arrow title="Recargar" placement="right">
              <Cached
                className="cached"
                onClick={() => {
                  setRefetch(!refetch);
                }}
              />
            </Tooltip>
          </div>
        </div>
        <Button variant="contained" className="btnadd" onClick={() => navigate()}>
          <Add />
          <p>Agregar Prospecto</p>
        </Button>
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
}

function SearchProspects({ value, setValue, restorePage }) {
  const handleOnChange = e => {
    setValue({ search: false, keySearch: e.target.value });
  };

  const handleKeyDown = e => {
    if (e.key === "Enter" && e.target.value.length > 0) {
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
  Edit,
  EmojiPeople,
  OpenInNew,
  People,
  Person,
  SearchOutlined,
  TableChartOutlined,
  Today,
} from "@material-ui/icons";
import { Box, Button, Checkbox, Chip, Tooltip } from "@material-ui/core";
import { colors, device } from "../../../styles/global.styles";
import TableLimenka from "../../../components/UI/organism/TableLimenka";
import useFetch from "../../../hooks/useFetch";
import { api } from "../../../services/api";
import { normalizeTableDataProspectDr } from "../../../utils/normalizeData";
import { useEffect } from "react";
import { TableDataId } from "../../../components/UI/organism/TableLimenka/styles";
import dayjs from "dayjs";
import PaginationDirector from "../../../components/UI/molecules/PaginationTable";
import usePagination from "../../../hooks/usePagination";
import Filters from "../../../components/Filters";
import { commonSelector } from "../../../redux/slices/commonSlice";
import { headsProspectDR } from "../../../constants";
import PreviewProspect from "../../../components/PreviewProspect";
import useModal from "../../../hooks/useModal";
import DataOrder from "../../../components/DataOrder";
import ModalReasigned from "../../../components/ModalReasigned";
import DrawerEditProspect from "../../../components/EditProspect";
import AddPending from "../../../components/ModalAddPendings";
import ModalTracking from "../../../components/ModalTracking";
import { handleGlobalAlert } from "../../../utils";
import WhatsappV2 from "../../../components/WhatsappV2";
import ModalAssignPendingMulti from "../../../components/ModalAssingPendingMulti";
import ModalNoReassigned from "../../../components/ModalNoReassigned";
import { CommonFiltersContext } from "../../../context/commonFiltersContext";
import Chips from "../../../components/ChipsFilters";

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
    /* width: calc(100% - 160px); */
    /* height: calc(100vh - 60px); */
    /* overflow-y: auto; */
    /* margin-top: 60px; */
    /* padding: 20px;
    ::-webkit-scrollbar {
      width: 6px;
      height: 6px;
    }
    ::-webkit-scrollbar-track {
      -webkit-box-shadow: inset 0 0 6px rgb(166 164 164 / 20%);
    }
    ::-webkit-scrollbar-thumb {
      -webkit-box-shadow: inset 0 0 20px ${colors.bgDirector};
    } */
  }

  .main h1 {
    font-size: 24px;
    margin-bottom: 10px;
  }

  .container {
    width: calc(100% - 40px);
    margin: auto;
    margin-top: 20px;
    /* margin-bottom: 20px; */
    /* min-height: calc(100% - 200px); */
    padding: 25px 20px;
    background: #fff;
    border-radius: 10px;
    box-shadow: rgb(149 157 165 / 20%) 0px 8px 24px;
    /* overflow: scroll; */
    .dataOrder {
      @media ${device.sm} {
        display: flex;
        align-items: center;
        justify-content: end;
      }
    }
  }

  .head {
    margin-bottom: 20px;

    @media ${device.xs} {
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
  }
  .head .totalrows {
    display: flex;

    align-items: center;
    .count {
      font-size: 14px;
      font-weight: 600;
    }
    .cached {
      font-size: 18px;
      margin-left: 10px;
      cursor: pointer;
      color: #103c82;
    }
  }

  .head .btnadd {
    text-transform: capitalize;
    color: #fff;
    background-color: #405189;
  }
  // ** Start Search
  .search {
    margin-bottom: 10px;
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
  .activefilterssection {
    margin-bottom: 5px;
    display: flex;
    width: 100%;
    flex-direction: row;
    overflow: auto hidden;
    padding: 5px 0px;
    margin-bottom: 10px;
  }
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
