import { Box, Button, Grid } from "@material-ui/core";
import { Note, PictureAsPdfOutlined, Visibility } from "@material-ui/icons";

import dayjs from "dayjs";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { companySelector } from "../../redux/slices/companySlice";
import { userSelector } from "../../redux/slices/userSlice";
import { api, URL_SPACE } from "../../services/api";
import { makeTemplate } from "../../templates/makeTemplate";
import { formatDate, formatNumber, toUpperCaseChart } from "../../utils";
import { DrawerStyled } from "./styles";
import { motion } from "framer-motion";
import { saveAs } from "file-saver";
export default function DrawerPreviewQuote({ prospect, open, setOpen, oportunitySelect: oportunityData }) {
  const router = useRouter();

  // const [oportunityData, setOportunityData] = useState(oportunitySelect);
  const { userData, id_user, roleId } = useSelector(userSelector);
  const [isCreatingPdf, setIsCreatingPdf] = useState(false);
  const [products, setProducts] = useState([]);
  const { photo, company } = useSelector(companySelector);
  const [tabOption, setTabOption] = useState(0);
  const [templateSelected, setTemplateSelected] = useState(null);
  const [isCreatingPDF, setIsCreatingPDF] = useState(false);
  const [showTemplates, setShowTemplates] = useState(false);

  const [templates, setTemplates] = useState([
    {
      img: "/equipam_template.png",
      name: "Plantilla basica",
      index: 1,
    },
    {
      img: "/Medicalbuytemplate.png",
      name: "Medicalbuy",
      index: 2,
    },
    {
      img: "/meisontemplate.png",
      name: "Meison Medical",
      index: 3,
    },
    {
      img: "/Promedtemplate.png",
      name: "Promed",
      index: 4,
    },
    {
      img: "/lifemedictemplate.png",
      name: "LIfemedi",
      index: 5,
    },
    {
      img: "/Helsemedicaltemplate.png",
      name: "Helse Medical",
      index: 6,
    },
    {
      img: "/chisontemplate.png",
      name: "CHison",
      index: 7,
    },
    {
      img: "/cvjobstemplate.png",
      name: "Cvjobs",
      index: 8,
    },
    {
      img: "/shtemplate.png",
      name: "Cvjobs",
      index: 9,
    },
    {
      img: "/mxreitemplate.png",
      name: "mexrei",
      index: 10,
    },
    {
      img: "/healthTemplate.jpg",
      name: "health",
      index: 11,
    },
  ]);

  useEffect(() => {
    getQuotesByOportunity();
  }, [oportunityData]);

  const getQuotesByOportunity = async () => {
    if (!oportunityData) return;
    try {
      let query = {
        oportunityId: oportunityData.id,
      };
      const params = {
        count: "1",
        where: JSON.stringify(query),
        include: "product,product.brand",
      };
      let quotes = await api.get("productsoportunities", { params });
      let products = quotes.data?.results;
      setProducts(products);
    } catch (error) {
      console.log(error);
    }
  };

  const generateAgainQuote = async () => {
    try {
      setIsCreatingPDF(true);
      // console.log(oportunityData);
      let normalizeProduct = products.map((item, index) => ({
        name: item.product.name,
        amount: item.newprice,
        quantity: item.quantity,
        code: item.product?.code,
        iva: item.iva,
        total: item.total,
        brand: item?.product?.brand?.name,
        info: item.note,
      }));
      // console.log(normalizeProduct);
      let data = {
        company: {
          name: company,
          photo: photo,
        },

        quoteInfo: {
          folio: oportunityData.concept,
          observations: oportunityData.observations,
          date: dayjs(oportunityData.updatedAt).format("DD/MM/YYYY"),
        },

        ejecutive: {
          name: `${toUpperCaseChart(userData?.title)} ${toUpperCaseChart(userData?.name)}`,
          lastname: toUpperCaseChart(userData?.lastname),
          email: userData?.email,
          phone: userData?.phone,
        },

        prospect: {
          name: toUpperCaseChart(prospect?.name),
          lastname: toUpperCaseChart(prospect?.lastname),
          entity: prospect?.entity?.name,
          email: prospect?.email,
          phone: prospect?.phone,
        },

        iva: formatNumber(oportunityData.totaliva),
        total: formatNumber(oportunityData.subtotal + oportunityData.totalextracosts),
        subtotal: formatNumber(oportunityData.subtotal),
        products: normalizeProduct,

        footer: {
          showIn: "pageFooter-last",
          data: `*Precio sujeto a cambio sin previo aviso *Las existencias de los equipos son salvo venta, una vez confirmado el pedido no se aceptan cambios o devoluciones, *En caso de cancelación
      solicitarse por escrito y enviarse por correo a su ejecutivo de ventas, se cobrará el 30% del monto total de la compra y el reembolso se realiza 30 días hábiles posteriores a la
      cancelación. *Cualquier pago deberá ser notificado a su ejecutivo de ventas, es indispensable enviar el comprobante de pago para tramitar el pedido de los equipos solicitados. *Cuando
      el equipo sea enviado por paqueteria, NO FIRMAR DE RECIBIDO sin antes haber revisado que el equipo este en perfectas condiciones. *Precios en USD O EURO A M.N. en el momento de la
      compra al tipo de cambio de BBVA BANCOMER a la venta. Los números de guia se daran despues del tercer dia.`,
        },
      };
      // -------------tipo de descuento ---------//
      // typediscounts 1 (no hay descuentos).
      // typediscounts 2 (descuento genral).
      // typediscounts 3 (descuento total productos).
      if (oportunityData.typediscounts === 1 || oportunityData.typediscounts === 2) {
        data.discount = formatNumber(oportunityData.discount);
      } else {
        let discountTotal = products.reduce((prevValue, currentValue) => {
          return prevValue + currentValue.discount;
        }, 0);
        data.discount = formatNumber(discountTotal);
      }

      let user = id_user;
      let group = userData.groupId;
      let response = makeTemplate(templateSelected + 1, data);
      console.log(response);

      let company = userData.companyId;
      const form = new FormData();
      form.append("name", oportunityData.concept);
      form.append("data", response);
      form.append("company", company);
      form.append("group", group);
      form.append("ejecutive", user);

      let responsePDFURL = await api.post("convert/pdf", form);

      let responsePDFSAVE = await api.post(
        "convert/pdfbuffer",
        {
          pdfurl: URL_SPACE + responsePDFURL.data.url,
        },
        {
          responseType: "blob",
        }
      );

      const pdfBlob = new Blob([responsePDFSAVE.data], {
        type: "application/pdf;charset=utf-8",
      });

      saveAs(pdfBlob, `${oportunityData.concept}.pdf`);

      // console.log(responsePDFURL);
      setIsCreatingPDF(false);
    } catch (error) {
      setIsCreatingPDF(false);
      console.log(error);
    }
  };

  const generateAgainQuoteAndSave = async () => {
    try {
      setIsCreatingPDF(true);
      // console.log(oportunityData);
      let normalizeProduct = products.map((item, index) => ({
        name: item.product.name,
        amount: item.newprice,
        quantity: item.quantity,
        code: item.product?.code,
        iva: item.iva,
        total: item.total,
        brand: item?.product?.brand?.name,
        info: item.note,
      }));
      // console.log(normalizeProduct);
      let data = {
        company: {
          name: company,
          photo: photo,
        },

        quoteInfo: {
          folio: oportunityData.concept,
          observations: oportunityData.observations,
          date: dayjs(oportunityData.updatedAt).format("DD/MM/YYYY"),
        },

        ejecutive: {
          name: `${toUpperCaseChart(userData?.title)} ${toUpperCaseChart(userData?.name)}`,
          lastname: toUpperCaseChart(userData?.lastname),
          email: userData?.email,
          phone: userData?.phone,
        },

        prospect: {
          name: toUpperCaseChart(prospect?.name),
          lastname: toUpperCaseChart(prospect?.lastname),
          entity: prospect?.entity?.name,
          email: prospect?.email,
          phone: prospect?.phone,
        },

        iva: formatNumber(oportunityData.totaliva),
        discount: formatNumber(oportunityData.discount),
        total: formatNumber(oportunityData.subtotal + oportunityData.totalextracosts),
        subtotal: formatNumber(oportunityData.subtotal),
        products: normalizeProduct,

        footer: {
          showIn: "pageFooter-last",
          data: `*Precio sujeto a cambio sin previo aviso *Las existencias de los equipos son salvo venta, una vez confirmado el pedido no se aceptan cambios o devoluciones, *En caso de cancelación
      solicitarse por escrito y enviarse por correo a su ejecutivo de ventas, se cobrará el 30% del monto total de la compra y el reembolso se realiza 30 días hábiles posteriores a la
      cancelación. *Cualquier pago deberá ser notificado a su ejecutivo de ventas, es indispensable enviar el comprobante de pago para tramitar el pedido de los equipos solicitados. *Cuando
      el equipo sea enviado por paqueteria, NO FIRMAR DE RECIBIDO sin antes haber revisado que el equipo este en perfectas condiciones. *Precios en USD O EURO A M.N. en el momento de la
      compra al tipo de cambio de BBVA BANCOMER a la venta. Los números de guia se daran despues del tercer dia.`,
        },
      };

      let user = id_user;
      let group = userData.groupId;
      let response = makeTemplate(templateSelected + 1, data);
      console.log(response);

      let company = userData.companyId;
      const form = new FormData();
      form.append("name", oportunityData.concept);
      form.append("data", response);
      form.append("company", company);
      form.append("group", group);
      form.append("ejecutive", user);

      let responsePDFURL = await api.post("convert/pdf", form);
      let dataUrl = {};
      dataUrl.quoteurl = responsePDFURL.data.url;
      let oportunityUrl = await api.put(`oportunities/goals/${oportunityData.id}`, dataUrl);

      let responsePDFSAVE = await api.post(
        "convert/pdfbuffer",
        {
          pdfurl: URL_SPACE + responsePDFURL.data.url,
        },
        {
          responseType: "blob",
        }
      );

      const pdfBlob = new Blob([responsePDFSAVE.data], {
        type: "application/pdf;charset=utf-8",
      });

      saveAs(pdfBlob, `${oportunityData.concept}.pdf`);

      console.log(oportunityUrl);
      console.log(responsePDFURL);
      setIsCreatingPDF(false);
    } catch (error) {
      setIsCreatingPDF(false);
      console.log(error);
    }
  };

  const RenderQuote = () => {
    switch (tabOption) {
      case 0:
        return (
          <Grid container>
            <div className="drawer_container__data">
              <Grid container spacing={2} className="ctr_information__data">
                <Grid item xs={12} md={4}>
                  <p className="label">Concepto</p>
                  <p className="paragraph capitalize">{oportunityData?.concept}</p>
                </Grid>

                <Grid item xs={12} md={4}>
                  <p className="label">Cantidad de productos</p>
                  <p className="paragraph">{oportunityData?.quantity}</p>
                </Grid>

                <Grid item xs={12} md={4}>
                  <p className="label">Certeza</p>
                  <p className="paragraph">{oportunityData?.certainty}%</p>
                </Grid>

                <Grid item xs={12} md={4}>
                  <p className="label">Monto Total</p>
                  <p className="paragraph">{formatNumber(oportunityData?.amount)}</p>
                </Grid>

                <Grid item xs={12} md={8}>
                  <p className="label">Comisión</p>
                  <p className="paragraph">{formatNumber(oportunityData?.comission)}</p>
                </Grid>

                <Grid item xs={12} md={4}>
                  <p className="label">Fecha de creacion</p>
                  <p className="paragraph">{formatDate(oportunityData?.createdAt)}</p>
                </Grid>

                <Grid item xs={12} md={4}>
                  <p className="label">Fecha estimada de cierre</p>
                  <p className="paragraph">{formatDate(oportunityData?.estimatedclossing)}</p>
                </Grid>
              </Grid>

              <div className="divider" />

              <div className="drawer_container__products">
                <div className="drawer_container__products__top">
                  <div className="drawer_container__products__top__title">
                    <p>Productos</p>
                  </div>
                </div>

                <div className="drawer_container__products__containercards">
                  {products.map((item, index) => {
                    return (
                      <div key={index} className="drawer_container__products__containercards__card">
                        <p className="title">{item.product.name}</p>
                        <p className="code">Codigo: {item.product.name}</p>
                        <p className="code">
                          Precio unitario: {item.newprice == 0 ? item?.product.callamount : formatNumber(item.newprice)}
                        </p>
                        <p className="code">Cantidad: {item.quantity}</p>
                        <p className="code">Nota: {item.note}</p>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </Grid>
        );
      case 1:
        return (
          <Grid container className="preview">
            <Grid item xs={12} md={12} className="preview__pdf">
              {oportunityData?.quoteurl !== "" ? (
                <iframe src={oportunityData?.quoteurl} width="100%" height="780px"></iframe>
              ) : (
                <div className="body_empty">
                  <div className="message_ctr">
                    <img src="/empty_table.svg" />
                    <p>No hay datos</p>
                  </div>
                </div>
              )}
            </Grid>
          </Grid>
        );
        break;
      default:
        break;
    }
  };

  if (!oportunityData) return null;

  return (
    <DrawerStyled open={open} anchor="right" onClose={() => setOpen(!open)}>
      <div className="drawer_container">
        <div className="drawer_container__top">
          <div className="drawer_container__top__title">
            <p>Cotización</p>
          </div>

          <Box display="flex">
            <div className="drawer_container__top__close">
              <Button
                variant="contained"
                color="primary"
                className="btn_view"
                style={{ marginRight: 12 }}
                onClick={() => setShowTemplates(!showTemplates)}
                startIcon={<PictureAsPdfOutlined />}
                type="submit"
              >
                Generar
              </Button>
            </div>
            <div className="drawer_container__top__close">
              {isCreatingPdf ? (
                <p>Creando PDF</p>
              ) : (
                <Button
                  variant="contained"
                  color="primary"
                  className="btn_view"
                  style={{ marginRight: 12 }}
                  onClick={() => {
                    window.open(`${oportunityData.quoteurl}`, "_blank");
                  }}
                  startIcon={<PictureAsPdfOutlined />}
                  type="submit"
                >
                  Imprimir
                </Button>
              )}
            </div>
            <div className="drawer_container__top__close">
              {roleId !== "administrador_de_ventas" && (
                <Button
                  onClick={() => {
                    router.push({
                      pathname: "/clientes/nuevo",
                      query: {
                        p: oportunityData.prospectId,
                        o: oportunityData.id,
                      },
                    });
                  }}
                  variant="contained"
                  color="primary"
                  className="btn_view"
                >
                  Convertir A Venta
                </Button>
              )}
            </div>
          </Box>
        </div>

        <motion.div
          className="drawer_container__selecttemplate"
          animate={{
            height: showTemplates ? "auto" : 0,
            visibility: showTemplates ? "visible" : "hidden",
          }}
        >
          <div className="row ">
            {templates.map((item, index) => {
              return (
                <div
                  className={`${templateSelected == index ? "active" : ""}`}
                  onClick={() => setTemplateSelected(index)}
                  key={item.img}
                >
                  <img src={item.img} width="160" />
                </div>
              );
            })}
          </div>

          <div className="actions">
            <Button
              disabled={isCreatingPDF}
              variant="outlined"
              color="primary"
              className="cancel"
              onClick={() => setShowTemplates(false)}
            >
              cancelar
            </Button>
            <Button
              disabled={isCreatingPDF}
              onClick={() => generateAgainQuote()}
              variant="outlined"
              color="primary"
              className="cancel"
            >
              Generar Documento
            </Button>
            <Button
              disabled={isCreatingPDF}
              onClick={() => generateAgainQuoteAndSave()}
              variant="outlined"
              color="primary"
            >
              Generar y Actualizar oportunidad
            </Button>
          </div>
        </motion.div>

        <div className="tabs">
          <Button
            onClick={() => {
              setTabOption(0);
            }}
            className={tabOption == 0 ? "button_selected" : ""}
            startIcon={tabOption == 0 && <Note />}
          >
            Cotización
          </Button>
          <Button
            startIcon={tabOption == 1 && <Visibility />}
            className={tabOption == 1 ? "button_selected" : ""}
            onClick={() => {
              setTabOption(1);
            }}
          >
            Vista Previa
          </Button>
        </div>
        <div className="dividerTabs" />
        {RenderQuote()}
      </div>
    </DrawerStyled>
  );
}
