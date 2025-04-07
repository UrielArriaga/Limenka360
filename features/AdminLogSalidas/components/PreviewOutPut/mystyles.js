import styled, { keyframes } from "styled-components";

export const PreviewOutStyled = styled.div`
    width: 100%;
    border: 1px solid #ccc;
    overflow-y: hidden;
    padding: 16px;
    background: #f5f7fa;

  .headerprview {
    background: white;
    border-radius: 8px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px;
    margin-bottom: 20px;
}
    .content-exit {
    border-radius: 9px;
    height: 100vh;
    padding: 50px;
    min-height: 500px;
    background: white;
}
.concep {
    display: flex;
    flex-direction: column;

   .text {
    font-weight: bold;
    margin-bottom: 6px;
}
}
.actions{
display: flex;
    height: 50px;
    background-color: #eeeeee;
}
.headerday {
display: flex;
padding:10px;
justify-content: space-between;

}
.title{
font-weight:bold;
margin-top: 7px;
}
.tablecontainer {
    margin-top: 20px;
    padding:10px;
} 
.data_order {
padding:10px;
margin-top: 25px;
    background: #f5f7fa;
    border-radius: 10px;
}
.info_addrees {
    margin-top:2px;
    display: flex;
    color: #757575;
    margin-bottom: 4px;
    font-size: 13px;
}
    .table_products{
    margin-top:20px;
    }
    .total {
    display: flex;
    justify-content: end;
    font-size: 13px;
    font-weight: bold;
    color: #034d6f;
}
`;
  
export const bounce = keyframes`
  0%, 80%, 100% {
    transform: scale(0);
  }
  40% {
    transform: scale(1);
  }
`;

export const LoaderWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding-top: 40px;

  border: 1px solid #ccc;
`;

export const Dot = styled.div`
  width: 10px;
  height: 10px;
  margin: 0 5px;
  background-color: #333;
  border-radius: 50%;
  display: inline-block;
  animation: ${bounce} 1.4s infinite ease-in-out both;

  &:nth-child(1) {
    animation-delay: -0.32s;
  }
  &:nth-child(2) {
    animation-delay: -0.16s;
  }
`;
