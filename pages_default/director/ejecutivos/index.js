import React, { useEffect, useState, useContext } from "react";
import { Avatar, Button } from "@material-ui/core";
import { Cached, CloudDownload, People } from "@material-ui/icons";
import Head from "next/head";
import dayjs from "dayjs";
import Select from "react-select";
import TableLimenka from "../../../components/UI/organism/TableLimenka";
import Filters from "../../../components/Filters";
import { api, URL_SPACE } from "../../../services/api";
import { normalizeEjecutivesDir, normalizeExportExecutives } from "../../../utils/normalizeData";
import DirectorLayout from "../../../layouts/DirectorLayout";
import ModalAssignPendingMulti from "../../../components/ModalAssingPendingMulti";
import { EjecutivosStyled } from "../../../styles/Director/ejecutivos/index.style";
import DataOrder from "../../../components/DataOrder";
import PaginationDirector from "../../../components/UI/molecules/PaginationTable";
import usePagination from "../../../hooks/usePagination";
import Chips from "../../../components/ChipsFilters";
import { CommonFiltersContext } from "../../../context/commonFiltersContext";
import { styleScrollReactSelect } from "../../../styles/global.styles";
import SearchBox from "../../../components/SearchBox";
import PreviewExecutive from "../../../components/PreviewExecutive";
import useModal from "../../../hooks/useModal";
import { validateURL } from "../../../utils";
export default function Ejecutivos() {
  const { directorOptionsExecutives: options } = useContext(CommonFiltersContext);
  const { page, setPage, limit, handlePage } = usePagination({ defaultLimit: 15, defaultPage: 1 });
  const { open, toggleModal } = useModal();
  const [dataExecutive, setDataExecutive] = useState({});
  const [ejecutivesDataTable, setEjecutivesDataTable] = useState([]);
  const [filters, setFilters] = useState([]);
  const [headsTable, setHeadsTable] = useState([]);
  const [orderByData, setOrderByData] = useState([]);
  const [checkedUsers, setCheckedUsers] = useState([]);
  const [isFetching, setIsFetching] = useState(false);
  const [isRefetch, setIsRefetch] = useState(false);
  const [isReadyLocalStorage, setIsReadyLocalStorage] = useState(false);
  const [falling, setFalling] = useState(false);
  const [openAddPendingMulti, setOpenAddPendingMulti] = useState(false);
  const [countData, setCountData] = useState(0);
  const [order, setOrder] = useState("");
  const [selectTable, setSelectTable] = useState("");
  const [valueToFind, setValueToFind] = useState({ search: false, keySearch: "", type: "inQuery" });
  const headsTableDefault = ["Nombre", "Monto Vendido"];

  const [exportType, setExportType] = useState(undefined);
  const [loadingExport, setLoadingExport] = useState(false);

  const [filtersBy, setFiltersBy] = useState({
    options: [],
  });
  const optionsExport = [
    {
      value: "currentPage",
      name: "Hoja actual",
    },
    {
      value: "all",
      name: "Todos",
    },
  ];
  useEffect(() => {
    getLocalStorage();
  }, []);
  useEffect(() => {
    saveDefaultDate("select");
  }, [selectTable]);

  useEffect(() => {
    handleResponseEjecutives();
  }, [order, page, falling, isReadyLocalStorage, isRefetch]);

  const getLocalStorage = () => {
    let filtersDirectorExecutives = localStorage.getItem("filtersDirectorExecutives");
    let orderDirectorExecutives = localStorage.getItem("orderDirectorExecutives");
    let identifierTableExecutivesDir = localStorage.getItem("identifierTableExecutivesDir");
    if (filtersDirectorExecutives) {
      let formatFilters = JSON.parse(filtersDirectorExecutives);
      if (formatFilters.length > 0) {
        setFilters(formatFilters);
      } else {
        saveDefaultDate("localStorage");
      }
    }
    if (orderDirectorExecutives) {
      let formatOrders = JSON.parse(orderDirectorExecutives);
      let isDescendent = formatOrders.isDescendent ? "-" : "";
      if (formatOrders.orderBy) {
        setOrder(formatOrders.orderBy);
      } else {
        setOrder("");
      }
      setFalling(isDescendent);
    }

    if (identifierTableExecutivesDir) {
      let formatIdentifierTable = JSON.parse(identifierTableExecutivesDir);
      handleSelectFilters("localstorage", formatIdentifierTable);
    } else {
      handleSelectFilters("localstorage", "bysales");
    }
    setIsReadyLocalStorage(true);
  };
  const validateOrder = () => {
    let objectOrderLocalStorage = {
      isDescendent: falling ? true : false,
      orderBy: order,
      identifierTable: selectTable,
    };
    //valida como se ordenaran los datos, y los guarda como un objecto en el localstorage al momento se hacer un cambio
    saveInLocalStorage(objectOrderLocalStorage, "orderDirectorExecutives");
    return `${falling}${order}`;
  };
  const validateQueryBy = (fromCustom, queryBy) => {
    let query = {};
    let validateData = "";
    let keySearch = validateFilterInvidual("keySearch");
    if (keySearch) {
      if (keySearch.includes("@")) {
        query.email = { iRegexp: `${keySearch.trim().toLocaleLowerCase()}` };
      } else if (/^[\+]?[(]?[0-9]{1,3}[)]?[-\s\.]?[0-9]{1,3}[-\s\.]?[0-9]{1,4}$/im.test(keySearch.trim())) {
        query.phone = { iRegexp: `${keySearch.trim()}` };
      } else {
        query.fullname = { iRegexp: `${keySearch.trim()}` };
      }
    }

    switch (queryBy) {
      case "bysales":
        query.oportunity = {
          iscloseout: true,
        };
        validateData = validateFilterInvidual("soldat");
        if (validateData) {
          query.oportunity.soldat = { between: validateFilterInvidual("soldat") };
        }
        break;
      case "byoportunities":
        query.oportunity = {
          iscloseout: false,
          soldat: null,
          soldbyId: null,
        };

        validateData = validateFilterInvidual("createdAt");
        if (validateData) {
          query.oportunity.createdAt = { between: validateFilterInvidual("createdAt") };
        }
        break;
      case "byprospects":
        query.prospect = {
          isoportunity: false,
          isclient: false,
          discarted: false,
          rejected: false,
          rejectedAt: null,
          oportunityAt: null,
          deletedAt: null,
        };
        validateData = validateFilterInvidual("createdAt");
        if (validateData) {
          query.prospect.createdAt = { between: validateFilterInvidual("createdAt") };
        }
        break;
      case "byprospectsnotviewed":
        query.prospect = {
          isoportunity: false,
          isclient: false,
          discarted: false,
          rejected: false,
          rejectedAt: null,
          oportunityAt: null,
          deletedAt: null,
          viewed: false,
        };
        validateData = validateFilterInvidual("createdAt");
        if (validateData) {
          query.prospect.createdAt = { between: validateFilterInvidual("createdAt") };
        }
        break;
      case "bypending":
        query.pending = {
          isdone: fromCustom === "bypending" ? "true" : "false",
        };
        validateData = validateFilterInvidual("date_from");
        if (validateData) {
          query.pending.date_from = { between: validateFilterInvidual("date_from") };
        }
        break;
      default:
        validateData = validateFilterInvidual("createdAt");
        if (validateData) {
          query.createdAt = { between: validateFilterInvidual("createdAt") };
        }
        break;
    }
    return JSON.stringify(query);
  };
  const validateFilterInvidual = identifier => {
    let searchIndividualFilters = filters.filter(item => item.id === identifier);
    if (searchIndividualFilters.length > 0) {
      return searchIndividualFilters[0].value;
    }
    return "";
  };
  const saveInLocalStorage = (data, identifier) => localStorage.setItem(identifier, JSON.stringify(data));
  const cleanDataInLocalStorage = (identifier, data) => localStorage.setItem(identifier, JSON.stringify(data));
  const handleResponseEjecutives = async () => {
    setIsFetching(true);
    setCheckedUsers([]);
    if (isReadyLocalStorage === false) return;
    try {
      let res;
      let count = 0;
      let params = {
        where: validateQueryBy("", selectTable),
        include: "role,group,group.company",
        count: 1,
        join: "prospec,oportunity",
        skip: page,
        limit: limit,
      };
      if (order) {
        params.order = validateOrder();
      }
      switch (selectTable) {
        case "bysales":
          res = await api.get("dashboard/ejecutivesamount", { params });
          count = res.data.count;
          break;
        case "byoportunities":
          res = await api.get("dashboard/ejecutivesoportunitytotalamount", { params });
          count = res.data.count;
          break;

        case "byprospects":
          res = await api.get("dashboard/ejecutivesprospect", { params });
          count = res.data.count;
          break;

        case "byprospectsnotviewed":
          params.wherecustom = {
            prospect: {
              isoportunity: false,
              isclient: false,
              discarted: false,
              rejected: false,
              rejectedAt: null,
              oportunityAt: null,
              deletedAt: null,
              viewed: true,
            },
          };
          res = await api.get("dashboard/ejecutivesprospect", { params });
          count = res.data.count;
          break;

        case "bypending":
          params.wherecustom = validateQueryBy("bypending", selectTable);
          res = await api.get("dashboard/ejecutivespending", { params });
          count = res.data.count;
          break;

        default:
          res = await api.get("ejecutives", { params });
          count = res.data.count;
          break;
      }
      let dataNormalized = normalizeEjecutivesDir(selectTable, res.data.results);
      setEjecutivesDataTable(dataNormalized);
      setCountData(count);
      setIsFetching(false);
      saveInLocalStorage(filters, "filtersDirectorExecutives");
      saveInLocalStorage(selectTable, "identifierTableExecutivesDir");
    } catch (error) {
      setIsFetching(false);
      console.log(error);
    }
  };
  const handleSelectFilters = (fromBy, identifier) => {
    // condicion para validar de donde se ejecuta la funcion, si es por select limpiara
    // los filtros anteriormente establecidos
    if (fromBy === "select") {
      cleanDataInLocalStorage("orderDirectorExecutives", {});
      setOrder("");
      setFalling("");
    }
    setSelectTable(identifier);
    // Búsqueda de Filtros
    let filters = options.optionsFiltersByTable?.filter(item => item.identifierTable === identifier);
    if (filters.length > 0) {
      setFiltersBy({
        options: filters[0].optionsBy,
      });
    } else {
      setFiltersBy({
        options: [],
        options_by: [],
      });
    }
    //
    //Búsqueda de Heads Table
    let filtersHeads = options.tableHeadsBy?.filter(item => item.identifierTable === identifier);
    if (filtersHeads.length > 0) {
      setHeadsTable(filtersHeads[0].heads);
    } else {
      setHeadsTable(headsTableDefault);
    }
    //
    //Búsqueda de Orden de Datos
    let filterOrders = options.orderByOptions?.filter(item => item.identifierTable === identifier);
    if (filterOrders.length > 0) {
      setOrderByData(filterOrders[0].options);
    }
    //
    restorePage();
    if (fromBy !== "localstorage") {
      if (selectTable !== identifier) restoreAllFilters();
    }
  };
  const handleRefetch = () => setIsRefetch(!isRefetch);

  const restoreAllFilters = () => {
    setFilters([]);
  };

  const restorePage = () => {
    if (page > 1) {
      setPage(1);
    }
  };
  const saveDefaultDate = changeFrom => {
    if (isReadyLocalStorage === false) return;
    let filterDate = [];
    switch (selectTable) {
      case "bysales":
        filterDate.push({
          label: "Fecha de Venta",
          value: [dayjs().startOf("month"), dayjs().endOf("month").format()],
          getNameChip: "label",
          getValue: "value",
          identifier: "soldat",
          type: "query",
          typeof: "date",
          id: "soldat",
          name: "Mes Actual",
        });
        break;
      case "bypending":
        filterDate.push({
          label: "Fecha Creación Pendientes",
          value: [dayjs().startOf("month"), dayjs().endOf("month").format()],
          getNameChip: "label",
          getValue: "value",
          identifier: "date_from",
          type: "query",
          typeof: "date",
          id: "date_from",
          name: "Mes Actual",
        });
        break;
      case "byoportunities":
        filterDate.push({
          label: "Fecha de Cotización",
          value: [dayjs().startOf("month"), dayjs().endOf("month").format()],
          getNameChip: "label",
          getValue: "value",
          identifier: "soldat",
          type: "query",
          typeof: "date",
          id: "soldat",
          name: "Mes Actual",
        });
        break;
      case "byexecutives":
        break;
      default:
        filterDate.push({
          label: "Fecha de Creación",
          value: [dayjs().startOf("month"), dayjs().endOf("month").format()],
          getNameChip: "label",
          getValue: "value",
          identifier: "createdAt",
          type: "query",
          typeof: "date",
          id: "createdAt",
          name: "Mes Actual",
        });
        break;
    }
    if (filters.length <= 0) {
      setFilters(filterDate);
    }
    if (changeFrom === "select") handleRefetch();
  };

  const handleSelectExport = val => {
    setExportType(val);
  };

  return (
    <DirectorLayout>
      <Head>
        <title>CRM JOBS - Ejecutivos</title>
      </Head>
      <EjecutivosStyled>
        <div className="main">
          <div className="container">
            <div className="head">
              <div className="title">
                <h1>Ejecutivos</h1>
                <div className="totalrows">
                  <People />
                  <p> {countData} Registros</p>
                  <Cached onClick={handleRefetch} />
                </div>
              </div>
              <div className="export">
                <p>Exportar</p>
                <Select
                  className="select_option"
                  placeholder="Exportar por"
                  value={optionsExport.filter(item => item.value === exportType)}
                  options={optionsExport}
                  getOptionLabel={option => option.name}
                  getOptionValue={option => option.value}
                  onChange={e => handleSelectExport(e.value)}
                  styles={{
                    menu: provided => ({ ...provided, zIndex: 9999 }),
                    menuList: base => styleScrollReactSelect(base),
                  }}
                />

                {loadingExport ? (
                  <Button>Generando</Button>
                ) : (
                  <Button
                    variant="contained"
                    color="primary"
                    className="btn"
                    startIcon={<CloudDownload />}
                    disabled={ejecutivesDataTable.length < 1 || !exportType || isFetching} //Si hubo error en la subida no tiene caso activar el excel
                    style={{ marginTop: 10 }}
                    onClick={async () => {
                      let res;

                      let params = {
                        where: validateQueryBy("", selectTable),
                        include: "role,group,group.company",
                        join: "prospec,oportunity",
                        skip: page,
                        limit: limit,
                        count: 1,
                      };

                      if (exportType === "all") {
                        params.all = 1;
                        delete params.limit;
                        delete params.skip;
                      }
                      try {
                        setLoadingExport(true);
                        switch (selectTable) {
                          case "bysales":
                            res = await api.get("dashboard/ejecutivesamount", { params });
                            break;
                          case "byoportunities":
                            res = await api.get("dashboard/ejecutivesoportunitytotalamount", { params });
                            break;

                          case "byprospects":
                            res = await api.get("dashboard/ejecutivesprospect", { params });
                            break;

                          case "byprospectsnotviewed":
                            params.wherecustom = {
                              prospect: {
                                isoportunity: false,
                                isclient: false,
                                discarted: false,
                                rejected: false,
                                rejectedAt: null,
                                oportunityAt: null,
                                deletedAt: null,
                                viewed: true,
                              },
                            };
                            res = await api.get("dashboard/ejecutivesprospect", { params });
                            break;
                            console.log("PARAMS", params);

                          case "bypending":
                            params.wherecustom = validateQueryBy("bypending", selectTable);
                            res = await api.get("dashboard/ejecutivespending", { params });
                            break;

                          default:
                            res = await api.get("ejecutives", { params });
                            break;
                        }
                        setLoadingExport(false);

                        // console.log("INFO", selectTable, res.data.results.length);

                        let finalExcel = [];

                        finalExcel = normalizeExportExecutives(selectTable, res.data.results);

                        const data = await api.post(
                          "/convert/excel",
                          { data: finalExcel },
                          {
                            responseType: "blob",
                          }
                        );

                        const pdfBlob = new Blob([data.data], { type: "application/xlsx" });

                        saveAs(pdfBlob, `${selectTable}-${exportType}.xlsx`);
                      } catch (error) {
                        alert("Problema al general el documento");
                        console.log(error);
                      }
                      setLoadingExport(false);
                    }}
                  >
                    Exportar
                  </Button>
                )}
              </div>
            </div>
            <SearchBox value={valueToFind} setValue={setValueToFind} restorePage={restorePage} placeholder={null} />
            <div className="filters">
              <Select
                className="select_option"
                placeholder="Selecciona una Opcion"
                defaultValue={options?.optionsExecutives[2].value}
                value={options?.optionsExecutives.filter(item => item.value === selectTable)}
                options={options?.optionsExecutives}
                getOptionLabel={option => option.name}
                getOptionValue={option => option.value}
                onChange={e => handleSelectFilters("select", e.value)}
                styles={{
                  menu: provided => ({ ...provided, zIndex: 9999 }),
                  menuList: base => styleScrollReactSelect(base),
                }}
              />
              <div className="container_right">
                <DataOrder
                  falling={falling}
                  setFalling={setFalling}
                  order={order}
                  setOrder={setOrder}
                  addOptions={orderByData}
                  addOptionsOrderBy={[
                    { label: "Descendente", value: "-" },
                    { label: "Ascendente ", value: "" },
                  ]}
                />
                <Filters
                  options={filtersBy.options}
                  keySearchValue={valueToFind}
                  refetch={handleRefetch}
                  filters={filters}
                  setFilters={setFilters}
                  restorePage={restorePage}
                />
              </div>
            </div>
            <Chips filters={filters} setFilters={setFilters} refetch={handleRefetch} notDelete={"date"} />
            <TableLimenka
              data={ejecutivesDataTable}
              activeCheck
              primaryColor="#776ceb"
              secondaryColor="#dce1f6"
              heads={headsTable}
              id={selectTable}
              isFetching={isFetching}
              messageEmptyData={"Sin Resultados, Intente Modificar sus Filtros o Palabras Claves"}
              customColums={[
                {
                  columname: "Nombre",
                  component: (item, itemData, isPar, isNew) => {
                    return (
                      <td>
                        <div className="row">
                          <Avatar className="avatar" src={validateURL(itemData.itemBD?.photo)} onClick={toggleModal} />
                          <div className="imagename">
                            <p
                              className="titlegroup"
                              onClick={() => {
                                setDataExecutive(itemData?.itemBD);
                                toggleModal();
                              }}
                            >
                              {itemData.itemBD?.fullname}
                            </p>
                            <p className="subtitle">{itemData.itemBD?.group?.name}</p>
                            <p className="subtitle">
                              Creado el: {dayjs(itemData.itemBD?.createdAt).format("DD/MM/YYYY")}
                            </p>
                          </div>
                        </div>
                      </td>
                    );
                  },
                },
              ]}
            />
            <PaginationDirector
              count={countData}
              limit={limit}
              handlePage={handlePage}
              page={page}
              typeOfTitle={"ejecutivos"}
            />
            <ModalAssignPendingMulti
              open={openAddPendingMulti}
              setopen={setOpenAddPendingMulti}
              setCheckedUsers={setCheckedUsers}
              // setFlag={setFlag}
              // flag={flag}
              prospects={checkedUsers}
            />
            {/* <Button color="primary" variant="contained" onClick={() => setOpenAddPendingMulti(true)}>
              Open ModalAssignPendingMulti
            </Button> */}
          </div>
        </div>
        <PreviewExecutive isOpen={open} close={toggleModal} executive={dataExecutive} setExecutive={setDataExecutive} />
      </EjecutivosStyled>
    </DirectorLayout>
  );
}
