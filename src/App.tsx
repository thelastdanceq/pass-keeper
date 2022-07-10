import { Box } from "@mui/material"
import React, { useContext } from "react"
import { Routes, Route, Navigate } from "react-router-dom"
import { AuthContext } from "./Auth"
import { ErrorPage } from "./pages/ErrorPage"
import HomePage from "./pages/HomePage"
import LoginPage from "./pages/LoginPage"
import RegisterPage from "./pages/RegisterPage"
//@ts-ignore
import girl from "./assets/images/girl.svg"
//@ts-ignore
import man from "./assets/images/man.svg"

function App() {
	const currentUser = useContext(AuthContext)
	return (
		<Box
			sx={{
				background: ` linear-gradient(to right, #ECBC76 50%, #FFFEF9 50%)`,
				width: "100vw",
				height: "100vh",
				display: "flex",
				justifyContent: "center",
				alignItems: "center",
			}}
		>
			<img
				src={girl}
				alt=''
				style={{
					position: "absolute",
					top: "155px",
					right: "60px",
					zIndex: 1,
				}}
			/>
			<img
				src={man}
				alt=''
				style={{
					position: "absolute",
					top: "190px",
					left: "181px",
					zIndex: 1,
				}}
			/>
			<Box sx={{ zIndex: 55 }}>
				<Routes>
					<Route
						path='/'
						element={!!currentUser ? <HomePage /> : <Navigate to={"/login"} />}
					/>
					<Route
						path='/login'
						element={!!currentUser ? <Navigate to={"/"} /> : <LoginPage />}
					/>
					<Route
						path='/register'
						element={!!currentUser ? <Navigate to={"/"} /> : <RegisterPage />}
					/>
					<Route path='*' element={<ErrorPage />} />
				</Routes>
			</Box>
		</Box>
	)
}

export default App
