import React from "react"
import ReactDOM from "react-dom/client"
import "./index.css"
import App from "./App"
import { BrowserRouter } from "react-router-dom"
import { createTheme, ThemeProvider } from "@mui/material"
import { AuthProvider } from "./Auth"
import { initializeApp } from "firebase/app"
import "firebase/auth"

const theme = createTheme({
	palette: {
		primary: { main: "#E48700", light: "#ECBC76" },
		common: { white: "#ffffff" },
	},
})

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
const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement)
root.render(
	<React.StrictMode>
		<BrowserRouter>
			<AuthProvider>
				<ThemeProvider theme={theme}>
					<App />
				</ThemeProvider>
			</AuthProvider>
		</BrowserRouter>
	</React.StrictMode>
)
