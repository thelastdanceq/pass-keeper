import React, { useContext } from "react"
import { useNavigate } from "react-router-dom"
import { AuthContext } from "../Auth"

export default function LoginPage() {
	const currentUser = useContext(AuthContext)
	const navigate = useNavigate()
	if (!!currentUser) {
		navigate("/", { replace: true })
	}
	return <div>LoginPage</div>
}
