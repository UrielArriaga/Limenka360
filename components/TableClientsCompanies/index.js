import { Button, Grid, Modal } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import Dialog from "@material-ui/core/Dialog";
import router from "next/router";
import { NavigateBefore, NavigateNext, TableChartOutlined, DynamicFeed, CameraAlt } from "@material-ui/icons";
import styled from "styled-components";
import TableCustom from "../TableCustom";
import { api } from "../../services/api";
import { useSelector } from "react-redux";
import { companySelector } from "../../redux/slices/companySlice";
import AlertGlobal from "../Alerts/AlertGlobal";
import { Pagination } from "@material-ui/lab";
import EditClientsCompanies from "../EditClientsCompany";

const CompaniesTable = ({
  totalPhases,
  setTotalPhases,
  searchKey,
  flag,
  setFlag,
  filterCompany,
  filterEmail,
  filterPhone,
  cB,
  filterRfc,
  filterOpPhone,
  comercial,
  setComercial,
  filterOrder,
}) => {
  const { id_company } = useSelector(companySelector);
  const [data, setData] = useState();
  const [showDelete, setShowDelete] = useState(false);
  //paginacion
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);
  const totalPages = Math.ceil(totalPhases / limit);

  const [refetch, setRefetch] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showUpload, setshowUpload] = useState(false);
  const [dataToDelete, setDataToDelete] = useState(null);
  const [edit, setEdit] = useState({});
  const [Alert, setAlert] = useState({ severity: null, show: null, message: "", type: null });
  const [dataBdClients, setDataBdClients] = useState([]);
  const [order, setOrder] = useState("-createdAt");

  useEffect(() => {
    let mounted = true;
    if (mounted) {
      getData();
    }
    return () => (mounted = false);
  }, [refetch, page, flag, cB, filterOrder]);

  function formatUpperCase(str) {
    return str[0]?.toUpperCase() + str.slice(1);
  }

  const handleChange = (event, value) => {
    setPage(value);
    setFlag(!flag);
  };

  const getData = async () => {
    try {
      let query = {};

      if (filterOrder.value !== undefined) {
        setOrder(filterOrder.value);
      } else {
        setOrder("-createdAt");
      }

      if (searchKey === null || searchKey === "" || searchKey === undefined) {
        if (cB !== "") {
          query.commercialbusinessId = cB.value;
        } else {
          delete query.commercialbusinessId;
        }
      } else {
        if (filterCompany === null || filterCompany === "" || filterCompany === undefined) {
          delete query.companyname;
        } else {
          query.companyname = { iRegexp: `${searchKey.toLocaleLowerCase()}` };
        }

        if (filterEmail === null || filterEmail === "" || filterEmail === undefined) {
          delete query.email;
        } else {
          query.email = { iRegexp: `${searchKey.toLocaleLowerCase()}` };
        }

        if (filterPhone === null || filterPhone === "" || filterPhone === undefined) {
          delete query.phone;
        } else {
          query.phone = { match: `${searchKey.toLocaleLowerCase()}` };
        }

        if (filterOpPhone === null || filterOpPhone === "" || filterOpPhone === undefined) {
          delete query.optionalophone;
        } else {
          query.optionalophone = { match: `${searchKey.toLocaleLowerCase()}` };
        }

        if (filterRfc === null || filterRfc === "" || filterRfc === undefined) {
          delete query.rfc;
        } else {
          query.rfc = { iRegexp: `${searchKey.toLocaleLowerCase()}` };
        }
      }
      setIsLoading(true);

      let params = {
        where: JSON.stringify(query),
        count: "1",
        limit: limit,
        skip: page,
        order: order,
        include: "commercialbusiness,postal,city,entity",
        join: "c,ps,c,e",
      };
      let ccompanies = await api.get(`clientscompanies`, { params });
      let countCompanies = ccompanies.data.count;
      setTotalPhases(countCompanies);
      normalizeData(ccompanies.data.results);
      setDataBdClients(ccompanies.data.results);
    } catch (error) {
      setIsLoading(false);
      handleAlert("error", "empresas - Error al cargar los datos!", "basic");
    }
  };

  const handleAlert = (severity, message, type) => {
    setAlert({ severity: severity, show: true, message: message, type: type });
    setTimeout(() => {
      setAlert({ severity: severity, show: false, message: message, type: null });
    }, 3000);
  };

  const normalizeData = data => {
    let dataNormalize = [];
    for (let i = 0; i < data?.length; i++) {
      const element = data[i];
      let itemNormalize = {};
      itemNormalize.id = element?.id;
      itemNormalize.companyname = formatUpperCase(element?.companyname);
      itemNormalize.eslicitante = element?.eslicitante ? "Si" : "No";
      itemNormalize.amount = element?.amount;
      itemNormalize.photo = element?.photo;
      itemNormalize.commercialbusinessId = element?.commercialbusiness?.name;
      itemNormalize.email = element?.email;
      itemNormalize.phone = element?.phone;
      itemNormalize.optionalophone = element?.optionalophone;
      itemNormalize.rfc = element?.rfc;
      itemNormalize.street = element?.street;
      itemNormalize.postalcode = element?.postal?.postal_code;
      itemNormalize.entity = element?.entity?.name;
      itemNormalize.city = element?.city?.name;
      dataNormalize.push(itemNormalize);
    }
    setData(dataNormalize);
  };
  const handleCloseDelete = () => {
    setShowDelete(false);
  };

  const uploadData = cmpny => {
    let editTemplate = dataBdClients.filter(i => i.id == cmpny.id);
    setEdit(editTemplate[0]);
    setshowUpload(!showUpload);
  };

  const deleteContact = cmpny => {
    setShowDelete(true);
    setDataToDelete(cmpny);
  };

  const handleDeletePhase = async () => {
    try {
      await api.delete(`clientscompanies/${dataToDelete.id}`).then(res => {
        setRefetch(!refetch);
        handleCloseDelete();
      });
    } catch (err) {
      console.log(err);
      switch (err.request?.status) {
        case 401:
          return handleAlert("error", "Clientes - ¡No cuentas con las credenciales!", "basic");
        case 403:
          return handleAlert("error", "Clientes - ¡No tienes permisos!", "basic");
        case 404:
          return handleAlert("error", "Clientes - ¡Ruta no encontrada!", "basic");

        default:
          return handleAlert("error", "Clientes - ¡Error al cargar los datos!", "basic");
      }
    }
  };

  const deleteItem = items => {
    let newData = data;
    for (let i = 0; i < items.length; i++) {
      const element = items[i];
      let filterData = newData.filter(item => item._id !== element._id);
      newData = filterData;
    }
    setData(newData);
  };

  return (
    <TableCompany>
      <TableCustom
        heads={[
          "id",
          "Compañía",
          "Es Licitante",
          "Monto",
          "foto",
          "giro comercial",
          "correo",
          "teléfono",
          "Movil",
          "rfc",
          "calle",
          "código postal",
          "estado",
          "municipio",
        ]}
        data={data || [{ id: "Sin datos", name: "Sin datos" }]}
        identificador={"id"}
        custom={true}
        selectmultiple={false}
        deleteItem={items => deleteItem(items)}
        keyJson="company"
        keyStorage="empresas"
        primaryColor={"#405189"}
        secondaryColor={"#dce1f6"}
        actionsPerItem={[
          { title: "modificar", action: e => uploadData(e) },

          { title: "eliminar", action: e => deleteContact(e) },
        ]}
        actionsItemsSelect={[
          {
            title: "enviar correo múltiple",
            action: () => console.log("enviooo"),
          },
        ]}
        actionItem={action => action(action)}
      />
      <div className="pagination">
        <Pagination
          style={{ display: "flex", justifyContent: "center" }}
          page={page}
          defaultPage={1}
          onChange={handleChange}
          shape="rounded"
          count={totalPages}
          color="primary"
        />
      </div>

      <Dialog
        open={showDelete}
        onClose={handleCloseDelete}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogContainer>
          <p className="title">Eliminar Cliente {dataToDelete?.companyname}</p>
          <div className="ctr_buttons">
            <div className="ctr_button">
              <Button variant="contained" color="secondary" className="btn_cancel" onClick={handleCloseDelete}>
                Cancelar
              </Button>
            </div>
            <div className="ctr_button">
              <Button variant="contained" color="primary" className="btn_upload" onClick={handleDeletePhase}>
                Eliminar
              </Button>
            </div>
          </div>
        </DialogContainer>
      </Dialog>
      <EditClientsCompanies
        setOpenEditClients={setshowUpload}
        openEditClients={showUpload}
        setOpen={setshowUpload}
        edit={edit}
        comercial={comercial}
        handleAlert={handleAlert}
        alert={alert}
        setAlert={setAlert}
        refetch={refetch}
        setRefetch={setRefetch}
      ></EditClientsCompanies>
      {Alert?.show && (
        <AlertGlobal severity={Alert.severity} message={Alert.message} show={Alert.show} type={Alert.type} />
      )}
    </TableCompany>
  );
};

export default CompaniesTable;

const TableCompany = styled.div`
  p {
    margin: 0;
  }

  .title_table {
    display: flex;
    align-items: center;
    margin-top: 30px;
    margin-bottom: 10px;
    svg {
      width: 30px;
      height: 30px;
      padding: 5px;
      margin-right: 5px;
      background: #ffffff;
      color: #9442d4;
      border-radius: 50%;
    }
    p {
      font-size: 18px;
      letter-spacing: 0.04em;
      font-weight: 600;
    }
  }

  .pagination {
    width: 100%;
    margin-top: 15px;
    display: flex;
    align-items: right;
    justify-content: right;
  }

  .tfooter {
    width: 100%;
    display: flex;
    align-items: center;
    margin-top: 15px;
    justify-content: right;
    &__ctr_button {
      margin-top: 10px;
      margin-bottom: 10px;
      .add_buton {
        text-transform: capitalize;
      }
    }
    &__ctr_pagination {
      display: flex;
      align-items: center;
      justify-content: space-around;
      &__pagination {
        display: flex;
        align-items: center;
        .before {
          display: flex;
          justify-content: center;
          align-items: center;
          width: 30px;
          height: 30px;
          background: #f3f3f3;
          border-radius: 8px;
          margin-right: 5px;
          margin-left: 10px;
          color: #0c203b;
          border: none;
          transition: all 0.2s ease;
          &:hover {
            cursor: pointer;
            background: #dce1f6;
          }
        }
        .next {
          display: flex;
          justify-content: center;
          align-items: center;
          width: 30px;
          height: 30px;
          background: #f3f3f3;
          border-radius: 8px;
          margin-left: 5px;
          color: #0c203b;
          border: none;
          transition: all 0.2s ease;
          &:hover {
            cursor: pointer;
            background: #dce1f6;
          }
        }
      }
    }
  }
  .MuiPaper-root.MuiDialog-paper.MuiDialog-paperScrollPaper.MuiDialog-paperWidthSm.MuiPaper-elevation24.MuiPaper-rounded {
    margin: 10px;
    width: 100%;
    max-width: 600px;
  }
`;

const DialogContainer = styled.div`
  P {
    margin: 0;
  }
  display: flex;
  flex-direction: column;
  overflow: hidden;

  .title {
    font-size: 18px;
    margin-bottom: 15px;
    font-weight: bold;
    background: #0c203b;
    padding: 10px 20px;
    color: #fff;
    letter-spacing: 0.05em;
  }
  .ctr_inputs {
    padding: 0 20px 20px 20px;
    &__label {
      font-size: 12px;
      font-weight: bold;
    }
    &__input {
      width: 100%;
      padding: 5px 0;
      border: none;
      border-bottom: 1.5px solid #ccc;
      transition: all 0.3s ease;
      font-size: 16px;
      &:focus {
        outline: none;
        border: none;
        transition: all 0.3s ease;

        border-bottom: 1.5px solid #0d0d0d;
      }
    }
    .error {
      border-bottom: 1.5px solid #f50f;
    }
    &__span_error {
      height: 16px;
      font-weight: bold;
      letter-spacing: 0.05em;
      font-size: 10px;
      color: #f50;
      margin-top: 5px;
    }

    .logo {
      display: flex;
      align-items: center;
      flex-direction: column;
      margin-top: 30px;
      &__img {
        width: 120px;
        height: 120px;
        border-radius: 50%;
        object-fit: contain;
      }
      &__icon {
        font-size: 60px;
      }
      &__input {
        display: none;
      }
      &__label {
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: white;
        text-align: center;
        padding: 5px;
        margin-bottom: 10px;
        border: 1px solid #ced4da;
        border-radius: 50%;
        transition: 0.3s;
        &:hover {
          -webkit-filter: blur(2px);
          cursor: pointer;
          &__logoFooter {
            z-index: 0;
          }
        }
      }
      &__buttonUploadImage {
        margin-bottom: 10px;
      }
      &__buttonDeleteImage {
      }
      &__logoFooter {
        position: fixed;
        color: red;
        color: black;
        font-size: 40px;
        text-align: center;
        margin-top: 100px;
        z-index: -1;
        transition: 0.2s;
        font-weight: bold;
      }
    }
    .imageContainer {
      display: flex;
      flex-direction: column;
      align-items: center;
      &__deleteImage {
        margin-top: 15px;
        border-radius: 5px;
        padding: 2px;
        background-color: red;
        color: #fff;
        border-color: red;
        transition: 0.3s;
        text-transform: capitalize;
        &:hover {
          cursor: pointer;
          background-color: #fff;
          color: red;
        }
      }
    }
  }
  .ctr_buttons {
    display: flex;
    padding-bottom: 20px;
    justify-content: space-around;
    .btn_cancel {
      text-transform: capitalize;
      background: #0d0d0d;
    }
    .btn_upload {
      text-transform: capitalize;
      background: #0c203b;
    }
  }
`;
