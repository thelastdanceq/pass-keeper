import React, { useContext } from "react"
import { Routes, Route, Navigate } from "react-router-dom"
import { AuthContext } from "./Auth"
import { ErrorPage } from "./pages/ErrorPage"
import HomePage from "./pages/HomePage"
import LoginPage from "./pages/LoginPage"
import RegisterPage from "./pages/RegisterPage"

function App() {
	const currentUser = useContext(AuthContext)
	return (
		<Routes>
			<Route
				path='/'
				element={!!currentUser ? <HomePage /> : <Navigate to={"/login"} />}
			/>
			<Route path='/login' element={<LoginPage />} />
			<Route path='/register' element={<RegisterPage />} />
			<Route path='*' element={<ErrorPage />} />
		</Routes>
	)
}

export default App
