import React from "react";
import Head from "next/head";
import styled from "styled-components";
import Button from "@mui/material/Button";
import { auth, provider } from "../firebase";
import { signInWithPopup, signOut } from "firebase/auth";

const Login = () => {
  // signOut(auth);
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
        <Logo src="logo.png" />
        <Button onClick={signIn} variant="outlined">
          Sign in with GOOGLE
        </Button>
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

const LoginContainer = styled.div`
  padding: 100px;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: white;
  border-radius: 5px;
  box-shadow: 0px 4px 14px -3px rgba(0, 0, 0, 0.7);
`;

const Logo = styled.img`
  height: 200px;
  width: 200px;
  margin-bottom: 50px;
`;
