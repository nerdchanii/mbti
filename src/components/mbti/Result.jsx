import React from "react";
import Char from "./Char";
import "./mbti.scss";

function Result(props) {
  const { mbti, onclick } = props;

  if (!mbti) return <></>;

  return (
    <>
      <div className="result-section">
        <Char char={mbti.IE} />
        <Char char={mbti.SN} />
        <Char char={mbti.TF} />
        <Char char={mbti.JP} />
      </div>
      <div className="result-button">
        <button onClick={onclick}>궁합 보러가기</button>
      </div>
    </>
  );
}

export default Result;
