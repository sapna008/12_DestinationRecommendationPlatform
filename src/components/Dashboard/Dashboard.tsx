import React from 'react';
import SurveyForm from '../Survey/SurveyForm';
import RecommendationPage from '../Recommendations/RecommendationPage';

const Dashboard = () => {
  return (
    <div className="min-h-screen pt-16 bg-black/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="backdrop-blur-md bg-black/40 rounded-2xl p-6">
            <SurveyForm />
          </div>
          <div className="backdrop-blur-md bg-black/40 rounded-2xl p-6">
            <RecommendationPage />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;