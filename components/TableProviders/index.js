import { Button, Grid } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import Dialog from "@material-ui/core/Dialog";
import router from "next/router";
import { NavigateBefore, NavigateNext, TableChartOutlined, Group, Edit } from "@material-ui/icons";
import styled from "styled-components";
import TableCustom from "../TableCustom";
import { set, useForm } from "react-hook-form";
import { api } from "../../services/api";
import DrawerEditProvider from "../EditProvider";
import AlertGlobal from "../Alerts/AlertGlobal";
import { Pagination } from "@material-ui/lab";
import { toUpperCaseChart } from "../../utils";

const ProvidersTable = ({
  totalProviders,
  setTotalProviders,
  searchKey,
  filterName,
  filterType,
  flag,
  setFlag,
  filterCompany,
  setFilterName,
  filterPhone,
  filterOpPhone,
  filterRfc,
  filterIdentifier,
  filterNifCif,
}) => {
  const [providerEdit, setProviderEdit] = useState({});
  const [openEdit, setOpenEdit] = useState(false);
  const [showUpload, setshowUpload] = useState(false);
  const [name, setName] = useState("");
  const [data, setData] = useState(null);
  const [providersBD, setProvidersBD] = useState([]);
  const [dataToDelete, setDataToDelete] = useState(null);
  const [dataToManyDelete, setDataToManyDelete] = useState(null);
  const [refetch, setRefetch] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [showDeleteMany, setShowDeleteMany] = useState(false);
  const [Alert, setAlert] = useState({ severity: null, show: null, message: "", type: null });
  const [isLoading, setIsLoading] = useState(false);

  //paginacion
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const totalPages = Math.ceil(totalProviders / limit);

  const handleChange = (event, value) => {
    setPage(value);
  };

  const handleCloseDelete = () => {
    setShowDelete(false);
  };
  const handleCloseDeleteMany = () => {
    setShowDeleteMany(false);
  };
  const handleClose = () => {
    setshowUpload(false);
  };

  useEffect(() => {
    let mounted = true;
    if (mounted) {
      getData();
    }
    return () => (mounted = false);
  }, [refetch, page, flag]);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  function formatUpperCase(str) {
    return str?.toUpperCase() + str?.slice(1);
  }

  const getData = async () => {
    try {
      let query = {};

      // if (searchKey !== "") {
      //   query.or = [
      //     { name: { iRegexp: `${searchKey.toLocaleLowerCase()}` } },
      //     { lastname: { iRegexp: `${searchKey.toLocaleLowerCase()}` } },
      //     { email: { regexp: `${searchKey.toLocaleLowerCase()}` } },
      //   ];
      // } else {
      //   delete query.or;
      // }

      if (searchKey === null || searchKey === "" || searchKey === undefined) {
      } else {
        if (filterName === null || filterName === "" || filterName === undefined) {
          delete query.name;
        } else {
          query.name = { iRegexp: `${searchKey.trim().toLocaleLowerCase()}` };
        }

        if (filterType === null || filterType === "" || filterType === undefined) {
          delete query.email;
        } else {
          query.email = searchKey;
        }

        if (filterCompany === null || filterCompany === "" || filterCompany === undefined) {
          delete query.company;
        } else {
          query.companyname = { iRegexp: `${searchKey.trim().toLocaleLowerCase()}` };
        }

        if (filterPhone === null || filterPhone === "" || filterPhone === undefined) {
          delete query.phone;
        } else {
          query.phone = { iRegexp: `${searchKey.trim()}` };
        }

        if (filterOpPhone === null || filterOpPhone === "" || filterOpPhone === undefined) {
          delete query.optionalphone;
        } else {
          query.optionalphone = { iRegexp: `${searchKey.trim()}` };
        }

        if (filterRfc === null || filterRfc === "" || filterRfc === undefined) {
          delete query.rfc;
        } else {
          query.rfc = { iRegexp: `${searchKey.trim().toLocaleLowerCase()}` };
        }

        if (filterIdentifier === null || filterIdentifier === "" || filterIdentifier === undefined) {
          delete query.identifier;
        } else {
          query.identifier = { iRegexp: `${searchKey.trim().toLocaleLowerCase()}` };
        }

        if (filterNifCif === null || filterNifCif === "" || filterNifCif === undefined) {
          delete query.nifcif;
        } else {
          query.nifcif = { iRegexp: `${searchKey.trim().toLocaleLowerCase()}` };
        }
      }
      setIsLoading(true);
      let count = "count=1";
      let limite = `limit=${limit}`;
      let skip = `skip=${page}`;
      let order = "order=-createdAt";
      let queryString = `where=${JSON.stringify(query)}`;
      let include = "city,entity,commercialbussiness";
      let providers = await api.get(`providers?${queryString}&${include}&${count}&${limite}&${skip}&${order}`);
      setTotalProviders(providers.data.count);
      setProvidersBD(providers.data.results);
      normalizeData(providers.data.results);
    } catch (error) {
      setIsLoading(false);
      handleAlert("error", "Proveedores - Error al cargar los datos!", "basic");
    }
  };

  const handleAlert = (severity, message, type) => {
    setAlert({ severity: severity, show: true, message: message, type: type });
    setTimeout(() => {
      setAlert({ severity: severity, show: false, message: message, type: null });
    }, 3000);
  };

  const normalizeData = data => {
    console.log(data);
    let dataNormalize = [];
    for (let i = 0; i < data?.length; i++) {
      const element = data[i];
      let itemNormalize = {};
      itemNormalize.id = element?.id;
      itemNormalize.company = toUpperCaseChart(element?.companyname);
      itemNormalize.name =
        element.name && element.lastname ? toUpperCaseChart(`${element?.name} ${element?.lastname} `) : "N/A";
      itemNormalize.email = element?.email || "N/A";
      itemNormalize.phone = element?.phone || "N/A";
      itemNormalize.optionalphone = element?.optionalphone || "N/A";
      itemNormalize.rfc = element?.rfc || "N/A";
      itemNormalize.identifier = element?.identifier || "N/A";
      itemNormalize.nifcif = element?.nifcif || "N/A";
      itemNormalize.street = toUpperCaseChart(element?.street) || "N/A";
      itemNormalize.observations = toUpperCaseChart(element?.observations) || "N/A";

      dataNormalize.push(itemNormalize);
    }
    setData(dataNormalize);
  };

  // * Editar Prospecto
  const handleEdit = item => {
    let editProvider = providersBD.filter(i => i.id == item.id);
    setProviderEdit(editProvider[0]);
    setOpenEdit(!openEdit);
  };

  const deleteGroup = proveedor => {
    setDataToDelete(proveedor);
    setShowDelete(true);
  };

  const handleDeleteGroup = () => {
    api.delete(`providers/${dataToDelete.id}`).then(res => {
      setRefetch(!refetch);
      handleCloseDelete();
    });
  };

  const deleteMany = items => {
    console.log("hola mundo");
    setDataToManyDelete(items);
    setShowDeleteMany(true);
  };

  const handleDeleteMany = () => {
    console.log("eliminando");
    dataToManyDelete.forEach(item => {
      api.delete(`providers/${item.id}`);
    });
    setRefetch(!refetch);
    setShowDeleteMany(false);
  };

  function Inputs() {
    return (
      <Grid spacing={1} container className="ctr_inputs">
        <Grid item xs={12} md={6}>
          <label className="ctr_inputs__label">Nombre *</label>
          <input
            {...register("name", { required: true })}
            id="name"
            name="name"
            value={name}
            onChange={e => {
              setName(e.target.value);
              setValue("name", e.target.value);
            }}
            className={errors?.name?.type === "required" ? "ctr_inputs__input error" : "ctr_inputs__input"}
          />
        </Grid>
      </Grid>
    );
  }
  return (
    <TableProviders>
      <TableCustom
        heads={[
          "id",
          "Compañía",
          "Contacto",
          "Correo",
          "Telefono",
          "Móvil",
          "RFC",
          "Identificador",
          "NIFCIF",
          "Dirección",
          "Observaciones",
        ]}
        data={data || [{ id: "Sin Datos" }]}
        identificador={"id"}
        custom={true}
        selectmultiple={true}
        primaryColor={"#405189"}
        secondaryColor={"#dce1f6"}
        deleteItem={items => deleteMany(items)}
        keyStorage="provedores"
        actionsPerItem={[
          {
            icon: <Edit className="icon_item" />,
            title: "modificar",
            action: e => handleEdit(e),
          },
          { title: "eliminar", action: e => deleteGroup(e) },
        ]}
        actionsItemsSelect={[]}
        actionItem={action => action(action)}
      />

      <div className="pagination">
        <Pagination count={totalPages} page={page} onChange={handleChange} color="primary" />
      </div>

      <Dialog
        open={showDelete}
        keepMounted
        onClose={handleCloseDelete}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogContainer>
          <p className="title">Eliminar Proveedor {dataToDelete?.company}</p>
          <Grid container className="ctr_buttons" style={{ justifyContent: "center" }}>
            <Button variant="contained" color="secondary" className="btn_cancel" onClick={handleCloseDelete}>
              Cancelar
            </Button>
            <Button variant="contained" color="primary" className="btn_upload" onClick={handleDeleteGroup}>
              Eliminar
            </Button>
          </Grid>
        </DialogContainer>
      </Dialog>
      <Dialog
        open={showDeleteMany}
        keepMounted
        onClose={handleCloseDelete}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogContainer>
          <p className="title">Eliminar Proveedores</p>
          <Grid container className="ctr_buttons" style={{ justifyContent: "center" }}>
            <Grid item xs={12} md={12}>
              <div
                style={{
                  display: "flex",
                  flexFlow: "column",
                  justifyContent: "center",
                  alignItems: "center",
                  marginBottom: "15px",
                }}
              >
                {dataToManyDelete?.map(item => (
                  <p key={item.id}>{item.company}</p>
                ))}
              </div>
            </Grid>
            <Button variant="contained" color="secondary" className="btn_cancel" onClick={handleCloseDeleteMany}>
              Cancelar
            </Button>
            <Button variant="contained" color="primary" className="btn_upload" onClick={handleDeleteMany}>
              Eliminar
            </Button>
          </Grid>
        </DialogContainer>
      </Dialog>

      <DrawerEditProvider
        openEdit={openEdit}
        setOpenEdit={setOpenEdit}
        providerEdit={providerEdit}
        setFlag={() => setFlag(!flag)}
      />

      {Alert?.show && (
        <AlertGlobal severity={Alert.severity} message={Alert.message} show={Alert.show} type={Alert.type} />
      )}
    </TableProviders>
  );
};

export default ProvidersTable;

const TableProviders = styled.div`
  p {
    margin: 0;
  }
  .title_table {
    display: flex;
    align-items: center;
    margin-bottom: 10px;
    margin-top: 30px;
    svg {
      width: 30px;
      height: 30px;
      padding: 5px;
      margin-right: 5px;
      background: #ffffff;
      color: #1a7ee0;
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
    margin-top: 15px;
    display: flex;
    align-items: center;
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
    padding: 0 20px 40px 50px;
    &__label {
      font-size: 12px;
      font-weight: bold;
    }
    &__input {
      width: 250px;
      /* padding: 5px 0; */
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
  }
  .ctr_buttons {
    display: flex;
    padding: 0 20px;
    padding-bottom: 20px;
    justify-content: flex-end;
    .btn_cancel {
      margin-right: 10px;
      text-transform: capitalize;
      background: #0d0d0d;
    }
    .btn_upload {
      text-transform: capitalize;
      background: #0c203b;
    }
  }
`;
