import { Box, List } from '@mui/material'
import React from 'react'
import { useSelector } from 'react-redux'
import ConversationList from '../components/ConversationList'

const ChatHistoryPage = () => {
  const conversations = useSelector((state) => state.users.conversations)

  return (
    <>
    <Box sx={{display: 'flex', flexDirection: 'column', gap: 2, width: '400px', margin: '50px auto'}}>
    <List>
      {conversations.map((x, i) => <ConversationList key={i} data={x}>
      </ConversationList>)}
    </List>
    </Box>
      {conversations.length === 0 && <div className='empty-conversation-list'>YOU DONT HAVE ANY CONVERSATIONS</div> }
    </>
  )
}
export default ChatHistoryPage