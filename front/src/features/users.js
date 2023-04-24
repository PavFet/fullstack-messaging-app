import {createSlice} from "@reduxjs/toolkit";

export const userSlice  = createSlice({
  name: "users",
  initialState: {
    allUsers: {

    },
    loggedInUser: {

    },
    conversations: {

    },
    participantUsername: ''
  },
  reducers: {
    fetchUsers: (state, action) => {
      const { allUsers } = action.payload
      state.allUsers = allUsers
   },
   setLoggedInUser: (state, action) => {
    const { user } = action.payload
    state.loggedInUser = user
   },
   fetchConversations: (state, action) => {
    const { conversations } = action.payload
    state.conversations = conversations
   },
   addComment: (state, action) => {
    const { comment } = action.payload
    return {
      ...state,
      comment
    }
   },
   setUsername: (state, action) => {
    const { username } = action.payload
    state.participantUsername = username
   }
  },
  clearStates: (state, action) => {
    state = ''
  }
})

export const {fetchUsers, clearStates, setLoggedInUser, fetchConversations, addComment, setUsername} = userSlice.actions
export default userSlice.reducer