import { IconButton } from "@material-ui/core";
import { Close, Filter, FilterList } from "@material-ui/icons";
import { Pagination } from "@material-ui/lab";
import { motion } from "framer-motion";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { setEjecutiveSelectedG } from "../../../../redux/slices/dashboardManager";
import { userSelector } from "../../../../redux/slices/userSlice";
import { api } from "../../../../services/api";
import { validateIncludes, validateJoins } from "../../../../utils";
import DashboardTableExecutives from "../../organism/DashboardTableExecutives";

const SectionExecutives = ({ startDate, finishDate }) => {
  const dispatch = useDispatch();

  const [showFilters, setShowFilters] = useState(false);
  const [executives, setExecutives] = useState([]);
  const [count, setCount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [searchBy, setSearchBy] = useState("bysales");
  const { groupId } = useSelector(userSelector);
  const [page, setPage] = useState(1);

  useEffect(() => {
    handleRequest(searchBy);
  }, [page, startDate, finishDate]);

  const requestExecutives = async () => {
    try {
      setIsLoading(true);

      let query = {};
      query.oportunity = {};
      query.oportunity.soldat = {
        $gte: startDate,
        $lte: finishDate,
      };
      query.oportunity.iscloseout = true;
      query.groupId = groupId;

      let params = {
        limit: 5,
        order: "-totalAmount",
        count: 1,
        skip: page,
        where: JSON.stringify(query),
      };
      let res = await api.get("dashboard/ejecutivesamount", { params });

      console.log(res);
      setData(res.data.results, res.data?.count);
      if (res.data?.results?.length > 0 && page == 1) {
        dispatch(setEjecutiveSelectedG({ item: res.data.results[0] }));
      }
    } catch (error) {}
  };

  const setData = (array, total) => {
    setExecutives(array);
    setCount(total);
    setIsLoading(false);
  };

  const requestExecutivesByGoals = async () => {
    try {
      setIsLoading(true);
      let query = {};
      query.goal = {
        goaltypeId: "62dilssNQWT5RUcANZqAcDuZ",
      };
      query.initialperiodate = {
        $gte: "2022-11-01T05:00:00.000Z",
        $lte: "2022-12-01T05:00:00.000Z",
      };
      query.ejecutive = {
        groupId: groupId,
      };
      let params = {
        include: validateIncludes("Individual"),
        join: validateJoins("Individual"),
        where: JSON.stringify(query),
        limit: 5,
        count: "0",
        order: "-progress",
        skip: page,
      };

      let responseGoals = await api.get("ejecutivesgoals", { params });
      setData(responseGoals.data.results, responseGoals.data?.count);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  const requestPayments = async () => {
    try {
      let query = {};
      query.ispaid = false;
      query["oportunity"] = {
        prospect: {
          ejecutive: {
            groupId: groupId,
          },
          // ejecutiveId: payload.id,
        },
      };
      let params = {
        where: JSON.stringify(query),
        limit: 0,
        count: "1",
        order: "-createdAt",
        include: "oportunity,oportunity.prospect",
        // join: "oportunity,oportunity.prospect,ejecutive",
        showejecutive: 1,
      };
      let responseOportunities = await api.get(`salespayments`, { params });
      console.log(responseOportunities);
    } catch (error) {
      console.log(error);
    }
  };

  const requestOportunities = async () => {
    try {
      setIsLoading(true);
      let query = {};
      query.oportunity = {};
      query.oportunity.createdAt = {
        $gte: startDate,
        $lte: finishDate,
      };
      query.oportunity.iscloseout = false;
      let params = {
        limit: 5,
        order: "-totalAmount",
        count: 1,
        skip: page,
        where: JSON.stringify(query),
      };
      let res = await api.get("dashboard/ejecutivesamount", { params });
      setData(res.data.results, res.data?.count);
    } catch (error) {}
  };

  const handleRequest = value => {
    switch (value) {
      case "bysales":
        requestExecutives();
        break;
      case "bygoals":
        requestExecutivesByGoals();
        break;
      case "byoportunities":
        requestOportunities();
        break;
    }
  };

  // * Handlers
  const handleClickFilter = value => {
    setShowFilters(value);
  };

  const handleOnChangeSelect = e => {
    setSearchBy(e.target.value);
    setPage(1);
    handleRequest(e.target.value);
  };

  const handleClickPage = value => {
    console.log(value);
    setPage(value);
    // setFlag(!flag);
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
              }}
            >
              <select name="" id="" onChange={e => handleOnChangeSelect(e)}>
                {optionsExecutives.map((item, index) => (
                  <option key={item.value} defaultValue={searchBy} value={item.value}>
                    {item.name}
                  </option>
                ))}
              </select>
            </FiltersContainer>
            {showFilters && (
              <IconButton className="active">
                <Close className="icon_filter " onClick={() => handleClickFilter(false)} />
              </IconButton>
            )}

            {!showFilters && <FilterList className="icon_filter " onClick={() => handleClickFilter(true)} />}
          </div>
        </div>

        <div>
          <DashboardTableExecutives
            isLoading={isLoading}
            type={searchBy}
            data={executives}
            heads={returnHeads(searchBy)}
            secondaryColor="#dce1f6"
            primaryColor="#405189"
          />
        </div>

        <div className="pagination">
          <div className="total">Total {count}</div>

          <div className="pages">
            <Pagination
              shape="rounded"
              onChange={(e, value) => handleClickPage(value)}
              count={Math.ceil(count / 5)}
              page={page}
              size="small"
              color="primary"
            />
          </div>
        </div>
      </div>
      {/* <button onClick={() => requestPayments()}>click </button> */}
    </EjecutiveComponent>
  );
};

const returnHeads = key => {
  switch (key) {
    case "bysales":
      return ["Nombre", "Correo", "Monto de Ventas"];
    case "bygoals":
      return ["Nombre", "Avance", "Porcentaje"];
    case "byoportunities":
      return ["Nombre", "Correo", "Monto Cotizado"];

    default:
      break;
  }
};

const EjecutiveComponent = styled.div`
  background-color: #eeeeee;
  padding: 10px 10px 10px 10px;
  border-radius: 8px;
  min-height: 380px;
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

      .active {
        background-color: #407aff;
        padding: 4px;
        margin-bottom: 5px;
        color: #fff;
      }
    }
  }

  .container .pagination {
    margin-top: 10px;
    display: flex;
    justify-content: space-between;
    height: 100%;
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

export default SectionExecutives;

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
