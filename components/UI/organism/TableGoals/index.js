import React, { useState } from "react";
import { Button, Checkbox, CircularProgress, Dialog, Tooltip } from "@material-ui/core";
import { Delete, DeleteOutline, Group, Person, PostAdd } from "@material-ui/icons";
import dayjs from "dayjs";
import { useDispatch, useSelector } from "react-redux";
import { api } from "../../../../services/api";
import { DialogAlert } from "../../../../styles/Herramientas/metas.styles";
import { formatNumber, handleGlobalAlert, validNullData, formatDate } from "../../../../utils";
import ProgressGoal from "../../molecules/ProgressGoal";
import TableHeadComponent from "../../molecules/TableHeadComponent";
import TableEmpty from "../TableEmpty";
import TableLoader from "../TableLoader";
import {
  DeleteSelectedStyle,
  Table,
  TableBody,
  TableComponentStyled,
  TableData,
  TableDataId,
  TableDataSettingsColumn,
  TableHead,
  TableHeadSettingsColumn,
  TableRowBody,
  TableRowHead,
} from "./styles";
import useModal from "../../../../hooks/useModal";
import NumberFormat from "react-number-format";
import { userSelector } from "../../../../redux/slices/userSlice";
import useAlertToast from "../../../../hooks/useAlertToast";

export default function TableGoalData(props) {
  const { heads, id, secondaryColor, primaryColor, data, refetch, setRefetch, isLoading, totalgoals } = props;
  const { roleId } = useSelector(userSelector);
  const dispatch = useDispatch();
  const { open: openDeleteSelected, toggleModal: toggleDeleteSelected, closeModal: closeDeleteSelected } = useModal();
  const {
    open: openModalSelected,
    toggleModal: toggleModalSelected,
    closeModal: closeModalDeleteSelected,
  } = useModal();
  const [openAlertDelete, setOpenAlertDelete] = useState(false);
  const [forDeleteGoal, setForDeleteGoal] = useState({});
  const [isLoadingDelete, setIsLoadingDelete] = useState(false);
  const [deleteGoalsId, setDeleteGoalsId] = useState([]);
  const { showAlertSucces, showAlertError, showAlertWarning } = useAlertToast();
  const [goalToUpdate, setGoalToUpdate] = useState({});
  const [isFetchingToUpdate, setIsFetchingToUpdate] = useState(false);
  let colors = { secondaryColor, primaryColor };
  const handleClickOpenDialog = goal => {
    if (roleId === "ejecutivo")
      return handleGlobalAlert("error", "No tienes permiso para eliminar metas", "basic", dispatch);

    setOpenAlertDelete(true);
    setForDeleteGoal(goal);
  };

  const handleClickOpenModal = data => {
    if (data?.socketcode && typeof data?.socketcode === "string") {
      setGoalToUpdate(data);
      toggleModalSelected();
    } else {
      showAlertWarning("Ocurrio un error con la meta seleccionada");
    }
  };

  const handleClickUpdateGoal = () => {
    switch (goalToUpdate?.socketcode) {
      case "CdPend":
        updateGoal("countgoalspendings");
        break;
      case "CdS":
        updateGoal("countgoalstrackings");
        break;
      case "CdO":
        updateGoal("countgoalsoportunities");
        break;
      default:
        showAlertWarning("La meta no puede ser recontada");
        break;
    }
  };

  const updateGoal = async url => {
    try {
      setIsFetchingToUpdate(true);
      let body = {
        ejecutiveGoalId: goalToUpdate?.id,
      };
      let response = await api.post(`progressgoals/${url}`, body);
      if (response.status == 200) {
        setIsFetchingToUpdate(false);
        setGoalToUpdate({});
        showAlertSucces("Meta actualizada");
        toggleModalSelected();
        setRefetch(!refetch);
      }
    } catch (error) {
      toggleModalSelected();

      showAlertError("No puedes actualizar metas grupales");
      console.log(error, "error");
      setIsFetchingToUpdate(false);
    }
  };

  const handleAlertClose = () => {
    setOpenAlertDelete(false);
  };
  const handleClickDialogDelete = async () => {
    try {
      setIsLoadingDelete(true);
      let res = await api.delete(`ejecutivesgoals/${forDeleteGoal.id}`);
      setRefetch(!refetch);
      setOpenAlertDelete(false);
      setIsLoadingDelete(false);
    } catch (error) {
      handleErrorDelete();
    }
  };
  const handleErrorDelete = () => {
    handleGlobalAlert("error", "Ocurrio un problema - No tienes permiso para eliminar", "basic", dispatch);
    handleAlertClose();
    setIsLoadingDelete(false);
  };
  if (isLoading) {
    return <TableLoader heads={heads} rows={10} {...colors} />;
  }
  if (data.length <= 0) {
    return <TableEmpty heads={heads} rows={10} {...colors} message="No hay metas" />;
  }
  const handleDeleteGoal = (check, goal) => {
    if (check) {
      if (deleteGoalsId.length >= 30) return;
      setDeleteGoalsId([...deleteGoalsId, { id: goal.id }]);
    } else {
      let deleteGoal = deleteGoalsId.filter(item => item.id !== goal.id);
      setDeleteGoalsId(deleteGoal);
    }
  };
  //returns tags depending on meta type
  const goalDataType = (name, progress, finalgoal) => {
    let seeByCount = (
      <div className="goaltotal">
        <p>{progress}</p>
        <p className="divider">/</p>
        <p>{finalgoal}</p>
      </div>
    );
    let seeByMount = (
      <div className="goaltotal">
        <p>{formatNumber(progress?.toFixed(2))}</p>
        <p className="divider"> de </p>
        <p>{formatNumber(finalgoal?.toFixed(2))}</p>
      </div>
    );
    let seeByPercentage = (
      <div className="goaltotal">
        <p>%{progress / finalgoal}</p>
      </div>
    );
    switch (name) {
      case "count":
        return seeByCount;
      case "amount":
        return seeByMount;
      case "percentage":
        return seeByPercentage;
      default:
        return seeByCount;
    }
  };

  const validateSelected = idGoal => {
    let searchGoal = deleteGoalsId.filter(goal => goal.id === idGoal);
    if (searchGoal.length > 0) {
      return true;
    } else {
      return false;
    }
  };

  const selectAllGoals = selectAll => {
    if (selectAll) {
      if (deleteGoalsId.length >= 30) return;
      let goals = [];
      for (let i = 0; i < data.length; i++) {
        goals.push({ id: data[i].id });
      }
      setDeleteGoalsId(goals);
    } else {
      // let toDelete = data.map(item => item.id);
      // let allGoals = deleteGoalsId.map(item => item.id);
      // const toRemove = new Set(toDelete);
      // let difference = allGoals.filter(x => !toRemove.has(x));
      // let updateGoals = difference.map(item => ({ id: item }));
      // setDeleteGoalsId(updateGoals);
      setDeleteGoalsId([]);
    }
  };

  const validateAllGoalsSelected = () => {
    let searchGoals = data.filter(object1 => {
      return !deleteGoalsId.some(object2 => {
        return object1.id === object2.id;
      });
    });
    if (searchGoals.length <= 0 || deleteGoalsId.length >= 30) return true;
    return false;
  };

  const reloadData = () => setRefetch(!refetch);

  return (
    <TableComponentStyled>
      {deleteGoalsId.length > 0 && (
        <div className="delete_selected">
          <div className="content_title">
            <Checkbox
              size="small"
              onChange={e => selectAllGoals(e.target.checked)}
              indeterminate={false}
              checked={validateAllGoalsSelected()}
            />

            <p className="title_del" onClick={() => console.log("metas", deleteGoalsId)}>
              Seleccionar la página ({deleteGoalsId.length}/{totalgoals})
              <span className="notification">(Solo se permite seleccionar un máximo de 30 registros)</span>
            </p>
          </div>
          <Button className="bt_delete" startIcon={<DeleteOutline />} onClick={toggleDeleteSelected}>
            Eliminar
          </Button>
        </div>
      )}
      <Table>
        <TableHead>
          <TableRowHead {...colors}>
            {heads.map((item, index) => {
              return <TableHeadComponent key={index} item={item} id={id} {...colors} position={index} />;
            })}
            <TableHeadSettingsColumn {...colors}>
              {/* <SettingsOutlined onClick={() => handleClickSettings()} /> */}
            </TableHeadSettingsColumn>
          </TableRowHead>
        </TableHead>
        <TableBody>
          {data.map((item, index) => {
            return (
              <TableRowBody key={index} isPar={index % 2 == 0}>
                <TableDataId isPar={index % 2 == 0}>
                  <div className="flex">
                    {roleId !== "ejecutivo" && (
                      <Checkbox
                        size="small"
                        onChange={e => handleDeleteGoal(e.target.checked, item)}
                        checked={validateSelected(item.id)}
                        indeterminate={false}
                      />
                    )}

                    {item?.ejecutive ? (
                      <>
                        <Person className="invidual" />
                        <p className="name">
                          {item.ejecutive?.name} {validNullData(item?.ejecutive?.lastname, "")}
                          <span className="email">{item.ejecutive?.email}</span>
                        </p>
                      </>
                    ) : (
                      <>
                        <Group className="group" />
                        <p className="name">{item.group?.name}</p>
                      </>
                    )}
                  </div>
                </TableDataId>
                <TableData>
                  <div className="goalType">
                    <p className="alias">{item?.goal?.alias === undefined ? "Sin Nombre" : item?.goal?.alias}</p>
                    <p>{validNullData(item?.goal?.goalname?.name, "No definida")}</p>
                  </div>
                </TableData>
                <TableData>
                  {goalDataType((item?.goal?.goalname?.identifier).toString(), item?.progress, item?.finalgoal)}
                </TableData>
                <TableData>
                  <div className="dates">
                    <p>{dayjs(item.initialperiodate).format("MMMM D, YYYY")}</p>
                    <span> / </span>
                    <p>{dayjs(item.finalperiodate).format("MMMM D, YYYY")}</p>
                  </div>

                  <div className="dasycomplete">
                    <p>Dias Restantes {dayjs(item?.finalperiodate).fromNow(true)}</p>
                  </div>
                </TableData>
                <TableData>
                  <div>
                    <ProgressGoal item={item} />
                  </div>
                </TableData>
                <TableData>
                  <div className="dates">
                    <p className="date">{formatDate(item.createdAt)}</p>
                  </div>
                </TableData>
                <TableDataSettingsColumn {...colors} isPar={index % 2 == 0}>
                  <div className="contentConfigTable">
                    <div className="content">
                      <div
                        aria-controls="fade-menu"
                        aria-haspopup="true"
                        className="content__icon"
                        // onClick={() => alert("Solo gerentes, pueden eliminar metas")}
                        onClick={e => handleClickOpenDialog(item)}
                      >
                        <Delete />
                      </div>
                    </div>
                    <Tooltip title="Reconteo">
                      <div className="content">
                        <div
                          aria-controls="fade-menu"
                          aria-haspopup="true"
                          className="content__icon"
                          // onClick={() => alert("Solo gerentes, pueden eliminar metas")}
                          onClick={e => handleClickOpenModal(item)}
                        >
                          <PostAdd />
                        </div>
                      </div>
                    </Tooltip>
                  </div>
                </TableDataSettingsColumn>
              </TableRowBody>
            );
          })}
        </TableBody>
      </Table>

      <Dialog
        open={openModalSelected}
        onClose={closeModalDeleteSelected}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogAlert>
          <p className="title">¿Desea Actulizar La Meta "{goalToUpdate?.goal?.alias}"?</p>
          <div className="buttons">
            <button
              disabled={isFetchingToUpdate}
              className={`buttons__cancel ${isFetchingToUpdate && "buttons__disabled"}`}
              onClick={() => toggleModalSelected()}
            >
              Cancelar
            </button>
            <button
              disabled={isFetchingToUpdate}
              className={`buttons__accept ${isFetchingToUpdate && "buttons__disabled"}`}
              onClick={() => handleClickUpdateGoal()}
            >
              Aceptar
            </button>
          </div>
        </DialogAlert>
      </Dialog>

      <Dialog
        open={openAlertDelete}
        onClose={handleAlertClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogAlert>
          <p className="title">¿Desea Eliminar la Meta Seleccionada?</p>
          <div className="buttons">
            <button
              disabled={isLoadingDelete}
              className={`buttons__cancel ${isLoadingDelete && "buttons__disabled"}`}
              onClick={() => setOpenAlertDelete(false)}
            >
              Cancelar
            </button>
            <button
              disabled={isLoadingDelete}
              className={`buttons__accept ${isLoadingDelete && "buttons__disabled"}`}
              onClick={() => handleClickDialogDelete()}
            >
              Aceptar
            </button>
          </div>
        </DialogAlert>
      </Dialog>
      <DeleteGoalsSelected
        open={openDeleteSelected}
        close={closeDeleteSelected}
        goalsDelete={deleteGoalsId}
        setGoalsDelete={setDeleteGoalsId}
        countGoals={deleteGoalsId.length}
        reload={reloadData}
      />
    </TableComponentStyled>
  );
}

function DeleteGoalsSelected({ open, close, goalsDelete, setGoalsDelete, countGoals, reload }) {
  const dispatch = useDispatch();
  const [isLoader, setIsLoader] = useState(false);
  const handleSaveChanges = async () => {
    setIsLoader(true);
    try {
      let bodyGoals = {
        goals: goalsDelete,
      };
      let response = await api.delete("ejecutivesgoals/multigoals", { data: bodyGoals });
      handleGlobalAlert("success", "¡Metas Eliminadas Correctamente!", "basic", dispatch, 6000);
      setIsLoader(false);
      reload();
      setGoalsDelete([]);
    } catch (error) {
      handleGlobalAlert("error", " ¡Error al eliminar las metas!", "basic", dispatch, 6000);
      setIsLoader(false);
      let goalss = {
        goals: goalsDelete,
      };
      console.log("metas", goalss);
      console.log(error);
    }
    close();
  };
  return (
    <DeleteSelectedStyle open={open} onClose={close}>
      <div className="container_delete__head">
        <p className="title_head">Eliminar Metas Seleccionadas</p>
      </div>
      <div className="container_delete__body">
        <p className="text_body">
          Se Eliminaran
          <NumberFormat
            className="count_goals"
            prefix=" "
            suffix=" "
            value={countGoals}
            thousandSeparator={true}
            displayType="text"
          />
          metas permanentemente
        </p>
      </div>
      <div className="container_delete__footer">
        <div className="buttons">
          {isLoader ? (
            <CircularProgress size={30} />
          ) : (
            <>
              <Button className="bt_accept" onClick={handleSaveChanges}>
                Aceptar
              </Button>
              <Button className="bt_cancel" onClick={close}>
                Cancelar
              </Button>
            </>
          )}
        </div>
      </div>
    </DeleteSelectedStyle>
  );
}
