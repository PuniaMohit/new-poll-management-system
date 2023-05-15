import { useState, useEffect } from "react";
import { InputGroup, FormControl, Button, Modal } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import updatePollTitle, { emptyUpdatePollTitleDetailsSuccessStatus } from "../../redux/updatePollTitle/actions/updatePollTitle"
import "./updatePollTitle.css"

const UpdatePollTitle = () => {
  const { pollTitle, pollId } = useParams();
  const updatPollTitleDetails = useSelector(state => state.updatePollTitleDetails)
  const userLoginDetails = useSelector((state) => state.login.userLogin);
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [title, setTitle] = useState(pollTitle)
  const [error, setError] = useState("")

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
    dispatch(updatePollTitle({ title: title, createdBy: userLoginDetails.user.id }, pollId))
  };

  useEffect(() => {
    updatPollTitleDetails.status === 200 && navigate("/pollList")
    dispatch(emptyUpdatePollTitleDetailsSuccessStatus())
  }, [updatPollTitleDetails.status])
  return (
    <div className="update-poll-title-container">
      <Modal.Title id="example-custom-modal-styling-title" className="update-poll-title">
        UPDATE POLL TITLE
      </Modal.Title>
      <InputGroup className="mb-3 mt-4">
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
      <button className="cursor-pointer update-poll-title-button" variant="primary" onClick={handleUpdate}>
        {updatPollTitleDetails.loading ? "Loading..." : "Update"}
      </button>
    </div>






  );
};

export default UpdatePollTitle;
