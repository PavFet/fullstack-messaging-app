import React from 'react'
import SingleUserCard from '../components/SingleUserCard'
import { useSelector } from 'react-redux'
import { Box } from '@mui/material'
import http from '../plugins/http'
import { useDispatch } from 'react-redux'
import { fetchConversations } from '../features/users'

const IndexPage = () => {
  const disp = useDispatch()
  const loggedInUser = useSelector((state) => state.users.loggedInUser)
  const users = useSelector((state) => state.users.allUsers)
  const secret = localStorage.getItem('userSecret')
  React.useEffect(() => {
    const data = {
        secret: loggedInUser.secret,
        username: loggedInUser.username,
    }
    http.post(data, 'getConversations')
      .then(data => { disp(fetchConversations({conversations: data.conversations})) })
}, [])
  return (
    <>
    <Box sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 2, marginY: 2, padding: 2}}>
    { secret && users.map((x, i) => <SingleUserCard key={i} user={x}/>) }
    {!secret && 
      <div className='welcome-box'>
        <h3>Welcome!</h3>
        <p>Please sign in or register</p>
      </div>
    }
    </Box>
    </>
  )
}

export default IndexPage