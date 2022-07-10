import { Box, Button, Input, TextField } from "@mui/material"
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
				flexDirection={"row"}
				justifyContent={"space-between"}
			>
				<Button type='submit'>ADD NEW PASSWORD</Button>
				<Controller
					name={"name"}
					control={control}
					render={({ field: { onChange, value } }) => (
						<TextField
							value={value}
							onChange={onChange}
							type={"name"}
							label='Name'
						/>
					)}
				/>{" "}
				<Controller
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
				/>{" "}
			</Box>
		</form>
	)
}
