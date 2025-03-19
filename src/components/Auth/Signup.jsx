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
      navigate('/survey');
    } catch (error) {
      setError('Failed to create account');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="bg-slate-900/80 backdrop-blur-sm p-8 rounded-lg shadow-2xl w-96 border border-slate-800">
        <h2 className="text-3xl font-bold text-center mb-6 text-white">Create Account</h2>
        {error && <p className="text-red-400 text-center mb-4">{error}</p>}
        <form onSubmit={handleSignup} className="space-y-4">
          <div>
            <label className="block text-slate-300 mb-2 flex items-center">
              <Mail className="w-4 h-4 mr-2" />
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2 rounded-md bg-slate-800/50 border-slate-700 text-white placeholder-slate-400 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
              required
            />
          </div>
          <div>
            <label className="block text-slate-300 mb-2 flex items-center">
              <Lock className="w-4 h-4 mr-2" />
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2 rounded-md bg-slate-800/50 border-slate-700 text-white placeholder-slate-400 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-emerald-600 to-emerald-700 text-white py-2 rounded-md hover:from-emerald-700 hover:to-emerald-800 transition-all duration-300 shadow-lg shadow-emerald-500/20 flex items-center justify-center"
          >
            <UserPlus className="w-4 h-4 mr-2" />
            Sign Up
          </button>
        </form>
        <p className="mt-4 text-center text-slate-400">
          Already have an account?{' '}
          <Link to="/login" className="text-emerald-400 hover:text-emerald-300 font-semibold">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;