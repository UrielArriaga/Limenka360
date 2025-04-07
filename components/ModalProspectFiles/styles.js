import styled from "styled-components";

export const FilesStyled = styled.div`
  .container {
    &__head {
      display: flex;
      align-items: center;
      .iconfolder {
        width: 30px;
        height: 30px;
        padding: 5px;
        margin-right: 5px;
        background: #dce1f6;
        color: #0c203b;
        border-radius: 50%;
      }
      .iconreload {
        font-size: 19px;
        color: #103c82;
        transition: 0.3s;
        cursor: pointer;
        /* &:hover {
          rotate: 180deg;
        } */
      }
      .title {
        font-size: 18px;
        font-weight: 500;
        margin-right: 10px;
      }
    }
    &__body {
      margin: 20px 0px;
      width: 100%;
      .ctr_table {
        border-spacing: 0;
        margin: auto;
        width: 100%;

        &__head {
          position: sticky;
          top: 0;
          z-index: 50;
          &__tr {
            background-color: #dce1f6;
            padding: 5px 10px;
            height: 40px;
            .checkbox {
              position: sticky;
              left: 0;
              display: flex;
              flex-direction: row;
              align-items: center;
              padding: 3px 5px;
              background-color: #405189;
              color: #fff;
              height: inherit;
              .MuiFormControlLabel-root {
                margin-right: 5px;
              }
              @media (max-width: 600px) {
                min-width: 100px;
                position: relative;
              }
            }
            .title {
              text-transform: capitalize;
              padding: 0 10px;
              .ctr_title {
                display: flex;
                align-items: center;
                width: max-content;
                /* min-width: 150px; */
              }
            }
          }
        }
        &__body {
          .row {
            background: #fff;
            font-weight: bold;
            color: #2c2c2c;
            transition: all 0.3s ease;
            min-height: 50px;

            .fixed {
              position: sticky;
              left: 0;
              background: #fff;
              transition: all 0.3s ease;
              @media (max-width: 600px) {
                position: relative;
              }
            }
            .data {
              font-size: 14px;
              padding: 0 10px;
              .ctr_td {
                display: flex;
                align-items: center;
                min-height: 42px;
                .showmore {
                  cursor: pointer;
                  color: blue;
                }

                .iconfolder {
                  cursor: pointer;
                  width: 25px;
                  height: 25px;
                  padding: 5px;
                  background: #103c82;
                  color: #fff;
                  border-radius: 50%;
                }
              }
              .file {
                width: 600px;
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
              }
              .capitalize {
                text-transform: capitalize;
              }
              .select {
                cursor: pointer;
              }
            }
            &:hover {
              background: #d8dbe6;
              opacity: 0.8;
              color: #000;
              .fixed {
                background: #d8dbe6;
              }
            }
          }
          tr:nth-child(even) {
            background: #fff;
          }
          tr:nth-child(odd) {
            background: #f3f3f3;
          }
        }
      }
    }
    &__footer {
      .addfile {
        color: #fff;
        background-color: #3f51b5;
        text-transform: capitalize;
        padding: 6px 16px;
      }
    }
  }
`;
