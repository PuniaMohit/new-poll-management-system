import { Form } from "react-bootstrap";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import "./singlePoll.css";
import singlePoll from "../../redux/singlePoll/actions/singlePoll";
import voteCount from "../../redux/voteCount/actions/votecount";
import Header from "../Header/header";
import { emptyVoteCountSuccessStatus } from "../../redux/voteCount/actions/votecount";
import BackArrow from "../../utils/BackArrow/backArrow";

const SinglePollPage = () => {
  const pollDetails = useSelector(
    (state) => state.singlePoll.singlePollDetails
  );
  const voteCountSuccessStatus = useSelector((state) => state.voteCount.status);
  const [pollOptionIds, setPollOptionIds] = useState({
    pollIds: [],
    optionIds: [],
  });
  const dispatch = useDispatch();
  const { pollId } = useParams();
  useEffect(() => {
    dispatch(singlePoll(pollId));
    setPollOptionIds({
      pollIds: JSON.parse(localStorage.getItem("pollIds")) || [],
      optionIds: JSON.parse(localStorage.getItem("optionIds")) || [],
    });
  }, []);

  useEffect(() => {
    voteCountSuccessStatus === 200 && dispatch(singlePoll(pollId));
    dispatch(emptyVoteCountSuccessStatus());
  }, [voteCountSuccessStatus]);

  return (
    <div>
      <Header />
      <BackArrow />
      {pollDetails && (
        <div className="single-poll-container">
          <div className="single-poll-title">{pollDetails.title}</div>
          <div className="single-poll-radio-container">
            {pollDetails.optionList
              .slice()
              .reverse()
              .map((element, index) => {
                return (
                  <div className="single-poll-one-radio-container">
                    <Form.Check
                      key={element.id}
                      label={element.optionTitle}
                      disabled={pollOptionIds.pollIds.includes(element.pollId)}
                      checked={pollOptionIds.optionIds.includes(element.id)}
                      onClick={() => {
                        setPollOptionIds((prevState) => ({
                          ...prevState,
                          pollIds: [...prevState.pollIds, element.pollId],
                          optionIds: [...prevState.optionIds, element.id],
                        }));
                        localStorage.setItem(
                          "pollIds",
                          JSON.stringify([
                            ...pollOptionIds.pollIds,
                            element.pollId,
                          ])
                        );
                        localStorage.setItem(
                          "optionIds",
                          JSON.stringify([
                            ...pollOptionIds.optionIds,
                            element.id,
                          ])
                        );
                        dispatch(voteCount({ optionId: element.id }));
                      }}
                      name={`group-${index}`}
                      type="radio"
                      value={element.optionTitle}
                      className="single-poll-radio"
                    />
                    <div className="single-poll-vote-count">
                      {element.voteCount.length} Votes
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      )}
    </div>
  );
};

export default SinglePollPage;
