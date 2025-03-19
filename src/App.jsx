import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Auth/Login';
import Signup from './components/Auth/Signup';
import SurveyForm from './components/Survey/SurveyForm';
import RecommendationPage from './components/Recommendations/RecommendationPage';
import { auth } from './firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import ParticlesComponent from './components/Particle';

function PrivateRoute({ children }) {
  const [user, loading] = useAuthState(auth);

  if (loading) {
    return <div className="text-white">Loading...</div>;
  }

  if (!user) {
    return <Navigate to="/login" />;
  }

  return children;
}

function App() {
  return (
    <div className="relative min-h-screen">
      <ParticlesComponent id="tsparticles" theme="dark" />
      <div className="relative z-10">
        <Router>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route
              path="/survey"
              element={
                <PrivateRoute>
                  <SurveyForm />
                </PrivateRoute>
              }
            />
            <Route
              path="/recommendations"
              element={
                <PrivateRoute>
                  <RecommendationPage />
                </PrivateRoute>
              }
            />
            <Route path="/" element={<Navigate to="/login" />} />
          </Routes>
        </Router>
      </div>
    </div>
  );
}

export default App;