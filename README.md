# FocusFlow - AI Productivity App

This is a React + Vite application with an Express/Cloud Run backend for Gemini AI features.

## Architecture & Features

- **Frontend:** React 19, Vite, React Router, Vanilla CSS
- **Backend:** Node.js/Express server (designed for Google Cloud Run) exposing AI endpoints securely.
- **Database:** Firebase Cloud Firestore
- **AI Integration:** Google Gemini (via `@google/generative-ai`)

### Implemented Features
1. **AI Task Breakdown:** Submit a big goal (e.g. "Prepare for DBMS Exam") and Gemini intelligently splits it into actionable subtasks with time estimates. Results are saved to Firestore.

## Setup Instructions

### 1. Frontend Setup
1. Copy `.env.example` to `.env` in the root folder.
2. Go to [Firebase Console](https://console.firebase.google.com/), create a project, enable Firestore and Authentication.
3. Add a Web App to Firebase and copy the API keys into your `.env` file.
4. Run the frontend:
   ```bash
   npm install
   npm run dev
   ```

### 2. Backend Setup
1. Navigate to the `backend` folder: `cd backend`
2. Install dependencies: `npm install`
3. Copy `backend/.env.example` to `backend/.env`
4. Go to [Google AI Studio](https://aistudio.google.com/) or Google Cloud, get a Gemini API Key, and paste it into `GEMINI_API_KEY` in `backend/.env`.
5. Run the backend server:
   ```bash
   node server.js
   ```

The backend runs on `http://localhost:8080` and the frontend runs on `http://localhost:5173`.
