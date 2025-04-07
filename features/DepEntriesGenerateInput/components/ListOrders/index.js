import React, { useState } from "react";
import { ListOrdersStyled } from "./styles";
import { AnimatePresence, motion } from "framer-motion";
import { Checkbox, IconButton, Tooltip, Button } from "@material-ui/core";
import dayjs from "dayjs";
import { Add, AttachFile, Delete, FiberManualRecord, NoteAdd, Store, Visibility } from "@material-ui/icons";
import { useForm } from "react-hook-form";

export default function ListOrders({
  order: asdas,
  supplises,
  setDataSupplies,
  handleAdd,
  entriesProduct,
  setEntriesProduct,
  orderSelectedLocal,
  setOrderSelectedLocal,
  isInternational,
}) {
  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm();

  const handleOnChangeInput = (e, index) => {
    const newSupplies = supplises.results.map((item, i) => {
      if (i === index) {
        return {
          ...item,
          serialnumber: e.target.value,
        };
      }
      return item;
    });

    setDataSupplies({ ...supplises, results: newSupplies });
  };

  const [selectedProducts, setSelectedProducts] = useState([]);
  const conmProductSelection = index => {
    setSelectedProducts(prev => {
      if (prev.includes(index)) {
        return prev.filter(i => i !== index);
      } else {
        return [...prev, index];
      }
    });
  };
  const generateUniqueSerials = () => {
    const year = new Date().getFullYear();
    const newSupplies = supplises.results.map((item, index) => {
      if (selectedProducts.includes(index)) {
        const sixDigits = Math.floor(100000 + Math.random() * 900000);
        return {
          ...item,
          serialnumber: `SN${year}${sixDigits}${index}`,
        };
      }
      return item;
    });
    setDataSupplies({ ...supplises, results: newSupplies });
    setSelectedProducts([]);
  };
  const toggleSelectAll = () => {
    if (selectedProducts.length === supplises?.results.length) {
      setSelectedProducts([]);
    } else {
      setSelectedProducts(supplises.results.map((_, index) => index));
    }
  };
  // const handleAdd = d => {
  //   console.log(d);
  // };

  return (
    <ListOrdersStyled>
      <h3>Lista de entrada de productos</h3>

      {/* <pre>{JSON.stringify(supplises, null, 2)}</pre> */}

      <div
        className="actions"
        style={{ display: "flex", justifyContent: "flex-end", gap: "15px", marginBottom: "15px" }}
      >
        <Button variant="contained" color="primary" size="small" onClick={toggleSelectAll}>
          {selectedProducts.length === supplises?.results.length ? "Deseleccionar Todos" : "Seleccionar Todos"}
        </Button>
        <Button
          variant="contained"
          color="secondary"
          size="small"
          onClick={generateUniqueSerials}
          disabled={!Array.isArray(selectedProducts) || selectedProducts.length === 0}
        >
          Generar Seriales
        </Button>
      </div>
      <div className="containertable">
        <div className="containertable__products">
          <div className="table">
            <div className="tableheader">
              <div className="tablehead">
                <p>Codigo</p>
              </div>
              <div className="tablehead">
                <p>Nombre del producto</p>
              </div>

              <div className="tablehead">
                <p>Acciones </p>
              </div>
            </div>

            <div className="tablebody">
              {supplises?.results.map((supp, index) => {
                return (
                  <div key={index}>
                    <div className="tablerow">
                      <div className="tablecell">
                        <Checkbox
                          checked={Array.isArray(selectedProducts) && selectedProducts.includes(index)}
                          onChange={() => conmProductSelection(index)}
                        />
                        {supp?.code}
                      </div>
                      <div className="tablecell">{supp?.name}</div>
                      <div className="tablecell">
                        <input
                          className="inputSerial"
                          type="text"
                          placeholder="Numero de serie"
                          disabled={isInternational}
                          value={supp?.serialnumber || ""}
                          onChange={e => handleOnChangeInput(e, index)}
                        />
                      </div>
                    </div>

                    <AnimatePresence initial={false}>
                      {entriesProduct && orderSelectedLocal?.createdAt === supp?.createdAt && (
                        <motion.div
                          key="content"
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.2 }}
                          style={{ overflow: "hidden" }}
                        >
                          <form onSubmit={handleSubmit(handleAdd)}>
                            <div className="add-content">
                              {/* Campo oculto para folio */}
                              <span className="title-products">Productos</span>
                              {/* Iterar sobre los productos */}
                              {orderSelectedLocal.products.map((item, index) => (
                                <div key={index}>
                                  <div className="content-add" key={index}>
                                    <FiberManualRecord
                                      style={{ fontSize: "10px", marginRight: "5px", color: "grey" }}
                                    />
                                    <div className="content-name">
                                      <b className="text-white">Nombre:</b>
                                      <p className="serial">{item.name}</p>
                                    </div>
                                    <p className="model">
                                      <b>Producto:</b> {item.code}{" "}
                                    </p>
                                    <p className="name">
                                      <b>Marca:</b> {item.marca}
                                    </p>
                                    <p className="name">
                                      <b>Cantidad:</b> {item?.quantity}
                                    </p>
                                    <div className="dimentions">
                                      <p className="dimen">
                                        <b>Peso y Dimenciones:</b>{" "}
                                      </p>
                                      <p className="nums">
                                        {item.weight}kg / {item.width}cm x {item.height}cm x{item.length}cm
                                      </p>
                                    </div>

                                    {/* Campo oculto para productId */}
                                    <input
                                      type="hidden"
                                      value={item.id}
                                      {...register(`warehouseproducts.${index}.productId`)}
                                    />
                                    <b>Numero de Serie:</b>
                                    <input
                                      className="input"
                                      placeholder="Ingresa Serie"
                                      required
                                      // type="hidden"
                                      // value={item.serial || ""} // Si ya tienes un serial por defecto
                                      {...register(`warehouseproducts.${index}.serial`)}
                                    />
                                  </div>
                                </div>
                              ))}

                              <div className="content-button">
                                <button type="submit" className="ing">
                                  Ingresar
                                </button>
                              </div>
                            </div>
                          </form>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </ListOrdersStyled>
  );
}
