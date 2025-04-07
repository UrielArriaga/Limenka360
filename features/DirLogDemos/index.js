import { DemosStyled } from "./styles";
import { Cached, Close, Search } from "@material-ui/icons";
import { Badge, Grid, IconButton } from "@material-ui/core";
import useDemos from "./hooks/useDemos";
import TableLimenkaGeneral from "../../components/TableLimenkaGeneral";
import Filters from "./components/Filters/filters";
import useFilters from "./hooks/useFilters";
import DataFilters from "./data";
import ActiveFilters from "./components/ActiveFilters/activeFilters";

export default function DirLogDemos() {
  const { filtersOptions } = DataFilters()
  const { handleOnChangeFilter, setActiveFilters, activeFilters, filters } = useFilters(filtersOptions);
  const {
    keySearch,
    setKeySearch,
    orderBy,
    handleKeySearch,
    setOrderBy,
    tableData,
    paginationData,
    refetchData
  } = useDemos(activeFilters);


  return (
    <DemosStyled>

      <div className="header">
      <div className="header__title">
          <h4>
            Demos <span>({tableData?.demos?.count})</span>
          </h4>
        </div>

        <div className="header__filters">
          <div className="inputContainer">
            <Search className="inputContainer__icon" />
            <input
              value={keySearch}
              onChange={e => handleKeySearch(e.target.value)}
              className="inputContainer__input"
              placeholder="Ingresa Nombre del instructor o viaticos"
            />

            {keySearch.length > 3 && (
              <IconButton className="inputContainer__clean" onClick={() => setKeySearch("")}>
                <Close />
              </IconButton>
            )}
          </div>

          <Filters
            filters={filters}
            activeFilters={activeFilters}
            setActiveFilters={setActiveFilters}
            handleOnChangeFilter={handleOnChangeFilter}
          />
          <IconButton className="icon" onClick={() => refetchData()}>
            <Badge
              overlap="rectangular"
              color="primary"
            >
            <Cached />
            </Badge>
          </IconButton>

        </div>
      </div>

      <ActiveFilters
        activeFilters={activeFilters}
        handleOnChangeFilter={handleOnChangeFilter}
        setActiveFilters={setActiveFilters}
      />

      <div className="main">
        <Grid container>
          <Grid item md={12}>
            <div className="containertable">
              <TableLimenkaGeneral
                mainColumn={"Instructor"}
                heads={tableData?.heads}
                data={tableData?.demos?.results}
                typeTable="border"
                isLoading={tableData?.demos?.isFeching}
                rowsLoader={tableData?.demos?.count >= 20 ? 20 : tableData?.demos?.count}
                orderBy={orderBy}
                setOrderBy={setOrderBy}
                paginationData={{
                  ...paginationData,
                  total: tableData?.demos?.count,
                }}
              />
            </div>
          </Grid>
        </Grid>
      </div>
      
    </DemosStyled>
  );
}