import React from "react";
import {
  ActionsCell,
  Button,
  TableCell,
  TableCellHeader,
  // TableContainer,
  TableHeader,
  TableRow,
  TableRowPackage,
} from "./styles";
import { IconButton } from "@material-ui/core";
import { Add, Delete, Edit } from "@material-ui/icons";
import styled from "styled-components";
export default function TableProducts({
  products = [],
  productsControl = null,
  handleOnChangeProperty,
  handleOnClickOpenAddSerials,
  handleOnClickDeleteProduct,
}) {
  // const { handleOnClickDeleteProduct, handleOnClickOpenAddSerials } = productsControl || {};

  return (
    <div>
      <TableContainer>
        <Table>
          <Thead>
            <tr>
              <Th>Codigo</Th>
              <Th>Producto</Th>
              <Th>Cantidad</Th>
              <Th>Precio Unitario</Th>
              <Th>Iva</Th>
              <Th>Subtotal</Th>
              <Th>Acciones</Th>
            </tr>
          </Thead>
          <tbody>
            {products.map(item => {
              if (item?.isdeleted) return;

              return (
                <Tr key={item.id}>
                  <Td>{item?.model}</Td>
                  <Td>{item?.name}</Td>
                  <Td>
                    <input
                      onChange={e => handleOnChangeProperty(item, "quantity", e.target.value)}
                      className="input_data"
                      value={item?.quantity}
                    />
                  </Td>
                  <Td>
                    <input
                      className="input_data"
                      value={item?.unitprice}
                      onChange={e => handleOnChangeProperty(item, "unitprice", e.target.value)}
                    />
                  </Td>

                  <Td>
                    <input
                      type="checkbox"
                      value={item?.hasiva}
                      onChange={e => handleOnChangeProperty(item, "hasiva", e.target.checked)}
                    />
                  </Td>

                  <Td>{item?.unitprice * item?.quantity}</Td>
                  <Td>
                    <Delete
                      style={{
                        marginRight: 20,
                      }}
                      onClick={() => handleOnClickDeleteProduct(item)}
                    />
                    <Add onClick={() => handleOnClickOpenAddSerials(item)} />
                  </Td>
                </Tr>
              );
            })}
          </tbody>
        </Table>
      </TableContainer>
    </div>
  );
}

const TableContainer = styled.div`
  overflow-x: auto;
  margin: 20px;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  min-width: 600px;
`;

const Thead = styled.thead`
  background-color: #405189;
  color: white;
`;

const Th = styled.th`
  padding: 10px;
  /* border: 1px solid #ddd; */
  text-align: left;
`;

const Td = styled.td`
  padding: 10px;

  /* border: 1px solid #ddd; */

  input {
    width: 100%;
    padding: 5px;
    border: 1px solid #ddd;
    border-radius: 4px;
  }
`;

const Tr = styled.tr`
  &:nth-child(even) {
    background-color: #f2f2f2;
  }
`;
