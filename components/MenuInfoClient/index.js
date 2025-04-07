import React, { useEffect, useState } from "react";
import { IconButton, Tab, Tabs, Tooltip } from "@material-ui/core";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { AttachMoney, FileCopy, NavigateBefore, NavigateNext, PostAdd, Refresh, Star } from "@material-ui/icons";
import { api } from "../../services/api";
import TimeLinePrewiew from "../UI/molecules/TimeLinePrewiew";
import { handleGlobalAlert } from "../../utils";
import { DetailsContainer, TabContent, tabStyle } from "./styles";
import FilesClients from "../FilesClients";
import CustomerOportunity from "../UI/templates/CustomerOpportunities";
import CustomerSales from "../UI/templates/CustomerSales";
import CustomerOrders from "../UI/templates/CustomerOrders";
import CustomerPayments from "../UI/templates/CustomerPayments";
import { userSelector } from "../../redux/slices/userSlice";
import PendingsEjecutive from "../PendingsEjecutive";

export default function MenuInfoClients({
  clienteSeleccionado,
  tabValue,
  handleTabChange,
  globalPagination,
  setGlobalPagination,
  handleAddTraking,
  handleClickClient,
  handleAddPending,
  handlePendingsComplete,
  refetchActions,
  RefreshPending,
  handleAddQuote,
}) {
  const router = useRouter();
  const { id_user } = useSelector(userSelector);
  const dispatch = useDispatch();
  const prospectId = clienteSeleccionado?.id;
  const [oportunities, setOportunities] = useState([]);
  const [sales, setSales] = useState([]);
  const [orders, setOrders] = useState([]);
  const [trackings, setTrackings] = useState([]);
  const [pendings, setPendings] = useState([]);
  const [files, setFiles] = useState([]);
  const [payments, setPayments] = useState([]);
  const [isFetching, setIsFetching] = useState({
    oportunities: false,
    sales: false,
    payments: false,
    orders: false,
    files: false,
    trackings: false,
    pendings: false,
  });
  const [tabCounts, setTabCounts] = useState({
    oportunities: 0,
    sales: 0,
    payments: 0,
    orders: 0,
    files: 0,
    trackings: 0,
    pendings: 0,
  });

  const [orderBy, setOrderBy] = useState("-createdAt");

  useEffect(() => {
    if (clienteSeleccionado?.id) {
      fetchData(tabValue, globalPagination.page, globalPagination.limit, refetchActions);
    }
  }, [clienteSeleccionado?.id, tabValue, globalPagination.page, globalPagination.limit, refetchActions]);

  const fetchData = async (tabIndex, page, limit) => {
    setIsFetching({
      oportunities: true,
      sales: true,
      payments: true,
      orders: true,
      files: true,
      trackings: true,
      pendings: true,
    });
    let tabLabelError;

    switch (tabIndex) {
      case 0:
        tabLabelError = "Oportunidades";
        break;
      case 1:
        tabLabelError = "Ventas";
        break;
      case 2:
        tabLabelError = "Pagos";
        break;
      case 3:
        tabLabelError = "Órdenes";
        break;

      case 4:
        tabLabelError = "Archivos";
        break;
      case 5:
        tabLabelError = "Seguimientos";
        break;
      case 6:
        tabLabelError = "Pendientes";
        break;
      default:
        break;
    }
    try {
      switch (tabIndex) {
        case 0:
          const oportunitiesRes = await api.get(`oportunities`, {
            params: {
              where: { iscloseout: false, prospect: { isoportunity: true }, prospectId: prospectId, discarted: false },
              order: "-createdAt",
              include: "prospect,phase",
              skip: page,
              limit: limit,
              count: 1,
              showproducts: 1,
            },
          });
          setOportunities(oportunitiesRes?.data);
          setTabCounts(prevCounts => ({ ...prevCounts, oportunities: oportunitiesRes?.data?.count }));
          break;

        case 1:
          const salesRes = await api.get(`oportunities`, {
            params: {
              where: { iscloseout: true, prospect: { isoportunity: true }, prospectId: prospectId },
              order: "-createdAt",
              include: "prospect",
              count: 1,
              skip: page,
              limit: limit,
              showproducts: 1,
            },
          });

          setTabCounts(prevCounts => ({ ...prevCounts, sales: salesRes?.data?.count }));
          setSales(salesRes?.data);
          break;

        case 2:
          const paymentsRes = await api.get(`salespayments`, {
            params: {
              count: 1,
              order: "-createdAt",
              include: "oportunity",
              skip: page,
              limit: limit,
              where: {
                oportunity: { prospectId: prospectId },
              },
            },
          });
          setTabCounts(prevCounts => ({ ...prevCounts, payments: paymentsRes?.data?.count }));
          setPayments(paymentsRes?.data);
          break;
        case 3:
          const ordersRes = await api.get(`orders`, {
            params: {
              where: { oportunity: { prospectId: prospectId } },
              include:
                "oportunity,oportunity.prospect,paymentaccount,bill,orderstatus,address,address.city,address.entity",
              join: "oportunity,oportunity.prospect,paymentaccount,b,orderstatus,address,address.city,address.entity",
              order: "-createdAt",
              count: 1,
              skip: page,
              limit: limit,
            },
          });
          setTabCounts(prevCounts => ({ ...prevCounts, orders: ordersRes?.data?.count }));
          setOrders(ordersRes?.data);
          break;
        case 4:
          const filesRes = await api.get(`documents`, {
            params: {
              count: 1,
              order: "-createdAt",
              include: "filestype",
              skip: page,
              limit: limit,
              where: {
                prospectId: prospectId,
              },
            },
          });

          setTabCounts(prevCounts => ({ ...prevCounts, files: filesRes?.data?.count }));
          setFiles(filesRes?.data);
          normalizeFiles(filesRes.data.results, filesRes.data.count);
          break;

        case 5:
          const trackingsRes = await api.get(`trackings`, {
            params: {
              where: { prospectId: prospectId },
              order: "-createdAt",
              include: "phase",
              skip: page,
              limit: limit,
              count: 1,
            },
          });

          setTabCounts(prevCounts => ({ ...prevCounts, trackings: trackingsRes?.data?.count }));
          setTrackings(trackingsRes?.data?.results);
          break;

        case 6:
          const pendingsRes = await api.get(`pendings`, {
            params: {
              where: {
                prospectId: prospectId,
                isdone: false,
                createdbyId: id_user,
              },
              order: "-createdAt",
              include: "pendingstype,prospect,prospect.phase",
              count: 1,
              skip: page,
              limit: limit,
            },
          });
          setTabCounts(prevCounts => ({ ...prevCounts, pendings: pendingsRes?.data?.count }));
          setPendings({ pendings: pendingsRes?.data?.results, count: pendingsRes?.data?.count });
          break;

        default:
          break;
      }

      setIsFetching({
        oportunities: false,
        sales: false,
        payments: false,
        orders: false,
        files: false,
        trackings: false,
        pendings: false,
      });
    } catch (error) {
      setIsFetching({
        oportunities: false,
        sales: false,
        payments: false,
        orders: false,
        files: false,
        trackings: false,
        pendings: false,
      });
      handleGlobalAlert("error", `${tabLabelError} - Ocurrio un problema `, "basic", dispatch, 6000);
    }
  };
  const normalizeFiles = (files, count) => {
    let newFiles = files.map(item => {
      let file = {
        id: item.id,
        name: item.name,
        fileType: item.filestype.name,
        url: item.url,
        documentType: verifyFileType(item.url),
      };
      return file;
    });
    setFiles({ files: newFiles, count: count });
  };

  const verifyFileType = dataFile => {
    let fileType = dataFile.split(".").pop();
    return fileType;
  };

  const handleRedirectClient = () => {
    router.push({ pathname: "clientes/[prospecto]", query: { prospecto: prospectId } });
  };

  const handleRedirectOportunities = () => {
    window.open(`/oportunidades`, "_blank");
  };
  const handleRedirectSales = () => {
    window.open(`/ventas`, "_blank");
  };
  const handleRedirectOrders = () => {
    window.open(`/pedidos`, "_blank");
  };
  const handleRedirectPayments = () => {
    window.open(`/pagos`, "_blank");
  };
  const renderTitles = () => {
    switch (tabValue) {
      case 0:
        return (
          <div className="title">
            <Tooltip title="Ver Todas las Cotizaciones">
              <Star onClick={handleRedirectOportunities} className="redirec icon" />
            </Tooltip>
            <Tooltip title="Cotizar Nuevamente">
              <PostAdd onClick={handleAddQuote} className="redirec icon" />
            </Tooltip>
            <p className="text" onClick={handleRedirectOportunities}>
              {currentTabCount} Cotizaciones
            </p>
            <Tooltip title="Actualizar">
              <Refresh className="iconRefresh" onClick={() => reloadData()} />
            </Tooltip>
          </div>
        );
      case 1:
        return (
          <div className="title">
            <Tooltip title="Ver Todas las Ventas">
              <AttachMoney onClick={handleRedirectSales} className="redirec icon" />
            </Tooltip>
            <p className="text" onClick={handleRedirectSales}>
              {currentTabCount} Ventas
            </p>
            <Tooltip title="Actualizar">
              <Refresh className="iconRefresh" onClick={() => reloadData()} />
            </Tooltip>
          </div>
        );
      case 2:
        return (
          <div className="title">
            <Tooltip title="Ver Todos Los Pagos">
              <AttachMoney onClick={handleRedirectPayments} className="redirec icon" />
            </Tooltip>
            <p className="text" onClick={handleRedirectPayments}>
              {currentTabCount} Pagos
            </p>
            <Tooltip title="Actualizar">
              <Refresh className="iconRefresh" onClick={() => reloadData()} />
            </Tooltip>
          </div>
        );
      case 3:
        return (
          <div className="title">
            <Tooltip title="Ver Todos los pedidos">
              <AttachMoney onClick={handleRedirectOrders} className="redirec icon" />
            </Tooltip>
            <p className="text" onClick={handleRedirectOrders}>
              {currentTabCount} Pedidos
            </p>
            <Tooltip title="Actualizar">
              <Refresh className="iconRefresh" onClick={() => reloadData()} />
            </Tooltip>
          </div>
        );

      case 4:
        return (
          <div className="title">
            <Tooltip title="Ver Cliente">
              <FileCopy onClick={handleRedirectClient} className="redirec icon" />
            </Tooltip>
            <p className="text" onClick={handleRedirectClient}>
              {currentTabCount} Archivos
            </p>
            <Tooltip title="Actualizar">
              <Refresh className="iconRefresh" onClick={() => reloadData()} />
            </Tooltip>
          </div>
        );

      case 5:
        return (
          <div className="title">
            <Tooltip title="Agregar seguimiento">
              <PostAdd onClick={handleAddTraking} className="redirec icon" />
            </Tooltip>
            <Tooltip title="Ver Seguimientos">
              <p className="text" onClick={() => handleClickClient("seguimientos")}>
                {currentTabCount} Seguimientos
              </p>
            </Tooltip>
            <Tooltip title="Actualizar">
              <Refresh className="iconRefresh" onClick={() => reloadData()} />
            </Tooltip>
          </div>
        );
      case 6:
        return (
          <div className="title">
            <Tooltip title="Agregar Pendiente">
              <PostAdd onClick={handleAddPending} className="redirec icon" />
            </Tooltip>
            <p className="text">{currentTabCount} Pendientes</p>
            <Tooltip title="Actualizar">
              <Refresh className="iconRefresh" onClick={() => reloadData()} />
            </Tooltip>
          </div>
        );
      default:
        break;
    }
  };
  const renderContent = () => {
    switch (tabValue) {
      case 0:
        return <CustomerOportunity isFetching={isFetching} oportunities={oportunities} />;
      case 1:
        return <CustomerSales isFetching={isFetching} sales={sales} />;
      case 2:
        return <CustomerPayments isFetching={isFetching} payments={payments} reloadData={reloadData} />;
      case 3:
        return <CustomerOrders isFetching={isFetching} orders={orders} />;
      case 4:
        return (
          <FilesClients data={clienteSeleccionado} files={files} isLoader={isFetching?.files} reloadData={reloadData} />
        );
      case 5:
        return <TimeLinePrewiew trackings={trackings} fetching={isFetching?.trackings} />;
      case 6:
        return (
          <PendingsEjecutive
            pendings={pendings}
            fetching={isFetching?.pendings}
            handlePendingsComplete={handlePendingsComplete}
          />
        );
      default:
        break;
    }
  };

  const tabCountMap = {
    0: "oportunities",
    1: "sales",
    2: "payments",
    3: "orders",
    4: "files",
    5: "trackings",
    6: "pendings",
  };
  const currentTabCountKey = tabCountMap[tabValue];
  const currentTabCount = tabCounts[currentTabCountKey];
  const totalPages = Math.ceil(currentTabCount / globalPagination.limit) || 1;
  const handlePage = newPage => {
    setGlobalPagination(prevPagination => ({ ...prevPagination, page: newPage }));
  };
  const reloadData = () => {
    fetchData(tabValue, globalPagination.page, globalPagination.limit, refetchActions);
  };

  return (
    <DetailsContainer>
      <Tabs
        value={tabValue}
        onChange={handleTabChange}
        indicatorColor="primary"
        textColor="primary"
        variant="scrollable"
        scrollButtons="auto"
      >
        <Tab label="Cotizaciones" style={tabStyle} />
        <Tab label="Ventas" style={tabStyle} />
        <Tab label="Pagos" style={tabStyle} />
        <Tab label="Pedidos" style={tabStyle} />
        <Tab label="Archivos" style={tabStyle} />
        <Tab label="Seguimientos" style={tabStyle} />
        <Tab label="Pendientes" style={tabStyle} />
      </Tabs>
      <div className="topHeads">
        {renderTitles()}
        <div className="pagination">
          <p className="totalPage">{`Página: ${globalPagination.page} - ${totalPages}`}</p>
          <IconButton
            color="primary"
            disabled={globalPagination.page <= 1}
            className="btn pagination__before"
            onClick={() => {
              handlePage(globalPagination.page - 1);
            }}
          >
            <NavigateBefore />
          </IconButton>

          <IconButton
            color="primary"
            disabled={globalPagination.page >= totalPages}
            className="btn pagination__next"
            onClick={() => {
              handlePage(globalPagination.page + 1);
            }}
          >
            <NavigateNext />
          </IconButton>
        </div>
      </div>
      <TabContent className="render_container">{renderContent()} </TabContent>
    </DetailsContainer>
  );
}
