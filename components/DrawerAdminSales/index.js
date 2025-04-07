import { Button, Drawer } from "@material-ui/core";
import styled from "styled-components";
import React, { useEffect, useState } from "react";
import { AttachMoney, PersonOutlineOutlined, Timeline } from "@material-ui/icons";
import { formatDate, formatLink } from "../../utils";
import Link from "@material-ui/core/Link";
import { api } from "../../services/api";
import Target from "../UI/molecules/Target";
import LoadingImage from "../UI/atoms/LoadingImage";
import PreviewCuote from "../DrawerPreview";

const DrawerAdminSales = ({
  open,
  setOpen,
  prospectId,
  dataOpo,
  handleMakeOrder,
  setOpenpreview,
  setOportunitySelect,
}) => {
  const [loadingPdf, setLoadingpdf] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [prospectInfo, setProspectInfo] = useState({
    arrayInfo: [],
    arrayMoreInfo: [],
    moreInfo: false,
    prospect: null,
    opoSelected: [],
  });

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        if (prospectId && dataOpo) {
          const [prospectResponse, opoResponse] = await Promise.all([
            api.get(`prospects/${prospectId}`, {
              params: { include: "postal,entity,city,clientcompany,origin,phase,clienttype,specialty" },
            }),
            api.get(`oportunities/${dataOpo.id}`, {
              params: { include: "productsoportunities,productsoportunities.product" },
            }),
          ]);

          const prospectData = prospectResponse.data;
          const opoData = opoResponse.data;

          console.log("opo data:", opoData);
          console.log("pros data:", prospectData);

          const arrayInfo = constructArrayInfo(prospectData);
          const arrayMoreInfo = constructArrayMoreInfo(prospectData);

          setProspectInfo({
            ...prospectInfo,
            prospect: prospectData,
            arrayInfo,
            arrayMoreInfo,
            opoSelected: [opoData],
          });
        }
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [prospectId, dataOpo]);

  const constructArrayInfo = prospect => {
    return [
      { label: "Nombre", value: prospect.fullname, classname: "capitalize" },
      { label: "Correo", value: prospect.email, classname: "valuepharagraph" },
      { label: "Teléfono", value: prospect.phone, classname: "valuepharagraph" },
      { label: "Teléfono Opcional", value: prospect.optionalphone || "N/A" },
      { label: "Código Postal", value: prospect.postal?.postal_code || "N/A" },
      { label: "Estado", value: prospect.entity?.name },
      { label: "Ciudad / Municipio", value: prospect.city?.name || "N/A" },
      { label: "Calle", value: prospect.street || "N/A" },
      { label: "Colonia", value: prospect.postal?.settlement || "N/A" },
    ];
  };

  const constructArrayMoreInfo = prospect => {
    return [
      { title: "Empresa", value: prospect.clientcompany?.company || "N/A" },
      { title: "Origen", value: prospect.origin?.name },
      { title: "Fase", value: prospect.phase?.name },
      { title: "Equipo de Interés", value: prospect.product || "N/A" },
      { title: "Tipo de Cliente", value: prospect.clienttype?.name || "N/A" },
      { title: "Genero", value: prospect.gender || "N/A" },
      { title: "Especialidad", value: prospect.specialty?.name || "N/A" },
      { title: "Fecha de creación", value: formatDate(prospect.createdAt) },
      { title: "Ultima actualización", value: formatDate(prospect.updatedAt) },
      { title: "Web", value: prospect.url ? formatLink(prospect.url) : "N/A" },
      { title: "Facebook", value: prospect.facebook ? formatLink(prospect.facebook) : "N/A" },
      { title: "Google Maps", value: prospect.location ? formatLink(prospect.location) : "N/A" },
      { title: "Observaciones", value: prospect.observations || "N/A" },
    ];
  };

  const handleDownloadFile = async item => {
    try {
      setLoadingpdf(true);
      let typeFile = item?.quoteurl?.split(".").pop();
      let typeFileName = item?.quoteurl.split("/").pop();
      let responseURLSave = await api.post(
        "convert/pdfbuffer",
        {
          pdfurl: item?.quoteurl,
        },
        {
          responseType: "blob",
        }
      );
      const pdfBlob = new Blob([responseURLSave.data], {
        type: `application/${typeFile};charset=utf-8`,
      });
      saveAs(pdfBlob, `${typeFileName}`);
      setLoadingpdf(false);
    } catch (error) {
      setLoadingpdf(false);
      console.log(error);
    }
  };

  const handleOpenPreview = item => {
    setOportunitySelect(prospectInfo.opoSelected);
    setOpenpreview(true);
  };

  return (
    <DrawerStyled
      anchor={"right"}
      open={open}
      onClose={() => {
        setOpen(false);
      }}
    >
      {isLoading ? (
        <LoadingImage />
      ) : (
        <div className="container">
          <div className="containerButtons">
            <div>
              <p className="title">Venta</p>
            </div>

            <div>
              <Button
                size="small"
                variant="contained"
                color="primary"
                style={{ marginRight: "10px" }}
                onClick={() => {
                  handleMakeOrder(dataOpo);
                  // handleCloseActionsRow();
                }}
              >
                {dataOpo?.isorder ? "Ver Pedido" : "Realizar Pedido"}
              </Button>
              <Button
                size="small"
                variant="contained"
                color="primary"
                style={{ marginRight: "10px" }}
                onClick={() => handleOpenPreview()}
              >
                Ver Cotización
              </Button>
              <Button
                size="small"
                variant="contained"
                color="primary"
                onClick={() => handleDownloadFile(prospectInfo.opoSelected[0])}
              >
                Descargar Cotización
              </Button>
            </div>
          </div>

          <div className="titleContainer">
            <div className="icono">
              <PersonOutlineOutlined />
            </div>
            <p className="title">Datos Prospecto</p>
          </div>

          <div className="datos">
            {prospectInfo.arrayInfo.map((data, index) => (
              <div key={index}>
                <p>{data.label}</p>
                {data.value ? <p className={`value ${data.classname}`}>{data.value}</p> : <span>N/A</span>}
              </div>
            ))}
            {prospectInfo.moreInfo &&
              prospectInfo.arrayMoreInfo.map((section, index) => (
                <div key={index}>
                  <p>{section.title}</p>
                  {section.value ? <p className="value">{section.value}</p> : <span>N/A</span>}
                </div>
              ))}
          </div>

          <Link
            className="moreInfo"
            color="primary"
            onClick={() => setProspectInfo(prevState => ({ ...prevState, moreInfo: !prevState.moreInfo }))}
          >
            {prospectInfo.moreInfo ? "Ocultar datos" : "Ver más"}
          </Link>

          <div className="divider" />

          <div className="titleContainer">
            <div className="icono">
              <AttachMoney />
            </div>
            <p className="title">Datos Venta</p>
          </div>

          <div className="datos">
            <div>
              <p>Concepto</p>
              {dataOpo?.concepto ? <p className={`value`}>{dataOpo.concepto}</p> : <span>N/A</span>}
            </div>
            <div>
              <p>Monto Total</p>
              {dataOpo?.["monto total"] ? <p className={`value`}>{dataOpo?.["monto total"]}</p> : <span>N/A</span>}
            </div>
            <div>
              <p>Comisión Total</p>
              {dataOpo?.["comisión total"] ? (
                <p className={`value`}>{dataOpo?.["comisión total"]}</p>
              ) : (
                <span>N/A</span>
              )}
            </div>
          </div>

          <div className="divider" />

          <div className="titleContainer">
            <div className="icono">
              <Timeline />
            </div>
            <p className="title">Productos Vendidos</p>
          </div>

          <Target products={prospectInfo.opoSelected[0]?.productsoportunities.slice(0, 6)} />
        </div>
      )}
    </DrawerStyled>
  );
};

export default DrawerAdminSales;

export const DrawerStyled = styled(Drawer)`
  .MuiPaper-root.MuiDrawer-paper.MuiDrawer-paperAnchorRight.MuiPaper-elevation16 {
    width: 50%;
    padding: 20px;
    overflow-y: auto;
    @media (max-width: 600px) {
      width: 100%;
    }
    ::-webkit-scrollbar {
      width: 6px;
      height: 6px;
    }
    ::-webkit-scrollbar-track {
      -webkit-box-shadow: inset 0 0 6px rgb(166 164 164 / 20%);
    }
    ::-webkit-scrollbar-thumb {
      -webkit-box-shadow: inset 0 0 20px #585858;
    }
  }
  .MuiBackdrop-root {
    backdrop-filter: blur(10px);
  }

  .containerButtons {
    display: flex;
    justify-content: space-between;
  }

  .titleContainer {
    display: flex;
    align-items: center;
    margin: 5px;
  }
  .title {
    font-size: 16px;
    font-weight: bold;
  }
  .icono {
    width: 30px;
    height: 30px;
    padding: 3px;
    margin-right: 5px;
    background: #dce1f6;
    color: #0c203b;
    border-radius: 50%;
  }

  .datos {
    display: grid;
    grid-template-columns: auto auto auto;
    margin-top: 20px;

    .capitalize {
      text-transform: capitalize;
    }

    div {
      margin-bottom: 20px;
      padding: 8px;
    }

    p {
      font-size: 13px;
      font-weight: bold;
      color: #4f4f4f;
    }

    .value {
      font-size: 16px;
      font-weight: 500;
      color: #000;
    }
    .valuepharagraph {
      font-size: 16px;
      font-weight: 500;
      color: #2979ff;
    }
    span {
      color: #d1d1d1;
      font-size: 12px;
      font-weight: 500;
    }

    @media (max-width: 1100px) {
      grid-template-columns: auto auto;
    }

    @media (max-width: 900px) {
      grid-template-columns: auto;
    }
  }

  .moreInfo {
    margin: 10px;
  }

  .divider {
    margin-top: 15px;
    margin-bottom: 15px;
    border-bottom: 1.5px solid #f1f1f1;
  }

  .ctr_load {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100vh;
    &__img {
      width: 150px;
      animation: slide 3s infinite;
      img {
        width: 100%;
        object-fit: contain;
      }
    }
    &__load {
      display: flex;
      flex-direction: column;
      justify-content: center;
      line-height: 30px;
      width: 200px;
      p {
        text-align: center;
        font-weight: bold;
      }
    }
    @keyframes slide {
      0% {
        transform: translateY(0px);
      }
      50% {
        transform: translateY(10px);
      }
      100% {
        transform: translateY(0px);
      }
    }
  }
`;
