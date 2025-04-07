import styled from "styled-components";
import {PhoneInTalk,Comment,Facebook,Instagram,YouTube} from '@material-ui/icons';
import Link from 'next/link';
export default function Footer(){
    return(
        <FooterStyled>
        <footer>
         <div className="container-footer">
         <div className="row">
        <div className="foter-colums">
         <div className="footer-logo">
         <img src="logo-color.png"/> 
         <p>Somos una empresa 100% Mexicana con bastante experiencia para llevar el proceso desde la prospección, hasta la venta y postventa.</p>  
         </div> 
    
        </div>
        <div className="foter-colums">
            <div className="footer-tittle">
            <h3>Acerca de</h3>
            <ul>
             <li><Link href="#">Nosotros</Link></li> 
             <li><Link href="#">Contacto</Link> </li>
             <li><Link href="#">Aviso de privacidad</Link></li>
             <li><Link href="#">Ayuda</Link></li>
            </ul>
            </div>
        </div>
        <div className="foter-colums"> 
        <div className="footer-tittle">
        <h3>Contacto</h3>
        <div className="footer-contact">
          <div className="phone-contact"><PhoneInTalk/> 806(000)8899</div> 
          <div className="phone-contact"><Comment/> contacto@limenka360.com</div> 
         </div>  
        </div>
        </div>
        <div className="foter-colums">
        <div className="footer-tittle">
            <h3>Síguenos </h3>
            <div className="icons-social">
            <Link href="#"><Facebook/></Link>
            <Link href="#"><Instagram/></Link>
            <Link href="#"><YouTube/></Link>
            </div>
            </div>
        </div>
         </div>
         </div>   
         <div className="copyright">
         Copyright © 2023 Limenka 360. Todos los derechos reservados.
         </div>
        </footer>
        </FooterStyled>
    )
}

const FooterStyled = styled.div`
background: #eeeef5;

@media (max-width: 600px) {
  margin:0;
  .row {
    display: block !important;
}
.container-footer {
    padding: 5%;
}
}
.container-footer {
    max-width: 1300px;
    margin: auto;
    padding-top: 3%;
    padding-bottom: 3%;
}
.copyright {
    border-top: 1px solid #DFDFEA;
    display: flex;
    justify-content: center;
    padding-top: 15px;
    color: #5f6368;
}
.row {
    display: flex;
}
.foter-colums {
    flex-basis: 50%;
}
.footer-logo {
    display: flex;
    flex-direction: column;
    img{
        width: 50%;
        margin-bottom: 15px;
    }
    p{
    font-weight: 400;
    font-size: 16px;
    line-height: 24px;
    color: #595B62;
    padding-bottom: 10px;
    }
}
.phone-contact {
    font-weight: 400;
    line-height: 16px;
    color: #4F5055;
    display: flex;
    align-items: center;
    margin-bottom: 10px;
    svg{
        margin-right: 7px;
        &:hover {
        color: #600ee4;
        }
    }
}
.footer-tittle {
    padding: 5px;

h3{
    color: #202124;
    font-size: 22px;
    font-weight: 600;
    margin-bottom: 9px;
}
ul {
    list-style: none;

li{
    margin-bottom: 10px;
    color: #595B62;

    &:hover {
        color: #600ee4;
        font-weight:700;
        margin-left:5px;
    }
}
}
}
.icons-social {
    display: flex;

    svg{
    color: #595B62;
    margin-right: 11px;
    font-size: 26px;

    &:hover {
        color: #600ee4;
    }
    }
}
`;