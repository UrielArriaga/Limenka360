import TableLimenkaGeneral from "../../components/TableLimenkaGeneral";
import DeleteDriver from "./components/DeleteDriver";
import NewDriver from "./components/NewDriver";
import useDeleteDriver from "./hooks/useDeleteDriver";
import useDrivers from "./hooks/useDrivers";
import { DriversStyle } from "./styles";
import { IconButton } from "@material-ui/core";
import { Search, Close,UpdateSharp } from "@material-ui/icons";
export default function DirLogDrivers(){

  const {
        paginationData,
        tableData,
        keyword,
        openDriver,
        isEditing,
        driverSelect,
        setDriverSelect,
        handleOnClickEdit,
        handleOnClickDriver,
        handleToggleDriver,
        refreshData,
        deleteKeyWord,
        handleOnChangeKeyWord,
    } = useDrivers();
    const {
      openDeleteDriver,
      handleToggleDeleteDriver,
      handleOnclickDelete,
      handledeleteDriver,
    } = useDeleteDriver({refreshData,driverSelect,setDriverSelect});  

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
        <DriversStyle>
            <div className="content_driver">
        <div className="content_driver__header">
          <h4 className="title_header">Choferes <span>( Total {tableData?.total})</span></h4>
          <div className="search_box">
            <div className="inputContainer">
            <Search className="inputContainer__icon" />
            <input
              value={keyword}
              onChange={e => handleOnChangeKeyWord(e)}
              className="inputContainer__input"
              placeholder="Buscar por nombre"
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
            <button onClick={() => handleOnClickDriver()}>Agregar Nuevo</button>
          </div>
          </div>
          <div className="">
            <TableLimenkaGeneral 
            heads={tableData.heads}
            data={tableData.data}
            actions={actions}
            typeTable="border"
            mainColumn={"Nombre"}
            isLoading={tableData?.isFetching}
            rowsLoader={tableData?.total >= 20 ? 20 : tableData?.total}
            paginationData={{
              ...paginationData,
              total: tableData?.total,
            }}
            />
          </div>
          </div>
          <NewDriver 
          open={openDriver}
          handleToggleDriver={handleToggleDriver}
          refreshData={refreshData}
          isEditing={isEditing}
          setDriverSelect={setDriverSelect}
          driverSelect={driverSelect}
          />
          <DeleteDriver 
          openDriver={openDeleteDriver}
          onCloseDriver={handleToggleDeleteDriver}
          driverSelect={driverSelect}
          handledeleteDriver={handledeleteDriver}
          setDriverSelect={setDriverSelect}
          />
        </DriversStyle>

    )
}

