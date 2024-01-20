// EditProfile.tsx 파일 생성

import { useState } from "react";
import { auth } from "../firebase";
import { updateProfile } from "firebase/auth";

export default function EditProfile() {
  const user: any = auth.currentUser;
  const [newDisplayName, setNewDisplayName] = useState<string>(
    user?.displayName ?? ""
  );
  const [newPhotoURL, setNewPhotoURL] = useState<string>(user?.photoURL ?? "");

  const onSaveProfile = async () => {
    try {
      await updateProfile(user, {
        displayName: newDisplayName,
        photoURL: newPhotoURL,
      });

      window.history.back(); // 브라우저
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  return (
    <div>
      <h1>Edit Profile</h1>
      <label>
        Display Name:
        <input
          type="text"
          value={newDisplayName}
          onChange={(e) => setNewDisplayName(e.target.value)}
        />
      </label>
      <label>
        Photo URL:
        <input
          type="text"
          value={newPhotoURL}
          onChange={(e) => setNewPhotoURL(e.target.value)}
        />
      </label>
      <button onClick={onSaveProfile}>Save Profile</button>
    </div>
  );
}
