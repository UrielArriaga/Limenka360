import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AttachMoneyIcon from "@material-ui/icons/AttachMoney";
import CalendarTodayIcon from "@material-ui/icons/CalendarToday";
import CheckCircleOutlineIcon from "@material-ui/icons/CheckCircleOutline";

import ArrowDownwardIcon from "@material-ui/icons/ArrowDownward";
import { motion } from "framer-motion";
import { Add } from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({
  container: {
    borderRadius: theme.spacing(1),
    boxShadow: theme.shadows[2],
    overflow: "hidden",
    width: "90%",
  },
  header: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.common.white,
    padding: theme.spacing(2),
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  headerTitle: {
    fontWeight: "bold",
  },
  list: {
    padding: 0,
    margin: 0,
    listStyle: "none",
  },
  listItem: {
    padding: theme.spacing(2),
    display: "grid",
    gridTemplateColumns: "2fr 1fr 1.5fr 1.5fr",
    alignItems: "center",
    borderBottom: `1px solid ${theme.palette.divider}`,
    "&:last-child": {
      borderBottom: "none",
    },
    backgroundColor: theme.palette.background.paper,
  },
  listItemOdd: {
    backgroundColor: theme.palette.action.hover,
  },
  clientName: {
    fontWeight: 500,
  },
  amount: {
    display: "flex",
    alignItems: "center",
    gap: theme.spacing(0.5),
    justifyContent: "flex-end",
  },
  date: {
    display: "flex",
    alignItems: "center",
    gap: theme.spacing(0.5),
    justifyContent: "flex-end",
  },
  certainty: {
    display: "flex",
    alignItems: "center",
    gap: theme.spacing(0.5),
    justifyContent: "flex-end",
  },
  highCertainty: {
    color: theme.palette.success.main,
  },
  mediumCertainty: {
    color: theme.palette.warning.main,
  },
  lowCertainty: {
    color: theme.palette.error.main,
  },
}));

// Datos de ejemplo (simulando la respuesta de tu API)
const sampleOpportunities = [
  {
    oportunidad_id: "OPP-2025-001",
    nombre_cliente: "Ana López",
    valor_estimado: 15000.0,
    fecha_cierre_prevista: "2025-04-22T17:00:00-05:00",
    probabilidad_cierre: 0.9,
  },
  {
    oportunidad_id: "OPP-2025-003",
    nombre_cliente: "Carlos Pérez",
    valor_estimado: 8500.0,
    fecha_cierre_prevista: "2025-04-25T12:30:00-05:00",
    probabilidad_cierre: 0.75,
  },
  {
    oportunidad_id: "OPP-2025-002",
    nombre_cliente: "Sofía Gómez",
    valor_estimado: 22000.0,
    fecha_cierre_prevista: "2025-04-28T10:00:00-05:00",
    probabilidad_cierre: 0.85,
  },
  {
    oportunidad_id: "OPP-2025-005",
    nombre_cliente: "Javier Vargas",
    valor_estimado: 3200.0,
    fecha_cierre_prevista: "2025-04-30T14:45:00-05:00",
    probabilidad_cierre: 0.6,
  },
  {
    oportunidad_id: "OPP-2025-004",
    nombre_cliente: "Elena Ruiz",
    valor_estimado: 11750.0,
    fecha_cierre_prevista: "2025-05-03T09:15:00-05:00",
    probabilidad_cierre: 0.7,
  },
];

const OpportunitiesList = ({ opportunities = sampleOpportunities }) => {
  const classes = useStyles();

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("es-MX", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("es-MX", {
      style: "currency",
      currency: "MXN",
    }).format(amount);
  };

  const getCertaintyIcon = (certainty) => {
    if (certainty >= 0.8) {
      return <CheckCircleOutlineIcon className={classes.highCertainty} />;
    } else if (certainty >= 0.6) {
      return <Add className={classes.mediumCertainty} />;
    } else {
      return <ArrowDownwardIcon className={classes.lowCertainty} />;
    }
  };

  const getCertaintyText = (certainty) => {
    const percentage = Math.round(certainty * 100);
    if (percentage >= 80) {
      return `Alta (${percentage}%)`;
    } else if (percentage >= 60) {
      return `Media (${percentage}%)`;
    } else {
      return `Baja (${percentage}%)`;
    }
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { delayChildren: 0.2, staggerChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -10 },
    visible: { opacity: 1, x: 0 },
  };

  return (
    <motion.div
      className={classes.container}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <div className={classes.header}>
        <div className={classes.headerTitle}>
          Oportunidades Próximas a Cerrarse
        </div>
      </div>
      <ul className={classes.list}>
        {opportunities.map((opportunity, index) => (
          <motion.li
            key={opportunity.oportunidad_id}
            className={`${classes.listItem} ${
              index % 2 !== 0 ? classes.listItemOdd : ""
            }`}
            variants={itemVariants}
          >
            <div className={classes.clientName}>
              {opportunity.nombre_cliente}
            </div>
            <div className={classes.amount}>
              <AttachMoneyIcon size="small" />{" "}
              {formatCurrency(opportunity.valor_estimado)}
            </div>
            <div className={classes.date}>
              <CalendarTodayIcon size="small" />{" "}
              {formatDate(opportunity.fecha_cierre_prevista)}
            </div>
            <div className={classes.certainty}>
              {getCertaintyIcon(opportunity.probabilidad_cierre)}
              {getCertaintyText(opportunity.probabilidad_cierre)}
            </div>
          </motion.li>
        ))}
      </ul>
    </motion.div>
  );
};

export default OpportunitiesList;
