import { UnitStyle } from "./styles";
import { Search, Close,UpdateSharp } from "@material-ui/icons";
import TableLimenkaGeneral from "../../components/TableLimenkaGeneral";
import useTransporUnits from "./hooks/useTransporUnits";
import { IconButton } from "@material-ui/core";
import NewUnit from "./components/NewUnit";
import useDeleteUnit from "./hooks/useDeleteUnit";
import DeleteUnit from "./components/DeleteUnit";

export default function DirLogUnits(){
    const {
        isFetchingData,
        paginationData,
        tableData,
        totalUnitsTransport,
        keyword,
        openUnits,
        isEditing,
        unitSelect,
        setUnitSelect,
        handleOnClickEdit,
        handleOnClickUnits,
        handleToggleUnits,
        refreshData,
        deleteKeyWord,
        handleOnChangeKeyWord,
    } = useTransporUnits();

    const {
      openDeleteUnit,
      handleToggleDeleteUnit,
      handleOnclickDelete,
      handledeleteUnit,
    } = useDeleteUnit({refreshData,unitSelect,setUnitSelect});  
    let actions = [
        {
          name: "Editar",
          action: e => {handleOnClickEdit(e)},
        },
        {
          name: "Eliminar",
          action: e => {handleOnclickDelete(e)},
        },
      ];
    
    return(
        <UnitStyle>
        <div className="content_driver">
        <div className="content_driver__header">
        <h4 className="title_header">Unidades <span>( Total {totalUnitsTransport})</span></h4>
        <div className="search_box">
            <div className="inputContainer">
            <Search className="inputContainer__icon" />
            <input
              value={keyword}
              onChange={e => handleOnChangeKeyWord(e)}
              className="inputContainer__input"
              placeholder="Buscar por modelo"
            />

            {keyword.length > 3 && (
              <IconButton className="inputContainer__clean" onClick={() => deleteKeyWord()}>
                <Close />
              </IconButton>
            )}
            </div>
            </div>
            <IconButton onClick={() => refreshData()}>
            <UpdateSharp />
          </IconButton>
          <div className="btn_new">
            <button onClick={() => handleOnClickUnits()}>Agregar Nuevo</button>
          </div>
        </div> 
        <div className="">
            <TableLimenkaGeneral 
            heads={tableData.heads}
            data={tableData.data}
            actions={actions}
            typeTable="border"
            mainColumn={"Modelo"}
            isLoading={isFetchingData}
            rowsLoader={totalUnitsTransport >= 20 ? 20 : totalUnitsTransport}
            paginationData={{
              ...paginationData,
              total: totalUnitsTransport,
            }}
            />
          </div>  
        </div>
        <NewUnit 
          open={openUnits}
          handleToggleUnits={handleToggleUnits}
          refreshData={refreshData}
          isEditing={isEditing}
          setUnitSelect={setUnitSelect}
          unitSelect={unitSelect}
          />
             <DeleteUnit
          openDeleteUnit={openDeleteUnit}
          onCloseUnit={handleToggleDeleteUnit}
          unitSelect={unitSelect}
          handledeleteUnit={handledeleteUnit}
          />
        </UnitStyle>
    )
}