import { Drawer } from "@material-ui/core";
import styled from "styled-components";
export const PreviewFileStyled = styled(Drawer)`
  .MuiPaper-root.MuiDrawer-paper.MuiDrawer-paperAnchorRight.MuiPaper-elevation16 {
    width: 60%;
    @media (max-width: 600px) {
      width: 100%;
    }
  }
`;
