import React from "react"
import { Box } from "@mui/material"
//@ts-ignore
import girl from "../assets/images/girl.svg"
//@ts-ignore
import man from "../assets/images/man.svg"
import { RegisterForm } from "../components/RegisterForm"

export default function RegisterPage() {
	return (
		<Box
			sx={{
				background: ` linear-gradient(to right, #ECBC76 50%, #FFFEF9 50%)`,
				width: "100vw",
				height: "100vh",
				display: "flex",
				justifyContent: "center",
				alignItems: "center",
			}}>
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
			<RegisterForm />
		</Box>
	)
}
