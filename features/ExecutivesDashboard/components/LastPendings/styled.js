import styled from "styled-components";

export const LastPendingsStyled = styled.div`
  width: 90%;
  box-shadow: rgba(9, 30, 66, 0.25) 0px 4px 8px -2px, rgba(9, 30, 66, 0.08) 0px 0px 0px 1px;
  padding: 10px;


  h4{
    
    margin-bottom: 10px;
  }
  .item-pending {
    margin-bottom: 10px;
    padding: 10px;
    background-color: #f7f9f8;
    border-radius: 5px;
    display: flex;
    align-items: center;
  }

  .item-pending-0 {
    background-color: #39B8DF;
    color: #fff;
  }

  .col-1 {
    margin-right: 10px;
  }

  .col-2 {
    width: 100%;
    .date {
      text-align: right;
      font-size: 12px;
    }
  }
`;
