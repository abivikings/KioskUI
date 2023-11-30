// ** React Imports
import { useState, forwardRef, useEffect } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'

// import Chip from '@mui/material/Chip'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'

// import Switch from '@mui/material/Switch'
import Dialog from '@mui/material/Dialog'
import Button from '@mui/material/Button'
import { styled } from '@mui/material/styles'
import MenuItem from '@mui/material/MenuItem'
import Typography from '@mui/material/Typography'
import Fade from '@mui/material/Fade'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'

// import FormControlLabel from '@mui/material/FormControlLabel'
import IconButton from '@mui/material/IconButton'

// ** Custom Component Import
import CustomTextField from 'src/@core/components/mui/text-field'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Form
import { Controller, useForm } from 'react-hook-form'

// ** STATE MANAGEMENT 
// import { useDispatch } from 'react-redux'
// import {  } from '../redux/state/counterSlice'

// import * as yup from 'yup'
// import { yupResolver } from '@hookform/resolvers/yup' 

const Transition = forwardRef(function Transition(props, ref) {
  return <Fade ref={ref} {...props} />
})

const CustomCloseButton = styled(IconButton)(({ theme }) => ({
  top: 0,
  right: 0,
  color: 'grey.500',
  position: 'absolute',
  boxShadow: theme.shadows[2],
  transform: 'translate(10px, -10px)',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: `${theme.palette.background.paper} !important`,
  transition: 'transform 0.25s ease-in-out, box-shadow 0.25s ease-in-out',
  '&:hover': {
    transform: 'translate(7px, -5px)'
  }
}))

const defaultValues = {
  Name: ''    
}

const AddMasterdataDrawer = props => {
  const { toggle,masterid,datastate } = props  
  
  console.log('add master data datastate', datastate)
  //const { masterid } = props
  console.log("props add", masterid)
  // ** States
  const [show, setShow] = useState(false)

  const handleShow = () => {
    // Only call the setShow() function if the state needs to be changed
    if (!show) {
      setShow(true)
    }
  }

  const {
    reset,   
    setValue,
    setError    
  } = useForm({
    defaultValues,
    mode: 'onChange'
  })
  
  const { control, handleSubmit, formState: { errors }, getValues } = useForm({
    mode: 'onSubmit'    
  });
  // useEffect(() => {
  //   console.log("Boom ---> ",toggle)
  // }, [control]);

  const onSubmit = data => {
    console.log(" data ",data)
    data.MasterId = masterid;
    console.log(" final data ",data) 
    postData(data) ;
  } 
  
  const my_url = `https://vehayamachanechakadosh.com:8080/api/MasterChild` ////// Leads Company Admin
  
  const postData = async (param) => {
    
    const myHeaders = new Headers()
    myHeaders.append('Content-Type', 'application/json')

    // myHeaders.append('Authorization', 'Bearer ' + localStorage.getItem('token'))

    const requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: JSON.stringify(param),
      redirect: 'follow'
    }

    console.log(requestOptions)

    const res = await fetch(my_url, requestOptions)
    const data = await res.json()
    if (res.ok) {
      
        // dispatch(usersList(userDispatch))
      setShow(false)      

      return { ok: true, data }
    } else {
      console.log('ERROR => ', data.error)

      return { ok: false, err: res, data }
    }
  
}

  const handleClose = () => { 
    setShow(false)
    //setValue('contact', Number(''))
    //toggle()
    reset()
  }
  

  return (
    <Card>
      <Button onClick={handleShow} variant='contained' sx={{ '& svg': { mr: 2 } }}>
        <Icon fontSize='1.125rem' icon='tabler:plus' />
        Add Master Data
      </Button>

      <Dialog
        disableEscapeKeyDown
        fullWidth
        open={show}
        maxWidth='md'
        scroll='body'
        onClose={(event, reason) => {
            if (reason !== 'backdropClick') {
              handleClose()
            }
          }}
        TransitionComponent={Transition}     
        sx={{ '& .MuiDialog-paper': { overflow: 'visible' } }}
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogContent
            sx={{
              pb: theme => `${theme.spacing(8)} !important`,
              px: theme => [`${theme.spacing(5)} !important`, `${theme.spacing(15)} !important`],
              pt: theme => [`${theme.spacing(8)} !important`, `${theme.spacing(12.5)} !important`]
            }}
          >
            <CustomCloseButton onClick={() => setShow(false)}>
              <Icon icon='tabler:x' fontSize='1.25rem' />
            </CustomCloseButton>
            <Box sx={{ mb: 8, textAlign: 'center' }}>
              <Typography variant='h3' sx={{ mb: 3 }}>
                Add User
              </Typography>
            </Box>
            <Grid container spacing={6}>
              <Grid item sm={4} xs={12}>
                {/* <CustomTextField fullWidth label='Full Name' placeholder='John' /> */}
                <Controller
                  name='Name'
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { value, onChange } }) => (
                    <CustomTextField
                      fullWidth                      
                      value={value}
                      sx={{ mb: 4 }}
                      label='Item Name'
                      onChange={onChange}
                      placeholder='Item Name'
                      error={Boolean(errors.fullname)}
                      {...(errors.Name && { helperText: errors.Name.message })}
                    />
                  )}
                />
              </Grid>

              <Grid item sm={4} xs={12}>
                <Controller
                  name='Accesskey'
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { value, onChange } }) => (
                    <CustomTextField
                      fullWidth
                      value={value}
                      sx={{ mb: 4 }}
                      label='Access key'
                      onChange={onChange}
                      placeholder='Access key'
                      error={Boolean(errors.username)}
                      {...(errors.Accesskey && { helperText: errors.Accesskey.message })}
                    />
                  )}
                />
              </Grid>

              <Grid item sm={4} xs={12}>
                

                <Controller
                  name='Value'
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { value, onChange } }) => ( 
                    <CustomTextField
                      fullWidth
                      value={value}
                      sx={{ mb: 4 }}
                      label='Value'
                      onChange={onChange}
                      placeholder='Value'
                      error={Boolean(errors.email)}
                      {...(errors.Value && { helperText: errors.Value.message })}
                    />
                  )}
                />
              </Grid> 
             
            </Grid>
          </DialogContent>
          <DialogActions
            sx={{
              justifyContent: 'center',
              px: theme => [`${theme.spacing(5)} !important`, `${theme.spacing(15)} !important`],
              pb: theme => [`${theme.spacing(8)} !important`, `${theme.spacing(12.5)} !important`]
            }}
          >
            <Button type='submit' variant='contained' sx={{ mr: 1 }}>
              Submit
            </Button>
            <Button variant='tonal' color='secondary' onClick={handleClose}>
              Discard
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </Card>
  )
}

export default AddMasterdataDrawer