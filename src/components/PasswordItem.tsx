import { Visibility, VisibilityOff } from "@mui/icons-material"
import { TextField, InputAdornment, IconButton } from "@mui/material"
import React, { useState } from "react"

export default function PasswordItem({
	data,
}: {
	data: { name: string; pass: string }
}) {
	const [showPassword, setShow] = useState(false)
	const handleClickShowPassword = () => {
		setShow(!showPassword)
	}
	return (
		<h1>
			{data.name}
			<TextField
				variant='outlined'
				disabled
				value={data.pass}
				type={showPassword ? "text" : "password"}
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
		</h1>
	)
}
