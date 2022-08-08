import React from "react";
import styled from "styled-components";
import ChatIcon from "@mui/icons-material/Chat";
import SearchIcon from "@mui/icons-material/Search";
import MoreVertIcon from "@mui/icons-material/MoreVertRounded";
import { Avatar, Button, IconButton } from "@mui/material";
import { signOut } from "firebase/auth";
import * as EmailValidator from "email-validator";
import { addDoc, collection, query, where } from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollection } from "react-firebase-hooks/firestore";

import { db, auth } from "../firebase";

import Chat from '../components/Chat';

const Sidebar = () => {
  const [user] = useAuthState(auth);
  const chatsCollection = collection(db, "chats");
  const userChatRef = query(
    chatsCollection,
    where("users", "array-contains", user?.email)
  );
  const [chatsSnapshot] = useCollection(userChatRef);

  const createChat = () => {
    const input = prompt(
      "Please enter an email address for the user you with to chat with"
    );

    if (!input) return null;

    if (!user) return null;

    if (
      EmailValidator.validate(input) &&
      !chatAlreadyExist(input) &&
      input !== user.email
    ) {
      // we need to add the chat into the DB
      addDoc(collection(db, "chats"), {
        users: [user?.email, input],
      });
    }
  };

  const chatAlreadyExist = (recipientEmail: {}) => {
    return !!chatsSnapshot?.docs.find(
      (chat) =>
        chat.data().users.find((user: any) => user === recipientEmail)?.length >
        0
    );
  };

  return (
    <Container>
      <Header>
        <UserAvatar onClick={() => signOut(auth)} />
        <IconsContainer>
          <IconButton>
            <ChatIcon />
          </IconButton>
          <IconButton>
            <MoreVertIcon />
          </IconButton>
        </IconsContainer>
      </Header>
      <Search>
        <SearchIcon />
        <SearchInput placeholder="Search in chats" />
      </Search>

      <SidebarButton onClick={createChat}>Start a new chat</SidebarButton>

      {/* List of chats */}
      {chatsSnapshot?.docs.map(chat => (
        <Chat key={chat.id} id={chat.id} users={chat.data().users} />
      ))}
    </Container>
  );
};

export default Sidebar;

const Container = styled.div``;

const Search = styled.div`
  display: flex;
  align-items: center;
  padding: 5px;
  border-radius: 2px;
`;

const SidebarButton = styled(Button)`
  width: 100%;

  &&& {
    border-top: 1px solid whitesmoke;
    border-bottom: 1px solid whitesmoke;
  }
`;

const SearchInput = styled.input`
  outline-width: 0;
  border: none;
  flex: 1;
`;

const Header = styled.div`
  display: flex;
  position: sticky;
  top: 0;
  background-color: white;
  z-index: 1;
  justify-content: space-between;
  align-items: center;
  padding: 15px;
  height: 80px;
  border-bottom: 1px solid whitesmoke;
`;

const UserAvatar = styled(Avatar)`
  cursor: pointer;
  :hover {
    opacity: 0.8;
  }
`;

const IconsContainer = styled.div``;
