import { useState } from "react";
import { InputGroup, FormControl, Button, Modal } from "react-bootstrap";
import { useDispatch } from "react-redux";
import updatePollTitle from "../../redux/updatePollTitle/actions/updatePollTitle"

const UpdatePollTitle = (props) => {
    const dispatch=useDispatch()
  const { show, setShow, id } = props;
  const [title, setTitle] = useState("");
  const [error, setError] = useState("");

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
    setError("");
  };

  const handleUpdate = () => {
    const regex = /^.{8,}$/;
    if (!regex.test(title)) {
      setError("Title must be at least 8 characters long");
      return;
    }
    const userId=JSON.parse(localStorage.getItem("user")).id
    dispatch(updatePollTitle({title:title, createdBy:userId}, id))
    setShow(false);
  };

  return (
<div>
    <Modal.Title id="example-custom-modal-styling-title">
      UPDATE POLL TITLE
    </Modal.Title>
  <Modal.Body>
    <InputGroup className="mb-3">
      <FormControl
        placeholder="Enter poll title"
        value={title}
        onChange={handleTitleChange}
        isInvalid={error}
      />
      <FormControl.Feedback type="invalid" style={{ display: "block" }}>
        {error}
      </FormControl.Feedback>
    </InputGroup>
    <Button className="cursor-pointer" variant="primary" onClick={handleUpdate}>
      Update
    </Button>
  </Modal.Body>
</div>






  );
};

export default UpdatePollTitle;
