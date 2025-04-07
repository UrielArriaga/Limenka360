import { FormatListNumbered, Warning } from "@material-ui/icons";
import React from "react";
import { DrawerSerialNumbersStyled } from "./styles";

export default function DrawerSerialNumbers({
  open,
  handletoogle,
  serialNumbersbyProduct = [
    {
      serialnumber: "123456789",
      product: "Producto 1",
    },
    {
      serialnumber: "123456789",
      product: "Producto 2",
    },
    {
      serialnumber: "123456789",
      product: "Producto 3",
    },
  ],
  // orderSelectedData,
  // handleOnChangeReason,
  // reasonSelected,
  // handleOnClickReject,
  // isSaving,
}) {
  // const { orderrejected } = useSelector(commonSelector);
  // const { getCatalogBy } = useGlobalCommons();

  return (
    <DrawerSerialNumbersStyled anchor="right" onClose={handletoogle} open={open}>
      <div className="title">
        <FormatListNumbered className="title__icon" />
        <p>Numeros de serie</p>
      </div>

      <div className="input-serialnumbers">
        <label htmlFor=""> Ingresa los numeros de serie</label>
        <textarea name="serialnumbers" id=""></textarea>
      </div>

      <div className="listserials">
        <h4>Numero seriales</h4>

        <table>
          <thead>
            <tr>
              <th>Numero de Serie</th>
              {/* <th>Producto</th>
              <th>Entrada</th>
              <th>Acciones</th> */}
            </tr>
          </thead>
          <tbody>
            {serialNumbersbyProduct.map((item, index) => (
              <tr key={index}>
                <td>{item.serialnumber}</td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* <div  className="listserials__item">


        </div>

        {serialNumbersbyProduct.map((p, index) => {
          return (
            <div key={index} className="listserials__item">
              <p>{p.product}</p>
            </div>
          );
        })} */}
      </div>

      {/* 
      <div className="description">
        <p className="description__message">
          El pedido con folio <span>{orderSelectedData?.folio}</span> sera marcado como rechazado
        </p>

        <div className="description__options">
          <Select
            maxMenuHeight={220}
            placeholder="Selecciona una opción"
            options={orderrejected.results}
            isLoading={orderrejected.isFetching}
            getOptionValue={option => `${option.id}`}
            getOptionLabel={option => `${option.reason}`}
            onMenuOpen={() => getCatalogBy("orderrejected")}
            onChange={handleOnChangeReason}
            value={reasonSelected}
          />
        </div>
      </div>

      <div className="actions">
        <Button className={`actions__cancel ${"disabled"}`} onClick={handletoogle}>
          Cancelar
        </Button>
        <Button
          variant="contained"
          color="primary"
          className={`actions__approved ${"disabled"}`}
          onClick={handleOnClickReject}
          disabled={isSaving}
        >
          Aceptar
        </Button>
      </div> */}
    </DrawerSerialNumbersStyled>
  );
}
