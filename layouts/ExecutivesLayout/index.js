import React from "react";
import { ExecutivesStyled } from "./styles";

export default function ExecutivesLayout({ children }) {
  return (
    <ExecutivesStyled>
      <div className="navbar">
        <div className="logo">
          <img src="https://limenka.sfo3.digitaloceanspaces.com/common/limenkalogo.png" alt="logo" />
        </div>
      </div>

      <div className="main">{children}</div>
    </ExecutivesStyled>
  );
}
