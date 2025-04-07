import React from "react";
import { Container, ExecutiveProspectsStyled } from "./styles";
import useProspectsList from "./hooks/useProspectsList";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import ColumnProspects from "./components/ColumnProspects";
import { Close, DragIndicator, Search } from "@material-ui/icons";
import { CircularProgress, IconButton } from "@material-ui/core";
import Filters from "../DirLogPedidos/components/Filters";
import TableLimenkaGeneral from "../../components/TableLimenkaGeneral";
import ModalPreview from "../ExecutiveProspects/components/ModalPreview";
import ProspectItem from "./components/ProspectItem/ProspectItem";

export default function ExecutiveProspectsV2() {
  const {
    columnsData,
    pendingsData,
    trackings,
    setColumns,
    handleScrollColumn,
    openPreview,
    toogleModalPreview,
    handleClickProspect,
    prospectSelected,
    updateProspectPhase,
    handleTest,
    tableData,
    onDragEnd,
    fetchProspectByEachPhase,
  } = useProspectsList();

  return (
    <ExecutiveProspectsStyled>
      <Container className="mdadain">
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId="all-columns" direction="horizontal" type="column">
            {provided => (
              <div className="board" {...provided.droppableProps} ref={provided.innerRef}>
                {columnsData.columnsOrder?.map((columnId, index) => {
                  const column = columnsData.columns[columnId];
                  return (
                    <Draggable draggableId={column.id} index={index} key={column.id}>
                      {provided => (
                        <div className="column" {...provided.draggableProps} ref={provided.innerRef}>
                          <div className="columnheader">
                            <h2 {...provided.dragHandleProps}>{column.name}</h2>

                            <div className="row">
                              <p>({column.total}) Leads</p>
                              <DragIndicator />
                            </div>
                          </div>
                          <div className="comumnIitems" onScroll={e => handleScrollColumn(e, column)}>
                            <Droppable droppableId={column.id} type="task">
                              {provided => (
                                <div className="item-list" {...provided.droppableProps} ref={provided.innerRef}>
                                  {column.items.map((item, index) => (
                                    <Draggable key={item.id} draggableId={item.id} index={index}>
                                      {provided => (
                                        <div
                                          onClick={() => handleClickProspect(item)}
                                          className="item"
                                          {...provided.draggableProps}
                                          {...provided.dragHandleProps}
                                          ref={provided.innerRef}
                                        >
                                          <div
                                            style={
                                              {
                                                // height: 100,
                                              }
                                            }
                                          >
                                            <ProspectItem
                                              item={item}
                                              index={index}
                                              handleClickProspect={handleClickProspect}
                                            />
                                          </div>
                                          {/* {item} */}
                                        </div>
                                      )}
                                    </Draggable>
                                  ))}
                                  {provided.placeholder}
                                </div>
                              )}
                            </Droppable>

                            {/* {column.isFetching && <div>Cargando...</div>} */}
                          </div>

                          {column.isFetching && (
                            <div className="fethingdata">
                              <CircularProgress />
                              <p className="message">Obteniendo datos</p>
                            </div>
                          )}
                        </div>
                      )}
                    </Draggable>
                  );
                })}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>

        <ModalPreview
          trackings={trackings}
          pendingsData={pendingsData}
          prospectSelected={prospectSelected}
          open={openPreview}
          toggleModal={toogleModalPreview}
        />
      </Container>
    </ExecutiveProspectsStyled>
  );
}
