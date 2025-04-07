import React from "react";
import { Button } from "@material-ui/core";
import { motion } from "framer-motion";
import { Add } from "@material-ui/icons";

const OrderButtons = ({
  purcharseOrdersToPickups,
  handleAddToOrder,
  setPurcharseOrdersToPickups,
  setSelectAll,
  setSelectedProvider,
}) => {
  return (
    <>
      {purcharseOrdersToPickups?.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 50 }}
          transition={{ duration: 0.5 }}
          className="OrderAdd"
        >
          <Button className="ButtonAdd" startIcon={<Add />} onClick={() => handleAddToOrder(purcharseOrdersToPickups)}>
            Agregar a Orden
          </Button>
          <Button
            className="cancel"
            onClick={() => {
              setPurcharseOrdersToPickups([]);
              setSelectAll(false);
              setSelectedProvider("");
            }}
          >
            Cancelar
          </Button>
          <p className="totalSelected">Productos seleccionados ({purcharseOrdersToPickups.length})</p>
        </motion.div>
      )}
    </>
  );
};

export default OrderButtons;
