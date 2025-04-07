import styled from "styled-components";

export const Contenedor = styled.div`
  display: grid;
  grid-template-columns: 50% 50%;
  height: 100vh;
  background-size: 100% 100%;
  background-image: radial-gradient(circle at 50% -20.71%, #65ffff 0, #6ddfff 25%, #6cb4d8 50%, #648ba4 75%, #566875 100%);
  font-size: 16px;

  .login{
    height: 100%;
    padding-top: 150px;
    padding-left: 25%;
    padding-right: 30%;
    background-color: rgba(255, 255, 255, .3);
    box-shadow: 0 0 1rem 0 rgba(0, 0, 0, .2);
    backdrop-filter: blur(5px);
  }

  .portada{
    height: 100%;
    p{ 
      margin-left: 40px;
      font-size: 6vh;
      color: black;
    }
  }

  .pass{
    display: grid;
    grid-template-columns: auto 42px;
    background-color: white;
    padding: 1px;
    width: 309px;
    border-radius: 5px;
    input{
      width: auto;
    }
    button{
      margin-left: 2px;
      width: 40px;
      background-color: white;
      color: black;
      padding-top: 3px;
      border-width: 0px;
    }
  }

  .title{
    font-size: 35px;
  }

  input{
    height: 46px;
    width: 309px;
    padding-left: 15px;
    border-width: 0px;
    outline: none;
    border-radius: 5px;
  }

  .buttonIngresar{
    height: 46px;
    width: 309px;
    border-width: 0px;
    border-radius: 5px;
    background-color: rgb(13,166,310);
    color: white;
    :hover{
      background-color: #007bff;
    }
  }

  a{
    color: #007bff;
  }

  @media (max-width: 1024px) {
    grid-template-columns: 100%;
    .portada{
      display: none;
    }
  }

  @media (max-width: 550px){
    .login{
      padding-left: 15%;
    }
  }

  @media (max-width: 360px){
    .login{
      padding-left: 6%;
    }
  }

  @media (max-height: 700px){
    .login{
      padding-top: 20%;
    }
  }
`;