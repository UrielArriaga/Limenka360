import React from "react";
import { Container, ExecutiveProspectsStyled } from "./styles";
import useProspectsList from "./hooks/useProspectsList";
import { DragDropContext } from "react-beautiful-dnd";
import ModalPreview from "./components/ModalPreview";
import ColumnProspects from "./components/ColumnProspects";
import { Close, Search } from "@material-ui/icons";
import { IconButton } from "@material-ui/core";
import Filters from "../DirLogPedidos/components/Filters";
import TableLimenkaGeneral from "../../components/TableLimenkaGeneral";

export default function ExecutiveProspects() {
  const {
    columns,
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
  } = useProspectsList();

  return (
    <ExecutiveProspectsStyled>
      <div className="header">
        <div className="header__title">
          <h4>Prospectos</h4>
        </div>

        <div className="header__filters">
          <div className="inputContainer">
            <Search className="inputContainer__icon" />
            <input
              // value={keyword}
              // onChange={e => handleOnChangeKeyWord(e)}
              className="inputContainer__input"
              placeholder="Buscar por folio, producto"
            />

            {true > 3 && (
              <IconButton
                className="inputContainer__clean"
                onClick={() => deleteKeyWord()}
              >
                <Close />
              </IconButton>
            )}
          </div>

          <Filters />
        </div>
      </div>

      {/* <div className="main">
        <TableLimenkaGeneral heads={tableData.heads} data={tableData.data} typeTable="border" />
      </div> */}
      <Container className="main">
        <div
          style={{
            display: "flex",
            // width: "50%",
            // background: "red",
            // overflowX: "auto",
          }}
        >
          <DragDropContext
            onDragEnd={(result) => onDragEnd(result, columns, setColumns)}
          >
            {Object.entries(columns).map(([columnId, column], index) => {
              return (
                <ColumnProspects
                  columnId={columnId}
                  column={column}
                  index={index}
                  handleScrollColumn={handleScrollColumn}
                  handleClickProspect={handleClickProspect}
                />
              );
            })}
          </DragDropContext>
        </div>

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
