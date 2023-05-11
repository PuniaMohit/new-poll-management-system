import "./pollList.css";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Button, Form, Container, Navbar } from "react-bootstrap";
import { Trash, PencilSquare } from "react-bootstrap-icons";
import pollList from "../../redux/pollList/actions/pollList";
import { removeUserData } from "../../redux/login/actions/login";

const PollList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [pollIDs, setPollIDs] = useState([]);
  const pollQuestion = useSelector((state) => state.pollList.pollList);
  const userDetailsFromLocalStorage = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    setPollIDs(JSON.parse(localStorage.getItem("pollIDs")) ?? []);
    dispatch(pollList());
  }, []);

  const handleOptionClick = (pollID) => {
    if (!pollIDs.includes(pollID)) {
      setPollIDs((prevPollIDs) => [...prevPollIDs, pollID]);
      localStorage.setItem("pollIDs", JSON.stringify([...pollIDs, pollID]));
    }
  };

  return (
    <div>
      <Navbar className="navbar">
        <Container>
          <Navbar.Brand className="navbar-header">Poll Management</Navbar.Brand>
          <Navbar.Toggle />
          <Navbar.Collapse className="justify-content-end navbar-button">
            <div className="button-container">
              {userDetailsFromLocalStorage.user.roleId === 1 && (
                <button className="add-poll-button  ">Add Poll</button>
              )}
              <button
                onClick={() => {
                  localStorage.clear();
                  navigate("/", { replace: true });
                  dispatch(removeUserData());
                }}
                variant="primary"
                className="logout-button  "
              >
                Logout
              </button>
            </div>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <div className="container">
        {pollQuestion.map(({ title, optionList, id }, index) => (
          <div key={id}>
            <div className="title">
              <div className="poll-title">{title}</div>
              {userDetailsFromLocalStorage.user.roleId === 1 && (
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
                  {userDetailsFromLocalStorage.user.roleId === 1 && (
                    <PencilSquare className="edit-button-radio" />
                  )}
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
};

export default PollList;
