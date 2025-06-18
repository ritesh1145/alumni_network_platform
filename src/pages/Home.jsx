// src/pages/Home.jsx
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Home = () => {
  const { user } = useAuth();

  return (
    <div className="text-center py-12">
      <h1 className="text-4xl font-bold mb-6">Welcome to the Alumni Network</h1>
      <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
        Connect with your fellow alumni, stay updated with university events, and grow your professional network.
      </p>
      
      {user ? (
        <div>
          <Link
            to="/dashboard"
            className="bg-blue-600 text-white px-6 py-3 rounded-lg text-lg font-medium hover:bg-blue-700 inline-block"
          >
            Go to Dashboard
          </Link>
        </div>
      ) : (
        <div className="space-x-4">
          <Link
            to="/login"
            className="bg-blue-600 text-white px-6 py-3 rounded-lg text-lg font-medium hover:bg-blue-700 inline-block"
          >
            Login
          </Link>
          <Link
            to="/register"
            className="bg-white text-blue-600 px-6 py-3 rounded-lg text-lg font-medium border border-blue-600 hover:bg-blue-50 inline-block"
          >
            Register
          </Link>
        </div>
      )}
    </div>
  );
};

export default Home;