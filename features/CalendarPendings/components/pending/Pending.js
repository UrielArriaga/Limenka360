import { AccountBox, DoubleArrowOutlined, ListAltOutlined, ListOutlined, TodayOutlined } from "@material-ui/icons";
import {
  BtnPending,
  BtnClosePending,
  PendingField,
  PendingGroup,
  PendingSelect,
  PendingStyled,
  PendingTextArea,
  PendingTitle,
  PendingValue,
  GoTo,
} from "./styles";

import CloseIcon from "@material-ui/icons/Close";
import { formatSpanishDate, formatText } from "../../utils/utils";
import { useEffect, useState } from "react";
import { getAllPhase } from "../../service/phaseApi";
import { useForm } from "react-hook-form";
import { getProspect, updateProspectPhase } from "../../service/prospectsApi";
import { getPendingType, updatePending } from "../../service/pendingsApi";
import { createTracking } from "../../service/trackingsApi";
import { userSelector } from "../../../../redux/slices/userSlice";
import { useSelector } from "react-redux";
import RequestCommon from "../../../../services/request_Common";
import { usePendings } from "./../../context/contextPendings";

function Pending({ pending, onClose }) {
  const { setNewProperty, setIsLoading, isLoading, filters } = usePendings();

  const [phaseList, setPhaseList] = useState([]);
  const [prospect, setProstect] = useState("");
  const { id_user } = useSelector(userSelector);
  const commonApi = new RequestCommon();
  const [dataActions, setDataActions] = useState([]);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      phase: pending?.phase || "",
      observations: "",
    },
  });

  useEffect(() => {
    if (pending) {
      reset({
        observations: pending.observations || "",
      });
    }
  }, [pending]);

  useEffect(() => {
    if (prospect && phaseList.length > 0) {
      reset({
        phase: prospect.phaseId || "",
      });
    }
  }, [prospect, phaseList]);

  // GET ACTIONS
  useEffect(() => {
    commonApi.getActions().then(actions => {
      setDataActions(actions.data.results);
    });
  }, []);

  // GET ALL PHASES
  useEffect(() => {
    getAllPhase().then(data => {
      setPhaseList(data);
    });
  }, []);

  // GET FULLNAME OF PROSPECT
  useEffect(() => {
    if (!pending) return;
    getProspect(pending.prospectId).then(data => {
      setProstect(data);
    });
  }, [pending]);

  // UPDATE STATE OF PENDING (isDone = true | false)
  const handleSubmitPending = async data => {
    setIsLoading(true);
    try {
      // 1) UPDATE PENDING TO DONE AND
      await updatePending(pending.id, {
        isdone: true,
        // observations: data.observations,
        // phase: data.phase,
      });

      // 2) UPDATE PHASE PROSPECT TO PENDING
      if (pending.phaseId !== data.phase) await updateProspectPhase(pending.prospectId, data.phase);

      // 3 CREATING A NEW TRACKING
      // MATCH TYPE PENDINGS WITH ACTIONS
      const pendingType = await getPendingType(pending.pendingstypeId);

      const traking = {
        prospectId: pending.prospectId,
        status: pending.status,
        actionId: dataActions.find(action => action.name == pendingType.name).id,
        reason: "Seguimiento Automático",
        observations: data.observations,
        phaseId: data.phase,
        createdbyId: id_user,
      };

      if (pending.status === 2 || pending.status === 4 || pending.status === 5)
        traking.oportunityId = pending.oportunityId;

      await createTracking(traking);

      alert("Pendiente marcado como completado");
      onClose();
    } catch (error) {
      console.error("Error al actualizar pendiente", error);
      alert("Error al completar el pendiente");
    } finally {
      setNewProperty(property => !property);
      setIsLoading(false);
    }
  };

  return (
    <PendingStyled onSubmit={handleSubmit(handleSubmitPending)}>
      <PendingTitle>{filters.byPerform ? "Completar pendiente" : "Pendiente completado"}</PendingTitle>
      <BtnClosePending onClick={onClose}>
        <CloseIcon />
      </BtnClosePending>

      <PendingGroup>
        <PendingField Icon={ListOutlined}>Asunto</PendingField>
        <PendingValue>{formatText(pending?.subject, "firstLetterUpperCase")}</PendingValue>
      </PendingGroup>

      <PendingGroup>
        <PendingField Icon={AccountBox}>Contacto</PendingField>

        <GoTo href={`/prospectos/${prospect?.id}`}>
          <span>{formatText(prospect.fullname, "capitalizeEachWord")}</span>
        </GoTo>
      </PendingGroup>

      <PendingGroup>
        <PendingField Icon={TodayOutlined}>Fecha</PendingField>
        <PendingValue>{formatSpanishDate(new Date(pending.date_from))}</PendingValue>
      </PendingGroup>

      <PendingGroup>
        <PendingField Icon={TodayOutlined}>Hasta</PendingField>
        <PendingValue>
          {pending?.date_to ? formatSpanishDate(new Date(pending.date_to)) : "Sin Fecha Límite"}
        </PendingValue>
      </PendingGroup>

      <PendingGroup $span={"full"}>
        <PendingField Icon={ListAltOutlined}>Descripción</PendingField>
        <PendingValue>{formatText(pending.description, "firstLetterUpperCase")}</PendingValue>
      </PendingGroup>

      {filters.byPerform && (
        <>
          <PendingGroup $span={"full"} $justifySelf="start">
            <PendingField Icon={DoubleArrowOutlined}>Fase*</PendingField>
            <PendingSelect {...register("phase", { required: true })} disabled={pending.isdone}>
              <option value="">-- Selecciona Fase --</option>
              {phaseList.map(phase => (
                <option key={phase.id} value={phase.id}>
                  {phase.name}
                </option>
              ))}
            </PendingSelect>
            {errors.phase && <span style={{ color: "#fa5252" }}>La fase es requerida</span>}
          </PendingGroup>

          <PendingGroup $span={"full"}>
            <PendingField Icon={AccountBox}>Observaciones*</PendingField>
            <PendingTextArea {...register("observations", { required: true })} disabled={pending.isdone} />
            {errors.observations && <span style={{ color: "#fa5252" }}>Las observaciones son requeridas</span>}
          </PendingGroup>
        </>
      )}

      {!pending.isdone && (
        <PendingGroup $span={"full"} $type="horizontal" $justifyContent={"center"} disabled={isLoading}>
          <BtnPending $color="#fff" $bgColor="#212529" onClick={onClose}>
            Cancelar
          </BtnPending>
          <BtnPending $color="#20c997" $bgColor="#212529" type="submit" disabled={isLoading}>
            Marcar como completado
          </BtnPending>
        </PendingGroup>
      )}
    </PendingStyled>
  );
}

export default Pending;
