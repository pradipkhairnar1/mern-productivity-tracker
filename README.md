# Productivity Tracker Chrome Extension (MERN Stack)

## Features

- Tracks time spent on different websites in real-time  
- Automatically blocks distracting platforms such as YouTube  
- Sends browsing data securely to the backend  
- Stores analytics data in MongoDB  
- Generates daily productivity reports  
- Interactive dashboard with charts for visualization  
- Clean, modular, and scalable architecture  


## Tech Stack

Frontend:
- React.js  
- Chart.js  

Backend:
- Node.js  
- Express.js  

Database:
- MongoDB  

Browser Extension:
- Chrome Extension APIs  



## How It Works

1. The Chrome Extension monitors active browser tabs and records the time spent on websites.  
2. The captured data is sent to a Node.js/Express backend through REST APIs.  
3. The backend processes the data and stores it securely in MongoDB.  
4. The React dashboard retrieves this data and displays productivity analytics using visual charts.



## Installation

1. Clone the repository:

git clone https://github.com/pradipkhairnar1/mern-productivity-tracker.git  
cd mern-productivity-tracker  

2. Install backend dependencies and start server:

cd backend  
npm install  
npm run dev  

3. Install frontend dependencies and start React app:

cd frontend  
npm install  
npm start  

4. Load the Chrome Extension:

Open chrome://extensions  
Enable Developer Mode  
Click "Load unpacked"  
Select the extension folder  


## Screenshots


