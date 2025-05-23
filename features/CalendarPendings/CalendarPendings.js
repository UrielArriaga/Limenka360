import CalendarViewer from "./components/calendarViewer/CalendarViewer";
import Pendings from "./components/pendings/Pendings";
import { CalendarPendingsStyled } from "./styles";
import { usePendings } from "./context/contextPendings";
import Spinner from "./components/ui/Spinner";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { getSlopesToday } from "../../redux/slices/slopesSlice";
import { useSelector } from "react-redux";
import { userSelector } from "../../redux/slices/userSlice";
import dayjs from "dayjs";
import { Modal } from "@material-ui/core";
import { useState } from "react";
import ModalEvent from "./components/ModalEvent";

function NewCalendarPendings() {
  const { isLoading, fetchEvents } = usePendings();
  const [eventSelected, setEventSelected] = useState(null);
  const dispatch = useDispatch();
  const { id_user } = useSelector(userSelector);
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Calendario>
      <CalendarPendingsStyled>
        {isLoading && <Spinner />}
        <Pendings />
        <CalendarViewer
          setEventSelected={setEventSelected}
          handleOpen={handleOpen}
        />

        <ModalEvent
          open={open}
          onClose={handleClose}
          eventSelected={eventSelected}
          setEventSelected={setEventSelected}
        />
      </CalendarPendingsStyled>
    </Calendario>
  );
}

const Calendario = styled.div`
  /* margin-top: 120px; */
  width: 100%;

  height: 100%;
  box-shadow: rgba(9, 30, 66, 0.25) 0px 4px 8px -2px,
    rgba(9, 30, 66, 0.08) 0px 0px 0px 1px;
  /* padding: 10px; */
  /* max-height: calc(100vh - 200px); */
  /* overflow-y: auto; */

  h2 {
    text-align: center;
    margin-bottom: 20px;
    color: #000f;
  }
`;

export default NewCalendarPendings;
