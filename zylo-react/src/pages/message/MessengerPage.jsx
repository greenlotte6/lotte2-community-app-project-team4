import React from "react";
import Messenger from "../../components/message/mainMessage/Messenger";
import { MessengerLayout } from "../../layouts/MessengerLayout";
import { ChatRoomTItle } from "../../components/message/mainMessage/ChatRoomTItle";

export const MessengerPage = () => {
  return (
    <MessengerLayout chatroomElements={<ChatRoomTItle />}>
      <Messenger />
    </MessengerLayout>
  );
};
