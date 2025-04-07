import React from "react";
import { Close } from "@material-ui/icons";
import { ContainerActiveFilters } from "./styles"
export default function ActiveFilters({ activeFilters, setActiveFilters }) {
    if (activeFilters.length === 0) {
        return null;
    }
    return (
        <ContainerActiveFilters>
            <p className="textfiltersactive"
                onClick={() => { console.log(activeFilters) }} >
                Filtrado por:
            </p>

            {activeFilters.map((filterActive, index) => {
                return (
                    <div
                        key={filterActive.value}
                        className="chipselected"
                        onClick={() => {
                            let newActiveFilters = activeFilters.filter(item => item.value !== filterActive.value);
                            setActiveFilters(newActiveFilters);
                        }}
                    >
                        <p className="chipselected__text">{filterActive?.name}</p>
                        <Close className="chipselected__icon" />
                    </div>
                );
            })}
        </ContainerActiveFilters>
    );
}