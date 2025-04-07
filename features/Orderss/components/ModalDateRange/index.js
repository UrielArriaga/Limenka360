import React, { useEffect, useState } from "react";
import days from "dayjs";
import { Modal, Box, Button, Typography, IconButton } from "@material-ui/core";
import { TextField } from "@material-ui/core";
import Filters from "../../../../components/Filters";
import useOrders from "../../hooks/useOrders";
import { KeyboardDatePicker } from "@material-ui/pickers";
import { Close } from "@material-ui/icons";
import useTableOrders from "../TableOrders/hooks/useTableOrders";
import {
  ButtonContainer,
  DateContainer,
  DatePickerStyled,
  HeaderContainer,
  StyledButton,
  StyledModalBox,
} from "./styles";

export default function ModalDateRange({ open, handleClose, onGenerate, loadingExport }) {
  const { optionsFilters, filters, setFilters, restorePage, handleRefetch, setValueToFind, valueToFind, ordersData } =
    useOrders();
  const [startDate, setStartDate] = useState("");
  const [finishDate, setFinishDate] = useState("");
  const [isRangeSelect, setIsRangeSelect] = useState(false);
  const [optionSelected, setOptionSelected] = useState("");
  const [error, setError] = useState(false);

  useEffect(() => {
    handleDates();
  }, [startDate, finishDate]);

  const handleGenerateClick = () => {
    if (!startDate || !finishDate) {
      setError(true);
      return;
    }
    const formattedStartDate = startDate.format("YYYY-MM-DD");
    const formattedFinishDate = finishDate.format("YYYY-MM-DD");
    // onGenerate(startDate, finishDate); //Estamos llamando la función del padre con las fechas que elegimos
    onGenerate(formattedStartDate, formattedFinishDate); //aquí le dí el formato a startDate y finishDate
    handleClose();
    cleanAll();
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
    handleRefetch();
    // cleanAll();
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
          label: `Rango(${days(startDate).format("DD-MMMM-YYYY")} al ${days(finishDate).format("DD-MMMM-YYYY")})`,
          value: [days(startDate).startOf("day").format(), days(finishDate).endOf("day").format()],
        };
        handleOption(bodyOption);
      }
    }
  };
  const cleanAll = () => {
    setStartDate("");
    setFinishDate("");
  };

  return (
    <Modal open={open} onClose={handleClose} aria-labelledby="modal-title" aria-describedby="modal-description">
      <StyledModalBox>
        <HeaderContainer>
          <Typography id="modal-title"> Rango de Fechas</Typography>
          <IconButton onClick={() => handleClose()}>
            <Close style={{ color: "white" }} />
          </IconButton>
        </HeaderContainer>

        <DateContainer>
          <DatePickerStyled>
            <KeyboardDatePicker
              disableToolbar
              variant="dialog"
              format="DD-MM-YYYY"
              id="date-picker-inline"
              value={startDate}
              InputProps={{ disableUnderline: true, readOnly: true }}
              onChange={date => {
                setStartDate(date);
                setError(false);
              }}
              error={error && !startDate}
              helperText={error && !startDate ? "Selecciona la fecha de inicio" : ""}
              autoOk={true}
              KeyboardButtonProps={{
                "aria-label": "change date",
              }}
              invalidDateMessage={""}
              placeholder="Fecha de Inicio"
              fullWidth
            />
          </DatePickerStyled>
          <TextField fullWidth InputLabelProps={{ shrink: true }}  style={{ marginBottom: "25px"}}
          />
          <DatePickerStyled>
            <KeyboardDatePicker
              disableToolbar
              variant="dialog"
              format="DD-MM-YYYY"
              id="date-picker-inline"
              value={finishDate}
              InputProps={{ disableUnderline: true, readOnly: true }}
              onChange={date => {
                setFinishDate(date);
                setError(false);
              }}
              error={error && !finishDate}
              helperText={error && !finishDate ? "Selecciona la fecha de fin" : ""}
              KeyboardButtonProps={{
                "aria-label": "change date",
              }}
              invalidDateMessage={""}
              placeholder="Fecha de Fin"
              fullWidth
            />
          </DatePickerStyled>

          <ButtonContainer>
            <StyledButton color="secondary" onClick={handleClose} variant="outlined">
              Cancelar
            </StyledButton>
            <StyledButton color="primary" onClick={handleGenerateClick} variant="outlined">
              {loadingExport ? "Exportando Archivo" : "Exportar Archivo"}
            </StyledButton>
          </ButtonContainer>
        </DateContainer>
      </StyledModalBox>
    </Modal>
  );
}
