import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { IconButton } from "@mui/material";
import { Add } from "@material-ui/icons";

export default function IncrementAnimation() {
  const [show, setShow] = useState(false);

  const handleClick = () => {
    setShow(true);
    setTimeout(() => setShow(false), 800); // Desaparece tras 800ms
  };

  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div style={{ position: "relative" }}>
        <IconButton onClick={handleClick}>
          <Add />
        </IconButton>

        <AnimatePresence>
          {show && (
            <motion.div
              key="plusMeta"
              initial={{ opacity: 0, y: 0, scale: 0.8 }}
              animate={{ opacity: 1, y: -40, scale: 1 }}
              exit={{ opacity: 0, y: -70, scale: 0.9 }}
              transition={{ duration: 0.5 }}
              style={{
                position: "absolute",
                top: -10,
                left: "50%",
                transform: "translateX(-50%)",
                backgroundColor: "#4caf50",
                color: "white",
                padding: "4px 12px",
                borderRadius: "12px",
                fontWeight: 600,
                fontSize: "1rem",
                whiteSpace: "nowrap",
                pointerEvents: "none",
                boxShadow: "0 2px 6px rgba(0,0,0,0.2)",
              }}
            >
              +1 a tu meta
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
