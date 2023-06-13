import React, { useEffect, useContext } from 'react'
import { useNavigate } from 'react-router-dom'

import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import Box from '@mui/material/Box'
import Link from '@mui/material/Link'
import Typography from '@mui/material/Typography'
import Avatar from '@mui/material/Avatar'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import Button from '@mui/material/Button'
import HomeIcon from '@mui/icons-material/Home'
import { pink, green } from '@mui/material/colors'

import { removeAuthorization, get } from '../ultilities/apiClient'
import { removeToken } from '../ultilities/authUtils'
import { API_ENDPOINT } from '../ultilities/constants'
import { UserContext } from '../ultilities/contexts'

const HomePage: React.FC = () => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
  const userInfo = useContext(UserContext)
  const open = Boolean(anchorEl)
  const navigate = useNavigate()

  const fetchProfile = async () => {
    const result: any = await get(API_ENDPOINT.PROFILE)
    if (result) {
      userInfo.updateData(result)
    }
  }

  useEffect(() => {
    try {
      fetchProfile()
    } catch (error) {
      console.log('error', error)
    }
  }, [])

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleLogout = () => {
    removeAuthorization()
    removeToken()
    handleCloseUserDropdown()
    navigate('/auth/login')
  }

  const handleCloseUserDropdown = () => {
    setAnchorEl(null)
  }

  return (
    <>
      <AppBar position='sticky'>
        <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
          <Toolbar>
            <Link href='/' variant='h6' color='inherit' underline='none'>
              <HomeIcon sx={{ mr: 2 }} />
              Homepage
            </Link>
          </Toolbar>
          <Toolbar>
            <Typography>
              <Typography color={green['A400']} component='span'>{userInfo.balance}$</Typography>
            </Typography>
            <Button
              id='basic-button'
              aria-controls={open ? 'basic-menu' : undefined}
              aria-haspopup='true'
              aria-expanded={open ? 'true' : undefined}
              onClick={handleClick}
            >
              <Avatar
                sx={{ bgcolor: pink[500] }}
              >
                N
              </Avatar>
            </Button>
            <Menu
              id='basic-menu'
              anchorEl={anchorEl}
              open={open}
              onClose={handleCloseUserDropdown}
              MenuListProps={{
                'aria-labelledby': 'basic-button',
              }}
            >
              <MenuItem>{userInfo.full_name}</MenuItem>
              <MenuItem onClick={handleLogout}>Logout</MenuItem>
            </Menu>
          </Toolbar>
        </Box>
      </AppBar>
    </>
  )
}

export default HomePage
