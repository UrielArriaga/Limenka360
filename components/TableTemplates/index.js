import { Button, Grid } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import Dialog from "@material-ui/core/Dialog";
import router from "next/router";
import { NavigateBefore, NavigateNext, TableChartOutlined, Group } from "@material-ui/icons";
import styled from "styled-components";
import TableCustom from "../TableCustom";
import { useForm } from "react-hook-form";
import { api } from "../../services/api";
import { useSelector } from "react-redux";
import { companySelector } from "../../redux/slices/companySlice";
import { ifError } from "assert";
import AlertGlobal from "../Alerts/AlertGlobal";
import { Pagination } from "@material-ui/lab";
import { userSelector } from "../../redux/slices/userSlice";
import DrawerEditTemplate from "../EditTemplate";

const TemplatesTable = ({
  totalTemplates,
  setTotalTemplates,
  searchKey,
  filterPlantilla,
  flag,
  setFlag,
  filterTipo,
  filter,
  order, // Recibe el orden
  orderBy,
}) => {
  const { id_company } = useSelector(companySelector);
  const { id_user } = useSelector(userSelector);
  const [showUpload, setshowUpload] = useState(false);
  const [name, setName] = useState("");
  const [company, setCompany] = useState("");
  const [data, setData] = useState(null);
  const [dataToUpdate, setDataToUpdate] = useState(null);
  const [dataToDelete, setDataToDelete] = useState(null);
  const [dataToManyDelete, setDataToManyDelete] = useState(null);
  const [refetch, setRefetch] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [showDeleteMany, setShowDeleteMany] = useState(false);
  const [templatesBD, setTemplatesBD] = useState([]);
  const [Alert, setAlert] = useState({ severity: null, show: null, message: "", type: null });
  const [isLoading, setIsLoading] = useState(false);
  const [loadingTableData, setLoadingTableData] = useState(false);
  //paginacion
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);
  const totalPages = Math.ceil(totalTemplates / limit);
  //Editar
  const [openEdit, setOpenEdit] = useState(false);
  const [templateEdit, setTemplateEdit] = useState({});

  useEffect(() => {
    let mounted = true;
    if (mounted) {
      getData();
    }
    return () => (mounted = false);
  }, [refetch, page, flag,order]);

  const handleChange = (event, value) => {
    setPage(value);
  };

  const handleCloseDelete = () => {
    setShowDelete(false);
    resetForm();
  };
  const handleCloseDeleteMany = () => {
    setShowDeleteMany(false);
    resetForm();
  };
  const handleClose = () => {
    setshowUpload(false);
    resetForm();
  };

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  function formatUpperCase(str) {
    return str[0]?.toUpperCase() + str.slice(1);
  }

  const getData = async () => {
    setLoadingTableData(true);
    try {
      let query = {};

      query.or = [{ ejecutiveId: id_user }, { share: 1 }, { share: 2 }];

      if (searchKey !== null && searchKey !== "" && searchKey !== undefined && filter !== "") {
        if (filter.value === "description") {
          query.template = { description: { iRegexp: `${searchKey.toLocaleLowerCase()}` } };
        } else {
          delete query.description;
        }

        if (filter.value === "type") {
          query.template = { type: { iRegexp: `${searchKey.toLocaleLowerCase()}` } };
        } else {
          delete query.type;
        }
      }

      setIsLoading(true);

      let params = {
        count: 1,
        limit: limit,
        skip: page,
        order: order === 'asc' ? orderBy : `-${orderBy}`,
            where: JSON.stringify(query),
        // include: "ejecutive",
      };
      let plantilla = await api.get(`templates`, { params: params });
      setTotalTemplates(plantilla.data.count);
      normalizeData(plantilla.data.results);
      setTemplatesBD(plantilla.data.results);
    } catch (error) {
      setIsLoading(false);
      handleAlert("error", "Plantillas - Error al cargar los datos!", "basic");
      console.log(error);
    }
    setLoadingTableData(false);
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
      itemNormalize.description = formatUpperCase(element?.description);
      itemNormalize.createdAt = element?.createdAt;
      itemNormalize.type = formatUpperCase(element?.type);
      itemNormalize.share = element?.share;
      dataNormalize.push(itemNormalize);
    }
    setData(dataNormalize);
  };

  // * Editar Prospecto
  const handleEdit = item => {
    let editTemplate = templatesBD.filter(i => i.id == item.id);
    setTemplateEdit(editTemplate[0]);
    setOpenEdit(!openEdit);
  };

  const deleteGroup = plantilla => {
    setDataToDelete(plantilla);
    setShowDelete(true);
  };

  const handleDeleteGroup = () => {
    api
      .delete(`templates/${dataToDelete.id}`)
      .then(res => {
        setRefetch(!refetch);
        handleCloseDelete();
      })
      .catch(err => {
        console.log(err);
      });
  };

  const resetForm = () => {
    setValue("name", "");
    setValue("company", "");
    setName("");
    setCompany("");
  };

  const deleteMany = items => {
    setDataToManyDelete(items);
    setShowDeleteMany(true);
  };

  const handleDeleteMany = () => {
    dataToManyDelete.forEach(item => {
      api.delete(`templates/${item.id}`);
    });
    setShowDeleteMany(false);
    setRefetch(!refetch);
  };

  return (
    <TablePlantilla>
      <TableCustom
        heads={["id", "Descripción","Fecha de Creación", "Tipo", " Compartido"]}
        data={data}
        loadingTableData={loadingTableData}
        identificador={"id"}
        custom={true}
        selectmultiple={true}
        primaryColor={"#405189"}
        secondaryColor={"#dce1f6"}
        deleteItem={items => deleteMany(items)}
        keyJson="platilla"
        actionsPerItem={[
          { title: "modificar", action: e => handleEdit(e) },
          { title: "eliminar", action: e => deleteGroup(e) },
        ]}
        actionsItemsSelect={[
          {
            title: "Nada",
            action: () => console.log("enviooo"),
          },
        ]}
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
          <p className="title">Eliminar plantilla {dataToDelete?.description}</p>
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
          <p className="title">Eliminar Plantillas</p>
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
                  <p key={item.id}>{item.description}</p>
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

      <DrawerEditTemplate
        openEdit={openEdit}
        setOpenEdit={setOpenEdit}
        templateEdit={templateEdit}
        setFlag={() => setFlag(!flag)}
      />
      {Alert?.show && (
        <AlertGlobal severity={Alert.severity} message={Alert.message} show={Alert.show} type={Alert.type} />
      )}
    </TablePlantilla>
  );
};

export default TemplatesTable;

const TablePlantilla = styled.div`
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
