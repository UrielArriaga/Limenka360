import styled from "styled-components";
import { device } from "../../../styles/global.styles";
export const HeroContainer = styled.div`
  margin-top: 84px;

  @media (max-width: 600px) {
  margin:0;

  .hero-righ {
    display: none;
}
.hero-rigth-shape {
    display: none;
} 
.hero-container {
    display: flex;
    flex-direction: column;
}
.feature-container {
    display: flex;
    flex-direction: column;
}
.fact-container {
    display: flex;
    flex-direction: column;
}
.fact-left {
    width: 100% !important;
}

.feature-right {
    display: none;
}
.hero-middle-container {
    padding: 5px;
    margin: 5px !important;
}
.hero-buttons {
    display: none;
}
.here-thumbail {
    width: 100%;
}
.hero-left-container {
    -webkit-mask-image: none !important
    }
    .tp-title {
    font-size: 50px !important;
}
.fact-service {
  width:100% !important;
  padding: 5% !important;
}
.fact-right {
    width: 100% !important;
}
.feature-left {
    width: 100% !important;
    background: #f7f9fb;
    margin-top: 25px;
}
.feture-follow {
    font-size: 30px !important;
}
.feture-title {
    padding: 10px !important;
}
  }
  @media (min-width: 768px) and (max-width: 1023px) {
    margin-top: 84px;
.hero-righ {
    top: 40% !important;
}
.right-tumbails {
  display: flex;
    justify-content: center;
    align-items: center;

    img{
      width: 100%;
    }
}
.hero-left {
    display: none;
}
.fact-service {
    padding-left: 15px !important;
}
}
@media (min-width: 1024px) and (max-width: 1600px) {
.here-thumbail {
    width: 100%;
    height: 100%;
}
.feature-right {
  padding-left:5% !important;
}
.fact-service {
  padding-left:15px !important;
}
.container-footer {
    padding: 20px;
}
}
  .hero-area {
    background: #eeeef5;
  }

  .hero-middle-container {
    display: flex;
    margin-top: 10%;
    margin-left: 25%;
    flex-direction: column;
  }

  .hero-title {
    font-weight: 300;
    font-size: 74px;
    line-height: 1.2;
    letter-spacing: -0.03em;
    overflow: hidden;
    color: #000229;
  }
  .text-purple {
    font-weight: 700;
    font-size: 74px;
    letter-spacing: -0.03em;
    color: #600ee4;
  }
  .text-black {
    font-weight: 700;
    font-size: 74px;
    letter-spacing: -0.03em;
    color: #000229;
  }
  .text-paraghaf {
    color: #5f6368;
    font-weight: 400;
    font-size: 18px;
    line-height: 24px;
    margin-top: 10px;
    padding: 5px;
  }
  .hero-buttons {
    margin-top: 5%;
  }
  .buttons {
    height: 60px;
    line-height: 60px;
    border-radius: 30px;
    display: inline-block;
    position: relative;
    z-index: 1;
    padding: 0px 35px;
    font-weight: 600;
    font-size: 16px;
    background: white;
    transition: 0.3s;
    transition-duration: 1s;
    overflow: hidden;
    border: none;
    cursor: pointer;
    color: #000229;
    
    &:hover {
      background: #600ee4;
    color: white;
    }
  }

  .hero-righ {
    position: absolute;
    top: 14%;
    left: -3%;
    animation: moving 9s linear infinite;

    @keyframes moving {
      0% {
        transform: translatey(0px);
      }

      25% {
        transform: translatex(20px);
      }
      50% {
        transform: translatey(-20px);
      }
      75% {
        transform: translatex(-20px);
      }

      100% {
        transform: translatey(0px);
      }
    }
  }
  .hero-rigth-shape {
    position: absolute;
    top: 27%;
    left: 3%;
    animation: movingleftright1 infinite 18s;

    @keyframes movingleftright1 {
      0% {
        -webkit-transform: translateX(0) translateY(0);
        transform: translateX(0) translateY(0);
      }

      40% {
        -webkit-transform: translateX(50px) translateY(-50px);
        transform: translateX(50px) translateY(-50px);
      }

      75% {
        -webkit-transform: translateX(200px);
        transform: translateX(200px);
      }

      100% {
        -webkit-transform: translateY(0) translateX(0);
        transform: translateY(0) translateX(0);
      }
    }
  }
  .hero-container {
    display: flex;
  }
  .hero-left-container {
    mask-image: url(hero-transparent.svg);
    -webkit-mask-image: url(hero-transparent.svg);
    height: 100%;
    width: 100%;
    mask-repeat: no-repeat;
    background-position: center center;
    overflow: hidden; 
  }

  .hero-video {
    max-width: 1300px;
    margin: auto;
  }

  .container-fluid {
    margin-top: 5%;
    display: flex;
    justify-content: center;
    flex-direction: column;
    margin-bottom: 5%;
  }

  .video-container {
    margin-top: 5%;
    display: flex;
    flex-direction: column;
    width: 100%;

    video {
      border-radius: 50px;
    }
  }

  .tp-title {
    color: #000229;
    font-weight: 500;
    font-size: 60px;
    line-height: 1.1;
    text-align: center;
    letter-spacing: -0.02em;
  }
.fact-container {
    display: flex;
  }
  .fact-left {
    width: 50%;
    background: #600ee4;
  }
  .fact-service {
    padding: 5%;
    display: flex;
    padding-left: 350px;
    padding-right: 60px;
    flex-direction: column;
    margin-top: 5%;
    margin-bottom: 5%;
    width: 83%;
  }
  .subtitle {
    font-weight: 500;
    font-size: 14px;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: white;
    padding-bottom: 15px;
    display: inline-block;
  }
  .subtitle-2 {
    font-weight: 200;
    font-size: 50px;
    line-height: 1.2;
    color: white;
    letter-spacing: -0.03em;

    span {
      font-weight: 700;
    }
  }
  .text-sub {
    font-weight: 400;
    font-size: 17px;
    line-height: 26px;
    color: white;
    margin-top: 16px;
  }
  .btn-contact {
    display: flex;
    cursor: pointer;
    padding: 12px;
    font-size: 18px;
    font-weight: 700;
    color: #333366;
    background: #ffce5a;
    border-radius: 35px;
    -webkit-box-pack: center;
    -webkit-justify-content: center;
    -ms-flex-pack: center;
    justify-content: center;
    margin-top: 8%;
    border: none;
    width: 100%;
    &:hover {
      background: white;
    color: #600ee4;
    }
  }
  .fact-right {
    display: flex;
    width: 50%;
    flex-wrap: wrap;
  }

  .fact-box {
    flex-basis: 50%;
    height: 50%;
    }

  .fact-box-container {
    background-color: #f7f9fb;
    height: 100%;
    padding: 10%;

    &:hover {
     background-color: white;
     transform: translateY(-13px);
     transition: 0.3s;
     box-shadow: 0px 16px 40px rgba(32, 33, 36, 0.1);
}
    }

  .fact-box-container-white {
    padding: 10%;
    height: 100%;
    &:hover {
    background: #fdd4e4;
    transform: translateY(-13px);
     transition: 0.3s;
     box-shadow: 0px 16px 40px rgba(32, 33, 36, 0.1);
}
}
.fact-box-icons {
    background: #fdd4e4;
    width: 60px;
    height: 60px;
    justify-content: center;
    display: flex;
    align-items: center;
    border-radius: 10px;

    svg{
      font-size:40px;
      color:#639cff;
    }
}
.paragrhap-services {
    margin-top: 10px;

    h3{
      font-weight: 500;
    font-size: 26px;
    line-height: 33px;
    color: #000;
    padding-bottom: 5px;
    }
    p{
    color: #595B62;
    }

}
.feature-area {
    max-width: 1300px;
    margin: auto;
    margin-top: 5%;
    margin-bottom: 5%;
}
.feature-container {
    display: flex;
    width: 100%;
}
.feature-left {
    width: 50%;
}
.feture-title {
    display: flex;
    flex-direction: column;
    padding-left: 10%;
}
.feture-follow {
    font-weight: 700;
    font-size: 58px;
    line-height: 1.1;
    margin-bottom: 0;

    span{
    font-family: "DM Serif Display";
    font-style: italic;
    font-weight: 400;
    }
}
.paragraph-feature {
    font-weight: 400;
    font-size: 18px;
    line-height: 28px;
    color: #5f6368;
    margin-top: 16px;
}
.benefices-feature {
    display: flex;
    margin-top: 5%;
    flex-direction: column;
}
.benefices-list-yellow {
  position: relative;
    padding: 8px 12px;
    margin-bottom: 17px;
    display: flex;
    font-weight: 600;
    font-size: 16px;
    color: #ffab0a;
    width: 40%;


    svg{
      background: #FFB545;
    color: white;
    border-radius: 18px;
    margin-right: 5px;
    }
}
.benefices-list-yellow:after{
  position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    content: "";
    background: linear-gradient(90.27deg, #FFB545 2.18%, rgba(255, 181, 69, 0) 99.77%);
    opacity: 0.2;
    border-radius: 30px;
}
.benefices-list-blue {
  position: relative;
    padding: 8px 12px;
    margin-bottom: 17px;
    display: flex;
    font-weight: 600;
    font-size: 16px;
    color: #625FFB;
    width: 70%;


    svg{
      background: #625FFB;
    color: white;
    border-radius: 18px;
    margin-right: 5px;
    }
}
.benefices-list-blue:after{
  position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    content: "";
    background: linear-gradient(90.27deg, #625FFB 2.18%, rgba(98, 95, 251, 0) 99.77%);
    opacity: 0.2;
    border-radius: 30px;
}
.benefices-list-green {
  position: relative;
    padding: 8px 12px;
    margin-bottom: 17px;
    display: flex;
    font-weight: 600;
    font-size: 16px;
    color: #65CB7B;
    width: 56%;


    svg{
      background: #65CB7B;
    color: white;
    border-radius: 18px;
    margin-right: 5px;
    }
}
.benefices-list-green:after{
  position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    content: "";
    background: linear-gradient(90.27deg, #65CB7B 2.18%, rgba(101, 203, 123, 0) 99.77%);
    opacity: 0.2;
    border-radius: 30px;
}
.feature-right {
  width: 50%;
    padding-left: 15%;
}

.sub-img {
    position: absolute;
    animation: tpupdown 1s infinite alternate;
    margin-top: -9%;
    @keyframes tpupdown {
  0% {
    -webkit-transform: translateY(0);
    -moz-transform: translateY(0);
    -ms-transform: translateY(0);
    -o-transform: translateY(0);
    transform: translateY(0);
  }
  100% {
    -webkit-transform: translateY(-20px);
    -moz-transform: translateY(-20px);
    -ms-transform: translateY(-20px);
    -o-transform: translateY(-20px);
    transform: translateY(-20px);
  }
}
}


`;
