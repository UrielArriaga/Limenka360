import { useState } from 'react'
import { AssignmentInd, EnhancedEncryption, Loyalty, Check } from '@material-ui/icons';
import { HeroContainer } from "./styles";
import Modalconta from "../ModalContact"
export default function HeroArea() {

  const [open, setOpen] = useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <HeroContainer>
      <div className="hero-area">
        <div className="hero-righ">
          <img src="hero-circle.png" />
        </div>
        <div className="hero-rigth-shape">
          <img src="hero-circle-yellow.png" />
        </div>
        <div className="hero-container">
          <div className="hero-middle">
            <div className="hero-middle-container">
              <h3 className="hero-title">Aumenta tus ventas mejora tu <span className='text-purple'>negocio,<br /> </span><span className='text-black'>gestiona</span> con limenka 360</h3>
              <p className="text-paraghaf">Una solución para tener el control y organización para un trabajo óptimo para su negocio.</p>
              <div className="hero-buttons">
                <button className="buttons" onClick={handleClickOpen}>Solicita una demostración</button>
              </div>
            </div>
          </div>
          <div className="hero-left">
            <div className="hero-left-container">
              <img className="here-thumbail" src="hero-shape.png" />
            </div>
          </div>
        </div>
      </div>
      <Modalconta open={open} close={handleClose} />
      <div className="hero-video">
        <div className="container-fluid">
          <h4 className="tp-title">Bienvenido a Limenka <br /> La mejor plataforma para la gestión de la prospección</h4>
          <div className="video-container">
            <video
              className="play-video"
              id="myVideo"
              autoPlay
              loop
              playsInline
              muted
              alt="All the devices"
              src="https://weblearnbd.net/tphtml/videos/softec/softec-video.mp4"
            >
            </video>
          </div>
        </div>
      </div>
      <div className="fact-area">
        <div className="fact-container">
          <div className="fact-left">
            <div className="fact-service">
              <span className="subtitle">LO QUE OFRECEMOS</span>
              <h3 className="subtitle-2">Obtenga una visión  clara de su <span>negocio.</span></h3>
              <p className="text-sub">Accede a la información que necesitas en tiempo real que te ayudara en la toma de decisiones.</p>
              <button className="btn-contact">Contactanos</button>
            </div>
          </div>
          <div className="fact-right">
            <div className="fact-box">
              <div className="fact-box-container">
                <div className="fact-box-icons">
                  <AssignmentInd />
                </div>
                <div className="paragrhap-services">
                  <h3>Planificación en tiempo real</h3>
                  <p>Seguimiento de la prospección en tiempo real</p>
                </div>
              </div>
            </div>
            <div className="fact-box">
              <div className="fact-box-container-white">
                <div className="fact-box-icons">
                  <EnhancedEncryption />
                </div>
                <div className="paragrhap-services">
                  <h3>Control Total</h3>
                  <p>Manten toda la información en un solo lugar</p>
                </div>
              </div>
            </div>
            <div className="fact-box">
              <div className="fact-box-container-white">
                <div className="fact-box-icons">
                  <Loyalty />
                </div>
                <div className="paragrhap-services">
                  <h3>Convierte más clientes</h3>
                  <p>Mejora la conversión de contactos a clientes.</p>
                </div>
              </div>
            </div>
            <div className="fact-box">
              <div className="fact-box-container">
                <div className="fact-box-icons">
                  <AssignmentInd />
                </div>
                <div className="paragrhap-services">
                  <h3>Mejora la relación</h3>
                  <p>Con tus contactos, con atención personalizada.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="feature-area">
        <div className="feature-container">
          <div className="feature-left">
            <div className="feture-title">
              <h3 className="feture-follow">Seguimiento y <span>análisis de ventas</span> en tiempo real</h3>
              <p className="paragraph-feature">Centralice y simplifique los pagos, y obtenga información detallada sobre sus clientes.</p>
              <div className="benefices-feature">
                <div className="benefices-list-yellow"><Check />Soporte 24/7</div>
                <div className="benefices-list-green"><Check />Facil y seguro de configurar</div>
                <div className="benefices-list-blue"><Check />Capacitaciones personalizada por expertos</div>
              </div>
            </div>
          </div>
          <div className="feature-right">
            <div className="right-tumbails">
              <img src="homelimenka.png" />
              <div className="sub-img">
                <img src="sales.png" />
              </div>
            </div>

          </div>
        </div>

      </div>
    </HeroContainer>

  )
}

