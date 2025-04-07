import { DrawerDisountStyle, Main } from "./styles";
import { Button, Dialog, CircularProgress, Tooltip, IconButton, Fade, Popover, Grid } from "@material-ui/core";
import { useState, useEffect } from "react";
import {
  CachedOutlined,
  CenterFocusStrongOutlined,
  Close,
  DateRangeRounded,
  NavigateBefore,
  NavigateNext,
  StyleOutlined,
} from "@material-ui/icons";
import dayjs from "dayjs";
import NumberFormat from "react-number-format";
import { api } from "../../services/api";
import { useSelector } from "react-redux";
import AlertGlobal from "../Alerts/AlertGlobal";
import { handleAlert } from "../../utils";

import { userSelector } from "../../redux/slices/userSlice";

export default function DrawerAutorization({
  drawerShowDiscount,
  setDrawerShowDiscount,
  setTotalDiscounts,
  totalDiscounts,
  ...props
}) {
  const { id_user, roleId, groupId, company } = useSelector(userSelector);
  const [refetch, setRefetch] = useState(false);
  const [Alert, setAlert] = useState({ severity: null, show: null, message: "", type: null });
  const [isloaderDiscounts, setisloaderDiscounts] = useState(false);
  const [page, setPage] = useState(1);
  const [discounts, setDiscounts] = useState([]);
  const [limitDiscounts, setLimitDiscounts] = useState(5);
  const totalPages = Math.ceil(totalDiscounts / limitDiscounts);

  useEffect(() => {
    getData();
  }, [refetch, page]);

  const getData = () => {
    setisloaderDiscounts(true);
    let query = {};
    query.approved = false;
    if (roleId == "gerente") {
      query.ejecutive = { groupId: groupId };
    }
    if (roleId == "Admin_compania" || roleId == "director") {
      query.ejecutive = { companyId: company };
    }
    api
      .get(`ejecutivediscounts?where=${JSON.stringify(query)}&count=0&include=ejecutive,prospect`)
      .then(res => {
        setDiscounts(res.data.results);
        setTotalDiscounts(res.data.count);
        // console.log(res.data.count);
      })
      .catch(err => console.log(err))
      .finally(() => {
        setisloaderDiscounts(false);
      });
  };

  const handleAprovedDiscount = async item => {
    try {
      let discounts = {};
      discounts.approved = true;
      discounts.approvedbyId = id_user;
      let discount = await api.put(`ejecutivediscounts/${item.id}`, discounts);
      if (discount.status == 200) {
        handleAlert("success", "Descuento Autorizado correctamente!", "basic", setAlert);
        setRefetch(!refetch);
      }
    } catch (error) {
      handleAlert("error", "No se puede aprobar el descuento intentalo más tardes!", "basic");
      console.log(error);
    }
  };

  const handleDenegateDiscount = async item => {
    try {
      let discounts = {};
      discounts.approved = false;
      discounts.denied = false;
      discounts.deniedbyId = id_user;
      let discount = await api.put(`ejecutivediscounts/${item.id}`, discounts);
      if (discount.status == 200) {
        handleAlert("success", "Descuento Denegado correctamente!", "basic", setAlert);
        setRefetch(!refetch);
      }
    } catch (error) {
      handleAlert("error", "No se puede aprobar el descuento intentalo más tardes!", "basic", setAlert);
      console.log(error);
    }
  };

  const drawerClose = () => {
    setDrawerShowDiscount(false);
  };
  const iconRefresh = () => {
    setRefetch(!refetch);
    getData();
  };

  return (
    <DrawerDisountStyle onClose={drawerClose} open={drawerShowDiscount} anchor="right">
      <Main>
        <div className="drawer_header">
          <Tooltip title="Recargar">
            <CachedOutlined className="drawer_header__title__iconReload" onClick={() => iconRefresh()} />
          </Tooltip>
          <div className="drawer_header__title">
            <p className="drawer_header__title__Subtitle">Descuentos por autorizar</p>
          </div>
          <Tooltip title="Cerrar">
            <Close className="drawer_header__title__iconReload" onClick={drawerClose} />
          </Tooltip>
        </div>
        <Grid>
          {isloaderDiscounts == true ? (
            <div className="contenido__loader">
              <CircularProgress />
            </div>
          ) : discounts.length == 0 ? (
            <div className="contenido__empty">
              <img src="/empty_table.svg" className="contenido__empty__image" />
              <p className="contenido__empty__title">Sin resultados</p>
            </div>
          ) : (
            <>
              {discounts.map((item, index) => (
                <div className="container_discounts" key={index}>
                  <Grid item md={8}>
                    <div className="data_ejecutive">
                      <div className="ejecutive_name">
                        <p>
                          Solicitado por{" "}
                          <span>
                            {item.ejecutive.name} {item.ejecutive.lastname}
                          </span>
                        </p>
                      </div>
                      <div className="prospect_text">
                        Solicitud para{" "}
                        <span>
                          {item.prospect.name} {item.prospect.lastname}
                        </span>
                      </div>
                      <div className="prospect_text">
                        Total de cotización:{" "}
                        <span>
                          <NumberFormat prefix="$" displayType="text" value={item.total} thousandSeparator={true} />
                        </span>
                      </div>
                      <div className="prospect_text">
                        Descuento del <span>{item.dispercentage} %</span>
                      </div>
                      <div className="prospect_text">
                        Monto descuento{" "}
                        <span>
                          <NumberFormat prefix="$" displayType="text" value={item.discount} thousandSeparator={true} />
                        </span>
                      </div>
                    </div>
                    <div className="prospect_text">
                      {" "}
                      Concepto: <span>{item.concept}</span>
                    </div>
                    <div className="date">
                      <DateRangeRounded className="icon_date" /> Fecha de Solicitud:{" "}
                      <span>{dayjs(item.createdAt).format("DD/MM/YYYY")}</span>
                    </div>
                  </Grid>
                  <Grid item md={4} className="container_buttons">
                    <button className="bts_aproved" onClick={e => handleAprovedDiscount(item)}>
                      Aprobar{" "}
                    </button>
                    <button className="bts_denegate" onClick={e => handleDenegateDiscount(item)}>
                      Denegar{" "}
                    </button>
                  </Grid>
                </div>
              ))}
              <div className="contenido__pagination">
                <IconButton
                  color="primary"
                  disabled={page <= 1 ? true : false}
                  className="contenido__pagination__buttonBefore"
                  onClick={() => setPage(page - 1)}
                >
                  <NavigateBefore className="contenido__pagination__buttonBefore__icon" />
                </IconButton>
                <IconButton
                  color="primary"
                  disabled={page >= totalPages ? true : false}
                  className="contenido__pagination__buttonNext"
                  onClick={() => setPage(page + 1)}
                >
                  <NavigateNext className="contenido__pagination__buttonNext__icon" />
                </IconButton>
              </div>
            </>
          )}
        </Grid>
      </Main>
      {Alert?.show && (
        <AlertGlobal severity={Alert.severity} message={Alert.message} show={Alert.show} type={Alert.type} />
      )}
    </DrawerDisountStyle>
  );
}
