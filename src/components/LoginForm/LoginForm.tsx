import { Grid, TextField, Typography, Box, Button } from "@mui/material"
import {
	getAuth,
	signInWithEmailAndPassword,
	GoogleAuthProvider,
	signInWithPopup,
} from "firebase/auth"
import { Controller, useForm } from "react-hook-form"
import { Link, useNavigate } from "react-router-dom"
import GoogleIcon from "@mui/icons-material/Google"
import Form from "../Form/Form"
import { defaultValues } from "./constants"
import { useCallback } from "react"

export default function LoginForm() {
	const navigate = useNavigate()
	const {
		control,
		reset,
		handleSubmit,
		formState: { errors },
	} = useForm({ defaultValues })
	const submitHandler = useCallback(
		async (data: { email: string; pass: string }) => {
			try {
				await signInWithEmailAndPassword(getAuth(), data.email, data.pass)
				navigate("/")
				reset()
			} catch (err) {
				alert((err as Error).message)
			}
		},
		[navigate, reset]
	)
	const handleGoogleSignUp = useCallback(async () => {
		const provider = new GoogleAuthProvider()
		try {
			await signInWithPopup(getAuth(), provider)
			navigate("/")
			reset()
		} catch (err) {
			alert((err as Error).message)
		}
	}, [navigate, reset])
	return (
		<Form heading={"Log in"}>
			<form
				style={{ margin: "45px 44px 0  44px " }}
				onSubmit={handleSubmit(submitHandler)}
			>
				<Grid container spacing={4} columns={8} alignItems='center'>
					<Grid item xs={8}>
						<Controller
							name={"email"}
							control={control}
							render={({ field: { onChange, value } }) => (
								<TextField
									value={value}
									onChange={onChange}
									type={"email"}
									fullWidth
									label='Email address'
								/>
							)}
						/>
					</Grid>
					<Grid item xs={8}>
						<Controller
							name={"pass"}
							control={control}
							rules={{
								required: { message: "Field is required", value: true },
								minLength: { message: "< 6 symbols", value: 6 },
							}}
							render={({ field: { onChange, value } }) => (
								<TextField
									value={value}
									onChange={onChange}
									type={"password"}
									fullWidth
									label={errors.pass ? errors.pass.message : "Password"}
									error={errors.pass && !!errors.pass.message}
								/>
							)}
						/>
					</Grid>
				</Grid>

				<Button
					fullWidth
					type='submit'
					sx={{
						padding: "15px",
						color: "common.white",
						marginTop: "63px",
						textAlign: "center",
						backgroundColor: "primary.main",
						boxShadow: " 0px 4px 19px rgba(119, 147, 65, 0.3)",
						borderRadius: "10px",
						":hover": {
							backgroundColor: "primary.light",
							transition: "0.3s",
						},

						"::before": {
							display: "none",
						},
						"::after": {
							display: "none",
						},
					}}
				>
					Log in
				</Button>
			</form>
			<Typography
				sx={{
					fontStyle: "normal",
					fontWeight: 400,
					fontSize: "16px",
					lineHeight: "24px",
					color: "#ABABAB",
					textAlign: "center",
					marginTop: "10px",
				}}
			>
				If you don`t have acc, you can <Link to={"/register"}>register</Link>
			</Typography>
			<Box
				sx={{ textAlign: "center", marginTop: "20px", marginBottom: "20px" }}
			>
				<Typography
					sx={{
						fontStyle: "normal",
						fontWeight: 400,
						fontSize: "16px",
						lineHeight: "24px",
						color: "#ABABAB",
					}}
				>
					OR
				</Typography>
			</Box>
			<Button
				variant={"contained"}
				sx={{
					display: "flex",
					justifyContent: "space-between",
					width: "70%",
					alignSelf: "center",
					padding: "15px",
					color: "white",
				}}
				onClick={handleGoogleSignUp}
			>
				<Typography>Sign up with</Typography>
				<GoogleIcon />
			</Button>
		</Form>
	)
}
