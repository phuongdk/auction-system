import React from 'react'

import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import { green, red } from '@mui/material/colors'
import CountDownTillExpires from './CountDown'
import { Item } from '../../../ultilities/interfaces'

interface props {
  userId: string
  items: Item[]
  handleOpenBidDialog: (item: Item) => void
  handleRefreshItem: (id: string) => void
  handleUpdateWhenItemExpires: (item: Item) => void
}

const BidItems: React.FC<props> = (props) => {
  const { items, userId, handleOpenBidDialog, handleRefreshItem, handleUpdateWhenItemExpires } = props
  return (
    <>
      {items.map((item, index) => (
        <Grid item key={index} xs={12} sm={6} md={3}>
          <Card
            sx={{ cursor: 'pointer', height: '100%', display: 'flex', flexDirection: 'column' }}
          >
            <CardMedia
              component='div'
              sx={{
                pt: '56.25%',
              }}
              image={`https://source.unsplash.com/random?wallpapers/${index}`}
            />
            <CardContent sx={{ flexGrow: 1 }}>
              <Typography align='center' gutterBottom variant='h4' component='h2'>
                {item.name}
              </Typography>
              <Typography align='center' color={green['A700']} gutterBottom>
                Starting Price: {item.price}$
              </Typography>
              <Typography align='center' color={red['A400']} gutterBottom>
                Bid Price: {item.bid_price}$
              </Typography>
              <CountDownTillExpires
                item={item}
                handleUpdateWhenItemExpires={handleUpdateWhenItemExpires}
              />
            </CardContent>
            <CardActions sx={{ justifyContent: 'center' }}>
              <Button
                fullWidth={true}
                size='small'
                variant='contained'
                color='primary'
                disabled={item.userId == userId ||
                  (typeof item.bid_interval == 'number' && item?.bid_interval > 0)
                }
                onClick={() => { handleOpenBidDialog(item) }}
              >
                {
                  typeof item.bid_interval === 'number' && item?.bid_interval > 0 ? (
                    <span>{item.bid_interval}s to bid</span>
                  ) : (
                    <span>Bid</span>
                  )
                }
              </Button>
              <Button fullWidth={true} size='small' variant='contained' color='primary' onClick={() => { handleRefreshItem(item.id) }}>Refresh Price</Button>
            </CardActions>
          </Card>
        </Grid>
      ))}
    </>
  )
}

export default BidItems
