import React from "react";
import styled from "styled-components";
import { Avatar } from "@mui/material";
import getRecipientEmail from "../utils/getRecipientEmail";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase";

const Chat = ({ id, users }: { id: any; users: any }) => {
  const [user] = useAuthState(auth);
  const recipientEmail = getRecipientEmail(users, user);

  return (
    <Container>
      <UserAvatar />
      <p>{recipientEmail}</p>
    </Container>
  );
};

export default Chat;

const Container = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
  padding: 15px;
  word-break: break-word;

  :hover {
    background-color: #E9EAEB;
  }
`;

const UserAvatar = styled(Avatar)`
  margin: 5px;
  margin-right: 15px;
`;
