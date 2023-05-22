export const addPollOption = (
  pollOptionInput,
  formValues,
  setFormErrors,
  setFormValues,
  setPollOptionInput,
  editPollOptionIndex,
  setEditPollOptionIndex
) => {
  if (pollOptionInput.trim() !== "") {
    if (editPollOptionIndex !== -1) {
      const updatedPollOptions = [...formValues.pollOptions];
      updatedPollOptions[editPollOptionIndex] = {
        optionTitle: pollOptionInput,
      };
      setFormValues((prevValues) => ({
        ...prevValues,
        pollOptions: updatedPollOptions,
      }));
      setEditPollOptionIndex(-1);
    } else {
      setFormValues((prevValues) => ({
        ...prevValues,
        pollOptions: [
          ...prevValues.pollOptions,
          { optionTitle: pollOptionInput },
        ],
      }));
    }
    setPollOptionInput("");
  } else {
    setFormErrors((prevErrors) => ({
      ...prevErrors,
      optionError: "Enter poll option",
    }));
  }
};

export const addNewPoll = (
  formValues,
  setFormErrors,
  pollOptionInput,
  navigate,
  dispatch,
  addPoll
) => {
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
  }
  if (pollOptionInput === "" && formValues.pollOptions.length < 3) {
    setFormErrors((prevErrors) => ({
      ...prevErrors,
      optionError: "Enter at least three options",
    }));
  } else if (formValues.pollOptions.length < 3) {
    setFormErrors((prevErrors) => ({
      ...prevErrors,
      optionError: "Enter at least three options",
    }));
  }
  if (formValues.pollOptions.length >= 3) {
    const newPoll = {
      title: formValues.pollTitle,
      options: formValues.pollOptions,
    };
    dispatch(addPoll(newPoll));
  }
};

export const blurOption = (
  event,
  formErrors,
  formValues,
  dispatch,
  updatePollOptionAction,
  setPollOptionInput,
  pollOptionInput,
  pollDetails,
  editPollOptionIndex,
  setFormErrors,
) => {
  if (event.target.value && formErrors.optionError !== "Only Edit") {
    event.target.value !==
      formValues.pollOptions[editPollOptionIndex].optionTitle &&
      dispatch(
        updatePollOptionAction(
          { optionTitle: pollOptionInput },
          pollDetails.optionList[editPollOptionIndex].id
        )
      );
  }
  setPollOptionInput("")
  setFormErrors((prevErrors) => ({ ...prevErrors, optionError: "" }));
};

export const blurTitle = (
  event,
  formValues,
  setFormErrors,
  dispatch,
  updatePollTitle,
  user,
  pollId,
  pollDetails
) => {
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
