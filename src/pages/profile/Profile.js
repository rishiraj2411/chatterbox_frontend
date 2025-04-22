import React, { useLayoutEffect, useState } from "react";
import Card from "../../components/global/card/Card";
import "./Profile.css";
import PageMenu from "../../components/pageMenu/PageMenu";
import Notification from "../../components/userDetails/notification/Notification";
import { useDispatch, useSelector } from "react-redux";
import { getUser, updateUser } from "../../redux/reducer/authSlice";
import { toast } from "react-toastify";
import useRedirectLoggedOutUser from "../../customHook/useRedirectLoggedOutUser";
import Skeleton from "react-loading-skeleton"; // Import the skeleton component
import 'react-loading-skeleton/dist/skeleton.css'

export const shortenText = (text, n) => {
  if (text.length > n) {
    const shortenedText = text.substring(0, n).concat("...");
    return shortenedText;
  }
  return text;
};

const Profile = () => {
  useRedirectLoggedOutUser("/login");
  const dispatch = useDispatch();

  const { user } =useSelector((state) => state.auth);

  const initialState = {
    name: user?.name || "",
    email: user?.email || "",
    phone: user?.phone || "",
    bio: user?.bio || "",
    photo: user?.photo || null,  
    role: user?.role || "",
    isVerified: user?.isVerified || false,
  };

  const [profile, setProfile] = useState(initialState);
  const [profileImage, setProfileImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [loading, setLoading] = useState(false); 

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfile({ ...profile, [name]: value });
  };

  const handleImageChange = async (e) => {
    const newProfileImage = e.target.files[0];
    setProfileImage(newProfileImage);
    setImagePreview(URL.createObjectURL(newProfileImage));
    setLoading(true); 

    try {
      const formData = new FormData();
      formData.append('photo', newProfileImage);

      // Make the API call to update the image
      await dispatch(updateUser(formData));
      toast.success("Profile image updated");
    } catch (error) {
      console.error("Error updating profile image:", error);
      toast.error("Failed to update profile image");
    } finally {
      setLoading(false); // Reset loading state after image upload
    }
  };

  const saveProfile = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append('name', profile.name);
      formData.append('phone', profile.phone);
      formData.append('bio', profile.bio);

      console.log(formData);

      setLoading(true); // Set loading state to true during profile update

      await dispatch(updateUser(formData));
      toast.success("User updated");

    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error("Failed to update profile");
    } finally {
      setLoading(false); // Reset loading state after profile update
    }
  };

  useLayoutEffect(() => {
    dispatch(getUser());
  }, [dispatch]);

  useLayoutEffect(() => {
    if (user) {
      setProfile({
        name: user.name || "",
        email: user.email || "",
        phone: user.phone || "",
        bio: user.bio || "",
        photo: user.photo || null,
        role: user.role || "",
        isVerified: user.isVerified || false,
      });
    }
  }, [user]); // ✅ ONLY 'user' here
  
  

  return (
    <>
      {!profile.isVerified && <Notification />}
      <section>
        <div className="container">
          <PageMenu />
          <h2>Profile</h2>

          <div className="--flex-start profile">
            <Card cardClass={"card"}>
              {user && (
                <div>
                  <div className="profile-photo">
                    <div>
                      {loading ? (
                        <>

                          <Skeleton width={200} height={200} circle={true} />
                        </>
                      ) : (
                        <img
                          src={
                            imagePreview === null ? user.photo?.url : imagePreview
                          }
                          alt="profilePic"
                        />
                      )}
                      <h3>Role: {user?.role}</h3>
                    </div>
                  </div>
               
                  <form onSubmit={saveProfile}>
                    <p>
                      <label>Change Photo:</label>
                      <input
                        type="file"
                        accept="image/*"
                        name="image"
                        onChange={handleImageChange}
                      />
                    </p>
                    <p>
                      <label>Name:</label>
                      <input
                        type="text"
                        name="name"
                        value={profile.name}
                        onChange={handleInputChange}
                      />
                    </p>
                    <p>
                      <label>Email:</label>
                      <input
                        type="text"
                        name="name"
                        value={profile?.email}
                        onChange={handleInputChange}
                        disabled
                      />
                    </p>
                    <p>
                      <label>Phone:</label>
                      <input
                        type="text"
                        name="phone"
                        value={profile?.phone}
                        onChange={handleInputChange}
                      />
                    </p>
                    <p>
                      <label>Bio:</label>
                      <textarea
                        name="bio"
                        value={profile?.bio}
                        onChange={handleInputChange}
                        cols="30"
                        rows="10"
                      ></textarea>
                    </p>
                    <button className="--btn --btn-block --btn-primary">
                      Update Profile
                    </button>
                  </form>
                </div>
              )}
            </Card>
          </div>
        </div>
      </section>
    </>
  );
};

export const UserName = () => {
  const { user } = useSelector((state) => state.auth);

  const username = user?.name || "...";
  return <p className="--color-white">Hi, {shortenText(username, 10)} |</p>;
};

export default Profile;
