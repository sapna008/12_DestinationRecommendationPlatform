import React, { useState } from 'react';
import { auth } from '../../firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { useNavigate, Link } from 'react-router-dom';
import { Mail, Lock, UserPlus } from 'lucide-react';

const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      navigate('/dashboard');
    } catch (error) {
      setError('Failed to create account');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="backdrop-blur-sm p-8 rounded-2xl shadow-xl w-full max-w-md transform transition-all duration-300 hover:scale-[1.01] border border-white/20"
        style={{
          backgroundColor: 'rgba(0, 0, 0, 0.7)',
        }}>
        <div className="flex justify-center mb-8">
          <div className="p-4 rounded-full bg-pink-500/10">
            <UserPlus className="w-16 h-16 text-pink-400" />
          </div>
        </div>

        <h2 className="text-3xl font-bold text-center mb-2 text-white">Create Account</h2>
        <p className="text-center text-gray-300 mb-8">Join us to start your journey</p>

        {error && (
          <div className="mb-6 p-4 rounded-lg bg-red-500/20 border border-red-500/50 text-red-100">
            {error}
          </div>
        )}

        <form onSubmit={handleSignup} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Email Address
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-100 w-5 h-5" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="pl-10 pr-4 py-3 w-full rounded-lg border border-white/20 bg-black/60 text-white placeholder-gray-400 focus:border-pink-500 focus:ring-2 focus:ring-pink-500/20 transition-all duration-200"
                placeholder="Enter your email"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-100 w-5 h-5" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="pl-10 pr-4 py-3 w-full rounded-lg border border-white/20 bg-black/60 text-white placeholder-gray-400 focus:border-pink-500 focus:ring-2 focus:ring-pink-500/20 transition-all duration-200"
                placeholder="Enter your password"
                required
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-pink-500 text-white py-3 px-4 rounded-lg hover:bg-pink-400 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-offset-2 transform transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
          >
            Create Account
          </button>

          <p className="text-center text-gray-300">
            Already have an account?{' '}
            <Link to="/login" className="text-pink-400 hover:text-pink-300 font-semibold transition-colors duration-200">
              Sign in
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Signup;