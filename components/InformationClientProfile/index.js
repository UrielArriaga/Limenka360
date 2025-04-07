import React, { useState } from "react";
import { InfoStyled, LabelContainer, LindeDivider } from "./style";
import { Button, Collapse, Divider, Grid, Popover, Tooltip } from "@material-ui/core";
import { formatDate, formatLink } from "../../utils";
import { useSelector } from "react-redux";
import { commonSelector } from "../../redux/slices/commonSlice";
import dayjs from "dayjs";
import {
  AssignmentInd,
  Cancel,
  Edit,
  MailOutline,
  NavigateNext,
  PersonOutline,
  PersonOutlineOutlined,
  Phone,
  PhoneIphone,
  Room,
  Settings,
  TransferWithinAStation,
  WhatsApp,
  WorkOutline,
} from "@material-ui/icons";
import { userSelector } from "../../redux/slices/userSlice";
import { motion } from "framer-motion";
import { MenuWhats } from "../../styles/Clientes/cliente.styled";
import WhatsappV2 from "../WhatsappV2";
export default function InfoClient(props) {
  const { prospect, flag, setFlag, setOpenEdit, setprospectEdit, openEdit, setOpenReasign } = props;
  const { roleId } = useSelector(userSelector);
  const [anchorEl, setAnchorEl] = useState(null);
  const [showAll, setShowAll] = useState(false);
  const [openWhats, setOpenWhats] = useState(false);
  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;
  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };
  const handleCloseMenu = () => {
    setAnchorEl(null);
  };
  const handleEdit = () => {
    setprospectEdit(prospect);

    setOpenEdit(!openEdit);
  };

  const thereIsData = (data, type) => {
    if (data) {
      switch (type) {
        case "link":
          return <p className="dataLink">{formatLink(data)}</p>;
        case "date":
          return <p className="primary_paragraph">{formatDate(data)}</p>;
        default:
          return <p className="primary_paragraph">{data}</p>;
      }
    } else {
      return <span>N/A</span>;
    }
  };
  return (
    <InfoStyled>
      <div className="ctr_prospecto__info__ctr_title">
        <div className="ctr_prospecto__info__ctr_title__title">
          <PersonOutlineOutlined />
          <p>Datos del Cliente</p>
        </div>

        <Edit className="ctr_prospecto__info__ctr_title__edit" onClick={() => handleEdit()} />
      </div>
      <Grid container spacing={2} className="ctr_prospecto__info__data">
        <Grid item xs={12} md={4}>
          <p className="label">Nombre</p>
          <p className="primary_paragraph capitalize">
            <PersonOutline />
            {`${prospect?.name} ${prospect?.lastname}`}
          </p>
        </Grid>

        <Grid item xs={12} md={4}>
          <p className="label">Correo</p>
          <p className="primary_paragraph">
            <MailOutline />
            {prospect?.email}
          </p>
        </Grid>
        <Grid item xs={12} md={2}>
          <p className="label">Movil</p>
          <Tooltip title="Acciones" arrow>
            <p className="primary_paragraph sendMessage" onClick={handleClick}>
              <PhoneIphone />
              {prospect?.phone}
            </p>
          </Tooltip>
          <Popover
            id={id}
            open={open}
            anchorEl={anchorEl}
            onClose={handleCloseMenu}
            anchorOrigin={{
              vertical: "center",
              horizontal: "left",
            }}
            transformOrigin={{
              vertical: "center",
              horizontal: "right",
            }}
          >
            <MenuWhats>
              <div className="headerMenu">
                <p className="titleMenu">Acciones</p>
                <Settings className="headerMenu__icon" />
              </div>
              <Divider />

              <div onClick={() => setOpenWhats(true)} className="menuItem">
                <WhatsApp className="menuItem__icon" />
                <p className="menuItem__title">Enviar WhatsApp</p>
                <NavigateNext className="iconArrow" />
              </div>
            </MenuWhats>
          </Popover>
        </Grid>
        <Grid item xs={12} md={2}>
          <p className="label">Teléfono</p>
          {thereIsData(prospect?.optionalphone)}
        </Grid>
        {showAll && (
          <Grid item xs={12} md={4}>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
              <p className="label ">Codigo postal</p>
              {thereIsData(prospect?.postal?.postal_code)}
            </motion.div>
          </Grid>
        )}
        <Grid item xs={12} md={4}>
          <p className="label">Estado</p>
          <p className="primary_paragraph">
            <Room /> {prospect?.entity?.name}
          </p>
        </Grid>
        <Grid item xs={12} md={4}>
          <p className="label">Ciudad / Municipio</p>
          {prospect?.city ? (
            <p className="primary_paragraph">
              <Room /> {prospect?.city?.name}
            </p>
          ) : (
            <span>N/A</span>
          )}
        </Grid>
        {showAll && (
          <>
            <Grid item xs={12} md={4}>
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
                <p className="label ">Calle</p>
                {thereIsData(prospect?.street)}
              </motion.div>
            </Grid>
            <Grid item xs={12} md={4}>
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
                <p className="label ">Colonia</p>
                {thereIsData(prospect?.postal?.settlement)}
              </motion.div>
            </Grid>
            <Grid item xs={12} md={2}>
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
                <p className="label ">Empresa</p>
                {thereIsData(prospect?.clientcompany?.company)}
              </motion.div>
            </Grid>
            <Grid item xs={12} md={2}>
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
                <p className="label">Origen</p>
                {thereIsData(prospect?.origin?.name)}
              </motion.div>
            </Grid>
            <Grid item xs={12} md={4}>
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
                <p className="label">Fase</p>

                {thereIsData(prospect?.phase?.name)}
              </motion.div>
            </Grid>
            <Grid item xs={12} md={4}>
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
                <p className="label">Equipo de Interés</p>
                {thereIsData(prospect?.product)}
              </motion.div>
            </Grid>
            <Grid item xs={12} md={2}>
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
                <p className="label">Categoria de Interés</p>
                {thereIsData(prospect?.category?.name)}
              </motion.div>
            </Grid>
          </>
        )}

        <Grid item xs={12} md={2}>
          <p className="label">Tipo de Cliente</p>
          {prospect?.clienttype ? (
            <p className="primary_paragraph capitalize">
              <AssignmentInd />
              {prospect?.clienttype?.name}
            </p>
          ) : (
            <span>N/A</span>
          )}
        </Grid>
        {showAll && (
          <>
            <Grid item xs={12} md={4}>
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
                <p className="label">Género</p>
                {thereIsData(prospect?.gender)}
              </motion.div>
            </Grid>
            <Grid item xs={12} md={4}>
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
                <p className="label">Especialidad</p>
                {prospect?.specialtyId ? (
                  <p className="primary_paragraph">
                    <WorkOutline />
                    {prospect?.specialty?.name}
                  </p>
                ) : (
                  <span>N/A</span>
                )}
              </motion.div>
            </Grid>
            <Grid item xs={12} md={2}>
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
                <p className="label">Fecha de creación</p>
                {thereIsData(prospect?.createdAt, "date")}
              </motion.div>
            </Grid>
            <Grid item xs={12} md={2}>
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
                <p className="label">Ultima actualización</p>
                <p className="paragraph">{formatDate(prospect?.updatedAt)}</p>
              </motion.div>
            </Grid>
            <Grid item xs={12} md={4}>
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
                <p className="label">Canal</p>
                {thereIsData(prospect?.channel?.name)}
              </motion.div>
            </Grid>
            <Grid item xs={12} md={4}>
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
                <p className="label">Web</p>
                {thereIsData(prospect?.url, "link")}
              </motion.div>
            </Grid>
            <Grid item xs={12} md={4}>
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
                <p className="label">Facebook</p>

                {thereIsData(prospect?.facebook, "link")}
              </motion.div>
            </Grid>
            <Grid item xs={12} md={4}>
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
                <p className="label">Google Maps</p>
                {thereIsData(prospect?.location, "link")}
              </motion.div>
            </Grid>

            <Grid item xs={12} md={4}>
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
                <p className="label">Observaciones</p>
                {thereIsData(prospect?.observations)}
              </motion.div>
            </Grid>
          </>
        )}

        <Grid item xs={12}>
          <div className="oportunity">
            <p onClick={() => setShowAll(!showAll)} className="view">
              {showAll ? " Ocultar datos" : "Ver mas"}
            </p>
            {roleId !== "ejecutivo" && (
              <Button variant="contained" color="secondary" onClick={() => setOpenReasign(true)} className="bt_reasign">
                <TransferWithinAStation />
                <p>Reasignar</p>
              </Button>
            )}
          </div>
        </Grid>
      </Grid>
      <WhatsappV2
        flag={flag}
        setFlag={setFlag}
        openWhats={openWhats}
        setOpenWhats={setOpenWhats}
        prospect={prospect}
        isOportunity={false}
        isClient={true}
        isProspect={false}
        handleCloseMenu={handleCloseMenu}
      />
    </InfoStyled>
  );
}
