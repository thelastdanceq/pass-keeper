import { Visibility, VisibilityOff } from "@mui/icons-material"
import {
	TextField,
	InputAdornment,
	IconButton,
	Box,
	Typography,
} from "@mui/material"
import DeleteIcon from "@mui/icons-material/Delete"
import React, { useCallback, useContext, useState } from "react"
import { getDatabase, ref, remove, update } from "firebase/database"
import { AuthContext } from "../../contexts/Auth"
import EditIcon from "@mui/icons-material/Edit"
import CheckIcon from "@mui/icons-material/Check"
import { IProps } from "./types"

export const PasswordItem = ({ data, id }: IProps) => {
	const [showPassword, setShow] = useState(false)
	const [isEditing, setIsEditing] = useState(false)
	const [currentPass, setCurrentPass] = useState(data.pass)
	const currentUser = useContext(AuthContext)!

	const handleClickShowPassword = useCallback(() => {
		setShow(!showPassword)
	}, [showPassword])

	const handleDelete = useCallback(() => {
		const db = getDatabase()
		const rf = ref(db, `/users/${currentUser.uid}/store/${id}`)
		remove(rf)
	}, [currentUser, id])

	const handleEdit = useCallback(() => {
		setIsEditing(!isEditing)
		setShow(true)
	}, [isEditing])

	const handleConfirm = useCallback(() => {
		setIsEditing(!isEditing)
		setShow(false)
		const db = getDatabase()
		const rf = ref(db, `/users/${currentUser.uid}/store/${id}`)
		update(rf, { pass: currentPass })
	}, [isEditing, currentUser.uid, id, currentPass])

	return (
		<Box
			display='flex'
			width={"100%"}
			gap={"20px"}
			justifyContent={"space-between"}
			flexWrap={"wrap"}
		>
			<Typography display={"inline-block"}>{data.name}</Typography>
			<Box display={"flex"} alignItems='center'>
				<TextField
					variant='standard'
					disabled={!isEditing}
					value={currentPass}
					onChange={(e) => setCurrentPass(e.currentTarget.value)}
					type={showPassword ? "text" : "password"}
					sx={{
						"::before": {
							display: "none",
						},
						"::after": {
							display: "none",
						},
					}}
					InputProps={{
						endAdornment: (
							<InputAdornment position='end'>
								<IconButton
									aria-label='toggle password visibility'
									onClick={handleClickShowPassword}
									onMouseDown={handleClickShowPassword}
								>
									{showPassword ? <Visibility /> : <VisibilityOff />}
								</IconButton>
							</InputAdornment>
						),
					}}
				/>
				<DeleteIcon onClick={handleDelete} />
				{isEditing ? (
					<CheckIcon onClick={handleConfirm} />
				) : (
					<EditIcon onClick={handleEdit} />
				)}
			</Box>
		</Box>
	)
}
