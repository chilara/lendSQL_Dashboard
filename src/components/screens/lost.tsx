import { useNavigate } from "react-router-dom";
import lost from "../../images/svgs/lost.svg";

export const Lost = () => {
  const navigate = useNavigate();
  const onClickHandler = () => {
    if (localStorage.getItem("token")) {
      navigate("/auth/dashboard");
    } else {
      navigate("/login", { replace: true });
    }
  };
  return (
    <div className="flex h-full flex-justify-center flex-align-center work-sans flex-col pri-text-color-1">
      <img src={lost} alt="lost" />
      <h4>You look lost, click the button below for assistance</h4>
      <button
        onClick={onClickHandler}
        className="rounded-sm pointer p-9px text-white pri-bg-color-2"
      >
        Take Me Home
      </button>
    </div>
  );
};
