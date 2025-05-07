import styled, { css, keyframes } from "styled-components";

export const colors = {
  primaryColor: "#3aade6",
  iconsSideColor: "#eeeeee",
  primaryColorDark: "#407aff",
  secondaryColor: "#efefef",
  secondaryDark: "#9c48fa",
  thirdColor: "#ee5e27",
  bg_overlay: "rgba(25, 103, 210,0.9)",
  convert: "rgb(0, 150, 136,0.8)",
  second: "#23c0e9",
  bacgroundColor: "#f5f5f5f5",
  navbarprofile: "#ffff",
  navbarprofileicons: "#0288d1",
  navbarprofiletext: "#000",
  navbarcompany: "#ffff",
  navbarcompanyicons: "#0288d1",
  navbarcompanytext: "#000",
  danger: "#d32f2f",
  iconColor: "#03a9f4",
  bgDirector: "#776CEB",
};

export const ContainerSuggestions = styled.div`
  /* flex-direction: row; */
  /* margin-left: 10px;
  margin-top: 20px; */
  width: 100%;
`;
export const sharedProps = css`
  padding: 20px 15px 10px 15px;
`;

export const customWidth = css`
  width: ${({ isOpen }) =>
    isOpen ? "calc(100% - 250px)" : "calc(100% - 75px)"};
  overflow: scroll;
  /* background: url("https://limenka.sfo3.digitaloceanspaces.com/img/limenka360.png"); */
  /* padding-top: 60px; */
`;

export const BackgroundColor = css`
  background-color: ${(props) => (props.bg ? props.bg : colors.secondaryColor)};
`;

export const customWidthNavBar = css`
  transition: all 0.3s ease-in-out;
  /* width: ${({ sideBar }) => (sideBar ? "calc(100% - 250px)" : "100%")}; */
  width: ${(props) =>
    // if primary
    props.sideBar && props.isOpen
      ? "calc(100% - 250px)"
      : // else if success
      props.sideBar && !props.isOpen
      ? "calc(100% - 70px)"
      : "calc(100%)"};

  /* padding-top: 60px; */
`;

export const limiter = css`
  max-width: 1300px;
  width: 100%;
  margin: auto;
`;

export const wrapper = css`
  max-width: 1300px;
  width: 100%;
  margin: auto;
`;

export const centerXY = css`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const centerX = css`
  display: flex;
  justify-content: center;
`;

export const centerY = css`
  display: flex;
  align-items: center;
`;

// * Share perfiel css

export const breakpoints = {
  xs: 576,
  sm: 768,
  md: 992,
  lg: 1200,
  xl: 1440,
  xxl: 1800,
};

export const size = {
  xs: `${breakpoints.xs}px`,
  sm: `${breakpoints.sm}px`,
  md: `${breakpoints.md}px`,
  lg: `${breakpoints.lg}px`,
  xl: `${breakpoints.xl}px`,
  xxl: `${breakpoints.xxl}px`,
};

export const device = {
  xs: `(min-width: ${size.xs})`,
  sm: `(min-width: ${size.sm})`,
  md: `(min-width: ${size.md})`,
  lg: `(min-width: ${size.lg})`,
  xl: `(min-width: ${size.xl})`,
  xxl: `(min-width: ${size.xxl})`,
};

export const titleStyle = css`
  .title {
    font-size: 1.5rem;
    color: ${colors.secondaryColor};
    font-weight: bold;
  }
`;

export const InputStyle = css`
  .inputcontainer {
    .singleinput {
      margin-bottom: 20px;
      .label {
        margin-bottom: 20px;
        color: #757575;
      }

      .input {
        width: 100%;
        height: 50px;
        border-radius: 8px;
        border: none;
        border: 1px solid #d2d4d4;
        padding-left: 10px;
        &:focus {
          outline: 1px solid ${colors.secondaryColor};
        }
      }

      .inputmiddle {
        width: 50%;
        height: 50px;
        border-radius: 8px;
        border: none;
        border: 1px solid #d2d4d4;
        padding-left: 10px;
        &:focus {
          outline: 1px solid ${colors.secondaryColor};
        }
      }

      textarea {
        width: 100%;
        border-radius: 8px;
        border: none;
        padding-top: 10px;
        border: 1px solid #d2d4d4;
        padding-left: 10px;
        line-height: 2;
        &:focus {
          outline: 1px solid ${colors.secondaryColor};
        }
      }
    }
    .singleinput .gender {
      display: flex;
      height: 50px;
      align-items: center;
      border-radius: 8px;
      padding: 0 10px;
    }
    .radio {
      position: relative;
      width: 15px;
      height: 15px;
      margin: 0 0.3em 0 0;
      cursor: pointer;
    }
    .singleinput .gender span {
      margin-right: 8px;
    }

    .buttonaction {
      /* width: 250px; */
      outline: none;
      border: none;
      height: 40px;
      padding: 10px 20px 10px 20px;
      border-radius: 5px;
      font-size: 0.8rem;
      margin-top: 10px;

      background-color: ${colors.thirdColor};
      color: #ffff;
    }

    .buttoncancel {
      /* width: 250px; */
      outline: none;
      border: none;
      height: 40px;
      padding: 10px 20px 10px 20px;
      border-radius: 5px;
      font-size: 0.8rem;
      margin-top: 10px;
      color: #fc236a;
    }
  }
`;

export const StyleExecutiveGroup = styled.div`
  display: flex;
  flex-direction: column;

  .dataExecutive {
    display: flex;
    .fullname {
      font-weight: 500;
      font-size: 13px;
      text-transform: capitalize;
      margin-right: 5px;
    }
    .email {
      font-weight: 500;
      font-size: 13px;
      color: #ababab;
    }
  }
  .groupname {
    font-size: 13px;

    .name {
      color: #405189;
      text-transform: capitalize;
      font-weight: 500;
    }
  }
`;

export const StyleGroup = styled.div`
  .groupname {
    text-transform: capitalize;
    font-size: 15px;
  }
`;

export const RequiredData = styled.span`
  &&::after {
    content: attr(value);
  }
  color: red;
  font-size: 13px;
`;

// * Share perfiel css

export const styleScrollReactSelect = (base) => {
  return {
    ...base,
    "::-webkit-scrollbar": {
      width: "4px",
      height: "0px",
    },
    "::-webkit-scrollbar-track": {
      background: "#f1f1f1",
    },
    "::-webkit-scrollbar-thumb": {
      background: "#888",
    },
    "::-webkit-scrollbar-thumb:hover": {
      background: "#555",
    },
  };
};

export const zIndexNavbar = 5;
export const zIndexHeader = 4;
export const zIndexMain = 3;
//export const zIndexSearch = 2;
