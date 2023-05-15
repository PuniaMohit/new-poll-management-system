import { Form } from "react-bootstrap";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import "./singlePoll.css";
import singlePoll from "../../redux/singlePoll/actions/singlePoll";
import voteCount from "../../redux/voteCount/actions/votecount";
import Header from "../Header/header";
import { emptyVoteCountSuccessStatus } from "../../redux/voteCount/actions/votecount";

const SinglePollPage = () => {
  const pollDetails = useSelector(
    (state) => state.singlePoll.singlePollDetails
  );
  const voteCountSuccessStatus = useSelector((state) => state.voteCount.status);
  const [disableChecked, setDisableChecked] = useState({
    disable: false,
    checked: false,
  });
  const dispatch = useDispatch();
  const { pollId } = useParams();
  useEffect(() => {
    dispatch(singlePoll(pollId));
    setDisableChecked({
      disable: JSON.parse(localStorage.getItem("disableChecked"))
        ? JSON.parse(localStorage.getItem("disableChecked")).disable
        : false,
      checked: JSON.parse(localStorage.getItem("disableChecked"))
        ? JSON.parse(localStorage.getItem("disableChecked")).checked
        : false,
    });
  }, []);

  useEffect(() => {
    voteCountSuccessStatus === 200 && dispatch(singlePoll(pollId));
    dispatch(emptyVoteCountSuccessStatus());
  }, [voteCountSuccessStatus]);

  return (
    <div>
      <Header />
      {pollDetails && (
        <div className="single-poll-container">
          <div className="single-poll-title">{pollDetails.title}</div>
          <div className="single-poll-radio-container">
            {pollDetails.optionList.map((element, index) => {
              return (
                <div className="single-poll-one-radio-container">
                  <Form.Check
                    key={element.id}
                    label={element.optionTitle}
                    disabled={disableChecked.disable}
                    checked={
                      element.id === disableChecked.checked ? true : false
                    }
                    onClick={() => {
                      setDisableChecked({ disable: true, checked: element.id });
                      localStorage.setItem(
                        "disableChecked",
                        JSON.stringify({ disable: true, checked: element.id })
                      );
                      dispatch(voteCount({ optionId: element.id }));
                    }}
                    name={`group-${index}`}
                    type="radio"
                    value={element.optionTitle}
                    className="single-poll-radio"
                  />
                  <div className="single-poll-vote-count">
                    {element.voteCount.length}
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
