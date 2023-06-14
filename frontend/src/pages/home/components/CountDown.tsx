import React, { useState, useEffect } from 'react'
import { Typography } from '@mui/material'
import { red } from '@mui/material/colors'
import { Item } from '../../../ultilities/interfaces'
import { countdownTimer } from '../../../ultilities/helpers'

interface props {
  item: Item
  handleUpdateWhenItemExpires: (item: Item) => void
}

const CountDownTillExpires: React.FC<props> = (props) => {
  const { item, handleUpdateWhenItemExpires } = props
  const [renderTime, setRenderTime] = useState('')


  useEffect(() => {
    if (!item.published_at) {
      return;
    }

    const timer = setInterval(() => {
      const time = countdownTimer(item.published_at, item.time_window)
      if (!time) {
        clearInterval(timer)
        handleUpdateWhenItemExpires(item)
      }
      setRenderTime(time)
    }, 1000)
  }, [])

  return (
    <>
      {
        renderTime && (
          <Typography align='center' color={red['A400']} gutterBottom>
            {renderTime} until expiry
          </Typography>
        )
      }
    </>
  )
}

export default CountDownTillExpires