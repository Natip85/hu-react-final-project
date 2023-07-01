import { Button, Link } from '@mui/material'
import React from 'react'
import { getUser } from '../auth/TokenManager'

type Props = {}

const ResetPassword = (props: Props) => {

  const user = getUser()
  return (
   <>
   <Link href={`/profile/${user._id}`}>
   <Button variant='contained'>Back to my profile</Button>
   </Link>
   </>
  )
}

export default ResetPassword