import CalendarViewer from "./components/calendarViewer/CalendarViewer";
import Pendings from "./components/pendings/Pendings";
import { CalendarPendingsStyled } from "./styles";
import { usePendings } from "./context/contextPendings";
import Spinner from "./components/ui/Spinner";
import styled from "styled-components";

function NewCalendarPendings() {
  const { isLoading } = usePendings();

  return (
    <Calendario>
      <h2>Calendario de pendintes</h2>
      <CalendarPendingsStyled>
        {/* {isLoading && <Spinner />} */}
        <Pendings />
        <CalendarViewer />
      </CalendarPendingsStyled>
    </Calendario>
  );
}

const Calendario = styled.div`
  /* margin-top: 120px; */
  width: 100%;
  box-shadow: rgba(9, 30, 66, 0.25) 0px 4px 8px -2px,
    rgba(9, 30, 66, 0.08) 0px 0px 0px 1px;
  padding: 10px;
  /* max-height: calc(100vh - 200px); */
  /* overflow-y: auto; */

  h2 {
    text-align: center;
    margin-bottom: 20px;
    color: #000f;
  }
`;

export default NewCalendarPendings;
