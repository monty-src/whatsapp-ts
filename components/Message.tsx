import { CircleNotifications } from '@mui/icons-material';
import React from 'react';
import styled from 'styled-components';

const Message = ({user, message}: any) => {
  console.log('user: ', user);
  console.log('message: ', message);
  return (
    <Container></Container>
  )
}

export default Message;

const Container = styled.div``;