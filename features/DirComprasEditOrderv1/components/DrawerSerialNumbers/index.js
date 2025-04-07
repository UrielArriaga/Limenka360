import { FormatListNumbered, Warning } from "@material-ui/icons";
import React from "react";
import { DrawerSerialNumbersStyled } from "./styles";
import { Button } from "@material-ui/core";

export default function DrawerSerialNumbers({
  open,
  handletoogle,
  productControl,
  addSerialNumers,
  serialNumbersbyProduct = [],
  // orderSelectedData,
  // handleOnChangeReason,
  // reasonSelected,
  // handleOnClickReject,
  // isSaving,
}) {
  // const { orderrejected } = useSelector(commonSelector);
  // const { getCatalogBy } = useGlobalCommons();

  const { productSelected, products } = productControl;
  return (
    <DrawerSerialNumbersStyled anchor="right" onClose={handletoogle} open={open}>
      <div className="title">
        <FormatListNumbered className="title__icon" />
        <p
          onClick={() => {
            console.log(products);
          }}
        >
          Numeros de serie
        </p>
      </div>

      <div className="input-serialnumbers">
        <label htmlFor=""> Ingresa los numeros de serie</label>
        <textarea
          value={productControl.textSerialsNumbers}
          onChange={e => productControl.seTextSerialsNumbers(e.target.value)}
          name="serialnumbers"
          id=""
        ></textarea>
      </div>
      <div className="flex-start-center">
        <Button variant="contained" color="primary" onClick={() => addSerialNumers()}>
          Agregar
        </Button>
      </div>

      {/* <pre>{JSON.stringify(productSelected, null, 2)}</pre> */}
      <div className="listserials">
        <h4>Numero seriales</h4>
        {/* <pre>{JSON.stringify(productControl.productSelected, null, 2)}</pre> */}

        <table>
          <thead>
            <tr>
              <th>Numero de Serie</th>
              <th>Acciones</th>
              {/* <th>Producto</th>
              <th>Entrada</th>
              <th>Acciones</th> */}
            </tr>
          </thead>
          <tbody>
            {serialNumbersbyProduct?.map((item, index) => {
              if (item.isdeleted === true) return null;
              return (
                <tr key={index}>
                  <td>{item.serialnumber}</td>
                  <td>
                    <button onClick={() => productControl.deleteSerialNumber(item)}>Eliminar</button>
                  </td>

                  {/* <td>
                {item.product?.model}

                <pre>{JSON.stringify(item.product)}</pre>
              </td>
              <td>{item.entry}</td>
              <td>
                <div className="fles">
                  <button>Editar</button>
                  <button>Eliminar</button>
                </div>
              </td> */}
                </tr>
              );
            })}
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
