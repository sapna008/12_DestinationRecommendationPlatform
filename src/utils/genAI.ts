import { GoogleGenerativeAI } from '@google/generative-ai';
import type { TravelPreferences, Destination } from '../types';

const genAI = new GoogleGenerativeAI('AIzaSyAE2yb73EKSSF4y2ciJKOYDNpBwBJ69ALo');

// Dummy recommendations for initial display
export const dummyRecommendations: Destination[] = [
  {
    name: "Tropical Paradise",
    description: "A stunning beach destination with crystal clear waters and white sandy beaches. Perfect for relaxation and water activities.",
    location: "Caribbean Islands",
    weather: "Warm and sunny",
    bestTime: "December to April",
    activities: ["Snorkeling", "Beach relaxation", "Island hopping", "Sunset sailing"],
    priceRange: "$$$",
    highlights: ["Pristine beaches", "Coral reefs", "Luxury resorts", "Water sports"],
    image: "https://images.unsplash.com/photo-1590523741831-ab7e8b8f9c7f"
  },
  {
    name: "Mountain Retreat",
    description: "An alpine paradise offering breathtaking views and outdoor adventures. Ideal for nature lovers and adventure seekers.",
    location: "Swiss Alps",
    weather: "Cool mountain climate",
    bestTime: "June to September",
    activities: ["Hiking", "Mountain biking", "Photography", "Skiing"],
    priceRange: "$$",
    highlights: ["Alpine views", "Fresh air", "Mountain trails", "Local cuisine"],
    image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b"
  },
  {
    name: "Cultural City",
    description: "A vibrant city rich in history and culture, offering museums, galleries, and historic architecture.",
    location: "European City",
    weather: "Moderate",
    bestTime: "Spring or Fall",
    activities: ["Museum visits", "Food tours", "Architecture walks", "Shopping"],
    priceRange: "$$",
    highlights: ["Historic sites", "Art galleries", "Local markets", "Cafes"],
    image: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34"
  }
];

export const generateDestinations = async (preferences: TravelPreferences): Promise<Destination[]> => {
  try {
    const model = genAI.getGenerativeModel({ model: 'gemini-pro' });
    
    const prompt = `Generate 3 travel destination recommendations based on these preferences:
      - Travel Style: ${preferences.travelStyle}
      - Budget: ${preferences.budget}
      - Group Size: ${preferences.groupSize}
      - Season: ${preferences.preferredSeason}
      - Interests: ${preferences.interests.join(', ')}

      For each destination, provide:
      - Name
      - Description (50-100 words)
      - Location
      - Weather
      - Best time to visit
      - 4-6 Activities
      - Price range
      - 4 Highlights
      - A relevant Unsplash image URL (landscape, high quality)

      Format the response as a JSON array.`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    
    const jsonStr = text.substring(
      text.indexOf('['),
      text.lastIndexOf(']') + 1
    );
    
    return JSON.parse(jsonStr);
  } catch (error) {
    console.error('Error generating destinations:', error);
    return [];
  }
};