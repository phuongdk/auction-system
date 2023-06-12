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
  handlePublishItem: () => void
  handleDeleteItem: () => void
}

const MyItems: React.FC<props> = (props) => {
  const { items, handlePublishItem, handleDeleteItem } = props
  return (
    <>
      <Grid container spacing={4}>
        {items.map((item, index) => (
          <Grid item key={item.id} xs={12} sm={6} md={3}>
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
                <Button size='small' onClick={handlePublishItem}>Publish</Button>
                <Button size='small' onClick={handleDeleteItem}>Delete</Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </>
  )
}

export default MyItems
