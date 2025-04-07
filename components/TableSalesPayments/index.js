import { Button, Chip, CircularProgress, Dialog, Grid, Tooltip } from "@material-ui/core";
import { Cached, TableChartOutlined, FilterList, Close } from "@material-ui/icons";
import React, { useState, useEffect } from "react";
import { api } from "../../services/api";
import { formatDate, formatNumber } from "../../utils";
import { DrawerContainer, PaymentsStyled } from "./tableSalesPayments.styles";
import { useRouter } from "next/router";
import { Pagination } from "@material-ui/lab";
const TableSalesPayments = ({ footer, prospect, handleAlert, oportunity }) => {
  const [payments, setPayments] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [totalPayments, setTotalPayments] = useState(0);
  const [refetch, setRefetch] = useState(false);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const totalPages = Math.ceil(totalPayments / limit);
  const heads = ["fecha", "concepto", "monto", "comision", "Referencia", "Estado Pago"];
  //* filters
  const [showFilters, setShowFilters] = useState(false);
  const [showChips, setShowChips] = useState(false);
  const [order, setOrder] = useState({ value: "date", label: "Antiguos" });
  const router = useRouter();
  const handleCloseFilter = () => {
    setShowChips(true);
    setShowFilters(!showFilters);
  };
  const [ispaid, setPaid] = useState("");
  useEffect(() => {
    let mounted = true;
    if (mounted) {
      getDataInitial();
    }
    return () => (mounted = false);
  }, [refetch, page, prospect, oportunity]);

  const getDataInitial = async () => {
    try {
      let query = {};
      query.oportunity = { prospect: { id: prospect.id } };
      if (ispaid !== "") {
        query.ispaid = ispaid;
      } else {
        delete query.ispaid;
      }
      setIsLoading(true);
      let paymentse = await api.get(
        `salespayments?where=${JSON.stringify(
          query
        )}&include=oportunity,oportunity.prospect&count=1&limit=${limit}&order=${order.value}&skip=${page}`
      );

      setPayments(paymentse.data.results);
      setTotalPayments(paymentse.data.count);
      setIsLoading(false);
    } catch (error) {
      console.log(error.response);
      setIsLoading(false);
      handleAlert("error", "Pagos - Error al cargar los datos!", "basic");
    }
  };

  const handlePage = (event, value) => {
    setPage(value);
    // setFlag(!flag);
  };

  const handleFilters = () => {
    if (page > 1) {
      setPage(1);
    }
    setShowChips(!showChips);
    setRefetch(!refetch);
    handleCloseFilter();
  };
  const removePayment = () => {
    setPaid("");
    if (page > 1) {
      setPage(1);
    }
    setRefetch(!refetch);
  };
  const removeOrder = () => {
    setOrder({ value: "date" });
    if (page > 1) {
      setPage(1);
    }
    setRefetch(!refetch);
  };
  const checkrow = number => {
    if (number % 2 == 0) {
      return true;
    } else {
      return false;
    }
  };
  return (
    <PaymentsStyled>
      <div className="title_table">
        <div className="primary">
          <TableChartOutlined className="icon_primary" />
          <p>Pagos</p>
          {isLoading ? (
            <CircularProgress size={20} className="load" />
          ) : (
            <Cached className="reload" onClick={() => setRefetch(!refetch)} />
          )}
        </div>
        {showChips && (
          <div>
            {ispaid !== "" && (
              <Chip
                color="primary"
                size="small"
                onDelete={removePayment}
                label={`${"Estado de pago"}: ${ispaid == "true" ? "Pagados" : "Pendientes"}`}
                className="chip"
              />
            )}
            {order.value == "-date" && (
              <Chip
                color="primary"
                size="small"
                onDelete={removeOrder}
                label={`${"ordenar por"}: ${order.label}`}
                className="chip"
              />
            )}
          </div>
        )}
        <div
          className="secondary"
          onClick={() => {
            setShowChips(false);
            setShowFilters(!showFilters);
          }}
        >
          <FilterList />
          <p>Filtros</p>
        </div>
      </div>
      {payments.length > 0 ? (
        <div className="table">
          <table className="ctr_table">
            <thead className="ctr_table__head">
              <tr className="ctr_table__head__tr">
                {heads.map((item, index) => (
                  <th key={index} className={`title ${item == "fecha" && "checkbox"}`}>
                    <div className="ctr_title">
                      <p>{item}</p>
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="ctr_table__body">
              {payments.map((item, index) => {
                return (
                  <tr key={index} className={checkrow(index) ? "row" : "inpar row"}>
                    <td className="data fixed">
                      <p className="ctr_td">
                        <span className="span">{`${formatDate(item?.date)}`}</span>
                      </p>
                    </td>

                    <td className="data">
                      <p className="ctr_td">{item?.oportunity?.concept}</p>
                    </td>

                    <td className="data">
                      <p className="ctr_td">{formatNumber(item?.payment)}</p>
                    </td>
                    <td className="data">
                      <p className="ctr_td">{item?.comission} </p>
                    </td>

                    <td className="data">
                      {item?.observations ? <p className="ctr_td">{item.observations}</p> : <span>N/A</span>}
                    </td>
                    <td className="data">
                      {item.ispaid === true ? (
                        <p className="paidOut"> Pagado</p>
                      ) : (
                        <p className="paidPending"> Pendiente</p>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      ) : (
        <>
          <div className="table empty">
            <table className="ctr_table">
              <thead className="ctr_table__head">
                <tr className="ctr_table__head__tr">
                  {heads.map((item, index) => (
                    <th className="title " key={index}>
                      <div className="ctr_title">
                        <p>{item}</p>
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
            </table>
          </div>
          <div className="body_empty">
            <div className="message_ctr">
              <img src="/empty_table.svg" />
              <p>Aun no hay datos</p>
            </div>
          </div>
        </>
      )}

      {footer && (
        <div className="tfooter">
          <div className="tfooter__ctr_button"></div>
          <div className="tfooter__ctr_pagination">
            <p className="">{`Total de Pagos: ${totalPayments} Pagina: ${page}- ${Math.ceil(
              totalPayments / limit
            )}`}</p>
            <div className="tfooter__ctr_pagination__pagination">
              <Pagination
                style={{ display: "flex", justifyContent: "center" }}
                page={page}
                defaultPage={1}
                onChange={handlePage}
                shape="rounded"
                count={totalPages}
                color="primary"
              />
            </div>
          </div>
        </div>
      )}
      <DrawerContainer anchor="right" open={showFilters} onClose={handleCloseFilter}>
        <div className="ctr_drawer">
          <div className="ctr_drawer__top">
            <p className="title">Filtra por tu preferencia</p>
            <Close className="close_icon" onClick={handleCloseFilter} />
          </div>
          <div className="ctr_drawer__ctr_inputs">
            <div className="ctr_drawer__ctr_inputs__input">
              <label className="label">Estado de pago</label>
              <select
                value={ispaid}
                onChange={e => {
                  setPaid(e.target.value);
                }}
                className="input"
              >
                <option value="" hidden>
                  Selecciona una opción
                </option>
                <option value={false}>Pendientes</option>
                <option value={true}>Pagados</option>
              </select>
            </div>
            <div className="ctr_drawer__ctr_inputs__input">
              <label className="label">Ordenar Por</label>
              <select
                value={order.value}
                onChange={e => {
                  let order = FiltersOrder.filter(item => item.value == e.target.value);
                  setOrder({ label: order[0].label, value: order[0].value });
                }}
                className="input"
              >
                <option hidden>Selecciona orden</option>
                {FiltersOrder.map((item, index) => {
                  return (
                    <option value={item.value} key={index}>
                      {item.label}
                    </option>
                  );
                })}
              </select>
            </div>
          </div>

          <div className="ctr_drawer__ctr_buttons">
            <Button variant="contained" className="btn_cancel" onClick={handleCloseFilter}>
              Cancelar
            </Button>

            <Button variant="contained" className="btn_apply" onClick={() => handleFilters()}>
              Aplicar
            </Button>
          </div>
        </div>
      </DrawerContainer>
    </PaymentsStyled>
  );
};

export default TableSalesPayments;
const FiltersOrder = [
  { label: " Recientes", value: "-date" },
  // { label: " Antiguos", value: "date" },
];
