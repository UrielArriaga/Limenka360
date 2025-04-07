import { useRouter } from "next/router";
import React, { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCompanyById } from "../../redux/slices/companySlice";
import { fetchUserBytoken, userSelector } from "../../redux/slices/userSlice";
import { RedirectPage } from "../../utils/index";
import styled, { keyframes } from "styled-components";
import { fillExecutives } from "../../redux/slices/ejecutivosSlice";
import {
  getCountClientes,
  getCountCustomers,
  getCountOportunities,
  getCountProspect,
  getCountOrders,
  getOrders,
  getPayments,
  getCountGroups,
  getCountEjecutives,
  getCountFormats,
  getTotalSales,
  getCountProviders,
  getCountCategories,
  getCountOrdersAllStatus,
  getCountActivities,
} from "../../redux/slices/dashboardSlice";
import UsersOnline from "../UsersOnline";
import AlertPendings from "../AlertPendings";
import { alertSelector } from "../../redux/slices/alertSlice";
import AlertGlobal from "../Alerts/AlertGlobal";
import { getNotificationsByQuery, notificationsSelector } from "../../redux/slices/notificationSlice";
import { getNotifications, commonSelector } from "../../redux/slices/commonSlice";
import { SocketContext } from "../../context/socketContext";
import { motion } from "framer-motion";
import dayjs from "dayjs";
import { Avatar, Button, CircularProgress, Grid, IconButton } from "@material-ui/core";
import { api } from "../../services/api";
import {
  getCategoriesCommon,
  getClientTypesCommon,
  getDiscardReasons,
  getOriginsCommon,
  getPhasesCommon,
  getSpecialtiesCommon,
  getUsersCommon,
  getProductsCommon,
  getActivitiesCommon,
  getLabelsProspect,
  getClientsCompany,
  getEntities,
  getCities,
  getGroupsCommon,
  getCfdisCommon,
  getpaymentways,
  getpaymentmethods,
  gettaxregimens,
  getpaymentAccount,
  getfileTypes,
  getConcepts,
  getGoalNames,
  getGoalTypes,
  getChannelsCommon,
  getProductsTypes,
  getBrands,
  getpaymentperiods,
} from "../../redux/slices/commonSlice";
import { Close, FiberManualRecord, ShoppingBasket } from "@material-ui/icons";
import NotificationOrder from "../NotificationOrder";
import {
  fetchUserBytokenFromManager,
  getCountClientesFromManager,
  getCountCustomersFromManager,
  getCountOportunitiesFromManager,
  getCountProspectFromManager,
  getPaymentsFromManager,
} from "../../redux/slices/dashboardViewExecutiveSlice";
import { handleToggleMenu } from "../../redux/slices/dialogSlice";
import { setFinishDateGlobal, setStartDateGlobal, setTypeCalendarGlobal } from "../../redux/slices/dashboardDirector";
import NotificationOrderRejected from "../NotificationOrdersType";
import { ordersSelector, refetchOrdersNotification } from "../../redux/slices/orders";
import LimenkaChanges from "../LimenkaChanges";
import AlertLogistic from "../AlertLogistic";
import {
  globalNotificationsSelector,
  globalNotificationsSlice,
  showGlobalNotification,
} from "../../redux/slices/globalNotificationsSlice";
import AlertEjecutive from "../AlertEjecutive";
import NotificacionsLimenka from "../../componentx/common/NotificacionsLimenka";
import NotificationCenterPopup from "../../componentx/common/NotificationCenterPopup";
import NotificationsCenter from "../../componentx/common/NotificationsCenter";
import { fetchNotifications, fetchNotificationsUnRead } from "../../redux/slices/notificationcenterSlice";
import useUpdateToken from "../../hooks/useUpdateToken";

export default function Wrapper({ children }) {
  useEffect(() => {}, []);
  const dispatch = useDispatch();
  useUpdateToken();
  const { ordersresults, totalOrders, reloadFething, isSucess } = useSelector(ordersSelector);
  const { userData, isFetching, id_user, isSuccess, groupId, isError, errorMessage, isLogged_User, roleId, company } =
    useSelector(userSelector);

  const { socket, online } = useContext(SocketContext);
  const { severity, show, message, type } = useSelector(alertSelector);
  const [isThereNewProspects, setIsThereNewProspects] = useState(false);
  const [isThereNewOrder, setIsThereNewOrder] = useState(false);
  const [isThereOrderRejected, setIsThereOrderRejected] = useState(false);
  const [notificationData, setNotificationData] = useState({
    message: "",
    createdAt: "",
    id_notification: "",
  });
  const [orderData, setOrderData] = useState({});
  const [ordersNews, setOrdersNews] = useState([]);
  const [orderDataRejected, setOrderDataRejected] = useState({
    message: "",
  });
  const router = useRouter();
  const [isNewExitOrder, setisNewExitOrder] = useState(false);
  const { notifications } = useSelector(commonSelector);

  useEffect(() => {
    HandleLogin();
  }, []);

  useEffect(() => {
    if (!router.query.id) return;
    dispatch(fetchUserBytokenFromManager({ ejecutivo: router.query.id }));
    try {
      if (router.query.cve === "0111") {
        let queryProspectsExecutive = {
          isclient: false,
          isoportunity: false,
          ejecutiveId: router.query.id,
        };

        let paramsProspectsExecutive = {
          where: JSON.stringify(queryProspectsExecutive),
          count: 1,
          limit: 0,
        };

        dispatch(getCountProspectFromManager({ params: paramsProspectsExecutive }));

        let queryOportunitiesExecutive = {
          isoportunity: true,
          ejecutiveId: router.query.id,
          isclient: false,
        };

        let paramsOportunitiesExecutive = {
          where: JSON.stringify(queryOportunitiesExecutive),
          count: 1,
          limit: 0,
        };

        dispatch(getCountOportunitiesFromManager({ params: paramsOportunitiesExecutive }));

        let queryCustomersExecutive = {
          isclient: true,
          ejecutiveId: router.query.id,
        };

        let paramsCustomersExecutive = {
          where: JSON.stringify(queryCustomersExecutive),
          count: 1,
          limit: 0,
        };

        dispatch(getCountCustomersFromManager({ params: paramsCustomersExecutive }));
        dispatch(getCountClientesFromManager({ params: paramsCustomersExecutive }));

        let queryPaymentsExecutive = {
          ispaid: false,
          oportunity: {
            prospect: {
              ejecutiveId: router.query.id,
            },
          },
        };
        let paramsPaymentsExecutive = {
          where: JSON.stringify(queryPaymentsExecutive),
          count: 1,
          limit: 0,
          include: "oportunity,oportunity.prospect",
          join: "oportunity,oportunity.prospect",
          showejecutive: 1,
        };
        dispatch(getPaymentsFromManager({ params: paramsPaymentsExecutive }));
      }
    } catch (error) {
      console.log(error);
    }
  }, [router.query.id]);
  useEffect(() => {
    socket?.on("recivenotify_intelligence", data => {
      console.log(data);
      setIsThereNewProspects(true);
      setNotificationData(data);
      soundPlay(audioClip.sound);
      getNotificiations();
    });

    socket?.on("reciveordernotify", data => {
      let orderNewTwo = [];
      orderNewTwo.push(data);
      setOrdersNews([...ordersNews, data]);
      setIsThereNewOrder(true);
      dispatch(refetchOrdersNotification());
      soundPlay(audioClip.sound);
    });

    socket?.on("recivenotify_orderstatus", data => {
      setIsThereOrderRejected(true);
      setOrderDataRejected(data);
      soundPlay(audioClip.sound);
    });

    socket?.on("reciveorderexitaproved", data => {
      console.log(data);
      setisNewExitOrder(true);
    });

    return () => {
      socket?.off("connect");
      socket?.off("disconnect");
      socket?.off("recivenotify_intelligence");
      socket?.off("reciveordernotify");
    };
  }, [socket, ordersNews]);

  // useEffect(() => {
  //   if (!id_user) return;
  //   dispatch(
  //     fetchNotificationsUnRead({
  //       params: {
  //         where: {
  //           ejecutiveId: id_user,
  //         },
  //         limit: 10,
  //       },
  //     })
  //   );

  //   getNotificationsAll();
  // }, [id_user]);

  const orderDataFunctions = item => {
    let orders = [...ordersNews];
    if (item?.order) {
      if (orders.length <= 0) {
        setOrdersNews([item?.order]);
        console.log("echo if");
      } else {
        orders.push(item?.order);
        setOrdersNews(orders);
        console.log("echo else");
      }
    }
  };

  const getNotificiations = () => {
    let query = {
      toId: id_user,
      viewed: false,
    };
    let params = {
      count: 1,
      order: "-createdAt",
      include: "from",
      where: JSON.stringify(query),
    };
    dispatch(getNotificationsByQuery({ params }));
  };

  const getNotificationsAll = () => {
    let params = {
      count: 1,
      order: "-createdAt",
      where: {
        toId: id_user,
      },
    };
    dispatch(fetchNotifications({ params }));
  };

  useEffect(() => {
    if (isLogged_User === false && isFetching === true) {
      return;
    }
    if (isLogged_User === false && isFetching === false && router.pathname !== "/") {
      router.push("/login");
    }
    if (isLogged_User === true && isFetching === false) {
      //console.log("succes loading");
      //fillCatalogos(roleId);
    }
  }, [isFetching, isLogged_User, router.pathname]);

  useEffect(() => {
    if (isLogged_User === true && isFetching === false) {
      fillCatalogos(roleId);
    }
  }, [isFetching, isLogged_User]);

  useEffect(() => {
    try {
      getValueMenus();
    } catch (error) {
      console.log(error);
    }
  }, []);
  const HandleLogin = () => {
    dispatch(fetchUserBytoken({}));
  };

  const fillCatalogos = role => {
    let paramsProductss = {
      count: 1,
      limit: 15,
      include: "brand",
      join: "bra",
      where: {
        isactive: true,
      },
    };
    switch (role) {
      case "director":
      case "Admin_compania":
        let drDate = localStorage.getItem("DRDate");
        if (drDate) {
          let drDateObject = JSON.parse(drDate);
          dispatch(setStartDateGlobal({ startDate: drDateObject.start }));
          dispatch(setFinishDateGlobal({ finishDate: drDateObject.finish }));

          dispatch(
            setTypeCalendarGlobal({
              typeCalendar: drDateObject.typeCalendar,
            })
          );
        } else {
          dispatch(setStartDateGlobal({ startDate: dayjs().startOf("month").format() }));
          dispatch(setFinishDateGlobal({ finishDate: dayjs().endOf("month").format() }));
        }

        dispatch(
          getCountGroups({
            params: {
              count: 1,
              limit: 0,
            },
          })
        );

        dispatch(
          getTotalSales({
            params: {
              where: {
                iscloseout: true,
              },
              count: 1,
              limit: 0,
            },
          })
        );

        dispatch(
          getPayments({
            params: {
              count: 1,
              limit: 0,
            },
          })
        );

        dispatch(
          getCountEjecutives({
            params: {
              count: 1,
              limit: 0,
            },
          })
        );

        dispatch(
          getCountFormats({
            params: {
              count: 1,
              limit: 0,
            },
          })
        );

        dispatch(
          getActivitiesCommon({
            count: 1,
            limit: 0,
          })
        );

        dispatch(
          getGroupsCommon({
            params: {
              count: 1,
              all: 1,
              order: "name",
            },
          })
        );

        dispatch(
          getConcepts({
            params: {
              count: 1,
              all: 1,
              keys: "id,concept",
            },
          })
        );

        dispatch(getCompanyById({ company: userData.companyId }));
        let query = {
          groupId: groupId,
          roleId: "62d94hH7xnfeqrfYLLDSKAtR",
        };
        dispatch(fillExecutives({ groupId, query }));

        let queryProspectsDirector = {
          isclient: false,
          isoportunity: false,
        };

        let paramsProspectsDirector = {
          where: JSON.stringify(queryProspectsDirector),
          count: 1,
          limit: 0,
        };

        dispatch(getCountProspect({ params: paramsProspectsDirector }));

        let queryOportunitiesDirector = {
          isoportunity: true,
          isclient: false,
        };

        let paramsOportunitiesDirector = {
          where: JSON.stringify(queryOportunitiesDirector),
          count: 1,
          limit: 0,
        };

        dispatch(getCountOportunities({ params: paramsOportunitiesDirector }));

        dispatch(
          getCountClientes({
            params: {
              count: 1,
              limit: 0,
              where: {
                isclient: true,
              },
            },
          })
        );

        commonRequest();

        break;
      case "inteligencia_comercial":
        dispatch(getCompanyById({ company: userData.companyId }));
        let queryIntelligence = {
          groupId: groupId,
          roleId: "62d94hH7xnfeqrfYLLDSKAtR",
        };
        dispatch(fillExecutives({ groupId, query: queryIntelligence }));
        let paramsProspectsQuery = {
          // discarted: false,
          // isclient: false,
          // isoportunity: false,
        };

        let paramsProspectsIntelligence = {
          where: JSON.stringify(paramsProspectsQuery),
          count: 1,
          limit: 0,
        };
        dispatch(getCountProspect({ params: paramsProspectsIntelligence }));
        let params = {
          limit: 100,
          count: "1",
          order: "name",
        };

        dispatch(getGroupsCommon({ params }));
        commonRequest();
        break;
      case "logistica":
        dispatch(getCompanyById({ company: userData.companyId }));
        let queryLogistic = {
          groupId: groupId,
          roleId: "62d94hH7xnfeqrfYLLDSKAtR",
        };
        let paramLogic = {
          count: 1,
          all: 1,
          order: "name",
        };
        dispatch(fillExecutives({ groupId, query: queryLogistic }));
        dispatch(getCountProspect({ id: id_user }));
        commonRequest();
        dispatch(getOrders({ id: id_user }));
        //Filtros Logistica
        dispatch(
          getGroupsCommon({
            params: paramLogic,
          })
        );
        dispatch(getUsersCommon({ params: paramLogic }));
        dispatch(getCfdisCommon({ params: paramLogic }));
        dispatch(getpaymentways({ params: paramLogic }));
        dispatch(getpaymentmethods({ params: paramLogic }));
        dispatch(gettaxregimens({ params: paramLogic }));
        dispatch(getpaymentAccount({ params: paramLogic }));
        break;
      case "gerente":
        let paramsDefaultManager = {
          count: 1,
          all: 1,
          order: "name",
        };
        // dispatch(getCompanyById({ company: userData.companyId }));
        let queryManager = {
          groupId: groupId,
          roleId: "62d94hH7xnfeqrfYLLDSKAtR",
        };
        // dispatch(fillExecutives({ groupId, query: queryManager }));

        let queryProspects = {
          isclient: false,
          isoportunity: false,
        };

        let paramsProspects = {
          where: JSON.stringify(queryProspects),
          count: 1,
          limit: 0,
        };

        dispatch(getCountProspect({ params: paramsProspects }));

        let queryOportunities = {
          isoportunity: true,
          isclient: false,
        };

        let paramsOportunities = {
          where: JSON.stringify(queryOportunities),
          count: 1,
          limit: 0,
        };

        dispatch(getCountOportunities({ params: paramsOportunities }));
        let queryCustomers = {
          isclient: true,

          // oportunity: {
          //   prospect: {
          //     ejecutiveId: payload.id,
          //   },
          // },
        };

        dispatch(
          getTotalSales({
            params: {
              where: {
                iscloseout: true,
              },
              count: 1,
              limit: 0,
            },
          })
        );
        let paramsCustomers = {
          where: JSON.stringify(queryCustomers),
          count: 1,
          limit: 0,
        };
        dispatch(getCountCustomers({ params: paramsCustomers }));
        dispatch(getCountClientes({ params: paramsCustomers }));
        let queryPayments = {
          ispaid: false,
          oportunity: {
            prospect: {
              ejecutive: {
                groupId: groupId,
              },
            },
          },
        };
        let paramsPayments = {
          where: JSON.stringify(queryPayments),
          count: 1,
          limit: 0,
          include: "oportunity,oportunity.prospect",
          join: "oportunity,oportunity.prospect",
          showejecutive: 1,
        };

        // dispatch(gettaxregimens({ params: paramsDefaultManager }));
        // dispatch(getpaymentways({ params: paramsDefaultManager }));
        // dispatch(getpaymentmethods({ params: paramsDefaultManager }));
        // dispatch(getpaymentAccount({ params: paramsDefaultManager }));
        // dispatch(getCfdisCommon({ params: paramsDefaultManager }));

        dispatch(getPayments({ params: paramsPayments }));
        dispatch(getProductsCommon({ params: paramsProductss }));

        // commonRequest();
        break;
      case "ejecutivo":
        let paramsDefaultExecutive = {
          count: 1,
          all: 1,
          order: "name",
        };

        // dispatch(getCompanyById({ company: userData?.companyId }));

        let queryProspectsExecutive = {
          isclient: false,
          isoportunity: false,
          ejecutiveId: id_user,
        };

        let paramsProspectsExecutive = {
          where: JSON.stringify(queryProspectsExecutive),
          count: 1,
          limit: 0,
        };

        dispatch(getCountProspect({ params: paramsProspectsExecutive }));

        let queryOportunitiesExecutive = {
          isoportunity: true,
          ejecutiveId: id_user,
          isclient: false,
        };

        dispatch(
          getTotalSales({
            params: {
              where: {
                iscloseout: true,
              },
              count: 1,
              limit: 0,
            },
          })
        );
        let paramsOportunitiesExecutive = {
          where: JSON.stringify(queryOportunitiesExecutive),
          count: 1,
          limit: 0,
        };

        dispatch(getCountOportunities({ params: paramsOportunitiesExecutive }));

        let queryCustomersExecutive = {
          isclient: true,
          ejecutiveId: id_user,
        };

        let paramsCustomersExecutive = {
          where: JSON.stringify(queryCustomersExecutive),
          count: 1,
          limit: 0,
        };

        dispatch(getCountCustomers({ params: paramsCustomersExecutive }));
        dispatch(getCountClientes({ params: paramsCustomersExecutive }));

        let queryPaymentsExecutive = {
          ispaid: false,
          oportunity: {
            prospect: {
              ejecutiveId: id_user,
            },
          },
        };
        let paramsPaymentsExecutive = {
          where: JSON.stringify(queryPaymentsExecutive),
          count: 1,
          limit: 0,
          include: "oportunity,oportunity.prospect",
          join: "oportunity,oportunity.prospect",
          showejecutive: 1,
        };
        // dispatch(gettaxregimens({ params: paramsDefaultExecutive }));
        // dispatch(getpaymentways({ params: paramsDefaultExecutive }));
        // dispatch(getpaymentmethods({ params: paramsDefaultExecutive }));
        // dispatch(getpaymentAccount({ params: paramsDefaultExecutive }));
        // dispatch(getCfdisCommon({ params: paramsDefaultExecutive }));

        dispatch(getPayments({ params: paramsPaymentsExecutive }));

        dispatch(getOrders({ id: id_user }));
        // commonRequest();

        dispatch(getProductsCommon({ params: paramsProductss }));
        // getNotificiations();
        dispatch(
          getTotalSales({
            params: {
              where: {
                iscloseout: true,
              },
              count: 1,
              limit: 0,
            },
          })
        );
        break;
      case "compras":
        let paramsShopping = {
          count: 1,
          all: 1,
          order: "name",
        };
        let paramsProducts = {
          count: 1,
          limit: 15,
          include: "brand,provider",
          join: "bra,pro",
          where: {
            isactive: true,
          },
        };
        dispatch(
          getGroupsCommon({
            params: paramsShopping,
          })
        );

        dispatch(getUsersCommon({ params: paramsShopping }));
        dispatch(getCfdisCommon({ params: paramsShopping }));
        dispatch(getpaymentways({ params: paramsShopping }));
        dispatch(getpaymentmethods({ params: paramsShopping }));
        dispatch(gettaxregimens({ params: paramsShopping }));
        dispatch(getpaymentAccount({ params: paramsShopping }));
        dispatch(getCountCategories());
        dispatch(getCountProviders());
        dispatch(getProductsCommon({ params: paramsProducts }));
        dispatch(getCountOrdersAllStatus());
        dispatch(
          getfileTypes({
            params: {
              count: 1,
              all: 1,
              order: "name",
            },
          })
        );
        break;
      case "administracion":
        // let paramAdmin = {
        //   count: 1,
        //   all: 1,
        //   order: "name",
        // };
        // dispatch(
        //   getGroupsCommon({
        //     params: paramAdmin,
        //   })
        // );
        // dispatch(getUsersCommon({ params: paramAdmin }));
        // dispatch(getCfdisCommon({ params: paramAdmin }));
        // dispatch(getpaymentways({ params: paramAdmin }));
        // dispatch(getpaymentmethods({ params: paramAdmin }));
        // dispatch(gettaxregimens({ params: paramAdmin }));
        // dispatch(getpaymentAccount({ params: paramAdmin }));

        // dispatch(
        //   getfileTypes({
        //     params: {
        //       count: 1,
        //       all: 1,
        //       order: "name",
        //     },
        //   })
        // );
        break;
      case "administrador_de_ventas":
        // let paramsChannelsAdmin = {
        //   all: 1,
        //   order: "name",
        // };
        // let queryProspectsSales = {
        //   isclient: false,
        //   isoportunity: false,
        // };

        // let paramsProspectsSales = {
        //   where: JSON.stringify(queryProspectsSales),
        //   count: 1,
        //   limit: 0,
        // };

        // dispatch(getCountProspect({ params: paramsProspectsSales }));

        // let queryOportunitiesSales = {
        //   isoportunity: true,
        //   isclient: false,
        // };

        // let paramsOportunitiesSales = {
        //   where: JSON.stringify(queryOportunitiesSales),
        //   count: 1,
        //   limit: 0,
        // };

        // dispatch(getCountOportunities({ params: paramsOportunitiesSales }));
        // let queryCustomersSales = {
        //   isclient: true,
        // };
        // let paramsCustomersSales = {
        //   where: JSON.stringify(queryCustomersSales),
        //   count: 1,
        //   limit: 0,
        // };

        // dispatch(getCountClientes({ params: paramsCustomersSales }));
        // dispatch(getCountActivities());
        // dispatch(getChannelsCommon({ params: paramsChannelsAdmin }));

        break;

      default:
        break;
    }
  };

  const getValueMenus = () => {
    let openmenulocal = localStorage.getItem("openMenuSide");

    if (openmenulocal) {
      dispatch(handleToggleMenu(true));
    } else {
      dispatch(handleToggleMenu(true));
    }
  };

  let commonRequest = () => {
    let params = {
      all: 1,
      order: "name",
    };
    let paramsCities = {
      all: 1,
    };

    let paramsLabel = {
      all: 1,
      order: "label",
    };

    let paramsEmpty = {};
    dispatch(getpaymentperiods({ params }));
    dispatch(getPhasesCommon({ params }));
    dispatch(getClientTypesCommon({ params }));
    dispatch(getOriginsCommon({ params }));
    dispatch(getSpecialtiesCommon({ params }));
    dispatch(getChannelsCommon({ params }));
    dispatch(getCategoriesCommon({ params }));
    dispatch(getUsersCommon({ params }));
    dispatch(getProductsTypes({ params }));
    dispatch(getBrands({ params }));
    dispatch(getLabelsProspect({ paramsLabel }));
    dispatch(getClientsCompany({ paramsEmpty }));
    dispatch(getEntities({ params }));
    dispatch(getCities({ paramsCities }));
    let paramsProducts = {
      include: "category,provider,brand,productstype",
      join: "category,pro,bra,prodTy",
      where: `{"isactive": true}`,
      all: 1,
      order: "-createdAt",
      count: 1,
    };
    // dispatch(getProductsCommon({ params: paramsProducts }));

    dispatch(
      getfileTypes({
        params: {
          count: 1,
          all: 1,
          order: "name",
        },
      })
    );
    let paramsReasons = {
      all: 1,
      order: "reason",
    };
    dispatch(
      getGoalNames({
        params: {
          count: 1,
          all: 1,
          order: "name",
        },
      })
    );
    dispatch(
      getGoalTypes({
        params: {
          count: 1,
          all: 1,
          order: "name",
        },
      })
    );
    dispatch(getDiscardReasons({ params: paramsReasons }));
  };

  if (isLogged_User === false && isFetching === true) {
    return (
      <Loader>
        <p>Cargando</p>
      </Loader>
    );
  }

  const updateNotificiation = async () => {
    try {
      let response = await api.put(`notifications/${notificationData.id_notification}`, {
        viewed: true,
      });
      if (response.status === 200) {
        let queryNotify = {
          toId: id_user,
          viewed: false,
        };

        let params = {
          count: 1,
          order: "-createdAt",
          include: "from",
          where: JSON.stringify(queryNotify),
        };
        dispatch(getNotificationsByQuery({ params }));
        setIsThereNewProspects(false);
        router.push("/prospectos");
      }
    } catch (error) {
      console.log(error);
    }
  };
  const audioClip = {
    sound: "https://notificationsounds.com/storage/sounds/file-sounds-1325-smile.ogg",
    label: "notification",
  };
  const soundPlay = src => {
    const sound = new Howl({
      src: src,
      html5: true,
    });
    sound.play();
  };

  return (
    <>
      {/* {roleId} */}
      {children}
      {roleId === "gerente" && <UsersOnline />}
      <AlertPendings />
      {show && <AlertGlobal severity={severity} message={message} show={show} type={type} />}
      {isThereNewProspects && (
        <ContainerNotification>
          <motion.div
            className={true ? "alert" : "alert_dark"}
            initial={{ opacity: false ? 1 : 0, scale: 0.5, right: false ? 0 : -200 }}
            animate={{ opacity: false ? 0 : 1, scale: 1, right: false ? -200 : 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1>Nuevos prospectos</h1>
            <p>{notificationData.message}</p>
            <p>{dayjs(notificationData.createdAt).format("D,MMMM , YYYY h:mm A")}</p>
            <Button
              onClick={() => {
                updateNotificiation();
              }}
              style={{
                marginTop: 10,
                background: "#ffff",
              }}
            >
              Ver prospectos
            </Button>
            <Button
              onClick={() => {
                setNotificationData({
                  message: "",
                  createdAt: "",
                  id_notification: "",
                });
                setIsThereNewProspects(false);
              }}
            >
              Cerrar
            </Button>
          </motion.div>
        </ContainerNotification>
      )}
      <NotificationOrder
        isThereNewOrder={isThereNewOrder}
        setIsThereNewOrder={setIsThereNewOrder}
        orderData={ordersNews}
      />
      {isThereOrderRejected && (
        <NotificationOrderRejected setIsThereNewOrder={setIsThereOrderRejected} orderData={orderDataRejected} />
      )}

      {/* <AlertLogistic /> */}
      {/* {isNewExitOrder && <AlertLogistic close={() => setisNewExitOrder(false)} />} */}

      {/* <LimenkaChanges /> */}

      <SocketComponent />
      {/* {roleId === "ejecutivo" && notifications?.show && <SocketComponentEjecutive />} */}
      <NotificationsCenter />
      <NotificationCenterPopup />
      <NotificacionsLimenka />
    </>
  );
}

function SocketComponent() {
  const { socket, online } = useContext(SocketContext);
  const dispatch = useDispatch();

  const { showPopup } = useSelector(globalNotificationsSelector);

  useEffect(() => {
    socket?.on("newnotificationrecived", data => {
      const { notification, type } = data;
      //   {
      //     "message":"Nueva orden aprovada",
      //     "link":"",
      //     "type":"aprovedorder",
      //     "to":"almacen"
      // }
      dispatch(
        showGlobalNotification({
          type: type,
          body: notification.body,
          show: true,
          title: "",
          message: notification.message,
          createdAt: notification.createdAt,
        })
      );
    });
  }, [socket]);

  return (
    <div>
      {/* <button
        onClick={() => {
          console.log(showPopup);
        }}
      >
        click me
      </button>

      <button
        onClick={() => {
          dispatch(
            showGlobalNotification({
              show: false,
              data: {
                title: "",
                message: "",
                type: "",
                show: false,
              },
            })
          );
        }}
      >
        hide
      </button> */}
      {showPopup && <AlertLogistic />}
    </div>
  );
}

function SocketComponentEjecutive() {
  return (
    <div>
      <AlertEjecutive />
    </div>
  );
}

const appearFromTop = keyframes`
  from {
    transform: translateY(-100%);
  }
  to {
    transform: translateY(0);
  }
`;

const TutorialStyled = styled.div`
  position: absolute;
  top: 40px;
  right: 40px;
  width: 500px;
  height: 90%;
  animation: ${appearFromTop} 0.5s ease-in-out; /* Agregar animación */

  /* background: rgba(64, 122, 255, 0.6); */
  /* background: rgba(0, 0, 0, 0.7); */
  background: rgba(38, 134, 118, 0.8);
  /* background: rgba(149, 75, 148, 0.8); */
  z-index: 9999;
  border-radius: 8px;
  padding: 10px;

  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px;
    .closebutton {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 30px;
      height: 30px;
      border-radius: 50%;
      cursor: pointer;
      .MuiSvgIcon-root {
        color: #fff;
      }
    }
  }

  h1 {
    color: #fff;
    font-size: 20px;
    margin-bottom: 10px;
  }

  .bodytutorial {
    height: 85%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    overflow: auto;

    scrollbar-width: thin; /* Firefox */
    scrollbar-color: darkgray lightgray; /* Firefox */

    &::-webkit-scrollbar {
      width: 12px; /* Chrome/Safari/Webkit */
    }

    &::-webkit-scrollbar-thumb {
      background-color: darkgray; /* Color de la barra de desplazamiento */
      border-radius: 10px;
      border: 3px solid lightgray; /* Borde alrededor de la barra de desplazamiento */
    }

    &::-webkit-scrollbar-track {
      background-color: lightgray; /* Color de fondo de la barra de desplazamiento */
      border-radius: 10px;
    }

    .cardtutorial {
      padding: 10px;
      background: #fff;
      border-radius: 8px;
      margin-bottom: 10px;
      h1 {
        color: #000;
        font-size: 18px;
        margin-bottom: 10px;
      }
      p {
        color: #000;
        font-size: 16px;
      }

      .video {
        display: flex;
        justify-content: center;
        width: 100%;
        height: 250px;

        video {
          height: 200px;
          margin-top: 10px;
        }
      }
    }
  }

  .actions {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    padding: 10px;
    button {
      background: rgba(64, 122, 255, 1);
      color: #fff;
      margin-left: 10px;
    }
  }
`;

const Loader = styled.div`
  height: 100vh;
  width: 100%;
  background: #373b44; /* fallback for old browsers */
  background: -webkit-linear-gradient(to right, #4286f4, #373b44); /* Chrome 10-25, Safari 5.1-6 */
  background: linear-gradient(
    to right,
    #4286f4,
    #373b44
  ); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
`;

const ContainerNotification = styled.div`
  position: absolute;
  top: 90px;
  right: 20px;
  border-radius: 8px;
  box-shadow: rgba(0, 0, 0, 0.25) -14px 14px 28px, rgba(0, 0, 0, 0.22) -10px 10px 10px;
  h1 {
    color: #fff;
    font-size: 18px;
    margin-bottom: 1 0px;
  }
  p {
    color: #fff;
  }
  .alert {
    border-radius: 8px;
    padding: 10px 20px;
    .bar {
      height: 5px;
      background-color: #f44336;
    }
    position: absolute;
    bottom: 0;
    background-color: rgba(64, 123, 254, 1);
    position: relative;
    &__close {
      position: absolute;
      top: 10px;
      right: 10px;
      width: 20px;
      display: flex;
      align-items: center;
      justify-content: flex-end;
      cursor: pointer;
      .icon_close {
        background-color: #f44336;
        width: 30px;
        height: 20px;
        height: 24px;
        border-radius: 4px;
      }
      svg {
        color: #fff;
      }
    }

    p {
      color: #fff;
    }
  }
`;
