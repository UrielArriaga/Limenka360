import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import useFetch from "../../../../hooks/useFetch";
import { dashboardDirectorSelector } from "../../../../redux/slices/dashboardDirector";
import { formatNumber, formatNumberNoSymbol } from "../../../../utils";
import { Avatar, Grid } from "@material-ui/core";
import { URL_SPACE, api } from "../../../../services/api";
import SelectFiltersDirector from "../../atoms/SelectFiltersDirector";
import { NavigateBefore, NavigateNext } from "@material-ui/icons";
import usePagination from "../../../../hooks/usePagination";
import PaginationDirector from "../../molecules/PaginationTable";
import PaginationTableHome from "../../molecules/PaginationTableHome";
import SelectCompareExecutives from "../../atoms/SelectCompareExecutives";
export default function TableExecutivesDirector({
  groupId,
  setOpenCompare,
  handleOpenCompare,
  idsExecutivesToCompare,
  setIdsExecutivesToCompare,
  setExecutivesToCompare,
  executivesToCompare,
}) {
  const { startDateGlobal, finishDateGlobal } = useSelector(dashboardDirectorSelector);
  const [searchBy, setSearchBy] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [showCompares, setShowCompares] = useState(false);

  const { page, limit, handlePage } = usePagination({ defaultLimit: 10, defaultPage: 1 });
  const [refetch, forceRefetch] = useState(false);

  const [executivesList, setExecutivesList] = useState({});
  const dispatch = useDispatch();

  const generateParams = () => {
    let query = {};
    let params = {};
    switch (searchBy?.label) {
      case "totalProspects":
        console.log("here in prospc");
        query.prospect = {
          createdAt: {
            $gte: startDateGlobal,
            $lte: finishDateGlobal,
          },
        };
        params = {
          limit: 10,
          skip: page,
          order: "-totalProspects",
          include: "group",
          count: 1,
          where: JSON.stringify(query),
        };
        break;

      case "totalPendings":
        console.log("pend");
        return "dashboard/ejecutivespending";

      default:
        console.log("def");
        if (groupId) {
          query = {
            groupId: groupId,
          };
        } else {
          delete query.groupId;
        }

        query.oportunity = {
          soldat: {
            $gte: startDateGlobal,
            $lte: finishDateGlobal,
          },
          iscloseout: true,
        };

        params = {
          limit: 10,
          skip: page,
          order: "-totalAmount",
          include: "group",
          count: 1,
          where: JSON.stringify(query),
        };
        break;
    }

    return params;
  };

  useEffect(() => {
    const getExecutives = async () => {
      let query = {};
      let params = {};
      if (groupId) {
        query = { groupId: groupId };
      } else {
        delete query.groupId;
      }

      params = {
        all: 1,
        order: "fullname",
        keys: "id,fullname",
        where: JSON.stringify(query),
      };

      let res = await api.get("ejecutives?all=1,keys=id,fullname,order=fullname");
      setExecutivesList(res.data.results);
    };

    getExecutives();
  }, []);

  const getPathName = () => {
    switch (searchBy?.label) {
      case "totalProspects":
        console.log("here in prospc");
        return "dashboard/ejecutivesprospect";

      case "totalPendings":
        console.log("pend");
        return "dashboard/ejecutivespending";

      default:
        console.log("def");
        return "dashboard/ejecutivesamount";
    }
  };

  const { isFetching, response, handleRefetchRequest } = useFetch({
    path: getPathName(),
    params: generateParams(),
    condition: true,
    refetch: startDateGlobal,
    limit: limit,
    page: page,
  });

  const { results, count } = response;

  const handleClickFilter = value => setShowFilters(value);

  const handleClickCompare = value => {
    setShowCompares(value);

    if (idsExecutivesToCompare[0] === undefined || idsExecutivesToCompare[1] === undefined) return;
  };

  if (isFetching) {
    return (
      <TableExecutivesDirectorStyled>
        <p>Cargando</p>
      </TableExecutivesDirectorStyled>
    );
  }

  const optionsToFind = [
    {
      label: "amount",
      name: "Monto vendido",
    },
    {
      label: "totalProspects",
      name: "Total Prospectos",
    },
    // {
    //   label: "totalPendings",
    //   name: "Total Pendientes",
    // },
  ];

  const renderContent = ejecutive => {
    switch (searchBy?.label) {
      case "totalProspects":
        return (
          <Grid item md={5}>
            <p className="title">{formatNumberNoSymbol(Number(ejecutive.totalProspects))}</p>
            <p className=" subtitle progress">Total Prospectos</p>
          </Grid>
        );

      case "totalPendings":
        return (
          <Grid item md={5}>
            <p className="title">{formatNumber(Number(ejecutive.totalProspects))}</p>
            <p className=" subtitle progress">Total Prospectos</p>
          </Grid>
        );

      default:
        return (
          <Grid item md={5}>
            <p className="title">{formatNumber(ejecutive.totalAmount)}</p>
            <p className=" subtitle progress">Monto Vendido</p>
          </Grid>
        );
    }
  };

  const handleOnChangeSelect = e => {
    console.log(e);
    setSearchBy(e);

    handleRefetchRequest();
  };

  const handleOnChangeSelectCompare = (e, index) => {
    setIdsExecutivesToCompare(idsExecutivesToCompare => {
      return [...idsExecutivesToCompare.slice(0, index), e ? e : undefined, ...idsExecutivesToCompare.slice(index + 1)];
    });
  };

  const handleClose = () => {
    setIdsExecutivesToCompare([undefined, undefined]);
    handleClickCompare(false);
  };

  return (
    <TableExecutivesDirectorStyled>
      <div className="head fixed">
        <h3>Ejecutivos</h3>
        <div className="actions">
          <SelectFiltersDirector
            selectOptions={optionsToFind}
            changeFilterValue={handleOnChangeSelect}
            handleClickFilter={handleClickFilter}
            showList={showFilters}
            searchBy={searchBy}
            total={count}
          />
          <SelectCompareExecutives
            selectOptions={executivesList}
            handleOnChangeSelectCompare={handleOnChangeSelectCompare}
            handleClickCompare={handleClickCompare}
            showCompares={showCompares}
            isExecutive
            setOpenCompare={handleOpenCompare}
            idsExecutivesToCompare={idsExecutivesToCompare}
            handleClose={handleClose}
          />
        </div>
      </div>
      <div className="divider"></div>

      <div className="containerResults">
        {results.map((ejecutive, index) => {
          return (
            <div key={index}>
              <Grid container className="">
                <Grid item md={5} style={{ marginBottom: 10 }}>
                  <div className="row">
                    <Avatar className="avatar" src={ejecutive.photo && URL_SPACE + ejecutive.photo} />
                    <div className="imagename">
                      <p className="titlegroup">{ejecutive?.fullname}</p>
                      <p className="subtitle">{ejecutive?.group?.name}</p>
                    </div>
                  </div>
                </Grid>
                {renderContent(ejecutive)}
              </Grid>
              <div className="divider"></div>
            </div>
          );
        })}
      </div>

      <PaginationTableHome title="Ejecutivos" page={page} count={count} limit={limit} handlePage={handlePage} />

      {/* <div className="bottom">
        <div className="counter">
          <p className="total">{`Total de ejecutivos: ${count}`}</p>
        </div>
        <div className="pagination">
          <p className="totalPage">{`Paginas: ${page} - ${Math.ceil(count / limit)}`}</p>

          <IconButton
            color="primary"
            disabled={page <= 1 ? true : false}
            className="pagination__before"
            onClick={() => handlePage(page - 1)}
          >
            <NavigateBefore />
          </IconButton>

          <IconButton
            color="primary"
            // disabled={page >= Math.ceil(totalGoals / limit) ? true : false}
            className="pagination__next"
            onClick={() => handlePage(page + 1)}
          >
            <NavigateNext />
          </IconButton>
        </div> 
        </div>
        */}
    </TableExecutivesDirectorStyled>
  );
}

const TableExecutivesDirectorStyled = styled.div`
  min-height: 400px;
  padding: 10px;
  height: 560px;
  background-color: #fff;
  box-shadow: 0px 3px 1px -2px rgb(0 0 0 / 20%), 0px 2px 2px 0px rgb(0 0 0 / 14%), 0px 1px 5px 0px rgb(0 0 0 / 12%);
  .containerResults {
    overflow: scroll;
    height: 75%;
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
  h3 {
    margin-bottom: 20px;
    color: #495057;
  }

  .divider {
    height: 2px;
    background-color: rgba(73, 80, 87, 0.1);
    margin-bottom: 20px;
  }

  .top {
    display: flex;
  }
  h3 {
    text-transform: capitalize;
  }

  .row {
    display: flex;
    align-items: center;
  }

  .graph {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .pie {
  }
  .head {
    top: 0;
    left: 0;
    z-index: 100;
    display: flex;
    justify-content: space-between;
    height: 80px;
    .actions {
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
    color: #212121;
  }

  .imagename {
    /* display: flex;
    align-items: center; */
  }
  .avatar {
    width: 50px;
    height: 50px;
    margin-right: 10px;
  }
  .row {
    display: flex;
    align-items: center;
  }

  .levelbox {
    background-color: #d4af37;
    width: 30px;
    height: 30px;
    border-radius: 15px;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .pagination {
    display: flex;
    align-items: center;
  }

  .bottom {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
`;
