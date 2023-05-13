import "./pollList.css";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Button, Form } from "react-bootstrap";
import { Trash, PencilSquare } from "react-bootstrap-icons";
import pollList from "../../redux/pollList/actions/pollList";
import Header from "../Header/header";
import AddPoll from "../AddPoll/addPoll";
import voteCount from "../../redux/voteCount/actions/votecount";
import SuccessMessage from "../../utils/successMessage/successMessage";
import { emptyVoteCountSuccessStatus } from "../../redux/voteCount/actions/votecount";
import { optionVoteCount } from "../../utils/voteCountUtils";

const PollList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showVoteCountSuccessMessage, setShowVoteCountSuccessMessage] =
    useState(false);
  const [pollOptionIds, setPollOptionIds] = useState({ pollIds: [], optionIds: [] });
  const [pageNumberLimit, setPageNumberLimit] = useState({
    pageNumber: 1,
    limit: 4,
  });
  const pollQuestion = useSelector((state) => state.pollList);
  const userDetails = useSelector((state) => state.login.userLogin);
  const voteCountSuccessStatus = useSelector((state) => state.voteCount.status);

  useEffect(() => {
    voteCountSuccessStatus === 200 && setShowVoteCountSuccessMessage(true);
    dispatch(emptyVoteCountSuccessStatus());
    setPollOptionIds({
      pollIds: JSON.parse(localStorage.getItem("pollIds")) || [],
      optionIds: JSON.parse(localStorage.getItem("optionIds")) || []
    });
    dispatch(pollList(pageNumberLimit));
  }, [voteCountSuccessStatus]);


  const optionClickVoteCount = (pollID, optionId) => {
    optionVoteCount(pollID, optionId, pollOptionIds, setPollOptionIds)
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
          {userDetails && userDetails.user.roleId === 1 && (
            <button
              className="show-add-poll-button"
              onClick={() => navigate("/addPoll")}
            >
              Add Poll
            </button>
          )}
        </div>
        {pollQuestion.loading ? (
          <div class="d-flex justify-content-center">
            <div class="spinner-border text-success" role="status">
              <span class="sr-only"></span>
            </div>
          </div>
        ) : (
          pollQuestion.pollList.map(({ title, optionList, id }, index) => (
            <div key={id}>
              <div className="title">
                <div className="poll-title">{title}</div>
                {userDetails.user.roleId === 1 && (
                  <div className="edit-buttons">
                    <Button className="btn-sm btn-light">
                      <Trash />
                    </Button>
                    <Button className="btn-sm btn-light edit-button-pencil-square">
                      <PencilSquare />
                    </Button>
                  </div>
                )}
              </div>
              {optionList.map((element) => {
                const isChecked = pollOptionIds.optionIds.includes(element.id);
                const isDisabled =
                  pollOptionIds.pollIds.includes(element.pollId)
                return (
                  <div className="radio-container">
                    <Form.Check
                      key={element.id}
                      label={element.optionTitle}
                      disabled={isDisabled}
                      defaultChecked={isChecked}
                      onClick={() => {
                        optionClickVoteCount(element.pollId, element.id)
                        dispatch(voteCount({ optionId: element.id }));
                      }}
                      name={`group-${index}`}
                      type="radio"
                      value={element.optionTitle}
                      className="radio"
                    />
                    {userDetails.user.roleId === 1 && (
                      <PencilSquare className="edit-button-radio" />
                    )}
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
