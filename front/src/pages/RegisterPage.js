import React from 'react'
import { Stack, TextField, Button, Typography } from '@mui/material'
import http from "../plugins/http"
import {useNavigate} from "react-router-dom";

const RegisterPage = () => {
  const [registerError, setRegisterError] = React.useState('')
  const [userNameError, setUserNameError] = React.useState(false)
  const [passwordErrorLength, setPasswordErrorLength] = React.useState(false)
  const [passwordErrorMatch, setPasswordErrorMatched] = React.useState(false)

  const nav = useNavigate()

  const usernameRef = React.useRef()
  const passwordOneRef = React.useRef()
  const passwordTwoRef = React.useRef()

  const register = async () => {
    if(usernameRef.current.value.length < 4 || usernameRef.current.value.length > 20) 
        {setUserNameError(true)
        } else { 
          setUserNameError(false)
        }
    if(passwordOneRef.current.value.length < 4 || passwordOneRef.current.value.length > 20) 
        {setPasswordErrorLength(true)
        }  else { 
          setPasswordErrorLength(false)
        }    
    if(passwordOneRef.current.value !== passwordTwoRef.current.value) 
        {setPasswordErrorMatched(true)
          }  else { 
            setPasswordErrorMatched(false)
          }  

    const data = {
      username: usernameRef.current.value,
      password: passwordOneRef.current.value,
    }
    if(passwordOneRef.current.value === passwordTwoRef.current.value) {
      const res = await http.post(data, 'register')
      if(!res.success) {
        setRegisterError(res.message)
      } else {
        nav('/login')
    }
    }
  }

  return (
    <Stack sx={{width: '300px', border: 1, borderColor: 'primary.main', padding: 1, margin: '20px auto', display: 'flex', alignItems: 'center'}}>
      <TextField error={userNameError} helperText={userNameError ? 'Incorrect entry' : ''} inputRef={usernameRef} required variant='outlined' label='Username' multiline placeholder='Username'/>
      <TextField error={passwordErrorLength} helperText={passwordErrorLength ? 'Passwords must in range 4-20' : ''} inputRef={passwordOneRef} sx={{marginY: 2}} required variant='outlined' label='Password' multiline placeholder='Password'/>
      <TextField error={passwordErrorMatch} helperText={passwordErrorMatch ? 'Passwords must be matched' : ''}  inputRef={passwordTwoRef} required variant='outlined' label='Confirm password' multiline placeholder='Confirm password'/>
      <Typography  component={'h5'}>{registerError && registerError}</Typography>
      <Button onClick={register} sx={{marginY: 1}} variant='contained'>Register</Button>
    </Stack>
  )
}

export default RegisterPage



