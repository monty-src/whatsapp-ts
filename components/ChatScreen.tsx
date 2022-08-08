import React from "react";
import { useRouter } from "next/router";
import { useAuthState } from "react-firebase-hooks/auth";
import styled from "styled-components";
import { IconButton } from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVertSharp";
import AttachFileIcon from "@mui/icons-material/AttachFileRounded";

import { db, auth } from "../firebase";
import { Avatar } from "@mui/material";
import { collection, query, orderBy } from "firebase/firestore";
import { useCollection } from "react-firebase-hooks/firestore";
import Message from '../components/Message';
import { InsertEmoticon } from "@mui/icons-material";

const ChatScreen = ({ chat, messages }: any) => {
  const [user] = useAuthState(auth);
  const router = useRouter();
  const messageCollection = collection(db, `chat/${router.query.id}/messages`);
  const queryMessagesCollection = query(
    messageCollection,
    orderBy("timestamp", "asc")
  );
  const [messagesSnapshot] = useCollection(queryMessagesCollection);

  console.log(user);
  console.log(messagesSnapshot);

  const showMessages = () => {
    if (messagesSnapshot) {
      return messagesSnapshot.docs.map((message) => (
        <Message key={message.id} user={messages.data().user} message={{
          ...messages.data(),
          timestamp: message.data().timestamp?.toDate().getTime()
        }}></Message>
      ));
    }
    return;
  };

  return (
    <Container>
      <Header>
        <Avatar />
        <HeaderInformation>
          <h3>Rec Email</h3>
          <p>Last seen ...</p>
        </HeaderInformation>
        <HeaderIcons>
          <IconButton>
            <AttachFileIcon />
          </IconButton>
          <IconButton>
            <MoreVertIcon />
          </IconButton>
        </HeaderIcons>
      </Header>
      <MessageContainer>
        {showMessages()}
        <EndOfMessage />
      </MessageContainer>
      <InputContainer>
        <InsertEmoticon />
        <Input />
      </InputContainer>
    </Container>
  );
};

export default ChatScreen;

const Input = styled.input`
  flex: 1;
  outline: 0;
  border: none;
  border-radius: 10px;
  background-color: whitesmoke;
  padding: 20px;
  margin-left: 15px;
  margin-right: 15px;
`;

const InputContainer = styled.form`
  display: flex;
  align-items: center;
  padding: 10px;
  position: sticky;
  bottom: 0;
  background-color: white;
  z-index: 100;
`;



const Container = styled.div``;

const Header = styled.div`
  position: sticky;
  background-color: white;
  z-index: 100;
  top: 0;
  display: flex;
  padding: 11px;
  height: 80px;
  align-items: center;
  border-bottom: 1px solid whitesmoke;
`;

const HeaderInformation = styled.div`
  margin-left: 15px;
  flex: 1;

  > h3 {
    margin-bottom: 3px;
  }

  > p {
    font-size: 14px;
    color: gray;
  }
`;

const EndOfMessage = styled.div``;
const MessageContainer = styled.div`
  padding: 30px;
  background-color: #E5DED8;
  min-height: 90vh;
`;

const HeaderIcons = styled.div``;
