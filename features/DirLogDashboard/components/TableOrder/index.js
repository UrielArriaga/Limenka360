import React, { useEffect, useState } from "react";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Box, Skeleton } from "@mui/material";
import { api } from "../../../../services/api";
import { TablePagination } from "@material-ui/core";

export default function TableOrder() {
  const [data, setData] = useState({});
  const [count, setCount] = useState(0);
  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(5);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getPurchaseorders();
  }, [page, limit]);

  const getPurchaseorders = async () => {
    setLoading(true);
    try {
      let params = {
        count: 1,
        limit: limit,
        skip: page + 1,
      };
      const res = await api.get(`purchaseorders`, { params });
      setLoading(false);
      setData(res.data);
      setCount(res.data.count);
    } catch (error) {
      setLoading(false);
      console.log("error getPurchaseorders", error);
    }
  };

  const handleChangeRowsPerPage = event => {
    setLimit(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handlePage = (event, newPage) => {
    setPage(newPage);
  };

  return (
    <div>
      {loading ? (
        <Skeleton variant="rectangular" width="100%" height="370px" />
      ) : (
        <Box sx={{ width: "100%", height: "370px" }}>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Condición de Pago</TableCell>
                  <TableCell>Teléfono</TableCell>
                  <TableCell>Observaciones</TableCell>
                  <TableCell>Método de Entrega</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {data.results?.map(item => (
                  <TableRow key={item.id}>
                    <TableCell>{item.paymentcondition}</TableCell>
                    <TableCell>{item.phone}</TableCell>
                    <TableCell>{item.observations}</TableCell>
                    <TableCell>{item.methoddelivery}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      )}
      <TablePagination
        component="div"
        rowsPerPageOptions={[5]}
        count={count}
        rowsPerPage={limit}
        page={page}
        onPageChange={handlePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        labelRowsPerPage={"Ordenes por página:"}
        labelDisplayedRows={({ from, to, count }) => `${from}-${to} de ${count}`}
      />
    </div>
  );
}
