import styled from "styled-components";

export const ExecutivesStyled = styled.div`
  /* * {
    margin: 0;
    padding: 0;
  } */

  .logo {
    img {
      width: 200px;
    }
  }

  .navbar {
    display: flex;
    align-items: center;
    justify-content: space-between;
    background-color: #222528;
    /* 17385B */
    height: 80px;
    padding: 0 40px;
    /* background-color: red; */
  }

  .logo {
    display: flex;
    flex: 1;
  }
  .navbar-wrapper {
    /* background-color: blue; */
    /* max-width: 1300px; */
    /* margin: auto; */
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 10px;

    flex: 2;

    .pages {
      display: flex;

      &__item {
        margin-right: 20px;
        display: flex;
        align-items: center;

        .icon {
          margin-right: 10px;
          color: #39b8df;
        }

        p {
          color: #e0e0e0;
          font-size: 12px;
        }
      }

      .submenu-container {
        position: relative;
        cursor: pointer;

        .icon {
          margin-right: 10px;
          color: #39b8df;
        }

        p {
          color: #e0e0e0;
          font-size: 13px;
        }

        .submenu {
          display: none;
          position: absolute;
          width: 200px;
          background-color: #fff;
          padding: 10px;
          border-radius: 5px;
          top: 100%;
          left: 0;
          z-index: 1;

          .submenu__item {
            margin-top: 10px;
            color: #e0e0e0;
            font-size: 13px;
          }
        }

        &:hover .submenu {
          display: block;
        }
      }
    }
  }
  .account {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    flex: 1;

    .account-avatar {
      margin-right: 10px;
    }

    .account-fullname {
      display: flex;
      flex-direction: column;
      /* align-items: flex-end; */
      /* margin-left: 10px; */

      p {
        color: #e0e0e0;
        font-size: 13px;
        margin: 0;
      }
    }
  }

  .goalsprogress {
    display: flex;
    align-items: center;
    justify-content: space-between;
    background-color: #222528;
    /* 17385B */
    height: 80px;
    padding: 0 40px;
    /* background-color: red; */
  }

  .main {
    padding: 10px;
    /* height: 100vh; */
  }
`;
