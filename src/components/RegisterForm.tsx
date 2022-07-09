import { Box, Grid, Input, TextField, Typography } from "@mui/material"
import {
	createUserWithEmailAndPassword,
	getAuth,
	signInWithEmailAndPassword,
} from "firebase/auth"
import React from "react"
import { Controller, useForm } from "react-hook-form"
import { useNavigate } from "react-router-dom"

interface IData {
	email: string
	pass: string
	name: string
	phone: string
}
const defaultValues = {
	email: "",
	pass: "",
	name: "",
	phone: "",
}

export const RegisterForm = () => {
	const navigate = useNavigate()
	const {
		control,
		reset,
		handleSubmit,
		formState: { errors },
	} = useForm({ defaultValues })
	const submitHandler = async (data: IData) => {
		try {
			await createUserWithEmailAndPassword(getAuth(), data.email, data.pass)
			// await signInWithEmailAndPassword(getAuth(), data.email, data.pass)
			navigate("/")
			reset()
		} catch (err) {
			alert((err as Error).message)
		}
	}
	return (
		<Box sx={{ zIndex: 2, maxWidth: "540px" }}>
			<Box
				display={"flex"}
				flexDirection='column'
				sx={{
					background: "#FFFFFF",
					boxShadow: " 0px 4px 35px rgba(0, 0, 0, 0.08)",
					borderRadius: " 40px",
					padding: "45px 50px",
				}}
			>
				<Typography
					sx={{
						fontStyle: "normal",
						fontWeight: 400,
						fontSize: "20px",
						lineHeight: "30px",
					}}
				>
					Welcome to Lorem
				</Typography>
				<Typography
					sx={{
						fontStyle: "normal",
						fontWeight: 500,
						fontSize: "55px",
						lineHeight: "82px",
					}}
				>
					Register
				</Typography>

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
						<>
							<Grid item xs={4}>
								<Controller
									name={"name"}
									control={control}
									rules={{
										required: { message: "Field is required", value: true },
									}}
									render={({ field: { onChange, value } }) => (
										<TextField
											onChange={onChange}
											value={value}
											fullWidth
											label='Name'
										/>
									)}
								/>
							</Grid>
							<Grid item xs={4}>
								<Controller
									name={"phone"}
									control={control}
									rules={{
										required: { message: "Field is required", value: true },
									}}
									render={({ field: { onChange, value } }) => (
										<TextField
											onChange={onChange}
											value={value}
											fullWidth
											label='Phone'
										/>
									)}
								/>
							</Grid>
						</>
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

					<Input
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
					/>
				</form>
			</Box>
		</Box>
	)
}