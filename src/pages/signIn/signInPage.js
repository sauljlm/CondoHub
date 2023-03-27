import React from "react";
import { Routes, Route } from "react-router-dom";
import "firebaseui/dist/firebaseui.css";
import SignInSelection from "./signInSelection";
import SignInGoogle from "./signInGooglePage";
import SignInFacebook from "./signInFacebookPage";
import SignInEmail from "./signInEmailPage";

const SignIn = () => {
  return (
    <Routes>
      <Route path="/" element={<SignInSelection></SignInSelection>} />
      <Route path="/google" element={<SignInGoogle></SignInGoogle>} />
      <Route path="/facebook" element={<SignInFacebook></SignInFacebook>} />
      <Route path="/email" element={<SignInEmail></SignInEmail>} />
    </Routes>
  );
};

export default SignIn;
