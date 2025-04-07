import styled from "styled-components";
import { colors } from "../../../../styles/global.styles";

export const FilesEditStyle = styled.div`
  height: 100%;
  display: flex;
  .title_files {
    font-size: 17px;
    font-weight: 500;
    margin-bottom: 20px;
  }
  .files {
    width: 50%;
    height: 100%;
    overflow: auto;
    .file {
      margin-bottom: 20px;
      border: 1px solid transparent;
      border-radius: 5px;
      transition: 0.2s;
      padding: 5px;
      &:hover {
        border: 1px solid #d4d4d4;
        cursor: pointer;
      }
      .title_file {
        margin-bottom: 10px;
        font-weight: 500;
        color: ${colors.primaryColorDark};
      }
      .file_style {
        display: flex;
        align-items: center;
        .title_dataFile {
          font-size: 14px;
          font-weight: 500;
        }
        .pdf {
          margin-right: 5px;
          color: red;
        }
      }
    }
  }
  .preview {
    width: 50%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    /* padding: 10px; */
    .title_preview {
      font-size: 14px;
      color: gray;
    }
  }
`;
