import styled from "styled-components";

export const ContainerStyles = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 16px;
`;

export const StyledCard = styled.div`
  padding: 5px;
  background-color: white;
  width: 24%;
  border-radius: 2px;
  /* border-bottom: 3px solid; */
  /* min-width: 150px; */
  box-shadow: rgba(17, 17, 26, 0.1) 0px 0px 16px;
  /* border: 0.5px solid #cdcdcd; */
  .title {
    width: 70%;
    b {
      color: grey;
    }
  }
  .content_icon {
    width: 30%;
    padding: 10px;
    text-align: center;
    text-align: center;
    .d_icon {
      align-items: center;
      width: 50px;
      height: 50px;
      margin: auto;
      padding: 8px;
      background-color: #e0e0e0;
      border-radius: 150px;
    }

    /* align-items: center; */
    .icon {
      width: 35px;
      height: 35px;
    }
  }
  .content_des {
    justify-content: flex-end;
    display: flex;
    width: 100%;
  }
`;
