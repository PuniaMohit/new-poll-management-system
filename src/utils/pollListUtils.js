export const optionClick = (pollID, optionId, pollOptionIds, setPollOptionIds) => {
    setPollOptionIds((prevState) => ({
        ...prevState,
        pollIds: [...prevState.pollIds, pollID],
    }));

    localStorage.setItem(
        "pollIds",
        JSON.stringify([...pollOptionIds.pollIds, pollID])
    )
    setPollOptionIds((prevState) => ({
        ...prevState,
        optionIds: [...prevState.optionIds, optionId],
    }));

    localStorage.setItem(
        "optionIds",
        JSON.stringify([...pollOptionIds.optionIds, optionId])
    );
}
