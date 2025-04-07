import { Box, Button, Chip, Grid, IconButton, LinearProgress, Tooltip } from "@material-ui/core";
import {
  Add,
  AddAlert,
  AttachMoney,
  Cached,
  Delete,
  Edit,
  Filter,
  FilterList,
  OpenInNew,
  People,
  SearchOutlined,
  TableChartOutlined,
} from "@material-ui/icons";
import dayjs from "dayjs";
import { useRouter } from "next/router";
import { Pagination } from "@material-ui/lab";
import { useSelector } from "react-redux";
import React, { useContext, useEffect, useState } from "react";
import { OportunidadesStyled } from "../../../styles/Director/oportunidades/index.style";
import { api } from "../../../services/api";
import { normalizeTableDataOpotunity } from "../../../utils/normalizeData";
import TableLimenka from "../../../components/UI/organism/TableLimenka";
import { TableDataId } from "../../../components/UI/organism/TableLimenka/styles";
import Filters from "../../../components/Filters";
import PreviewOportunity from "../../../components/PreviewOportunity";
import useModal from "../../../hooks/useModal";
import DirectorLayout from "../../../layouts/DirectorLayout";
import DataOrder from "../../../components/DataOrder";
import { CommonFiltersContext } from "../../../context/commonFiltersContext";
import usePagination from "../../../hooks/usePagination";
import Chips from "../../../components/ChipsFilters";
import SearchBox from "../../../components/SearchBox";
import PreviewSale from "../../../components/PreviewSaleDr";
const heads = [
  "id",
  // "prospectId",
  "nombre",
  "correo",
  "monto",
  "categoría de interes",
  "certeza",
  "concepto",
  "télefono",
  "ultimo Seguimiento",
  "fecha de cierre",
  "fecha de creacion",
];
const headsDiscarted = [
  "id",
  // "prospectId",
  "nombre",
  "concepto",
  "correo",
  "certeza",
  "télefono",
  "fecha de cierre",
  "fecha de creacion",
];
export default function Ventas() {
  const { open, toggleModal } = useModal();
  const { directorOptionsSales: options } = useContext(CommonFiltersContext);

  const [ASC, setASC] = useState(true);
  const [order, setOrder] = useState("soldat");
  const [oportunitiesTable, setOportunitiesTable] = useState([]);
  const [filters, setFilters] = useState([]);
  const [totalOportunities, setTotalOportunities] = useState(0);
  const [valueToFind, setValueToFind] = useState({ search: false, keySearch: "", type: "inQuery" });
  const { page, setPage, limit, handlePage } = usePagination({ defaultLimit: 15, defaultPage: 1 });
  const [isReadyLocalStorage, setIsReadyLocalStorage] = useState(false);
  const [isLoaderData, setIsLoaderData] = useState(false);
  const [refetch, setRefetch] = useState(false);
  const [dataOportunity, setDataOportunity] = useState({});
  const totalPages = Math.ceil(totalOportunities / limit);
  const handleRefetch = () => setRefetch(!refetch);
  const [isFetching, setIsFetching] = useState(false);
  const dateNowMonth = [dayjs().startOf("month").format(), dayjs().endOf("month").format()];
  const defaultFilter = [
    {
      label: "Fecha de Venta",
      value: dateNowMonth,
      getNameChip: "label",
      getValue: "value",
      identifier: "soldat",
      type: "query",
      deleteId: ["cityId"],
      typeof: "date",
      id: "soldat",
      name: "Mes Actual",
    },
  ];
  useEffect(() => {
    getLocalStorage();
  }, []);

  useEffect(() => {
    getAllOportunities();
  }, [page, refetch, isReadyLocalStorage, order, ASC]);

  const getLocalStorage = () => {
    let filtersDirectorSales = localStorage.getItem("filtersDirectorSales");
    if (filtersDirectorSales) {
      let formatFilters = JSON.parse(filtersDirectorSales);
      if (formatFilters.length === 0) {
        setFilters(defaultFilter);
      } else {
        setFilters(formatFilters);
      }
    } else {
      setFilters(defaultFilter);
    }
    setIsReadyLocalStorage(true);
  };

  const generateQuery = () => {
    let query = {};
    query.iscloseout = true;
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

  const getAllOportunities = async () => {
    setIsLoaderData(true);
    if (isReadyLocalStorage === false) return;
    try {
      let params = {
        where: generateQuery(),
        count: 1,
        include: "prospect,prospect.ejecutive,prospect.category",
        join: "prospect,prospect.ejecutive,prospect.cat",
        order: `${ASC ? "" : "-"}${order}`,
        skip: page,
        limit: limit,
      };
      let response = await api.get(`oportunities`, { params });
      let dataResults = response.data.results;
      let normalizeData = dataResults.map(item => normalizeTableDataOpotunity(item));
      setTotalOportunities(response.data.count);
      setOportunitiesTable(normalizeData);
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
  const saveLocalStorage = filters => localStorage.setItem("filtersDirectorSales", JSON.stringify(filters));

  return (
    <DirectorLayout>
      <OportunidadesStyled>
        <div className="main">
          <div className="container">
            <div className="container__header">
              <HeadOportunities count={totalOportunities} refetch={handleRefetch} />
            </div>
            <SearchBox value={valueToFind} setValue={setValueToFind} restorePage={restorePage} placeholder={null} />
            <Box display="flex" justifyContent="end" alignItems="center" flexWrap={"wrap"}>
              <DataOrder
                falling={ASC}
                setFalling={setASC}
                order={order}
                setOrder={setOrder}
                addOptions={[
                  { label: "Fecha de Venta", value: "soldat" },
                  { label: "Monto de venta", value: "amount" },
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
            </Box>
            <Chips filters={filters} setFilters={setFilters} refetch={handleRefetch} notDelete={"date"} />
            <TableLimenka
              data={oportunitiesTable}
              activeCheck
              primaryColor="#776ceb"
              secondaryColor="#dce1f6"
              heads={heads}
              id="tableSalesDr"
              isFetching={isLoaderData}
              actions={[
                { title: "Editar", action: e => console.log(e), icon: <Edit /> },
                { title: "Crear Venta", action: e => console.log(e), icon: <AttachMoney /> },
                { title: "Cotizar Nuevamente", action: e => console.log(e), icon: <AttachMoney /> },
                { title: "Agregar Seguimiento", action: e => console.log(e), icon: <TableChartOutlined /> },
                { title: "Agregar Pendiente", action: e => console.log(e), icon: <AddAlert /> },
                { title: "Descartar", action: e => console.log(e), icon: <Delete /> },
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
            />
            {!isLoaderData && <TablePagination page={page} setValue={setPage} totalPages={totalPages} />}
          </div>
        </div>
        <PreviewSale isOpen={open} close={toggleModal} oportunity={dataOportunity} />
      </OportunidadesStyled>
    </DirectorLayout>
  );
}

function HeadOportunities({ count = 0, refetch }) {
  const router = useRouter();
  return (
    <div className="head">
      <div className="title">
        <h1>Ventas</h1>
        <div className="totalrows">
          <People />
          <p className="count"> {count} Registros</p>
          <Cached className="loader" onClick={() => refetch()} />
        </div>
      </div>
    </div>
  );
}
function SearchOportunities({ value, setValue, refetch, restorePage, handleFilters }) {
  const handleChange = e => {
    setValue({ search: false, keySearch: e.target.value, type: "inQuery" });
  };

  const handleKeyDown = e => {
    if (e.key === "Enter") {
      setValue({ search: true, keySearch: e.target.value, type: "inQuery" });
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
          placeholder="Ingresa nombre o correo de prospecto"
        />
      </div>
    </div>
  );
}

function TableIndex({ item, itemData, isPar, isNew, openPreview, setData }) {
  const getDiferrenceDates = date => dayjs(date).fromNow();
  return (
    <TableDataId className="column_id" isPar={isPar} isNew={isNew}>
      <div className="content">
        <div className="content__flex">
          <div className="content__more"></div>
          <Tooltip title="Abrir Vista Previa">
            <p
              onClick={() => {
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
              <OpenInNew className="openprospect" />
            </Tooltip>
          </div>
        </div>
        <div className="content__more">
          {itemData?.lastTrackingDate && (
            <p className="txt-lastracking">
              Ultimo seguimiento <span>{getDiferrenceDates(itemData?.lastTrackingDate)} </span>
            </p>
          )}
          <p className="txt-createdAt">
            Vendido el <span>{dayjs(itemData?.soldat).format("DD/MM/YYYY")} </span>
          </p>
        </div>
      </div>
    </TableDataId>
  );
}
function TablePagination({ page, setValue, totalPages }) {
  const handlePagination = (e, value) => setValue(value);
  if (totalPages > 1) {
    return (
      <div className="table_pagination">
        <Pagination
          shape="rounded"
          color="primary"
          count={totalPages}
          defaultPage={1}
          page={page}
          onChange={handlePagination}
        />
      </div>
    );
  }
}
