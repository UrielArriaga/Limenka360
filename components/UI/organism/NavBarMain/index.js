import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { userSelector } from "../../../../redux/slices/userSlice";
import { RedirectPage } from "../../../../utils";
import { Avatar } from "@material-ui/core";
import { URL_SPACE } from "../../../../services/api";

const NavBarMain = ({ black }) => {
  const router = useRouter();
  const handleHome = () => {
    router.push("/");
  };

  const { isLogged_User, email, roleId, grouplogo } = useSelector(userSelector);

  return (
    <NavStyled black={black}>
      <div className="logo" onClick={handleHome}>
        <img src="/LOGOLIMENKA360_NAVBAR_COLOR.png" alt="" className="logo_big" />
        <img src="/LOGOLIMENKA360_NAVBAR_COLOR_small.png" alt="" className="logo_small" />
      </div>

      {isLogged_User ? (
        <div
          className="items"
          onClick={() => {
            RedirectPage(roleId, router);
          }}
        >
          <div className="items__item"></div>
          <div className="items__item">
            <p>Mi dashboard ({email})</p>
          </div>
          <div className="items__item">
            <Avatar src={grouplogo ? URL_SPACE + grouplogo : ""} />
          </div>
        </div>
      ) : (
        <div className="items">
          <Link href="/login">
            <div className="items__item">
              <p>Login</p>
            </div>
          </Link>

          <Link href="/login">
            <div className="items__item--getstarted">Empezar</div>
          </Link>

          <Link href="/">
            <div className="items__item">
              <p>Acerca de</p>
            </div>
          </Link>
        </div>
      )}
    </NavStyled>
  );
};

export default NavBarMain;

const NavStyled = styled.div`
  color: white;
  max-width: 1300px;
  margin: auto;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;

  .logo {
    color: #fff;
    font-weight: bold;
    letter-spacing: 12px;
    padding: 16px;

    &_small {
      margin-top: 4px;
      width: 50px;
      @media (min-width: 570px) {
        display: none;
      }
    }
    &_big {
      margin-top: 12px;
      width: 200px;
      @media (max-width: 570px) {
        display: none;
      }
    }
    :hover {
      cursor: pointer;
    }
  }

  .items {
    display: flex;
    align-items: center;
    &__item {
      color: ${props => (props.black ? "#fff" : "black")};
      margin-right: 30px;
      display: flex;
      align-items: center;
      &:hover {
        color: #3f7bff;
        transition: color 0.3s ease-in-out;
        cursor: pointer;
      }
    }

    &__item--getstarted {
      margin-right: 30px;
      display: flex;
      align-items: center;
      background-color: #3f7bff;
      padding: 10px 20px;
      border-radius: 100px;
      color: #fff;
      &:hover {
        color: #fff;
        transition: color 0.3s ease-in-out;
        cursor: pointer;
      }
    }
  }
`;
