import React, { useState, useContext } from "react";
import DirectorLayout from "../../../layouts/DirectorLayout";
import dayjs from "dayjs";
import {
  Add,
  AddAlert,
  AttachMoney,
  Cached,
  Edit,
  OpenInNew,
  People,
  SearchOutlined,
  TableChartOutlined,
} from "@material-ui/icons";
import { useDispatch, useSelector } from "react-redux";
import { Box, Button, Checkbox, Chip, Tooltip } from "@material-ui/core";
import { CommonFiltersContext } from "../../../context/commonFiltersContext";
export const headsProspectDR = [
  "id",
  "nombre",
  "correo",
  "movil",
  "teléfono",
  "categoria de interés",
  "código de producto",
  "género",
  "puesto",
  "ejecutivo",
  "estado",
  "codigo postal",
  "colonia",
  "calle",
  "comentarios",
  "título",
  "canal",
  "web",
  "facebook",
  "google maps",
  "fecha de creación",
  "ultima actualización",
];
export default function Clientes() {
  const { page, setPage, limit, handlePage } = usePagination({ defaultLimit: 15, defaultPage: 1 });
  const { open, toggleModal } = useModal();
  const { directorOptionsClients: options } = useContext(CommonFiltersContext);
  const [typeRequest, setTypeRequest] = useState("Clientes");
  const [valueToFind, setValueToFind] = useState({ search: false, keySearch: "" });
  const [prospectsTable, setProspectsTable] = useState([]);
  const [dataProspect, setDataProspect] = useState({});
  const [isReadyLocalStorage, setIsReadyLocalStorage] = useState(false);
  const [totalProspects, setTotalProspects] = useState(0);
  const [order, setOrder] = useState("createdAt");
  const [ASC, setASC] = useState(true);
  const [refetch, setRefetch] = useState(false);
  const dateNowMonth = [dayjs().startOf("month").format(), dayjs().endOf("month").format()];
  const [filters, setFilters] = useState([
    {
      label: "Fecha de Creación",
      value: dateNowMonth,
      getNameChip: "label",
      getValue: "value",
      identifier: "createdAt",
      type: "query",
      deleteId: ["lastTrackingcreatedAt"],
      typeof: "date",
      id: "createdAt",
      name: "Año Actual",
    },
  ]);
  const [isFetching, setIsFetching] = useState(false);

  useEffect(() => {
    getLocalStorage();
  }, []);

  useEffect(() => {
    getProspectsAsClients();
  }, [refetch, page, ASC, order, isReadyLocalStorage]);

  const getLocalStorage = () => {
    let filtersProspects = localStorage.getItem("filtersclients_Director");
    if (filtersProspects) {
      let formatFilters = JSON.parse(filtersProspects);
      setFilters(formatFilters);
    }
    let orderby = localStorage.getItem("clientsDirector_order");
    if (orderby) {
      setOrder(JSON.parse(orderby));
    }

    let asc = localStorage.getItem("clientesDirector_asc");
    if (asc) {
      setASC(JSON.parse(asc));
    }

    setIsReadyLocalStorage(true);
  };
  const gerateQuery = () => {
    // handlePage(1);
    let query = {
      isclient: true,
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

  const saveLocalStorage = (value, key) => {
    switch (key) {
      case "filtersProspects_Director":
        localStorage.setItem(key, JSON.stringify(value));
        break;

      default:
        localStorage.setItem(key, JSON.stringify(value));
        break;
    }
  };

  const restorePage = () => {
    if (page > 1) setPage(1);
  };

  const getProspectsAsClients = async () => {
    if (isReadyLocalStorage === false) return;
    setIsFetching(true);
    try {
      // let includeValue =
      //   "category,city,entity,phase,ejecutive,ejecutive.group,clientcompany,origin,clienttype,specialty,postal,prospectslabels,prospectslabels.label";
      let includeValue = "category,city,entity,clienttype,specialty,ejecutive,ejecutive.group,postal,channel";
      let params = {
        count: 1,
        include: includeValue,
        order: `${ASC ? "" : "-"}${order}`,
        // subquery: "1",
        // join: "cat,cy,ey,pe,ejecutive,eg,cy,on,ce,sy,pl,prl,k",
        join: "cat,cy,ey,pe,sp,ejecutive,ejecutive.g,p,ch",
        limit: limit,
        skip: page,
        where: gerateQuery(),
      };

      let resProspects = await api.get("prospects", { params });
      // console.log("resProspects", resProspects.data.results);
      let newProspect = normalizeTableDataProspectDr(resProspects.data.results);
      setProspectsTable(newProspect);
      setTotalProspects(resProspects.data.count);
      saveLocalStorage(filters, "filtersclients_Director");
      saveLocalStorage(order, "clientsDirector_order");
      saveLocalStorage(ASC, "clientesDirector_asc");
      setIsFetching(false);
    } catch (error) {
      setIsFetching(false);
      console.log(error);
    }
  };

  // const saveLocalStorage = filters => localStorage.setItem("filtersProspects_Director", JSON.stringify(filters));

  // * Handle Events
  const handleClickOpenWhatsApp = item => {
    setDataProspect(item.itemBD);
    setOpenWhatsApp(true);
  };

  const handleRefetch = () => setRefetch(!refetch);

  const handleClickName = rowSelected => {
    setDataProspect(rowSelected);
    toggleModal();
  };

  return (
    <DirectorLayout>
      <ClientesStyled>
        <div className="main">
          <div className="container">
            <HeadProspects count={totalProspects} title={typeRequest} />
            <SearchProspects value={valueToFind} setValue={setValueToFind} restorePage={restorePage} />
            <Box className="filter" mb={1}>
              <DataOrder
                falling={ASC}
                setFalling={setASC}
                order={order}
                setOrder={setOrder}
                addOptions={[
                  { label: "Fecha Creación ", value: "createdAt" },
                  { label: "Fecha Actualización", value: "updatedAt" },
                  { label: "Fecha Conversion A Cliente", value: "clientat" },
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
        <PreviewClient isOpen={open} close={toggleModal} prospect={dataProspect} />
      </ClientesStyled>
    </DirectorLayout>
  );
}

function HeadProspects({ count = 0, title = "" }) {
  const router = useRouter();
  const navigate = () => router.push("/prospectos/nuevo");

  return (
    <div className="head">
      <div className="title">
        <h1>{title}</h1>
        <div className="totalrows">
          <People />
          <p> {count} Registros</p>
          <Cached />
        </div>
      </div>
    </div>
  );
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

function TableIndex({ item, itemData, isPar, isNew, handleClickName }) {
  const getDiferrenceDates = date => dayjs(date).fromNow();

  return (
    <TableDataId className="column_id" isPar={isPar} isNew={isNew}>
      <div className="content">
        <div className="content__flex">
          <div className="content__more"></div>

          <Tooltip title="Abrir Vista Previa">
            <p
              onClick={() => {
                handleClickName(itemData.itemBD);
              }}
              className="name"
            >
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

import styled from "styled-components";
import { colors, device } from "../../../styles/global.styles";
import { useEffect } from "react";
import { api } from "../../../services/api";
import { useRouter } from "next/router";
import DataOrder from "../../../components/DataOrder";
import Filters from "../../../components/Filters";
import { commonSelector } from "../../../redux/slices/commonSlice";
import { TableDataId } from "../../../components/UI/organism/TableLimenka/styles";
import TableLimenka from "../../../components/UI/organism/TableLimenka";
import { normalizeTableDataProspectDr } from "../../../utils/normalizeData";
import usePagination from "../../../hooks/usePagination";
import useModal from "../../../hooks/useModal";
import PaginationDirector from "../../../components/UI/molecules/PaginationTable";
import PreviewClient from "../../../components/PreviewClient";
import Chips from "../../../components/ChipsFilters";
export const ClientesStyled = styled.div`
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
    padding: 25px 20px;
    background: #fff;
    border-radius: 10px;
    box-shadow: rgb(149 157 165 / 20%) 0px 8px 24px;
    ::-webkit-scrollbar {
      width: 6px;
      height: 6px;
    }
    ::-webkit-scrollbar-track {
      -webkit-box-shadow: inset 0 0 6px rgb(166 164 164 / 20%);
    }
    ::-webkit-scrollbar-thumb {
      -webkit-box-shadow: inset 0 0 20px ${colors.bgDirector};
    }
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

  .filter {
    align-items: end;
    @media ${device.sm} {
      display: flex;
      justify-content: right;
    }
  }
  // ** Finish Search

  // ** Start Filter Section
  .activefilterssection {
    align-items: center;
    overflow-y: hidden;
    overflow-x: auto;
    margin: 10px 0px;
    padding: 5px 0px;
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
