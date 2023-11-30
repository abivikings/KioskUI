
import Box from '@mui/material/Box'
import useMediaQuery from '@mui/material/useMediaQuery'
import { styled, useTheme } from '@mui/material/styles'

// ** Third Party Imports
import * as yup from 'yup'

// ** Hooks
// import { useAuth } from 'src/hooks/useAuth'
import { useSettings } from 'src/@core/hooks/useSettings'

// ** Layout Import
import BlankLayout from 'src/@core/layouts/BlankLayout'

// ** Demo Imports
import FooterIllustrationsV2 from 'src/views/pages/auth/FooterIllustrationsV2'
import { useState } from 'react'
import StudentLogin from './StudentLogin'

const LoginIllustration = styled('img')(({ theme }) => ({
  zIndex: 2,
  maxHeight: 680,
  marginTop: theme.spacing(12),
  marginBottom: theme.spacing(12),
  [theme.breakpoints.down(1540)]: {
    maxHeight: 550
  },
  [theme.breakpoints.down('lg')]: {
    maxHeight: 500
  }
}))

const RightWrapper = styled(Box)(({ theme }) => ({
  width: '100%',
  [theme.breakpoints.up('md')]: {
    maxWidth: 450
  },
  [theme.breakpoints.up('lg')]: {
    maxWidth: 600
  },
  [theme.breakpoints.up('xl')]: {
    maxWidth: 750
  }
}))


const LoginPage = () => {
  // ** Hooks
  // const auth = useAuth()
 
  const theme = useTheme()
  const { settings } = useSettings()
  const hidden = useMediaQuery(theme.breakpoints.down('md'))
  const [activeLogin, setActiveLogin] = useState('')

  // ** Vars
  const { skin } = settings

  function btnHandler(x) {
    x.preventDefault()
    setActiveLogin(x.target.value)
  }

  const imageSource = skin === 'bordered' ? 'auth-v2-login-illustration-bordered' : 'auth-v2-login-illustration'
  

  return (
    <Box className='content-right' sx={{ backgroundColor: 'background.paper' }}>
      {!hidden ? (
        <Box
          sx={{
            flex: 1,
            display: 'flex',
            position: 'relative',
            alignItems: 'center',
            borderRadius: '20px',
            justifyContent: 'center',
            backgroundColor: 'customColors.bodyBg',
            margin: theme => theme.spacing(8, 0, 8, 8)
          }}
        >
          <LoginIllustration alt='login-illustration' src={`/images/pages/${imageSource}-${theme.palette.mode}.png`} />
          <FooterIllustrationsV2 />
        </Box>
      ) : null}
      <RightWrapper>
        <Box
          sx={{
            p: [6, 12],
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <Box sx={{ width: '100%', maxWidth: 450 }}>

            {/* <Stack spacing={2} direction='row'>
              <Button type='button' onClick={btnHandler} value='student' variant='contained'>
                Student Login
              </Button>

              <Button type='button' onClick={btnHandler} value='admin' variant='contained'>
                Admin Login
              </Button>
            </Stack>

            {activeLogin === 'student' ? (
              <Box sx={{ mb: 4 }}>
                <h3>Student Login with QR Code</h3>
                <StudentLogin />
              </Box>
            ) : (
              activeLogin === 'admin' && (
                <Box sx={{ mb: 4 }}>
                  <AuthorityLogin />
                </Box>
              )
            )} */}
            <Box sx={{ mb: 4 }}>
              {/* <h3>Student Login with QR Code</h3> */}
              <StudentLogin />
            </Box>
            
            {/* <Box sx={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', justifyContent: 'center' }}>
              <Typography sx={{ color: 'text.secondary', mr: 2 }}>Forget to Bring QR code?</Typography>
              <Typography href='/student' component={LinkStyled}>
                Click here to login
              </Typography>
            </Box> */}

          </Box>
        </Box>
      </RightWrapper>
    </Box>
  )
}
LoginPage.getLayout = page => <BlankLayout>{page}</BlankLayout>
LoginPage.guestGuard = true

export default LoginPage
