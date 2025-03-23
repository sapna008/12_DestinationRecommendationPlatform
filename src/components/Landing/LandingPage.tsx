import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../../firebase';
import { Compass, MapPin, Globe, Plane } from 'lucide-react';

const LandingPage = () => {
  const navigate = useNavigate();
  const [user] = useAuthState(auth);

  const handleGetStarted = () => {
    if (user) {
      navigate('/dashboard');
    } else {
      navigate('/login');
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-black/40 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <Compass className="w-8 h-8 text-pink-400" />
              <span className="ml-2 text-xl font-bold text-white">TravelAI</span>
            </div>
            {!user && (
              <button
                onClick={() => navigate('/login')}
                className="px-4 py-2 rounded-lg bg-pink-500 text-white hover:bg-pink-400 transition-colors duration-200"
              >
                Login
              </button>
            )}
          </div>
        </div>
      </nav>

      <main className="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8 mt-16">
        <div className="text-center">
          <div className="flex justify-center mb-8">
            <div className="p-4 rounded-full bg-pink-500/10">
              <Globe className="w-16 h-16 text-pink-400" />
            </div>
          </div>
          
          <h1 className="text-5xl font-bold text-white mb-6">
            Discover Your Perfect Destination
          </h1>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Let AI guide you to your next adventure. Get personalized travel recommendations based on your preferences and interests.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
            <button
              onClick={handleGetStarted}
              className="flex items-center px-8 py-4 rounded-lg bg-pink-500 text-white hover:bg-pink-400 transition-all duration-200 transform hover:scale-105"
            >
              <Plane className="w-5 h-5 mr-2" />
              Start Your Journey
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {[
              {
                icon: <MapPin className="w-8 h-8 text-pink-400" />,
                title: "Personalized Recommendations",
                description: "Get tailored travel suggestions based on your preferences and travel style."
              },
              {
                icon: <Globe className="w-8 h-8 text-pink-400" />,
                title: "Worldwide Destinations",
                description: "Explore curated destinations from around the globe, perfect for your next adventure."
              },
              {
                icon: <Compass className="w-8 h-8 text-pink-400" />,
                title: "AI-Powered Insights",
                description: "Leverage advanced AI to discover hidden gems and perfect travel matches."
              }
            ].map((feature, index) => (
              <div
                key={index}
                className="p-6 backdrop-blur-sm rounded-xl border border-white/10 bg-black/40"
              >
                <div className="flex justify-center mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-300">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default LandingPage;