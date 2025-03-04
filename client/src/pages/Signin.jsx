import InputField from "../components/InputField";
import { Link } from "react-router-dom";
import { useState } from "react";
import PopUpHelper from "../utils/PopUpHelper.jsx";
import { formDataCheker } from "../utils/formDataCheker.js";

function Signin() {
  const [formState, setFormState] = useState({
    username: "",
    password: "",
  });

  const [popUp, setPopUp] = useState({
    message: "",
    error: true,
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormState({
      ...formState,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    setLoading(true);
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
      console.log(data);
      if (!response.ok) {
        throw new Error(data.message);
      }
      setPopUp({ message: data.message, error: false });
      setLoading(false);
      setTimeout(() => {
        setPopUp({ message: "", error: false });
      }, 2000);
    } catch (error) {
      setPopUp({ message: error.message, error: true });
      setLoading(false);
      setTimeout(() => {
        setPopUp({ message: "", error: false });
      }, 2000);
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
      <h1 className="text-2xl">Signin</h1>
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
      <a
        href="https://google.com"
        className="bg-red-600 w-[98%] p-2 rounded-sm text-white text-center hover:opacity-80 cursor-pointer"
      >
        Continue with google
      </a>
      <div>
        <p>
          Don't have an account?{" "}
          <Link to="/sign-up" className="text-blue-500 hover:underline">
            Sign up
          </Link>
        </p>
        {popUp.message ? (
          <p className="text-center text-red-500">{popUp.message}</p>
        ) : null}
      </div>
    </form>
  );
}

export default Signin;
