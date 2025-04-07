import styled from "styled-components";
import {device,colors} from "../../styles/global.styles";

export const AdminStyled = styled.div`

.main{
    width:100%;
    background: #F3F3F8;

    .main-cointainer {
    padding: 30px;

    .header {
        margin-top:40px;
        margin-bottom: 30px;
        @media ${device.md} {
    display: flex;
    width: 100%;
    margin-bottom: 30px;
        }
}
.cards-history {
    display: flex;
}
.header-cointainer {
    display: flex;
}

}
.container-stadistic{

    @media ${device.md} {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    box-sizing: border-box;
    justify-content: space-around;
    margin-bottom: 40px;

}
}
.oportunities {
    width:100%;
    background: white;
    @media ${device.md} {
   
    width:  64.3%;
    background: white;
    
    }
}
.title-stadistic {
    border-bottom: 1px solid #eaedf1;
    margin-bottom: 11px;

    h3{
        color: #5e5873;
    padding: 15px;
    margin: 0;
    font-family: inherit;
    font-weight: 700;
    line-height: 1.1;
    font-size: 0.875rem;
    }
}
.grap-prospect {
    padding: 15px;
}
.sales-stadistic {
    width: 100%;
    background: white;
    
    @media ${device.md} {
    background: white;
    width:31%;

    } 
}
.text-sales {
    width: 100%;

    h3{
    text-align: center;
    }
    h2{
        text-align: center;   
    }
}
}
.salesejucutive {
    display: flex;
    min-height: 70px;
    position: relative;
    
    svg{
        color:#337dff;
    }
}

.salesejucutive:before {
    border-left: 1px solid #e0e9f1;
    bottom: 0;
    content: "";
    left: 23px;
    position: absolute;
    top: 45px;
}
.salesejucutive:last-child {
    border-left: 1px solid #fff;
}
.img-user {
    align-items: center;
    border: 2px solid #337dff;
    display: inline-flex;
    height: 45px;
    justify-content: center;
    width: 45px;
    border-radius: 50%!important;
}

.card-header {
    width: 100%;
    background: white;
    margin-top: 10px;
    @media ${device.md} {
    background: white;
    width: 31%;
    }
.sellers {
    padding: 15px;
}
.info-detail {
    display: flex;
    margin-bottom: 5px;

    img {
    border-radius: 100%;
    height: 40px;
     }
     .info-sellers{
        width: 50%;

        .name {
    font-size: 0.875rem;
    line-height: 1.429;
    letter-spacing: 0.15px;
    color: rgba(76, 78, 100, 0.87);
    font-weight: 600;
}

.iconMail {
    color: green;
    width: 20px;
    height: 15px;
}
.iconPhone {
    color: #f50;
    width: 20px;
    height: 15px;
}
.email {
    font-weight: 400;
    font-size: 0.75rem;
    line-height: 1.25;
    letter-spacing: 0.4px;
    color: rgba(76, 78, 100, 0.68);
}
.group {
    color: #8f8fb1!important;
}

    }
    .amount {
        display: flex;
    justify-content: center;
    width: 17%;
    justify-items: center;
    align-items: center;
    font-size: 14px;
}
.phase {
    display:none;
    @media ${device.md} {
    display: flex;
    align-items: center;
    margin-left: 34px;
}
}
.certeza {
    display: flex;
    align-items: center;
    margin-left: 16px;

    .oportunitishort{
        color:red;
    }
    .oportunitismedium{
        color:#ff8d00;
    }
    .oportunitishigh{
        color:green;
    }
}
}
}
.container-grafics {
    margin-top:10px;
    @media ${device.md} {
    display: flex;
    justify-content: space-around;
    width: 100%;
    }

 .pendientes {
    background: white;
    width: 100%;
    @media ${device.md} {
    width: 64.3%;
    background: white;
    
}
}
.comission {
    width: 100%;
    background: white;
    @media ${device.md} {
    background: white;
    width: 31%;
    }
}
}
.info-origen {
    width: 28%;
    margin: 7px;
    display: flex;

    .name-origin{
        margin-bottom: 3px;
        font-weight: 700;
        color: #666666;
    }
}
.porcent {
    width: 100%;
    padding-top: 20px;
}
.text-progress {
    margin-left: 8px;
    font-size: 14px;
    font-weight: 700;
    margin-top: 4px;
}

.ejecutive {
    display: flex;
    width: 20%;
    justify-content: center;
    align-items: center;
    color: #5b53e6;
    font-weight: 700;
    font-size: 12px;
}
.type {
    color: #50CD89;
    background-color: #E8FFF3;
    width: 28%;
    height: 5%;
    margin-top: 4%;
    border-radius: 5px;
    text-align: center;
    
}
.container-ejecutives{
    padding: 15px;
}

.ctr_load {
    display: flex;
    flex-direction: column;
    justify-content: center;

    .ctr_load__img {
        padding: 15px;
    align-items: center;
    display: flex;
    justify-content: center;

    img{
        width:80%;
        
    }
}
.loader{
    text-align: center;
    font-size: 15px;
    font-weight: bold;
}
}

.footer-sales{
    margin-top:15px;
}


.filters {
    width: 100%;
    @media ${device.md} {
    width: 84%;
}
}
.container_filters {
    display: flex;
    justify-content: end;
    margin-bottom:15px;


    .filtersday {
    display: flex;
    color: ${colors.primaryColor};
    font-size: 14px;
    font-weight: 700;
}
.icon-filter {
    display: flex;
}
.dateend {
    margin: 0 15px 0px 15px;
}
}
`;
