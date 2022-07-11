import { Stack } from '@mui/material'
import { PasswordItem } from '../PasswordItem/PasswordItem'
import { IProps } from './types'

export const PasswordList = ({ list }: IProps) => {
  return (
    <Stack direction='column' alignItems={'center'} width='100%' spacing={2}>
      {list.map(([id, data]) => (
        <PasswordItem key={id} id={id} data={data} />
      ))}
    </Stack>
  )
}
