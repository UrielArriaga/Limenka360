import React from "react";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import styled from "styled-components";
import { useSelector } from "react-redux";
import { userSelector } from "../../../../redux/slices/userSlice";
import { WbSunny } from "@material-ui/icons";

export default function Greeting() {
  const { userData } = useSelector(userSelector);
  const hoy = new Date();
  const fechaFormateada = format(hoy, "dd 'de' MMMM yyyy", { locale: es });

  return (
    <Container>
      <div className="content_greeting">
        <h2>Hoy, {fechaFormateada}</h2>
        <h3>Buen día, <b>{userData?.name}</b> <WbSunny style={{color:"#f2c04d",fontSize:"22px"}}/></h3>
      </div>
    </Container>
  );
}

export const Container = styled.div`
  .content_greeting {
    padding: 10px;
  }
  h1{
 color: #404040;
  }
  h2{
 color: #6b6b6b;
  }
  b{
    text-transform: capitalize;
  }

`;
