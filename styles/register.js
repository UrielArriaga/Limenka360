import styled from "styled-components";

export const Contenedor = styled.div`
  display: grid;
  grid-template-columns:100%;
  height: 100vh;
  background-size: 100% 100%;
  background-image: url('mountb.jpg');
  font-size: 17px;

  .register{
    height: 100%;
    padding-top: 100px;
    padding-left: 20%;
    background-color: rgba(0, 0, 0, .1);
    box-shadow: 0 0 1rem 0 rgba(0, 0, 0, .2);
    backdrop-filter: blur(5px);
  }

  .title{
    font-size: 30px;
  }

  .conteinerForm{
    display: grid;
    grid-template-columns:50% 50%;
  }

  input{
    height: 46px;
    width: 309px;
    padding-left: 15px;
    border-width: 0px;
    outline: none;
    border-radius: 5px;
  }

  select{
    height: 46px;
    width: 309px;
    padding-left: 15px;
    border-width: 0px;
    outline: none;
    border-radius: 5px;
  }

  .buttonRegistrar{
    height: 46px;
    width: 309px;
    border-width: 0px;
    border-radius: 5px;
    background-color: rgb(13,166,310);
    color: white;
    margin-top: 50px;
    margin-bottom: 50px;
    :hover{
      background-color: #007bff;
    }
  }

  @media (max-width: 1024px) {
    .conteinerForm{
      grid-template-columns: 100%;
    }
    .register{
      padding-top: 20px;
    }
  }

  @media (max-width: 470px) {
    .register{
      padding-left: 5%;
      padding-top: 0px;
    }
  }

`;