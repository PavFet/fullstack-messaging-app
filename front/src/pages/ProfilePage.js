import React from 'react'
import { useParams } from 'react-router-dom'
import { Stack, TextField, Button, Typography } from '@mui/material'
import http from '../plugins/http'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { fetchUsers, setLoggedInUser } from '../features/users'


const ProfilePage = () => {
  const disp = useDispatch()
  const nav = useNavigate()
  const [registerError, setRegisterError] = React.useState('')
  const [userNameError, setUserNameError] = React.useState(false)
  const [passwordErrorLength, setPasswordErrorLength] = React.useState(false)
  const [passwordErrorMatch, setPasswordErrorMatched] = React.useState(false)

  const usernameRef = React.useRef()
  const passwordOneRef = React.useRef()
  const passwordTwoRef = React.useRef()
  const imgRef = React.useRef()

  const existSecret = localStorage.getItem('userSecret')
  const { id } = useParams()
  const [user, setUser] = React.useState('')

  React.useEffect(() => {
    http.get("user/"+id)
      .then((res) => setUser(res.user))
  }, [])

  const editProfile = async () => {
    if(usernameRef.current.value.length < 4 || usernameRef.current.value.length > 20) 
        {setUserNameError(true)
        } else { 
          setUserNameError(false)
        }
        if(usernameRef.current.value === '' || usernameRef.current.value.length < 1) setUserNameError(false)
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
      prevUsername: user.username,
      username: usernameRef.current.value === '' ? user.username : usernameRef.current.value,
      password: passwordOneRef.current.value,
      profileImg: imgRef.current.value === '' ? user.profileImg : imgRef.current.value,
      id: user._id
    }
    
    
      const res = await http.post(data, 'changeProfile')
      if(!res.success) {
        setRegisterError(res.message)
      } else {
        await http.get('allUsers')
          .then((res) => {
            disp(fetchUsers({allUsers: res.users}))
          }
          )
        await http.get('user/'+id)
          .then((res) => {
            console.log(res)
            disp(setLoggedInUser({user: res.user}))
          })
        nav('/')
    }
  }

  return (
    <div class="profile-card">
    <div class="image">
      <img src={user.profileImg} alt="" class="profile-img" />
    </div>
    <div class="text-data">
      <span class="name">{user.username}</span>
      {
        user.secret === existSecret && 
        <Stack sx={{width: '300px', padding: 1, margin: '0 auto', display: 'flex', alignItems: 'center'}}>Change profile details
          <TextField error={userNameError} helperText={userNameError ? 'Incorrect entry' : ''} inputRef={usernameRef ? usernameRef : user.username}  variant='outlined' sx={{marginY: 1}} label='New username' multiline placeholder='New username'/>
          <TextField error={passwordErrorLength} helperText={passwordErrorLength ? 'Passwords must in range 4-20' : ''} inputRef={passwordOneRef} sx={{marginY: 2}}  variant='outlined' label='New or old password' multiline placeholder='New or old password'/>
          <TextField error={passwordErrorMatch} helperText={passwordErrorMatch ? 'Passwords must be matched' : ''}  inputRef={passwordTwoRef}  variant='outlined' label='Confirm password' multiline placeholder='Confirm password'/>
          <TextField  inputRef={imgRef} sx={{marginY: 2,  overflow: "hidden", textOverflow: "ellipsis"}} variant='outlined' label='New profile image' multiline placeholder='New profile image'/>
          <Typography  component={'h5'}>{registerError && registerError}</Typography>
          <Button onClick={editProfile} sx={{marginY: 1}} variant='contained'>Save</Button>
        </Stack>
      }
    </div>
  </div>
  )
}

export default ProfilePage