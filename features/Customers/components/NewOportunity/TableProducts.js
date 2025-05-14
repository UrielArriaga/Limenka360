import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { api } from "../../../../services/api";
import Select from "react-select";
import { Grid } from "@material-ui/core";

const TableProducts = () => {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [rows, setRows] = useState([
    {
      id: null,
      name: "",
      code: "",
      quantity: 1,
      price: 0,
      iva: 0,
      total: 0,
      productId: null,
      product: {
        id: null,
        name: "",
        code: "",
        price: 0,
        iva: 0,
      },
    },
  ]);
  const [searchQuery, setSearchQuery] = useState("");
  const [ivaEnabled, setIvaEnabled] = useState(false);

  // Función para obtener productos desde la API
  const handleInputChange = async (inputValue) => {
    try {
      const paramsProductsWithQuery = {
        count: 10,
        all: 1,
        include: "brand",
        join: "bra",
        where: {
          isactive: true,
          $or: [
            { name: { iRegexp: inputValue.trim() } },
            { code: { iRegexp: inputValue.trim() } },
          ],
        },
      };

      const response = await api.get("products", {
        params: paramsProductsWithQuery,
      });

      setProducts(response.data.results);
    } catch (error) {
      console.error("Error fetching products:", error);
    }

    return undefined; // explícitamente no retorna nada
  };

  // useEffect(() => {
  //   if (searchQuery) {
  //     getProducts(searchQuery);
  //   }
  // }, [searchQuery]);

  // Función para agregar una fila
  const addRow = () => {
    if (selectedProduct) {
      const newRow = {
        id: selectedProduct.id,
        name: selectedProduct.name,
        code: selectedProduct.code,
        quantity: 1,
        price: selectedProduct.price,
        iva: ivaEnabled ? (selectedProduct.isNational ? 0 : 0.16) : 0,
      };
      setRows([...rows, newRow]);
    }
  };

  // Función para eliminar una fila
  const deleteRow = (rowIndex) => {
    setRows(rows.filter((_, index) => index !== rowIndex));
  };

  // Función para editar valores de cantidad y precio
  const handleEdit = (index, field, value) => {
    const newRows = [...rows];
    newRows[index][field] = value;
    setRows(newRows);
  };

  return (
    <TableContainerStyled>
      <table>
        <thead>
          <tr>
            <th>Producto</th>
            <th>Cantidad</th>
            <th>Precio</th>
            <th>IVA</th>
            <th>Total</th>
            <th>Eliminar</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, index) => {
            return (
              <tr key={index}>
                <td>
                  <Select />
                  {/* <Select
                    options={products}
                    getOptionLabel={(option) => option.name}
                    getOptionValue={(option) => option.id}
                    onInputChange={handleInputChange}
                    isSearchable
                    onChange={(selectedOption) => {
                      // setSelectedProduct(selectedOption);
                      // handleEdit(index, "productId", selectedOption.id);
                    }}
                    placeholder="Selecciona un producto"
                  /> */}
                </td>
                <td>
                  <input
                    type="number"
                    value={row.quantity}
                    onChange={(e) =>
                      handleEdit(index, "quantity", e.target.value)
                    }
                  />
                </td>
                <td>{row.price}</td>
                <td>{row.iva}</td>
                <td>{row.price * row.quantity + row.iva}</td>
                <td>
                  <button onClick={() => deleteRow(index)}>Eliminar</button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </TableContainerStyled>
  );
};

const TableContainerStyled = styled.div`
  background-color: #fff;
  padding: 20px;
  border-radius: 12px;
  margin-top: 30px;

  .search-section {
    display: flex;
    justify-content: space-between;
    margin-bottom: 20px;

    input {
      padding: 5px;
      border-radius: 5px;
      border: 1px solid #ccc;
    }

    button {
      background-color: #007bff;
      color: white;
      padding: 8px 16px;
      border: none;
      border-radius: 5px;
      cursor: pointer;
    }
  }

  table {
    width: 100%;
    border-collapse: collapse;

    th,
    td {
      padding: 10px;
      text-align: left;
      border-bottom: 1px solid #ddd;
    }

    th {
      background-color: #f8f8f8;
    }

    input {
      width: 80px;
      padding: 5px;
      border-radius: 5px;
      border: 1px solid #ccc;
    }

    button {
      background-color: red;
      color: white;
      padding: 5px 10px;
      border: none;
      border-radius: 5px;
      cursor: pointer;
    }
  }
`;

export default TableProducts;
