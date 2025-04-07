import React from "react";

import { Delete, FiberManualRecord } from "@material-ui/icons";
import { ContactContainer } from "./styles";

export default function ViewContactsProviders({ dataContacts }) {
  const validator = data => {
    if (data != null && data != "null null" && data != "") {
      return data.trim();
    } else {
      return "N/A";
    }
  };
  return (
    <div className="cardsDirection">
      {dataContacts?.isfetching && <p>Cargando</p>}
      {!dataContacts?.isfetching && dataContacts?.data?.length === 0 && <p className="notFound">No hay contactos.</p>}
      {!dataContacts?.isfetching &&
        dataContacts?.data?.map((contact, index) => (
          <ContactContainer key={index}>
            <div className="directionIndex">
              <div className="titleDirectionCount">
                <FiberManualRecord className="fire" />
                <p>{`Contacto: ${index + 1}`}</p>
              </div>
            </div>

            <p className="data">
              Nombre: <strong>{validator(contact?.name)}</strong>
            </p>
            <p className="data">
              Apellido: <strong>{validator(contact?.lastname)}</strong>
            </p>
            <p className="data">
              Telefono: <strong>{validator(contact?.phone)}</strong>
            </p>
            <p className="data">
              Correo: <strong>{validator(contact?.email)}</strong>
            </p>
            <p className="data">
              Telefono opcional: <strong>{validator(contact?.optionalophone)}</strong>
            </p>
            <p className="data">
              Parentesco: <strong>{validator(contact?.relation)}</strong>
            </p>
          </ContactContainer>
        ))}
    </div>
  );
}
