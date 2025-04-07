import React, { useEffect, useState } from "react";
import { ModalProductExitStyled } from "./styles";
import { Close, Search, UpdateSharp } from "@material-ui/icons";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Divider,
  Grid,
  IconButton,
  Tooltip,
  Typography,
} from "@material-ui/core";
import TableLimenkaGeneral from "../../../../components/TableLimenkaGeneral";
import useDirLogProducts from "../../hooks/useDirLogProducts";
import useAlertToast from "../../../../hooks/useAlertToast";

import useDirLogPedidos from "../../hooks/useDirLogPedidos";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { Pagination, Skeleton } from "@material-ui/lab";
import { api } from "../../../../services/api";
import dayjs from "dayjs";
// import { table } from "console";

export default function ModalProductExit({
  open = true,
  onClose = () => {},
  productSelected,
  handleExitProducts,
  products,
  // es dondeestan loas nuevos productos

  // wareHouseproductsData,
  // orderSelectedData,
  // productsData,
  // handleOnClickClosePreview,
  // toggleTrackingsModal,
  // handleToggleFiles,
}) {
  const {
    selectedRows,
    setSelectedRows,
    wareHouseproductsData,
    tableData,
    keyword,
    setKeyword,
    handleOnChangeKeyWord,
    deleteKeyWord,
    page,
    handlePage,
    handleRefetch,
    total,
  } = useDirLogProducts(productSelected);
  const { articles } = useDirLogPedidos();
  const [details, setDetails] = useState({});
  const [actived, setActived] = useState(false);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const { showAlertSucces } = useAlertToast();

  const handleCloseModal = () => {
    onClose();
    setSelectedProducts(products);
    setActived(false);
    setKeyword(productSelected ? productSelected?.product?.code : "");
  };
  useEffect(() => {}, [wareHouseproductsData, actived, selectedProducts]);

  useEffect(() => {
    setSelectedProducts(products);
  }, [products]);

  const handleCheckboxChange = (product, isChecked) => {
    if (isChecked) {
      setSelectedProducts([...selectedProducts, product]);
    } else {
      setSelectedProducts(selectedProducts.filter(p => p.id != product.id));
    }
  };

  const handleAccordionChange = async (id, isExpanded) => {
    if (isExpanded) {
      try {
        let query = {
          productId: id,
        };
        let params = {
          include: "product",
          where: JSON.stringify(query),
        };
        const articles = await api.get(`wharehouseproducts`, { params });
        setDetails(prevDetails => ({ ...prevDetails, [id]: articles.data.results }));
      } catch (error) {
        console.error("Error fetching details:", error);
      }
    }
  };

  const isProductSelected = product => {
    return selectedProducts.some(p => p.id === product.id);
  };

  return (
    <ModalProductExitStyled
      open={open}
      onClose={handleCloseModal}
      aria-labelledby="simple-modal-title"
      aria-describedby="simple-modal-description"
    >
      <div className="modalbody">
        <div className="modalbody__title">
          <p>Salida de Producto</p>
        </div>
        <div className="header">
          <div className="header__title">
            <h4>Buscar:</h4>
          </div>

          <div className="header__filters">
            <div className="inputContainer">
              <Search className="inputContainer__icon" />

              <input
                value={keyword}
                onChange={e => handleOnChangeKeyWord(e)}
                className="inputContainer__input"
                placeholder="Buscar por folio, producto"
              />

              {keyword?.length > 3 && (
                <IconButton className="inputContainer__clean" onClick={() => deleteKeyWord()}>
                  <Close />
                </IconButton>
              )}
            </div>
          </div>
        </div>

        <Grid container>
          <Grid item xs={actived ? 8 : 12}>
            <div className="body">
              <div className="titles">
                <p className="heads">Código</p>
                <p className="heads">Producto</p>
                <p className="heads">Stock</p>
                <p className="heads">Acción</p>
              </div>

              {tableData.data.map((item, index) => {
                return (
                  <Accordion key={index} onChange={(event, isExpanded) => handleAccordionChange(item.id, isExpanded)}>
                    <AccordionSummary
                      style={{ backgroundColor: index % 2 === 0 ? "white" : "#cdcdcd96" }}
                      // expandIcon={<ExpandMoreIcon />}
                      aria-controls="panel1a-content"
                      id="panel1a-header"
                    >
                      <div className="titleAcordion">
                        <span className="b">{item.code}</span>
                        <Tooltip title={`${item.name}`}>
                          <b className="b">{item.name.substring(0, 30)}...</b>
                        </Tooltip>

                        <b className="b">{item.stock}</b>
                        <b className="b view">ver</b>
                      </div>
                      {/* <Typography className="titleAcordion">--<b className="b">{item.name}</b></Typography> */}
                    </AccordionSummary>
                    <AccordionDetails>
                      <div style={{ width: "100%" }}>
                        {details[item.id] ? (
                          <div>
                            <div style={{ display: "flex", justifyContent: "space-between" }}>
                              <h3>Numero de serie</h3>
                              <h3>Fechas de Ingreso</h3>
                            </div>
                            <Divider />
                            {details[item.id].map((detailItem, detailIndex) => (
                              <li
                                key={detailIndex}
                                style={{ display: "flex", alignItems: "center", marginTop: "10px" }}
                              >
                                <div style={{ display: "flex", justifyContent: "space-between", width: "100%" }}>
                                  <div style={{ display: "flex" }}>
                                    <input
                                      type="checkbox"
                                      style={{ marginRight: "10px" }}
                                      onChange={e => handleCheckboxChange(detailItem, e.target.checked)}
                                      checked={isProductSelected(detailItem)}
                                    />
                                    <p> {detailItem.serialnumber} </p>
                                  </div>
                                  <p> {dayjs(detailItem.createdAt).format("DD/MM/YYYY")} </p>
                                </div>
                              </li>
                            ))}
                          </div>
                        ) : (
                          <div className="">
                            <Skeleton variant="text" />
                          </div>
                        )}
                      </div>
                    </AccordionDetails>
                  </Accordion>
                );
              })}
            </div>
            {/* <div style={{ display: "flex", justifyContent: "space-between", padding: "10px" }}>
              <div className="header__title">
                <h4>
                  Productos <span>(Total {total})</span>
                </h4>
              </div>
              <Pagination
                count={total}
                color="primary"
                page={page}
                onChange={(event, value) => {
                  handlePage(value);
                  if (handleRefetch) {
                    handleRefetch();
                  }
                }}
              />
            </div> */}
          </Grid>
        </Grid>
        <div className="content_buttons">
          <button
            className="buttton_supply"
            onClick={() => {
              showAlertSucces("Productos surtidos correctamente", 3000);
              handleExitProducts(selectedProducts), setSelectedRows([]);
              onClose();
            }}
          >
            Surtir
          </button>
          <button
            className="buttton_delete"
            onClick={() => {
              onClose(), setSelectedProducts(products);
            }}
          >
            Cancelar
          </button>
        </div>
      </div>
    </ModalProductExitStyled>
  );
}
