import styled from "styled-components";

export const StyledCompany = styled.div`
  backdrop-filter: blur(5px);
  margin: 20px;
  margin-top: 40px;
  width: 100%;

  .containerAvatar {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    flex-direction: column;
    text-align: center;
  }

  .MuiAvatar-root {
    width: 100px;
    height: 100px;
    transition: box-shadow 0.5s;

    :hover {
      cursor: pointer;
      box-shadow: 0 0 10px 5px rgba(119, 108, 235, 0.8);
    }
  }

  .nameCompany {
    margin-top: 15px;
    font-size: 25px;
  }

  .containerDataCompany {
    display: grid;
    grid-template-columns: auto;
    border: 1px solid #e0e0e0;
    border-radius: 10px;
    gap: 10px;
    margin: 40px;
    padding: 20px;
  }

  .companyInfo {
    display: flex;
  }

  .label {
    margin: 5px;
    font-size: 17px;
    color: grey;
  }

  .value {
    margin: 5px;
    font-size: 17px;
  }
`;

export const StyledDialogPhoto = styled.div`
  width: 350px;
  padding: 10px;

  p {
    font-size: 18px;
    color: grey;
  }

  .title {
    display: grid;
    grid-template-columns: auto auto auto;
    margin-bottom: 10px;
    align-items: center;
    p {
      color: #000;
    }
  }

  .avatar {
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 30px;
  }

  .MuiAvatar-root {
    width: 200px;
    height: 200px;
    transition: box-shadow 0.5s;
  }

  .containerButtons {
    display: grid;
    grid-template-columns: auto auto;
    grid-gap: 10px;
  }

  .close {
    :hover {
      cursor: pointer;
    }
  }

  @keyframes pulse {
    0% {
      box-shadow: 0 0 10px 5px rgba(119, 108, 235, 0.8);
    }
    50% {
      box-shadow: 0 0 20px 15px rgba(119, 108, 235, 0.8);
    }
    100% {
      box-shadow: 0 0 10px 5px rgba(119, 108, 235, 0.8);
    }
  }

  .pulseShadow {
    animation: pulse 2s infinite;
  }
`;
