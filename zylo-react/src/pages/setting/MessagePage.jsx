import React from "react";
import { BasicLayout } from "../../layouts/BasicLayout";
import SettingSideBar from "../../components/setting/SettingSideBar.jsx";
import { Message } from "../../components/setting/Message.jsx";

const MessagePage = () => {
  return (
    <BasicLayout title={"설정"}>
      <div id="setting-content-container">
        <SettingSideBar />
        <Message />
      </div>
    </BasicLayout>
  );
};

export default MessagePage;
