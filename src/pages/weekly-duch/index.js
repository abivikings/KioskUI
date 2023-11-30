// ** React Imports
import { Fragment, useState } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Step from '@mui/material/Step'
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import Divider from '@mui/material/Divider'
import Stepper from '@mui/material/Stepper'
import StepLabel from '@mui/material/StepLabel'
import Typography from '@mui/material/Typography'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import FormControlLabel from '@mui/material/FormControlLabel'
import TextField from '@mui/material/TextField'
import Radio from '@mui/material/Radio'
import RadioGroup from '@mui/material/RadioGroup'

// ** Third Party Imports
import * as yup from 'yup'
import toast from 'react-hot-toast'
import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Custom Components Imports
import StepperCustomDot from './StepperCustomDot'
import CustomTextField from 'src/@core/components/mui/text-field'
import CustomCheckboxBasic from 'src/@core/components/custom-checkbox/basic'

// ** Styled Components
import StepperWrapper from 'src/@core/styles/mui/stepper'

const steps = [{}, {}, {}, {}, {}, {}, {}]

const defaultAccountValues = {
  // email: '',
}

const defaultPersonalValues = {}

const defaultSocialValues = {}

const accountSchema = yup.object().shape({
  // username: yup.string().required(),
})

const personalSchema = yup.object().shape({
  // country: yup.string().required(),
})

const socialSchema = yup.object().shape({
  // google: yup.string().required(),
})

const data = [
  {
    title: 'I covered my elbows completely at all times.',
    value: 'option 1'
  },
  {
    title: 'I covered my collarbone completely at all times.',
    value: 'option 2'
  },
  {
    title: 'I covered my knees completely at all times',
    value: 'option 3'
  },
  {
    meta: '(+3)',
    title: 'My skirt was 4 inches below my knees all week.',
    value: 'option 4'
  }
]

const data2 = [
  {
    title: 'I learned the Daughters of Dignity booklet this week with my Chavrusa.',
    value: 'option 1',
    meta: '(4)'
  },
  {
    title: 'I learned in 770',
    value: 'option 2',
    meta: '(+1)'
  }
]

const data3 = [
  {
    title: 'I attended maagalim this week',
    value: 'option 1'
  }
]

const data4 = [
  {
    title: 'I did not using any social media or watch any content on an unfiltered media platform.',
    value: 'option 1',
    meta: '(1)'
  },
  {
    title: 'I did not use any unfiltered device.',
    value: 'option 2',
    meta: '(+2)'
  }
]

const data5 = [
  {
    title: 'I kept to my Hachlata for the whole week.',
    value: 'option 1'
  }
]

const data6 = [
  {
    title: 'I affirm that everything on this card is 100% honest and I am proud to share it with the Rebbe.',
    value: 'option 1'
  }
]

const data7 = [
  {
    title: 'I attended maagalim this week',
    value: 'option 1'
  }
]

const StepperLinearWithValidation = () => {
  const initialSelected = data.filter(item => item.isSelected).map(item => item.value)
  const initialSelected2 = data2.filter(item => item.isSelected).map(item => item.value)
  const initialSelected3 = data3.filter(item => item.isSelected).map(item => item.value)
  const initialSelected4 = data4.filter(item => item.isSelected).map(item => item.value)
  const initialSelected5 = data5.filter(item => item.isSelected).map(item => item.value)
  const initialSelected6 = data6.filter(item => item.isSelected).map(item => item.value)
  const initialSelected7 = data7.filter(item => item.isSelected).map(item => item.value)

  // ** State
  const [selected, setSelected] = useState(initialSelected)
  const [selected2, setSelected2] = useState(initialSelected2)
  const [selected3, setSelected3] = useState(initialSelected3)
  const [selected4, setSelected4] = useState(initialSelected4)
  const [selected5, setSelected5] = useState(initialSelected5)
  const [selected6, setSelected6] = useState(initialSelected6)
  const [selected7, setSelected7] = useState(initialSelected7)

  const handleChange = value => {
    if (selected.includes(value)) {
      const updatedArr = selected.filter(item => item !== value)
      setSelected(updatedArr)
    } else {
      setSelected([...selected, value])
    }
  }

  const handleChange2 = value => {
    if (selected2.includes(value)) {
      const updatedArr2 = selected2.filter(item => item !== value)
      setSelected2(updatedArr2)
    } else {
      setSelected2([...selected2, value])
    }
  }

  const handleChange3 = value => {
    if (selected3.includes(value)) {
      const updatedArr3 = selected3.filter(item => item !== value)
      setSelected3(updatedArr3)
    } else {
      setSelected3([...selected3, value])
    }
  }

  const handleChange4 = value => {
    if (selected4.includes(value)) {
      const updatedArr4 = selected4.filter(item => item !== value)
      setSelected4(updatedArr4)
    } else {
      setSelected4([...selected4, value])
    }
  }

  const handleChange5 = value => {
    if (selected5.includes(value)) {
      const updatedArr5 = selected5.filter(item => item !== value)
      setSelected5(updatedArr5)
    } else {
      setSelected5([...selected5, value])
    }
  }

  const handleChange6 = value => {
    if (selected6.includes(value)) {
      const updatedArr6 = selected6.filter(item => item !== value)
      setSelected6(updatedArr6)
    } else {
      setSelected6([...selected6, value])
    }
  }

  const handleChange7 = value => {
    if (selected7.includes(value)) {
      const updatedArr7 = selected7.filter(item => item !== value)
      setSelected7(updatedArr7)
    } else {
      setSelected7([...selected7, value])
    }
  }

  // ** States
  const [activeStep, setActiveStep] = useState(0)

  const [state, setState] = useState({
    // password: '',
    // password2: '',
    // showPassword: false,
    // showPassword2: false
  })

  // ** Hooks
  const {
    reset: accountReset,
    control: accountControl,
    handleSubmit: handleAccountSubmit,
    formState: { errors: accountErrors }
  } = useForm({
    defaultValues: defaultAccountValues,
    resolver: yupResolver(accountSchema)
  })

  const {
    reset: personalReset,
    control: personalControl,
    handleSubmit: handlePersonalSubmit,
    formState: { errors: personalErrors }
  } = useForm({
    defaultValues: defaultPersonalValues,
    resolver: yupResolver(personalSchema)
  })

  const {
    reset: socialReset,
    control: socialControl,
    handleSubmit: handleSocialSubmit,
    formState: { errors: socialErrors }
  } = useForm({
    defaultValues: defaultSocialValues,
    resolver: yupResolver(socialSchema)
  })

  // Handle Stepper
  const handleBack = () => {
    setActiveStep(prevActiveStep => prevActiveStep - 1)
  }

  const handleReset = () => {
    setActiveStep(0)
    // socialReset({ google: '', twitter: '', facebook: '', linkedIn: '' })
  }

  const onSubmit = () => {
    setActiveStep(activeStep + 1)
    if (activeStep === steps.length - 1) {
      toast.success('Form Submitted')
    }
  }

  // Handle Password
  const handleClickShowPassword = () => {
    // setState({ ...state, showPassword: !state.showPassword })
  }

  // Handle Confirm Password
  const handleClickShowConfirmPassword = () => {
    // setState({ ...state, showPassword2: !state.showPassword2 })
  }

  const getStepContent = step => {
    // const [state, setState] = useState({
    //   step1: true,
    //   step2: false,
    //   step3: false,
    //   step4: false,
    //   step5: false,
    //   step6: false,
    //   step7: false
    // })

    // ** Vars
    const { option1, option2, option3, option4 } = state
    const error = [option1, option2, option3, option4].filter(v => v).length !== 2

    switch (step) {
      case 0:
        return (
          <form key={0} onSubmit={handleAccountSubmit(onSubmit)}>
            <Grid container spacing={4}>
              <Grid item xs={12}>
                <label>Back to Basics</label>
              </Grid>
              {data.map((item, index) => (
                <CustomCheckboxBasic
                  key={index}
                  data={data[index]}
                  selected={selected}
                  handleChange={handleChange}
                  name='custom-checkbox-basic'
                  gridProps={{ sm: 6, xs: 12 }}
                  sx={{ margin: '50px' }}
                />
              ))}
              <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Button variant='step1' color='secondary' disabled>
                  Back
                </Button>
                <Button type='submit' variant='contained'>
                  Next
                </Button>
              </Grid>
            </Grid>
          </form>
        )
      case 1:
        return (
          <form key={1} onSubmit={handlePersonalSubmit(onSubmit)}>
            <Grid container spacing={5}>
              <Grid item xs={12}>
                <label>Daughters of Digninty</label>
              </Grid>
              {data2.map((item2, index2) => (
                <CustomCheckboxBasic
                  key={index2}
                  data={data2[index2]}
                  selected={selected2}
                  handleChange={handleChange2}
                  name='custom-checkbox-basic'
                  gridProps={{ sm: 6, xs: 12 }}
                />
              ))}
              <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Button variant='step2' color='secondary' onClick={handleBack}>
                  Back
                </Button>
                <Button type='submit' variant='contained'>
                  Next
                </Button>
              </Grid>
            </Grid>
          </form>
        )
      case 2:
        return (
          <form key={2} onSubmit={handleSocialSubmit(onSubmit)}>
            <Grid container spacing={5}>
              <Grid item xs={12}>
                <label>Maagalim</label>
              </Grid>
              {data3.map((item3, index3) => (
                <CustomCheckboxBasic
                  key={index3}
                  data={data3[index3]}
                  selected={selected3}
                  handleChange={handleChange3}
                  name='custom-checkbox-basic'
                  gridProps={{ xs: 12 }}
                />
              ))}
              <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Button variant='step3' color='secondary' onClick={handleBack}>
                  Back
                </Button>
                <Button type='submit' variant='contained'>
                  Next
                </Button>
              </Grid>
            </Grid>
          </form>
        )
      case 3:
        return (
          <form key={2} onSubmit={handleSocialSubmit(onSubmit)}>
            <Grid container spacing={5}>
              <Grid item xs={12}>
                <label>Tech Check</label>
              </Grid>
              {data4.map((item4, index4) => (
                <CustomCheckboxBasic
                  key={index4}
                  data={data4[index4]}
                  selected={selected4}
                  handleChange={handleChange4}
                  name='custom-checkbox-basic'
                  gridProps={{ sm: 6, xs: 12 }}
                />
              ))}
              <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Button variant='step4' color='secondary' onClick={handleBack}>
                  Back
                </Button>
                <Button type='submit' variant='contained'>
                  Next
                </Button>
              </Grid>
            </Grid>
          </form>
        )
      case 4:
        return (
          <form key={2} onSubmit={handleSocialSubmit(onSubmit)}>
            <Grid container spacing={5}>
              <Grid item xs={12}>
                <Card>
                  <CardHeader title='My Hachlata' />
                  <CardContent>
                    <TextField
                      fullWidth
                      rows={4}
                      multiline
                      variant='filled'
                      label='My Hachlata'
                      id='textarea-filled-static'
                      sx={{ marginBottom: 5 }}
                    />

                    {data5.map((item5, index5) => (
                      <CustomCheckboxBasic
                        key={index5}
                        data={data5[index5]}
                        selected={selected5}
                        handleChange={handleChange5}
                        name='custom-checkbox-basic'
                        gridProps={{ xs: 12 }}
                      />
                    ))}
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Button variant='step5' color='secondary' onClick={handleBack}>
                  Back
                </Button>
                <Button type='submit' variant='contained'>
                  Next
                </Button>
              </Grid>
            </Grid>
          </form>
        )
      case 5:
        return (
          <form key={2} onSubmit={handleSocialSubmit(onSubmit)}>
            <Grid container spacing={5}>
              <Grid item xs={12}>
                <Card>
                  <CardHeader title='' />
                  <CardContent>
                    <Grid container spacing={5}>
                      <Grid item xs={4}>
                        <CustomTextField fullWidth label='Name' id='outlined-full-width' sx={{ mb: 4 }} />
                      </Grid>
                      <Grid item xs={4}>
                        <CustomTextField fullWidth label='Class' id='outlined-full-width' sx={{ mb: 4 }} />
                      </Grid>
                      <Grid item xs={4}>
                        <Typography>Membership Goal</Typography>
                        <RadioGroup row aria-label='uncontrolled' name='uncontrolled' defaultValue='value1'>
                          <FormControlLabel value='value1' control={<Radio />} label='Bronze' />
                          <FormControlLabel value='value2' control={<Radio />} label='Silver' />
                          <FormControlLabel value='value3' control={<Radio />} label='Gold' />
                        </RadioGroup>
                      </Grid>
                    </Grid>

                    {data6.map((item6, index6) => (
                      <CustomCheckboxBasic
                        key={index6}
                        data={data6[index6]}
                        selected={selected6}
                        handleChange={handleChange6}
                        name='custom-checkbox-basic'
                        gridProps={{ xs: 12 }}
                      />
                    ))}
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Button variant='step6' color='secondary' onClick={handleBack}>
                  Back
                </Button>
                <Button type='submit' variant='contained'>
                  Next
                </Button>
              </Grid>
            </Grid>
          </form>
        )
      case 6:
        return (
          <form key={2} onSubmit={handleSocialSubmit(onSubmit)}>
            <Grid container spacing={5}>
              <Grid item xs={12}>
                <label>Geder Moments</label>
              </Grid>

              {data5.map((item5, index5) => (
                <CustomCheckboxBasic
                  key={index5}
                  data={data5[index5]}
                  selected={selected5}
                  handleChange={handleChange5}
                  name='custom-checkbox-basic'
                  gridProps={{ xs: 12 }}
                />
              ))}
              <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Button variant='step7' color='secondary' onClick={handleBack}>
                  Back
                </Button>
                <Button type='submit' variant='contained'>
                  Submit
                </Button>
              </Grid>
            </Grid>
          </form>
        )
      default:
        return null
    }
  }

  const renderContent = () => {
    if (activeStep === steps.length) {
      return (
        <Fragment>
          <Typography>All steps are completed!</Typography>
          <Box sx={{ mt: 4, display: 'flex', justifyContent: 'flex-end' }}>
            <Button variant='contained' onClick={handleReset}>
              Reset
            </Button>
          </Box>
        </Fragment>
      )
    } else {
      return getStepContent(activeStep)
    }
  }

  return (
    <Card>
      <CardContent>
        <Stepper activeStep={activeStep}>
          {steps.map((step, index) => {
            const labelProps = {}
            if (index === activeStep) {
            }

            return (
              <Step key={index}>
                <StepLabel {...labelProps}>
                  {/* <div className='step-label'>
                      <Typography className='step-number'>{`0${index + 1}`}</Typography>
                      <div>
                        <Typography className='step-title'>{step.title}</Typography>
                        <Typography className='step-subtitle'>{step.subtitle}</Typography>
                      </div>
                    </div> */}
                </StepLabel>
              </Step>
            )
          })}
        </Stepper>
      </CardContent>

      <Divider sx={{ m: '0 !important' }} />

      <CardContent>{renderContent()}</CardContent>
    </Card>
  )
}

export default StepperLinearWithValidation
