import { Button, Tooltip } from "@material-ui/core";
import { AddBox, DeleteForever, Edit, MoreVert, SettingsOutlined } from "@material-ui/icons";
import { Skeleton } from "@material-ui/lab";
import React, { useState } from "react";
import { formatDate, formatNumber } from "../../../../utils";
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
} from "../../../../styles/PageExecutives/TableCommissions.styles";

export default function TablePageExecutivesCommissions({
  headers,
  commissions,
  isLoading,
  addCommission,
  handleEditCommission,
  handleDeleteCommission,
  setCommissionSelected,
  openCommission,
}) {
  const colors = { primaryColor: "#8c9eff", secondaryColor: "#f0f3fe" };
  const [openActionsRow, setOpenActionsRow] = useState(null);
  const [skeletonArray] = useState([1, 2, 3, 4, 5]);
  const anchorActions = Boolean(openActionsRow);

  const handleCloseActionsRow = () => {
    setOpenActionsRow(null);
    setCommissionSelected(undefined);
  };

  const handleClickOpenActions = (event, commission) => {
    setOpenActionsRow(event.currentTarget);
    setCommissionSelected(commission);
  };

  return (
    <div style={{ padding: 20 }}>
      <h3 style={{ marginBottom: 10 }}>Reglas de comisiones</h3>
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
                        <div className="content">
                          <Skeleton variant="text" />
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
              {commissions.map((item, index) => {
                return (
                  <TableRowBody key={index} isPar={index % 2 == 0}>
                    <TableData>
                      <div className="content">
                        <div className="content__flex">
                          <Tooltip title="Abrir comisión">
                            <div onClick={() => openCommission(item)}>
                              <p className="name capitalize">{item.name}</p>
                              <p className="email">Actualizado {formatDate(item.updatedAt)}</p>
                            </div>
                          </Tooltip>
                        </div>
                      </div>
                    </TableData>

                    <TableData>
                      <div className="content">
                        <p>{item.commission}%</p>
                      </div>
                    </TableData>
                    <TableData>
                      <div className="content">
                        <p>{formatNumber(item.min)}</p>
                      </div>
                    </TableData>
                    <TableData>
                      <div className="content">
                        <p>{formatNumber(item.max)}</p>
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
                                handleEditCommission(item);
                                setOpenActionsRow(null);
                              }}
                            >
                              <Edit />
                              <p>Editar regla</p>
                            </div>
                          </div>
                          <div className="options">
                            <div
                              className="options__option"
                              onClick={() => {
                                handleDeleteCommission(item);
                                setOpenActionsRow(null);
                              }}
                            >
                              <DeleteForever />
                              <p>Borrar</p>
                            </div>
                          </div>
                        </StyledMenu>
                      </div>
                    </TableDataSettingsColumn>
                  </TableRowBody>
                );
              })}
              <TableRowBody isPar={commissions.length % 2 == 0}>
                <TableData>
                  <div className="content"></div>
                </TableData>
                <TableData>
                  <div className="content"></div>
                </TableData>
                <TableData>
                  <div className="content"></div>
                </TableData>
                <TableData>
                  <div className="content">
                    <Button endIcon={<AddBox></AddBox>} onClick={addCommission} variant="contained" color="primary">
                      agregar
                    </Button>
                  </div>
                </TableData>
                <TableDataSettingsColumn>
                  <div className="content"></div>
                </TableDataSettingsColumn>
              </TableRowBody>
            </TableBody>
          )}
        </Table>
      </TableComponentStyled>
    </div>
  );
}
