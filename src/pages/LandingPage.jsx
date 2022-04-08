import React from "react";
import Layout from "../layout";
import { Link } from "react-router-dom";
import "./LandingPage.scss";
import ShareButton from '../components/ShareButton';

function LandingPage() {
  return (
    <Layout className="landingPage">
      <h1>LandingPage</h1>
      <div className="buttonConatainer">
        <ShareButton name={'챠니친구'} />
        <button>
          <Link to="/mymbti">지금 테스트 시작하기</Link>
        </button>
      </div>
    </Layout>
  );
}

export default LandingPage;
