import React, { useEffect, useState } from "react";
import PaginationWithText from "../molecules/PaginationWithText";
import ReportingTable from "../molecules/ReportingTable";
import { api } from "../../../services/api";
import SelectFilter from "../atoms/SelectFilter";
import InputFilter from "../molecules/InputFilter";
import Chips from "../molecules/Chips";
import AscendingAndDescendingOrder from "../molecules/AscendingAndDescendingOrder";
import DrawerWithFilters from "../molecules/DrawerWithFilters";

export default function ReportTableWhitSelectFilter({ reportType, where, setWhere, filterValue, setFilterValue }) {
  //SelectFilter
  const [dataForSelect, setdataForSelect] = useState();
  //ReportingTable
  const [isLoaderTable, setIsLoaderTable] = useState(true);
  const [prospects, setProspects] = useState();
  //Pagination
  const orderTableLimit = 15;
  const [orderCount, setOrderCount] = useState(0);
  const [orderTablePage, setOrderTablePage] = useState(1);
  //Input
  const [searchNameOrEmail, setSearchNameOrEmail] = useState();
  //Chip
  const [chips, setChips] = useState();
  //Drawer
  const [openDrawer, setopenDrawer] = useState(false);
  const [drawerFilters, setDrawerFilters] = useState();
  //Switch
  const [falling, setFalling] = useState(true);
  const [order, setOrder] = useState("createdAt");
  //Guarda el valor de los filtros del Drawer
  const [categorySelect, setCategorySelect] = useState(false);
  //Aqui guarda los valores de los filtros para despues aplicarlos al where
  const [filters, setFilters] = useState({
    category: "",
    origin: "",
    company: "",
    clienttype: "",
    specialties: "",
    gender: "",
    date: "",
  });

  useEffect(() => {
    getDataForSelect();
  }, []);

  useEffect(() => {
    setIsLoaderTable(true);
  }, [filterValue]);

  useEffect(() => {
    setOrderTablePage(1);
  }, [filterValue]);

  //When searchNameOrEmail is cleared, it reloads the table data
  useEffect(() => {
    if (searchNameOrEmail == "") {
      getProspects();
    }
  }, [searchNameOrEmail]);

  useEffect(() => {
    getProspects();
  }, [filterValue, orderTablePage]);

  //Aplica los filtros del drawer a la tabla
  useEffect(() => {
    setOrderTablePage(1);
    getProspects();
    console.log("Los drawer filters: ", drawerFilters);
  }, [drawerFilters]);

  //When you flip the switch
  useEffect(() => {
    if (orderTablePage != 1) {
      setOrderTablePage(1);
    } else {
      getProspects();
    }
  }, [falling, order]);

  const hasValue = value => (value === "" || value === undefined || value == null ? false : true);

  const getProspects = async () => {
    setIsLoaderTable(true);
    let params = {
      where: { ...where, ...drawerFilters },
      count: 1,
      limit: orderTableLimit,
      skip: orderTablePage,
      order: falling ? order : `-${order}`,
      include:
        "category,category.company,postal,entity,city,clienttype,phase,origin,specialty,prospectslabels,prospectslabels.label,clientcompany",
      join: "c,cc,p,e,ci,cl,ph,or,sp,pl,pll,cli",
    };

    if (categorySelect) {
      params.where = { ...where, categoryId: categorySelect.id };
    }

    if (hasValue(searchNameOrEmail)) {
      if (params?.where) {
        if (searchNameOrEmail.includes("@")) {
          params.where = {
            ...params.where,
            email: searchNameOrEmail.trim().toLocaleLowerCase(),
          };
        } else if (/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im.test(searchNameOrEmail.trim())) {
          params.where = {
            ...params.where,
            phone: searchNameOrEmail.trim().toLocaleLowerCase(),
          };
        } else {
          params.where = {
            ...params.where,
            fullname: searchNameOrEmail.toLocaleLowerCase(),
          };
        }
      } else {
        if (searchNameOrEmail.includes("@")) {
          params.where = {
            ...params.where,
            oportunity: { soldby: { email: searchNameOrEmail.trim().toLocaleLowerCase() } },
          };
        } else if (/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im.test(searchNameOrEmail.trim())) {
          params.where = {
            ...params.where,
            oportunity: { soldby: { phone: searchNameOrEmail.trim().toLocaleLowerCase() } },
          };
        } else {
          params.where = {
            ...params.where,
            oportunity: {
              soldby: {
                fullname: searchNameOrEmail.toLocaleLowerCase(),
              },
            },
          };
        }
      }
    }

    if (searchNameOrEmail) {
      console.log("Valor de params: ", params);
    }

    let res = await api.get("prospects", { params });
    setChips(params.where);
    setProspects(res.data.results);
    setOrderCount(res.data.count);
    setIsLoaderTable(false);
  };

  const getDataForSelect = async () => {
    let params = {
      all: 1,
    };
    let res = await api.get(reportType, { params });
    setdataForSelect(res.data.results);
  };

  const startNameOrEmailSearch = () => {
    console.log("Valor de busqueda:", searchNameOrEmail);
    getProspects();
  };

  return (
    <div>
      <SelectFilter selectOptions={dataForSelect} changeFilterValue={setFilterValue} drawerFilters={drawerFilters} />
      <InputFilter
        searchNameOrEmail={searchNameOrEmail}
        setSearchNameOrEmail={setSearchNameOrEmail}
        startNameOrEmailSearch={startNameOrEmailSearch}
        openDrawer={() => setopenDrawer(true)}
        setOrderTablePage={setOrderTablePage}
      />
      <Chips
        chips={chips}
        searchNameOrEmail={searchNameOrEmail}
        setSearchNameOrEmail={setSearchNameOrEmail}
        getProspects={getProspects}
        setOrderTablePage={setOrderTablePage}
        filters={filters}
        setFilters={setFilters}
        drawerFilters={drawerFilters}
        setDrawerFilters={setDrawerFilters}
      />
      <AscendingAndDescendingOrder falling={falling} setFalling={setFalling} order={order} setOrder={setOrder} />
      <ReportingTable isLoaderTable={isLoaderTable} dataTable={prospects} />
      <PaginationWithText
        total={orderCount}
        actualPage={orderTablePage}
        setActualPage={setOrderTablePage}
        totalPages={Math.ceil(orderCount / orderTableLimit)}
      />
      <DrawerWithFilters
        openDrawer={openDrawer}
        setopenDrawer={setopenDrawer}
        setCategorySelect={setCategorySelect}
        setDrawerFilters={setDrawerFilters}
        filters={filters}
        setFilters={setFilters}
      />
    </div>
  );
}
