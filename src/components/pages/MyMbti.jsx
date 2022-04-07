import React, { useState } from "react";
import ChooseCharacter from "../ChooseCharacter";
import Layout from "../layout";

function MyMbti() {
  const [mbti, setMbti] = useState({});

  const onclick = (e) => {
    setMbti({
      ...mbti,
      [e.target.name]: e.target.value,
    });
    console.log(mbti);
  };
  return (
    <Layout>
      <div>
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
      <div>
        <span>{mbti.IE}</span>
        <span>{mbti.SN}</span>
        <span>{mbti.TF}</span>
        <span>{mbti.JP}</span>
      </div>
    </Layout>
  );
}

export default MyMbti;
