import React, { useEffect, useState } from 'react'
import { Box, Button, Card, CardActions, CardContent, Dialog, Divider, Grid, Icon, Typography } from '@mui/material'
import CustomAvatar from 'src/@core/components/mui/avatar'
import CustomChip from 'src/@core/components/mui/chip'

const roleColors = {
  admin: 'error',
  editor: 'info',
  author: 'warning',
  maintainer: 'success',
  subscriber: 'primary'
}

const statusColors = {
  active: 'success',
  pending: 'warning',
  inactive: 'secondary'
}

export default function ProfileSummery(param) {
  // console.log('Profile Summery ==> ', param?.data)
  const data = param?.data

  const [show, setShow] = useState(param?.show)

  useEffect(() => {
    if (!show & !!data) {
      setShow(true)
    }
  }, [data])

  return (
    <>
      <Dialog
        fullWidth
        open={show}
        maxWidth='md'
        scroll='body'
        onClose={() => setShow(false)}
        // TransitionComponent={Transition}
        // onBackdropClick={() => setShow(false)}
        sx={{ '& .MuiDialog-paper': { overflow: 'visible' } }}
      >
        <Grid>
          <Grid item xs={12}>
            <Card>
              <CardContent sx={{ pt: 13.5, display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
                {data?.avatar ? (
                  <CustomAvatar
                    src={data?.avatar}
                    variant='rounded'
                    alt={data?.fullName}
                    sx={{ width: 100, height: 100, mb: 4 }}
                  />
                ) : (
                  <CustomAvatar
                    skin='light'
                    variant='rounded'
                    color={data?.avatarColor}
                    sx={{ width: 100, height: 100, mb: 4, fontSize: '3rem' }}
                  >
                    {/* {getInitials(data?.fullName)} */}
                  </CustomAvatar>
                )}
                <Typography variant='h4' sx={{ mb: 3 }}>
                  {data?.fullname}
                </Typography>
                <CustomChip
                  rounded
                  skin='light'
                  size='small'
                  label={data?.userrole}
                  color={roleColors[data?.userrole]}
                  sx={{ textTransform: 'capitalize' }}
                />
              </CardContent>

     

              <Divider sx={{ my: '0 !important', mx: 6 }} />

              <CardContent sx={{ pb: 4 }}>
                <Typography variant='body2' sx={{ color: 'text.disabled', textTransform: 'uppercase' }}>
                  Details
                </Typography>
                <Box sx={{ pt: 4 }}>
                  <Box sx={{ display: 'flex', mb: 3 }}>
                    <Typography sx={{ mr: 2, fontWeight: 500, color: 'text.secondary' }}>User ID:</Typography>
                    <Typography sx={{ color: 'text.secondary' }}>@{data?.userid}</Typography>
                  </Box>
                  <Box sx={{ display: 'flex', mb: 3 }}>
                    <Typography sx={{ mr: 2, fontWeight: 500, color: 'text.secondary' }}>Email:</Typography>
                    <Typography sx={{ color: 'text.secondary' }}>{data?.email}</Typography>
                  </Box>
                  <Box sx={{ display: 'flex', mb: 3, alignItems: 'center' }}>
                    <Typography sx={{ mr: 2, fontWeight: 500, color: 'text.secondary' }}>Member:</Typography>
                    <CustomChip
                      rounded
                      skin='light'
                      size='small'
                      label={data?.Member}
                      color={statusColors[data?.Member]}
                      sx={{
                        textTransform: 'capitalize'
                      }}
                    />
                  </Box>
                  <Box sx={{ display: 'flex', mb: 3 }}>
                    <Typography sx={{ mr: 2, fontWeight: 500, color: 'text.secondary' }}>Role:</Typography>
                    <Typography sx={{ color: 'text.secondary', textTransform: 'capitalize' }}>{data?.userrole}</Typography>
                  </Box>
                  <Box sx={{ display: 'flex', mb: 3 }}>
                    <Typography sx={{ mr: 2, fontWeight: 500, color: 'text.secondary' }}>Class:</Typography>
                    <Typography sx={{ color: 'text.secondary' }}>{data?.Member}</Typography>
                  </Box>
                  <Box sx={{ display: 'flex', mb: 3 }}>
                    <Typography sx={{ mr: 2, fontWeight: 500, color: 'text.secondary' }}>Grade:</Typography>
                    <Typography sx={{ color: 'text.secondary' }}> {data?.grade}</Typography>
                  </Box>

                      {/* We will set a condition here
                      If user logged in for the first time, we will remove password and pin from admin view  */}

                  <Box sx={{ display: 'flex', mb: 3 }}>
                    <Typography sx={{ mr: 2, fontWeight: 500, color: 'text.secondary' }}>PIN:</Typography>
                    <Typography sx={{ color: 'text.secondary' }}>{data?.PIN}</Typography>
                  </Box>
                  <Box sx={{ display: 'flex' }}>
                    <Typography sx={{ mr: 2, fontWeight: 500, color: 'text.secondary' }}>Password:</Typography>
                    <Typography sx={{ color: 'text.secondary' }}>{data?.password}</Typography>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>
          <Button onClick={()=> {param.success(false); setShow(false)}}>Close</Button>
        </Grid>
      </Dialog>
    </>
  )
}

// export default summery
