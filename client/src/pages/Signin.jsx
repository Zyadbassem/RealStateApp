import InputField from "../components/InputField";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  signInStart,
  signInSuccess,
  signInError,
} from "../redux/user/userSlice.js";
import AuthButton from "../components/oAuth.jsx";

function Signin() {
  const [formState, setFormState] = useState({
    username: "",
    password: "",
  });

  const dispatch = useDispatch();
  const { error, loading } = useSelector((state) => state.user);

  const handleChange = (e) => {
    setFormState({
      ...formState,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    dispatch(signInStart());
    e.preventDefault();
    try {
      // Send the data to the server
      const response = await fetch("/api/auth/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formState),
      });
      // Check for errors and popUp the message
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message);
      }
      dispatch(signInSuccess(data.user));
    } catch (error) {
      dispatch(signInError(error.message));
    }
  };
  return (
    <form
      className="
        flex
        flex-col
        items-center
        gap-3
        w-[100%]
        max-w-[400px]
        p-2
        justify-between 
        mx-auto
        mt-[5%]"
      onSubmit={handleSubmit}
    >
      <h1 className="text-2xl">Sign in</h1>
      <InputField
        label="username"
        name="username"
        placeholder="johnMono"
        type="text"
        value={formState.username}
        onChange={handleChange}
      />
      <InputField
        label="password"
        name="password"
        placeholder="johnMono01_"
        type="password"
        value={formState.password}
        onChange={handleChange}
      />
      <button
        type="submit"
        className="bg-blue-600 w-[98%] p-2 rounded-sm text-white cursor-pointer disabled:bg-blue-400"
        {...(loading && { disabled: true })}
      >
        {loading ? "Loading..." : "Sign in"}
      </button>
      <AuthButton />
      <div>
        <p>
          Don't have an account?{" "}
          <Link to="/sign-up" className="text-blue-500 hover:underline">
            Sign up
          </Link>
        </p>
        {error ? <p className="text-center text-red-500">{error}</p> : null}
      </div>
    </form>
  );
}

export default Signin;
