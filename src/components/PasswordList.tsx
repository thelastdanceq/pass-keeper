import { Stack } from "@mui/material"
import PasswordItem from "./PasswordItem"
interface IProps {
	list: Array<[string, { name: string; pass: string }]>
}

export default function PasswordList({ list }: IProps) {
	return (
		<Stack direction='column' spacing={2}>
			{list.map(([id, data]) => (
				<PasswordItem key={id} data={data} />
			))}
		</Stack>
	)
}
