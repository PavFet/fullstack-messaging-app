import React from 'react'
import { Stack, TextField, Button } from '@mui/material'
import {useParams} from "react-router-dom";
import { useSelector } from 'react-redux';
import http from '../plugins/http';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownAltIcon from '@mui/icons-material/ThumbDownAlt';
import FavoriteIcon from '@mui/icons-material/Favorite';
import TagFacesIcon from '@mui/icons-material/TagFaces';
import IconButton from '@mui/material/IconButton';

const ChatPage = () => {
  const {id} = useParams()
  const loggedInUser = useSelector((state) => state.users.loggedInUser)
  const allUsers = useSelector((state) => state.users.allUsers)
  const participantUsername = useSelector((state) => state.users.participantUsername)
  const [conversations, setConversation] = React.useState(null)
  const participantUser = allUsers.filter((x) => x.username === participantUsername)

  const messageRef = React.useRef()

  const setReaction = async (reaction, messageIndex) => {
    http.post({reaction, id, messageIndex}, 'setReaction')

     await http.get('chat/'+id)
      .then((data) => setConversation(data.conversation))
}

  const sendMessage =  () => {
    const data = {
      id,
      username: loggedInUser.username,
      secret: loggedInUser.secret,
      message: messageRef.current.value
    }
  
  http.post(data, 'sendMessage')
      .then(data => {
          console.log(data)
          setConversation(data.conversation)
      })
      messageRef.current.value = ''
  }

  React.useEffect(() => {
   
    http.get('chat/'+id)
    .then((data) => setConversation(data.conversation))
}, [])
  

  const convertTime = (stamp) => {
    const date = new Date(stamp);

    return date.getHours() + ":" + date.getMinutes() + ", "+ date.toDateString();
}

  return (
    <div className="d-flex j-center">

    <div className="container d-flex column chatWindow">

    <div className="chatbox">
     <div className="chatbox-top">
    <div className="chatbox-avatar">
       <img alt="" src={participantUser[0].profileImg}></img>
     </div>
       <h5 className="chatbox-top-username">{participantUser[0].username}</h5>
     </div>
        <div className="chatbox-messages">
        {conversations?.messages.map((x, i) =>
        <div key={i} className='message-box-holder'>
         <div className={x.username !== participantUser[0].username ? 'message-sender' : 'message-box'} >
          <div className={x.username !== participantUser[0].username ? 'chat-message-sender' : 'chat-message'}> {x.message}</div>
          <p className={x.username !== participantUser[0].username ? 'chat-date-sender' : 'chat-date'}>{convertTime(x.time)}</p>
          <div className={x.username !== participantUser[0].username ? 'chat-reactions-none' : 'chat-reactions'}>
            <IconButton className={x.reaction === 'like' ? 'chat-reactions-active' : 'chat-reactions-none'}   onClick={() => setReaction('like', i)}  ><ThumbUpIcon   color={x.reaction === 'like' ? 'success' : ''}/></IconButton>
             <IconButton className={x.reaction === 'heart' ? 'chat-reactions-active' : 'chat-reactions-none'}  onClick={() => setReaction('heart', i)} ><FavoriteIcon color={x.reaction === 'heart' ? 'success' : ''}/></IconButton>
             <IconButton className={x.reaction === 'smile' ? 'chat-reactions-active' : 'chat-reactions-none'}  onClick={() => setReaction('smile', i)}><TagFacesIcon color={x.reaction === 'smile' ? 'success' : ''}/></IconButton>
             <IconButton className={x.reaction === 'dislike' ? 'chat-reactions-active' : 'chat-reactions-none'}  onClick={() => setReaction('dislike', i)}><ThumbDownAltIcon color={x.reaction === 'dislike' ? 'success' : ''}/></IconButton>
          </div>
          <div className='action'>
            {x.reaction === 'like' && <ThumbUpIcon className='reaction-active' color='success'/>}
            {x.reaction === 'heart' && <FavoriteIcon className='reaction-active' color='success'/>}
            {x.reaction === 'smile' && <TagFacesIcon className='reaction-active' color='success'/>}
            {x.reaction === 'dislike' && <ThumbDownAltIcon className='reaction-active' color='success'/>}
          </div>
          </div>
        </div>)}
     </div>
    <Stack sx={{ display: "flex", flexDirection: "row", justifyContent: 'space-between'}}>
      <TextField size='small' sx={{width: 1}}  inputRef={messageRef}  variant='outlined'/>
      <Button  onClick={sendMessage}  variant='contained'>Send</Button>
    </Stack>
      </div>
    </div>
</div>
  )
}

export default ChatPage
