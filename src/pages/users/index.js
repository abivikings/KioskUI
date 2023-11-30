// ** React Imports
import { useState, useEffect, useCallback, forwardRef } from 'react'

// ** Next Imports
import Link from 'next/link'

// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import Divider from '@mui/material/Divider'
import Typography from '@mui/material/Typography'
import CardHeader from '@mui/material/CardHeader'
import { DataGrid } from '@mui/x-data-grid'
import Fade from '@mui/material/Fade'
import { Button, ButtonGroup, Dialog, DialogContent, IconButton, styled } from '@mui/material'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Utils Import

// ** Custom Table Components Imports
import TableHeader from '../../views/pages/user/TableHeader'

// ** STATE MANAGEMENT
import { useSelector, useDispatch } from 'react-redux'
import { usersList } from '../../redux/user/userSlice'

import QrGen from '../../views/pages/user/QrGen'

import ProfileSummery from "src/views/pages/profile/Summery"
import EditUserDrawer from 'src/views/pages/user/EditUser'
// import QRCode from 'qrcode.react'

const demoData = {
  userid: '1699036939',
  userrole: 'admin',
  PIN: 4567,
  MemberId: 1,
  Member: 'Non member',
  fullname: 'Test User',
  password: '1234',
  nickname: null,
  Class: 'B',
  grade: '9',
  filepath: null,
  filename: null,
  Id: 1,
  EntryDt: '2023-11-04T00:00:00',
  EntryBy: 'sysadmin',
  UpdateDt: '2023-11-04T01:58:42.783',
  UpdateBy: 'sysadmin',
  IsActive: true,
  Remarks: null
}

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

const UserList = () => {

  const [qr, setQr] = useState('') 
  const [viewData, setViewData] = useState('')
  const [editData, setEditData] = useState('')
  const [show, setShow] = useState(false)

  const RowOptions = ({ id, email, dataUser }) => {

    const qrHandler = ({email, dataUser}) => {
      setQr({email, dataUser})
      setShow(true)
    }

    const viewHandler = event => {
      // alert(`View -> ${event}`)
      setShow(true)
      setViewData(dataUser)
    }

    const editHandler = event => {
      // alert(`Edit -> ${event}`)

      setShow(true)
      setEditData(dataUser)
    }

    const deleteHandler = event => {

      

      alert(`Delete -> ${event}`)
    }

    return (
      <>
        <ButtonGroup variant='contained' aria-label='outlined primary button group'>
          <Button onClick={() => qrHandler({email, dataUser})}>
            <Icon icon='tabler:qrcode' />
          </Button>
          <Button onClick={() => viewHandler(id)}>
            <Icon icon='tabler:eye' />
          </Button>
          <Button onClick={() => editHandler(id)}>
            <Icon icon='tabler:pencil' />
          </Button>
          <Button onClick={() => deleteHandler(id)}>
            <Icon icon='tabler:trash' />
          </Button>
        </ButtonGroup>
      </>
    )
  }

  const Transition = forwardRef(function Transition(props, ref) {
    return <Fade ref={ref} {...props} />
  })

  const columns = [
    {
      flex: 0.25,
      minWidth: 240,
      field: 'fullName',
      headerName: 'User',

      renderCell: ({ row }) => {
        const { fullname, userid } = row

        return (
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            {/* {renderClient(row)} */}
            <Box sx={{ display: 'flex', alignItems: 'flex-start', flexDirection: 'column' }}>
              <Typography noWrap sx={{ color: 'text.secondary', textTransform: 'capitalize' }}>
                {fullname}
              </Typography>
              <Typography noWrap variant='body2' sx={{ color: 'text.disabled' }}>
                {userid}
              </Typography>
            </Box>
          </Box>
        )
      }
    },
    {
      flex: 0.15,
      field: 'role',
      minWidth: 100,
      headerName: 'Member',
      renderCell: ({ row }) => {
        return (
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            {/* <CustomAvatar
              skin='light'
              sx={{ mr: 4, width: 30, height: 30 }}
              color={userRoleObj[row.role].color || 'primary'}
            >
              <Icon icon={userRoleObj[row.role].icon} />
            </CustomAvatar> */}
            <Typography noWrap sx={{ color: 'text.secondary', textTransform: 'capitalize' }}>
              {!row.Member ? 'NULL' : row.Member}
            </Typography>
          </Box>
        )
      }
    },
    {
      flex: 0.15,
      minWidth: 50,
      headerName: 'Grade',
      field: 'currentPlan',
      renderCell: ({ row }) => {
        return (
          <Typography noWrap sx={{ fontWeight: 500, color: 'text.secondary', textTransform: 'capitalize' }}>
            {row.grade}
          </Typography>
        )
      }
    },
    {
      flex: 0.15,
      minWidth: 50,
      field: 'classes',
      headerName: 'Class',
      renderCell: ({ row }) => {
        return (
          <Typography noWrap sx={{ color: 'text.secondary' }}>
            {row.Class}
          </Typography>
        )
      }
    },
    {
      flex: 0.1,
      minWidth: 290,
      sortable: false,
      field: 'actions',
      headerName: 'Actions',

      renderCell: ({ row }) => <RowOptions id={row.id} email={row.email} dataUser={row} />
    }
  ]

  // ** State
  const [paginationModel, setPaginationModel] = useState({ page: 0, pageSize: 10 })
  const [value, setValue] = useState('')

  const [allUsers, setAllUsers] = useState([])
  const [allUsers2, setAllUsers2] = useState([])

  const my_url = `https://vehayamachanechakadosh.com:8080/api/GetAllUserInfo?Stauts=all` ////// Leads Company Admin

  const userStateData = useSelector(state => state.users.data)

  // console.log('User State Data => ', userStateData)
  const dispatch = useDispatch()

  // get User from API
  useEffect(() => {
    fetchData()
  }, [])

  async function fetchData() {
    const myHeaders = new Headers()
    myHeaders.append('Content-Type', 'application/json')

    // myHeaders.append('Authorization', 'Bearer ' + localStorage.getItem('token'))

    const requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
    }

    const res = await fetch(my_url, requestOptions)
    const data = await res.json()
    if (res.ok) {
      const formattedData = Object.values(data).map((row, index) => ({
        id: row.Id, // You can use a different logic for generating unique IDs if needed
        ...row
      }))

      // console.log(formattedData)
      setAllUsers(formattedData)
      setAllUsers2(formattedData)

      const userDispatch = {
        data: formattedData
      }

      dispatch(usersList(userDispatch))

      return { ok: true, data }
    } else {
      constole.log('ERROR => ', data.error)

      return { ok: false, err: res, data }
    }
  }

  useEffect(() => {
    const searchQuery = value

    // Filter the `allUser` array based on the search query
    const filteredUsers = allUsers2.filter(user => {
      if (!user) return false

      const { fullname = '', userid = '', userrole = '', Class = '', grade = '' } = user

      const lowercaseQuery = searchQuery ? searchQuery.toLowerCase() : ''

      return (
        (fullname && fullname.toLowerCase().includes(lowercaseQuery)) ||
        (userid && userid.toLowerCase().includes(lowercaseQuery)) ||
        (userrole && userrole.toLowerCase().includes(lowercaseQuery)) ||
        (Class && Class.toLowerCase().includes(lowercaseQuery)) ||
        (grade && grade.toLowerCase().includes(lowercaseQuery))
      )
    })

    setAllUsers(filteredUsers)
  }, [value, allUsers2])

  const handleFilter = useCallback(val => {
    setValue(val)
  }, [])

  const userListHandler = useCallback(val => {
    setValue(val)
  }, [])

  return (
    <Grid container spacing={6.5}>
      

      <Grid item xs={12}>
        <Card>
          <CardHeader title='User List' />
          <Divider sx={{ m: '0 !important' }} />
          <TableHeader value={value} handleFilter={handleFilter} userType={setValue} userAdded={fetchData} />
          <DataGrid
            autoHeight
            rowHeight={62}
            rows={allUsers}
            columns={columns}
            disableRowSelectionOnClick
            pageSizeOptions={[2, 3, 4, 10, 25, 50]}
            paginationModel={paginationModel}
            onPaginationModelChange={setPaginationModel}
          />
        </Card>
      </Grid>
      <Grid item xs={12}>
        <Card>
          
          <ProfileSummery data={viewData} show={show}  success={setShow} />

          <EditUserDrawer data={editData} show={show} success={setShow} />
          
          <QrGen qr={qr.email} userData={qr.dataUser} show={show} success={setShow} />
        </Card>
      </Grid>
    </Grid>
  )
}

export default UserList
