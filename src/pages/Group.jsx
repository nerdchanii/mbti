import axios from "axios";
import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Layout from "../layout";

import { renderGraph } from "../utils/graph";
import ShareButton from "../components/ShareButton";
import { Button } from "@mui/material";

function Group() {
  const { groupId } = useParams();
  const [name, setName] = useState(undefined);
  useEffect(() => {
    (async () => {
      const response = await axios(
        `https://mbti-api.ttbkk.com/api/mbti/${groupId}`
      );
      const data = response.data;
      console.log(data);
      setName(data.group.name);
      renderGraph(data);
    })();
  }, []);

  const navigate = useNavigate();

  return (
    <Layout>
      <h2 style={{ textAlign: "center", marginTop: "1rem" }}>{name}</h2>
      <div id="mountNode" />
      <div style={{ textAlign: "center" }}>
        <Button
          onClick={() => navigate(`/group/${groupId}/add`)}
          variant={"contained"}
          color={"info"}
          size={"large"}
        >
          내 MBTI 추가하기
        </Button>
        <ShareButton name={name} />
      </div>
    </Layout>
  );
}

export default Group;
