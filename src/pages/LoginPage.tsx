import React, { useContext } from "react"
import { useNavigate } from "react-router-dom"
import { AuthContext } from "../contexts/Auth"
import { LoginForm } from "../components/LoginForm/LoginForm"

export default function LoginPage() {
	const currentUser = useContext(AuthContext)
	const navigate = useNavigate()
	if (!!currentUser) {
		navigate("/", { replace: true })
	}
	return <LoginForm />
}
