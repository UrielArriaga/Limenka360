import styled from "styled-components";

export const StylesDirectModalGaranties = styled.div`
background-color: #faf6f6;
/* padding: 10px; */
width: 500px;
height: auto;
h3{
    background-color: #193364;
    color: white;
    padding: 10px;
}
/* overflow-y: auto; */
.content_inputs{
    margin-top: 10px;
    padding: 10px;
}
.name_title {
    color:rgb(29, 57, 103);
    font-weight: 600;
    margin-top: 5px;
}
.input{
    background-color: white;
    width: 100%;
    border: 1px solid #cdcdcd;
    padding: 5px;
    border-radius: 5px;
    margin-bottom: 2%;
}
.inputSelect{
    background-color: white;
    width: 100%;
    border: 1px solid #cdcdcd;
    border-radius: 5px;
    margin-bottom: 2%;
}
.button{
    text-transform: capitalize;
}

.acept{
    border:1px solid #193364;
    color: #193364;
    :hover{
        border:1px solid #193364;
        color: #193364;
    }
}
.cancel{
    background-color: #193364;
    color: #faf6f6;
    :hover{
        background-color: #193364;
        color: #faf6f6;
    }
}

`