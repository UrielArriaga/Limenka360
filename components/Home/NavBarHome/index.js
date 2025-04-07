import {useState, useEffect} from 'react'
import styled from "styled-components";
import Link from 'next/link';
import { Grid, Drawer } from '@material-ui/core';
import {Menu, Close,WhatsApp, Facebook,Instagram,AccountCircle} from '@material-ui/icons';
import Modalconta from "../ModalContact"
export default function NavbarHome () {

    
    const [open, setOpen] = useState(false);
    const [opendrawer, setOpenDrawer] = useState(false);
    const [scrollY, setScrollY] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
          setScrollY(window.scrollY);
        };
        handleScroll();
        window.addEventListener("scroll", handleScroll);
        return () => {
          window.removeEventListener("scroll", handleScroll);
        };
      }, []);

    const handleClickOpen = () => {
        setOpen(true);
      };

      const handleClose = () => {
        setOpen(false);
      };

      const handleClickOpenDrawer = () => {
        setOpenDrawer(true);
      };

      const handleCloseDrawer = () => {
        setOpenDrawer(false);
      };
  return (
    <NavBarStyled scrollBiggger={scrollY}>
    <header className ="header-height">
     <Grid container className="container" >
        <Grid item className="logo" xs={3}>
        <Link href="/">
            <img src="logo-color.png" alt="logo"/></Link>
        </Grid>
        <Grid item className="menus" xs={5}>
        <nav className="menus_nav">
        <ul className="menus_list">
        <li><Link href="/">Inicio</Link></li>  
        <li><Link href="/">Acerca de</Link></li>  
        <li><Link href="/">Planes</Link></li>    
        <li><Link href="/">Contacto</Link></li>  
        </ul>
        </nav>
        </Grid>
        <Grid item className="header-bottom-right" xs={3}>
        <Link href="/login">
       <div className="icon-login">
          <AccountCircle/>
          <span className="text-account">Iniciar sesión</span>
          </div>
        </Link>
        <div className="icon-account" onClick={handleClickOpen}>Solicita una Demo</div>
        </Grid>
        <Grid className="menu_mobil">
            <Menu onClick={handleClickOpenDrawer}/>
            <DrawerStyled anchor="right" open={opendrawer} onClose={handleCloseDrawer}>
             <div className="icon-close">
             <Close onClick={handleCloseDrawer}/>
             </div>
             <div className="logo-drawer">
             <img src="logowhite.png" alt="logo"/>
             </div>
             <Grid item className="menus" >
        <nav className="menus_nav">
        <ul className="menus_list">
        <li className="menus_hasdrop"><Link href="/">Inicio</Link></li>  
        <li className="menus_hasmiddle"><Link href="/">Acerca de</Link></li>  
        <li className="menus_hasmiddle"><Link href="/">Planes</Link></li>    
        <li className="menus_hasdown"><Link href="/">Contacto</Link></li>  
        </ul>
        </nav>
        <div className="menus_button">
        <Link href="login"><button className="button-login"><AccountCircle/> Iniciar Sesión</button></Link>
            <button className="button-whats"><WhatsApp/> Atencion personalizada</button>
        </div>
        <p className="title_icon">Síguenos en </p>
        <div className="menus_icons">
        <Facebook/>
        <Instagram/>
        <WhatsApp/>
        </div>
        </Grid>
            </DrawerStyled>
        </Grid>
     </Grid>  
    </header>  

    <Modalconta open={open} close={handleClose}/>  
    </NavBarStyled>
  )
}


const NavBarStyled = styled.div`
    margin: 0;
    padding: 0;
    box-sizing: border-box;

.container {
    max-width: 1300px;
    margin: auto;
    height: 84px;
    display: flex;
    align-items: center;
    width: 100%;
}
.header-height {
    overflow: hidden;
    position: fixed;
    width: 100%;
    top: 0;
    background-color: ${({ scrollBiggger }) =>
    scrollBiggger > 60 ? "#ffffff" : "transparent"};
    animation: 600ms ease-in-out 0s normal none 1 running fadeInDown;
    z-index: 1000;
    box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
}
.logo{
    margin:0;
}

.menus_list {    letter-spacing: 0.2em;
    display: flex;
    list-style: none;
}
.menus_list li{
    padding: 15px;
    font-weight: 500;
    color: #333366;
}
.menus_list li:hover{
    color:#6865ff;
}
.header-bottom-right{
    display: flex;
}
.icon-account {
    display: flex;
    cursor:pointer;
    padding: 12px;
    font-weight: 500;
    color: #333366;
    background: #eaf5fe;
    border-radius: 35px;
    width: 48%;
    justify-content: center;
}
.icon-account:hover {
    color:white;
    background: #333366;
}

.icon-login {
    display: flex;
    cursor:pointer;
    padding: 12px;
    font-weight: 500;
    color: #333366;
    border-radius: 35px;
    width: 48%;
    justify-content: center;
    margin-right: 5px;
}
.icon-login:hover {
    color:#6865ff;
}
.menu_mobil {
    display: none;

    svg{
        font-size: 36px;
    padding: 5px;
    border-radius: 50%;
    border: 1px solid #d9d9d9;
    }
}
@media (max-width: 600px) {
    .container{
        max-width:100%;
    }
    .menus{
        display: none;
    }
    .header-bottom-right{
    display:none;
    }
    .logo{
        margin:15px;
        display: flex;
    width: 50%;
    }
    .menu_mobil {
    display: flex;
    width: 50%;
    justify-content: end;
}
.header-height {
    position:relative;
    box-shadow:none;
}
}

`;

const DrawerStyled = styled(Drawer)`
min-width:70%;

.MuiPaper-root.MuiDrawer-paper.MuiDrawer-paperAnchorRight.MuiPaper-elevation16 {
    width: 70%;
    background:#333366;
    padding:5px;
}
.icon-close {
    display: flex;
    justify-content: end;
    margin: 10px;
    color:white;
}
.logo-drawer {
    display: flex;
    justify-content: center;

    img{
        width: 100px;
    }
}
.menus{
    margin-top: 10%;
    padding: 5%;
    letter-spacing: 0.2em;

}
.menus_list {
    list-style-type: none;
}
.menus_hasmiddle {
    padding: 15px 0;
    color: #fff;
    border-top: 1px solid hsla(0,0%,100%,.1);
    font-size: 14px;
    line-height: 1.5;
    font-weight: 700;
    text-transform: uppercase;
}
.menus_hasdrop {
    padding: 15px 0;
    color: #fff;
    font-size: 14px;
    line-height: 1.5;
    font-weight: 700;
    text-transform: uppercase;
}
.menus_hasdown {
    padding: 15px 0;
    color: #fff;
    border-top: 1px solid hsla(0,0%,100%,.1);
    font-size: 14px;
    line-height: 1.5;
    font-weight: 700;
    text-transform: uppercase;

}
.button-whats {
    width: 100%;
    display: flex;
    margin-top: 6%;
    margin-top: 15%;
    height: 35px;
    justify-content: center;
    align-items: center;
    background: #42d17f;
    border: none;
    color: white;
    font-weight: 900;
    border-radius: 10px;
    cursor: pointer;
}
.button-login{
    width: 100%;
    display: flex;
    margin-top: 6%;
    margin-top: 15%;
    height: 35px;
    justify-content: center;
    align-items: center;
    background: #600ee4;
    border: none;
    color: white;
    font-weight: 900;
    border-radius: 10px;
    cursor: pointer;
}
.title_icon {
    margin-top: 13px;
    text-align: center;
    color: white;
}
.menus_icons {
    display: flex;
    justify-content: center;
    margin-top: 10%;
    
    svg{
    background: #ffffff;
    width: 50px;
    height: 50px;
    margin: 5px;
    line-height: 50px;
    text-align: center;
    padding: 10px;
    border-radius: 5px;
    color: #6865ff;
    }
}
`;