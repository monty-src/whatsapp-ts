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
        <EndOfMessage />
      </MessageContainer>
    </Container>
  );
};

export default ChatScreen;

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
const MessageContainer = styled.div``;

const HeaderIcons = styled.div``;
