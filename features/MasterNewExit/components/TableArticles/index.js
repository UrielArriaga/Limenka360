import React from "react";
import useGlobalCommons from "../../../../hooks/useGlobalCommons";
import { useSelector } from "react-redux";
import { commonSelector } from "../../../../redux/slices/commonSlice";
import { Controller, useForm } from "react-hook-form";
import Select from "react-select";
import { selectStyle } from "../../styles";
import { IconButton, Tooltip } from "@material-ui/core";
import { DeleteForever } from "@material-ui/icons";

function TableArticles({ productToArticle, handleValidateDataInputs, deleteToList }) {
  const { control, register } = useForm();
  const { getCatalogBy } = useGlobalCommons();
  const { warehouse } = useSelector(commonSelector);

  return (
    <div className="contentPreview">
      <div className="containerTable">
        <div className="containerTable__products">
          <div className="table">
            <div className="tableheader">
              <div className="tablehead code">
                <p>Numero de serie</p>
              </div>
              <div className="tablehead">
                <p>Codigo</p>
              </div>
              <div className="tablehead">
                <p>Producto</p>
              </div>
              {/*

              <div className="tablehead">
                <p>Almacen</p>
              </div>
              <div className="tablehead">
                <p>Comentarios</p>
              </div> */}
              <div className="tablehead">
                <p>Acciones</p>
              </div>
            </div>

            <div className="tablebody">
              {/* <pre>{JSON.stringify(productToArticle, null, 2)}</pre> */}
              {productToArticle?.map((product, index) => (
                <div key={index} className={`tablerow-container ${index % 2 === 0 ? "even-row" : "odd-row"}`}>
                  <div className="tablerow">
                    <div className="tablecell code">
                      <div className="content">{product?.serialnumber}</div>
                    </div>
                    <div className="tablecell code">
                      <div className="content">{product?.product?.code}</div>
                    </div>
                    <div className="tablecell code">
                      <div className="content">{product?.product?.name}</div>
                    </div>

                    {/* <div className="tablecell code">
                      <input
                        className={`input_data`}
                        placeholder="Ingresa el serial del articulo"
                        type="text"
                        onChange={e => handleValidateDataInputs(e.target.value, product, index, "serial")}
                      />
                    </div>

                    <div className="tablecell code">
                      <Controller
                        name="warehouse"
                        control={control}
                        rules={{ required: "Requerido" }}
                        render={({ field }) => (
                          <Select
                            {...field}
                            className="select_data"
                            placeholder="Selecciona una Opción"
                            styles={selectStyle}
                            options={warehouse.results}
                            getOptionLabel={option => option.name}
                            getOptionValue={option => option.id}
                            isLoading={warehouse.isFetching}
                            noOptionsMessage={() => "Sin Opciones"}
                            onMenuOpen={() => getCatalogBy("warehouse")}
                            loadingMessage={() => "Cargando Opciones"}
                            onChange={e => handleValidateDataInputs(e, product, index)}
                          />
                        )}
                      />
                    </div>
                    <div className="tablecell code">
                      <textarea
                        className="input_observations"
                        placeholder="comentarios"
                        onChange={e => handleValidateDataInputs(e.target.value, product, index, "comments")}
                      />
                    </div> */}
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
