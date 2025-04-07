import TableLimenkaGeneral from "../../components/TableLimenkaGeneral";
import useInvetory from "./hooks/useInventory";
import { BiomedicaInventoryStyle } from "./styles";
import { Search, Close, UpdateSharp } from "@material-ui/icons";
import { IconButton } from "@material-ui/core";
import NewProduct from "./components/NewProduct";
import { useSelector } from "react-redux";
import { userSelector } from "../../redux/slices/userSlice.js";
import LogisticsFilters from "../../components/LogisticsFilters";
import ActiveFilters from "./components/ActiveFilters";
import useFilters from "./hooks/useFilters";
import { filtersInventario } from "./data";

export default function BiomedicalInventoryManager({type}) {
  const { activeFilters, setActiveFilters, handleOnChangeFilter } = useFilters();
  const {
    totalproduct,
    isFetchingData,
    tableData,
    paginationData,
    keyword,
    openNew,
    producSelect,
    isEditing,
    setProductSelect,
    refreshData,
    handleDrawerClose,
    handleOnClickEdit,
    handleOnChangeKeyWord,
    handleOnClickProduct,
    deleteKeyWord
  } = useInvetory(activeFilters, type);

  const { roleId } = useSelector(userSelector);

  let actions = [
    {
      name: "Editar",
      action: e => { handleOnClickEdit(e) },
    },
  ];


  return (
    <BiomedicaInventoryStyle>
      <div className="conten_inventory">
        <div className="conten_inventory__header">
          <h4 className="title_header">Inventario <span>(Total {totalproduct})</span></h4>
          <div className="search_box">
            <div className="inputContainer">
              <Search className="inputContainer__icon" />
              <input
                value={keyword}
                onChange={e => handleOnChangeKeyWord(e)}
                placeholder="Buscar por nombre"
                className="inputContainer__input"
              />
              {keyword.length > 3 && (
                <IconButton className="inputContainer__clean" onClick={() => deleteKeyWord()}>
                  <Close />
                </IconButton>

              )}
            </div>
          </div>
          <LogisticsFilters
            filters={filtersInventario}
            activeFilters={activeFilters}
            setActiveFilters={setActiveFilters}
            handleOnChangeFilter={handleOnChangeFilter}
          />
          
          <IconButton onClick={() => refreshData()}>
            <UpdateSharp />
          </IconButton>
          {roleId !== "director_de_logistica" && (
            <div className="btn_new">
              <button className="butt"onClick={() => handleOnClickProduct()}>
                Agregar Nuevo
              </button>
            </div>
          )}
        </div>
        <ActiveFilters
          activeFilters={activeFilters}
          handleOnChangeFilter={handleOnChangeFilter}
          setActiveFilters={setActiveFilters}
         />
        <div className="">
          <TableLimenkaGeneral
            heads={tableData.heads}
            data={tableData.data}
            customColumns={tableData.customColumns}
            actions={roleId !== "director_de_logistica" ? tableData.actions : undefined}
            typeTable="border"
            mainColumn={"Nombre"}
            isLoading={isFetchingData}
            paginationData={{
              ...paginationData,
              total: totalproduct,
            }}
          />
        </div>
      </div>
      <NewProduct
        open={openNew}
        close={handleDrawerClose}
        refreshData={refreshData}
        producSelect={producSelect}
        isEditing={isEditing}
        setProductSelect={setProductSelect}
      />
    </BiomedicaInventoryStyle>
  )
}

