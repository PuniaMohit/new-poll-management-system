import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { InputGroup, FormControl, Button, Modal } from "react-bootstrap";
import { PlusCircleFill, PencilSquare, Trash } from "react-bootstrap-icons";
import { useNavigate, useParams } from "react-router-dom";
import {
  addPoll,
  removeStatusAddPoll,
} from "../../redux/addPoll/actions/addPoll";
import "./addPoll.css";
import {
  addNewPoll,
  addPollOption,
  blurOption,
  blurTitle,
} from "../../utils/addPollValidation";
import Header from "../Header/header";
import singlePoll from "../../redux/singlePoll/actions/singlePoll";
import updatePollTitle, {
  emptyUpdatePollTitleDetailsSuccessStatus,
} from "../../redux/updatePollTitle/actions/updatePollTitle";
import SuccessMessage from "../../utils/successMessage/successMessage";
import updatePollOptionAction, {
  emptyUpdatePollOptionDetailsSuccessStatus,
} from "../../redux/updatePollOption/actions/updatePollOption";
import BackArrow from "../../utils/BackArrow/backArrow";
import {
  deletePollOptionAction,
  emptyDeletePollOptionDetailsSuccessStatus,
} from "../../redux/deletePollOption/actions/deletePollOption";

const AddEditPoll = () => {
  const updatPollTitleDetails = useSelector(
    (state) => state.updatePollTitleDetails.data
  );
  const pollDetails = useSelector((state) => state.singlePoll);
  const deletePollOptionDetails = useSelector(
    (state) => state.deletePollOption.data
  );
  const user = useSelector((state) => state.login.user);
  const AddPollSuccess = useSelector((state) => state.addPoll.data);
  const updatPollOptionDetails = useSelector(
    (state) => state.updatePollOption.data
  );
  const { mode, pollId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showSuccessMessage, setShowSuccessMessage] = useState({
    show: false,
    titleMesasge: "",
  });

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
    if (mode === "edit") {
      if (editPollOptionIndex === -1) {
        setFormErrors((prevErrors) => ({
          ...prevErrors,
          optionError: "Only Edit",
        }));
      }
    }
  };

  const handleAddPollOption = () => {
    if (mode === "add") {
      addPollOption(
        pollOptionInput,
        formValues,
        setFormErrors,
        setFormValues,
        setPollOptionInput,
        editPollOptionIndex,
        setEditPollOptionIndex
      );
    }
  };

  const editPollOption = (index) => {
    setPollOptionInput(formValues.pollOptions[index].optionTitle);
    setEditPollOptionIndex(index);
    setFormErrors((prevErrors) => ({ ...prevErrors, optionError: "" }));
  };
  const deletePollOption = (index, optionId) => {
    if (mode === "add") {
      const updatedPollOptions = formValues.pollOptions.filter(
        (_, optionIndex) => optionIndex !== index
      );
      setFormValues((prevValues) => ({
        ...prevValues,
        pollOptions: updatedPollOptions,
      }));
    } else {
      if (formValues.pollOptions.length > 3) {
        dispatch(deletePollOptionAction(optionId));
      } else {
      }
    }
  };

  const handleAddPoll = () => {
    if (mode === "add") {
      addNewPoll(
        formValues,
        setFormErrors,
        pollOptionInput,
        navigate,
        dispatch,
        addPoll
      );
    } else {
      navigate("/pollList");
    }
  };

  const handleBlurTitle = (event) => {
    if (mode === "edit") {
      blurTitle(
        event,
        formValues,
        setFormErrors,
        dispatch,
        updatePollTitle,
        user,
        pollId,
        pollDetails
      );
    }
  };
  const handleBlurOption = (event) => {
    if (mode === "edit") {
      blurOption(
        event,
        formErrors,
        formValues,
        dispatch,
        updatePollOptionAction,
        setPollOptionInput,
        pollOptionInput,
        pollDetails,
        editPollOptionIndex,
        setFormErrors
      );
    }
  };
  useEffect(() => {
    updatPollOptionDetails &&
      setShowSuccessMessage({
        show: true,
        titleMesasge: "Option Successfully Updated",
      });
    dispatch(emptyUpdatePollOptionDetailsSuccessStatus());
    setEditPollOptionIndex(-1);
    dispatch(singlePoll(pollId));
  }, [updatPollOptionDetails]);

  useEffect(() => {
    deletePollOptionDetails &&
      setShowSuccessMessage({
        show: true,
        titleMesasge: "Option Successfully Deleted",
      });
    dispatch(emptyDeletePollOptionDetailsSuccessStatus());
    dispatch(singlePoll(pollId));
  }, [deletePollOptionDetails]);

  useEffect(() => {
    updatPollTitleDetails &&
      setShowSuccessMessage({
        show: true,
        titleMesasge: "Title Successfully Updated",
      });
    dispatch(emptyUpdatePollTitleDetailsSuccessStatus());
    dispatch(singlePoll(pollId));
  }, [updatPollTitleDetails]);

  useEffect(() => {
    pollId && dispatch(singlePoll(pollId));
  }, []);

  useEffect(() => {
    if (AddPollSuccess) {
      navigate("/pollList");
      dispatch(removeStatusAddPoll());
    }
  }, [AddPollSuccess]);

  useEffect(() => {
    setFormValues({
      pollTitle: pollDetails.title || "",
      pollOptions: Array.isArray(pollDetails.optionList)
        ? pollDetails.optionList.map((element) => ({
            optionTitle: element.optionTitle,
            optionId: element.id,
          }))
        : [],
    });
  }, [pollDetails]);

  return (
    <div>
      <Header />
      <SuccessMessage
        show={showSuccessMessage.show}
        setShow={setShowSuccessMessage}
        message={showSuccessMessage.titleMesasge}
      />
      <BackArrow />
      <div className="container-add-poll">
        <div className="title-add-poll">
          {mode === "edit" ? "Edit Poll" : "Add Poll"}
        </div>
        <Modal.Body>
          <div className="container-sm">
            <InputGroup className="mb-2">
              <FormControl
                placeholder="Enter poll title"
                value={formValues.pollTitle}
                onChange={handlePollTitle}
                isInvalid={formErrors.titleError}
                onBlur={handleBlurTitle}
              />
            </InputGroup>
            <div className="error-message mb-2">{formErrors.titleError}</div>
            <InputGroup className="mb-2">
              <FormControl
                placeholder="Enter poll option"
                value={pollOptionInput}
                onChange={handlePollOption}
                isInvalid={formErrors.optionError}
                onBlur={handleBlurOption}
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
                  <div
                    className="edit-button"
                    onClick={() => editPollOption(index)}
                  >
                    <PencilSquare />
                  </div>
                  <div
                    className="delete-button"
                    onClick={() => deletePollOption(index, option.optionId)}
                  >
                    <Trash />
                  </div>
                </div>
              </div>
            ))}
            <div className="add-poll-container">
              <button className=" add-poll-button" onClick={handleAddPoll}>
                {mode === "edit" ? "UPDATE" : "Add Poll"}
              </button>
            </div>
          </div>
        </Modal.Body>
      </div>
    </div>
  );
};

export default AddEditPoll;
