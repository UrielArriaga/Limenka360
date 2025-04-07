import React from "react";
import {
  ActionsCell,
  Button,
  TableCell,
  TableCellHeader,
  TableContainer,
  TableHeader,
  TableRow,
  TableRowPackage,
} from "./styles";
import { IconButton } from "@material-ui/core";
import { Add, Delete, Edit } from "@material-ui/icons";

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
        <TableHeader>
          <TableCellHeader flex={1}>Codigo</TableCellHeader>
          <TableCellHeader flex={2}>Producto</TableCellHeader>
          <TableCellHeader flex={1}>Cantidad</TableCellHeader>
          <TableCellHeader flex={1}>Precio</TableCellHeader>
          {/* <TableCellHeader flex={1}>Requiere Iva</TableCellHeader>
          <TableCellHeader flex={1}>Iva</TableCellHeader> */}
          <TableCellHeader flex={1}>Subtotal</TableCellHeader>
          <TableCellHeader flex={1}>Acciones</TableCellHeader>
        </TableHeader>

        {products.map((item, index) => {
          return (
            <TableRowPackage key={index}>
              {/* <pre>{JSON.stringify(item, null, 2)}</pre> */}
              <TableRow className="">
                <TableCell flex={1}>{item?.model}</TableCell>
                <TableCell flex={2}>{item?.name}</TableCell>
                <TableCell flex={1}>
                  <input
                    onChange={e => handleOnChangeProperty(index, "quantity", e.target.value)}
                    className="input_data"
                    value={item?.quantity}
                  />
                </TableCell>
                <TableCell flex={1}>
                  <input
                    className="input_data"
                    value={item?.unitprice}
                    onChange={e => handleOnChangeProperty(index, "unitprice", e.target.value)}
                  />
                </TableCell>
                <TableCell flex={1}> {item.subtotal}</TableCell>

                {/* <TableCell flex={1}>xx</TableCell>

                <TableCell flex={1}>xx</TableCell> */}

                <TableCell flex={1}>
                  <Delete
                    style={{
                      marginRight: 20,
                    }}
                    onClick={() => handleOnClickDeleteProduct(item)}
                  />
                </TableCell>
              </TableRow>
            </TableRowPackage>
          );
        })}

        {/* {products.map(productOportunity => {
          const product = productOportunity.product;

          if (product?.ispackage)
            return (
              <TableRowPackage>
                <TableRow className="packageparent">
                  <TableCell flex={1}>{product?.code}</TableCell>
                  <TableCell flex={3}>{product?.name}</TableCell>
                  <TableCell flex={1}>{productOportunity?.quantity}</TableCell>
                  <TableCell flex={1}>{productOportunity?.newprice}</TableCell>
                  <TableCell flex={1}> {productOportunity?.total}</TableCell>
                  {productsControl && (
                    <ActionsCell flex={1}>
                      {product?.ispackage && (
                        <Button onClick={() => hancleOnClickActionPackage(productOportunity)}>
                          Desglosar productos
                        </Button>
                      )}
                    </ActionsCell>
                  )}
                </TableRow>

                {productOportunity?.productslocal?.map((childproductOportunity, index) => {
                  const product = childproductOportunity.product;
                  if (childproductOportunity?.isDeleted) return;
                  return (
                    <TableRow key={index} className="packagechild">
                      <TableCell flex={1}>{product?.code}</TableCell> <TableCell flex={3}>{product?.name}</TableCell>
                      <TableCell flex={1}>{childproductOportunity?.quantity}</TableCell>
                      <TableCell flex={1}>{0}</TableCell>
                      <TableCell flex={1}> {0}</TableCell>
                      {productsControl && (
                        <ActionsCell flex={1}>
                          <IconButton onClick={() => handleOnClidkDeleteProduct(childproductOportunity)}>
                            <Delete />
                          </IconButton>
                          <IconButton
                            onClick={() => handleOnClickActionEdit(productOportunity, childproductOportunity)}
                          >
                            <Edit />
                          </IconButton>
                        </ActionsCell>
                      )}
                    </TableRow>
                  );
                })}
              </TableRowPackage>
            );

          return (
            <TableRow>
              <TableCell flex={1}>{product?.code}</TableCell> <TableCell flex={3}>{product?.name}</TableCell>
              <TableCell flex={1}>{productOportunity?.quantity}</TableCell>
              <TableCell flex={1}>{productOportunity?.newprice}</TableCell>
              <TableCell flex={1}> {productOportunity?.total}</TableCell>
              {productsControl && (
                <ActionsCell flex={1}>
                  {product?.ispackage && (
                    <Button onClick={() => hancleOnClickActionPackage(productOportunity)}>Desglosar productos</Button>
                  )}
                </ActionsCell>
              )}
            </TableRow>
          );
        })} */}

        {/* <TableRow>
          <TableCell>Producto 1</TableCell>
          <TableCell>1</TableCell>
          <TableCell>1000</TableCell>
          <TableCell>1000</TableCell>
          <ActionsCell>
            <Button>Editar</Button>
            <Button>Eliminar</Button>
          </ActionsCell>
        </TableRow>

        <TableRow>
          <TableCell>Producto 2</TableCell>
          <TableCell>2</TableCell>
          <TableCell>2000</TableCell>
          <TableCell>4000</TableCell>
          <ActionsCell>
            <Button>Editar</Button>
            <Button>Eliminar</Button>
          </ActionsCell>
        </TableRow> */}
      </TableContainer>
    </div>
  );
}
