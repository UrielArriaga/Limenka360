import { Chip, Tooltip } from "@material-ui/core";
import React from "react";
import { ChipStyle } from "./style";
export default function Chips(props) {
  const { filters, setFilters, refetch, notDelete, setKey } = props;
  const handleDeleteFilter = valueChip => {
    let newArrayFilters = [...filters];
    let deleteFilter = newArrayFilters.filter(item => item.id !== valueChip.id);
    setFilters(deleteFilter);
    refetch();
    if (valueChip.id === "keySearch" || setKey) setKey({ search: false, keySearch: "", type: "inQuery" });
  };
  return (
    <ChipStyle>
      <div className="chips_filters">
        {filters?.map((item, index) => {
          // if (notDelete === item.typeof) {
          //   return (
          //     <Tooltip
          //       title="Se requiere un filtro obligatorio, debido a la cantidad de resultados obtenidos"
          //       key={index}
          //       arrow={true}
          //     >
          //       <Chip className="chip" color="primary" label={item.label + " : " + item.name} />
          //     </Tooltip>
          //   );
          // } else {
          return (
            <Chip
              className="chip"
              size="small"
              key={index}
              color="primary"
              label={item.label + " : " + item.name}
              onDelete={() => handleDeleteFilter(item)}
            />
          );
          // }
        })}
      </div>
    </ChipStyle>
  );
}
