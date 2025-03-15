import { useSelector, useDispatch } from "react-redux";
import InputField from "../components/InputField";
import { useState, useRef, useEffect } from "react";
import {
  startUpdateUserInfo,
  updateUserInfoError,
  updateUserInfoSuccess,
  uploadNewAvatarStart,
  uploadNewAvatarEnd,
} from "../redux/user/userSlice";
import supabase from "../supabase";

function Profile() {
  const { currentUser, loading, error } = useSelector((state) => state.user);
  const [formData, setFormData] = useState({
    username: currentUser.username,
    email: currentUser.email,
  });
  const dispatch = useDispatch();

  const fileRef = useRef(null);
  const [currentAvatarState, setCurrentAvatarState] = useState(
    currentUser.avatar
  );

  const onInputChange = (e) => {
    setFormData((previousFormData) => ({
      ...previousFormData,
      [e.target.name]: e.target.value,
    }));
  };

  const uploadAvatar = async (file) => {
    if (!file) return;
    dispatch(uploadNewAvatarStart());
    const fileName = `${currentUser._id}-${Date.now()}-${file.name}`;
    const { data, error } = await supabase.storage
      .from("mern-estate")
      .upload(fileName, file, {
        cacheControl: "3600",
        upsert: true,
      });

    if (error) {
      console.error("Upload error:", error);
      return;
    }

    const { data: urlData } = supabase.storage
      .from("mern-estate")
      .getPublicUrl(fileName);

    console.log(urlData);
    setCurrentAvatarState(urlData.publicUrl);
    dispatch(uploadNewAvatarEnd());
  };

  useEffect(() => {
    console.log(currentAvatarState);
  });

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    await uploadAvatar(file);
  };

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    dispatch(startUpdateUserInfo());
    /** Get the data that we'll send */
    try {
      const updatedData = {
        ...currentUser,
        username: formData.username,
        email: formData.email,
        avatar: currentAvatarState,
      };

      /** Send the request */
      const response = await fetch("/api/user/update", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedData),
      });

      /** Get the data */
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message);
      }
      dispatch(updateUserInfoSuccess(data.user));
    } catch (error) {
      dispatch(updateUserInfoError(error.message));
    }
  };

  return (
    <div className="mt-20 flex flex-col justify-center items-center w-[50%] mx-auto">
      <h1 className="text-4xl">Profile</h1>
      <input
        type="file"
        ref={fileRef}
        hidden
        accept="image/*"
        onChange={handleFileChange}
      />
      <img
        src={currentAvatarState}
        className="w-30 mt-5 rounded-full"
        onClick={() => {
          fileRef.current.click();
        }}
      />
      <form className="w-full flex flex-col items-center justify-center max-w-[400px]">
        <InputField
          label="username"
          value={formData.username}
          name="username"
          placeholder=""
          onChange={onInputChange}
        />
        <InputField
          label="email"
          value={formData.email}
          name="email"
          placeholder=""
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
