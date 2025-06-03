import React from "react";
import { MessengerContent } from "../components/common/MessengerContent";
import { SideBar } from "../components/common/SideBar";

export const MessengerLayout = ({ chatroomElements, children }) => {
  return (
    <div id="container">
      <SideBar />
      <MessengerContent
        chatroomElements={chatroomElements}   
        content={children}
      />
    </div>
  );
};
