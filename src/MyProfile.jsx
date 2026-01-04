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
    return (
      <div className="text-center mt-20 text-red-500 text-lg font-medium">
        Please login to view your profile.
      </div>
    );
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
      <h2 className="text-4xl font-extrabold text-green-700 mb-8 text-center">
        My Profile
      </h2>

      <div className="bg-gray-800 rounded-2xl shadow-2xl p-8 border border-gray-200">
        {!editing ? (
          <>
            {/* Profile Info */}
            <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
              <div className="relative">
                <img
                  src={displayPhoto}
                  alt="Profile"
                  className="w-32 h-32 rounded-full object-cover shadow-lg border-4 border-green-200 transform hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="flex-1 text-center md:text-left">
                <p className="text-2xl font-semibold text-green-700">{user.displayName || "No Name"}</p>
                <p className="text-gray-600 mt-1">{user.email}</p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap justify-center md:justify-start gap-4 mt-8">
              <button
                onClick={() => setEditing(true)}
                className="bg-green-600 text-white px-5 py-2 rounded-xl shadow-lg hover:shadow-2xl hover:scale-105 transform transition duration-300"
              >
                Edit Profile
              </button>

              <Link
                to="/my-interests"
                className="bg-blue-600 text-white px-5 py-2 rounded-xl shadow-lg hover:shadow-2xl hover:scale-105 transform transition duration-300"
              >
                My Interests
              </Link>

              <Link
                to="/my-crops"
                className="bg-yellow-600 text-white px-5 py-2 rounded-xl shadow-lg hover:shadow-2xl hover:scale-105 transform transition duration-300"
              >
                My Crops
              </Link>
            </div>
          </>
        ) : (
          <form onSubmit={handleSave} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block font-semibold mb-2">Name:</label>
                <input
                  type="text"
                  className="w-full border px-4 py-2 rounded-xl shadow-inner focus:ring-2 focus:ring-green-300 focus:outline-none transition"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>

              <div>
                <label className="block font-semibold mb-2">Email:</label>
                <input
                  type="email"
                  className="w-full border px-4 py-2 rounded-xl cursor-not-allowed shadow-inner"
                  value={user.email}
                  readOnly
                />
              </div>
            </div>

            <div>
              <label className="block font-semibold mb-2">Profile Picture URL:</label>
              <input
                type="text"
                className="w-full border px-4 py-2 rounded-xl shadow-inner focus:ring-2 focus:ring-green-300 focus:outline-none transition"
                value={photoURL}
                onChange={(e) => setPhotoURL(e.target.value)}
                placeholder="Enter image URL"
              />
              <p className="text-gray-500 text-sm mt-1">
                Paste an image URL to update your profile picture.
              </p>
            </div>

            <div className="flex items-center gap-4 mt-2">
              <img
                src={displayPhoto}
                alt="Preview"
                className="w-24 h-24 rounded-full object-cover border-2 border-green-200 shadow-lg"
              />
              <span className="text-gray-600 font-medium">Preview</span>
            </div>

            <div className="flex flex-wrap gap-4 mt-6">
              <button
                type="submit"
                className="bg-green-600 text-white px-6 py-2 rounded-xl shadow-lg hover:shadow-2xl hover:scale-105 transform transition duration-300"
              >
                Save
              </button>
              <button
                type="button"
                onClick={() => setEditing(false)}
                className="bg-gray-600 text-white px-6 py-2 rounded-xl shadow-lg hover:shadow-2xl hover:scale-105 transform transition duration-300"
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
