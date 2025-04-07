const modalStyles = {
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

export default modalStyles;
