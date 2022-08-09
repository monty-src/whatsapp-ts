import { CircleNotifications } from '@mui/icons-material';
import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import styled from 'styled-components';
import { auth } from '../firebase';

const Message = ({user, message}: any) => {
  const [userLoggedIn] = useAuthState(auth);
  
  const TypeOfMessage = user === userLoggedIn?.email ? Sender : Reciever;

  return (
    <Container>
      <TypeOfMessage>{message.message}</TypeOfMessage>
    </Container>
  )
}

export default Message;

const Container = styled.div``;

const MessageElement = styled.p`
  width: fit-content;
  padding: 15px;
  border-radius: 8px;
  margin: 10px;
  min-width: 60px;
  padding-bottom: 26px;
  position: relative;
  text-align: right;
`;

const Sender = styled(MessageElement)`
  margin-left: auto;
  background-color: #DCF8C6;
`;

const Reciever = styled(MessageElement)`
  background-color: whitesmoke;
  text-align: left;
`;