import { initializeApp } from "firebase/app"
import 'firebase/auth'

const firebaseConfig = {
	apiKey: process.env.REACT_APP_API_KEY,
	authDomain: process.env.REACT_APP_DOMAIN,
	projectId: process.env.REACT_APP_PROJECT_ID,
	storageBucket: process.env.REACT_APP_BUCKET,
	messagingSenderId: process.env.REACT_APP_SENDER_ID,
	appId: process.env.REACT_APP_APP_ID,
}

// Initialize Firebase
export const app = initializeApp(firebaseConfig)