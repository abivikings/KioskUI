// ** MUI Imports
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'

// import { Provider } from 'react-redux'
// import user from 'src/store/apps/user' // Assuming you've already created a Redux store named 'Store'
// ** Custom Component Import
import CustomTextField from 'src/@core/components/mui/text-field'

// ** Icon Imports
// import Icon from 'src/@core/components/icon'

import AddUserDrawer from './AddUser'
import { Icon } from '@iconify/react'

const TableHeader = props => {
  // ** Props
  const { handleFilter, value, userType, userAdded } = props

  // const [addUserOpen, setAddUserOpen] = useState(false)
  // const toggleAddUserDrawer = () => setAddUserOpen(!addUserOpen)

  const handleAddUser = (x) => {
    if(x){
      alert("Successfully User Added")
      userAdded
    }
  }
  

  return (
    <Box
      sx={{
        py: 4,
        px: 6,
        rowGap: 2,
        columnGap: 4,
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'space-between'
      }}
    >

      <Button color='warning' variant='tonal' value='admin' onClick={e => userType(e.target.value)} startIcon={<Icon icon='tabler:user-shield' />}>
        Admin
      </Button>
      <Button color='warning' variant='tonal'  value='teacher' onClick={e => userType(e.target.value)}  startIcon={<Icon icon='tabler:user-star' />}>
        Teacher
      </Button>
      <Button color='warning' variant='tonal'  value='student' onClick={e => userType(e.target.value)}  startIcon={<Icon icon='tabler:user-edit' />}>
        Student
      </Button>


      <Box sx={{ rowGap: 2, display: 'flex', flexWrap: 'wrap', alignItems: 'center' }}>
        <CustomTextField
          value={value}
          sx={{ mr: 4 }}
          placeholder='Search User'
          onChange={e => handleFilter(e.target.value)}
        />
        
          <AddUserDrawer toggle={handleAddUser} />
          
      </Box>
    </Box>
  )
}

export default TableHeader
