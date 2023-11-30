/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect, useCallback } from 'react'
// ** Next Import
import Link from 'next/link'

// ** MUI Imports
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import MenuItem from '@mui/material/MenuItem'

// ** Custom Component Import
import CustomTextField from 'src/@core/components/mui/text-field'
import AddMasterdataDrawer from './addmasterdata'

const TableHeader = props => {
  // ** Props
  const { handleFilter, value, ProgramType, masterid } = props
  const [masterdata, setMasterdata] = useState([]);
  console.log("masterdata", masterdata)
  console.log("props", props)
  const my_url = `https://vehayamachanechakadosh.com:8080/api/Master?Stauts=all` ////// Leads Company Admin
  async function fetchData() {
    const myHeaders = new Headers()
    myHeaders.append('Content-Type', 'application/json')

    const requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
    }
    const res = await fetch(my_url, requestOptions)
    const data = await res.json()
    setMasterdata(data);


  }
  useEffect(() => {
    fetchData()
  },[])

  return (
    <Box
      sx={{
        p: 5,
        pb: 3,
        width: '100%',
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'space-between'
      }}
    >
      <CustomTextField
        select
        defaultValue='Program Data'
        sx={{ mr: 4, mb: 2 }}
        SelectProps={{
          displayEmpty: true,
          renderValue: selected => (selected?.length === 0 ? 'Program Data' : selected)
        }}
        onChange={e =>
          ProgramType(e.target.value)
        }
      >
        {/* <MenuItem value='Actions'>
         
        </MenuItem> */}
        {/* <MenuItem value='Delete'>Delete</MenuItem>
        <MenuItem value='Edit'>Edit</MenuItem>
        <MenuItem value='Send'>Send</MenuItem>  */}
        {masterdata.map((data) => (
          <MenuItem key={data.Id} name={data.Name} value={data.Id}>{data.Name}</MenuItem>
        ))}
      </CustomTextField>

      <Box sx={{ rowGap: 2, display: 'flex', flexWrap: 'wrap', alignItems: 'center' }}>

        <CustomTextField
          value={value}
          sx={{ mr: 4 }}
          placeholder='Search User'
          onChange={e => handleFilter(e.target.value)}
        />
        <AddMasterdataDrawer masterid={masterid} />
      </Box>

    </Box>
  )

}

export default TableHeader
