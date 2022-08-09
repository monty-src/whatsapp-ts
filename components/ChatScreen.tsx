import React, { useState } from "react";
import { useRouter } from "next/router";
import { useAuthState } from "react-firebase-hooks/auth";
import styled from "styled-components";
import { IconButton } from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVertSharp";
import AttachFileIcon from "@mui/icons-material/AttachFileRounded";
import getRecipientEmail from "../utils/getRecipientEmail";
import { db, auth } from "../firebase";
import { Avatar } from "@mui/material";
import TimeAgo from 'timeago-react';
import {
  doc,
  where,
  setDoc,
  collection,
  query,
  orderBy,
  serverTimestamp,
  addDoc,
} from "firebase/firestore";
import { useCollection } from "react-firebase-hooks/firestore";
import Message from "../components/Message";
import { InsertEmoticon } from "@mui/icons-material";

const ChatScreen = ({ chat, messages }: any) => {
  const [user] = useAuthState(auth);
  const [input, setInput] = useState<string>("");
  const router = useRouter();
  const messagesCollection = collection(
    db,
    `chats/${router.query.id}/messages`
  );
  const usersCollection = collection(db, "users");
  const queryMessagesCollection = query(
    messagesCollection,
    orderBy("timestamp", "asc")
  );
  const queryUsersCollection = query(
    usersCollection,
    where("email", "==", getRecipientEmail(chat.users, user))
  );

  const [recipientSnapshot] = useCollection(queryUsersCollection);
  const [messagesSnapshot] = useCollection(queryMessagesCollection);

  const showMessages = () => {
    if (messagesSnapshot) {
      return messagesSnapshot.docs.map((message) => (
        <Message
          key={message.id}
          user={message.data().user}
          message={{
            ...message.data(),
            timestamp: message.data().timestamp?.toDate().getTime(),
          }}
        ></Message>
      ));
    }
    return JSON.parse(messages).map((message: any) => {
      return (
        <Message
          key={message.id}
          user={message.user}
          message={message}
        ></Message>
      );
    });
  };

  const sendMessage = async (e: any) => {
    e.preventDefault();
    await setDoc(
      doc(db, `users/${user?.uid}`),
      {
        lastSeen: serverTimestamp(),
      },
      { merge: true }
    );
    const messagesCollection = collection(
      db,
      `chats/${router.query.id}/messages`
    );
    await addDoc(messagesCollection, {
      timestamp: serverTimestamp(),
      message: input,
      user: user?.email,
      photoURL: user?.photoURL,
    });

    setInput("");
  };

  const recipient = recipientSnapshot?.docs?.[0]?.data();
  const recipientEmail = getRecipientEmail(chat.users, user);

  return (
    <Container>
      <Header>
        {recipient ? (
          <Avatar src={recipient?.photoURL} />
        ) : (
          <Avatar>{recipientEmail[0]}</Avatar>
        )}
        <HeaderInformation>
          <h3>{recipientEmail}</h3>
          {recipientSnapshot ? (
            <p>Last Active: {' '}
            {recipient?.lastSeen?.toDate() ? (
              <TimeAgo datetime={recipient?.lastSeen.toDate()} />
            ) : "Unavailable"} </p>
          ) : (
            <p>Loading Last active...</p>
          )}
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

        <Input
          value={input}
          onChange={(e: React.FormEvent<HTMLInputElement>) =>
            setInput((e.target as HTMLInputElement).value)
          }
        />
        <button type="submit" onClick={sendMessage}>
          Send Message
        </button>
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
  background-color: #e5ded8;
  min-height: 90vh;
`;

const HeaderIcons = styled.div``;
