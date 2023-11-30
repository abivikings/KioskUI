// ** React Imports
import { useState, forwardRef, useEffect } from 'react'
import { useRandomPassword, useRandomString } from 'src/hooks/useRandom'

// ** MUI Imports
import Box from '@mui/material/Box'

// import Chip from '@mui/material/Chip'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'

// import Switch from '@mui/material/Switch'
import Dialog from '@mui/material/Dialog'
import Button from '@mui/material/Button'
import { styled } from '@mui/material/styles'

// import MenuItem from '@mui/material/MenuItem'
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
import { useAuth } from 'src/hooks/useAuth'

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

const EditUserDrawer = param => {
  const { toggle } = param
  const data = param?.data

  const [show, setShow] = useState(param?.show)

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

  //   const userRole = watch('userrole')
  const [userRole, setUserRole] = useState(watch('userrole'))
  const [userMemberId, setUserMemberId] = useState()

  useEffect(() => {
    if (!show & !!data) {
      setShow(true)
    }
    setUserRole(data?.userrole)
    setUserMemberId(data?.MemberId?.toString())
    console.log(' data?.MemberId?.toString() -> ', data?.MemberId?.toString())
  }, [data])

  const demoGetData = {
    id: 2,
    MemberId: 2,
    Member: 'Silver  member',
    userid: '1700599640',
    userrole: 'Student',
    PIN: 5781,
    fullname: 'Abraham',
    nickname: null,
    Class: 'W',
    grade: '3',
    filepath: null,
    filename: null,
    email: 'abraham001@gmail.com',
    password: '6iECjk0)',
    Id: 2,
    EntryDt: '2023-11-04T00:00:00',
    EntryBy: 'sysadmin',
    UpdateDt: '2023-11-21T20:47:21.003',
    UpdateBy: null,
    IsActive: true,
    Remarks: null
  }

  const demoUpdateData = {
    Id: 2,
    UserId: '1700599640',
    MemberId: '1',
    UserRole: 'admin',
    PIN: 4567,
    UserName: 'test',
    Password: '1234',
    email: 'juliocesar@gmail.com',
    UpdateBy: 'sysadmin',
    UserProfiles: {
      Id: 2,
      UserAccountId: 2,
      UserId: '1700599640',
      FullName: 'Abraham Lincon',
      Class: 'X',
      Grade: '47',
      UpdateBy: 'sysadmin'
    }
  }

  const { randomString, generateRandomString } = useRandomString(4) // if you are wishing to gereate random string //

  const { password, generateRandomPassword } = useRandomPassword()

  useEffect(() => {
    console.log(userRole)
    if (userRole !== 'Student') {
      const inputClear = ['Class', 'grade']
      inputClear.forEach(fieldName => {
        setValue(fieldName, null)
      })
    }
  }, [userRole])

  const auth = useAuth()
  const entryPerson = !!auth?.user ? auth?.user.userId : 'unauthorizedEntry'
  const my_url = `${process.env.NEXT_PUBLIC_BASE_URL}api/User` //////

  console.log(' entry Person => ', entryPerson)
  // console.log(' Form Val => ', control._formValues)
  useEffect(() => {
    generateRandomString()
    generateRandomPassword() // it will generate 8 char random password - minimum a small letter, a capital letter, a number and a special character
  }, [])

  useEffect(() => {
    const putData = async () => {
      const myHeaders = new Headers()
      myHeaders.append('Content-Type', 'application/json')

      const datas = {
        Id: 3,
        UserId: '1700772433',
        MemberId: '3',
        UserRole: 'Student',
        PIN: 4567,
        UserName: 'bunga',
        Password: '1234',
        email: 'bungabunga@gmail.com',
        UpdateBy: 'chaim.levilev@gmail.com"',
        UserProfiles: {
          Id: 58,
          UserAccountId: 3,
          UserId: '1700772433',
          FullName: 'Bunga Lala',
          Class: 'X',
          Grade: '4',
          UpdateBy: 'chaim.levilev@gmail.com"'
        }
      }

      const requestOptions = {
        method: 'PUT',
        headers: myHeaders,
        body: JSON.stringify(datas),
        redirect: 'follow'
      }

      const res = await fetch(my_url, requestOptions)
      const data = await res.json()
      if (res.ok) {

        console.log("X data =-=>",data)

        return { ok: true, data }
      } else {
        console.log('ERROR => ', data.error)

        return { ok: false, err: res, data }
      }
    }

    putData()
  }, [])

  useEffect(() => {
    console.log('Control form -> ', control)
  }, [control])

  const onSubmit = data => {
    const randomPassword = password

    const userAddData = {
      MemberId: data.Member,
      userrole: data.userrole,
      username: data.username,
      UpdateBy: entryPerson,
      email: data.email,
      userId: 'null',
      password: randomPassword,
      PIN: randomString,
      UserProfiles: {
        fullname: data.fullname,
        Class: data.Class ? data.Class : null,
        grade: data.grade ? data.grade : null,
        UpdateBy: entryPerson
      }
    }

    console.log('userAddData ===> ', userAddData)

    postData(userAddData)
  }

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

    console.log(' requestOptions => ', requestOptions)

    // const res = await fetch(my_url, requestOptions)
    // const data = await res.json()
    // if (res.ok) {
    //   // dispatch(usersList(userDispatch))
    //   setShow(false)
    //   toggle(true)

    //   return { ok: true, data }
    // } else {
    //   console.log('ERROR => ', data.error)

    //   return { ok: false, err: res, data }
    // }
  }

  const handleClose = () => {
    setShow(false)
    reset()
    // toggle
  }

  return (
    <Card>
      <Dialog
        fullWidth
        open={show}
        maxWidth='md'
        scroll='body'
        onClose={() => setShow(false)}
        TransitionComponent={Transition}
        // onBackdropClick={() => setShow(false)}
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
                Edit User
              </Typography>
            </Box>
            <Grid container spacing={6}>
              <Grid item sm={8} xs={12}>
                {/* <CustomTextField fullWidth label='Full Name' placeholder='John' /> */}
                <Controller
                  name='fullname'
                  control={control}
                  rules={{ required: true }}
                  defaultValue={data?.fullname}
                  render={({ field: { value, onChange } }) => (
                    <CustomTextField
                      fullWidth
                      value={value}
                      sx={{ mb: 4 }}
                      label='Full Name'
                      onChange={onChange}
                      placeholder='John Doe'
                      error={Boolean(errors.fullname)}
                      {...(errors.fullname && { helperText: errors.fullname.message })}
                    />
                  )}
                />
              </Grid>

              <Grid item sm={4} xs={12}>
                <Controller
                  name='username'
                  control={control}
                  rules={{ required: true }}
                  defaultValue={data?.username}
                  render={({ field: { value, onChange } }) => (
                    <CustomTextField
                      fullWidth
                      value={value}
                      sx={{ mb: 4 }}
                      label='User Name'
                      onChange={onChange}
                      placeholder='Rayan'
                      error={Boolean(errors.username)}
                      {...(errors.username && { helperText: errors.username.message })}
                    />
                  )}
                />
              </Grid>

              <Grid item xs={12}>
                <Controller
                  name='email'
                  control={control}
                  rules={{ required: true }}
                  defaultValue={data?.email}
                  render={({ field: { value, onChange } }) => (
                    <CustomTextField
                      fullWidth
                      value={value}
                      sx={{ mb: 4 }}
                      label='Email'
                      onChange={onChange}
                      placeholder='john@xyz.com'
                      error={Boolean(errors.email)}
                      {...(errors.email && { helperText: errors.email.message })}
                    />
                  )}
                />
              </Grid>

              <Grid item sm={6} xs={12}>
                <Controller
                  name='userrole'
                  control={control}
                  rules={{ required: true }}
                  defaultValue={data?.userrole}
                  render={({ field: { value, onChange } }) => (
                    <CustomTextField
                      select
                      value={value}
                      onChange={onChange}
                      fullWidth
                      id='userrole-select'
                      label='User Role'
                      sx={{ mb: 4 }}
                      error={Boolean(errors.userrole)}
                      aria-describedby='validation-userrole-select'
                      {...(errors.userrole && { helperText: errors.userrole.message })}
                      SelectProps={{
                        native: true // For Material-UI native Select
                      }}
                    >
                      <option value='null'>User Role</option>
                      <option value='Admin'>Admin</option>
                      <option value='Teacher'>Teacher</option>
                      <option value='Student'>Student</option>
                    </CustomTextField>
                  )}
                />
              </Grid>
              <Grid item sm={6} xs={12}>
                <Controller
                  name='Member'
                  control={control}
                  defaultValue={userMemberId}
                  render={({ field: { value, onChange } }) => (
                    <CustomTextField
                      select
                      fullWidth
                      id='Member-select'
                      label='Member'
                      value={value}
                      onChange={onChange}
                      sx={{ mb: 4 }}
                      error={Boolean(errors.Member)}
                      aria-describedby='validation-Member-select'
                      {...(errors.Member && { helperText: errors.Member.message })}
                      SelectProps={{ native: true }}
                    >
                      <option value='null'>Program</option>{' '}
                      {/* Non-member / Silver member / Gold member / Platinum member */}
                      <option value='1'>Non-member</option>
                      <option value='2'>Silver member</option>
                      <option value='3'>Gold member</option>
                      <option value='4'>Platinum member</option>
                    </CustomTextField>
                  )}
                />
              </Grid>
              {userRole === 'Student' && (
                <>
                  <Grid item sm={6} xs={12}>
                    <Controller
                      name='Class'
                      control={control}
                      defaultValue={data?.Class}
                      render={({ field: { value, onChange } }) => (
                        <CustomTextField
                          fullWidth
                          value={value}
                          sx={{ mb: 4 }}
                          label='Class'
                          onChange={onChange}
                          placeholder='A'
                        />
                      )}
                    />
                  </Grid>
                  <Grid item sm={6} xs={12}>
                    <Controller
                      name='grade'
                      control={control}
                      defaultValue={data?.grade}
                      render={({ field: { value, onChange } }) => (
                        <CustomTextField
                          fullWidth
                          value={value}
                          sx={{ mb: 4 }}
                          label='Grade'
                          onChange={onChange}
                          placeholder='1'
                        />
                      )}
                    />
                  </Grid>
                </>
              )}
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

export default EditUserDrawer
