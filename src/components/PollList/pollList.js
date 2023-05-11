import "./pollList.css";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Button, Form } from "react-bootstrap";
import { Trash, PencilSquare } from "react-bootstrap-icons";
import pollList from "../../redux/pollList/actions/pollList";
import Header from "../Header/header";

const PollList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [pollIDs, setPollIDs] = useState([]);
  const [pageNumberLimit, setPageNumberLimit] = useState({
    pageNumber: 1,
    limit: 4,
  });
  const pollQuestion = useSelector((state) => state.pollList);
  const userDetails = useSelector((state) => state.login.userLogin);

  useEffect(() => {
    setPollIDs(JSON.parse(localStorage.getItem("pollIDs")) ?? []);
    dispatch(pollList(pageNumberLimit));
  }, []);

  const handleOptionClick = (pollID) => {
    if (!pollIDs.includes(pollID)) {
      setPollIDs((prevPollIDs) => [...prevPollIDs, pollID]);
      localStorage.setItem("pollIDs", JSON.stringify([...pollIDs, pollID]));
    }
  };

  return (
    <div>
      <Header />
      <div className="container">
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
                const isChecked = pollIDs.includes(element.pollId);
                const isDisabled =
                  pollIDs.includes(element.pollId) &&
                  element.pollId !== isChecked;
                return (
                  <div className="radio-container">
                    <Form.Check
                      key={element.id}
                      label={element.optionTitle}
                      disabled={isDisabled}
                      defaultChecked={isChecked}
                      onClick={() => {
                        handleOptionClick(element.pollId);
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
