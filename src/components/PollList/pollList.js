import "./pollList.css";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Button, Form } from "react-bootstrap";
import { Trash, PencilSquare, ArrowRightSquare } from "react-bootstrap-icons";
import pollList from "../../redux/pollList/actions/pollList";
import Header from "../Header/header";
import AddPoll from "../AddPoll/addPoll";
import voteCount, {
  emptyVoteCountSuccessStatus,
} from "../../redux/voteCount/actions/votecount";
import SuccessMessage from "../../utils/successMessage/successMessage";
import { optionVoteCount } from "../../utils/voteCountUtils";
import deletePoll, {
  emptyDeletePollSuccessStatus,
} from "../../redux/delete/actions/deletePoll";

const PollList = () => {
  const pollQuestions = useSelector((state) => state.pollList);
  const user = useSelector((state) => state.login.user);
  const voteCountSuccessStatus = useSelector((state) => state.voteCount.status);
  const deletePollSuccessStatus = useSelector(
    (state) => state.deletePoll.status
  );
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

  useEffect(() => {
    setPollOptionIds({
      pollIds: JSON.parse(localStorage.getItem("pollIds")) || [],
      optionIds: JSON.parse(localStorage.getItem("optionIds")) || [],
    });
  }, []);

  useEffect(() => {
    dispatch(pollList(pageNumberLimit));
  }, []);

  useEffect(() => {
    if (voteCountSuccessStatus === 200) {
      setShowVoteCountSuccessMessage(true);
      dispatch(pollList(pageNumberLimit));
    }
    dispatch(emptyVoteCountSuccessStatus());
  }, [voteCountSuccessStatus]);

  useEffect(() => {
    deletePollSuccessStatus === 200 && dispatch(pollList(pageNumberLimit));
    dispatch(emptyDeletePollSuccessStatus());
  }, [deletePollSuccessStatus]);

  const optionClickVoteCount = (pollID, optionId) => {
    optionVoteCount(pollID, optionId, pollOptionIds, setPollOptionIds);
  };

  return (
    <div>
      <Header />
      <SuccessMessage
        show={showVoteCountSuccessMessage}
        setShow={setShowVoteCountSuccessMessage}
      />
      <div className="container">
        <div className="container-add-poll-button">
          {user && user.user.roleId === 1 && (
            <button
              className="show-add-poll-button"
              onClick={() => navigate("/addPoll")}
            >
              Add Poll
            </button>
          )}
        </div>
        {pollQuestions.loading ? (
          <div class="d-flex justify-content-center">
            <div class="spinner-border text-success" role="status">
              <span class="sr-only"></span>
            </div>
          </div>
        ) : (
          pollQuestions.pollList.map(({ title, optionList, id }, index) => (
            <div key={id}>
              <div className="title">
                <div className="poll-title">{title}</div>
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
                        navigate(`/updatePollTitle/${title}/${id}`);
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
                    {user.user.roleId === 1 && (
                      <PencilSquare className="edit-button-radio" />
                    )}
                    <div className="vote-count">
                      {element.voteCount.length} Votes
                    </div>
                  </div>
                );
              })}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default PollList;
