import React, { useEffect, useState } from 'react';
import { auth, database } from '../../firebase';
import { ref, get } from 'firebase/database';
import { MapPin, Calendar, Users, DollarSign, Compass } from 'lucide-react';

const destinations = {
  luxury: {
    summer: ['Maldives', 'Santorini', 'Dubai'],
    winter: ['Swiss Alps', 'Aspen', 'Paris'],
    spring: ['Tokyo', 'Venice', 'Monaco'],
    fall: ['Tuscany', 'Provence', 'New York']
  },
  adventure: {
    summer: ['Costa Rica', 'Iceland', 'New Zealand'],
    winter: ['Nepal', 'Patagonia', 'Norway'],
    spring: ['Peru', 'Thailand', 'Morocco'],
    fall: ['South Africa', 'Tanzania', 'Vietnam']
  },
  budget: {
    summer: ['Bali', 'Portugal', 'Croatia'],
    winter: ['Mexico', 'Cambodia', 'Philippines'],
    spring: ['Greece', 'Turkey', 'Spain'],
    fall: ['India', 'Colombia', 'Czech Republic']
  },
  cultural: {
    summer: ['Rome', 'Barcelona', 'Amsterdam'],
    winter: ['Kyoto', 'Vienna', 'Budapest'],
    spring: ['Istanbul', 'Seoul', 'Cairo'],
    fall: ['Berlin', 'Edinburgh', 'Marrakech']
  }
};

const RecommendationPage = () => {
  const [recommendations, setRecommendations] = useState([]);
  const [userPreferences, setUserPreferences] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserPreferences = async () => {
      const user = auth.currentUser;
      if (user) {
        const surveyRef = ref(database, `surveys/${user.uid}`);
        try {
          const snapshot = await get(surveyRef);
          if (snapshot.exists()) {
            const data = snapshot.val();
            setUserPreferences(data);
            
            const recommendedPlaces = destinations[data.travelStyle]?.[data.preferredSeason] || [];
            setRecommendations(recommendedPlaces.map(place => ({
              name: place,
              image: 'https://www.shutterstock.com/shutterstock/photos/2284975487/display_1500/stock-vector-group-of-travelers-is-depicted-around-an-earth-globe-with-various-travel-items-image-promoting-2284975487.jpg',
              description: `Experience the beauty and charm of ${place}. Perfect for ${data.travelStyle} travelers during ${data.preferredSeason}.`
            })));
          }
        } catch (error) {
          console.error('Error fetching preferences:', error);
        }
        setLoading(false);
      }
    };

    fetchUserPreferences();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-2xl text-white">Loading recommendations...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-center mb-8">
          <div className="p-4 rounded-full bg-pink-500/10">
            <Compass className="w-16 h-16 text-pink-400" />
          </div>
        </div>

        <h1 className="text-4xl font-bold text-center mb-2 text-white">Your Perfect Destinations</h1>
        <p className="text-center text-gray-300 mb-8">Personalized travel recommendations based on your preferences</p>
        
        {userPreferences && (
          <div 
            className="backdrop-blur-sm rounded-2xl shadow-xl p-6 mb-8 border border-white/20"
            style={{
              backgroundColor: 'rgba(0, 0, 0, 0.4)',
            }}
          >
            <h2 className="text-2xl font-semibold mb-4 text-white">Your Travel Preferences</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="flex items-center text-gray-300">
                <MapPin className="w-5 h-5 mr-2 text-pink-400" />
                <span>Style: {userPreferences.travelStyle}</span>
              </div>
              <div className="flex items-center text-gray-300">
                <DollarSign className="w-5 h-5 mr-2 text-pink-400" />
                <span>Budget: {userPreferences.budget}</span>
              </div>
              <div className="flex items-center text-gray-300">
                <Users className="w-5 h-5 mr-2 text-pink-400" />
                <span>Group: {userPreferences.groupSize}</span>
              </div>
              <div className="flex items-center text-gray-300">
                <Calendar className="w-5 h-5 mr-2 text-pink-400" />
                <span>Season: {userPreferences.preferredSeason}</span>
              </div>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {recommendations.map((destination, index) => (
            <div 
              key={index} 
              className="backdrop-blur-sm rounded-2xl shadow-xl overflow-hidden border border-white/20 transform transition-all duration-300 hover:scale-[1.02]"
              style={{
                backgroundColor: 'rgba(0, 0, 0, 0.4)',
              }}
            >
              <img
                src={destination.image}
                alt={destination.name}
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2 text-white">{destination.name}</h3>
                <p className="text-gray-300 mb-4">{destination.description}</p>
                <button className="w-full bg-pink-500 text-white py-3 px-4 rounded-lg hover:bg-pink-400 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 transform transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center">
                  <MapPin className="w-5 h-5 mr-2" />
                  Learn More
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RecommendationPage;