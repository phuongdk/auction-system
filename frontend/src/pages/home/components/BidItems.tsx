import React from 'react'

import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import { Items } from '../interfaces/dataResponse'

interface props {
  items: Items[]
  handleOpenBidDialog: () => void
  handleRefreshItem: () => void
}

const BidItems: React.FC<props> = (props) => {
  const { items, handleOpenBidDialog, handleRefreshItem } = props
  return (
    <>
      {items.map((item, index) => (
        <Grid item key={index} xs={12} sm={6} md={3}>
          <Card
            sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}
          >
            <CardMedia
              component='div'
              sx={{
                pt: '56.25%',
              }}
              image={`https://source.unsplash.com/random?wallpapers/${index}`}
            />
            <CardContent sx={{ flexGrow: 1 }}>
              <Typography gutterBottom variant='h5' component='h2'>
                {item.name}
              </Typography>
              <Typography>
                {item.price}
              </Typography>
              <Typography>
                {item.bid_price}
              </Typography>
            </CardContent>
            <CardActions>
              <Button size='small' onClick={handleOpenBidDialog}>Bid</Button>
              <Button size='small' onClick={handleRefreshItem}>Refresh</Button>
            </CardActions>
          </Card>
        </Grid>
      ))}
    </>
  )
}

export default BidItems
