import React from "react";
import { motion } from "framer-motion";

export default function AnimationInputOutput({ key, children }) {
  return (
    <motion.div
      key={key}
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 50 }}
      transition={{ duration: 0.5 }}
    >
      {children}
    </motion.div>
  );
}
