import { useSelector, useDispatch } from "react-redux";
import InputField from "../components/InputField";
import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import {
  logout,
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
  const [selectedFile, setSelectedFile] = useState(null);
  const navigate = useNavigate();

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
      setSelectedFile(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await updateUserInfo();
    await updateAvatar();
  };

  const updateUserInfo = async () => {
    if (
      formData.username != currentUser.username ||
      formData.email != currentUser.email ||
      formData.password
    ) {
      try {
        dispatch(startUpdateUserInfo());
        const response = await fetch("/api/user/update", {
          method: "PUT",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ form: formData }),
        });

        const data = await response.json();
        if (!response.ok) {
          const error = new Error(data.message);
          error.statusCode = data.statusCode;
          throw error;
        }
        console.log(data);
        dispatch(updateUserInfoSuccess(data.user));
      } catch (error) {
        if (error.statusCode === 401) {
          dispatch(logout());
          navigate("/sign-in");
          return;
        }
        dispatch(updateUserInfoError(error.message));
      }
    }
  };

  const updateAvatar = async () => {
    if (selectedFile) {
      dispatch(startUpdateUserInfo());
      const fileForm = new FormData();
      fileForm.append("avatar", selectedFile);
      try {
        const response = await fetch("/api/user/update-avatar", {
          method: "PUT",
          credentials: "include",
          body: fileForm,
        });
        const data = await response.json();
        if (!response.ok) {
          throw new Error(data.message);
        }
        console.log(data);
        dispatch(updateUserInfoSuccess(data.user));
      } catch (error) {
        console.log(error);
        dispatch(updateUserInfoError(error.message));
      }
    }
  };
  return (
    <div className="mt-20 flex flex-col justify-center items-center w-[80%] mx-auto">
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
        className="w-full flex flex-col items-center justify-center"
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
          className="bg-blue-600 w-[98%] p-2 rounded-sm text-white cursor-pointer disabled:bg-blue-400 max-w-[400px]"
          {...(loading && { disabled: true })}
        >
          {loading ? "Loading..." : "apply changes"}
        </button>
      </form>
      <div className="flex w-full max-w-[400px] justify-between">
        <span className="text-red-400">delete account</span>
        <span className="text-red-400">Sign Out</span>
      </div>
      {error ? <span>{error}</span> : null}
    </div>
  );
}

export default Profile;
