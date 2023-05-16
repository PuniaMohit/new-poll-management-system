export const singlePollVoteCount=( pollId,optionId,setPollOptionIds,pollOptionIds,dispatch,voteCount)=>{
    setPollOptionIds((prevState) => ({
      ...prevState,
      pollIds: [...prevState.pollIds, pollId],
      optionIds: [...prevState.optionIds, optionId],
    }));
    localStorage.setItem(
      "pollIds",
      JSON.stringify([
        ...pollOptionIds.pollIds,
        pollId,
      ])
    );
    localStorage.setItem(
      "optionIds",
      JSON.stringify([
        ...pollOptionIds.optionIds,
        optionId,
      ])
    );
    dispatch(voteCount({ optionId: optionId }))
}


