import { getAuth, signOut } from "firebase/auth"
import React, { useContext } from "react"
import { AuthContext } from "../Auth"

export default function HomePage() {
	const currentUser = useContext(AuthContext)
	const handleSignOut = async () => {
		const auth = getAuth()
		const response = await signOut(auth)
		console.log(response)
	}
	return <button onClick={handleSignOut}>{JSON.stringify(currentUser)}</button>
}
