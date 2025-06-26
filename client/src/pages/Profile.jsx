import { useState } from 'react';
import { useAuth } from '../context/AuthContext';

const Profile = () => {
  const { user } = useAuth(); // Assuming user info is from context
  const [editMode, setEditMode] = useState(false);

  const [formData, setFormData] = useState({
    name: user?.name || '',
    degree: user?.degree || '',
    year: user?.graduationYear || '',
    job: user?.job || '',
    company: user?.company || '',
    bio: user?.bio || '',
  });

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSave = (e) => {
    e.preventDefault();
    // TODO: Send PATCH to /api/users/me
    console.log('Saving profile:', formData);
    setEditMode(false);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Your Profile</h1>

      <div className="bg-white shadow-lg rounded-2xl p-6 flex flex-col md:flex-row items-center gap-6">
        {/* Avatar */}
        <img
          src={user?.profilePicture || 'https://i.pravatar.cc/150?img=3'}
          alt="Profile"
          className="w-32 h-32 rounded-full object-cover border-4 border-blue-500"
        />

        {/* Info */}
        <div className="flex-1 w-full">
          {!editMode ? (
            <>
              <h2 className="text-xl font-semibold text-blue-700">{user?.name}</h2>
              <p className="text-gray-600 mb-1">{user?.degree} • Class of {user?.graduationYear}</p>
              <p className="text-gray-600 mb-1">{user?.job} at {user?.company}</p>
              <p className="text-gray-600">{user?.bio || 'No bio added yet.'}</p>

              <button
                onClick={() => setEditMode(true)}
                className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
              >
                Edit Profile
              </button>
            </>
          ) : (
            <form onSubmit={handleSave} className="space-y-4">
              <input
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Full Name"
                className="w-full p-3 border rounded-lg"
              />
              <input
                name="degree"
                value={formData.degree}
                onChange={handleChange}
                placeholder="Degree"
                className="w-full p-3 border rounded-lg"
              />
              <input
                name="year"
                value={formData.year}
                onChange={handleChange}
                placeholder="Graduation Year"
                className="w-full p-3 border rounded-lg"
              />
              <input
                name="job"
                value={formData.job}
                onChange={handleChange}
                placeholder="Current Job Title"
                className="w-full p-3 border rounded-lg"
              />
              <input
                name="company"
                value={formData.company}
                onChange={handleChange}
                placeholder="Company"
                className="w-full p-3 border rounded-lg"
              />
              <textarea
                name="bio"
                value={formData.bio}
                onChange={handleChange}
                placeholder="Short Bio"
                rows={3}
                className="w-full p-3 border rounded-lg"
              />

              <div className="flex gap-4">
                <button
                  type="submit"
                  className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
                >
                  Save
                </button>
                <button
                  type="button"
                  onClick={() => setEditMode(false)}
                  className="bg-gray-300 text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-400"
                >
                  Cancel
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;