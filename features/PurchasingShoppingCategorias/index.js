import React from "react";
import { PurchasingManagerShoppingCategoriasStyled } from "./styles";
import { Add, Cached, Close, Search } from "@material-ui/icons";
import { Button, IconButton, Tooltip } from "@material-ui/core";
import useSearchCategories from "./hooks/useSearchCategories";
import TableLimenkaGeneral from "../../components/TableLimenkaGeneral";
import useModalEdit from "./hooks/useModalEdit";
import ModalEdit from "./components/ModalEdit/modalEdit";
import { useForm } from "react-hook-form";
import useModalDelete from "./hooks/useModalDelete";
import ModalDelete from "./components/ModalDelete/modalDelete";
import { useRouter } from "next/router";
import useModal from "../../hooks/useModal.js";
import FormAddCategory from "./components/FormAddCategory/index.js";
import AlertGlobal from "../../components/Alerts/AlertGlobal.js";
import usePostCategory from "./hooks/usePostCategory.js";

function PurchasingManagerShoppingCategorias() {
  const { open, toggleModal } = useModal();
  const { alert, setName, createNewCategory } = usePostCategory(toggleModal);
  const router = useRouter();
  const {
    handleSubmit,
    register,
    setValue,
    formState: { errors },
  } = useForm();
  const { showUpload, setShowUpload, handleCloseEdit } = useModalEdit();
  const { showDelete, setShowDelete, handleCloseDelete } = useModalDelete();
  const {
    keyWord,
    handleChangeWord,
    handleDeleteWord,
    tableData,
    orderBy,
    setOrderBy,
    paginationData,
    dataToUpload,
    handleUpdateCategory,
    refreshData,
    handleDeleteCategory,
    selectItemCategory,
  } = useSearchCategories(setShowUpload, setValue, handleCloseEdit, setShowDelete, handleCloseDelete, open);
  const {
    data: { data, fetching, countCategories },
    heads,
    actions,
    customColumns,
  } = tableData;
  return (
    <PurchasingManagerShoppingCategoriasStyled>
      <div className="header">
        <div className="heads">
          <div className="header__title">
            <h4>
              Categorias <span>({countCategories})</span>
            </h4>
          </div>

          <div className="header__filters">
            <div className="inputContainer">
              <Search className="inputContainer__icon" />
              <input
                value={keyWord}
                onChange={e => handleChangeWord(e)}
                className="inputContainer__input"
                placeholder="Buscar categoria por nombre"
              />

              {keyWord.length > 3 && (
                <IconButton className="inputContainer__clean" onClick={() => handleDeleteWord()}>
                  <Close />
                </IconButton>
              )}
            </div>
            <Tooltip title={"Recargar"} onClick={() => refreshData()}>
              <IconButton className="btnReload">
                <Cached />
              </IconButton>
            </Tooltip>
          </div>
        </div>
        <div className="header__btnAddCategory">
          <div className="btn">
            <Button onClick={() => toggleModal()} className="btnActionAdd">
              <Add />
              <p>Agregar Categoria</p>
            </Button>
          </div>
        </div>
      </div>

      <div className="main">
        <TableLimenkaGeneral
          mainColumn={"Categoria"}
          heads={heads}
          isLoading={fetching}
          actions={actions}
          data={data}
          customColumns={customColumns}
          typeTable="border"
          orderBy={orderBy}
          setOrderBy={setOrderBy}
          rowsLoader={countCategories >= 10 ? 10 : countCategories || 10}
          paginationData={{
            ...paginationData,
            total: countCategories,
          }}
        />
      </div>

      {showUpload && (
        <ModalEdit
          showUpload={showUpload}
          handleCloseEdit={handleCloseEdit}
          register={register}
          setValue={setValue}
          handleSubmit={handleSubmit}
          errors={errors}
          dataToUpload={dataToUpload}
          handleUpdateCategory={handleUpdateCategory}
        />
      )}

      {showDelete && (
        <ModalDelete
          showDelete={showDelete}
          handleCloseDelete={handleCloseDelete}
          handleDeleteCategory={handleDeleteCategory}
          selectItemCategory={selectItemCategory}
          handleSubmit={handleSubmit}
        />
      )}

      {open && (
        <FormAddCategory
          open={open}
          toggleModal={toggleModal}
          setName={setName}
          createNewCategory={createNewCategory}
        />
      )}

      {alert?.show && (
        <AlertGlobal severity={alert.severity} message={alert.message} show={alert.show} type={alert.type} />
      )}
    </PurchasingManagerShoppingCategoriasStyled>
  );
}

export default PurchasingManagerShoppingCategorias;
