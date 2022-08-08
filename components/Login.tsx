import React from "react";
import Image from 'next/image';
import Head from "next/head";
import styled from "styled-components";
import Button from "@mui/material/Button";
import { auth, provider } from "../firebase";
import { signInWithPopup, signOut } from "firebase/auth";
import Logo from '../public/logo.png';

const Login = () => {
  const signIn = async () =>
    await signInWithPopup(auth, provider)
      .then((response) => {
        console.log("are we in", response);
      })
      .catch(alert);

  return (
    <Container>
      <Head>
        <title>Login</title>
      </Head>

      <LoginContainer>
        <Image src={Logo} width={200} height={200} alt="" />
        <ButtonMargin onClick={signIn} variant="outlined">
          Sign in with GOOGLE
        </ButtonMargin>
      </LoginContainer>
    </Container>
  );
};

export default Login;

const Container = styled.div`
  display: grid;
  place-items: center;
  height: 100vh;
  background-color: whitesmoke;
`;

const ButtonMargin = styled(Button)`
  margin-top: 50px;
`

const LoginContainer = styled.div`
  padding: 100px;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: white;
  border-radius: 5px;
  box-shadow: 0px 4px 14px -3px rgba(0, 0, 0, 0.7);
`;