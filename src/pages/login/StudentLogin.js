import React, { useEffect, useState } from 'react'
import { Html5QrcodeScanner } from 'html5-qrcode'
import axios from 'axios'
import { Box } from '@mui/system'
import CustomTextField from 'src/@core/components/mui/text-field'
import { Icon, IconButton, InputAdornment } from '@mui/material'
import { styled, useTheme } from '@mui/material/styles'
import Divider from '@mui/material/Divider'

import Button from '@mui/material/Button'

// ** Hooks
import { useAuth } from 'src/hooks/useAuth'
import Alert from '@mui/material/Alert'
import AlertTitle from '@mui/material/AlertTitle'

import Link from 'next/link'

// ** Form
import { Controller, useForm } from 'react-hook-form'
import { useRouter } from 'next/router'



export default function QrCodeScanner() {
  const theme = useTheme()

  const auth = useAuth()

  const router = useRouter()
  const [scanResult, setScanResult] = useState(null)
  const [data, setData] = useState([])
  const [showPassword, setShowPassword] = useState(false)
  const [succ, setSucc] = useState(false)
  const [error, setError] = useState(null)

  const LoginIllustration = styled('img')(({ theme }) => ({
    zIndex: 2,
    maxWidth: 125
  }))

  useEffect(() => {
    const scanner = new Html5QrcodeScanner('reader', {
      qrbox: {
        width: 250,
        height: 250
      },
      fps: 5
    })

    scanner.render(success, error)
    function success(result) {
      console.log('student login check', result)
      scanner.clear()
      setScanResult(result)
      axios
        .get(`https://vehayamachanechakadosh.com:8080/api/GetUserInfoByUserId?UserId=${result}`)
        .then(response => setData(response.data))

      //   alert('Get Lol')
    }

    function error(err) {
      console.warn(err)
    }
  }, [])

  function handlePasswordReset() {
    // Add logic to handle password reset, e.g., show a modal or navigate to the reset page
    console.log('Password reset clicked!');
    // You may replace the console.log with the actual logic for handling the password reset.
  }

  function pinHandler(x) {
    console.log('student pin check', x)
    const val = Number(x.target.value)
    if (val === data.PIN) {
      setSucc(true)
      const { userid, password } = data
      const email = userid
      auth.login({ email, password }, () => {
        setError('email', {
          type: 'manual',
          message: 'Email or Password is invalid'
        })
      })
    }
    else{
      setSucc(false);
      setError({
        type: 'manual',
        message: (
          <span>
            Incorrect PIN. {' '}
            <span style={{ color: '#12A3EA', cursor: 'pointer' }} onClick={handlePasswordReset}>
              Click Here 
            </span>
            &nbsp;to RESET your password.
          </span>
        ),
      })
    }
  }

  const {
    reset,
    control,
    handleSubmit,
    formState: { errors },
    getValues,
    watch,
    setValue 
  } = useForm({
    mode: 'onSubmit'
  })
  const userId = data.userid;
  
  const onSubmit = data => {
    const updatePINpass = {
      password: data.password,
      PIN: data.PIN,
      UserId: userId,
      UpdateBy: userId
    }

    console.log('updatePINpass ===> ', updatePINpass)

    postData(updatePINpass)
  }
  const my_url = `${process.env.NEXT_PUBLIC_BASE_URL}api/User/PINPassword` ////// 

  const postData = async param => {
    const myHeaders = new Headers()
    myHeaders.append('Content-Type', 'application/json')

    // myHeaders.append('Authorization', 'Bearer ' + localStorage.getItem('token'))

    const requestOptions = {
      method: 'PUT',
      headers: myHeaders,
      body: JSON.stringify(param),
      redirect: 'follow'
    }


    console.log(requestOptions)

    const res = await fetch(my_url, requestOptions)
    const data = await res.json()
    if (res.ok) {

        // dispatch(usersList(userDispatch))
      // setShow(false)
      // toggle(true)
      router.replace('/')

      return { ok: true, data }
    } 
    else {
      console.log('ERROR => ', data.error)
      
      return { ok: false, err: res, data }
    }
  }

  return (
    <>
      <Box
        sx={{
          flex: 1,
          display: 'flex',
          position: 'relative',
          alignItems: 'center',
          borderRadius: '20px',
          justifyContent: 'center',
          margin: theme => theme.spacing(8, 8, 0, 8)
        }}
      >
        <LoginIllustration alt='login-illustration' src={`/images/pages/studentLogin.png`} />
      </Box>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center'
        }}
      >
        <h2>Student Login with QR Code</h2>
      </Box>

      {scanResult ? (
        <>
          {data.userid === scanResult && !succ ? (
            <div>
              {data.userstatus !== 'NEW' ? (
                <div>
                  <h4>Please set up the PIN and password to continue..</h4>
                  
        <form onSubmit={handleSubmit(onSubmit)}>
                  
                  <Controller
                    name='PIN'
                    control={control}
                    rules={{ required: true }}
                    render={({ field: { value, onChange } }) => (
                      <CustomTextField
                        fullWidth
                        value={value}
                        sx={{ mb: 4 }}
                        label='PIN'
                        onChange={onChange}
                        type={showPassword ? 'text' : 'password'}
                        error={Boolean(errors.PIN)}
                        {...(errors.PIN && { helperText: errors.PIN.message })}
                        InputProps={{
                          endAdornment: (
                            <InputAdornment position='end'>
                              <IconButton
                                edge='end'
                                onMouseDown={e => e.preventDefault()}
                                onClick={() => setShowPassword(!showPassword)}
                              >
                                <Icon fontSize='1.25rem' fontColor='black' icon={showPassword ? 'tabler:eye' : 'tabler:eye-off'} />
                              </IconButton>
                            </InputAdornment>
                          )
                        }}
                      />
                    )}
                  />
                  
                  <Controller
                    name='password'
                    control={control}
                    rules={{ required: true }}
                    render={({ field: { value, onChange } }) => (
                      <CustomTextField
                        fullWidth
                        value={value}
                        sx={{ mb: 4 }}
                        label='Password'
                        onChange={onChange}
                        type={showPassword ? 'text' : 'password'}
                        error={Boolean(errors.password)}
                        {...(errors.password && { helperText: errors.password.message })}
                        InputProps={{
                          endAdornment: (
                            <InputAdornment position='end'>
                              <IconButton
                                edge='end'
                                onMouseDown={e => e.preventDefault()}
                                onClick={() => setShowPassword(!showPassword)}
                              >
                                <Icon fontSize='1.25rem' fontColor='black' icon={showPassword ? 'tabler:eye' : 'tabler:eye-off'} />
                              </IconButton>
                            </InputAdornment>
                          )
                        }}
                      />
                    )}
                  />
                  <Button type='submit' variant='contained'>Set PIN & Password</Button>
          </form>
                </div>
              ) : (
                <Box sx={{ mb: 1.5 }}>
                  <CustomTextField
                    fullWidth
                    label='PIN'
                    rules={{ required: true }}
                    onChange={pinHandler}
                    id='auth-login-v2-password'
                    type={showPassword ? 'text' : 'password'}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position='end'>
                          <IconButton
                            edge='end'
                            onMouseDown={e => e.preventDefault()}
                            onClick={() => setShowPassword(!showPassword)}
                          >
                            <Icon fontSize='1.25rem' icon={showPassword ? 'tabler:eye' : 'tabler:eye-off'} />
                          </IconButton>
                        </InputAdornment>
                      )
                    }}
                  />
                  {error && <p style={{ color: 'red' }}>{error.message}</p>}
                </Box>
              )}
            </div>
          ) : (
            <div>
              <Alert severity='warning'>
                <AlertTitle>QR Code doesn't match!</AlertTitle>
                <Link href="/">
                  Click Here 
                </Link>
                &nbsp; to try again..
              </Alert>
              {/* <b>
                LOGIN SUCCESS {data.userid}. <br /> Please wait, we are validating your data.
              </b> */}
            </div>
          )}
        </>
      ) : (
        <div style={{position:" relative ", width:" 100% ", maxWidth:" 600px ", margin:" 0 auto ",}}>
          <div style={{position: "absolute ", top: "2px", left: "4px", width: "98% ", height: "21px ", backgroundColor: "#ffffff ", zIndex: "3"}}></div>

          {/* <div id='reader'  style={{position: "relative", padding: "10px", border: "1px solid #ccc", width: "100%", maxWidth: "600px", margin: "0 auto", { #reader__dashboard_section { display:"none" } }}}></div> */}
          <div id='reader'></div>
        </div>
      )}

      {/* <Divider>
        <Button fullWidth type='submit' variant='contained' sx={{ mb: 4 }}>
          Login
        </Button>
      </Divider> */}
    </>
  )
}
