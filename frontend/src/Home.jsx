import React from "react";
import LOCALIZE from "./text_resources";
import ContentContainer from "./components/commons/ContentContainer";
import LoginTabs from "./components/login/LoginTabs";

const Home = () => {
  return (
    <div className="app">
      <ContentContainer>
        <h1>{LOCALIZE.homePage.title}</h1>
        <p>{LOCALIZE.homePage.description}</p>
        <div>
          <LoginTabs />
        </div>
      </ContentContainer>
    </div>
  );
};

export default Home;
