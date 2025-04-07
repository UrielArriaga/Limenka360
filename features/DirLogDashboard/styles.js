import styled from "styled-components";
import { zIndexHeader } from "../../styles/global.styles";

export const DirLogDashboardStyled = styled.div`
  display: flex;
  flex-direction: column;
  overflow: hidden;
  height:calc(100vh - 100px);
  .header {
    margin-bottom: 20px;
    display: flex;
    justify-content: space-between;
    position: sticky;
    top: 0;
    z-index: ${zIndexHeader};
    padding: 20px 10px;
  }
  .main {
    flex: 1;
    overflow-y: auto;
    display: flex;
    overflow-x: hidden;
  }


  .resume {
    /* margin-top: 20px; */

    /* border-radius: 10px; */
    /* padding: 20px; */
    /* width: 600px; */

    border: 1px solid #eeeeee;
    &__header {
      background-color: #f9f9fb;
      padding: 10px;
      font-weight: 600;
      font-size: 18px;
    }

    &__content {
      display: flex;
      justify-content: space-between;
      padding: 10px;
      border-bottom: 1px solid #eeeeee;

      &--item {
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        width: 100%;
        padding: 10px;

        /* border: 1px solid #eeeeee; */
        /* border-radius: 10px; */

        :nth-child(1) {
          border-right: 2px solid #eeeeee;
        }

        :nth-child(2) {
          border-right: 2px solid #eeeeee;
        }
        .count {
          font-size: 2rem;
          font-weight: 400;
        }

        .red {
          color: red;
        }

        .green {
          color: green;
        }

        .blue {
          color: blue;
        }

        .label {
          font-size: 1rem;
          font-weight: 500;
        }

        &:hover {
          background-color: #f9f9fb;
        }
      }
    }
  }

  .resumeinventory {
    /* width: 600px; */
    border: 1px solid #eeeeee;
    &__header {
      background-color: #f9f9fb;
      padding: 10px;
      font-weight: 600;
    }

    &__content {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      padding: 10px;
      border-bottom: 1px solid #eeeeee;

      &--item {
        display: flex;
        align-items: center;
        justify-content: space-between;

        /* flex-direction: column; */
        width: 100%;
        /* padding: 10px; */

        /* border: 1px solid #eeeeee; */
        /* border-radius: 10px; */

        :nth-child(1) {
          border-bottom: 2px solid #eeeeee;
        }

        .count {
          font-size: 2rem;
          font-weight: 400;
        }

        .red {
          color: red;
        }

        .green {
          color: green;
        }

        .blue {
          color: blue;
        }

        .label {
          font-size: 0.8rem;
          font-weight: 500;
        }

        &:hover {
          background-color: #f9f9fb;
        }
      }
    }
  }

  .resumeproducts {
    border: 1px solid #eeeeee;
    &__header {
      background-color: #f9f9fb;
      padding: 10px;
      font-weight: 600;
      font-size: 18px;
    }

    &__content {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      padding: 10px;
      border-bottom: 1px solid #eeeeee;

      &__col {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        padding: 10px;

        .row {
          display: flex;
          justify-content: space-between;
          width: 100%;
          padding: 10px;

          span {
            font-weight: 600;
          }
        }
      }
    }
  }

  .moreoutputs {
    border: 1px solid #eeeeee;
    &__header {
      background-color: #f9f9fb;
      padding: 10px;
      font-weight: 600;
      font-size: 18px;
    }

    &__content {
      min-height: 200px;
      display: flex;
      justify-content: center;
      align-items: center;

      p {
        font-size: 1.5rem;
        font-weight: 600;
        color: #3f51b5;
      }
    }

    &__gra{
      padding: 20px;
    }
  }
`;
