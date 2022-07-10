import { Avatar, Box, Button, Typography } from "@mui/material"
import { getAuth, signOut } from "firebase/auth"
import { getDatabase, onValue, ref } from "firebase/database"
import { useContext, useEffect, useState } from "react"
import { AuthContext } from "../contexts/Auth"
import { NewItemForm } from "../components/NewItemForm/NewItemForm"
import { PasswordList } from "../components/PasswordList/PasswordList"

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
			data ? setData(Object.entries(data)) : setData(data)
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
						display: "flex",
						flexDirection: "column",
						alignItems: "center",
						justifyContent: "center",
						gap: "20px",
					}}
				>
					<Box
						sx={{
							width: "100%",
							display: "flex",
							justifyContent: "space-between",
						}}
					>
						<Button variant='outlined' onClick={handleSignOut}>
							Sign Out
						</Button>
						<Avatar src={currentUser?.photoURL || ""}></Avatar>
					</Box>
					<Box maxWidth='700px'>
						<Box marginTop={"20px"}>
							<Typography
								sx={{
									fontStyle: "normal",
									fontWeight: 500,
									fontSize: "20px",
									lineHeight: "82px",
									color: "#000000",
								}}
							>
								PASSWORD MANAGER
							</Typography>
						</Box>
						<Box sx={{ marginTop: "20px" }}>
							{!!data ? (
								<PasswordList list={data} />
							) : (
								<h3>Nothing here, add something ...</h3>
							)}
						</Box>
					</Box>
					<NewItemForm />
				</Box>
			)}
		</>
	)
}
