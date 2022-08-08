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
import { useAuthState } from "react-firebase-hooks/auth";
import Sidebar from "../../components/Sidebar";
import ChatScreen from "../../components/ChatScreen";
import { auth, db } from "../../firebase";
import getRecipientEmail from "../../utils/getRecipientEmail";

const Chat: NextPage = ({ chat, messages }: any) => {
  const [user] = useAuthState(auth);

  console.log(chat, messages);
  return (
    <Container>
      <Head>
        <title>Chat with {getRecipientEmail(chat.users, user)}</title>
      </Head>
      <Sidebar />
      <ChatContainer>
        <ChatScreen chat={chat} message={messages} />
      </ChatContainer>
    </Container>
  );
};

export default Chat;

export async function getServerSideProps(context: any) {
  const chatsRef = doc(db, `chats/${context.query.id}`);
  const messagesCollection = collection(
    db,
    `chats/${context.query.id}/ messages`
  );

  const queryMessagesCollection = query(
    messagesCollection,
    orderBy("timestamp", "asc")
  );

  const chatResponse = await getDoc(chatsRef);
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

  const chat = {
    id: chatResponse.id,
    ...chatResponse.data(),
  };

  return {
    props: {
      messages: JSON.stringify(messages),
      chat: chat,
    },
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
