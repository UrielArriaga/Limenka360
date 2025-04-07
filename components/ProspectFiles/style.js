import styled from "styled-components";
import { colors } from "../../styles/global.styles";
export const ProspectFilesStyle = styled.div`
  .files_container {
    display: grid;
    grid-template-columns: repeat(2, 250px);
    overflow: auto;
    ::-webkit-scrollbar {
      width: 4px;
      height: 4px;
    }
    ::-webkit-scrollbar-track {
      -webkit-box-shadow: inset 0 0 6px rgb(166 164 164 / 20%);
    }
    ::-webkit-scrollbar-thumb {
      -webkit-box-shadow: inset 0 0 20px #0c203b;
    }
    .card_file {
      border: 1px solid #e8e8e8;
      border-bottom: 4px solid ${colors.primaryColorDark};
      border-radius: 8px;
      margin: 5px;
      padding: 5px;
      display: flex;
      flex-direction: column;
      &__options {
        display: flex;
        justify-content: flex-end;
        width: 100%;
        margin-bottom: -15px;
      }
      &__icon {
      }
      &__data {
        .name_file {
          width: 200px;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
          font-size: 15px;
          font-weight: 500;
        }
        .name_type {
          font-size: 13px;
          font-weight: 500;
          color: ${colors.primaryColorDark};
        }
        .icon {
          font-size: 25px;
        }
      }
    }
  }
`;
