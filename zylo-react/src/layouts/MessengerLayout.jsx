import React from "react";
import { MessengerHeader } from "../components/message/MessengerHeader";
import { MessengerContent } from "../components/common/MessengerContent";
import { SideBar } from "../components/common/SideBar";

export const MessengerLayout = ({ title, children }) => {
  return (
    <div id="container">
      <SideBar />
      <div className="content-container">
        <MessengerContent title={title} content={children} />
      </div>
    </div>
  );
};
