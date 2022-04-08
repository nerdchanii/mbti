import axios from "axios";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Layout from "../layout";

function Group() {
  const { id } = useParams();
  const [users, setUsers] = useState([]);
  const [matches, setMatches] = useState([]);

  useEffect(() => {
    (async () => {
      const id = "055a8a88-7a9f-4522-9525-5a39a08699ed";
      const response = await axios(`https://mbti-api.ttbkk.com/api/mbti/${id}`);
      const data = await response.data;
      console.log(data.users);
      console.log(data.matches);
    })();
  }, []);

  if (!users || !matches) return <div>Group Loading...</div>;

  return (
    <Layout>
      <div style="padding: 0;">
        <div class="container" style="padding: 0;">
          <div id="mountNode" style="min-height: 240px;"></div>
        </div>
      </div>
    </Layout>
  );
}

export default Group;
