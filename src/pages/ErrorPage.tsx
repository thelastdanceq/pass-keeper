import React from "react"
import { Link } from "react-router-dom"

export const ErrorPage = () => {
	return (
		<h1>
			OOOOPS, something goes wrong, come here <Link to={"/"}>HOME</Link>
		</h1>
	)
}
