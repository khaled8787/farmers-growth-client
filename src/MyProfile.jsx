import { useState, useContext, useEffect } from "react";
import { AuthContext } from "./AuthProvider";
import { toast } from "react-toastify";
import { Link } from "react-router";

const MyProfile = () => {
  const { user, setUser } = useContext(AuthContext); 
  const [editing, setEditing] = useState(false);
  const [name, setName] = useState("");
  const [photoURL, setPhotoURL] = useState("");
  
  useEffect(() => {
    if(user){
      setName(user.displayName || "");
      setPhotoURL(user.photoURL || "");
    }
  }, [user]);

  if (!user) {
    return <div className="text-center mt-20 text-red-500">Please login to view profile.</div>;
  }

  const handleSave = (e) => {
    e.preventDefault();
    try {
      if (user.updateProfile) {
        user.updateProfile({ displayName: name, photoURL });
      }

      setUser({ ...user, displayName: name, photoURL });
      toast.success("Profile updated successfully!");
      setEditing(false);
    } catch (err) {
      console.error(err);
      toast.error("Failed to update profile!");
    }
  };

  const displayPhoto = photoURL || "https://via.placeholder.com/150?text=Profile";

  return (
    <div className="max-w-3xl mx-auto mt-12 px-4">
      <h2 className="text-3xl font-bold text-green-700 mb-6">My Profile</h2>

      <div className="border p-6 rounded shadow bg-white">
        {!editing ? (
          <>
            <div className="flex items-center gap-4 mb-4">
              <img
                src={displayPhoto}
                alt="Profile"
                className="w-24 h-24 rounded-full object-cover"
              />
              <div>
                <p className="text-xl font-semibold">{user.displayName || "No Name"}</p>
                <p className="text-gray-600">{user.email}</p>
              </div>
            </div>

            <div className="flex gap-4 mt-4 flex-wrap">
              <button
                onClick={() => setEditing(true)}
                className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
              >
                Edit Profile
              </button>

              <Link
                to="/my-interests"
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
              >
                My Interests
              </Link>

              <Link
                to="/my-crops"
                className="bg-yellow-600 text-white px-4 py-2 rounded hover:bg-yellow-700 transition"
              >
                My Crops
              </Link>
            </div>
          </>
        ) : (
          <form onSubmit={handleSave} className="space-y-4">
            <div>
              <label className="block font-semibold mb-1">Name:</label>
              <input
                type="text"
                className="w-full border p-2 rounded"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>

            <div>
              <label className="block font-semibold mb-1">Email:</label>
              <input
                type="email"
                className="w-full border p-2 rounded bg-gray-100 cursor-not-allowed"
                value={user.email}
                readOnly
              />
            </div>

            <div>
              <label className="block font-semibold mb-1">Profile Picture URL:</label>
              <input
                type="text"
                className="w-full border p-2 rounded"
                value={photoURL}
                onChange={(e) => setPhotoURL(e.target.value)}
                placeholder="Enter image URL"
              />
              <p className="text-gray-500 text-sm mt-1">
                Paste an image URL to update profile picture.
              </p>
            </div>

            <div className="flex items-center gap-4 mt-2">
              <img
                src={displayPhoto}
                alt="Preview"
                className="w-20 h-20 rounded-full object-cover border"
              />
              <span>Preview</span>
            </div>

            <div className="flex gap-4 mt-4 flex-wrap">
              <button
                type="submit"
                className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
              >
                Save
              </button>
              <button
                type="button"
                onClick={() => setEditing(false)}
                className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700 transition"
              >
                Cancel
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default MyProfile;
