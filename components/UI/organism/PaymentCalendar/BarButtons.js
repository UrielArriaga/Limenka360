import { Tooltip } from "@material-ui/core";
import { CalendarToday } from "@material-ui/icons";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import ListAltIcon from "@material-ui/icons/ListAlt";
import styled from "styled-components";
import { device } from "../../../../styles/global.styles";

export default function BarButtons({ addModifiedPayment, openDialogReset }) {
  return (
    <BarButtonsStyle>
      <div className="BarButtonsTitle">
        <CalendarToday />
        <p>Pagos</p>
      </div>

      <Tooltip title="Añadir pago">
        <button type="button" onClick={() => addModifiedPayment()}>
          <AddCircleIcon />
        </button>
      </Tooltip>
      <Tooltip title="Forma Automática">
        <button type="button" onClick={() => openDialogReset()}>
          <ListAltIcon />
        </button>
      </Tooltip>
    </BarButtonsStyle>
  );
}

export const BarButtonsStyle = styled.div`
  @media ${device.xs} {
    grid-template-columns: auto 100px 100px;
  }
  display: grid;
  grid-template-columns: auto 50px 100px;
  grid-gap: 10px;
  margin-bottom: 10px;
  background-color: #405189;
  color: #fff;
  border-radius: 4px;
  padding: 6px 8px;
  border: 0px;
  p {
    font-weight: 400;
    padding: 5px;
  }
  .BarButtonsTitle {
    display: flex;
    flex-direction: row;
    align-items: center;
  }
`;
