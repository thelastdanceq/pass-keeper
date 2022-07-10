import { Avatar, Box, Button, Typography } from "@mui/material"
import { getAuth, signOut } from "firebase/auth"
import { getDatabase, onValue, ref } from "firebase/database"
import { useContext, useEffect, useState } from "react"
import { AuthContext } from "../Auth"
import NewItemForm from "../components/NewItemForm"
import PasswordList from "../components/PasswordList"

export default function HomePage() {
	const currentUser = useContext(AuthContext)
	const [data, setData] = useState<
		Array<[string, { name: string; pass: string }]> | undefined
	>()
	const handleSignOut = async () => {
		try {
			const auth = getAuth()
			await signOut(auth)
		} catch (error) {
			alert((error as Error).message)
		}
	}
	useEffect(() => {
		const db = getDatabase()
		const starCountRef = ref(
			db,
			`/users/${currentUser ? currentUser.uid : ""}/store`
		)
		onValue(starCountRef, (snapshot) => {
			const data = snapshot.val()
			setData(Object.entries(data))
		})
	}, [currentUser])
	return (
		<>
			{!!currentUser && (
				<Box
					sx={{
						backgroundColor: "white",
						borderRadius: "25px",
						padding: "20px",
					}}
				>
					<Box maxWidth='700px'>
						<Box sx={{ display: "flex", justifyContent: "space-between" }}>
							<Button variant='outlined' onClick={handleSignOut}>
								Sign Out
							</Button>
							<Avatar src={currentUser?.photoURL || ""}></Avatar>
						</Box>
						<Box marginTop={"20px"}>
							<Typography>PASSWORD MANAGER</Typography>
						</Box>
						<Box sx={{ marginTop: "20px" }}>
							{!!data ? <PasswordList list={data} /> : null}
						</Box>
					</Box>
					<NewItemForm />
				</Box>
			)}
		</>
	)
}
