import React, { useEffect, useState } from 'react';
import { auth, database } from '../../firebase';
import { ref, get } from 'firebase/database';
import { History, Calendar, Users, DollarSign, Compass } from 'lucide-react';

interface SurveyHistory {
  timestamp: number;
  travelStyle: string;
  budget: string;
  groupSize: string;
  interests: string[];
  preferredSeason: string;
}

const HistoryPage = () => {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHistory = async () => {
      const user = auth.currentUser;
      if (user) {
        const historyRef = ref(database, `surveys/${user.uid}/history`);
        try {
          const snapshot = await get(historyRef);
          if (snapshot.exists()) {
            const data = Object.values(snapshot.val()) as SurveyHistory[];
            setHistory(data.sort((a, b) => b.timestamp - a.timestamp));
          }
        } catch (error) {
          console.error('Error fetching history:', error);
        }
        setLoading(false);
      }
    };

    fetchHistory();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-2xl text-white">Loading history...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-center mb-8">
          <div className="p-4 rounded-full bg-pink-500/10">
            <History className="w-16 h-16 text-pink-400" />
          </div>
        </div>

        <h1 className="text-4xl font-bold text-center mb-2 text-white">Your Travel History</h1>
        <p className="text-center text-gray-300 mb-8">Previous travel preferences and recommendations</p>

        <div className="space-y-6">
          {history.map((entry, index) => (
            <div
              key={index}
              className="backdrop-blur-sm rounded-2xl shadow-xl p-6 border border-white/20"
              style={{
                backgroundColor: 'rgba(0, 0, 0, 0.4)',
              }}
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-semibold text-white">
                  Search from {new Date(entry.timestamp).toLocaleDateString()}
                </h3>
                <span className="text-gray-400">
                  {new Date(entry.timestamp).toLocaleTimeString()}
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="flex items-center text-gray-300">
                  <Compass className="w-5 h-5 mr-2 text-pink-400" />
                  <span>Style: {entry.travelStyle}</span>
                </div>
                <div className="flex items-center text-gray-300">
                  <DollarSign className="w-5 h-5 mr-2 text-pink-400" />
                  <span>Budget: {entry.budget}</span>
                </div>
                <div className="flex items-center text-gray-300">
                  <Users className="w-5 h-5 mr-2 text-pink-400" />
                  <span>Group: {entry.groupSize}</span>
                </div>
                <div className="flex items-center text-gray-300">
                  <Calendar className="w-5 h-5 mr-2 text-pink-400" />
                  <span>Season: {entry.preferredSeason}</span>
                </div>
              </div>

              <div className="mt-4">
                <h4 className="text-sm font-medium text-gray-300 mb-2">Interests</h4>
                <div className="flex flex-wrap gap-2">
                  {entry.interests.map((interest, i) => (
                    <span
                      key={i}
                      className="px-3 py-1 rounded-full text-sm bg-pink-500/20 text-pink-300"
                    >
                      {interest}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HistoryPage;