import { Dialog } from "@material-ui/core";
import React from "react";

export default function ModalLimenka({ custom = true, children, open, handletoogle }) {
  return (
    <Dialog
      open={open}
      keepMounted
      onClose={handletoogle}
      aria-labelledby="alert-dialog-slide-title"
      aria-describedby="alert-dialog-slide-description"
    >
      {custom && children}
    </Dialog>
  );
}
