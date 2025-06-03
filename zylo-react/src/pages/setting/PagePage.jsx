import React from "react";
import { BasicLayout } from "../../layouts/BasicLayout";
import SettingSideBar from "../../components/setting/SettingSideBar.jsx";
import Page from "../../components/setting/Page.jsx";

const PagePage = () => {
  return (
    <BasicLayout title={"설정"}>
      <div id="setting-content-container">
        <SettingSideBar />
        <Page />
      </div>
    </BasicLayout>
  );
};

export default PagePage;
