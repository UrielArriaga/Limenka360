import React, { Suspense, useState } from "react";
import { DragDropContext } from "react-beautiful-dnd";
import ModalPreview from "../ExecutiveProspects/components/ModalPreview";
import FilterProspects from "./components/FilterProspects";
import Kanban from "./components/Kanban";
import LimiBotChatIA from "./components/LimiBotChatIA";
import ModalMovePhase from "./components/ModalMovePhase";
import NewOportunity from "./components/NewOportunity";
import TableProspects from "./components/TableProspects";
import useMain from "./hooks/useMain";
import { ExecutiveProspectsStyled } from "./styled";
import ReportView from "./components/ReportView";
import CalendarView from "./components/CalendarView";
import useReports from "./hooks/useReports";
import { IconButton } from "@material-ui/core";
import { CalendarToday, Dock, Email, WhatsApp } from "@material-ui/icons";
import styled from "styled-components";
import PopoverTracking from "./components/Kanban/Item/PopoverTracking";
import useItemActions from "./hooks/useItemActions";

export default function ExecutivesProspectsV1() {
  const [viewType, setViewType] = useState("kanban");
  const {
    actionsItem,
    data,
    dataSet,
    dataCalendar,
    tableData,
    modalActions,
    handleRefetch,
    handleInfiniteScroll,
    onDragEnd,
    onDragStart,
    prospectSelected,
    inputStates,
    filters,
    setFilters,
    paginationData,
  } = useMain(viewType);

  const [openLimiBotChat, setOpenLimiBotChat] = useState(false);

  const { tracking, itemValue } = useItemActions();

  console.log(itemValue);

  const toogleLimiBotChat = (item) => setOpenLimiBotChat(!openLimiBotChat);

  const viewComponents = {
    table: (
      <TableProspects
        data={dataSet.results}
        heads={tableData.heads}
        paginationData={{
          ...paginationData,
          total: dataSet.count,
        }}
        mainColumn={"fullname"}
        onRowMainColumnClick={actionsItem.handleOnClickProspects}
        customColumns={{
          phase: {
            columname: "phase",
            component: (item) => (
              <StyledCell color={item?.phasecolor}>
                <StyledText onClick={() => console.log(item)}>
                  {item.phase}
                </StyledText>
              </StyledCell>
            ),
          },

          email: {
            columname: "email",
            component: (item) => (
              <StyledCell color={item?.phonecolor}>
                <StyledText onClick={() => console.log(item)}>
                  {item.email}
                </StyledText>
                {item?.email !== "Sin telefono" && (
                  <IconButton>
                    <Email />
                  </IconButton>
                )}
              </StyledCell>
            ),
          },

          phone: {
            columname: "phone",
            component: (item) => (
              <StyledCell color={item?.phonecolor}>
                <StyledText
                  onClick={() => {
                    actionsItem.handleOnClickProspects(item);
                    console.log(item);
                  }}
                >
                  {item.phone}
                </StyledText>
                {item?.phone !== "Sin telefono" && (
                  <IconButton>
                    <WhatsApp />
                  </IconButton>
                )}
              </StyledCell>
            ),
          },

          lastTrackingcreatedAt: {
            columname: "lastTrackingcreatedAt",
            component: (item) => (
              <StyledCell color={item?.phonecolor}>
                <StyledText onClick={() => console.log(item)}>
                  {item.lastTrackingcreatedAt}
                </StyledText>

                {item?.phone !== "Sin telefono" && (
                  <IconButton onClick={(e) => tracking.handleOpen(e, item)}>
                    <Dock />
                  </IconButton>
                )}
              </StyledCell>
            ),
          },
        }}
      />
    ),
    kanban: (
      <div className="scrollsection">
        <DragDropContext onDragEnd={onDragEnd} onDragStart={onDragStart}>
          <div className="kanban">
            <Kanban
              data={data}
              handleFecthMore={handleInfiniteScroll}
              actions={actionsItem}
            />
          </div>
        </DragDropContext>
      </div>
    ),
    calendar: <CalendarView data={dataCalendar} actions={actionsItem} />,
    report: (
      <ReportView viewTypePage={viewType} setViewTypePage={setViewType} />
    ),
    view: <div style={{ padding: "2rem" }}>tambien</div>,
  };

  return (
    <ExecutiveProspectsStyled>
      {viewType !== "report" && (
        <FilterProspects
          viewType={viewType}
          setViewType={setViewType}
          handleRefetch={handleRefetch}
          inputStates={inputStates}
          setFilters={setFilters}
          filters={filters}
        />
      )}

      <Suspense
        fallback={<div style={{ padding: "1rem" }}>Cargando vista...</div>}
      >
        {viewComponents[viewType] || <div>Vista no disponible</div>}
      </Suspense>

      <ModalPreview
        trackings={[]}
        pendingsData={[]}
        prospectSelected={prospectSelected}
        open={modalActions.modalViews.preview}
        toggleModal={() => modalActions.handleToggleModal("preview")}
      />
      <LimiBotChatIA
        trackings={[]}
        pendingsData={[]}
        prospectSelected={prospectSelected}
        open={openLimiBotChat}
        toggleModal={toogleLimiBotChat}
      />
      <NewOportunity
        open={modalActions.modalViews.newOportunity}
        toggleModal={() => modalActions.handleToggleModal("newOportunity")}
      />
      <ModalMovePhase
        open={modalActions.modalViews.modalPhase}
        toggleModal={() => modalActions.handleToggleModal("modalPhase")}
      />

      <PopoverTracking
        open={tracking.open}
        anchorEl={tracking.anchorEl}
        onClose={tracking.handleClose}
        handleOpen={tracking.handleOpen}
        prospectSelected={prospectSelected}
      />
    </ExecutiveProspectsStyled>
  );
}

const StyledCell = styled.div`
  border-radius: 5px;
  padding: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: ${(props) => props.color || "#000"};
`;

const StyledText = styled.p`
  font-weight: bold;
  margin: 0;
  cursor: pointer;
`;
