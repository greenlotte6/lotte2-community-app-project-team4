import React from "react";
import { BasicLayout } from "../../layouts/BasicLayout";
import SettingSideBar from "../../components/setting/SettingSideBar.jsx";
import { Message } from "../../components/setting/Message.jsx";

const MessagePage = () => {
  return (
    <BasicLayout title={"설정"}>
      <div id="setting-content-container">
        <SettingSideBar />
        <div className="message-scroll-container">
          <Message />
        </div>
      </div>
    </BasicLayout>
  );
};

export default MessagePage;
