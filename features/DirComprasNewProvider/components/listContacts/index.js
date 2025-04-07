import React from "react";
import { ContactContainer } from "./styles";
import { Delete, FiberManualRecord } from "@material-ui/icons";

export default function ListContacts({ allContact, removeContact, }) {
  const validator = data => {
    if (data != null && data != "null null" && data != "") {
      return data.trim();
    } else {
      return "N/A";
    }
  };
  return (
    <div className="cardsDirection">
      {allContact?.length === 0 && <p className="notFound">No hay contactos agregados.</p>}
      {allContact?.map((contact, index) => (
        <ContactContainer key={index}>
          <div className="directionIndex">
            <div className="titleDirectionCount">
              <FiberManualRecord className="fire" />
              <p>{`Contacto: ${index + 1}`}</p>
            </div>
            <Delete className="deleteIcon" onClick={() => removeContact(index)} />
          </div>

          <p className="data">
            Nombre: <strong>{validator(contact?.name)}</strong>
          </p>
          <p className="data">
            Apellido: <strong>{validator(contact?.lastname)}</strong>
          </p>
          <p className="data">
            Correo: <strong>{validator(contact?.email)}</strong>
          </p>
          <p className="data">
            Telefono <strong>{validator(contact?.phone)}</strong>
          </p>
          <p className="data">
            Telefono Opcional <strong>{validator(contact?.optionalophone)}</strong>
          </p>
          <p className="data">
            Relacion: <strong>{validator(contact?.relation)}</strong>
          </p>
        </ContactContainer>
      ))}
    </div>
  );
}
