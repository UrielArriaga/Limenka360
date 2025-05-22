import React from "react";
import dayjs from "dayjs";

export default function ModalFooter({ onClose }) {
  return (
    <div className="footer">
      <span>{dayjs().format("DD [de] MMM. [de] YYYY hh:mm A")}</span>
      <div className="actions">
        <button className="cancel" type="button" onClick={onClose}>
          Cancelar
        </button>
        <button className="save" type="submit">
          Guardar
        </button>
      </div>
    </div>
  );
}
