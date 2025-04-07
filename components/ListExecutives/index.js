import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fillExecutives, useExecutives } from "../../redux/slices/ejecutivosSlice";
import TableCustom from "../TableCustom";

export default function ListExecutives() {
  const { executives, isFetching } = useSelector(useExecutives);

  return (
    <div>
      {isFetching ? null : (
        <TableCustom
          heads={["ID", "Nombre", "Apellido", "correo", "movil", "teléfono"]}
          data={executives}
          identificador={"id"}
          custom={true}
          primaryColor={"#405189"}
          secondaryColor={"#dce1f6"}
          selectmultiple={true}
          deleteItem={items => deleteItem(items)}
          keyJson="ID"
          actionsPerItem={[
            { title: "modificar", action: e => console.log(JSON.stringify(e)) },
            { title: "eliminar", action: e => deleteContact(e) },
          ]}
          actionsItemsSelect={[
            {
              title: "enviar correo múltiple",
              action: () => console.log("enviooo"),
            },
          ]}
          actionItem={action => action(action)}
        />
      )}
    </div>
  );
}
