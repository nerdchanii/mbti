import React, { useState, useCallback } from "react";
import Layout from "../layout";
import ChooseCharacter from "../components/mbti/ChooseCharacter";
import Char from "../components/mbti/Char";
import Result from "../components/mbti/Result";
import "./myMbti.scss";
import axios from "axios";
import { useNavigate } from "react-router-dom";
function MyMbti() {
  const [mbti, setMbti] = useState({
    IE: "?",
    SN: "?",
    TF: "?",
    JP: "?",
  });
  const navigate = useNavigate();

  const onclick = (e) => {
    setMbti({
      ...mbti,
      [e.target.name]: e.target.value,
    });
    console.log(mbti);
  };
  const makeGroup = useCallback(async () => {
    const data = {
      mbti: Object.values(mbti).join(""),
      groupName: "테스트그룹",
      name: "정현",
    };
    const response = await axios.post(
      "https://mbti-api.ttbkk.com/api/mbti",
      data
    );
    const id = response.data.id;
    if (response.status === 201) {
      navigate(`/group/${id}`);
    }
  }, [mbti]);

  const make = () => {};
  return (
    <Layout>
      <div className="select-section">
        <ChooseCharacter
          name="IE"
          onClick={onclick}
          values={["I", "E"]}
        ></ChooseCharacter>
        <ChooseCharacter
          name="SN"
          onClick={onclick}
          values={["S", "N"]}
        ></ChooseCharacter>
        <ChooseCharacter
          name="TF"
          onClick={onclick}
          values={["T", "F"]}
        ></ChooseCharacter>
        <ChooseCharacter
          name="JP"
          onClick={onclick}
          values={["J", "P"]}
        ></ChooseCharacter>
      </div>
      <Result mbti={mbti} onclick={makeGroup} />
    </Layout>
  );
}

export default MyMbti;
