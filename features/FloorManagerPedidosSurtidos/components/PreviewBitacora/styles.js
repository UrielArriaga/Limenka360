import { Drawer } from "@material-ui/core";
import styled from "styled-components";

export const BitacoraPreviewStyled = styled(Drawer)`
  .MuiPaper-root.MuiDrawer-paper.MuiDrawer-paperAnchorRight.MuiPaper-elevation16 {
    width: 50%;
    padding: 16px;
    box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.1);
    box-shadow: rgba(17, 12, 46, 0.15) 0px 48px 100px 0px;
    @media (max-width: 600px) {
      width: 100%;
    }
  }
  .content_titles {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .preview {
    width: 99%;
    height: 85vh;
  }
  .content_button {
    width: 95%;
    display: flex;
    justify-content: flex-end;
    margin-top: 10px;
    .button {
      text-transform: capitalize;
      background-color: #548cd4;
      color: white;
    }
  }
  .container {
    width: 90%;
    margin: auto;
    height: 85vh;
    background-size: 100% 100%;
    background-repeat: no-repeat;
    background-position: center;
    padding: 20px;
    background-image: url("https://crm-desarrollo.sfo3.digitaloceanspaces.com/bitacora.jpeg");
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  }

  .sections {
    width: 100%;
    float: left;
  }

  .content_title {
    float: left;
    width: 100%;
    height: 25px;
    text-align: center;
    margin-top: 70px;
    margin-bottom: 40px;
  }

  .title {
    height: 0px;
    font-size: 16px;
    color: black;
    font-weight: 700;
  }

  .content_img {
    float: left;
    width: 30%;
    overflow: hidden;
    margin-bottom: 5px;
    /* border: 1px solid #ddd; */
    padding: 10px;
    box-sizing: border-box;
  }

  .logo {
    float: left;
    width: 130px;
    height: auto;
    margin-right: 20px;
  }

  .divider_folios_date {
    border-bottom: 1.5px solid black;
  }

  table {
    width: 100%;
    /* margin-left: auto;
      margin-right: auto; */
    margin-top: 10px;
    border-collapse: collapse;
    text-align: center;
  }

  table,
  th,
  td {
    border: 1px solid black;
    font-size: 9px;
  }

  th {
    /* padding: 4px; */
    background-color: #548cd4;
    color: white;
  }

  td {
    border: 1px solid #203663;
    font-size: 7px;
    text-align: center;
    /* Establece un ancho mínimo para las celdas */
    height: 16px;
  }

  thead {
    background: #bdd7ee;
    color: #fff;
  }

  .table {
    margin-top: -1px;
  }

  .thead {
  }

  .tr {
    padding: 10px;
  }

  .th {
    width: 25%;
    color: black;
    background-color: #fff;
  }

  .tbody {
    background-color: #fff;
  }

  .tbody_tr {
    height: 40px;
  }

  .tbody_td {
    height: 13px;
  }

  .thead_th_cant {
    width: 8%;
  }

  .thead_th_code {
    width: 7%;
  }

  .thead_th_desc {
    width: 18.1%;
  }

  .thead_th_ubi {
    width: 7%;
  }

  .thead_th_num {
    width: 11.1%;
  }

  .thead_th_folio {
    width: 11.1%;
  }

  .thead_th_nameal {
    width: 11.1%;
  }

  .thead_th_date {
    width: 7.1%;
  }

  .thead_th_firm {
    width: 11.1%;
  }
`;
