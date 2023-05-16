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
import { selectedRadio } from "../../utils/singlePollUtils";

const SinglePollPage = () => {
  const pollDetails = useSelector((state) => state.singlePoll);
  const voteCountSuccessStatus = useSelector((state) => state.voteCount.status);
  const [pollOptionIds, setPollOptionIds] = useState({
    pollIds: [],
    optionIds: [],
  });
  const dispatch = useDispatch();
  const { pollId } = useParams();

  const selectRadio = (pollId, optionId) => {
    selectedRadio(
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
    voteCountSuccessStatus === 200 && dispatch(singlePoll(pollId));
    dispatch(emptyVoteCountSuccessStatus());
  }, [voteCountSuccessStatus]);

  return (
    <div>
      <Header />
      <BackArrow />
      {pollDetails.loading ? (
        <div class="d-flex justify-content-center">
          <div class="spinner-border text-success" role="status">
            <span class="sr-only"></span>
          </div>
        </div>
      ) : (
        pollDetails.singlePollDetails && (
          <div className="single-poll-container">
            <div className="single-poll-title">
              {pollDetails.singlePollDetails.title}
            </div>
            <div className="single-poll-radio-container">
              {pollDetails.singlePollDetails.optionList
                .slice()
                .reverse()
                .map((element, index) => {
                  return (
                    <div className="single-poll-one-radio-container">
                      <Form.Check
                        key={element.id}
                        label={element.optionTitle}
                        disabled={pollOptionIds.pollIds.includes(
                          element.pollId
                        )}
                        checked={pollOptionIds.optionIds.includes(element.id)}
                        onClick={() => {
                          selectRadio(element.pollId, element.id);
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
        )
      )}
    </div>
  );
};

export default SinglePollPage;
