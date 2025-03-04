import InputField from "../components/InputField";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import PopUpHelper from "../utils/PopUpHelper.jsx";
import { formDataCheker } from "../utils/formDataCheker.js";

function SignUp() {
  const [formState, setFormState] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [popUp, setPopUp] = useState({
    message: "",
    error: true,
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

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
      // Access the form data and check them
      const { email, username, password } = formState;
      formDataCheker(email, username, password);

      // Send the data to the server
      const response = await fetch("/api/auth/signup", {
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
      navigate("/sign-in");
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
      {popUp.message && (
        <PopUpHelper message={popUp.message} error={popUp.error} />
      )}
      <h1 className="text-2xl">Sign Up</h1>
      <InputField
        label="username"
        name="username"
        placeholder="johnMono"
        type="text"
        value={formState.username}
        onChange={handleChange}
      />
      <InputField
        label="email"
        name="email"
        placeholder="johnMono@gmail.com"
        type="text"
        value={formState.email}
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
        Sign Up
      </button>
      <a
        href="https://google.com"
        className="bg-red-600 w-[98%] p-2 rounded-sm text-white text-center hover:opacity-80 cursor-pointer"
      >
        Continue with google
      </a>
      <div>
        <p>
          Already have an account?{" "}
          <Link to="/sign-in" className="text-blue-500 hover:underline">
            Sign in
          </Link>
        </p>
      </div>
    </form>
  );
}

export default SignUp;
