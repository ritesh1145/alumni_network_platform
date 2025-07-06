import { useState } from 'react';
import { Mail, Lock } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { login as loginApi } from '../api/auth';
import { useAuth } from '../context/AuthContext';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      setError('Please enter both email and password.');
      return;
    }

    setLoading(true);
    try {
      const data = await loginApi(email, password);
      login(data.user, data.token);
      setError('');
      navigate('/profile');
    } catch (err) {
      console.error('Login failed:', err);
      setError('Login failed. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <div
        className="min-h-screen flex items-center justify-center pt-20 px-4 transition-all duration-500 bg-cover bg-center"
        style={{
          backgroundImage: "url('/assets/login-bckimg.jpg')"
        }}
      >
        <div className="flex w-full max-w-4xl rounded-2xl overflow-hidden bg-white border border-blue-300 transition-all duration-500 transform hover:-translate-y-1 hover:scale-105 shadow-[0_2px_6px_rgba(0,0,0,0.1)] hover:shadow-[0_10px_30px_rgba(30,64,175,0.5)] animate-fade-in-up">
          <div className="hidden md:block md:w-1/2 bg-blue-100">
            <img
              src="/assets/login-banner.jpg"
              alt="Login visual"
              className="h-full w-full object-cover"
            />
          </div>

          <div className="w-full md:w-1/2 p-8 md:p-12">
            <h2 className="text-3xl font-bold text-blue-600 text-center mb-4">Login</h2>
            <p className="text-center text-gray-500 mb-6 text-sm">
              Welcome back! Please enter your credentials.
            </p>

            {error && (
              <p className="text-red-500 text-sm mb-4 text-center">{error}</p>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="relative">
                <Mail className="absolute top-3.5 left-3 w-5 h-5 text-gray-400" />
                <input
                  type="email"
                  placeholder="Email"
                  className="pl-10 w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 hover:shadow-sm transition"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div className="relative">
                <Lock className="absolute top-3.5 left-3 w-5 h-5 text-gray-400" />
                <input
                  type="password"
                  placeholder="Password"
                  className="pl-10 w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 hover:shadow-sm transition"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              <button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-lg font-medium transition duration-300 flex items-center justify-center gap-2"
                disabled={loading}
              >
                {loading && (
                  <svg
                    className="animate-spin h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                    ></path>
                  </svg>
                )}
                {loading ? 'Signing in...' : 'Sign In'}
              </button>
            </form>

            <p className="text-sm text-center text-gray-600 mt-6">
              Don't have an account?{' '}
              <Link to="/register" className="text-blue-600 hover:underline">
                Register here
              </Link>
            </p>
          </div>
        </div>
      </div>

      <style>
        {`
          .animate-fade-in-up {
            opacity: 0;
            transform: translateY(20px);
            animation: fadeInUp 0.5s ease-out forwards;
          }

          @keyframes fadeInUp {
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
        `}
      </style>
    </>
  );
};

export default Login;
