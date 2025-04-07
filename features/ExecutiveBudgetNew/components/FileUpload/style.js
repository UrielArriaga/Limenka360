import styled from "styled-components";
import { Box } from "@material-ui/core";

export const UploadContainer = styled.div`
  border: 2px dashed #007bff;
  border-radius: 10px;
  padding: 20px;
  text-align: center;
  cursor: pointer;
  transition: border 0.3s;

  &:hover {
    border-color: #0056b3;
  }

  &.dragover {
    border-color: #0056b3;
  }
`;

export const PreviewContainer = styled.div`
  margin-top: 20px;
  display: flex;
  flex-wrap: wrap;
`;

export const PreviewImage = styled.img`
  width: 100px;
  height: 100px;
  object-fit: cover;
  margin: 5px;
`;

export const Text = styled.p`
  font-size: 14px;
  margin-top: 15px;
  margin-bottom: 10px;
  color: #565656;
  font-weight: 600;
  font-weight: bold;
`;

export const PreviewBox = styled(Box)`
  width: 300px; /* Ajusta el ancho según tus necesidades */
  display: flex;
  align-items: center;
  border: 1px solid #ccc;
  margin: 5px;
  border-radius: 5px;
  padding: 5px; /* Espaciado interno */
  position: relative; /* Agregar posición relativa */
  overflow: hidden; /* Evitar que el contenido desborde el borde */
`;