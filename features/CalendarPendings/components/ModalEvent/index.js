import React, { useState } from "react";
import dayjs from "dayjs";
import { useForm } from "react-hook-form";
import { StyledModal } from "./styles";
import ModalBody from "./ModalBody";
import ModalHeader from "./ModalHeader";
import ModalFooter from "./ModalFooter";
import { useSelector } from "react-redux";
import { userSelector } from "../../../../redux/slices/userSlice";
import { api } from "../../../../services/api";
import { useDispatch } from "react-redux";
import { removePendingToday } from "../../../../redux/slices/slopesSlice";

export default function ModalEvent({ open, onClose, eventSelected }) {
  const { id_user } = useSelector(userSelector);
  const dispatch = useDispatch();
  const [selectedResult, setSelectedResult] = useState(null);
  const [priority, setPriority] = useState("Media");
  const [pendingType, setPendingType] = useState("Whatsapp");
  const [customDate, setCustomDate] = useState("");
  const [addPending, setAddPending] = useState(false);

  const {
    register,
    handleSubmit,
    setError,
    clearErrors,
    control,
    formState: { errors },
    reset,
  } = useForm();

  const handlePreset = (value) => {
    const now = dayjs();
    let newDate = now;
    if (value.includes("hora")) {
      const hours = parseInt(value);
      newDate = now.add(hours, "hour");
    } else if (value.includes("día")) {
      const days = parseInt(value);
      newDate = now.add(days, "day");
    }
    setCustomDate(newDate.format("YYYY-MM-DDTHH:mm"));
  };

  const onSubmit = async (data) => {
    if (eventSelected?.pendingTypes?.name === "Whatsapp") {
      if (!data.action) {
        setError("action", {
          type: "manual",
          message: "Selecciona una acción.",
        });
        return;
      }
    }

    if (eventSelected?.pendingstype?.name === "Llamada") {
      if (!data.action) {
        setError("action", {
          type: "manual",
          message: "Selecciona un resultado.",
        });
        return;
      }
    }

    if (addPending) {
      if (!priority || !pendingType || !customDate || !data.pendingNotes) {
        setError("pending", {
          type: "manual",
          message: "Completa todos los campos del pendiente.",
        });
        return;
      }
    } else {
      clearErrors("pending");
    }

    const payload = {
      pendingupdate: {
        isdone: true,
      },
      trackingdata: {
        observations: selectedResult + data.observations,
        reason: "",
        prospectId: eventSelected?.prospectId,
        status: eventSelected?.status,
        phaseId: eventSelected?.phaseId,
        actionId: data.action?.id,
        ejecutiveId: id_user,
      },
      ...(addPending && {
        pendingdata: {
          prospectId: eventSelected?.prospectId,
          status: eventSelected?.status,
          createdbyId: id_user,
          priority: priority,
          subject: "llamar",
          place: "",
          pendingstypeId: pendingType?.id,
          zone: "GMT-06:00",
          description: data.pendingNotes,
          remember: true,
          remember_by: "correo",
          notify: true,
          notify_by: "correo",
          date_from: "2025-05-23T00:18:00.000Z",
          ejecutiveId: id_user,
        },
      }),
    };

    try {
      let response = await api.post(
        `/pendings/updateandcreate/${eventSelected.id}`,
        payload
      );
      1;

      dispatch(removePendingToday(eventSelected.id));
    } catch (error) {}

    reset();
    onClose();
  };

  return (
    <StyledModal
      open={open}
      onClose={onClose}
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
      BackdropProps={{ style: { backgroundColor: "rgba(0, 0, 0, 0.1)" } }}
    >
      <form onSubmit={handleSubmit(onSubmit)} className="container">
        <ModalHeader
          tipo={eventSelected?.pendingstype?.name || "-"}
          dateto={eventSelected?.startDate}
        />

        <ModalBody
          eventSelected={eventSelected}
          isCall={["Llamada", "Whatsapp"].includes(
            eventSelected?.pendingstype?.name
          )}
          options={[
            "Sí respondió",
            "No respondió",
            "No contesta",
            "Llamar más tarde",
          ]}
          selectedResult={selectedResult}
          setSelectedResult={setSelectedResult}
          clearErrors={clearErrors}
          errors={errors}
          register={register}
          addPending={addPending}
          setAddPending={setAddPending}
          priority={priority}
          setPriority={setPriority}
          pendingType={pendingType}
          setPendingType={setPendingType}
          customDate={customDate}
          setCustomDate={setCustomDate}
          handlePreset={handlePreset}
          control={control}
        />
        <ModalFooter onClose={onClose} />
      </form>
    </StyledModal>
  );
}
