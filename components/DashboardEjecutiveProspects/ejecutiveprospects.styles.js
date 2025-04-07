import styled from "styled-components";

export const ProspectsEjecutive = styled.div`
  background-color: #eaeaea;
  padding: 10px;
  border-radius: 8px;
  .filters_global {
    display: flex;
    align-items: center;
    justify-content: space-between;
    background: #fff;
    border-radius: 8px;
    padding: 10px;
    .title {
      display: flex;
      align-items: center;
      p {
        font-size: 16px;
        font-weight: 500;
      }
      svg {
        width: 30px;
        height: 30px;
        padding: 5px;
        font-size: 30px;
        margin-right: 10px;
        border-radius: 50%;
        background: #103c82;
        color: #fff;
      }
    }
    .filter {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      p {
        font-size: 12px;
        font-weight: bold;
        letter-spacing: 0.03em;
      }
      .ctr_inputs {
        display: flex;
        .ctr_input {
          display: flex;
          flex-direction: column;
          margin: 5px 10px;
          label {
            font-size: 12px;
            color: #103c82;
            font-weight: 500;
          }
          input {
            padding: 2px 10px;
            border-radius: 4px;
            border: 1px solid #8a8a8a;
          }
          .error {
            font-size: 12px;
            color: red;
          }
        }
        .search {
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          margin: 5px 0;
          padding: 0 5px;
          cursor: pointer;
          label {
            font-size: 12px;
            color: #103c82;
            font-weight: 500;
          }
          svg {
            color: #103c82;
            font-size: 20px;
          }
          &:hover {
            border-radius: 8px;
            background: #f3f3f3;
          }
        }
      }
    }
  }
  .origin_prospect {
    background: #fff;
    border-radius: 8px;
    padding: 10px;
    height: 100%;
    .title {
      font-size: 16px;
      font-weight: bold;
      margin-right: 10px;
    }
    .graph {
      height: 100%;
      display: flex;
      align-items: center;
    }
  }
  .graph_entity {
    background: #fff;
    padding: 10px;
    border-radius: 8px;
    .title {
      font-size: 16px;
      font-weight: bold;
      margin-right: 10px;
    }
  }
`;
