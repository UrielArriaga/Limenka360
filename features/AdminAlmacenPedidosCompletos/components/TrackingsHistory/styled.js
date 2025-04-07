import styled from "styled-components";
export const TrackinsHistoryStyled = styled.div`
  margin-top: 40px;
  h3 {
    font-size: 15px;
    font-weight: bold;
    color: #000;
    margin-bottom: 1rem;
  }

  .containertext {
    width: 100%;
    /* height: 100px; */
    border: 1px solid #ccc;
    /* padding: 10px; */
    border-radius: 5px;
    /* background-color: red; */
  }
.load-more-button {
    width: 23%;
    margin-top: 20px;
    background: #ffd740;
    border: none;
    padding: 5px;
    border-radius: 11px;
    display: flex;
    justify-content: center;
    align-items: center;
    color: white;
    font-weight: bold;
    cursor: pointer;

    svg{
    margin-right: 5px;
    }
}
  .headercontainertracking {
    background-color: #f3f4f8;
    padding: 10px;
    p {
      font-size: 12px;
      color: #616161;
    }
  }

  .subtitle {
    margin-bottom: 10px;
  }

  .textareatrackings {
    outline: none;
    border: none;
    width: 100%;
    /* height: 20px; */
    min-height: 20px;
    resize: none;
    font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
    padding: 10px;
  }
  .containertext .line {
    width: 98%;
    height: 1px;
    margin: auto;
    background-color: #ccc;
    margin-top: 10px;
  }

  .actionscontainertracking {
    padding: 10px;
  }
  .containertext button {
    /* background-color: #ccc;
    color: #fff;
    cursor: not-allowed;
    padding: 5px 10px; */
  }

  .containerlisttrackings .activebutton {
    margin-top: 10px;
    padding: 5px 10px;
    border: none;
    background-color: #000;
    color: #fff;
    border-radius: 5px;
    cursor: pointer;
  }
  h5 {
    margin-top: 20px;
    margin-bottom: 20px;
  }

  .actionscontainertracking .active {
    background-color: #000;
    color: #fff;
    cursor: pointer;
    padding: 5px 10px;
    border: none;
  }

  .actionscontainertracking .disablebutton {
    background-color: #ccc;
    color: #fff;
    cursor: not-allowed;
    padding: 5px 10px;
    border: none;
  }

  .containerlisttrackings {
  }

  .itemtracking {
    display: flex;
    margin-bottom: 10px;

    .columnicon {
      width: 20px;
      display: flex;
      /* align-items: center; */
      justify-content: center;
      margin-right: 20px;

      color: #ffd740;

      position: relative;

      .iconsvg {
        z-index: 100;
      }
      .line {
        position: absolute;
        top: 14px;
        width: 2px;
        height: 90%;
        background-color: #e0e0e0;
        /* margin: 0 10px; */
      }
    }

    .columninfo {
      &__header {
        color: #9e9e9e;
        margin-bottom: 10px;
        /* background-color: #f3f4f8; */
        /* padding: 10px 20px; */
        p {
          font-size: 13px;
        }
      }
      &__description {
        background-color: #f9f9fb;
        padding: 10px 20px;
        p {
          font-size: 13px;
        }
      }
    }
  }
`;
