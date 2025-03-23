import React, { useState } from 'react';
import { auth, database } from '../../firebase';
import { ref, set } from 'firebase/database';
import { MapPin, DollarSign, Users, Compass, Calendar } from 'lucide-react';
import { generateDestinations } from '../../utils/genAI';

const SurveyForm = () => {
  const [formData, setFormData] = useState({
    travelStyle: '',
    budget: '',
    groupSize: '',
    interests: [],
    preferredSeason: '',
  });

  const handleInterestChange = (interest) => {
    const updatedInterests = formData.interests.includes(interest)
      ? formData.interests.filter(i => i !== interest)
      : [...formData.interests, interest];
    setFormData({ ...formData, interests: updatedInterests });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const user = auth.currentUser;
    if (user) {
      try {
        // Generate recommendations using Gemini
        const recommendations = await generateDestinations(formData);
        
        // Save recommendations and survey data
        await Promise.all([
          set(ref(database, `surveys/${user.uid}`), {
            ...formData,
            timestamp: Date.now(),
            userId: user.uid
          }),
          set(ref(database, `recommendations/${user.uid}`), {
            recommendations,
            timestamp: Date.now()
          })
        ]);

        // Force a reload of the recommendations
        window.location.reload();
      } catch (error) {
        console.error('Error saving survey:', error);
      }
    }
  };

  return (
    <div className="backdrop-blur-sm rounded-2xl shadow-xl p-8 border border-white/20"
      style={{
        backgroundColor: 'rgba(0, 0, 0, 0.4)',
      }}>
      <div className="flex justify-center mb-8">
        <div className="p-4 rounded-full bg-pink-500/10">
          <Compass className="w-16 h-16 text-pink-400" />
        </div>
      </div>

      <h2 className="text-3xl font-bold text-center mb-2 text-white">Travel Preferences</h2>
      <p className="text-center text-gray-300 mb-8">Tell us about your dream vacation</p>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-1 flex items-center">
            <Compass className="w-5 h-5 mr-2" />
            Travel Style
          </label>
          <select
            value={formData.travelStyle}
            onChange={(e) => setFormData({ ...formData, travelStyle: e.target.value })}
            className="w-full pl-4 pr-10 py-3 rounded-lg border border-white/20 bg-black/60 text-white focus:border-pink-500 focus:ring-2 focus:ring-pink-500/20 transition-all duration-200"
            required
          >
            <option value="">Select your travel style</option>
            <option value="luxury">Luxury</option>
            <option value="adventure">Adventure</option>
            <option value="budget">Budget</option>
            <option value="cultural">Cultural</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-1 flex items-center">
            <DollarSign className="w-5 h-5 mr-2" />
            Budget Range
          </label>
          <select
            value={formData.budget}
            onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
            className="w-full pl-4 pr-10 py-3 rounded-lg border border-white/20 bg-black/60 text-white focus:border-pink-500 focus:ring-2 focus:ring-pink-500/20 transition-all duration-200"
            required
          >
            <option value="">Select your budget range</option>
            <option value="economy">Economy ($0-$1000)</option>
            <option value="moderate">Moderate ($1000-$3000)</option>
            <option value="luxury">Luxury ($3000+)</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-1 flex items-center">
            <Users className="w-5 h-5 mr-2" />
            Group Size
          </label>
          <select
            value={formData.groupSize}
            onChange={(e) => setFormData({ ...formData, groupSize: e.target.value })}
            className="w-full pl-4 pr-10 py-3 rounded-lg border border-white/20 bg-black/60 text-white focus:border-pink-500 focus:ring-2 focus:ring-pink-500/20 transition-all duration-200"
            required
          >
            <option value="">Select group size</option>
            <option value="solo">Solo</option>
            <option value="couple">Couple</option>
            <option value="family">Family</option>
            <option value="group">Large Group</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-3">Interests</label>
          <div className="grid grid-cols-2 gap-4">
            {['Beach', 'Mountains', 'Cities', 'Culture', 'Food', 'Adventure', 'Relaxation', 'Shopping'].map((interest) => (
              <label key={interest} className="flex items-center space-x-2 text-gray-300">
                <input
                  type="checkbox"
                  checked={formData.interests.includes(interest)}
                  onChange={() => handleInterestChange(interest)}
                  className="form-checkbox h-5 w-5 text-pink-500 rounded border-white/20 bg-black/60"
                />
                <span>{interest}</span>
              </label>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-1 flex items-center">
            <Calendar className="w-5 h-5 mr-2" />
            Preferred Season
          </label>
          <select
            value={formData.preferredSeason}
            onChange={(e) => setFormData({ ...formData, preferredSeason: e.target.value })}
            className="w-full pl-4 pr-10 py-3 rounded-lg border border-white/20 bg-black/60 text-white focus:border-pink-500 focus:ring-2 focus:ring-pink-500/20 transition-all duration-200"
            required
          >
            <option value="">Select preferred season</option>
            <option value="spring">Spring</option>
            <option value="summer">Summer</option>
            <option value="fall">Fall</option>
            <option value="winter">Winter</option>
          </select>
        </div>

        <button
          type="submit"
          className="w-full bg-pink-500 text-white py-3 px-4 rounded-lg hover:bg-pink-400 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-offset-2 transform transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center"
        >
          <MapPin className="w-5 h-5 mr-2" />
          Get Recommendations
        </button>
      </form>
    </div>
  );
};

export default SurveyForm;