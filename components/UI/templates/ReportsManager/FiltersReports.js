import { Button } from "@material-ui/core";
import { KeyboardDatePicker } from "@material-ui/pickers";
import dayjs from "dayjs";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import Select from "react-select";
import styled from "styled-components";
import { useExecutives } from "../../../../redux/slices/ejecutivosSlice";
import { commonSelector } from "../../../../redux/slices/commonSlice";
import useGlobalCommons from "../../../../hooks/useGlobalCommons";
import { device } from "../../../../styles/global.styles";

const filteroptions = [
  {
    value: "prospects",
    label: "Prospectos",
  },
  {
    value: "oportunities",
    label: "Oportunidades",
  },
  {
    value: "sales",
    label: "Ventas",
  },
  {
    value: "general",
    label: "Cotizacion-Venta",
  },
];

const finalOptions = {
  prospects: [
    {
      value: "byprospectEntities",
      label: "Prospectos por Estado",
    },
    {
      value: "byprospectOrigins",
      label: "Prospectos por Origen",
    },
    {
      value: "byprospectType",
      label: "Prospectos por Tipo",
    },
  ],
  oportunities: [
    {
      value: "bycategory",
      label: "Monto por producto",
    },
    {
      value: "byentities",
      label: "Monto por Estado",
    },
    {
      value: "byorigin",
      label: "Monto por origen",
    },
    {
      value: "byphase",
      label: "Monto por fase",
    },
    {
      value: "bytotalentities",
      label: "Total por Estado",
    },
    {
      value: "bytotalproducts",
      label: "Total por producto",
    },
  ],
  sales: [
    {
      value: "bysalesOrigin",
      label: "Monto de ventas por origen",
    },
    {
      value: "bysalesEntities",
      label: "Monto de ventas por estado",
    },
    {
      value: "bysalesProducts",
      label: "Monto de ventas por producto",
    },
  ],
  general: [
    {
      value: "categoriesbygroup",
      label: "Categorias",
    },
    {
      value: "entitiesbygroup",
      label: "Estados",
    },
    {
      value: "productsbygroup",
      label: "Productos",
    },
    {
      value: "prospectsclientes",
      label: "Prospectos-Clientes",
    },
  ],
};

export default function FiltersReports({
  startDate,
  finishDate,
  setStartDate,
  setFinishDate,
  handleOnFind,
  setExecutiveSelected,
  executiveSelected,
  values,
  setValues,
}) {
  const { executives, isFetching, isOpenDrawer, totalExecutives } = useSelector(useExecutives);

  const { users } = useSelector(commonSelector);

  const { getCatalogBy } = useGlobalCommons();

  const [filterOptionsSel, setFilterOptionsSel] = useState([]);

  const [typeOptions, setTypeOptions] = useState(finalOptions["general"]);

  const [selectDataOptions, setSelectDataOptions] = useState([
    {
      value: "general",
      label: "Cotizacion-Venta",
    },
  ]);

  const [view, setView] = useState("entitiesbygroup");

  const [showBy, setShowBy] = useState("general");

  const handleOnChangeDate = (date, type) => {
    let newDate = dayjs(date).format();
    if (type === "start") {
      setStartDate(newDate);
      return;
    }
    setFinishDate(newDate);
  };

  return (
    <FiltersReportsStyled>
      <h2 className="title" onClick={() => console.log("view", view)}>
        Reportes
      </h2>
      <div className="row">
        {/* <div className="select"> */}
        <Select
          onMenuOpen={() => getCatalogBy("executives")}
          loadingMessage={() => "Cargando Opciones..."}
          isLoading={users.isFetching}
          className="rnselect"
          options={[
            {
              id: 1,
              name: "",
              lastname: "General",
            },
            ...users.results,
          ]}
          getOptionValue={option => `${option["id"]}`}
          getOptionLabel={option => `${option.name} ${option.lastname}`}
          placeholder="Selecciona un ejecutivo"
          defaultValue={{
            id: 1,
            name: "General",
            lastname: "",
          }}
          onChange={e => {
            if (e.id == 1) {
              setSelectDataOptions([
                {
                  value: "general",
                  label: "Cotizacion-Venta",
                },
              ]);
              // setFilter;
            } else {
              setSelectDataOptions(filteroptions);
            }
            setExecutiveSelected(e.id == 1 ? null : e.id);

            setValues({
              ...values,
              executiveSelected: e.id == 1 ? null : e.id,
            });
          }}
        />
        {/* </div> */}
        <Select
          className="rnselect"
          onChange={e => {
            setTypeOptions(finalOptions[e.value]);
            setShowBy(e.value);
            setView(null);
          }}
          options={filteroptions}
          placeholder="Selecciona un tipo"
          defaultValue={{
            value: "general",
            label: "Cotizacion-Venta",
          }}
        />

        <Select
          onChange={e => {
            setView(e.value);
            setValues({
              ...values,
              view: e.value,
            });
          }}
          value={typeOptions.filter(item => item.value === view)}
          className="rnselect"
          options={typeOptions}
          placeholder="Selecciona una opción"
        />
        <KeyboardDatePicker
          disableToolbar
          format="DD-MM-YYYY"
          views={["year", "month", "date"]}
          id="date-picker-inline"
          className="inputdate inputdate_lte"
          value={startDate}
          InputProps={{ disableUnderline: true, readOnly: true }}
          onChange={date => handleOnChangeDate(date, "start")}
          KeyboardButtonProps={{
            "aria-label": "change date",
          }}
        />
        <KeyboardDatePicker
          locale="es-MX"
          disableToolbar
          format="DD-MM-YYYY"
          views={["year", "month", "date"]}
          id="date-picker-inline"
          className="inputdate inputdate_lte"
          value={finishDate}
          InputProps={{ disableUnderline: true, readOnly: true }}
          onChange={date => handleOnChangeDate(date, "finish")}
          KeyboardButtonProps={{
            "aria-label": "change date",
          }}
        />
        <Button
          color="primary"
          variant="contained"
          defaultValue={{
            value: "productsbygroup",
            label: "Productos",
          }}
          disabled={!view}
          onClick={() => {
            let params = {
              type: showBy,
              executive: executiveSelected,
              startDate,
              finishDate,
              view,
              showby: showBy,
            };
            handleOnFind(params);
          }}
        >
          Buscar
        </Button>
        {/* <Select        
          options={[{ id: 1, name: "Todos" }, ...executives]}
          getOptionValue={option => `${option["id"]}`}
          getOptionLabel={option => `${option.name} ${option.lastname}`}
          // formatOptionLabel={FormatOptionLabel}
          // value={selectedEjecutivo}
          // onChange={handleEjecutivoChange}
          // options={ejecutives}
          // getOptionValue={option => `${option["id"]}`}
          // getOptionLabel={option => `${option.name} ${option.lastname}`}
          placeholder="Selecciona una opción"
        /> */}
      </div>

      {/* <ModalDateDirector
        primaryColor="#407AFF"
        showCustomDate={showCustomDate}
        setShowCustomDate={setShowCustomDate}
        handleOnChangeDate={handleOnChangeDate}
      /> */}
    </FiltersReportsStyled>
  );
}

const FiltersReportsStyled = styled.div`
  background-color: #ffff;
  padding: 10px;
  border-radius: 4px;
  min-height: 100px;
  margin-bottom: 20px;

  .row {
    background-color: white;
    display: flex;
    width: calc(100% - 40px);
    flex-wrap: wrap;
    margin: 5px 2px;
    border-radius: 10px;
    .select {
      /* width: 300px; */
    }

    .rnselect {
      z-index: 51;
      margin-right: 3px;
      width: 218px;
      margin-bottom: 5px;
    }
  }
  h2 {
    font-size: 18px;
    margin-top: 10px;
  }
  z-index: 10000000000000000000;

  .inputdate {
    width: 218px;
    background-color: #ffff;
    border-radius: 2px;
    padding-left: 10px;
    margin-right: 4px;
    border: 1px solid #cfd8dc;
    margin-bottom: 5px;
  }
`;
