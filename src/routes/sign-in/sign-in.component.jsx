// import { useEffect } from "react";
// import { getRedirectResult } from "firebase/auth";

import {
  signInWithGooglePopup,
  createUserDocumentFromAuth,
} from "../../utils/firebase/firebase.utils";

import SignUpForm from "../../components/sign-up-form/sign-up-form.component";

const SignIn = () => {
  // useEffect(
  //   () => async () => {
  //     // After returning from the redirect when your app initializes you can obtain the result
  //     const result = await getRedirectResult(auth);
  //     console.log(result);
  //     if (result) {
  //       const userDocRef = await createUserDocumentFromAuth(result.user);
  //       //   // This gives you a Facebook Access Token.
  //       //   const credential = provider.credentialFromResult(auth, result);
  //       //   const token = credential.accessToken;
  //       // }
  //       // // As this API can be used for sign-in, linking and reauthentication,
  //       // // check the operationType to determine what triggered this redirect
  //       // // operation.
  //       // const operationType = result.operationType;
  //     }
  //   },
  //   []
  // );
  const logGoogleUser = async () => {
    const { user } = await signInWithGooglePopup();
    const userDocRef = await createUserDocumentFromAuth(user);
  };

  return (
    <div>
      <h1>Sign In Page</h1>
      <button onClick={logGoogleUser}>Sign In With Google Popup</button>
      {/* <button onClick={signInWithGoogleRedirect}>
        Sign In With Google Redirect
      </button> */}
      <SignUpForm />
    </div>
  );
};

export default SignIn;
