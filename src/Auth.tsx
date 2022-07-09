import { getAuth, User } from "firebase/auth"
import { createContext, PropsWithChildren, useEffect, useState } from "react"
export const AuthContext = createContext<User | null>(null)

export const AuthProvider: React.FC<PropsWithChildren> = ({ children }) => {
	const [currentUser, setСurrentUser] = useState<null | User>(null)
	useEffect(() => {
		getAuth().onAuthStateChanged((value) => setСurrentUser(value))
	}, [])
	return (
		<AuthContext.Provider value={currentUser}>{children}</AuthContext.Provider>
	)
}
