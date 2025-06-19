// src/components/AlumniCard.jsx
import { Link } from 'react-router-dom';

const AlumniCard = ({ alumni }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition duration-200">
      <div className="p-6">
        <div className="flex items-center mb-4">
          <img
            src={alumni.avatar}
            alt={alumni.name}
            className="w-16 h-16 rounded-full object-cover mr-4"
          />
          <div>
            <h3 className="text-lg font-semibold">{alumni.name}</h3>
            <p className="text-gray-600 text-sm">
              Batch of {alumni.batch} | {alumni.department}
            </p>
          </div>
        </div>
        <div className="mb-4">
          <p className="text-gray-700">
            <span className="font-medium">Current Position:</span> {alumni.currentPosition}
          </p>
        </div>
        <div className="flex justify-between items-center">
          <Link
            to={`/profile/${alumni.id}`}
            className="text-blue-600 hover:underline text-sm"
          >
            View Profile
          </Link>
          <a
            href={`mailto:${alumni.email}`}
            className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm hover:bg-blue-200 transition duration-200"
          >
            Contact
          </a>
        </div>
      </div>
    </div>
  );
};

export default AlumniCard;