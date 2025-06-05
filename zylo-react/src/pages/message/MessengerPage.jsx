import React from "react";
import Messenger from "../../components/message/mainMessage/Messenger";
import { MessengerLayout } from "../../layouts/MessengerLayout";
import { ChatRoomProfile } from "../../components/message/mainMessage/ChatRoomProfile";

export const MessengerPage = () => {
  return (
    <MessengerLayout chatroomElements={<ChatRoomProfile />}>
      <Messenger />
    </MessengerLayout>
  );
};
