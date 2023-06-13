import React from 'react'

import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import { Item } from '../../../ultilities/interfaces'
import { green, red } from '@mui/material/colors'

interface props {
  items: Item[]
  handlePublishItem: (id: string) => void
  handleDeleteItem: (id: string) => void
}

const MyItems: React.FC<props> = (props) => {
  const { items, handlePublishItem, handleDeleteItem } = props
  return (
    <>
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
              <Typography align='center' gutterBottom variant='h4' component='h2'>
                {item.name}
              </Typography>
              <Typography align='center' color={green['A700']} gutterBottom>
                Price: {item.price}$
              </Typography>
              <Typography align='center' color={red['A400']} gutterBottom>
                Bid Price: {item.bid_price}$
              </Typography>
            </CardContent>
            <CardActions sx={{ justifyContent: 'center' }}>
              <Button fullWidth={true} size='small' variant='contained' color='primary' onClick={() => {handlePublishItem(item.id)}}>Publish</Button>
              <Button fullWidth={true} size='small' variant='contained' color='error' onClick={() => {handleDeleteItem(item.id)}}>Delete</Button>
            </CardActions>
          </Card>
        </Grid>
      ))}
    </>
  )
}

export default MyItems
