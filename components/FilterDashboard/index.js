import { useState, useEffect } from "react";
import { FilterListOutlined } from "@material-ui/icons";

export function Filter({ dateStart, setDateStart, dateFinish, setDateFinish, handleAlert }) {
  const [showfilter, Setshowfilter] = useState(false);

  return (
    <div className="filters">
      <div className="container_filters">
        <div className="icon-filter">
          <FilterListOutlined
            onClick={() => {
              Setshowfilter(!showfilter);
            }}
          />{" "}
          Filtros
        </div>
        {showfilter === true && (
          <div className="filtersday">
            <div className="dateend">
              <p>Fecha inicio</p>
              <input value={dateStart} onChange={e => setDateStart(e.target.value)} type="date" className="" />
            </div>
            <div className="datefinish">
              <p>Fecha termino</p>
              <input
                value={dateFinish}
                onChange={e => {
                  if (dateStart > e.target.value)
                    handleAlert("warning", "La fecha de termino no puede ser menor que la de inicio!", "basic");
                  setDateFinish(e.target.value);
                }}
                type="date"
                className=""
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
