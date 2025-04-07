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
import { IconButton, Checkbox } from "@material-ui/core";
import { Add, Delete, Edit } from "@material-ui/icons";

export default function TableProducts({ products = [], productsControl = null }) {
  const {
    toggleDrawerProducts,
    handleOnClickActionEdit,
    hancleOnClickActionPackage,
    handleOnClidkDeleteProduct,
    handleChangeStatusProduct,
  } = productsControl || {};

  return (
    <div>
      <TableContainer>
        <TableHeader>
          <TableCellHeader flex={1}>Codigo</TableCellHeader>
          <TableCellHeader flex={3}>Producto</TableCellHeader>
          <TableCellHeader flex={1}>Cantidad</TableCellHeader>
          <TableCellHeader flex={1}>Precio</TableCellHeader>
          <TableCellHeader flex={1}>Subtotal</TableCellHeader>
          <TableCellHeader flex={1}>Solicitar Reparacion</TableCellHeader>
          <TableCellHeader flex={1}>Solicitar Capacitacion</TableCellHeader>

          {productsControl && <TableCellHeader flex={1}>Acciones</TableCellHeader>}
        </TableHeader>

        {products.map((productOportunity, index) => {
          const product = productOportunity.product;

          if (product?.ispackage)
            return (
              <TableRowPackage className="sectionpackages">
                <TableRow className="packageparent">
                  <TableCell flex={1}>{product?.code}</TableCell>
                  <TableCell flex={3}>{product?.name}</TableCell>
                  <TableCell flex={1}>{productOportunity?.quantity}</TableCell>
                  <TableCell flex={1}>{productOportunity?.newprice}</TableCell>
                  <TableCell flex={1}> {productOportunity?.total}</TableCell>
                  <TableCell flex={1}>
                    {" "}
                    <Checkbox disabled size="small" inputProps={{ "aria-label": "secondary checkbox" }} />{" "}
                  </TableCell>
                  <TableCell flex={1}>
                    {" "}
                    <Checkbox disabled size="small" inputProps={{ "aria-label": "secondary checkbox" }} />{" "}
                  </TableCell>
                  {productsControl && (
                    <ActionsCell flex={1}>
                      {product?.ispackage && (
                        <Button
                          className="tour-btnpackages"
                          onClick={() => hancleOnClickActionPackage(productOportunity)}
                        >
                          Desglosar
                        </Button>
                        // <IconButton onClick={() => hancleOnClickActionPackage(productOportunity)}>
                        //   <Add />
                        // </IconButton>
                      )}
                    </ActionsCell>
                  )}
                </TableRow>

                {productOportunity?.productslocal?.map((childproductOportunity, curentChildren) => {
                  const product = childproductOportunity.product;
                  if (childproductOportunity?.isDeleted) return;
                  return (
                    <TableRow className="packagechild">
                      <TableCell flex={1}>{product?.code}</TableCell> <TableCell flex={3}>{product?.name}</TableCell>
                      <TableCell flex={1}>{childproductOportunity?.quantity}</TableCell>
                      <TableCell flex={1}>{0}</TableCell>
                      <TableCell flex={1}> {0}</TableCell>
                      <TableCell flex={1}>
                        {" "}
                        <Checkbox
                          onChange={e =>
                            handleChangeStatusProduct(
                              e.target.checked,
                              index,
                              productOportunity,
                              "installationrequest",
                              childproductOportunity,
                              curentChildren,
                            )
                          }
                          checked={childproductOportunity?.installationrequest}
                          size="small"
                          inputProps={{ "aria-label": "secondary checkbox" }}
                        />{" "}
                      </TableCell>
                      <TableCell flex={1}>
                        {" "}
                        <Checkbox
                          onChange={e =>
                            handleChangeStatusProduct(
                              e.target.checked,
                              index,
                              productOportunity,
                              "trainingrequest",
                              childproductOportunity,
                              curentChildren,
                            )
                          }
                          checked={childproductOportunity?.trainingrequest}
                          size="small"
                          inputProps={{ "aria-label": "secondary checkbox" }}
                        />{" "}
                      </TableCell>
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
              {console.log(productOportunity, "pro")}
              <TableCell flex={1}>{product?.code}</TableCell> <TableCell flex={3}>{product?.name}</TableCell>
              <TableCell flex={1}>{productOportunity?.quantity}</TableCell>
              <TableCell flex={1}>{productOportunity?.newprice}</TableCell>
              <TableCell flex={1}> {productOportunity?.total}</TableCell>
              <TableCell flex={1}> {productOportunity?.total}</TableCell>
              <TableCell flex={1}>
                {" "}
                <Checkbox
                  onChange={e =>
                    handleChangeStatusProduct(e.target.checked, index, productOportunity, "installationrequest")
                  }
                  checked={productOportunity?.installationrequest}
                  size="small"
                  inputProps={{ "aria-label": "secondary checkbox" }}
                />{" "}
              </TableCell>
              <TableCell flex={1}>
                {" "}
                <Checkbox
                  onChange={e =>
                    handleChangeStatusProduct(e.target.checked, index, productOportunity, "trainingrequest")
                  }
                  checked={productOportunity?.trainingrequest}
                  size="small"
                  inputProps={{ "aria-label": "secondary checkbox" }}
                />{" "}
              </TableCell>
              {productsControl && (
                <ActionsCell flex={1}>
                  {product?.ispackage && (
                    <Button onClick={() => hancleOnClickActionPackage(productOportunity)}>Desglosar</Button>
                  )}
                </ActionsCell>
              )}
            </TableRow>
          );
        })}
      </TableContainer>
    </div>
  );
}
