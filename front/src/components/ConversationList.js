import {
  Avatar, ListItem, ListItemAvatar, ListItemButton, ListItemText, Badge, Button
} from '@mui/material';
import React from 'react';
import MailIcon from '@mui/icons-material/Mail';
import ListItemIcon from '@mui/material/ListItemIcon';
import { useNavigate } from 'react-router-dom'
import Divider from '@mui/material/Divider';
import {useSelector} from "react-redux";
import http from '../plugins/http';
import {setUsername, fetchConversations} from '../features/users'
import { useDispatch } from 'react-redux';


const ConversationList = ({data}) => {
  const disp = useDispatch()
  const loggedInUser = useSelector((state) => state.users.loggedInUser)
  console.log(loggedInUser.username)
  const nav = useNavigate()
  const filterUsernames = () => {
    return data.participants.filter(x => x !== loggedInUser.username)
  }
  const getParticipantUsername = async () => {
    http.get("chat/"+data._id)
      .then((res) => {
        const participants = res.conversation.participants
        for (let i = 0; i < participants.length; i++) {
          if (participants[i] !== loggedInUser.username) {
            const result = participants.splice(i, 1)
            disp(setUsername({username: result[0]}))
            break;
          }
        }
    }
  )
  }

  const deleteConversation = async () => {
    http.get("conversation/"+data._id+"/"+loggedInUser.username)
      .then((res) => {
        disp(fetchConversations({conversations: res.conversations}))
        }
      )
    }
    
  return (
      <>
        <ListItem>
          <ListItemButton onClick={() => {
          getParticipantUsername() 
          nav('/chat/'+data._id)
        }}>
            <ListItemIcon>
              <ListItemAvatar>
                <Badge badgeContent={data.messages.length} siz=''  color="primary">
                  <Avatar>
                    <MailIcon />
                  </Avatar>
                </Badge>
              </ListItemAvatar>
            </ListItemIcon>
            <ListItemText primary={"Chat with: "+ filterUsernames()[0]} secondary="Click to continue chat" />
            </ListItemButton>
            <Button onClick={deleteConversation} color='error' variant='contained'>Delete</Button>
        </ListItem>
        <Divider/>
      </>
  )
}

export default ConversationList