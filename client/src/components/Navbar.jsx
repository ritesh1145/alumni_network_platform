//navbar
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const { user, logout } = useAuth() || {};

  return (
    <nav className="bg-white shadow-md py-4 px-6 flex justify-between items-center fixed w-full top-0 z-50">
      <div className="text-blue-600 font-bold text-xl">
        <Link to="/">AlumniConnect</Link>
      </div>

      <div className="space-x-4 text-sm">
        <Link to="/" className="hover:text-blue-600">Home</Link>
        <Link to="/directory" className="hover:text-blue-600">Directory</Link>
        <Link to="/events" className="hover:text-blue-600">Events</Link>
        <Link to="/jobs" className="hover:text-blue-600">Jobs</Link>

        {user ? (
          <>
            <Link to="/profile" className="hover:text-blue-600">Profile</Link>
            <button onClick={logout} className="text-red-500 ml-2">Logout</button>
          </>
        ) : (
          <>
            <Link to="/login" className="hover:text-blue-600">Login</Link>
            <Link to="/register" className="hover:text-blue-600">Register</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;