import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { InputGroup, FormControl, Button, Modal } from "react-bootstrap";
import { PlusCircleFill, PencilSquare, Trash } from "react-bootstrap-icons";
import { useNavigate } from "react-router-dom";
import { addPoll, removeStatusAddPoll } from "../../redux/addPoll/actions/addPoll";
import pollList from "../../redux/pollList/actions/pollList";
import "./addPoll.css";
import { addPollOption } from "../../utils/addPollValidation";
import { addNewPoll } from "../../utils/addPollValidation";
import Header from "../Header/header";

const AddPoll = () => {
  const AddPollSuccess = useSelector((state) => state.addPoll.data);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formValues, setFormValues] = useState({
    pollTitle: "",
    pollOptions: [],
  });
  const [pollOptionInput, setPollOptionInput] = useState("");
  const [editPollOptionIndex, setEditPollOptionIndex] = useState(-1);
  const [formErrors, setFormErrors] = useState({
    titleError: "",
    optionError: "",
  });

  const handlePollTitle = (event) => {
    setFormValues((prevValues) => ({
      ...prevValues,
      pollTitle: event.target.value,
    }));
    setFormErrors((prevErrors) => ({ ...prevErrors, titleError: "" }));
  };

  const handlePollOption = (event) => {
    setPollOptionInput(event.target.value);
    setFormErrors((prevErrors) => ({ ...prevErrors, optionError: "" }));
  };

  const handleAddPollOption = () => {
    addPollOption(
      pollOptionInput,
      formValues,
      setFormErrors,
      setFormValues,
      setPollOptionInput,
      editPollOptionIndex,
      setEditPollOptionIndex
    )
  };

  const editPollOption = (index) => {
    setPollOptionInput(formValues.pollOptions[index].optionTitle);
    setEditPollOptionIndex(index);
  }

  const deletePollOption = (index) => {
    const updatedPollOptions = formValues.pollOptions.filter((_, optionIndex) => optionIndex !== index);
    setFormValues((prevValues) => ({ ...prevValues, pollOptions: updatedPollOptions }));
  }

  const handleAddPoll = () => {
    addNewPoll(
      formValues,
      setFormErrors,
      addPoll,
      pollOptionInput,
      dispatch)
  };

  useEffect(() => {
    if (AddPollSuccess) {
      navigate("/pollList")
      dispatch(removeStatusAddPoll())
    }
  }, [AddPollSuccess])

  return (
    <div><Header />
      <div className="container-add-poll">
        <div className="title-add-poll" >
          Add Poll
        </div>
        <Modal.Body>
          <div className="container-sm">
            <InputGroup className="mb-2">
              <FormControl
                placeholder="Enter poll title"
                value={formValues.pollTitle}
                onChange={handlePollTitle}
                isInvalid={formErrors.titleError}
              />
            </InputGroup>
            <div className="error-message mb-2">{formErrors.titleError}</div>
            <InputGroup className="mb-2">
              <FormControl
                placeholder="Enter poll option"
                value={pollOptionInput}
                onChange={handlePollOption}
                isInvalid={formErrors.optionError}
              />
              <Button variant="outline-secondary" onClick={handleAddPollOption}>
                <PlusCircleFill />
              </Button>
            </InputGroup>
            <div className="error-message mb-2">{formErrors.optionError}</div>
            {formValues.pollOptions.map((option, index) => (
              <div key={index} className="input-list">
                <div className="input-list-container">
                  <div className="option-title">{option.optionTitle}</div>
                  <div className="edit-button" onClick={() => editPollOption(index)}>
                    <PencilSquare />
                  </div>
                  <div className="delete-button" onClick={() => deletePollOption(index)}>
                    <Trash />
                  </div>
                </div>
              </div>
            ))}
            <div className="add-poll-container">
              <button
                className=" add-poll-button"
                onClick={handleAddPoll}
              >
                Add New Poll
              </button>
            </div>
          </div>
        </Modal.Body>
      </div>
    </div >
  );
};

export default AddPoll;
