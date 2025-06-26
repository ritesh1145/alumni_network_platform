import { useEffect, useState } from 'react';
import { Search } from 'lucide-react';

const dummyUsers = [
  {
    id: 1,
    name: 'Aarav Mehta',
    degree: 'B.Tech CSE',
    graduationYear: 2020,
    job: 'Software Engineer at Infosys',
    profilePicture: 'https://i.pravatar.cc/150?img=4',
  },
  {
    id: 2,
    name: 'Riya Sharma',
    degree: 'BBA',
    graduationYear: 2019,
    job: 'Marketing Manager at Flipkart',
    profilePicture: 'https://i.pravatar.cc/150?img=5',
  },
  {
    id: 3,
    name: 'Karan Patel',
    degree: 'MBA',
    graduationYear: 2018,
    job: 'Product Lead at Zomato',
    profilePicture: 'https://i.pravatar.cc/150?img=6',
  },
];

const Directory = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filtered, setFiltered] = useState([]);

  useEffect(() => {
    // Replace with actual fetch: /api/users
    setFiltered(dummyUsers);
  }, []);

  const handleSearch = (e) => {
    const value = e.target.value.toLowerCase();
    setSearchTerm(value);

    const result = dummyUsers.filter(
      (u) =>
        u.name.toLowerCase().includes(value) ||
        u.degree.toLowerCase().includes(value) ||
        u.graduationYear.toString().includes(value)
    );
    setFiltered(result);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Alumni Directory</h1>

      {/* Search */}
      <div className="mb-6 relative max-w-md">
        <Search className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" />
        <input
          type="text"
          placeholder="Search by name, degree, year..."
          value={searchTerm}
          onChange={handleSearch}
          className="w-full p-3 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.length > 0 ? (
          filtered.map((user) => (
            <div key={user.id} className="bg-white shadow-md rounded-2xl p-5">
              <div className="flex items-center gap-4 mb-4">
                <img
                  src={user.profilePicture}
                  alt={user.name}
                  className="w-16 h-16 rounded-full object-cover border-2 border-blue-500"
                />
                <div>
                  <h2 className="text-lg font-semibold text-blue-700">{user.name}</h2>
                  <p className="text-gray-600">{user.degree}</p>
                  <p className="text-sm text-gray-500">Class of {user.graduationYear}</p>
                </div>
              </div>
              <p className="text-gray-700 text-sm">{user.job}</p>
            </div>
          ))
        ) : (
          <p className="text-gray-600">No alumni found.</p>
        )}
      </div>
    </div>
  );
};

export default Directory;