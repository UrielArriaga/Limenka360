import styled from "styled-components";
import {device,colors} from "../../styles/global.styles";

export const RecepcionStyled = styled.div`
width: 100%;
    height: 100%;
    display: -webkit-box;
    display: -webkit-flex;
    display: -ms-flexbox;
    display: flex;
    overflow: hidden;
    background: url(https://limenka.sfo3.digitaloceanspaces.com/img/limenka360.png);

.main{
    width: calc(100% - 0px);
    height: calc(100vh - 60px);
    overflow-y: auto;
    margin-top: 60px;

    .ctr_prospects{
        width: calc(100% - 90px);
    margin: auto;
    margin-top: 20px;
    margin-bottom: 20px;
    min-height: calc(100% - 100px);
    padding: 25px 20px;
    background: #fff;
    border-radius: 10px;
    box-shadow: rgb(149 157 165 / 20%) 0px 8px 24px;

    }
}
`;