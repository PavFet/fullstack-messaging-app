import React from 'react'
import { Stack, TextField, Button, Typography } from '@mui/material'
import http from "../plugins/http"
import {useDispatch} from "react-redux";
import { fetchUsers, setLoggedInUser, setUsername } from '../features/users'
import { useNavigate } from 'react-router-dom';


const LoginPage = () => {
  const [getError, setError] = React.useState('')
  const nav = useNavigate()
  const disp = useDispatch()
  const usernameRef = React.useRef()
  const passwordRef = React.useRef()
  const login = async () => {
    const data = {
      username: usernameRef.current.value,
      password: passwordRef.current.value
    }
  
    const res = await http.post(data, 'login')
    if(!res.success) {
      setError(res.message)
    } else {  
      disp(fetchUsers({allUsers: res.allUsers}))
      localStorage.setItem("userSecret", res.secret)
      disp(setLoggedInUser({user: res.user}))
      disp(setUsername({username: res.user.username}))
      nav('/')
    }
  }
  return (
    <Stack sx={{ width: '300px', border: 1, borderColor: 'primary.main', padding: 1, margin: '20px auto', display: 'flex', alignItems: 'center'}}>
      <TextField  inputRef={usernameRef} required variant='outlined' label='Username' multiline placeholder='Username'/>
      <TextField  inputRef={passwordRef} sx={{marginY: 2}} required variant='outlined' label='Password' multiline placeholder='Password'/>
      {getError && <Typography component={'h5'}>{getError}</Typography> }
      <Button onClick={login} sx={{marginY: 1}} variant='contained'>Login</Button>
    </Stack>
  )
}

export default LoginPage