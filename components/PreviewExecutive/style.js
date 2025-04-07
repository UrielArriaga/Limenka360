import styled from "styled-components";
import { colors } from "../../styles/global.styles";
import { Drawer, Grid, Paper } from "@material-ui/core";
export const PreviewExecutiveStyled = styled(Drawer)`
  .MuiPaper-root.MuiDrawer-paper.MuiDrawer-paperAnchorRight.MuiPaper-elevation16 {
    width: 50%;
    padding: 20px;
    @media (max-width: 600px) {
      width: 100%;
    }
    ::-webkit-scrollbar {
      width: 6px;
      height: 6px;
    }
    ::-webkit-scrollbar-track {
      -webkit-box-shadow: inset 0 0 6px rgb(166 164 164 / 20%);
    }
    ::-webkit-scrollbar-thumb {
      -webkit-box-shadow: inset 0 0 20px #585858;
    }
  }
  .preview {
    &__header {
      margin-bottom: 20px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      .title_preview {
        font-size: 18px;
        font-weight: 500;
      }
      .button_reload {
        text-transform: capitalize;
        background-color: ${colors.bgDirector};
        border: 1px solid ${colors.bgDirector};
        color: #fff;
        font-size: 12px;
        &:hover {
          background-color: #fff;
          color: ${colors.bgDirector};
        }
      }
    }
    &__body {
      width: 100%;
      .render_container {
        width: 100%;
        height: 50vh;
        overflow-x: hidden;
        overflow-y: auto;
        margin-top: 20px;
        ::-webkit-scrollbar {
          width: 6px;
          height: 6px;
        }
        ::-webkit-scrollbar-track {
          -webkit-box-shadow: inset 0 0 6px rgb(166 164 164 / 20%);
        }
        ::-webkit-scrollbar-thumb {
          -webkit-box-shadow: inset 0 0 20px #585858;
        }
      }
      .tabs {
        margin-top: 20px;
        width: 100%;
        padding-bottom: 10px;
        display: flex;
        overflow-y: hidden;
        overflow-x: auto;
        ::-webkit-scrollbar {
          width: 6px;
          height: 6px;
        }
        ::-webkit-scrollbar-track {
          -webkit-box-shadow: inset 0 0 6px rgb(166 164 164 / 20%);
        }
        ::-webkit-scrollbar-thumb {
          -webkit-box-shadow: inset 0 0 20px #585858;
        }
        .title {
          font-weight: 500;
          margin-right: 15px;
          padding-bottom: 5px;
          transition: 0.2s;
          border-bottom: 2px solid transparent;
          &:hover {
            cursor: pointer;
            border-bottom: 2px solid ${colors.bgDirector};
            color: ${colors.bgDirector};
          }
        }
        .selected {
          border-bottom: 2px solid ${colors.bgDirector};
          color: ${colors.bgDirector};
        }
        .count {
          color: rgb(41, 121, 255);
          font-size: 13px;
        }
      }
    }
    &__footer {
    }
  }
`;

export const InfoExecutiveStyle = styled(Grid)`
  width: 100%;
  height: 100%;
  margin-bottom: 40px;
  .media {
    display: flex;
    align-items: center;
    justify-content: center;
    .avatar {
      width: 70%;
      height: 70%;
    }
  }
  .data {
    .title {
      font-weight: 500;
      font-size: 12px;
      color: #909090;
    }
    .info {
      font-weight: 500;
      font-size: 15px;
      text-transform: capitalize;
    }
    .noneCapitalize {
      text-transform: none;
    }
    .chips {
      width: 100%;
      border: 1px solid;
    }
  }
`;

export const ProspectsStyle = styled.div`
  .title {
    font-size: 18px;
    font-weight: 500;
    color: ${colors.bgDirector};
    margin-bottom: 20px;
    .count {
      font-size: 13px;
    }
  }
  .prospect {
    width: 100%;
    display: flex;
    border-left: 4px solid ${colors.bgDirector};
    border-radius: 7px;
    padding: 5px;
    margin-bottom: 15px;

    .media {
      display: flex;
      justify-content: center;
      padding: 2px;
      margin-right: 10px;
    }
    .data {
      width: 90%;
      &__header {
        display: flex;
        align-items: center;
        .title {
          display: flex;
          flex-direction: column;
          font-size: 12px;
          font-weight: 500;
          color: ${colors.bgDirector};
          margin-right: 15px;
          .info {
            font-size: 15px;
            color: black;
          }
          .capitalize {
            text-transform: capitalize;
          }
        }
      }
    }
  }
  .pagination {
    margin-top: 10px;
    display: flex;
    align-items: center;
    justify-content: center;

    .before {
      margin-right: 10px;
    }
    .next {
      margin-left: 10px;
    }
  }
`;

export const OportunitiesStyle = styled.div`
  .title_header {
    font-weight: 500;
    margin-bottom: 10px;
    font-size: 18px;
    color: ${colors.bgDirector};
    top: 0;
    position: sticky;
    background-color: #fff;
    z-index: 300;
    .count {
      font-size: 13px;
    }
  }
  .oportunity {
    width: 100%;
    height: 60vh;
    overflow-x: hidden;
    overflow-y: auto;
    padding: 2px;
    ::-webkit-scrollbar {
      width: 6px;
      height: 6px;
    }
    ::-webkit-scrollbar-track {
      -webkit-box-shadow: inset 0 0 6px rgb(166 164 164 / 20%);
    }
    ::-webkit-scrollbar-thumb {
      -webkit-box-shadow: inset 0 0 20px #585858;
    }
  }
`;

export const Oportunity = styled(Paper)`
  width: 100%;
  padding: 10px;
  margin-bottom: 10px;
  .title {
    display: flex;
    align-items: center;
    color: ${colors.bgDirector};
    font-size: 12px;
    font-weight: 500;
    svg {
      font-size: 13px;
      margin-right: 2px;
    }
  }
  .data {
    font-weight: 500;
  }
  .capitalize {
    text-transform: capitalize;
  }
`;

export const SalesStyle = styled.div`
  .title_header {
    font-weight: 500;
    margin-bottom: 10px;
    font-size: 18px;
    color: ${colors.bgDirector};
    top: 0;
    position: sticky;
    background-color: #fff;
    z-index: 300;
    .count {
      font-size: 13px;
    }
  }
  .oportunity {
    width: 100%;
    height: 60vh;
    overflow-x: hidden;
    overflow-y: auto;
    padding: 2px;
    ::-webkit-scrollbar {
      width: 6px;
      height: 6px;
    }
    ::-webkit-scrollbar-track {
      -webkit-box-shadow: inset 0 0 6px rgb(166 164 164 / 20%);
    }
    ::-webkit-scrollbar-thumb {
      -webkit-box-shadow: inset 0 0 20px #585858;
    }
  }
`;

export const Sales = styled(Paper)`
  width: 100%;
  padding: 10px;
  margin-bottom: 10px;
  .title {
    display: flex;
    align-items: center;
    color: ${colors.bgDirector};
    font-size: 12px;
    font-weight: 500;
    svg {
      font-size: 13px;
      margin-right: 2px;
    }
  }
  .data {
    font-weight: 500;
  }
  .capitalize {
    text-transform: capitalize;
  }
`;
