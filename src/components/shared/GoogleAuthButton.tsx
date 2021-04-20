import { FC, MouseEvent } from "react";
import { FcGoogle } from "react-icons/fc";
import { GoogleAuthProvider, noterAuth } from "../../firebase";
import { UserCredential } from "@firebase/auth-types";
import createUser from "../../firebase/dbhelpers/createUser";

const GoogleAuthButton: FC = () => {

  const onGoogleSignInClick = (event: MouseEvent<HTMLButtonElement>) => {
    noterAuth
      .signInWithPopup(new GoogleAuthProvider())
      .catch((error) => {
        console.log(error);
      })
      .then((value) => {
        let { additionalUserInfo, user } = value as UserCredential;
        if (additionalUserInfo?.isNewUser) {
          createUser({
            uid: user?.uid as string,
            email: user?.email as string,
            dp: user?.photoURL,
            fullname: user?.displayName as string,
          });
        }
      });
  };

  return (
    <button
      onClick={onGoogleSignInClick}
      className="w-full transition-colors duration-500 hover:bg-yellow-500 hover:bg-opacity-10 text-center rounded h-12 border-2 border-yellow-500"
    >
      <FcGoogle size={24} className="inline mr-1" />
      <span className=" relative top-0.5 text-yellow-500 font-semibold text-lg">
        Continue with Google
      </span>
    </button>
  );
};

export default GoogleAuthButton;
