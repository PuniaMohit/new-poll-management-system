import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import "./successMessage.css";
import deletePoll from "../../redux/delete/actions/deletePoll";
import { useDispatch } from "react-redux";
import { deletePollOptionAction } from "../../redux/deletePollOption/actions/deletePollOption";

function SuccessMessage(props) {
  const { show, setShow, message, deleteTheme, id, deletePollorOption } = props;
  const dispatch = useDispatch();
  const handleClose = () => setShow(false);

  const removePopUp = () => {
    if (deleteTheme) {
      deletePollorOption === "poll"
        ? dispatch(deletePoll(id))
        : dispatch(deletePollOptionAction(id));
      setShow((prevData) => ({
        ...prevData,
        show: false,
        deleteTheme: false,
        deletePollorOption: "",
        id: "",
      }));
    } else {
      setShow(false);
    }
  };
  return (
    <div>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header
          className={deleteTheme ? "modal-header-delete" : "modal-header-green"}
        >
          <Modal.Title
            className={
              deleteTheme
                ? "modal-title-delete mx-auto"
                : "modal-title-green mx-auto"
            }
          >
            {message}
          </Modal.Title>
        </Modal.Header>
        <Modal.Footer
          className={deleteTheme ? "modal-footer-delete" : "modal-footer-green"}
        >
          <Button variant="secondary" className="mx-auto" onClick={removePopUp}>
            {deleteTheme ? "Delete" : "Ok"}
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
export default SuccessMessage;
