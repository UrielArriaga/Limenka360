import { Button, Chip, CircularProgress, Dialog, Grid, Tooltip, Switch } from "@material-ui/core";
import { Cached, TableChartOutlined } from "@material-ui/icons";
import { Pagination } from "@material-ui/lab";
import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";

import { api } from "../../services/api";
import { capitalizeString, formatDate, formatHour, formatNumber, isEmptyArray, toUpperCaseChart } from "../../utils";
import { TableOrderStyled, DialogContainer, DrawerContainer } from "./tableOrders.styles";

const TableOrder = ({ footer, handleClickOrder, prospect, handleAlert, setAlert, setFlag }) => {
  // * My own States
  const [orders, setOrders] = useState([]);
  // * My own States
  const [isLoading, setIsLoading] = useState(false);
  const [refetch, setRefetch] = useState(false);

  const heads = [
    "fecha de creación",
    "folio",
    "total",
    "estado",
    "télefono Envio",
    "Estado Envio",
    "Municipio Envio",
    "factura",
    "cuenta de Pago",
    "observaciones Generales",
  ];
  //paginacion
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [totalOrder, setTotalOrder] = useState(0);
  const totalPages = Math.ceil(totalOrder / limit);
  const handleChange = (event, value) => {
    setPage(value);
  };
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    let mounted = true;
    if (mounted) {
      getOrdersByProspect();
    }
    return () => (mounted = false);
  }, [refetch, page, prospect]);

  const getOrdersByProspect = async () => {
    try {
      setIsLoading(true);
      let query = {};
      query.oportunity = { prospectId: prospect.id };
      let include =
        "oportunity,oportunity.prospect,paymentaccount,bill,orderstatus,address,address.city,address.entity";
      let join = "oportunity,oportunity.prospect,paymentaccount,b,orderstatus,address,address.city,address.entity";
      let params = {
        include: include,
        join: join,
        where: JSON.stringify(query),
        count: "0",
        limit: limit,
        order: "-createdAt",
      };

      let ordersResponse = await api.get(`orders`, { params });
      setOrders(ordersResponse.data?.results);
      setTotalOrder(ordersResponse.data?.count);
      setIsLoading(false);
    } catch (error) {
      handleAlert("error", "Pedidos - Error al cargar datos!", "basic");
      console.log(error);
      setIsLoading(false);
    }
  };

  const checkrow = number => {
    if (number % 2 == 0) {
      return true;
    } else {
      return false;
    }
  };

  return (
    <TableOrderStyled>
      <div className="title_table">
        <div className="primary">
          <TableChartOutlined className="icon_primary" />
          <p>Pedidos({totalOrder})</p>
          {isLoading ? (
            <CircularProgress size={20} className="load" />
          ) : (
            <Cached className="reload" onClick={() => setRefetch(!refetch)} />
          )}
        </div>
      </div>

      {isEmptyArray(orders) && TableEmpty(heads)}

      {!isEmptyArray(orders) && (
        <div className="table">
          <table className="ctr_table">
            <thead className="ctr_table__head">
              <tr className="ctr_table__head__tr">
                {heads.map((item, index) => (
                  <th key={index} className={`title ${item == "fecha de creación" && "checkbox"}`}>
                    <div className="ctr_title">
                      <p>{item}</p>
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="ctr_table__body">
              {orders.map((item, index) => {
                return (
                  <tr key={index} className={checkrow(index) ? "row" : "inpar row"}>
                    <td className="data fixed" onClick={() => handleClickOrder(item)}>
                      <p className="ctr_td">
                        <span className="span">{`${formatDate(item?.createdAt)}, ${formatHour(item?.createdAt)}`}</span>
                      </p>
                    </td>

                    <td className="data">
                      <p className="ctr_td">{item?.folio}</p>
                    </td>
                    <td className="data">
                      <p className="ctr_td">{formatNumber(item?.total)}</p>
                    </td>
                    <td className="data">
                      <p className="ctr_td">{item?.orderstatus?.name}</p>
                    </td>
                    <td className="data">
                      <p className="ctr_td">{item?.phone}</p>
                    </td>
                    <td className="data">
                      <p className="ctr_td">{item?.address?.entity?.name}</p>
                    </td>
                    <td className="data">
                      <p className="ctr_td">{item?.address?.city?.name}</p>
                    </td>

                    <td className="data">
                      <p className="ctr_td">{item?.billing ? "con factura" : "sin factura"}</p>
                    </td>
                    <td className="data">
                      {item?.paymentaccount ? <p className="ctr_td">{item?.paymentaccount?.name}</p> : <span>N/A</span>}
                    </td>

                    <td className="data">
                      {item?.observations ? <p className="ctr_td">{item?.observations}</p> : <span>N/A</span>}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
      {footer && (
        <div className="tfooter">
          <div className="tfooter__ctr_button"></div>

          <div className="pagination">
            <Pagination count={totalPages} page={page} onChange={handleChange} color="primary" />
          </div>
        </div>
      )}
    </TableOrderStyled>
  );
};

export default TableOrder;

function TableEmpty(heads) {
  return (
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
  );
}
