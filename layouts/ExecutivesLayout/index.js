import React from "react";
import { ExecutivesStyled } from "./styles";
import { SideBarWithNav } from "./SideBarWithNav";
import { SidebarLayout } from "./SideBar";
import { NavbarLayout } from "./NavBar";
import { TestLayout } from "./Test";
import Layoutversiontwo from "./Layoutversiontwo";

export default function ExecutivesLayout({ type, children }) {
  switch (type) {
    case "sidebarnav":
      return <SideBarWithNav>{children}</SideBarWithNav>;

    case "sidebar":
      return <SidebarLayout>{children}</SidebarLayout>;

    case "navbar":
      return <NavbarLayout>{children}</NavbarLayout>;

    case "test":
      return <TestLayout>{children}</TestLayout>;

    case "versiontwo":
      return <Layoutversiontwo>{children}</Layoutversiontwo>;
    default:
      break;
  }

  // return (
  //   <ExecutivesStyled>
  //     <div className="navbar">
  //       <div className="logo">
  //         <img
  //           src="https://limenka.sfo3.digitaloceanspaces.com/common/limenkalogo.png"
  //           alt="logo"
  //         />
  //       </div>
  //     </div>

  //     <div className="main">{children}</div>
  //   </ExecutivesStyled>
  // );
}
