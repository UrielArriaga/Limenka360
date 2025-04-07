
import styled from "styled-components";
import { Drawer } from "@material-ui/core";
export const NewProductStyled = styled(Drawer)`

.container {
    width: 600px;
}
    .headerDialog {
    display: flex;
    background: #0c203b;
    margin-bottom: 15px;
    padding: 10px 20px;
}
    .title {
    color: white;
    font-weight: bold;
}
    .dataform {
    padding: 10px;
    display: flex;
}
    .ctr_inputs{
    display:flex;
    &__label {
        font-size: 12px;
        font-weight: bold;
        margin-bottom: 5px;
      }
      &__input {
        padding: 2px;
        background-clip: padding-box;
        border: 1px solid rgb(206, 212, 218);
        border-radius: 0.25rem;
        display: block;
        font-size: 0.8125rem;
        font-weight: 400;
        line-height: 1.5;
        transition: border-color 0.15s ease-in-out 0s, box-shadow 0.15s ease-in-out 0s;
        width: 100%;
        height: 38px;
        &:focus {
          outline: none;
          border: none;
          transition: all 0.3s ease;

          border: 1.5px solid #0d0d0d;
        }
      }
    }
    .resons {
    display: flex;
    flex-direction: column;
    margin-bottom: 10px;
}
    .btn {
    display: flex;
    justify-content: center;
    align-content: space-between;
    flex-wrap: wrap;
    margin-top:10px;
}
    .btn_cancel {
    margin-right: 20px;
    text-transform: capitalize;
    background: #0d0d0d;
    color: white;
}
    .btn_save {
    background: #0c203b;
    color: white;
    text-transform: capitalize;
}
    .title{
    color:#000;
    font-size:12px;
    }
    .subtitle{
    font-size:10px;
    color: #878787;
    font-weight:bold;
    }
    .code{
    color:#0035ff;
    }
`;