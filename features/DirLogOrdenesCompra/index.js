import React from "react";
import { DirLogOrdenesCompraStyled } from "./styles";
import { IconButton } from "@material-ui/core";
import LogisticsFilters from "../../components/LogisticsFilters";
import { Search, UpdateSharp } from "@material-ui/icons";
import useLogisticsFilters from "../../hooks/useLogisticsFilters";
import { filtersPurchaseOrders } from "./data";
import useDirLogOrdenesCompras from "./hooks/useDirLogOrdenesCompras";

export default function DirLogOrdenesCompra() {
  const { results } = useDirLogOrdenesCompras();
  const { activeFilters, setActiveFilters, handleOnChangeFilter } = useLogisticsFilters();

  let keyword = "";
  return (
    <DirLogOrdenesCompraStyled>
      <div className="header">
        <div className="header__title">
          <h4>
            Orden de Compras <span>({0})</span>
          </h4>
        </div>

        <div className="header__filters">
          <div className="inputContainer">
            <Search className="inputContainer__icon" />
            <input
              //   value={keyword}
              //   onChange={e => handleOnChangeKeyWord(e)}
              className="inputContainer__input"
              placeholder="Buscar por folio, producto"
            />

            {keyword.length > 3 && (
              <IconButton className="inputContainer__clean" onClick={() => deleteKeyWord()}>
                <Close />
              </IconButton>
            )}
          </div>

          <LogisticsFilters
            filters={filtersPurchaseOrders}
            // filters={filters}
            // activeFilters={activeFilters}
            // setActiveFilters={setActiveFilters}
            // handleOnChangeFilter={handleOnChangeFilter}
          />

          <IconButton onClick={() => refetchData()}>
            <UpdateSharp />
          </IconButton>
        </div>
      </div>
    </DirLogOrdenesCompraStyled>
  );
}
