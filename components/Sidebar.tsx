import React from "react";
import { Avatar } from "@mui/material";
import styled from "styled-components";
import ChatIcon from '@mui/icons-material/Chat';
import MoreVertIcon from '@mui/icons-material/MoreVertRounded';

import { SidebarModel } from "../models/sidebar.models";

const Sidebar = () => {
  return (
    <Container>
      <Header>
        <UserAvatar />
        <IconsContainer>
          <ChatIcon />
          <MoreVertIcon />
        </IconsContainer>
      </Header>
    </Container>
  );
};

export default Sidebar;

const Container = styled.div``;
const Header = styled.div``;

const UserAvatar = styled(Avatar)``;
const IconsContainer = styled.div``;