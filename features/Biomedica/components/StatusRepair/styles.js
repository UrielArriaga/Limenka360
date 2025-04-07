import styled from "styled-components";

export const DialogContainer = styled.div`
 display: flex;
  flex-direction: column;
  overflow: hidden;
  transition: all 0.6s ease;
  width:400px;

  .headerDialog {
    display: flex;
    background: #0c203b;
    margin-bottom: 15px;
    padding: 10px 20px;

  }
  .title {
    color: white;
    font-weight: bold;
    font-size: 18px;
}
    .Dialogbody {
    padding: 0 20px 20px 20px;
}
    .btn {
    display: flex;
    justify-content: center;
    margin-top: 15px;
}
    .btn_cancel {
    background: black;
    margin-right: 10px;
    color: white;
    text-transform: capitalize;
}
    .btn_save {
    background: #0c203b;
    color: white;
    text-transform: capitalize;
}
    }
`;
