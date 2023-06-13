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

import { get, post, remove } from '../../../ultilities/apiClient'
import { Item } from '../../../ultilities/interfaces'
import { API_ENDPOINT } from '../../../ultilities/constants'

const HomepageComponent: React.FC = () => {
  const [bidItems, setBidItems] = useState<Item[] | []>([])
  const [myItems, setMyItems] = useState<Item[] | []>([])
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
      setBidItems(result)
    }
  }

  const fetchMyItems = async () => {
    const result: any = await get(API_ENDPOINT.GET_MY_ITEMS)
    if (result) {
      setMyItems(result)
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

  const changeItem = (type: string) => {
    if (type == 'bid') {
      fetchBidItems()
    } else {
      fetchMyItems()
    }
    setSelectItem(type)
  }

  const handleRefreshItem = async (itemId: string) => {
    try {
      const result: any = await get(`${API_ENDPOINT.REFRESH_ITEM}/${itemId}`)
      if (result) {
        const index = bidItems.findIndex((item: Item) => {
          return item.id == result.id
        })
        const newItems = Object.assign([...bidItems], { [index]: result });
        setBidItems(newItems);
      }
    } catch (error) {
      console.log('error', error)
    }
  }

  const handlePublishItem = async (itemId: string) => {
    if (!confirm('Are you sure?')) {
      return;
    }

    try {
      const result: any = await post(
        `${API_ENDPOINT.CHANGE_ITEM}/${itemId}`,
        { action: 'published' })

      if (result && result.affected == 1) {
        fetchMyItems();
      }
    } catch (error) {
      console.log('error', error)
    }
  }

  const handleDeleteItem = async (itemId: string) => {
    if (!confirm('Are you sure?')) {
      return;
    }

    try {
      await remove(
        `${API_ENDPOINT.DELETE_ITEM}/${itemId}`)
      setTimeout(() => {
        fetchMyItems()
      }, 200);
    } catch (error) {
      console.log('error', error)
    }
  }

  const handleUpdateMyItems = () => {
    if (selectItem == 'bid') {
      return
    }
    fetchMyItems()
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
            <Button variant='contained' onClick={() => { changeItem('bid') }}>Ongoing bid items</Button>
            <Button variant='contained' onClick={() => { changeItem('mine') }}>My items</Button>
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
        {
          selectItem === 'bid' && bidItems.length == 0 && (
            <Typography variant='h5' align='center' color='text.secondary' paragraph>
              No bid items found...
            </Typography>
          )
        }
        {
          selectItem === 'mine' && myItems.length == 0 && (
            <Typography variant='h5' align='center' color='text.secondary' paragraph>
              No items found...
            </Typography>
          )
        }
        <Grid container spacing={4}>
          {
            selectItem === 'bid' && bidItems.length && (
              <BidItems
                items={bidItems}
                handleOpenBidDialog={handleOpenBidDialog}
                handleRefreshItem={handleRefreshItem}
              />
            )
          }
          {
            selectItem === 'mine' && myItems.length && (
              <MyItems
                items={myItems}
                handlePublishItem={handlePublishItem}
                handleDeleteItem={handleDeleteItem}
              />
            )
          }
        </Grid>
      </Container>
      {/* End content */}
      {/* Dialog Section */}
      <NewItemDialog
        openNewDialog={openNewDialog}
        handleUpdateMyItems={handleUpdateMyItems}
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