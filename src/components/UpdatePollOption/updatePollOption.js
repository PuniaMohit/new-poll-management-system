import { useState, useEffect } from "react";
import { InputGroup, FormControl, Button, Modal } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import updatePollOptionAction, {
  emptyUpdatePollOptionDetailsSuccessStatus,
} from "../../redux/updatePollOption/actions/updatePollOption";
import "./updatePollOption.css";
import { validationNotEmptyString } from "../../utils/formValidate";

const UpdatePollOption = () => {
  const { option, optionId } = useParams();
  const updatPollOptionDetails = useSelector((state) => state.updatePollOption);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [editedOption, setEditedOption] = useState(option);
  const [error, setError] = useState("");

  const handlePollOptionChange = (event) => {
    setEditedOption(event.target.value);
    setError("");
  };

  const handleUpdatePollOption = () => {
    validationNotEmptyString(editedOption, setError) &&
      dispatch(updatePollOptionAction({ optionTitle: editedOption }, optionId));
  };

  useEffect(() => {
    updatPollOptionDetails.status === 200 && navigate("/pollList");
    dispatch(emptyUpdatePollOptionDetailsSuccessStatus());
  }, [updatPollOptionDetails.status]);
  return (
    <div className="update-poll-option-container">
      <Modal.Title
        id="example-custom-modal-styling-title"
        className="update-poll-title"
      >
        UPDATE POLL OPTION
      </Modal.Title>
      <InputGroup className="mb-3 mt-4">
        <FormControl
          placeholder="Enter poll title"
          value={editedOption}
          onChange={handlePollOptionChange}
          isInvalid={error}
        />
        <FormControl.Feedback type="invalid">{error}</FormControl.Feedback>
      </InputGroup>
      <button
        className="cursor-pointer update-poll-option-button"
        variant="primary"
        onClick={handleUpdatePollOption}
      >
        {updatPollOptionDetails.loading ? "Loading..." : "Update"}
      </button>
    </div>
  );
};

export default UpdatePollOption;
