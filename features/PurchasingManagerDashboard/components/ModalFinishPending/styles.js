import styled from "styled-components";

export const StylesDirectModalEditEvent = styled.div`
/* background-color: #193364; */
/* padding: 10px; */
/* width: 700px; */
max-width: 900px;
height: auto;
display: flex;
height: 320px;
/* overflow-y: auto; */
h2{
    background-color: #193364;
    color: white;
    padding: 10px;
    font-weight: 600;
    font-size: 18px;
}
.contentForm{
    width: 700px;
}
.content_inputs{
    margin-top: 10px;
    padding: 10px;
    width: 100%;
}
.name_title {
    color:rgb(29, 57, 103);
    font-weight: 600;
    margin-top: 5px;
    .errorRequeried{
        color: #b80c3d;
        font-size: 13px;
    }
}
.input{
    background-color: white;
    width: 100%;
    /* border: 1px solid #cdcdcd; */
    padding: 5px;
    border-radius: 5px;
}

.btnActions{
    width: 100%;
    display: flex;
    justify-content: flex-end;
    gap: 12px;
    position: absolute;
    margin-left: 50%;
    margin-top: 200px;
    .button{
        text-transform: capitalize;
    }
    .finish{
        background-color: #193364;
        color: white;
    }
    .cancel{
        color: #193364;
        border: 1px solid #193364;
    }
}

`