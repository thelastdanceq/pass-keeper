import { Box, Button, TextField, useMediaQuery } from "@mui/material"
import { getDatabase, push, ref } from "firebase/database"
import React, { useContext } from "react"
import { Controller, useForm } from "react-hook-form"
import { AuthContext } from "../Auth"
const defaultValues = {
	name: "",
	pass: "",
}

export default function NewItemForm() {
	const currentUser = useContext(AuthContext)
	const { control, reset, handleSubmit } = useForm({ defaultValues })
	const matches = useMediaQuery("(min-width:600px)")

	function writeUserData({ name, pass }: { name: string; pass: string }) {
		const db = getDatabase()
		push(ref(db, "users/" + currentUser?.uid + "/store"), {
			name,
			pass,
		}).then(() => reset())
	}
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
