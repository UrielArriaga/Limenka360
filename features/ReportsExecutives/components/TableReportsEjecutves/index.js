import { formatNumber, handleAlert, handleGlobalAlert, validNullData } from "../../../../utils";
import TableLoader from "../../../../components/UI/organism/TableLoader";
import TableHeadComponent from "../../../../components/UI/molecules/TableHeadComponent";
import {
  Table,
  TableReportsStyled,
  TableBody,
  TableRow,
  TableDataId,
  TableData,
  TableRowHead,
  TableHead,
} from "./styled";
import { Pagination } from "@material-ui/lab";

export default function TableReports(props) {
  const { type, secondaryColor, primaryColor, heads, data, isLoading, page = 0, count = 1, handleChange } = props;
  let colors = { secondaryColor, primaryColor };

  if (isLoading) {
    return <TableLoader heads={heads} rows={10} {...colors} />;
  }
  const ContentTable = () => {
    switch (type) {
      case "byentities":
      case "byorigin":
      case "byphase":
      case "bysalesOrigin":
      case "bysalesEntities":
        return (
          <TableBody>
            {data.map((item, index) => {
              return (
                <TableRow key={index} isPar={index % 2 == 0}>
                  <TableDataId isPar={index % 2 == 0}>
                    <div className="title">
                      <p>{item.name}</p>
                    </div>
                  </TableDataId>
                  <TableData>
                    <div className="title">
                      <p>{formatNumber(item.totalAmount)}</p>
                    </div>
                  </TableData>
                </TableRow>
              );
            })}
          </TableBody>
        );
        break;
      case "bytotalproducts":
      case "bytotalentities":
        return (
          <TableBody>
            {data.map((item, index) => {
              return (
                <TableRow key={index} isPar={index % 2 == 0}>
                  <TableDataId isPar={index % 2 == 0}>
                    <div className="title">
                      <p>{item.name}</p>
                    </div>
                  </TableDataId>
                  <TableData>
                    <div className="title">
                      <p>{item.totalQuotes}</p>
                    </div>
                  </TableData>
                </TableRow>
              );
            })}
          </TableBody>
        );
        break;
      case "byprospectEntities":
      case "byprospectOrigins":
      case "byprospectType":
        return (
          <TableBody>
            {data.map((item, index) => {
              return (
                <TableRow key={index} isPar={index % 2 == 0}>
                  <TableDataId isPar={index % 2 == 0}>
                    <div className="title">
                      <p>{item.name}</p>
                    </div>
                  </TableDataId>
                  <TableData>
                    <div className="title">
                      <p>{item.totalProspects}</p>
                    </div>
                  </TableData>
                </TableRow>
              );
            })}
          </TableBody>
        );
        break;
      case "bysalesProducts":
      case "bycategory":
        return (
          <TableBody>
            {data.map((item, index) => {
              return (
                <TableRow key={index} isPar={index % 2 == 0}>
                  <TableDataId isPar={index % 2 == 0}>
                    <div className="title">
                      <p>{item.name}</p>
                    </div>
                  </TableDataId>
                  <TableData>
                    <div className="title">
                      <p>{formatNumber(item.totalIndividualAmount)}</p>
                    </div>
                  </TableData>
                </TableRow>
              );
            })}
          </TableBody>
        );
        break;
      default:
        return null;
    }
  };

  return (
    <TableReportsStyled>
      <h2 className="oportunitiestile">Estadisticas</h2>
      <Table>
        <TableHead>
          <TableRowHead {...colors}>
            {heads.map((item, index) => {
              return <TableHeadComponent key={index} item={item} {...colors} position={index} />;
            })}
          </TableRowHead>
        </TableHead>
        <ContentTable />
      </Table>
      {page != 0 && <Pagination page={page} count={count} onChange={handleChange} className="pagination" />}
    </TableReportsStyled>
  );
}
