import { ArrowLeftCircleFill } from "react-bootstrap-icons";
import { useNavigate } from "react-router-dom";
import "./backArrow.css";

const BackArrow = () => {
    const navigate = useNavigate()
    return (
            <ArrowLeftCircleFill className="back-arrow" onClick={() => navigate("/pollList")} />
    );
};

export default BackArrow;
