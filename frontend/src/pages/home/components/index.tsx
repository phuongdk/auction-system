import React, { useState, useEffect } from 'react'

import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Container from '@mui/material/Container'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'

import BidItems from './BidItems'
import MyItems from './MyItems'
import NewItemDialog from './NewItemDialog'
import DepositDialog from './DepositDialog'
import BidDialog from './BidDialog'

import { get } from '../../../ultilities/apiClient'
import { Items } from '../interfaces/dataResponse'
import { API_ENDPOINT, SNACKBAR_AUTO_HIDE_DURATION } from '../../../ultilities/constants'

const HomepageComponent: React.FC = () => {
  const [bidItems, setBidItems] = useState<Items[] | []>([])
  const [myItems, setMyItems] = useState<Items[] | []>([])
  const [selectItem, setSelectItem] = useState('bid')

  const [openNewDialog, setOpenNewDialog] = useState(false)
  const [openDepositDialog, setOpenDepositDialog] = useState(false)
  const [openBidDialog, setOpenBidDialog] = useState(false)

  useEffect(() => {
    try {
      fetchBidItems()
    } catch (error) {
      console.log('error', error)
    }
  }, [])

  const fetchBidItems = async () => {
    const result: any = await get(API_ENDPOINT.GET_BID_ITEMS)
    if (result) {
      result.price = parseFloat(result.price)
      console.log('result', result)
      setBidItems(result)
    }
  }

  const handleOpenNewDialog = () => {
    setOpenNewDialog(true)
  }

  const handleCloseNewDialog = () => {
    setOpenNewDialog(false)
  }

  const handleOpenDepositDialog = () => {
    setOpenDepositDialog(true)
  }

  const handleCloseDepositDialog = () => {
    setOpenDepositDialog(false)
  }

  const handleOpenBidDialog = () => {
    setOpenBidDialog(true)
  }

  const handleCloseBidDialog = () => {
    setOpenBidDialog(false)
  }

  const handleRefreshItem = () => {

  }

  const handlePublishItem = () => {

  }

  const handleDeleteItem = () => {

  }

  return (
    <>
      {/* Content */}
      <Box
        sx={{
          bgcolor: 'background.paper',
          pt: 8,
          pb: 6,
        }}
      >
        <Container maxWidth='md'>
          <Typography
            component='h1'
            variant='h2'
            align='center'
            color='text.primary'
            gutterBottom
          >
            Jitera Auction System
          </Typography>
          <Typography variant='h5' align='center' color='text.secondary' paragraph>
            Bid any items you want...
          </Typography>
          <Stack
            sx={{ pt: 4 }}
            direction='row'
            spacing={2}
            justifyContent='center'
          >
            <Button
              variant='outlined'
              color='error'
              onClick={handleOpenNewDialog}
            >
              Create new item
            </Button>
            <Button
              variant='outlined'
              color='error'
              onClick={handleOpenDepositDialog}
            >
              Deposit money
            </Button>
          </Stack>
          <Stack
            sx={{ pt: 4 }}
            direction='row'
            spacing={2}
            justifyContent='center'
          >
            <Button variant='contained'>Ongoing bid items</Button>
            <Button variant='contained'>My items</Button>
          </Stack>
        </Container>
      </Box>
      <Container sx={{ py: 8 }} maxWidth='xl'>
        {
          selectItem === 'bid' ? (
            <Typography
              component='h2'
              variant='h3'
              align='center'
              color='text.secondary'
              gutterBottom>
              Bid Items List
            </Typography>
          ) : (
            <Typography
              component='h2'
              variant='h3'
              align='center'
              color='text.secondary'
              gutterBottom>
              My Items List
            </Typography>
          )
        }
        <Grid container spacing={4}>
          {
            selectItem === 'bid' && (
              bidItems.length ? (
                <BidItems
                  items={bidItems}
                  handleOpenBidDialog={handleOpenBidDialog}
                  handleRefreshItem={handleRefreshItem}
                />
              ) : (
                <Typography variant='h5' align='center' color='text.secondary' paragraph>
                  No items found...
                </Typography>
              )
            )
          }
          {
            selectItem === 'mine' && (
              myItems.length ? (
                <MyItems
                  items={myItems}
                  handlePublishItem={handlePublishItem}
                  handleDeleteItem={handleDeleteItem}
                />
              ) : (
                <Typography variant='h5' align='center' color='text.secondary' paragraph>
                  No items found...
                </Typography>
              )
            )
          }
        </Grid>
      </Container>
      {/* End content */}
      {/* Dialog Section */}
      <NewItemDialog
        openNewDialog={openNewDialog}
        handleCloseNewDialog={handleCloseNewDialog}
      />
      <DepositDialog
        openDepositDialog={openDepositDialog}
        handleCloseDepositDialog={handleCloseDepositDialog}
      />
      <BidDialog
        openBidDialog={openBidDialog}
        handleCloseBidDialog={handleCloseBidDialog}
      />
      {/* End Dialog Section */}
    </>
  )
}

export default HomepageComponent