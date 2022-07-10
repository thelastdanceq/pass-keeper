import { Box, Button, TextField, useMediaQuery } from "@mui/material"
import { getDatabase, push, ref } from "firebase/database"
import React, { useCallback, useContext } from "react"
import { Controller, useForm } from "react-hook-form"
import { USER_STORE } from "../../constants/urls/urls"
import { AuthContext } from "../../contexts/Auth"
import { defaultValues } from "./constants"

export const NewItemForm = () => {
	const currentUser = useContext(AuthContext)
	const { control, reset, handleSubmit } = useForm({ defaultValues })
	const matches = useMediaQuery("(min-width:600px)")

	const writeUserData = useCallback(
		({ name, pass }: { name: string; pass: string }) => {
			const db = getDatabase()
			push(ref(db, USER_STORE(currentUser ? currentUser?.uid : "")), {
				name,
				pass,
			}).then(() => reset())
		},
		[currentUser, reset]
	)
	return (
		<form onSubmit={handleSubmit(writeUserData)}>
			<Box
				display='flex'
				flexDirection={matches ? "row" : "column"}
				justifyContent={"space-between"}
				gap={"20px"}
			>
				<Controller
					name={"name"}
					rules={{ required: { message: "field is required", value: true } }}
					control={control}
					render={({ field: { onChange, value } }) => (
						<TextField
							required
							value={value}
							onChange={onChange}
							type={"name"}
							label='Name'
						/>
					)}
				/>{" "}
				<Controller
					rules={{ required: { message: "field is required", value: true } }}
					name={"pass"}
					control={control}
					render={({ field: { onChange, value } }) => (
						<TextField
							value={value}
							onChange={onChange}
							type={"password"}
							label='Password'
						/>
					)}
				/>
				<Button type='submit'>ADD NEW PASSWORD</Button>
			</Box>
		</form>
	)
}
