import React from "react";
import { SortableContainer, SortableElement } from "react-sortable-hoc";
import { formatNumber } from "../../../utils";
import { Box, Tooltip } from "@material-ui/core";
import { Delete, Edit } from "@material-ui/icons";

const SortableItem = SortableElement(({ value, index, handleSelectProduct, deleteItem }) => (
  <tr className={index % 2 == 0 ? "row" : "inpar row"}>
    <td className="data fixed">
      <p className="text">{value?.code}</p>
    </td>
    <td className="data ">
      <p className="ctr_td">
        {value?.name}{" "}
        {value?.name === "Envio" && (
          <span
            style={{
              fontSize: 10,
              color: "gray",
            }}
          >
            (Este producto no afecta la comision)
          </span>
        )}
      </p>
    </td>
    <td className="data">
      <p className="text">{value?.quantity}</p>
    </td>
    <td className="data">{formatNumber(value?.callamount)}</td>
    <td className="data">{formatNumber(value?.discount)}</td>
    <td className="data">{formatNumber(value?.iva)}</td>
    <td className="data">{formatNumber(value?.total)}</td>

    <td className="data"><p>{value?.deliveryTime}</p><p>{value?.info}</p></td>
    <td className="data fixedlast">
      <div className="ctr_options__item">
        <Box display={"flex"}>
          <Tooltip title={"Eliminar" + " " + value?.code}>
            <Delete onClick={() => deleteItem(value, index)} />
          </Tooltip>
          <Tooltip title={"Editar" + " " + value?.code}>
            <Edit onClick={() => handleSelectProduct(value, index)} />
          </Tooltip>
        </Box>
      </div>
    </td>
  </tr>
));

const SortableList = SortableContainer(({ items, handleSelectProduct, deleteItem }) => {
  return (
    <thead className="ctr_table__body">
      {items.map((item, index) => (
        <SortableItem
          key={item.id}
          index={index}
          value={item}
          handleSelectProduct={handleSelectProduct}
          deleteItem={deleteItem}
        />
      ))}
    </thead>
  );
});

export default function SortableContainer2({ onSortEnd, items, handleSelectProduct, deleteItem }) {
  return (
    <SortableList
      handleSelectProduct={handleSelectProduct}
      deleteItem={deleteItem}
      items={items}
      onSortEnd={onSortEnd}
    />
  );
}
