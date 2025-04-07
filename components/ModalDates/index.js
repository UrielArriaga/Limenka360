import React, { useState } from "react";
import styled from "styled-components";
import { Button, Checkbox, CircularProgress, Dialog, Fade, IconButton } from "@material-ui/core";
import { Close, DateRange } from "@material-ui/icons";
import dayjs from "dayjs";
import DatePicker from "react-datepicker";
import { api } from "../../services/api";
import { handleGlobalAlert, validateURL } from "../../utils";
import { useDispatch } from "react-redux";

const ModalDates = ({ open, setOpen, rowSelected }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [dateReport, setDateReport] = useState(defaultDate);
  const [checkWithReports, setCheckWithReports] = useState(false);
  const dispatch = useDispatch();
  const defaultDate = dayjs().format();
  const handleClose = () => setOpen(false);
  const onChangeDate = date => setDateReport(date);
  const handleChangeCheck = event => setCheckWithReports(event.target.checked);
  const downloadReport = async () => {
    setIsLoading(true);
    try {
      let bodyReport = {
        finalname: rowSelected.nombre.replaceAll(" ", ""),
        groupId: rowSelected.id,
      };
      if (checkWithReports) {
        bodyReport.start = dayjs(dateReport).startOf("month").format();
        bodyReport.finish = dayjs(dateReport).endOf("month").format();
      } else {
        bodyReport.date = dayjs(dateReport).format();
      }
      let responseExcel = await api.post(
        `convert/${checkWithReports ? "reportorders" : "tempreportexcel"}`,
        bodyReport
      );

      let responsePDFSAVE = await api.post(
        "convert/pdfbuffer",
        {
          pdfurl: validateURL(responseExcel.data.url),
        },
        {
          responseType: "blob",
        }
      );
      let pdfBlob = new Blob([responsePDFSAVE.data], {
        type: "application/pdf;charset=utf-8",
      });
      await saveAs(pdfBlob, `${rowSelected.nombre.replaceAll(" ", "")}.xlsx`);
      handleGlobalAlert("success", "Archivo Generado!", "basic", dispatch, 6000);
      setIsLoading(false);
      handleClose();
    } catch (error) {
      setIsLoading(false);
      handleClose();
      console.log(error);
    }
  };

  return (
    <DialogContainer open={open} onClose={handleClose}>
      <div className="contenedor">
        <div className="contenedor__header">
          <p className="title">
            Generar Reporte Grupo <span className="capitalize">{`"${rowSelected?.nombre}"`}</span>
          </p>
          <IconButton onClick={handleClose} className="btn">
            <Close />
          </IconButton>
        </div>
        <div className="contenedor__body">
          <div className="item">
            <p className="title_body">
              Fecha
              <span className="date">
                {dayjs(dateReport).startOf("month").format("DD/MMM/YY") +
                  " al " +
                  dayjs(dateReport).endOf("month").format("DD/MMM/YY")}
              </span>
            </p>
            <p className="title_option">
              Con Pedidos
              <Checkbox checked={checkWithReports} onChange={handleChangeCheck} name="checkedF" color="primary" />
            </p>
          </div>
          <div className="item_calendar">
            <DatePicker
              selected={dateReport}
              onChange={date => onChangeDate(date)}
              dateFormat="MM/yyyy"
              showMonthYearPicker
              inline
            />
          </div>
        </div>
        <div className="contenedor__footer">
          <div className="buttons_container">
            <Fade in={isLoading}>
              <p className="alert_stand">Esto Puede tardar unos segundos...</p>
            </Fade>
            <Button
              className="bt_submit"
              variant="contained"
              color="primary"
              onClick={downloadReport}
              disabled={isLoading}
            >
              {isLoading ? <CircularProgress size={24} /> : "Generar Reporte"}
            </Button>
          </div>
        </div>
      </div>
    </DialogContainer>
  );
};

export default ModalDates;

const DialogContainer = styled(Dialog)`
  .contenedor {
    &__header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      background: #0c203b;
      color: #fff;
      padding: 0px 10px;
      .title {
        font-size: 17px;
        font-weight: 500;
        letter-spacing: 0.05em;
        margin-right: 10px;
      }
      .btn {
        margin-left: 10px;
        color: red;
      }
    }

    &__body {
      width: 100%;
      padding: 10px;
      margin-bottom: 20px;
      .item {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-bottom: 20px;
        padding: 10px;
        .title_body {
          display: flex;
          flex-direction: column;
          .date {
            font-weight: 500;
            text-transform: capitalize;
          }
        }
        .title_option {
          display: flex;
          flex-direction: column;
        }
      }
      .item_calendar {
        display: flex;
        flex-direction: column;
        align-items: center;
        .react-datepicker {
        }
      }
    }
    &__footer {
      padding: 10px;
      display: flex;
      justify-content: right;
      .buttons_container {
        display: flex;
        align-items: center;
        .alert_stand {
          margin-right: 5px;
          font-size: 13px;
          font-weight: 500;
          color: #0c203b;
        }
        .bt_submit {
          text-transform: capitalize;
        }
      }
    }
    .capitalize {
      text-transform: capitalize;
    }
  }
`;
