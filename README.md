# Destination Recommendation Platform

A React-based application that suggests travel destinations based on user preferences collected through an interactive survey. The platform utilizes Firebase for database management and authentication.


## 🔗 Live Demo

Visit the live application: [Destination Recommendation Platform](https://visionary-kitten-618c61.netlify.app/)

Watch the project presentation: [YouTube Demo](https://youtu.be/D1eqXqK8rLI)

## ✨ Features

- **Interactive Preference Survey**: Engaging questionnaire with sliders, multiple-choice questions, and visual elements to collect user preferences
- **Personalized Recommendations**: Suggests travel destinations based on user inputs
- **User Authentication**: Secure login and registration system using Firebase
- **Responsive Design**: Optimized for various screen sizes and devices
- **Real-time Database**: Stores user profiles and preferences using Firebase

## 🔧 Technologies Used

- **Frontend**: React.js, React Router
- **Authentication & Database**: Firebase
- **State Management**: React Firebase Hooks
- **UI Components**: Tailwind CSS
- **Animation**: Particles.js for background effects
- **Deployment**: Netlify
- **Additional Libraries**: Various libraries for generating recommendations

## 📋 Survey Components

The user preference survey includes:

- **Travel Interests**: Adventure, relaxation, culture, etc.
- **Budget Constraints**: Price range selectors
- **Travel Style**: Solo, family, couples, luxury, budget, etc.
- **Desired Activities**: Sightseeing, dining, outdoor adventures, etc.

## 🚀 Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- Firebase account

### Installation

1. Clone the repository
```bash
git clone https://github.com/sapnasarkar/12_DestinationRecommendationPlatform.git
cd 12_DestinationRecommendationPlatform
```

2. Install dependencies
```bash
npm install
# or
yarn install
```

3. Create a `.env` file in the root directory and add your Firebase configuration
```
REACT_APP_FIREBASE_API_KEY=your_api_key
REACT_APP_FIREBASE_AUTH_DOMAIN=your_auth_domain
REACT_APP_FIREBASE_PROJECT_ID=your_project_id
REACT_APP_FIREBASE_STORAGE_BUCKET=your_storage_bucket
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
REACT_APP_FIREBASE_APP_ID=your_app_id
```

4. Start the development server
```bash
npm start
# or
yarn start
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

## 🏗️ Project Structure

```
12_DestinationRecommendationPlatform/
├── public/
│   ├── index.html
│   └── ...
├── src/
│   ├── components/
│   │   ├── Auth/
│   │   │   ├── Login.js
│   │   │   └── Signup.js
│   │   ├── Dashboard/
│   │   │   └── Dashboard.js
│   │   ├── Landing/
│   │   │   └── LandingPage.js
│   │   ├── Navigation/
│   │   │   └── Navbar.js
│   │   └── Particle.js
│   ├── firebase.js
│   ├── App.js
│   └── index.js
├── .env
├── package.json
└── README.md
```

The application uses React Router for navigation with the following routes:
- `/`: Landing page with introduction to the application
- `/login`: User login page
- `/signup`: New user registration
- `/dashboard`: Protected route that requires authentication, contains the survey and recommendation features

## 👥 Contributing

Contributions, issues, and feature requests are welcome! Feel free to check the [issues page](https://github.com/sapnasarkar/12_DestinationRecommendationPlatform/issues).

## 📝 License

This project is [MIT](LICENSE) licensed.

## 👩‍💻 Author

**Sapna Sarkar**
- Email: sapnapks1@gmail.com)
  
**ThankYou
