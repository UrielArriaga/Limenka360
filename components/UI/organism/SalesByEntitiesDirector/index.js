import React, { useEffect, useState } from "react";
import useFetch from "../../../../hooks/useFetch";
import {
  BarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  LabelList,
  ResponsiveContainer,
} from "recharts";
import { formatNumber } from "../../../../utils";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { motion } from "framer-motion";
import { Close, FilterList, NavigateBefore, NavigateNext } from "@material-ui/icons";
import { Grid, IconButton, LinearProgress, withStyles } from "@material-ui/core";
import { colors } from "../../../../styles/global.styles";
import SelectFiltersDirector from "../../atoms/SelectFiltersDirector";
import { Skeleton } from "@material-ui/lab";
import LoaderGoals from "../../molecules/LoaderGoalsDirector";
import { dashboardDirectorSelector } from "../../../../redux/slices/dashboardDirector";
import PaginationTableHome from "../../molecules/PaginationTableHome";
import usePagination from "../../../../hooks/usePagination";
// import { SVGMap } from "react-svg-map";
// import mexico from "@svg-maps/mexico";
export default function SalesByEntitiesDirector() {
  const { page, limit, handlePage } = usePagination({ defaultLimit: 10, defaultPage: 1 });
  const { startDateGlobal, finishDateGlobal } = useSelector(dashboardDirectorSelector);

  const generateQuery = () => {
    let query = {
      oportunity: {
        soldat: {
          $gte: startDateGlobal,
          $lte: finishDateGlobal,
        },
      },
    };

    return {
      where: JSON.stringify(query),
      skip: page,
      limit: limit,
      count: "1",
      order: "-totalAmount",
    };
  };

  const { response, isFetching } = useFetch({
    path: "dashboard/entitysalesamount",
    condition: true,
    page: page,
    limit: limit,
    paramsfn: generateQuery,
    refetch: startDateGlobal,
  });

  if (!isFetching && response.results.length === 0) {
    return (
      <GoalsChartDirectorEmpty>
        <div className="container">
          <h3>Ventas Por Estado</h3>
        </div>
        <div className="divider"></div>
        <div className="content">
          <div className="nodata">
            <p>No hay registros disponibles</p>
          </div>
        </div>
      </GoalsChartDirectorEmpty>
    );
  }

  return (
    <GoalsChartDirectorStyled>
      <div className="container">
        <h3>Ventas Por Estado</h3>
      </div>

      <div className="divider"></div>
      {isFetching && (
        <div className="containerResults">
          <LoaderGoals />
        </div>
      )}
      {!isFetching && (
        <div className="containerResults">
          {response.results.map((item, index) => {
            return (
              <div key={index}>
                <Grid container className="" key={index}>
                  <Grid item md={6} style={{ marginBottom: 10 }}>
                    <p className="titlegroup">{item.name}</p>
                  </Grid>
                  <Grid item md={6} style={{ marginBottom: 10 }}>
                    <p className="titlegroup">{formatNumber(item?.totalAmount)}</p>
                  </Grid>
                </Grid>
                <div className="divider"></div>
              </div>
            );
          })}
        </div>
      )}

      <PaginationTableHome title="Estados" page={page} count={response.count} limit={limit} handlePage={handlePage} />
    </GoalsChartDirectorStyled>
  );
}

const GoalsChartDirectorEmpty = styled.div`
  background-color: #fff;
  padding: 10px;
  box-shadow: 0px 3px 1px -2px rgb(0 0 0 / 20%), 0px 2px 2px 0px rgb(0 0 0 / 14%), 0px 1px 5px 0px rgb(0 0 0 / 12%);
  min-height: 400px;
  height: 200px;
  overflow-y: scroll;

  .container {
    display: flex;
    align-items: initial;
    justify-content: space-between;
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
  .content {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 60%;
  }
  .createnew {
    color: ${colors.bgDirector};
    font-weight: bold;
    margin-left: 10px;
    text-decoration: underline;
    cursor: pointer;
  }
  .nodata {
    width: 100%;
    text-align: center;
    padding: 20px 10px;
    margin-bottom: 12px;
    background-color: rgba(0, 0, 0, 0.1);
    p {
      font-weight: bold;
    }
  }
`;

const BorderLinearProgress = withStyles(theme => ({
  root: {
    height: 10,
    borderRadius: 5,
  },
  colorPrimary: {
    backgroundColor: theme.palette.grey[theme.palette.type === "light" ? 300 : 900],
  },
  bar: {
    borderRadius: 5,
    backgroundColor: colors.primaryColor,
  },
}))(LinearProgress);

const GoalsChartDirectorStyled = styled.div`
  background-color: #fff;
  padding: 15px 10px 10px 10px;
  box-shadow: 0px 3px 1px -2px rgb(0 0 0 / 20%), 0px 2px 2px 0px rgb(0 0 0 / 14%), 0px 1px 5px 0px rgb(0 0 0 / 12%);
  min-height: 400px;
  height: 500px;

  .map-container {
    display: flex;
    padding: 10px;
    justify-content: center;
    background-color: red;
  }
  .svg-map {
    height: 260px;
  }
  .container {
    display: flex;
    align-items: initial;
    justify-content: space-between;
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

  .custom-tooltip {
    border-radius: 10px;
    padding: 4px;
    background-color: #fff;
    box-shadow: 0px 3px 1px -2px rgb(0 0 0 / 20%), 0px 2px 2px 0px rgb(0 0 0 / 14%), 0px 1px 5px 0px rgb(0 0 0 / 12%);
  }

  .filter {
    display: flex;
    align-items: center;
    padding: 10px 0px;
    svg {
      cursor: pointer;
    }
  }

  .containerResults {
    height: 69%;
    overflow: auto;
    ::-webkit-scrollbar {
      width: 4px;
      height: 4px;
    }
    ::-webkit-scrollbar-track {
      -webkit-box-shadow: inset 0 0 6px rgb(166 164 164 / 20%);
    }
    ::-webkit-scrollbar-thumb {
      -webkit-box-shadow: inset 0 0 20px #9e9e9e;
    }
  }
  .titlegroup {
    font-weight: bold;
    color: #495057;
    text-transform: capitalize;
  }
  .title {
    color: #495057;
    font-weight: bold;
    font-size: 15px;
  }
  .subtitle {
    font-size: 12px;
    color: #878a99;
  }

  .percentage {
    text-align: right;
    font-size: 12px;
    color: #512da8;
  }
  .tfooter {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: 20px;
    .ctr_button {
      margin-top: 10px;
      margin-bottom: 10px;
    }
    .ctr_pagination {
      display: flex;
      align-items: center;
      width: 100%;
      justify-content: space-between;
      .total {
        font-weight: 500;
        color: #585858;
        font-size: 14px;
      }
      .pagination {
        display: flex;
        align-items: center;
        .totalPage {
          font-weight: 500;
          color: #585858;
          font-size: 13px;
        }

        &__before {
          display: flex;
          justify-content: center;
          align-items: center;
          width: 30px;
          height: 30px;
          background: #f3f3f3;
          border-radius: 8px;
          margin-right: 5px;
          margin-left: 10px;
          color: #0c203b;
          border: none;
          transition: all 0.2s ease;
          &:hover {
            cursor: pointer;
            background: #dce1f6;
          }
          svg {
            color: #103c82;
          }
        }
        &__next {
          display: flex;
          justify-content: center;
          align-items: center;
          width: 30px;
          height: 30px;
          background: #f3f3f3;
          border-radius: 8px;
          margin-left: 5px;
          color: #0c203b;
          border: none;
          transition: all 0.2s ease;
          &:hover {
            cursor: pointer;
            background: #dce1f6;
          }
          svg {
            color: #103c82;
          }
        }
      }
    }
  }
`;
