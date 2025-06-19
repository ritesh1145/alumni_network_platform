// src/pages/Directory.jsx
import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import AlumniCard from '../components/AlumniCard';

const Directory = () => {
  const { user } = useAuth();
  const [alumni, setAlumni] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterDepartment, setFilterDepartment] = useState('');
  const [filterBatch, setFilterBatch] = useState('');

  useEffect(() => {
    // Mock data - replace with actual API call
    const mockAlumni = [
      {
        id: '1',
        name: 'John Doe',
        email: 'john@example.com',
        batch: '2015',
        department: 'Computer Science',
        currentPosition: 'Software Engineer at Google',
        avatar: 'https://randomuser.me/api/portraits/men/1.jpg',
      },
      {
        id: '2',
        name: 'Jane Smith',
        email: 'jane@example.com',
        batch: '2016',
        department: 'Electrical Engineering',
        currentPosition: 'Electrical Engineer at Tesla',
        avatar: 'https://randomuser.me/api/portraits/women/1.jpg',
      },
      {
        id: '3',
        name: 'Mike Johnson',
        email: 'mike@example.com',
        batch: '2017',
        department: 'Mechanical Engineering',
        currentPosition: 'Mechanical Engineer at Boeing',
        avatar: 'https://randomuser.me/api/portraits/men/2.jpg',
      },
      {
        id: '4',
        name: 'Sarah Williams',
        email: 'sarah@example.com',
        batch: '2015',
        department: 'Business Administration',
        currentPosition: 'Marketing Manager at Amazon',
        avatar: 'https://randomuser.me/api/portraits/women/2.jpg',
      },
      {
        id: '5',
        name: 'David Brown',
        email: 'david@example.com',
        batch: '2018',
        department: 'Computer Science',
        currentPosition: 'Data Scientist at Facebook',
        avatar: 'https://randomuser.me/api/portraits/men/3.jpg',
      },
    ];
    setAlumni(mockAlumni);
    setLoading(false);
  }, []);

  const filteredAlumni = alumni.filter((alum) => {
    const matchesSearch = alum.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      alum.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      alum.currentPosition.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDepartment = filterDepartment ? alum.department === filterDepartment : true;
    const matchesBatch = filterBatch ? alum.batch === filterBatch : true;
    return matchesSearch && matchesDepartment && matchesBatch;
  });

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Alumni Directory</h1>
      
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <div>
            <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-1">
              Search
            </label>
            <input
              type="text"
              id="search"
              placeholder="Search by name, email, or position"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label htmlFor="department" className="block text-sm font-medium text-gray-700 mb-1">
              Department
            </label>
            <select
              id="department"
              value={filterDepartment}
              onChange={(e) => setFilterDepartment(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">All Departments</option>
              <option value="Computer Science">Computer Science</option>
              <option value="Electrical Engineering">Electrical Engineering</option>
              <option value="Mechanical Engineering">Mechanical Engineering</option>
              <option value="Civil Engineering">Civil Engineering</option>
              <option value="Business Administration">Business Administration</option>
            </select>
          </div>
          <div>
            <label htmlFor="batch" className="block text-sm font-medium text-gray-700 mb-1">
              Batch
            </label>
            <select
              id="batch"
              value={filterBatch}
              onChange={(e) => setFilterBatch(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">All Batches</option>
              <option value="2015">2015</option>
              <option value="2016">2016</option>
              <option value="2017">2017</option>
              <option value="2018">2018</option>
              <option value="2019">2019</option>
              <option value="2020">2020</option>
            </select>
          </div>
        </div>
      </div>

      {filteredAlumni.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredAlumni.map((alum) => (
            <AlumniCard key={alum.id} alumni={alum} />
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow-md p-6 text-center">
          <p className="text-gray-500">No alumni found matching your criteria</p>
        </div>
      )}
    </div>
  );
};

export default Directory;