import React, { useContext } from "react"
import { AuthContext } from "../Auth"

export default function HomePage() {
	const currentUser = useContext(AuthContext)
	return <div>{JSON.stringify(currentUser)}</div>
}
