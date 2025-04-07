import React, { useEffect, useState } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from "recharts";
import useFetch from "../../../../hooks/useFetch";
import { formatNumber } from "../../../../utils";
import { useRouter } from "next/router";
import { api } from "../../../../services/api";

// #region constants

// #endregion

// #region styled-components
const ChartDirectorStyled = styled.div`
  padding: 14px;
  background-color: #fff;
  box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
  min-height: 400px;
  height: 500px;
  padding-bottom: 50px;
  margin-top: 20px;

  .custom-tooltip {
    border-radius: 10px;
    padding: 4px;
    background-color: #fff;
    box-shadow: 0px 3px 1px -2px rgb(0 0 0 / 20%), 0px 2px 2px 0px rgb(0 0 0 / 14%), 0px 1px 5px 0px rgb(0 0 0 / 12%);
  }
  h3 {
    margin-bottom: 20px;
    color: #495057;
  }

  .divider {
    height: 2px;
    background-color: rgba(73, 80, 87, 0.1);
    margin-bottom: 20px;
  }
`;

// #endregion

// #region functions

// #endregion

// #region component
const propTypes = {
  groupID: PropTypes.string.isRequired,
  chartName: PropTypes.string,
};

const defaultProps = { chartName: "Chart" };

/**
 * Firts version of charts, could be extended as lauyout
 */
const ChartSellsExecutives = ({ groupID, chartName, getTop, startDate, finishDate }) => {
  const router = useRouter();
  console.log("groupID, chartName, getTop, startDate, finishDate", groupID, chartName, getTop, startDate, finishDate);
  const [dataExecutives, setDataExecutives] = useState([]);
  const [isFetchingGroup, setIsFetchingGroup] = useState(false);
  const [searchBy, setSearchBy] = useState("");
  const generateQuery = () => {
    let query = { groupId: groupID };
    if (startDate && finishDate) {
      query.createdAt = {
        $gte: startDate,
        $lte: finishDate,
      };
    }

    if (getTop) {
      return {
        limit: 3,
        count: 1,
        order: "-totalSales",
        where: JSON.stringify(query),
      };
    }

    return {
      all: 1,
      count: 1,
      order: "-totalSales",
      where: JSON.stringify(query),
    };
  };

  // This should be called later as props or context to save data
  useEffect(() => {
    const getData = async () => {
      try {
        setIsFetchingGroup(true);

        let getejecutivesales = await api.get("dashboard/ejecutivesales", { params: generateQuery() });

        let data = [];
        getejecutivesales.data.results.map(user => {
          data.push({
            name: `Ejecutivo: ${user.fullname}`,
            item: user,
            "Total ": Number(user.totalSales),
          });
        });

        setDataExecutives(data);
        setIsFetchingGroup(false);
      } catch (error) {
        console.log(error);
      }
    };
    getData();
  }, [startDate, finishDate]);

  const handleClickExecutive = event => {
    router.push(`/ejecutivos/${event.item.id}`);
  };

  return (
    <ChartDirectorStyled>
      <h3>{chartName}</h3>
      <div className="divider"></div>

      {isFetchingGroup ? (
        <div className="loader">Obteniendo datos más recientes...</div>
      ) : (
        <ResponsiveContainer width="100%" height="90%">
          <BarChart
            data={dataExecutives}
            margin={{
              top: 10,
              left: 0,
            }}
          >
            <XAxis dataKey="name" />

            <YAxis
              tickFormatter={tickValue => `${formatNumber(tickValue)}`}
              textAnchor="end"
              sclaeToFit="true"
              verticalAnchor="start"
              angle="0"
              stroke="#8884d8"
            />
            <Tooltip formatter={value => formatNumber(value)} />
            <Legend />
            <Bar
              dataKey={`Total `}
              fill="#6eabce"
              minPointSize={10}
              onClick={handleClickExecutive}
              cursor={"pointer"}
            />
          </BarChart>
        </ResponsiveContainer>
      )}
    </ChartDirectorStyled>
  );
};

ChartSellsExecutives.propTypes = propTypes;
ChartSellsExecutives.defaultProps = defaultProps;
// #endregion

export default ChartSellsExecutives;
