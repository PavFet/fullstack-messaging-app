import { Button, Typography } from '@mui/material'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import {useSelector} from "react-redux";
import http from '../plugins/http';
import { useDispatch } from 'react-redux'
import { fetchConversations } from '../features/users'

const SingleUserCard = ({user}) => {
  const disp = useDispatch()
  const nav = useNavigate()

  const loggedInUser = useSelector((state) => state.users.loggedInUser)

  const createConversation = async () => {
    const data = {
      secret: loggedInUser.secret,
      from: loggedInUser.username,
      to: user.username
  }
  await http.post(data, "newConversation")
  .then((res) => {
    if(res.success) {
      disp(fetchConversations({conversations: res.conversations}))
    }
  })
}


  
  return (
    <Card sx={{width: '200px', height: '400px'}}>
      <CardMedia component="img" alt="" height="70" image={user.profileImg}/>
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {user.username}
        </Typography>
      </CardContent>
      <CardActions>
        {
        loggedInUser.username !== user.username && 
          <Button size="small" onClick={() => {
            createConversation()
            nav('/chatHistory')
            }
          }>
            Start conversation
          </Button>
        }

        <Button sx={loggedInUser.username === user.username && {width: "100%", position: 'relative', top: "10px"}} onClick={() => nav('/profile/'+user._id)} size="small">
         {loggedInUser.username !== user.username ? 'View profile' : 'Edit profile'}
        </Button>
      </CardActions>
    </Card>
  )
}

export default SingleUserCard