import { Dialog } from "@material-ui/core";
import styled from "styled-components";
import { colors } from "../../../../styles/global.styles";

export const DialogContainer = styled(Dialog)`
  .header {
    display: flex;
    justify-content: space-between;
    padding: 20px;
    height: 60px;
    background-color: ${colors.primaryColorDark};
  }

  .header .executivename {
    color: #fff;
    font-weight: bold;
  }

  .header svg {
    color: #fff;
    font-size: 30px;
  }

  .content {
    padding: 20px;
  }

  .cards {
    display: flex;
    gap: 20px;
  }

  .cards .card {
  }

  .filters {
    select {
      height: 46px;
      width: 309px;
      padding-left: 15px;
      border-width: 0px;
      outline: none;
      border-radius: 5px;
      background-color: #fff;
      border: 1px solid #bdbdbd;
    }
  }
`;
