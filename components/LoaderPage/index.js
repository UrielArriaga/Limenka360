import React from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { userSelector } from "../../redux/slices/userSlice";

export default function LoaderPage() {
  const { isFetching, id_user, isSuccess, groupId, isError, errorMessage, isLogged_User, roleId, company } =
    useSelector(userSelector);

  return (
    <Loader>
      <p
        onClick={() => {
          console.log(isLogged_User);
          console.log(isFetching);
        }}
      >
        cargando...
      </p>
    </Loader>
  );
}

const Loader = styled.div`
  height: 100vh;
  width: 100%;
  background: #2193b0; /* fallback for old browsers */
  background: -webkit-linear-gradient(to right, #6dd5ed, #2193b0); /* Chrome 10-25, Safari 5.1-6 */
  background: linear-gradient(
    to right,
    #6dd5ed,
    #2193b0
  ); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  position: absolute;
`;
