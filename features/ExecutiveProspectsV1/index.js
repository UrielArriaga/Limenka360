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
  } = useMain(viewType);

  const [openLimiBotChat, setOpenLimiBotChat] = useState(false);

  const toogleLimiBotChat = (item) => setOpenLimiBotChat(!openLimiBotChat);

  const viewComponents = {
    table: (
      <TableProspects
        data={dataSet.results}
        heads={tableData.heads}
        mainColumn={"fullname"}
        onRowMainColumnClick={actionsItem.handleOnClickProspects}
        customColumns={{
          phase: {
            columname: "phase",
            component: (item) => {
              return (
                <div
                  className="TableName"
                  style={{
                    color: item?.phasecolor,
                    borderRadius: "5px",
                    padding: "0.5rem",
                  }}
                >
                  <p
                    className="name"
                    style={{
                      // color: "#034D6F",
                      fontWeight: "bold",
                      // backgroundColor: item?.phasecolor,
                    }}
                    onClick={() => {
                      console.log(item);
                    }}
                  >
                    {item.phase}
                  </p>
                </div>
              );
            },
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
    report: <ReportView />,
    view: <div style={{ padding: "2rem" }}>tambien</div>,
  };

  return (
    <ExecutiveProspectsStyled>
      {viewType !== "report" && (
        <FilterProspects
          viewType={viewType}
          setViewType={setViewType}
          handleRefetch={handleRefetch}
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
    </ExecutiveProspectsStyled>
  );
}
