import React from "react";

import styled from "styled-components";

export const DepAttendantNewRouteStyled = styled.div`
  position: relative;

  * {
    /* border: 1px solid red; */
  }
  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 20px;
    /* margin-bottom: 20px; */
    h4 {
      font-size: 20px;
      font-weight: bold;
      margin-right: 20px;
    }

    .actions {
      display: flex;

      &__item {
        display: flex;
        align-items: center;
        padding: 0 10px;
        cursor: pointer;
        color: #616161;

        .icon {
          font-size: 15px;
        }

        .text {
          font-size: 13px;
          margin-left: 5px;
        }

        .button {
          background-color: #039be5;
          color: #fff;
          border: 1px solid #ccc;
          border-radius: 5px;
        }

        .buttondisabled {
          background-color: #ccc;
          color: #fff;
          border: 1px solid #ccc;
          border-radius: 5px;
        }
      }
    }
  }

  .floatingbutton {
    position: fixed;
    bottom: 60px;
    left: 220px;
  }
`;
