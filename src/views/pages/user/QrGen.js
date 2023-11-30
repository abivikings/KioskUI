import { Box, Button, Card, CardContent, Dialog, Grid } from '@mui/material'
import QRCode from 'qrcode.react'
import { useEffect, useState } from 'react'

export default function QrGen(param) {
  // console.log("QR GEN",param)
  // console.debug(param)
  const qrData = param?.qr
  const [show, setShow] = useState(param?.show)
  useEffect(() => {
    if (!show & !!qrData) {
      setShow(true)
    }
  }, [qrData])

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
        <Grid container spacing={6.5}>
          <Grid item xs={5}>
            <Card>
              <CardContent>
                <Box sx={{ mb: 4.75, display: 'flex', flexWrap: 'wrap', alignItems: 'center' }}>
                  <QRCode value={qrData} size={100} />
                </Box>
                <Button onClick={()=> {param.success(false); setShow(false)}}>Close</Button>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={7}>
            <p>Email: {param?.qr}</p>
            <p>User ID: {param.userData?.userid}</p>
            <p>Password: {param.userData?.password}</p>
          </Grid>
        </Grid> 

        
      </Dialog>
    </>
  )
}
