import React from "react";
import { BasicLayout } from "../../layouts/BasicLayout";
import SettingSideBar from "../../components/setting/SettingSideBar.jsx";
import Article from "../../components/setting/Article.jsx";

const ArticlePage = () => {
  return (
    <BasicLayout title={"설정"}>
      <div id="setting-content-container">
        <SettingSideBar />
        <div className="message-scroll-container">
          <Article />
        </div>
      </div>
    </BasicLayout>
  );
};

export default ArticlePage;
