import { Button, IconButton, LinearProgress, Tooltip } from "@material-ui/core";
import { Assignment, Close, Map, Phone, Visibility } from "@material-ui/icons";
import { Dot, LoaderWrapper, PreviewOrderStyled,CustomTabs,CustomTab } from "./styles";
import { formatDate } from "../../../../utils";
import LogisticsFilters from "../../../../components/LogisticsFilters";
import ShowFilters from "../ShowFilters/ShowFilters";
import DrawerViewProvider from "../DrawerViewProvider/DrawerViewProvider";
import { useRouter } from "next/router";
import ListDirections from "../../../ShoppingProviderNew/components/ListDirections";
import ViewDirectionsProviders from "../ViewDirectionsProviders";
import ViewContactsProviders from "../ViewContactsProviders";
import { useState } from "react";

export default function PreviewOrder({
  isFetchingOrder,
  orderSelectedData,
  handleOnClickClosePreview,
  tableDataOrders,
  filtersOption,
  toggleModalView,
  openView,
  dataAddress,
  isfetching,
  toggleModaEdit,
  setProviderEdit,
  dataContacts,
  setKeyWord,
  keyWord
}) {
  const [tabIndex, setTabIndex] = useState(0); 
  const { optionsFilterSelected, handleOnChangeFilter, handleDeleteFilter, filtersPurchaseOrders } = filtersOption;

  const router = useRouter();

  const handleTabChange = (event, newIndex) => {
    setTabIndex(newIndex); 
  };

  const getValidValue = (value, defaultValue = "N/A") => value?.toString().trim() || defaultValue;
  const handleChangeFolio = (folio) => setKeyWord(folio);
  const handleClickOrder = (item) => {
    router.push({ pathname: `./ordenes/${item.id}` });
  };

  const handleClicEdit = () => {
    toggleModaEdit();
    orderSelectedData.item = orderSelectedData;
    setProviderEdit(orderSelectedData);
  };

  if (isFetchingOrder) {
    return (
      <LoaderWrapper>
        <Dot />
        <Dot />
        <Dot />
      </LoaderWrapper>
    );
  }

  return (
    <PreviewOrderStyled>
      <div className="headerpreview">
        <p className="concept">{orderSelectedData?.companyname}</p>
        <div className="headerpreview__listactions">
          <IconButton onClick={toggleModalView}>
            <Tooltip title="Ver proveedor">
              <Visibility />
            </Tooltip>
          </IconButton>
          <Button className="btnEdit" onClick={() => handleClicEdit()}>
            Editar
          </Button>
          <IconButton onClick={handleOnClickClosePreview}>
            <Close />
          </IconButton>
        </div>
      </div>
      <CustomTabs value={tabIndex} onChange={handleTabChange} indicatorColor="primary" textColor="primary">
      <CustomTab label="Órdenes de Compra" />
       <CustomTab label="Información del Proveedor" />
       </CustomTabs>

      {tabIndex === 1 && (
        <div className="contentpreview">
          <div className="rowprevalig">
            <div className="contentInfo">
              <div className="subtitles">
                <Assignment className="icon" />
                <p className="titleDirection">Datos de Proveedor</p>
              </div>
              <div className="dataContainer">
                <div className="dataContainer__item">
                  <p>
                    RFC: <span>{getValidValue(orderSelectedData?.rfc)}</span>
                  </p>
                  <p>
                    Contacto: <span>{getValidValue(orderSelectedData?.fullname)}</span>
                  </p>
                </div>
                <div className="dataContainer__item">
                  <p>
                    Correo: <span>{getValidValue(orderSelectedData?.email)}</span>
                  </p>
                  <p>
                    Teléfono: <span>{getValidValue(orderSelectedData?.phone)}</span>
                  </p>
                </div>
                <div className="dataContainer__item">
                  <p>
                    Tipo: <span>{getValidValue(orderSelectedData?.type)}</span>
                  </p>
                  <p>
                    Identificador: <span>{getValidValue(orderSelectedData?.identifier)}</span>
                  </p>
                  <p>
                    Calle: <span>{getValidValue(orderSelectedData?.street)}</span>
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="rowprev">
            <div className="subtitles">
              <Map className="icon" />
              <p className="titleDirection">Direcciones de Proveedor</p>
            </div>
          </div>
          <ViewDirectionsProviders storedAddresses={dataAddress} />

          <div className="rowprev">
            <div className="subtitles">
              <Phone className="icon" />
              <p className="titleDirection">Contactos de Proveedor</p>
            </div>
          </div>
          <ViewContactsProviders dataContacts={dataContacts} />
        </div>
      )}

      {tabIndex === 0 && (
        <div className="contentpreview">
          <div className="subtitles">
            <Assignment className="icon" />
            <Tooltip title="Filtrar por">
              <h4>Órdenes de Compra</h4>
            </Tooltip>
          </div>

          <div className="headerpreviewfilters">
            <input
              className="input"
              type="text"
              value={keyWord}
              placeholder="Ingresa el folio"
              onChange={(e) => handleChangeFolio(e.target.value)}
            />
            <LogisticsFilters filters={filtersPurchaseOrders} handleOnChangeFilter={handleOnChangeFilter} />
          </div>
          <ShowFilters optionsFilterSelected={optionsFilterSelected} handleDeleteFilter={handleDeleteFilter} />

          <div className="contentpreview__containerTable">
            <div className="contentpreview__products">
              <table>
                <thead>
                  <tr>
                    <th>Folio</th>
                    <th>Proveedor</th>
                    <th>Condición</th>
                    <th>Teléfono</th>
                    <th>Observaciones</th>
                    <th>Método de Entrega</th>
                    <th>Fecha de Creación</th>
                    <th>Acciones</th>
                  </tr>
                </thead>
                <tbody className="bodyTable">
                  {tableDataOrders?.dataOrders?.isFeching ? (
                    <tr>
                      <td colSpan="6" style={{ textAlign: "center" }}>
                        <div className="load">
                          <div className="load__img">
                            <img src="/load.png" />
                          </div>
                          <div className="content_loadtext">
                            <p>Cargando Productos</p>
                            <LinearProgress color="primary" />
                          </div>
                        </div>
                      </td>
                    </tr>
                  ) : tableDataOrders?.dataOrders?.count === 0 ? (
                    <tr>
                      <td colSpan="6" style={{ textAlign: "center" }}>
                        <p>No hay resultados</p>
                      </td>
                    </tr>
                  ) : (
                    tableDataOrders.dataOrders.data.map((item, index) => (
                      <tr key={index}>
                        <td style={{ color: "rgb(3, 77, 111)" }}>{item?.item?.folio ? item?.item?.folio : "N/A"}</td>
                        <td>{item?.proveedor}</td>
                        <td>{item?.condicion}</td>
                        <td>{item.telefono}</td>
                        <td>{item?.observaciones}</td>
                        <td>{item["metodo de entrega"]}</td>
                        <td>{formatDate(item["fecha de creacion"])}</td>
                        <td>
                          <IconButton className="icnButton" onClick={() => handleClickOrder(item)}>
                            <Tooltip title="Ver Orden">
                              <Visibility className="icon" />
                            </Tooltip>
                          </IconButton>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      <DrawerViewProvider open={openView} toggleModal={toggleModalView} orderSelectedData={orderSelectedData} />
    </PreviewOrderStyled>
  );
}