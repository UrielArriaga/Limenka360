import React from "react";
import { ExecutivesStyled } from "./styles";

export default function ExecutivesLayoutV2({ children }) {
  return (
    <ExecutivesStyled>
      <div className="sidebar">
        <div className="logo">
          <img src="https://limenka.sfo3.digitaloceanspaces.com/common/limenkalogo.png" alt="logo" />
        </div>

        <div className="items">
          <div className="item"></div>
        </div>
      </div>
      <div className="main">{children}</div>
    </ExecutivesStyled>
  );
}
