import { useSelector, useDispatch } from "react-redux";
import InputField from "../components/InputField";
import { useState, useEffect, useRef } from "react";
import {
  startUpdateUserInfo,
  updateUserInfoError,
  updateUserInfoSuccess,
} from "../redux/user/userSlice";

function Profile() {
  // set the constants and States
  const { currentUser, loading, error } = useSelector((state) => state.user);
  const [formData, setFormData] = useState({
    username: currentUser.username,
    email: currentUser.email,
    password: "",
  });
  const fileRef = useRef();
  const dispatch = useDispatch();
  const [imageSrc, setImageSrc] = useState(currentUser.avatar);

  // Handle change, submit functions
  const onInputChange = (e) => {
    setFormData((previousFormData) => ({
      ...previousFormData,
      [e.target.name]: e.target.value,
    }));
  };

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setImageSrc(imageUrl);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);
    dispatch(startUpdateUserInfo());
    try {
      const response = await fetch("/api/user/update", {
        method: "PUT",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ formData }),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message);
      }
      dispatch(updateUserInfoSuccess(data.user));
    } catch (error) {
      console.log(error.message);
      dispatch(updateUserInfoError(error.message));
    }
  };
  return (
    <div className="mt-20 flex flex-col justify-center items-center w-[50%] mx-auto">
      <h1 className="text-4xl">Profile</h1>
      <input
        type="file"
        hidden
        accept="image/*"
        onChange={handleFileChange}
        ref={fileRef}
      />
      <img
        src={imageSrc}
        className="w-30 mt-5 rounded-full"
        onClick={() => {
          fileRef.current.click();
        }}
      />
      <form
        className="w-full flex flex-col items-center justify-center max-w-[400px]"
        onSubmit={handleSubmit}
      >
        <InputField
          label="username"
          value={formData.username}
          name="username"
          type="text"
          placeholder=""
          onChange={onInputChange}
        />
        <InputField
          label="email"
          value={formData.email}
          type="email"
          name="email"
          placeholder=""
          onChange={onInputChange}
        />
        <InputField
          label="password"
          value={formData.password}
          name="password"
          type="password"
          placeholder="John02193_"
          onChange={onInputChange}
        />
        <button
          type="submit"
          className="bg-blue-600 w-[98%] p-2 rounded-sm text-white cursor-pointer disabled:bg-blue-400"
          {...(loading && { disabled: true })}
        >
          {loading ? "Loading..." : "apply changes"}
        </button>
      </form>
      <div className="flex w-full max-w-[400px] justify-between">
        <span className="text-red-400">delete account</span>
        <span className="text-red-400">Sign Out</span>
      </div>
    </div>
  );
}

export default Profile;
