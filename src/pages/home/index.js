// ** MUI Imports
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'

import { useAuth } from 'src/hooks/useAuth'
import { Box } from '@mui/system'

import { styled, useTheme } from '@mui/material/styles'
import Button from '@mui/material/Button'

import Counter from '../components/Counter'
import Profile from '../components/Profile'

// import Counter from '../Counter/index'

const Home = () => {
  
const LoginIllustration = styled('img')(({ theme }) => ({
  zIndex: 2,
  maxWidth: 150
}))

const Illustration = styled('img')(({ theme }) => ({
  right: 20,
  bottom: 0,
  position: 'absolute',
  [theme.breakpoints.down('sm')]: {
    right: 5,
    width: 110
  }
}))

//  var userData_custom = window.localStorage.getItem('userData')
const auth = useAuth()
 if(auth.user.userrole === 'admin'){
  return (    
    <Grid container spacing={12}>
    <Grid item xs={12} sm={12} md={12}>
      <Card>
        <CardHeader
          sx={{
            textAlign: 'center',
            color: 'primary.main'
          }}
          title='Welcome to You Create Holiness: Admin Panel 🚀'></CardHeader>

        <Typography variant='h5' sx={{
          textAlign: 'center',
          mb: 0.5
        }}>
          Congratulations {auth.user.fullname}! 🎉
        </Typography>
      </Card>       
    </Grid>
    <Grid item xs={12} sm={12} md={12}>
      <Card>
        <CardHeader
          sx={{
            textAlign: 'center',
            color: 'primary.main'
          }}
          title='Welcome to Counter App: for redux testing 🚀'></CardHeader>

        <Typography variant='h5' sx={{
          textAlign: 'center',
          mb: 0.5
        }}>
          {/* <Provider store={store}> */}
             <Counter />   
           
             {/* </Provider> */}
        </Typography>
      </Card>       
    </Grid>
  </Grid>
  
)
 }
 else if(auth.user.userrole === 'student'){
  return (
    <Grid container spacing={12}>
    <Grid item xs={12} sm={12} md={12}>
      <Card>
        <CardHeader
        sx={{
          textAlign: 'center'
        }}
         title='Welcome to You Create Holiness: Student Panel 🚀'></CardHeader>
         
        <Typography variant='h5' sx={{ 
          textAlign: 'center',
          mb: 0.5 }}>
          Congratulations {auth.user.fullname}! 🎉
        </Typography>
        <Typography variant='h4' sx={{ 
          textAlign: 'center',
          mb: 0.75, 
          color: 'primary.main',
          margin: theme => theme.spacing(2, 2, 8, 2)
          }}
          >
        My membership goal: {auth.user.Member}
        </Typography>
      </Card>
    </Grid>
    </Grid>
  )
}
}

export default Home
