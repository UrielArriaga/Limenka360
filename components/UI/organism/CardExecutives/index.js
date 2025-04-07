import { Close, Filter, FilterList } from "@material-ui/icons";
import { motion } from "framer-motion";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import styled from "styled-components";
import { api } from "../../../../services/api";

const CardExecutives = () => {
  const [showFilters, setShowFilters] = useState(false);
  const [executives, setExecutives] = useState([]);

  useEffect(() => {
    requestExecutives();
  }, []);

  const requestExecutives = async () => {
    try {
      let params = {};
      let res = await api.get("ejecutives", { params });
      setExecutives(res.data.results);
    } catch (error) {}
  };

  // * Handlers
  const handleClickFilter = (value) => {
    setShowFilters(value);
  };
  return (
    <EjecutiveComponent>
      <div className="container">
        <div className="container__top">
          <h3>Ejecutivos</h3>

          <div className="filter">
            <FiltersContainer
              animate={{
                width: showFilters ? "auto" : 0,
                overflow: "hidden",
                // visibility: showFilters ? "visible" : "hidden",
              }}
            >
              <select name="" id="">
                {optionsExecutives.map((item, index) => {
                  return (
                    <option key={index} value={item.value}>
                      {item.name}
                    </option>
                  );
                })}
              </select>
              <select name="" id="">
                {optionsExecutives.map((item, index) => {
                  return (
                    <option key={index} value={item.value}>
                      {item.name}
                    </option>
                  );
                })}
              </select>
            </FiltersContainer>
            {showFilters ? (
              <Close className="icon_filter" onClick={() => handleClickFilter(false)} />
            ) : (
              <FilterList className="icon_filter" onClick={() => handleClickFilter(true)} />
            )}
          </div>
        </div>

        <div>
          {executives.map((item, idex) => {
            return <di key={index}>{item.email}</di>;
          })}
        </div>
      </div>
    </EjecutiveComponent>
  );
};

const EjecutiveComponent = styled.div`
  background-color: #eeeeee;
  padding: 10px 10px 10px 10px;
  border-radius: 8px;
  .container {
    &__top {
      display: flex;
      justify-content: space-between;
    }
    &__top .filter {
      display: flex;
      align-items: center;
      svg {
        cursor: pointer;
      }
    }
  }
`;

const FiltersContainer = styled(motion.div)`
  display: flex;
  select {
    border: none;
    height: 30px;
    width: 200px;
    background-color: #ffff;
    border-radius: 2px;
    padding-left: 10px;
    margin-right: 4px;
    margin-bottom: 8px;
    /* border: 2px solid #cfd8dc; */
    background-color: #ffff;
    box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
    &:focus {
      outline: 1px solid green;
    }
  }
  /* .icon_filter {
    transition: all 1s ease-in-out;
  } */
`;

export default CardExecutives;

const optionsExecutives = [
  {
    value: "bysales",
    name: "Por monto de ventas",
  },
  {
    value: "byoportunities",
    name: "Por Oportunidades",
  },
  {
    value: "bygoals",
    name: "Por Metas",
  },
];
