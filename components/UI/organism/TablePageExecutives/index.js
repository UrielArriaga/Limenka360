import { Tooltip } from "@material-ui/core";
import { Edit, MoreVert, OpenInNew, SettingsOutlined } from "@material-ui/icons";
import { Skeleton } from "@material-ui/lab";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { userSelector } from "../../../../redux/slices/userSlice";
import { formatNumber, formatNumberNoSymbol } from "../../../../utils";
import {
  StyledMenu,
  Table,
  TableBody,
  TableComponentStyled,
  TableData,
  TableDataSettingsColumn,
  TableHead,
  TableHeadColumn,
  TableRowBody,
  TableRowHead,
} from "../../../../styles/PageExecutives/TableExecutives.styles";

export default function TablePageExecutives({
  headers,
  executives,
  isLoading,
  handleClickEditProspect,
  setRowSelected,
}) {
  const router = useRouter();
  const { group } = useSelector(userSelector);
  const colors = { primaryColor: "#8c9eff", secondaryColor: "#f0f3fe" };
  const [openActionsRow, setOpenActionsRow] = useState(null);
  const [skeletonArray] = useState([1, 2, 3, 4, 5]);
  const anchorActions = Boolean(openActionsRow);

  const handleClickName = (item, isClickOpenPreview) => {
    if (isClickOpenPreview) {
      router.push({ pathname: "vistaejecutivo", query: { id: item.id, cve: "0111" } });
    } else {
      router.push({ pathname: `ejecutivos/${item.id}` });
    }
  };

  const handleCloseActionsRow = () => setOpenActionsRow(null);

  const handleClickOpenActions = (event, user) => {
    setOpenActionsRow(event.currentTarget);
    setRowSelected(user);
  };

  return (
    <div style={{ padding: 20 }}>
      <h3 style={{ marginBottom: 10 }}>Ejecutivos de {group}</h3>
      <TableComponentStyled>
        <Table>
          <TableHead>
            <TableRowHead {...colors}>
              {headers.map((item, index) => (
                <TableHeadColumn key={index}>{headers[index]}</TableHeadColumn>
              ))}
              <TableDataSettingsColumn {...colors}>
                <SettingsOutlined />
              </TableDataSettingsColumn>
            </TableRowHead>
          </TableHead>

          {isLoading ? (
            <TableBody>
              {skeletonArray.map(index => {
                return (
                  <TableRowBody key={index} isPar={index % 2 == 0}>
                    <TableData>
                      <div className="content">
                        <div className="content__flex">
                          <Skeleton variant="text" width={"90%"} />
                          <div className="icon-bg">
                            <Tooltip title="Abrir vista clásica">
                              <OpenInNew className="openprospect" />
                            </Tooltip>
                          </div>
                        </div>
                      </div>
                    </TableData>
                    <TableData>
                      <div className="content">
                        <Skeleton variant="text" />
                      </div>
                    </TableData>
                    <TableData>
                      <div className="content">
                        <Skeleton variant="text" />
                      </div>
                    </TableData>
                    <TableData>
                      <div className="content">
                        <Skeleton variant="text" />
                      </div>
                    </TableData>
                    <TableDataSettingsColumn>
                      <div className="content"></div>
                    </TableDataSettingsColumn>
                  </TableRowBody>
                );
              })}
            </TableBody>
          ) : (
            <TableBody>
              {executives.map((item, index) => {
                return (
                  <TableRowBody key={index} isPar={index % 2 == 0}>
                    <TableData>
                      <div className="content">
                        <div className="content__flex">
                          <Tooltip title="Abrir dashboard del ejecutivo">
                            <div>
                              <p onClick={() => handleClickName(item, true)} className="name capitalize">
                                {item.fullname}
                              </p>
                              <p className="email">{item.email}</p>
                            </div>
                          </Tooltip>

                          <div className="icon-bg">
                            <Tooltip title="Abrir vista clásica">
                              <OpenInNew className="openprospect" onClick={() => handleClickName(item, false)} />
                            </Tooltip>
                          </div>
                        </div>
                      </div>
                    </TableData>

                    <TableData>
                      <div className="content">
                        <p>{formatNumber(item.totalAmount)}</p>
                      </div>
                    </TableData>
                    <TableData>
                      <div className="content">
                        <p>{formatNumber(item.newcomission)}</p>
                      </div>
                    </TableData>
                    <TableData>
                      <div className="content">
                        <p>%{formatNumberNoSymbol(item.comission)}</p>
                      </div>
                    </TableData>
                    <TableDataSettingsColumn>
                      <div>
                        <div className="content">
                          <div
                            aria-controls="fade-menu"
                            aria-haspopup="true"
                            className="content__icon"
                            onClick={e => handleClickOpenActions(e, item)}
                          >
                            <MoreVert />
                          </div>
                        </div>

                        <StyledMenu
                          id="fade-menu"
                          anchorEl={openActionsRow}
                          keepMounted
                          open={anchorActions}
                          onClose={handleCloseActionsRow}
                        >
                          <div className="options">
                            <div
                              className="options__option"
                              onClick={() => {
                                handleClickEditProspect(item);
                                handleCloseActionsRow();
                              }}
                            >
                              <Edit />
                              <p>Editar comisiones</p>
                            </div>
                          </div>
                        </StyledMenu>
                      </div>
                    </TableDataSettingsColumn>
                  </TableRowBody>
                );
              })}
            </TableBody>
          )}
        </Table>
      </TableComponentStyled>
    </div>
  );
}
