// import React from "react";

// export default function ExecutivesLayout({
//   type,
//   children,
// }) {

//  return {

//  }

// // import React, { useState } from "react";
// // import styled from "styled-components";
// // import { motion } from "framer-motion";
// // import {
// //   Dashboard,
// //   People,
// //   Assignment,
// //   ShoppingCart,
// //   Settings,
// //   AccountCircle,
// // } from "@material-ui/icons";

// // export const SidebarLayout = ({ children }) => {
// //   const [isSidebarOpen, setIsSidebarOpen] = useState(true);

// //   const toggleSidebar = () => {
// //     setIsSidebarOpen(!isSidebarOpen);
// //   };

// //   return (
// //     <LayoutWrapper>
// //       {/* Sidebar */}
// //       <Sidebar isOpen={isSidebarOpen}>
// //         <div className="sidebar-content">
// //           <div className="logo">
// //             <img
// //               src="https://limenka.sfo3.digitaloceanspaces.com/common/limenkalogolargewhite.png"
// //               alt="logo"
// //             />
// //           </div>
// //           <div className="nav-links">
// //             <div className="nav-item">
// //               <Dashboard />
// //               <span>Dashboard</span>
// //             </div>
// //             <div className="nav-item">
// //               <People />
// //               <span>Prospectos</span>
// //             </div>
// //             <div className="nav-item">
// //               <Assignment />
// //               <span>Oportunidades</span>
// //             </div>
// //             <div className="nav-item">
// //               <ShoppingCart />
// //               <span>Pedidos</span>
// //             </div>
// //             <div className="nav-item">
// //               <Settings />
// //               <span>Herramientas</span>
// //             </div>
// //           </div>
// //         </div>
// //       </Sidebar>

// //       {/* Main Content */}
// //       <MainContentWrapper>
// //         <NavbarWrapper
// //           as={motion.nav}
// //           initial={{ y: -80 }}
// //           animate={{ y: 0 }}
// //           transition={{ duration: 0.4 }}
// //         >
// //           <div className="left">
// //             <button className="sidebar-toggle" onClick={toggleSidebar}>
// //               ☰
// //             </button>
// //           </div>
// //           <div className="right">
// //             <div className="user">
// //               <AccountCircle className="icon" />
// //               <div className="info">
// //                 <p>Nombre Apellido</p>
// //                 <p className="role">Gerente</p>
// //               </div>
// //             </div>
// //           </div>
// //         </NavbarWrapper>

// //         <MainContent>{children}</MainContent>
// //       </MainContentWrapper>
// //     </LayoutWrapper>
// //   );
// // };

// // const LayoutWrapper = styled.div`
// //   display: flex;
// //   height: 100vh;
// // `;

// // const Sidebar = styled.div`
// //   width: ${({ isOpen }) => (isOpen ? "250px" : "0px")};
// //   height: 100vh;
// //   background-color: #222528;
// //   color: white;
// //   padding: 20px;
// //   transition: width 0.3s ease;
// //   overflow-x: hidden;

// //   .sidebar-content {
// //     display: flex;
// //     flex-direction: column;
// //     align-items: center;
// //     gap: 20px;

// //     .logo {
// //       img {
// //         width: 180px;
// //         margin-bottom: 40px;
// //       }
// //     }

// //     .nav-links {
// //       display: flex;
// //       flex-direction: column;
// //       gap: 20px;

// //       .nav-item {
// //         display: flex;
// //         align-items: center;
// //         gap: 10px;
// //         color: #b0bec5;
// //         cursor: pointer;
// //         padding: 6px 12px;
// //         border-radius: 6px;
// //         transition: 0.3s ease;

// //         &:hover {
// //           background-color: #2c3038;
// //           color: #39b8df;
// //         }

// //         svg {
// //           font-size: 20px;
// //         }

// //         span {
// //           font-size: 14px;
// //         }
// //       }
// //     }
// //   }
// // `;

// // const NavbarWrapper = styled.div`
// //   height: 70px;
// //   background: #1f232a;
// //   color: white;
// //   padding: 0 30px;
// //   display: flex;
// //   align-items: center;
// //   justify-content: space-between;
// //   box-shadow: 0px 2px 6px rgba(0, 0, 0, 0.2);

// //   .left {
// //     .sidebar-toggle {
// //       font-size: 30px;
// //       background: none;
// //       color: white;
// //       border: none;
// //       cursor: pointer;
// //     }
// //   }

// //   .right {
// //     display: flex;
// //     align-items: center;

// //     .user {
// //       display: flex;
// //       align-items: center;
// //       gap: 10px;

// //       .icon {
// //         font-size: 34px;
// //         color: #39b8df;
// //       }

// //       .info {
// //         display: flex;
// //         flex-direction: column;

// //         p {
// //           margin: 0;
// //           font-size: 13px;
// //           color: #e0e0e0;
// //         }

// //         .role {
// //           font-size: 11px;
// //           color: #9aa5b1;
// //         }
// //       }
// //     }
// //   }
// // `;

// // const MainContentWrapper = styled.div`
// //   display: flex;
// //   flex-direction: column;
// //   flex: 1;
// //   /* padding: 30px; */
// // `;

// // const MainContent = styled.main`
// //   flex: 1;
// //   background-color: #f5f6fa;
// //   padding: 30px;
// //   overflow-y: auto;
// // `;

// // import React, { useState } from "react";
// // import styled from "styled-components";
// // import { motion } from "framer-motion";
// // import {
// //   Dashboard,
// //   People,
// //   Assignment,
// //   ShoppingCart,
// //   Settings,
// //   AccountCircle,
// // } from "@material-ui/icons";

// // export const SidebarLayout = ({ children }) => {
// //   const [isSidebarOpen, setIsSidebarOpen] = useState(true);

// //   const toggleSidebar = () => {
// //     setIsSidebarOpen(!isSidebarOpen);
// //   };

// //   return (
// //     <LayoutWrapper>
// //       {/* Sidebar */}
// //       <Sidebar isOpen={isSidebarOpen}>
// //         <div className="sidebar-content">
// //           <div className="logo">Limenka</div>
// //           <div className="nav-links">
// //             <div className="nav-item">
// //               <Dashboard />
// //               <span>Dashboard</span>
// //             </div>
// //             <div className="nav-item">
// //               <People />
// //               <span>Prospectos</span>
// //             </div>
// //             <div className="nav-item">
// //               <Assignment />
// //               <span>Oportunidades</span>
// //             </div>
// //             <div className="nav-item">
// //               <ShoppingCart />
// //               <span>Pedidos</span>
// //             </div>
// //             <div className="nav-item">
// //               <Settings />
// //               <span>Herramientas</span>
// //             </div>
// //           </div>
// //         </div>
// //       </Sidebar>

// //       {/* Main Content */}
// //       <MainContentWrapper>
// //         <NavbarWrapper
// //           as={motion.nav}
// //           initial={{ y: -80 }}
// //           animate={{ y: 0 }}
// //           transition={{ duration: 0.4 }}
// //         >
// //           <div className="left">
// //             <button className="sidebar-toggle" onClick={toggleSidebar}>
// //               ☰
// //             </button>
// //           </div>
// //           <div className="right">
// //             <div className="user">
// //               <AccountCircle className="icon" />
// //               <div className="info">
// //                 <p>Nombre Apellido</p>
// //                 <p className="role">Gerente</p>
// //               </div>
// //             </div>
// //           </div>
// //         </NavbarWrapper>

// //         <MainContent>{children}</MainContent>
// //       </MainContentWrapper>
// //     </LayoutWrapper>
// //   );
// // };

// // const LayoutWrapper = styled.div`
// //   display: flex;
// //   height: 100vh;
// // `;

// // const Sidebar = styled.div`
// //   width: ${({ isOpen }) => (isOpen ? "250px" : "0px")};
// //   height: 100vh;
// //   background-color: #222528;
// //   color: white;
// //   padding: 20px;
// //   transition: width 0.3s ease;
// //   overflow-x: hidden;

// //   .sidebar-content {
// //     display: flex;
// //     flex-direction: column;
// //     align-items: center;
// //     gap: 20px;

// //     .logo {
// //       color: #fff;
// //       font-size: 20px;
// //       margin-bottom: 40px;
// //     }

// //     .nav-links {
// //       display: flex;
// //       flex-direction: column;
// //       gap: 20px;

// //       .nav-item {
// //         display: flex;
// //         align-items: center;
// //         gap: 10px;
// //         color: #b0bec5;
// //         cursor: pointer;
// //         padding: 6px 12px;
// //         border-radius: 6px;
// //         transition: 0.3s ease;

// //         &:hover {
// //           background-color: #2c3038;
// //           color: #39b8df;
// //         }

// //         svg {
// //           font-size: 20px;
// //         }

// //         span {
// //           font-size: 14px;
// //         }
// //       }
// //     }
// //   }
// // `;

// // const NavbarWrapper = styled.div`
// //   height: 70px;
// //   background: #1f232a;
// //   color: white;
// //   padding: 0 30px;
// //   display: flex;
// //   align-items: center;
// //   justify-content: space-between;
// //   box-shadow: 0px 2px 6px rgba(0, 0, 0, 0.2);

// //   .left {
// //     .sidebar-toggle {
// //       font-size: 30px;
// //       background: none;
// //       color: white;
// //       border: none;
// //       cursor: pointer;
// //     }
// //   }

// //   .right {
// //     display: flex;
// //     align-items: center;

// //     .user {
// //       display: flex;
// //       align-items: center;
// //       gap: 10px;

// //       .icon {
// //         font-size: 34px;
// //         color: #39b8df;
// //       }

// //       .info {
// //         display: flex;
// //         flex-direction: column;

// //         p {
// //           margin: 0;
// //           font-size: 13px;
// //           color: #e0e0e0;
// //         }

// //         .role {
// //           font-size: 11px;
// //           color: #9aa5b1;
// //         }
// //       }
// //     }
// //   }
// // `;

// // const MainContentWrapper = styled.div`
// //   display: flex;
// //   flex-direction: column;
// //   flex: 1;
// //   /* padding: 30px; */
// // `;

// // const MainContent = styled.main`
// //   flex: 1;
// //   background-color: #f5f6fa;
// //   padding: 30px;
// //   overflow-y: auto;
// // `;

// // --------------------otra version

// // import React from "react";
// // import styled from "styled-components";
// // import { motion } from "framer-motion";
// // import {
// //   Dashboard,
// //   People,
// //   Assignment,
// //   ShoppingCart,
// //   Settings,
// //   AccountCircle,
// // } from "@material-ui/icons";

// // export const SidebarLayout = ({ children }) => {
// //   return (
// //     <NavbarWrapper>
// //       <Navbar
// //         as={motion.nav}
// //         initial={{ y: -80 }}
// //         animate={{ y: 0 }}
// //         transition={{ duration: 0.4 }}
// //       >
// //         <div className="left">
// //           <img
// //             src="https://limenka.sfo3.digitaloceanspaces.com/common/limenkalogolargewhite.png"
// //             alt="logo"
// //             className="logo"
// //           />
// //         </div>
// //         <div className="center">
// //           <div className="nav-item">
// //             <Dashboard />
// //             <span>Dashboard</span>
// //           </div>
// //           <div className="nav-item">
// //             <People />
// //             <span>Prospectos</span>
// //           </div>
// //           <div className="nav-item">
// //             <Assignment />
// //             <span>Oportunidades</span>
// //           </div>
// //           <div className="nav-item">
// //             <ShoppingCart />
// //             <span>Pedidos</span>
// //           </div>
// //           <div className="nav-item">
// //             <Settings />
// //             <span>Herramientas</span>
// //           </div>
// //         </div>
// //         <div className="right">
// //           <div className="user">
// //             <AccountCircle className="icon" />
// //             <div className="info">
// //               <p>Nombre Apellido</p>
// //               <p className="role">Gerente</p>
// //             </div>
// //           </div>
// //         </div>
// //       </Navbar>

// //       <MainContent>{children}</MainContent>
// //     </NavbarWrapper>
// //   );
// // };

// // const NavbarWrapper = styled.div`
// //   height: 100vh;
// //   display: flex;
// //   flex-direction: column;
// // `;

// // const Navbar = styled.div`
// //   height: 70px;
// //   background: #1f232a;
// //   color: white;
// //   padding: 0 30px;
// //   display: flex;
// //   align-items: center;
// //   justify-content: space-between;
// //   box-shadow: 0px 2px 6px rgba(0, 0, 0, 0.2);

// //   .logo {
// //     height: 40px;
// //   }

// //   .center {
// //     display: flex;
// //     gap: 30px;

// //     .nav-item {
// //       display: flex;
// //       align-items: center;
// //       gap: 8px;
// //       color: #b0bec5;
// //       cursor: pointer;
// //       padding: 6px 12px;
// //       border-radius: 6px;
// //       transition: 0.3s ease;

// //       &:hover {
// //         background-color: #2c3038;
// //         color: #39b8df;
// //       }

// //       svg {
// //         font-size: 20px;
// //       }

// //       span {
// //         font-size: 14px;
// //       }
// //     }
// //   }

// //   .right {
// //     .user {
// //       display: flex;
// //       align-items: center;
// //       gap: 10px;

// //       .icon {
// //         font-size: 34px;
// //         color: #39b8df;
// //       }

// //       .info {
// //         display: flex;
// //         flex-direction: column;

// //         p {
// //           margin: 0;
// //           font-size: 13px;
// //           color: #e0e0e0;
// //         }

// //         .role {
// //           font-size: 11px;
// //           color: #9aa5b1;
// //         }
// //       }
// //     }
// //   }
// // `;

// // const MainContent = styled.main`
// //   flex: 1;
// //   background-color: #f5f6fa;
// //   padding: 30px;
// //   overflow-y: auto;
// // `;

// // -----------------------------------OTRA VARIANTE--------------------
// // import React, { useState } from "react";
// // import styled from "styled-components";
// // import { motion } from "framer-motion";
// // import {
// //   Dashboard,
// //   People,
// //   Assignment,
// //   ShoppingCart,
// //   Settings,
// //   Menu,
// //   ChevronLeft,
// // } from "@material-ui/icons";

// // export const SidebarLayout = ({ children }) => {
// //   const [isOpen, setIsOpen] = useState(true);

// //   const toggleSidebar = () => setIsOpen(!isOpen);

// //   return (
// //     <SidebarWrapper>
// //       <motion.aside
// //         className={`sidebar ${isOpen ? "open" : "closed"}`}
// //         initial={{ width: 260 }}
// //         animate={{ width: isOpen ? 260 : 70 }}
// //         transition={{ duration: 0.3 }}
// //       >
// //         <div className="top">
// //           <div className="logo">
// //             {isOpen ? (
// //               <img
// //                 src="https://limenka.sfo3.digitaloceanspaces.com/common/limenkalogolargewhite.png"
// //                 alt="logo"
// //               />
// //             ) : (
// //               <img
// //                 src="https://limenka.sfo3.digitaloceanspaces.com/common/logowhite.png"
// //                 alt="logo-mini"
// //                 className="mini"
// //               />
// //             )}
// //           </div>
// //           <div className="toggle-btn" onClick={toggleSidebar}>
// //             {isOpen ? <ChevronLeft /> : <Menu />}
// //           </div>
// //         </div>

// //         <nav className="menu">
// //           <div className="menu-item">
// //             <Dashboard />
// //             {isOpen && <span>Dashboard</span>}
// //           </div>
// //           <div className="menu-item">
// //             <People />
// //             {isOpen && <span>Prospectos</span>}
// //           </div>
// //           <div className="menu-item">
// //             <Assignment />
// //             {isOpen && <span>Oportunidades</span>}
// //           </div>
// //           <div className="menu-item">
// //             <ShoppingCart />
// //             {isOpen && <span>Pedidos</span>}
// //           </div>
// //           <div className="menu-item">
// //             <Settings />
// //             {isOpen && <span>Herramientas</span>}
// //           </div>
// //         </nav>
// //       </motion.aside>

// //       <main className="content">{children}</main>
// //     </SidebarWrapper>
// //   );
// // };

// // const SidebarWrapper = styled.div`
// //   display: flex;
// //   height: 100vh;

// //   .sidebar {
// //     background: #1f232a;
// //     color: white;
// //     padding: 20px 10px;
// //     display: flex;
// //     flex-direction: column;
// //     gap: 20px;
// //     overflow: hidden;

// //     .top {
// //       display: flex;
// //       align-items: center;
// //       justify-content: space-between;
// //     }

// //     .logo img {
// //       height: 40px;
// //     }

// //     .logo .mini {
// //       width: 40px;
// //       height: 40px;
// //     }

// //     .toggle-btn {
// //       cursor: pointer;
// //       color: white;
// //     }

// //     .menu {
// //       display: flex;
// //       flex-direction: column;
// //       gap: 15px;
// //       margin-top: 20px;

// //       .menu-item {
// //         display: flex;
// //         align-items: center;
// //         gap: 10px;
// //         color: #b0bec5;
// //         cursor: pointer;
// //         padding: 8px;
// //         border-radius: 8px;
// //         transition: all 0.3s ease;

// //         &:hover {
// //           background: #2c3038;
// //           color: #39b8df;
// //         }

// //         svg {
// //           font-size: 20px;
// //         }

// //         span {
// //           white-space: nowrap;
// //         }
// //       }
// //     }
// //   }

// //   .content {
// //     flex: 1;
// //     padding: 30px;
// //     background-color: #f5f6fa;
// //     overflow-y: auto;
// //   }
// // `;

// // .------FINALIZA VARIANTE----------

// // --- VARIANTE DOS---

// // import React from "react";

// // import {
// //   AccountCircle,
// //   CalendarTodaySharp,
// //   Dashboard,
// //   StoreMallDirectory,
// // } from "@material-ui/icons";
// // import { Avatar, IconButton } from "@material-ui/core";

// // export default function ExecutivesLayoutTopNav({ children }) {
// //   return (
// //     <ExecutivesStyled>
// //       <div className="navbar">
// //         <div className="logo">
// //           <img
// //             src="https://limenka.sfo3.digitaloceanspaces.com/common/limenkalogolargewhite.png"
// //             alt="logo"
// //           />
// //         </div>

// //         <div className="navbar-wrapper">
// //           <div className="pages">
// //             <div className="pages__item">
// //               <Dashboard className="icon" />
// //               <p>Dashboard</p>
// //             </div>

// //             <div className="pages__item">
// //               <Dashboard className="icon" />
// //               <p>Prospectos</p>
// //             </div>

// //             <div className="pages__item">
// //               <Dashboard className="icon" />
// //               <p>Oportunidades</p>
// //             </div>

// //             <div className="pages__item submenu-container">
// //               <Dashboard className="icon" />
// //               <p>Clientes</p>
// //             </div>

// //             <div className="pages__item">
// //               <Dashboard className="icon" />
// //               <p>Cuentas</p>
// //             </div>

// //             <div className="pages__item">
// //               <Dashboard className="icon" />
// //               <p>Pedidos</p>
// //             </div>

// //             <div className="pages__item submenu-container">
// //               <Dashboard className="icon" />
// //               <p>Herramientas</p>
// //               <div className="submenu">
// //                 <div className="submenu__item">Cuenta 1</div>
// //                 <div className="submenu__item">Cuenta 2</div>
// //                 <div className="submenu__item">Cuenta 3</div>
// //               </div>
// //             </div>
// //           </div>
// //         </div>

// //         <div className="account">
// //           <IconButton>
// //             <CalendarTodaySharp />
// //           </IconButton>

// //           <IconButton>
// //             <StoreMallDirectory />
// //           </IconButton>
// //           <Avatar className="account-avatar" />
// //           <div className="account-fullname">
// //             <p>Nombre Apellido</p>
// //             <p>Gerente de Ventas</p>
// //           </div>
// //         </div>
// //       </div>

// //       {/* <div className="goalsprogress">
// //       </div> */}

// //       <div className="main">{children}</div>
// //     </ExecutivesStyled>
// //   );
// // }
// // // --------------------estilos------------------

// // import styled from "styled-components";

// // const ExecutivesStyled = styled.div`
// //   /* * {
// //     margin: 0;
// //     padding: 0;
// //   } */

// //   .logo {
// //     img {
// //       width: 200px;
// //     }
// //   }

// //   .navbar {
// //     display: flex;
// //     align-items: center;
// //     justify-content: space-between;
// //     background-color: #222528;
// //     /* 17385B */
// //     height: 80px;
// //     padding: 0 40px;
// //     /* background-color: red; */
// //   }

// //   .logo {
// //     display: flex;
// //     flex: 1;
// //   }
// //   .navbar-wrapper {
// //     /* background-color: blue; */
// //     /* max-width: 1300px; */
// //     /* margin: auto; */
// //     display: flex;
// //     align-items: center;
// //     justify-content: center;
// //     padding: 10px;

// //     flex: 2;

// //     .pages {
// //       display: flex;

// //       &__item {
// //         margin-right: 20px;
// //         display: flex;
// //         align-items: center;

// //         .icon {
// //           margin-right: 10px;
// //           color: #39b8df;
// //         }

// //         p {
// //           color: #e0e0e0;
// //           font-size: 12px;
// //         }
// //       }

// //       .submenu-container {
// //         position: relative;
// //         cursor: pointer;

// //         .icon {
// //           margin-right: 10px;
// //           color: #39b8df;
// //         }

// //         p {
// //           color: #e0e0e0;
// //           font-size: 13px;
// //         }

// //         .submenu {
// //           display: none;
// //           position: absolute;
// //           width: 200px;
// //           background-color: #fff;
// //           padding: 10px;
// //           border-radius: 5px;
// //           top: 100%;
// //           left: 0;
// //           z-index: 1;

// //           .submenu__item {
// //             margin-top: 10px;
// //             color: #e0e0e0;
// //             font-size: 13px;
// //           }
// //         }

// //         &:hover .submenu {
// //           display: block;
// //         }
// //       }
// //     }
// //   }
// //   .account {
// //     display: flex;
// //     align-items: center;
// //     justify-content: flex-end;
// //     flex: 1;

// //     .account-avatar {
// //       margin-right: 10px;
// //     }

// //     .account-fullname {
// //       display: flex;
// //       flex-direction: column;
// //       /* align-items: flex-end; */
// //       /* margin-left: 10px; */

// //       p {
// //         color: #e0e0e0;
// //         font-size: 13px;
// //         margin: 0;
// //       }
// //     }
// //   }

// //   .goalsprogress {
// //     display: flex;
// //     align-items: center;
// //     justify-content: space-between;
// //     background-color: #222528;
// //     /* 17385B */
// //     height: 80px;
// //     padding: 0 40px;
// //     /* background-color: red; */
// //   }

// //   .main {
// //     padding: 10px;
// //     /* height: 100vh; */
// //   }
// // `;
