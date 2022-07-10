import { Box, Typography } from "@mui/material"
import React from "react"
import { IProps } from "./types"

const Form: React.FC<IProps> = ({ children, heading }) => {
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
					{heading}
				</Typography>
				{children}
			</Box>
		</Box>
	)
}

export default Form
