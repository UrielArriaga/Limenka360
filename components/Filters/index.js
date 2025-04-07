import { IconButton } from "@material-ui/core";
import { Close, FilterList } from "@material-ui/icons";
import React, { useState, useEffect } from "react";
import Select from "react-select";
import { FilterStyled } from "./style";
import dayjs from "dayjs";
import { useDispatch, useSelector } from "react-redux";
import { commonSelector, getCities, getEntities } from "../../redux/slices/commonSlice";
import { styleScrollReactSelect } from "../../styles/global.styles";
import { KeyboardDatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import "moment/locale/es";
import useGlobalCommons from "../../hooks/useGlobalCommons";
import useFilters from "../../hooks/useFilters";

export default function Filters(props) {
  const { options, filters, setFilters, refetch, keySearchValue, restorePage, showName } = props;
  const dispatch = useDispatch();
  const { getCatalogBy } = useGlobalCommons();
  const { handleValidateCatalog } = useFilters();
  const [optionSelected, setOptionSelected] = useState("");
  const [startDate, setStartDate] = useState("");
  const [finishDate, setFinishDate] = useState("");
  const [isShowFilters, setIsShowFilters] = useState(false);
  const [isRangeSelect, setIsRangeSelect] = useState(false);
  const [valueSecondSelect, setValueSecondSelect] = useState({});
  const [optionsFilters, setOptionsFilters] = useState([]);
  useEffect(() => {
    handleDates();
  }, [startDate, finishDate]);

  useEffect(() => {
    if (keySearchValue?.search) {
      handleSearch();
    }
  }, [keySearchValue]);

  const handleSearch = () => {
    if (!keySearchValue.keySearch) return;
    let bodyKeySearch = { ...keySearchValue };
    bodyKeySearch.id = "keySearch";
    bodyKeySearch.label = "Resultados de la Búsqueda";
    bodyKeySearch.name = keySearchValue?.keySearch;
    bodyKeySearch.value = keySearchValue?.keySearch;
    bodyKeySearch.type = keySearchValue?.type;
    handleFilters(bodyKeySearch);
  };
  const handleSelectOptionFilter = option => {
    setValueSecondSelect("");
    if (option) {
      validateCatalog(option);
      setOptionSelected(option);
      if (option.filterInOptions) {
        let searchOption = filters.filter(item => item[option.filterBy] === option.filterInOptions);
        let aux = searchOption[0] ? searchOption[0][option?.filterOptions] : "";
        let params = {
          all: 1,
          order: "name",
          where: {
            [option?.filterInOptions]: aux,
          },
        };
        dispatch(getCities({ params }));
      }
    } else {
      setOptionSelected("");
      setOptionsFilters("");
    }
  };

  const validateCatalog = option => {
    if (option.catalogName) {
      getCatalogBy(option.catalogName);
    }
    setOptionsFilters(option.optionsFilter);
  };

  const checkOptions = option => {
    if (option.catalogName) {
      let updateOptions = handleValidateCatalog(option.catalogName);
      setOptionsFilters(updateOptions);
    }
  };

  const handleFilters = (filterBy, deleteFilterId) => {
    let newArrayFilters = [...filters];
    let searchFilter = newArrayFilters.findIndex((item, index) => item?.id === filterBy?.id);
    if (Math.sign(searchFilter) >= 0) {
      newArrayFilters[searchFilter] = filterBy;
    } else {
      newArrayFilters.push(filterBy);
    }
    if (deleteFilterId) {
      //Eliminara otro filtro según el id(campo de identifier) que reciba, este lo recibirá en un arreglo
      //por si se tiene que eliminar varios filtros
      let filter = newArrayFilters.filter(object1 => {
        return !deleteFilterId.some(object2 => {
          return object1.id === object2;
        });
      });
      setFilters(filter);
    } else {
      setFilters(newArrayFilters);
    }
    refetch();
    cleanAll();
    if (restorePage) restorePage();
  };
  const handleOption = option => {
    let bodyFilter = {
      ...optionSelected,
      id: optionSelected?.identifier,
      label: optionSelected?.label,
      name: option[optionSelected?.getNameChip],
      value: option[optionSelected?.getValue],
      type: optionSelected?.type,
    };
    if (optionSelected?.typeof) {
      bodyFilter.typeof = optionSelected?.typeof;
    }
    if (option.typedate) {
      bodyFilter.typedate = option?.typedate;
    }
    if (option.value === "range") {
      setIsRangeSelect(true);
    } else {
      handleFilters(bodyFilter, optionSelected?.deleteId);
    }
  };
  const handleDates = () => {
    if (startDate && finishDate) {
      if (finishDate >= startDate) {
        let bodyOption = {
          typedate: "range",
          label: `Rango(${dayjs(startDate).format("DD-MMMM-YYYY")} al ${dayjs(finishDate).format("DD-MMMM-YYYY")})`,
          value: [dayjs(startDate).startOf("day").format(), dayjs(finishDate).endOf("day").format()],
        };
        handleOption(bodyOption);
      }
    }
  };
  const cleanAll = () => {
    setOptionSelected("");
    setValueSecondSelect("");
    setIsShowFilters(false);
    setIsRangeSelect(false);
    setStartDate("");
    setFinishDate("");
  };

  return (
    <FilterStyled>
      <div className="filtercomponent">
        {isRangeSelect ? (
          <div className="container_dates">
            <div className="content_date">
              <label className="title">De:</label>
              <KeyboardDatePicker
                disableToolbar
                variant="inline"
                format="DD-MM-YYYY"
                id="date-picker-inline"
                className="date"
                value={startDate}
                InputProps={{ disableUnderline: true, readOnly: true }}
                onChange={date => setStartDate(date)}
                autoOk={true}
                KeyboardButtonProps={{
                  "aria-label": "change date",
                }}
                invalidDateMessage={""}
                placeholder="Fecha de Inicio"
              />
            </div>
            <div className="content_date">
              <label className="title">Al:</label>
              <KeyboardDatePicker
                disableToolbar
                variant="inline"
                format="DD-MM-YYYY"
                id="date-picker-inline"
                className="date"
                value={finishDate}
                autoOk={true}
                InputProps={{ disableUnderline: true, readOnly: true }}
                onChange={date => setFinishDate(date)}
                KeyboardButtonProps={{
                  "aria-label": "change date",
                }}
                invalidDateMessage={""}
                placeholder="Fecha de Fin"
                minDate={startDate}
              />
              {/* <input className="date" type="date" onChange={e => setFinishDate(e.target.value)} /> */}
            </div>
            <IconButton className="button_close" onClick={() => setIsRangeSelect(false)}>
              <Close className="icon" />
            </IconButton>
          </div>
        ) : (
          <div className="container_filters">
            <IconButton
              className="btShowFilters"
              onClick={() => {
                setIsShowFilters(!isShowFilters);
                setOptionSelected("");
              }}
            >
              <FilterList className="icon" />
              <p className="title_button">{showName ? showName : ""}</p>
            </IconButton>
            <div className={`select_filters ${isShowFilters && "selected"} ${optionSelected && "select_options"}`}>
              <Select
                className="select_style margin_right"
                placeholder="Agregar Filtro..."
                onChange={handleSelectOptionFilter}
                options={options}
                isClearable={true}
                noOptionsMessage={() => "Sin Opciones"}
                value={optionSelected}
                styles={{
                  menu: provided => ({ ...provided, zIndex: 9999 }),
                  menuList: base => styleScrollReactSelect(base),
                }}
              />
              {optionSelected?.value && (
                <Select
                  className="select_style"
                  placeholder="Selecciona una Opción"
                  onChange={handleOption}
                  options={optionsFilters}
                  onMenuOpen={() => checkOptions(optionSelected)}
                  // loadingMessage={"Cargando Opciones..."}
                  // isLoading={optionSelected.loadOptions ? optionSelected.loadOptions : false}
                  getOptionLabel={option => option[optionSelected.getNameChip]}
                  getOptionValue={option => option[optionSelected.getValue]}
                  noOptionsMessage={() => "Sin Opciones"}
                  value={valueSecondSelect}
                  styles={{
                    menu: provided => ({ ...provided, zIndex: 9999 }),
                    menuList: base => styleScrollReactSelect(base),
                  }}
                />
              )}
            </div>
          </div>
        )}
      </div>
    </FilterStyled>
  );
}
