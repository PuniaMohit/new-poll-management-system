import { Form } from "react-bootstrap";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import "./singlePoll.css";
import singlePoll from "../../redux/singlePoll/actions/singlePoll";
import voteCount from "../../redux/voteCount/actions/votecount";
import Header from "../Header/header";
import BackArrow from "../../utils/BackArrow/backArrow";
import { singlePollVoteCount } from "../../utils/singlePollUtils";

const SinglePollPage = () => {
  const pollDetails = useSelector((state) => state.singlePoll);
  const voteCountSuccess = useSelector((state) => state.voteCount.data);
  const [pollOptionIds, setPollOptionIds] = useState({
    pollIds: [],
    optionIds: [],
  });
  const dispatch = useDispatch();
  const { pollId } = useParams();

  const handleSinglePollVoteCount = (pollId, optionId) => {
    singlePollVoteCount(
      pollId,
      optionId,
      setPollOptionIds,
      pollOptionIds,
      dispatch,
      voteCount
    );
  };
  useEffect(() => {
    dispatch(singlePoll(pollId));
    setPollOptionIds({
      pollIds: JSON.parse(localStorage.getItem("pollIds")) || [],
      optionIds: JSON.parse(localStorage.getItem("optionIds")) || [],
    });
  }, []);

  useEffect(() => {
    voteCountSuccess && dispatch(singlePoll(pollId));
  }, [voteCountSuccess]);

  return (
    <div>
      <Header />
      <BackArrow />
      {pollDetails ? (
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
                        handleSinglePollVoteCount(element.pollId, element.id);
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
      ) : (
        <div class="d-flex justify-content-center">
          <div class="spinner-border text-success" role="status">
            <span class="sr-only"></span>
          </div>
        </div>
      )}
    </div>
  );
};

export default SinglePollPage;
