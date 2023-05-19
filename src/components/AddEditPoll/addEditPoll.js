import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { InputGroup, FormControl, Button, Modal } from "react-bootstrap";
import { PlusCircleFill, PencilSquare, Trash } from "react-bootstrap-icons";
import { useNavigate, useParams } from "react-router-dom";
import {
  addPoll,
  removeStatusAddPoll,
} from "../../redux/addPoll/actions/addPoll";
import pollList from "../../redux/pollList/actions/pollList";
import "./addPoll.css";
import { addPollOption } from "../../utils/addPollValidation";
import { addNewPoll } from "../../utils/addPollValidation";
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

const AddEditPoll = () => {
  const updatPollTitleDetails = useSelector(
    (state) => state.updatePollTitleDetails.data
  );
  const pollDetails = useSelector((state) => state.singlePoll);
  const user = useSelector((state) => state.login.user);
  const AddPollSuccess = useSelector((state) => state.addPoll.data);
  const updatPollOptionDetails = useSelector((state) => state.updatePollOption.data);
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
  const [addPollAPI, setAddPollAPI] = useState(false)

  const handlePollTitle = (event) => {
    setFormValues((prevValues) => ({
      ...prevValues,
      pollTitle: event.target.value,
    }));
    setFormErrors((prevErrors) => ({ ...prevErrors, titleError: "" }));
  };

  const handlePollOption = (event) => {
    if (event.target.value.length <= 2) {
      setAddPollAPI(true)
    }
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
    );
  };

  const editPollOption = (index) => {
    setPollOptionInput(formValues.pollOptions[index].optionTitle);
    setEditPollOptionIndex(index);
  };

  const deletePollOption = (index) => {
    const updatedPollOptions = formValues.pollOptions.filter(
      (_, optionIndex) => optionIndex !== index
    );
    setFormValues((prevValues) => ({
      ...prevValues,
      pollOptions: updatedPollOptions,
    }));
  };

  const handleAddPoll = () => {
    addNewPoll(formValues, setFormErrors, pollOptionInput, navigate, mode, dispatch, addPoll);
  };

  const handleBlurTitle = (event) => {
    const titleRegex = /^.{8,}$/;
    if (formValues.pollTitle.trim() === "") {
      setFormErrors((prevErrors) => ({
        ...prevErrors,
        titleError: "Enter poll title",
      }));
    } else if (!titleRegex.test(formValues.pollTitle.trim())) {
      setFormErrors((prevErrors) => ({
        ...prevErrors,
        titleError: "Title should be of minimum 8 characters",
      }));
    } else {
      event.target.value !== pollDetails.title &&
        dispatch(
          updatePollTitle(
            { title: formValues.pollTitle, createdBy: user.user.id },
            pollId
          )
        );
    }

  };
  const handleBlurOption = (event) => {
    console.log(event.target.value)
    // if (addPollAPI) {
      console.log(event.target.value)

      setFormErrors((prevErrors) => ({
        ...prevErrors,
        optionError: "Only Edit not add poll",
      }));
    // }
    // else {
      // setAddPollAPI(false)
      // setFormErrors((prevErrors) => ({
      //   ...prevErrors,
      //   optionError: "Only Edit not add poll",
      // }));
      console.log(event.target.value)
      if (event.target.value) {
        event.target.value !== formValues.pollOptions[editPollOptionIndex].optionTitle &&
          dispatch(
            updatePollOptionAction(
              { optionTitle: pollOptionInput },
              pollDetails.optionList[editPollOptionIndex].id
            )
          );
      // }
    }

  };
  useEffect(() => {
    updatPollOptionDetails && setShowSuccessMessage({
      show: true,
      titleMesasge: "Option Successfully Updated",
    });
    dispatch(emptyUpdatePollOptionDetailsSuccessStatus());
  }, [updatPollOptionDetails]);

  useEffect(() => {
    updatPollTitleDetails &&
      setShowSuccessMessage({
        show: true,
        titleMesasge: "Title Successfully Updated",
      });
    dispatch(emptyUpdatePollTitleDetailsSuccessStatus());
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
    if (pollId) {
      setFormValues({
        pollTitle: pollDetails.title || "",
        pollOptions: Array.isArray(pollDetails.optionList)
          ? pollDetails.optionList.map((element) => ({
            optionTitle: element.optionTitle,
          }))
          : [],
      });
    }
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
                    onClick={() => deletePollOption(index)}
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
