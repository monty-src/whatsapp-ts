import "../styles/globals.css";
import React, { useEffect } from "react";
import type { AppProps } from "next/app";
import { useAuthState } from "react-firebase-hooks/auth";
import { db, auth, provider } from "../firebase";
import { doc, addDoc, serverTimestamp, setDoc } from "firebase/firestore";

import Login from "../components/Login";
import Loading from "../components/Loading";
import { signOut } from "firebase/auth";

function MyApp({ Component, pageProps }: AppProps) {
  const [user, loading] = useAuthState(auth);

  useEffect(() => {
    const request = async () => {
      if (user) {
        await setDoc(
          doc(db, "users", user.uid),
          {
            email: user?.email,
            lastSeen: serverTimestamp(),
            photoURL: user?.photoURL,
          },
          { merge: true }
        );
      }
    };

    request();
  }, [user]);

  // useEffect(() => {
  //   if (user) {

  //     addDoc(collection(db, "users", user.uid), {
  //       email: user.email,
  //       lastSeen: serverTimestamp(),
  //       photoURL: user.photoURL
  //     })
  //     .then(response => console.log(response))
  //     .catch(error => console.log(error));
  //   }
  // }, [user]);

  return <Login />
  if (loading) return <Loading />;
  if (!user) return <Login />;
  return <Component {...pageProps} />;
}

export default MyApp;
