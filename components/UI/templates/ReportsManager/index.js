import { Button, CircularProgress, Grid, Menu } from "@material-ui/core";
import { MoreVert } from "@material-ui/icons";
import dayjs from "dayjs";
import { useRouter } from "next/router";
import React, { useState } from "react";
import styled from "styled-components";
import useModal from "../../../../hooks/useModal";
import { formatNumber } from "../../../../utils";
import FiltersReports from "./FiltersReports";
import ModalViewChart from "./ModalViewChart";
import DrawerPreviewReport from "./PreviewDialog";
import { heads } from "./heads";
import useSummariesGroup from "./hooks/useSummariesGroup";
import { ReportExecutivesLayout } from "./styles";
import { Pagination } from "@mui/material";
import ModalChart from "./chart";
import TableLoader from "./tableLoader";

// import { FixedSizeList } from "react-window";

export default function ReportsManager() {
  const { open, toggleModal } = useModal();
  const router = useRouter();
  const { open: openDrawer, toggleModal: toggleDrawer } = useModal();
  const [startDate, setStartDate] = useState(dayjs().startOf("month").format());
  const [finishDate, setFinishDate] = useState(dayjs().endOf("month").format());
  const [rowSelected, setRowSelected] = useState(null);

  const [tableType, setTableType] = useState("general");

  const {
    sumcategories,
    setSumcategories,
    totals: summariesCategories,
    isFetching,
    view,
    setview,
    handleChangeView,
    setExecutiveId,
    executiveId,
    handleDate,
    handleEvent,
    values,
    setValues,
    page,
    limit,
    count,
    handleOnChangePage,
    restorePage,
  } = useSummariesGroup(startDate, finishDate);

  const handleOnFind = value => {
    setSumcategories([]);
    if (
      value.view === "categoriesbygroup" ||
      value.view === "productsbygroup" ||
      value.view === "entitiesbygroup" ||
      value.view === "prospectsclientes"
    ) {
      setview(value.view);
    } else {
      setview("common");
      setViews(value);
    }
    if (value.showby == "general") {
      setTableType("general");
    } else {
      setTableType("normal");
    }
    handleEvent();
    restorePage();
  };

  const [views, setViews] = useState(false);
  const [openActionsRow, setOpenActionsRow] = useState(false);
  const anchorActions = Boolean(openActionsRow);
  const handleCloseActionsRow = () => setOpenActionsRow(false);
  const handleClickOpenActions = (event, itemRow) => {
    setRowSelected(itemRow);
    setOpenActionsRow(event.currentTarget);
  };

  const handleNavigateSales = type => {
    let params = {};
    switch (type) {
      case "entitiesbygroup":
        params = {
          entna: rowSelected.Nombre,
          entid: rowSelected.id,
        };
        break;
      case "categoriesbygroup":
        params = { catid: rowSelected.id, catna: rowSelected.Nombre };

        break;
      case "productsbygroup":
        params = { proid: rowSelected.id, proco: rowSelected.Codigo };
        break;
    }
    router.push({ pathname: "/ventas", query: params });
  };

  const handleNavigateOportunties = type => {
    let params = {};
    switch (type) {
      case "entitiesbygroup":
        params = {
          entNa: rowSelected.Nombre,
          entId: rowSelected.id,
        };
        break;
      case "categoriesbygroup":
        params = { catId: rowSelected.id, catNa: rowSelected.Nombre };

        break;
      case "productsbygroup":
        params = { proId: rowSelected.id, proCo: rowSelected.Codigo };
        break;
    }
    router.push({ pathname: "/oportunidades", query: params });
  };

  return (
    <ReportExecutivesLayout>
      <FiltersReports
        executiveSelected={executiveId}
        setExecutiveSelected={setExecutiveId}
        startDate={startDate}
        finishDate={finishDate}
        setStartDate={setStartDate}
        setFinishDate={setFinishDate}
        handleDate={handleDate}
        handleOnFind={handleOnFind}
        values={values}
        setValues={setValues}
        handleOnChangePage={handleOnChangePage}
        resertPage={restorePage}
      />

      <Grid container className="report_section">
        <Grid item md={12} className="order">
          <Button onClick={() => toggleModal()}>Ver Grafica</Button>
        </Grid>

        {isFetching && (
          <Grid item xs={12} md={12} className="table">
            <TableLoader tableType={tableType} heads={heads} view={view} sumcategories={sumcategories}></TableLoader>
          </Grid>
        )}
        {!isFetching && (
          <Grid item xs={12} md={12} className="table">
            {tableType == "general" && (
              <Table>
                <thead>
                  <tr>
                    {heads[view]?.map((item, index) => {
                      return (
                        <TableHeader key={index} index={item.id} last={heads[view].length - 1 == index ? true : false}>
                          {item}
                        </TableHeader>
                      );
                    })}
                  </tr>
                </thead>
                <tbody>
                  {sumcategories.map((item, index) => {
                    return (
                      <tr key={item.id}>
                        <TableData>
                          <span style={{ color: "rgba(0, 0, 0,0.7)", fontWeight: "bold" }}>{index + 1}</span>-
                          {item.Code || item.Nombre}
                        </TableData>
                        {view == "productsbygroup" && <TableData>{item.Categoria}</TableData>}
                        <TableData bg={item.colors?.Leads}>{item.Leads}</TableData>
                        <TableData bg={item.colors?.Cotizado}>{formatNumber(item.Cotizado)}</TableData>
                        <TableData bg={item.colors?.Vendido}>{formatNumber(item.Vendido)}</TableData>

                        <TableData last>
                          {index !== 0 && (
                            <div>
                              <div
                                aria-controls="fade-menu"
                                aria-haspopup="true"
                                className="action__icon"
                                onClick={e => handleClickOpenActions(e, item)}
                              >
                                <MoreVert />
                              </div>

                              <StyledMenu
                                id="fade-menu"
                                anchorEl={openActionsRow}
                                keepMounted
                                open={Boolean(anchorActions)}
                                onClose={handleCloseActionsRow}
                              >
                                <div className="options">
                                  <div className="options__option" onClick={() => handleNavigateOportunties(view)}>
                                    <p>Ver Oportunidades</p>
                                  </div>

                                  <div className="options__option" onClick={() => handleNavigateSales(view)}>
                                    <p>Ver Ventas</p>
                                  </div>
                                </div>
                              </StyledMenu>
                            </div>
                          )}
                        </TableData>
                      </tr>
                    );
                  })}
                </tbody>
              </Table>
            )}

            {tableType == "normal" && (
              <div>
                <Table>
                  <thead>
                    <tr>
                      <TableHeader>Nombre</TableHeader>
                      <TableHeader>Total</TableHeader>
                    </tr>
                  </thead>

                  <tbody>
                    {sumcategories.map(itemX => (
                      <tr key={itemX.id}>
                        <TableData>{itemX.Nombre}</TableData>
                        <TableData>{itemX.Total}</TableData>
                      </tr>
                    ))}
                  </tbody>
                </Table>
                <Pagination
                  style={{ display: "flex", justifyContent: "end" }}
                  page={page}
                  defaultPage={1}
                  onChange={handleOnChangePage}
                  shape="rounded"
                  count={Math.ceil(count / limit)}
                  color="primary"
                />
              </div>
            )}
            {sumcategories.length <= 0 && (
              <TableEmptyFake>
                <div className="message_ctr">
                  <img src="/empty_table.svg" />
                  <p>Aun no hay datos</p>
                </div>
              </TableEmptyFake>
            )}
          </Grid>
        )}
      </Grid>

      {view === "categoriesbygroup" ||
      view === "productsbygroup" ||
      view === "entitiesbygroup" ||
      view === "prospectsclientes" ? (
        <ModalViewChart data={sumcategories} open={open} toggleModal={toggleModal} />
      ) : (
        <ModalChart data={sumcategories} open={open} toggleModal={toggleModal} view={views} />
      )}
      <DrawerPreviewReport openDrawer={openDrawer} toggleDrawer={toggleDrawer} />
    </ReportExecutivesLayout>
  );
}

const TableEmptyFake = styled.div`
  position: relative;
  width: 100%;
  padding: 40px;
  height: 250px;

  .message_ctr {
    height: 100%;
    img {
      width: 100%;
      height: 100%;
      object-fit: contain;
    }
    p {
      text-align: center;
      color: #8a8a8a;
    }
  }
`;

export const StyledMenu = styled(Menu)`
  p {
    margin: 0;
    padding: 0;
  }
  .MuiPaper-elevation8 {
    box-shadow: 0px 5px 5px -3px rgb(0 0 0 / 9%), 0px 8px 10px 1px rgb(0 0 0 / 1%), 0px 3px 5px 2px rgb(0 0 0 / 5%);
  }

  .options {
    display: flex;
    flex-direction: column;

    &__option {
      padding: 5px 10px;
      display: flex;
      align-items: center;
      p {
        display: flex;
        color: #000;
        text-transform: capitalize;
        font-weight: 500;
      }

      svg {
        color: #f97faa;
        margin-right: 5px;
      }
      &:hover {
        transition: all 0.3s ease;
        background: #fae0e9;
        cursor: pointer;
      }
    }
    .disable {
      &:hover {
        background: none;
        cursor: not-allowed;
      }
    }
  }
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
  tr {
    background-color: #ffff;
    min-width: 250px;
    /* position: sticky; */
    /* cursor: pointer; */
    padding: 5px 10px;
  }
`;

const TableHeader = styled.th`
  /* border: 1px solid #ddd;   */
  background-color: #405189;
  color: #fff;
  padding: 8px;
  text-align: left;
  width: 30px;
`;

const TableData = styled.td`
  border: 1px solid #ddd;
  background-color: ${props => (props.bg ? props?.bg : "#f3f3f3")};
  padding: 8px;
  ${props => (props.last ? "min-width: 20px;" : "min-width: 250px;")}
  padding: 5px 10px;

  .action__icon {
    display: flex;
    justify-content: flex-end;

    svg {
      color: #405189;
      cursor: pointer;
    }
  }
`;
