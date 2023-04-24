import React from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { Avatar } from '@mui/material'
import { useDispatch } from 'react-redux'
import { clearStates } from '../features/users'

const Toolbar = () => {
  const disp = useDispatch()
  const loggedInUser = useSelector((state) => state.users.loggedInUser)
  const secret = localStorage.getItem('userSecret')
  const signOut = () => {
    localStorage.removeItem('userSecret')
    disp(clearStates())
  }

  return (
    <div className="d-flex space-ard toolbar">
      {secret ? 
      <>
        <Link to='/allUsers'>All users</Link>
        <Link to='/chatHistory'>Conversations</Link>
        <Link to='/' onClick={() => {
          signOut()
      }}>
        Sign out</Link>
        <div className='toolbar-welcome-box'>
          <Avatar sx={{width: "100px", height: "100px"}}>
            <img alt="" className='toolbar-avatar' src={loggedInUser.profileImg}></img>
          </Avatar>
          <h5>Hi, {loggedInUser.username}</h5>
        </div>
      </> 
      :
      <>
        <Link to='/register'>Register</Link>
        <Link to='/login'>Login</Link>
      </>
    }
   
    </div>
  )
}

export default Toolbar