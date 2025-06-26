import { useState } from 'react';
import { Mail, Lock } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { login as loginApi } from '../api/auth'; // rename to avoid name conflict
import { useAuth } from '../context/AuthContext'; // ✅ use context

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const { login } = useAuth(); // ✅ get context login method

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      setError('Please enter both email and password.');
      return;
    }

    try {
      const data = await loginApi(email, password); // returns { token, user }
      login(data.user, data.token); // ✅ update context

      setError('');
      navigate('/profile');
    } catch (err) {
      console.error('Login failed:', err);
      setError('Login failed. Please check your credentials.');
    }
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen flex items-center justify-center bg-gray-50 pt-20 px-4">
        <div className="flex w-full max-w-4xl shadow-lg rounded-2xl overflow-hidden bg-white">
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
                  className="pl-10 w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div className="relative">
                <Lock className="absolute top-3.5 left-3 w-5 h-5 text-gray-400" />
                <input
                  type="password"
                  placeholder="Password"
                  className="pl-10 w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              <button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-lg font-medium transition duration-300"
              >
                Sign In
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
    </>
  );
};

export default Login;