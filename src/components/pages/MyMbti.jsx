import React, { useState } from "react";
import Layout from "../layout";
import ChooseCharacter from "../mbti/ChooseCharacter";
import Char from "../mbti/Char";
import "./myMbti.scss";
function MyMbti() {
  const [mbti, setMbti] = useState({});

  const onclick = (e) => {
    setMbti({
      ...mbti,
      [e.target.name]: e.target.value,
    });
    console.log(mbti);
  };

  const make = () => {};
  return (
    <Layout>
      <div className="select-section">
        <ChooseCharacter
          className="choose-container"
          name="IE"
          onClick={onclick}
          values={["I", "E"]}
        ></ChooseCharacter>
        <ChooseCharacter
          className="choose-container"
          name="SN"
          onClick={onclick}
          values={["S", "N"]}
        ></ChooseCharacter>
        <ChooseCharacter
          className="choose-container"
          name="TF"
          onClick={onclick}
          values={["T", "F"]}
        ></ChooseCharacter>
        <ChooseCharacter
          className="choose-container"
          name="JP"
          onClick={onclick}
          values={["J", "P"]}
        ></ChooseCharacter>
      </div>
      <div className="result-section">
        <Char char={mbti.IE} />
        <Char char={mbti.SN} />
        <Char char={mbti.TF} />
        <Char char={mbti.JP} />
      </div>
      <button onClick={make}></button>
    </Layout>
  );
}

export default MyMbti;
