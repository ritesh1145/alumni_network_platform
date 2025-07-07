//layout
import { Outlet, Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Layout = () => {
  const { user, logout } = useAuth();
  const location = useLocation();

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Navigation Bar */}
      <nav className="bg-blue-700 text-white px-6 py-4 flex justify-between items-center shadow-md">
        {/* Logo or Title */}
        <div className="text-xl font-bold tracking-wide">
          <Link to="/" className="hover:text-blue-200 transition">
            Alumni Network
          </Link>
        </div>

        {/* Navigation Links */}
        <div className="space-x-6 text-sm font-medium">
          <Link
            to="/"
            className={`hover:underline ${location.pathname === '/' ? 'text-yellow-300' : ''
              }`}
          >
            Home
          </Link>

          {user && (
            <>
              <Link
                to="/profile"
                className={`hover:underline ${location.pathname === '/profile' ? 'text-yellow-300' : ''
                  }`}
              >
                Profile
              </Link>

              <Link
                to="/directory"
                className={`hover:underline ${location.pathname === '/directory' ? 'text-yellow-300' : ''
                  }`}
              >
                Directory
              </Link>

              <Link
                to="/events"
                className={`hover:underline ${location.pathname === '/events' ? 'text-yellow-300' : ''
                  }`}
              >
                Events
              </Link>

              <Link
                to="/jobs"
                className={`hover:underline ${location.pathname === '/jobs' ? 'text-yellow-300' : ''
                  }`}
              >
                Jobs
              </Link>

              {user.role === 'admin' && (
                <Link
                  to="/admin"
                  className={`hover:underline ${location.pathname === '/admin' ? 'text-yellow-300' : ''
                    }`}
                >
                  Admin
                </Link>
              )}
            </>
          )}

          {!user ? (
            <>
              <Link to="/login" className="hover:underline">
                Login
              </Link>
              <Link to="/register" className="hover:underline">
                Register
              </Link>
            </>
          ) : (
            <button
              onClick={logout}
              className="hover:underline ml-4 text-red-300"
            >
              Logout
            </button>
          )}
        </div>
      </nav>

      {/* Page Content */}
      <main className="flex-grow p-6">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="bg-blue-700 text-white text-center py-4 text-sm">
        &copy; {new Date().getFullYear()} Alumni Network. All rights reserved.
      </footer>
    </div>
  );
};

export default Layout;