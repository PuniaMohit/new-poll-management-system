import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Button, Form } from "react-bootstrap";
import { Trash, PencilSquare, ArrowRightSquare } from "react-bootstrap-icons";
import pollList, {
  pollListSecondCall,
} from "../../redux/pollList/actions/pollList";
import Header from "../Header/header";
import AddPoll from "../AddEditPoll/addEditPoll";
import voteCount, {
  emptyVoteCountSuccessStatus,
} from "../../redux/voteCount/actions/votecount";
import SuccessMessage from "../../utils/successMessage/successMessage";
import { optionVoteCount } from "../../utils/voteCountUtils";
import deletePoll, {
  emptyDeletePollSuccessStatus,
} from "../../redux/delete/actions/deletePoll";
import singlePoll from "../../redux/singlePoll/actions/singlePoll";
import { emptyPollList } from "../../redux/pollList/actions/pollList";
import "./pollList.css";

const PollList = () => {
  const pollQuestions = useSelector((state) => state.pollList.pollList);
  const loading = useSelector((state) => state.pollList.loading);
  const pollListArrayToCheck = useSelector(
    (state) => state.pollList.pollListForChecking
  );
  const user = useSelector((state) => state.login.user);
  const voteCountSuccess = useSelector((state) => state.voteCount.data);
  const deletePollSuccess = useSelector((state) => state.deletePoll.data);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showVoteCountSuccessMessage, setShowVoteCountSuccessMessage] =
    useState(false);
  const [pollOptionIds, setPollOptionIds] = useState({
    pollIds: [],
    optionIds: [],
  });
  const [pageNumberLimit, setPageNumberLimit] = useState({
    pageNumber: 1,
    limit: 4,
  });

  const optionClickVoteCount = (pollID, optionId) => {
    optionVoteCount(pollID, optionId, pollOptionIds, setPollOptionIds);
  };

  let pollQuestionsLessThanLimit =
    pollQuestions.length % pageNumberLimit.limit > pageNumberLimit.limit;

  useEffect(() => {
    dispatch(pollList(pageNumberLimit));
    setPollOptionIds({
      pollIds: JSON.parse(localStorage.getItem("pollIds")) || [],
      optionIds: JSON.parse(localStorage.getItem("optionIds")) || [],
    });
  }, [pageNumberLimit]);

  useEffect(() => {
    dispatch(
      pollListSecondCall({
        pageNumber: pageNumberLimit.pageNumber + 1,
        limit: 4,
      })
    );
  }, [pollQuestions]);

  useEffect(() => {
    if (voteCountSuccess) {
      setShowVoteCountSuccessMessage(true);
      dispatch(pollList(pageNumberLimit));
    }
    dispatch(emptyVoteCountSuccessStatus());
  }, [voteCountSuccess]);

  useEffect(() => {
    deletePollSuccess && dispatch(pollList(pageNumberLimit));
    dispatch(emptyDeletePollSuccessStatus());
  }, [deletePollSuccess]);

  useEffect(() => {
    return () => dispatch(emptyPollList());
  }, []);

  return (
    <div>
      <Header />
      <SuccessMessage
        show={showVoteCountSuccessMessage}
        setShow={setShowVoteCountSuccessMessage}
        message="Vote Given Successfully"
      />
      <div className="container">
        <div className="container-add-poll-button">
          {user && user.user.roleId === 1 && (
            <button
              className="show-add-poll-button"
              onClick={() => navigate(`/poll/add/""`)}
            >
              Add Poll
            </button>
          )}
        </div>
        {pollQuestions &&
          pollQuestions.map(({ title, optionList, id }, index) => (
            <div key={id}>
              <div className="title">
                <div className="poll-title">
                  {index + 1}. {title}
                </div>
                {user.user.roleId === 1 && (
                  <div className="edit-buttons">
                    <Button
                      className="btn-sm btn-light"
                      onClick={() => dispatch(deletePoll(id))}
                    >
                      <Trash />
                    </Button>
                    <Button
                      className="btn-sm btn-light edit-button-pencil-square"
                      onClick={() => {
                        navigate(`/poll/edit/${id}`);
                        dispatch(singlePoll(id));
                      }}
                    >
                      <PencilSquare />
                    </Button>
                    <Button
                      className="btn-sm btn-light single-poll-button"
                      onClick={() => {
                        navigate(`/singlePoll/${id}`);
                      }}
                    >
                      <ArrowRightSquare />
                    </Button>
                  </div>
                )}
              </div>
              {optionList.map((element) => {
                const isChecked = pollOptionIds.optionIds.includes(element.id);
                const isDisabled = pollOptionIds.pollIds.includes(
                  element.pollId
                );
                return (
                  <div className="radio-container">
                    <Form.Check
                      key={element.id}
                      label={element.optionTitle}
                      disabled={isDisabled}
                      defaultChecked={isChecked}
                      onClick={() => {
                        optionClickVoteCount(element.pollId, element.id);
                        dispatch(voteCount({ optionId: element.id }));
                      }}
                      name={`group-${index}`}
                      type="radio"
                      value={element.optionTitle}
                      className="radio"
                    />
                    <div className="vote-count">
                      {element.voteCount.length} Votes
                    </div>
                  </div>
                );
              })}
            </div>
          ))}
        {loading ? (
          <div class="d-flex justify-content-center">
            <div class="spinner-border text-success" role="status">
              <span class="sr-only"></span>
            </div>
          </div>
        ) : (
          <></>
        )}
        <div class="show-more-poll-button-container">
          <button
            className={
              pollQuestionsLessThanLimit || !pollListArrayToCheck.length
                ? "show-more-disabled-button"
                : "show-more-poll-button"
            }
            disabled={
              pollQuestionsLessThanLimit || !pollListArrayToCheck.length
            }
            onClick={() => {
              setPageNumberLimit((prevState) => ({
                ...prevState,
                pageNumber: prevState.pageNumber + 1,
              }));
            }}
          >
            Show More
          </button>
        </div>
      </div>
    </div>
  );
};

export default PollList;
