import React from "react";
import useGlobalCommons from "../../../../hooks/useGlobalCommons";
import { useSelector } from "react-redux";
import { commonSelector } from "../../../../redux/slices/commonSlice";
import { Controller, useForm } from "react-hook-form";
import Select from "react-select";
import { selectStyle } from "../../styles";
import { IconButton, Tooltip, Button, Checkbox } from "@material-ui/core";
import { DeleteForever } from "@material-ui/icons";

function TableArticles({ productToArticle, handleValidateDataInputs, deleteToList, warehouses, selectedProducts, conmProductSelection, generateUniqueSerials, toggleSelectAll }) {
  const { control, register } = useForm();
  const { getCatalogBy } = useGlobalCommons();
  const { warehouse } = useSelector(commonSelector);

  return (
    <div className="contentPreview">
      <div className="actions" style={{ display: "flex", justifyContent: "flex-end", gap: "15px", marginBottom: "15px" }}>
        <Button variant="contained" color="primary" size="small" onClick={toggleSelectAll} disabled={productToArticle.length === 0} >
          {selectedProducts.length === productToArticle.length ? "Deseleccionar Todos" : "Seleccionar Todos"}
        </Button>
        <Button variant="contained" color="secondary" size="small" onClick={generateUniqueSerials} disabled={!Array.isArray(selectedProducts) || selectedProducts.length === 0} >
          Generar Seriales
        </Button>
      </div>
      <div className="containerTable">
        <div className="containerTable__products">
          <div className="table">
            <div className="tableheader">
              <div className="tablehead code">
                <p>Producto</p>
              </div>

              <div className="tablehead">
                <p>Serial</p>
              </div>

              <div className="tablehead">
                <p>Almacen</p>
              </div>
              <div className="tablehead">
                <p>Comentarios</p>
              </div>
              <div className="tablehead">
                <p>Acciones</p>
              </div>
            </div>

            <div className="tablebody">
              {productToArticle?.map((product, index) => (
                <div key={index} className={`tablerow-container ${index % 2 === 0 ? "even-row" : "odd-row"}`}>
                  <div className="tablerow">
                    <div className="tablecell code">
                      <div className="content">
                        <Checkbox checked={Array.isArray(selectedProducts) && selectedProducts.includes(index)} onChange={() => conmProductSelection(index)} />
                        {product?.name}
                      </div>
                    </div>
                    <div className="tablecell code">
                      <input
                        className={`input_data`}
                        placeholder="Ingresa el serial del articulo"
                        type="text"
                        value={product.serial || ""}
                        onChange={e => handleValidateDataInputs(e.target.value, product, index, "serial")}
                      />
                    </div>

                    <div className="tablecell code">
                    <Select
                      className="select_data"
                      placeholder="Selecciona Almacén"
                      styles={selectStyle}
                      options={warehouse.results}
                      getOptionLabel={(option) => option.name}
                      getOptionValue={(option) => option.id}
                      value={warehouse.results?.find(wh => wh.id === product.warehouseId) || null}
                      onChange={(selectedOption) => 
                        handleValidateDataInputs(selectedOption, product, index, "warehouse")
                      }
                      isLoading={warehouse.isFetching}
                      noOptionsMessage={() => "Sin Opciones"}
                      onMenuOpen={() => getCatalogBy("warehouse")}
                      loadingMessage={() => "Cargando Opciones"}
                    />
                    </div>
                    <div className="tablecell code">
                      <textarea
                        className="input_observations"
                        placeholder="comentarios"
                        onChange={e => handleValidateDataInputs(e.target.value, product, index, "comments")}
                      />
                    </div>
                    <div className="tablecell code">
                      <Tooltip title="Eliminar de la lista">
                        <IconButton onClick={() => deleteToList(index)}>
                          <DeleteForever />
                        </IconButton>
                      </Tooltip>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TableArticles;
