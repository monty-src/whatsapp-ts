import { NextPage } from "next";
import Head from "next/head";
import styled from "styled-components";
import {
  doc,
  getDoc,
  query,
  orderBy,
  collection,
  getDocs,
} from "firebase/firestore";
import Sidebar from "../../components/Sidebar";
import ChatScreen from "../../components/ChatScreen";
import { db } from "../../firebase";

const Chat: NextPage = () => {
  return (
    <Container>
      <Head>
        <title>Chat</title>
      </Head>
      <Sidebar />
      <ChatContainer>
        <ChatScreen />
      </ChatContainer>
    </Container>
  );
};

export default Chat;

export async function getServerSideProps(context: any) {
  console.log('context: ', context.query);
  const messagesCollection = collection(
    db,
    "chats",
    context.query.id,
    "messages"
  );
  const queryMessagesCollection = query(
    messagesCollection,
    orderBy("timestamp", "asc")
  );
  const messagesResponse = await getDocs(queryMessagesCollection);

  const messages = messagesResponse.docs
    .map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }))
    .map((messages: any) => ({
      ...messages,
      timestamp: messages.timestamp.toDate().getTime(),
    }));
  
  return {
    props: {},
  };
}

const Container = styled.div`
  display: flex;
`;

const ChatContainer = styled.div`
  flex: 1;
  overflow: scroll;
  height: 100vh;

  ::-webkit-scrollbar {
    display: none;
  }
  -ms-overflow-style: none;
  scrollbar-width: none;
`;
