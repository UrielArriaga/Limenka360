import React from "react";

export default function ModalHeader({ tipo, dateto }) {
  return (
    <div className="header-flex">
      <h1>{tipo}</h1>
      <p>{dateto}</p>
    </div>
  );
}
