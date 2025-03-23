import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { app } from "../firebase.js";
import { useDispatch } from "react-redux";
import {
  signInSuccess,
  signInError,
  signInStart,
} from "../redux/user/userSlice.js";
import { useNavigate } from "react-router-dom";

function oAuth() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleGoogleClick = async () => {
    try {
      dispatch(signInStart());
      const provider = new GoogleAuthProvider();
      const auth = getAuth(app);
      const result = await signInWithPopup(auth, provider);

      const res = await fetch("api/auth/google", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: result.user.displayName,
          email: result.user.email,
          photo: result.user.photoURL,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.message);
      }
      navigate("/");
      console.log(data);
      dispatch(signInSuccess(data.user));
    } catch (error) {
      dispatch(signInError(error.message));
      setTimeout(() => {
        dispatch(signInError(null));
      });
    }
  };

  return (
    <button
      type="button"
      onClick={handleGoogleClick}
      className="bg-red-600 w-[98%] p-2 rounded-sm text-white text-center hover:opacity-80 cursor-pointer"
    >
      Continue with google
    </button>
  );
}

export default oAuth;
