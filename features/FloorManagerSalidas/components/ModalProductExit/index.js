import React from "react";
import { ModalProductExitStyled } from "./styles";
import { Close, Search, UpdateSharp } from "@material-ui/icons";
import { IconButton } from "@material-ui/core";
import TableLimenkaGeneral from "../../../../components/TableLimenkaGeneral";
import useDirLogProducts from "../../hooks/useDirLogProducts";

import useAlertToast from "../../../../hooks/useAlertToast";

export default function ModalProductExit({
  open = true,
  onClose = () => {},
  productSelected,
  handleExitProducts,
  products,
  // wareHouseproductsData,
  // orderSelectedData,
  // productsData,
  // handleOnClickClosePreview,
  // toggleTrackingsModal,
  // handleToggleFiles,
}) {
  const {
    selectedRows,
    setSelectedRows,
    wareHouseproductsData,
    tableData,
    keyword,
    handleOnChangeKeyWord,
    deleteKeyWord,
    paginationData,
  } = useDirLogProducts(productSelected);

  const { showAlertSucces } = useAlertToast();
  return (
    <ModalProductExitStyled
      open={open}
      onClose={onClose}
      aria-labelledby="simple-modal-title"
      aria-describedby="simple-modal-description"
    >
      <div className="modalbody">
        <div className="modalbody__title">
          <h2>Salida de Producto</h2>

          {/* {paginationData.page} */}
        </div>

        <div className="orderad">
          <h3>Producto por sutir : </h3>
          <p>
            <span style={{ color: "#2979ff" }}>
              {" "}
              {productSelected?.product?.code} ({productSelected?.quantity})
            </span>{" "}
            - {productSelected?.product?.name}
          </p>
          {/* <p>{productSelected?.product?.code}</p> */}
          <div className="orderad__productselected"></div>
        </div>

        <div className="header">
          <div className="header__title">
            <h4>
              Productos <span>(Total {wareHouseproductsData.totalProducts})</span>
            </h4>
          </div>

          <div className="header__filters">
            <div className="inputContainer">
              <Search className="inputContainer__icon" />

              <input
                value={keyword}
                onChange={e => handleOnChangeKeyWord(e)}
                className="inputContainer__input"
                placeholder="Buscar por folio, producto"
              />

              {keyword.length > 3 && (
                <IconButton className="inputContainer__clean" onClick={() => deleteKeyWord()}>
                  <Close />
                </IconButton>
              )}
            </div>
            {/* 
          <Filters
            activeFilters={activeFilters}
            setActiveFilters={setActiveFilters}
            handleOnChangeFilter={handleOnChangeFilter}
          /> */}
          </div>
        </div>

        <div className="body">
          <TableLimenkaGeneral
            heads={tableData.heads}
            actionsSelected={[
              {
                icon: <UpdateSharp />,
                title: "Surtir",
                action: rows => {
                  handleExitProducts(selectedRows);
                  setSelectedRows([]);
                  onClose();
                  // showAlertSucces("Productos surtidos correctamente", 3000);
                  // let res = window.confirm("¿Estas seguro de surtir estos productos?");
                  // if (res) {
                  //   setSelectedRows([]);
                  //   onClose();
                  // } else {
                  //   setSelectedRows([]);
                  //   onClose();
                  // }
                  // console.log(res);
                  // console.log(rows);
                },
                className: "btn__surtir",
              },
              {
                icon: <UpdateSharp />,
                title: "Cancelar",
                action: rows => setSelectedRows([]),
                className: "btn__surtir",
              },
            ]}
            data={tableData.data}
            isSelectable
            isLoading={wareHouseproductsData.isFetchingData}
            selectedRows={selectedRows}
            setSelectedRows={setSelectedRows}
            onRowClick={item => {
              if (selectedRows.some((ce, index) => ce.id === item.id)) {
                setSelectedRows(selectedRows.filter((ce, index) => ce.id !== item.id));
              } else {
                setSelectedRows([...selectedRows, item]);
              }
            }}
            paginationData={{
              ...paginationData,
              total: wareHouseproductsData.totalProducts,
            }}
            styles={{
              widthColumnId: 200,
              widthColumn: 100,
              minHeight: 500,
              headerColor: "#212529",
              headerColorSecondary: "#5d6873",
              headerTextColor: "#ffff",
              primaryColor: "#f2f2f2",
              secondaryColor: "#fff",
              hoverColor: "#c9cfd4",
              nthChild: "#e0e0e0",
            }}
          />

          {keyword}
        </div>
      </div>
    </ModalProductExitStyled>
  );
}
