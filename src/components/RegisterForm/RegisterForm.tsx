import { Grid, Input, TextField, Typography } from "@mui/material"
import { createUserWithEmailAndPassword, getAuth } from "firebase/auth"
import { useCallback } from "react"
import { Controller, useForm } from "react-hook-form"
import { Link, useNavigate } from "react-router-dom"
import { Form } from "../Form/Form"
import { defaultValues } from "./constants"
import { IData } from "./types"

export const RegisterForm = () => {
	const navigate = useNavigate()
	const {
		control,
		reset,
		handleSubmit,
		formState: { errors },
	} = useForm({ defaultValues })

	const submitHandler = useCallback(
		async (data: IData) => {
			try {
				await createUserWithEmailAndPassword(getAuth(), data.email, data.pass)
				navigate("/")
				reset()
			} catch (err) {
				alert((err as Error).message)
			}
		},
		[navigate, reset]
	)
	return (
		<Form heading={"Register"}>
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
				If you already have acc, you can <Link to={"/login"}>log in</Link>
			</Typography>
		</Form>
	)
}
