const componentStyle = {
  modalContainer: {
    color: "darkblue"
  },
  modalHeaderBlock: {
    display: "flex",
    alignItems: "center",
    marginBottom: "2rem",
  },
  modalHeaderBlockNext: {
    marginRight: "1rem",
    display: "flex"
  },
  modalHeaderBlockNextSpan: {
    textAlign: "center"
  },
  modalBodyBlock: {
    margin: "0 1rem",
    padding: "0.2rem 0",
    display: "flex",
    alignItems: "center",
    borderBottom: "1px solid grey",
  },
  modalBodyBlockNextDiv: {
    marginRight: "1rem"
  },
  modalBodyCreateSpan: {
    color: "rgb(103, 171, 212)",
  },
  modalBodyBlockDisabled: {
    color: "grey",
  },
  modalHeaderBlockProfile: {
    marginLeft: "1rem",
  },
  modalBodyCancelSpan: {
    color: "red",
  },
  successModal: {
    width: "250px",
    border: "2px solid rgb(22, 170, 22)",
    borderRadius: "0.3rem",
  },
  successModalTitle: {
    fontSize: "2rem",
    textAlign: "center",
    background: "rgb(22, 170, 22)",
    borderRadius: "0.2rem 0.2rem 0 0",
  },
  successModalBody: {
    display: "flex",
    height: "200px",
    color:" rgb(22, 170, 22)",
    background: "rgb(227, 250, 227)",
  },
  successModalBodyIcon: {
    margin: "auto",
    fontSize: "6rem",
  },
  declineModal:{
    width: "250px",
    border: "1px solid grey",
    padding: "1rem",
    display: "flex",
    flexDirection: "column",
  },
  declineModalTitle:{
    display: "flex",
    marginBottom: "2rem",
    alignSelf: "center",
    alignItems: "center",
  },
  declineModalTitleIcon: {
    color: "red",
    marginRight: "0.5rem",
  },
  declineModalText: {
    textAlign: "center",
    marginBottom: "2rem",
  },
  disabled:{
    pointerEvents: "none",
    opacity: "0.7",
    color:  "grey",
  },
  declineModalButton: {
    background: "red",
    color: "white",
    borderRadius: "0.5rem",
    border: "1px solid grey",
    marginBottom: "2rem",
    padding: "0.5rem",
    width: "50%",
    alignSelf: "center",
  },
  declineModalBackLink: {
    textDecoration: "underline",
    textAlign: "center",
  }
}

export default componentStyle;