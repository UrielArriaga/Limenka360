import React, { useState, useEffect } from "react";
import { AttachMoney, PersonOutlineOutlined, Timeline } from "@material-ui/icons";
import Button from "@material-ui/core/Button";
import Link from "@material-ui/core/Link";
import { useRouter } from "next/router";
import { formatDate, formatLink } from "../../utils";
import PreviewCuote from "../DrawerPreview";
import { api } from "../../services/api";
import LoadingImage from "../UI/atoms/LoadingImage";
import { DrawerStyled } from "./styles";
import Target from "../UI/molecules/Target";
import PaymentCard from "../UI/molecules/PaymentCard";
import ButtonClose from "../ButtonClose";

export default function DrawerPagos({
  load,
  openDrawerPagos,
  setOpenDrawerPagos,
  dataDrawerPagos,
  oportunityId,
  recharge,
}) {
  const [selectedPayments, setSelectedPayments] = useState();
  const [arrayInfo, setArrayInfo] = useState([]);
  const [arrayMoreInfo, setArrayMoreInfo] = useState([]);
  const [openpreview, setOpenpreview] = useState(false);
  const [oportunitiesSelect, setOportunitiesSelect] = useState([]);
  const [moreInfo, setMoreInfo] = useState(false);
  const router = useRouter();

  if (dataDrawerPagos) {
    var { prospect } = dataDrawerPagos;
  }

  useEffect(() => {
    if (prospect) {
      setArrayInfo([
        { label: "Nombre", value: `${prospect.name} ${prospect.lastname}`, classname: "capitalize" },
        { label: "Correo", value: prospect.email, classname: "valuepharagraph" },
        { label: "Teléfono", value: prospect.phone, classname: "valuepharagraph" },
        { label: "Teléfono Opcional", value: prospect.optionalphone || "N/A" },
        { label: "Código Postal", value: prospect.postal?.postal_code || "N/A" },
        { label: "Estado", value: prospect.entity?.name },
        { label: "Ciudad / Municipio", value: prospect.city?.name || "N/A" },
        { label: "Calle", value: prospect.street || "N/A" },
        { label: "Colonia", value: prospect.postal?.settlement || "N/A" },
      ]);
      setArrayMoreInfo([
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
      ]);
    }
  }, [prospect]);

  useEffect(() => {
    if (oportunityId != undefined) {
      getQuotesPreview();
    }
  }, [oportunityId]);

  useEffect(() => {
    getPayments();
  }, [oportunityId, recharge]);

  const functionActiveteSeeFullPayment = () => {
    if (selectedPayments !== undefined) {
      router.push({
        pathname: `/pagos/pago_completo/`,
        query: { i: selectedPayments[0].id, o: selectedPayments[0].oportunityId },
      });
    }
  };

  const getQuotesPreview = async () => {
    try {
      const { data } = await api.get(`oportunities/${oportunityId}`, {
        params: {
          include: "productsoportunities,productsoportunities.product",
        },
      });
      setOportunitiesSelect([data]);
    } catch (error) {
      setOportunitiesSelect([]);
      console.log(error);
    }
  };

  const getPayments = async () => {
    try {
      const { data } = await api.get(`salespayments`, {
        params: { where: { oportunityId: oportunityId }, order: "date" },
      });
      setSelectedPayments(data.results);
    } catch (error) {
      setSelectedPayments();
      console.log(error);
    }
  };

  return (
    <DrawerStyled anchor={"right"} open={openDrawerPagos} onClose={() => setOpenDrawerPagos(false)}>
      {load ? (
        <LoadingImage />
      ) : (
        <>
          <ButtonClose close={() => setOpenDrawerPagos(false)} />
          <div className="ctr_information">
            <div className="titulo">
              <p>Pago</p>
              <Button size="small" variant="contained" color="primary" onClick={() => functionActiveteSeeFullPayment()}>
                Ver pago completo
              </Button>
              <Button size="small" variant="contained" color="primary" onClick={() => setOpenpreview(!openpreview)}>
                Ver Cotización
              </Button>
            </div>

            <div className="divider" />

            <div className="icon">
              <PersonOutlineOutlined />
              <p>Datos Prospecto</p>
            </div>

            {dataDrawerPagos && (
              <div className="datos">
                {arrayInfo.map((data, index) => (
                  <div key={index}>
                    <p>{data.label}</p>
                    {data.value ? <p className={`value ${data.classname}`}>{data.value}</p> : <span>N/A</span>}
                  </div>
                ))}
                {moreInfo &&
                  arrayMoreInfo.map((section, index) => (
                    <div key={index}>
                      <p>{section.title}</p>
                      {section.value ? <p className="value">{section.value}</p> : <span>N/A</span>}
                    </div>
                  ))}
              </div>
            )}

            <Link className="moreInfo" color="primary" onClick={() => setMoreInfo(!moreInfo)}>
              {moreInfo ? "Ocultar datos" : "Ver más"}
            </Link>

            <div className="divider" />

            <div className="icon">
              <Timeline />
              <p>Productos Cotizados</p>
            </div>

            <Target products={oportunitiesSelect[0]?.productsoportunities.slice(0, 6)} />

            <div className="divider" />

            <div className="icon">
              <AttachMoney />
              <p onClick={() => getPayments()}>Todos los Pagos</p>
            </div>

            <PaymentCard payment={selectedPayments} />
          </div>
        </>
      )}

      <PreviewCuote open={openpreview} setOpen={setOpenpreview} oportunitySelect={oportunitiesSelect} />
    </DrawerStyled>
  );
}
