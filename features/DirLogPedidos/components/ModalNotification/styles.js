import styled from "styled-components";

export const modalStyles = {
  modalBox: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    boxShadow: 24,
    p: 2,
    borderRadius: 1,
  },
  modalTitle: {
    mt: 2,
  },
  inputField: {
    width: "100%",
    padding: "10px",
    marginTop: "10px",
    borderRadius: "4px",
    border: "1px solid #ccc",
    fontSize: "16px",
  },
  buttonContainer: {
    display: "flex",
    justifyContent: "flex-end",
    gap: 2,
    mt: 2,
  },
  cancelButton: {
    backgroundColor: "grey",
    padding: "5px 10px",
    fontSize: "12px",
    minWidth: "auto",
    textTransform: "none",
  },
  submitButton: {
    padding: "5px 10px",
    fontSize: "12px",
    minWidth: "auto",
    textTransform: "none",
  },
};

export const ModalStyled = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 400;
  background-color: white;
  width: 700px;
  border-radius: 8px;
  /* height: 600px; */
  overflow-y: 150px;
  .title_modal {
    padding: 4px;
    background-color: #405189;
    border-radius: 8px 8px 0px 0px;
    display: flex;
    justify-content: space-between;
    .title {
      color: white;
    }
    .icon {
      cursor: pointer;
      color: white;
    }
  }
  .content_table {
    padding: 8px;
  }
  .table {
    width: 100%;
    border-collapse: collapse;
    font-size: 12px;
  }

  .tableheader {
    display: flex;
    background-color: #dee2f5;
    color: grey;
    border-top-left-radius: 9px;
    border-top-right-radius: 9px;
    padding: 10px;
    font-weight: bold;
    position: sticky;
    justify-content: space-between;
    text-align: center;
    .code {
      width: 10%;
    }
    .name {
      width: 30%;
    }
    .quantity {
      width: 20%;
    }
    .stock {
      width: 20%;
    }
    .input {
      width: 30%;
    }
  }
  .body_table {
    height: 380px;
    overflow-y: auto;
    .list_table {
      width: 100%;
      /* height: 40px; */
      padding: 4px;
      display: flex;
      text-align: center;
      font-weight: 700;
      .code {
        color: cornflowerblue;
        width: 10%;
      }
      .name {
        width: 30%;
        
      }
      .quantity {
        width: 20%;
      }
      .stock {
        width: 20%;
      }
      .input {
        padding: 3px;
        border-radius: 4px;
        border: 1px solid grey;
        width: 30%;
        height: 30px;
      }
    }
    .even-row {
      background-color: white;
    }
    .odd-row {
      background-color: #e5e5e5;
    }
  }
  .button_send {
    width: 100%;
    display: flex;
    justify-content: flex-end;
    .button {
      background-color: #405189;
      color: white;
      text-transform: capitalize;
    }
  }
`;
