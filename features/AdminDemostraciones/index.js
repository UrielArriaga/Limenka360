import React from 'react'
import useDemos from '../../hooks/useDemos';
import { AdminDemoStyled, PurpleSwitch } from './styles';
import DrawerFiltersDemo from '../../components/DrawerFiltersDemo';
import DrawerDemo from '../../components/DrawerDemo';
import AlertGlobal from '../../components/Alerts/AlertGlobal';
import { Cached, FilterList, RecentActors, SearchOutlined } from '@material-ui/icons';
import { Chip, Pagination, TextField } from '@mui/material';
import TableComponent from '../../components/TableDataComponentDemo';
import { useSelector } from 'react-redux';
import { userSelector } from '../../redux/slices/userSlice';

export default function AdminDemostraciones() {
    const { groupId, company, id_user, userData, group, roleId } = useSelector(userSelector);
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
        routeNavigate,
        DemoUptate,
        Declined,
      } = useDemos();
  return (
 <AdminDemoStyled>
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
            DemoUptate={DemoUptate}
            Declined={Declined}
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
      // DemoUptate={DemoUptate}
    />
    <DrawerDemo  routeNavigate={routeNavigate} show={opendrawer} closeDrawer={closeDrawer} demoItem={demoItem}/>
    {State?.show && (
      <AlertGlobal severity={State.severity} message={State.message} show={State.show} type={State.type} />
    )}
  </AdminDemoStyled>
  )
}
const CreateDemo = ({}) => {
    return <div></div>;
  };
  const optionsOrder = [
    { label: "Fecha de Creación", value: "createdAt" },
    { label: "Nombre de Instructor", value: "assignedinstructor" },
  ];
  
