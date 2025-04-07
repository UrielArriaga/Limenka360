import React from "react";
import MainLayout from "../../components/MainLayout";
import { DemoStyled, PurpleSwitch } from "../../styles/Demos/demos.styled";
import {
  Cached,
  FilterList,
  RecentActors,
  SearchOutlined,
} from "@material-ui/icons";
import { Chip, TextField } from "@material-ui/core";
import useDemos from "../../hooks/useDemos";
import TableComponent from "../../components/TableDataComponentDemo";
import { Pagination } from "@mui/material";
import DrawerFiltersDemo from "../../components/DrawerFiltersDemo";
import AlertGlobal from "../../components/Alerts/AlertGlobal";
import DrawerDemo from "../../components/DrawerDemo";

export default function Demos() {
  const {
    keySearch,
    demos,
    headsDemo,
    orderBy,
    ASC,
    flag,
    totalPages,
    page,
    open,
    queryNew,
    chips,
    city,
    isfilterbyRange,
    startDate,
    endDate,
    State,

    handleKeySearch,
    handleRefresh,
    setOrderBy,
    setASC,
    setFlag,
    handlePagination,
    setOpen,
    applyFilters,
    handleDelete,
    handleAddFilter,
    handleKeyDown,
    setCity,
    setStartDate,
    setEndDate,
    handleFilterTypeDate,
    handleFilterRangeDate,


    opendrawer, 
    handleClickName,
    closeDrawer,
    demoItem,
    routeNavigate
  } = useDemos();
 
  return (
    <MainLayout>
      <DemoStyled>
        <div className="content_demo">
          <div className="content_demo__header">
            <p className="title_header">Demos</p>
            <div className="totals">
              <RecentActors className="icon_demo" />
              <span className="count">{demos.count}</span>
              <p className="title">Registros</p>
              <Cached onClick={() => handleRefresh()} className="icon_reload" />
            </div>
          </div>
          <div className="content_demo__body">
            <div className="ctr_filter__ctr_input">
              <TextField
                variant="outlined"
                type="search"
                fullWidth={true}
                value={keySearch}
                onChange={e => handleKeySearch(e.target.value)}
                placeholder="Ingresa Nombre del instructor o viaticos"
                size="small"
                className="inputText"
                onKeyDown={e => handleKeyDown(e)}
              />
              <SearchOutlined className="search" />
              <FilterList className="filters" onClick={() => setOpen(!open)} />
            </div>
            <div className="chips_box">
              {chips?.map((item, index) => (
                <Chip
                  key={index}
                  color="primary"
                  size="small"
                  label={item?.nameChip + ": " + item?.nameValue}
                  onDelete={() => handleDelete(item)}
                  className="chip"
                />
              ))}
            </div>
            <div className="orders">
              <label style={{ marginRight: 5, fontSize: 11 }}>Ordernar por</label>
              <select
                className="order-select"
                onChange={e => {
                  setOrderBy(e.target.value);
                  setFlag(!flag);
                }}
                value={orderBy}
                name=""
                id=""
                style={{ marginRight: 5 }}
              >
                {optionsOrder.map((item, index) => (
                  <option key={index} value={item.value}>
                    {item.label}
                  </option>
                ))}
              </select>

              <div className="contentOrder">
                <p style={{ fontSize: 11 }}>Ascendente</p>

                <PurpleSwitch
                  checked={ASC}
                  onChange={e => {
                    setASC(e.target.checked);
                    setFlag(!flag);
                  }}
                  name="checkedC"
                />

                <p style={{ fontSize: 11 }}>Descendente</p>
              </div>
            </div>
            <div>
              <CreateDemo />
            </div>
            <div className="table_demos">
              <TableComponent
                data={demos?.results}
                id="id"
                // discartedTable={}
                heads={headsDemo}
                secondaryColor="#dce1f6"
                primaryColor="#405189"
                isFeching={demos?.isFeching}
                handleClickName={handleClickName}
                // handleClickEditToOportunity={handleClickEditOportunity}
                // handleClickName={(item, e) => handleClickOportunity(item, e)}
                // handleClickAddTracking={handleClickAddTracking}
                // handleClickConverToSale={handleClickConverToSale}
                // handleClickQuoteAgain={handleClickQuoteAgain}
                // handleClickDiscardOportunities={ConfirmDelete}
                // handleClickRestore={confirmRestore}
                // handleClickAddPending={handleClickAddPending}
                // handleClickOpenWhatsApp={handleClickOpenWhatsApp}
                // handleClickRejectOportunity={handleClickRejectOportunity}
                // handleClickImportantOportunity={handleClickImportantOportunity}
                // handleCliclImportantRestore={confirmRestoreImportant}
                // handleCliclRejectedRestore={handleClickImportantRestore}
                // handleClickpottential={handleClickpottential}
                // handleClickDeletepottential={handleClickpottentialDelete}
              />
              {demos?.results?.length > 0 && (
                <div className="table_demos__pagination">
                  <Pagination
                    shape="rounded"
                    color="primary"
                    count={totalPages}
                    defaultPage={1}
                    page={page}
                    onChange={handlePagination}
                  />
                </div>
              )}
            </div>
          </div>
          <div className="content_demo__footer"></div>
        </div>
        <DrawerFiltersDemo
          open={open}
          setOpen={setOpen}
          applyFilters={applyFilters}
          queryNew={queryNew}
          handleAddFilter={handleAddFilter}
          city={city}
          setCity={setCity}
          isfilterbyRange={isfilterbyRange}
          startDate={startDate}
          setStartDate={setStartDate}
          endDate={endDate}
          setEndDate={setEndDate}
          handleFilterTypeDate={handleFilterTypeDate}
          handleFilterRangeDate={handleFilterRangeDate}
         
        />
        <DrawerDemo  routeNavigate={routeNavigate} show={opendrawer} closeDrawer={closeDrawer} demoItem={demoItem}/>
        {State?.show && (
          <AlertGlobal severity={State.severity} message={State.message} show={State.show} type={State.type} />
        )}
      </DemoStyled>
    </MainLayout>
  );
}

const CreateDemo = ({}) => {
  return <div></div>;
};
const optionsOrder = [
  { label: "Fecha de Creación", value: "createdAt" },
  { label: "Nombre de Instructor", value: "assignedinstructor" },
];
