import React, { useState } from 'react'
import { useFormik } from 'formik'
import { number, object } from 'yup'
import Box from '@mui/material/Box'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import Snackbar from '@mui/material/Snackbar'
import Alert from '@mui/material/Alert'

import { post } from '../../../ultilities/apiClient'
import { Item } from '../../../ultilities/interfaces'
import { API_ENDPOINT, SNACKBAR_AUTO_HIDE_DURATION } from '../../../ultilities/constants'

interface Props {
  selectedItem: Item
  userId: string
  openBidDialog: boolean
  handleCloseBidDialog: () => void
  handleUpdateBidData: (data: any) => void
}

const BidDialog: React.FC<Props> = (props) => {
  const [isLoading, setLoading] = useState(false)
  const [isAlertOpen, setAlert] = useState(false)
  const [message, setMessage] = useState<any>({ type: 'success', text: '' })
  const { selectedItem, userId, openBidDialog, handleCloseBidDialog, handleUpdateBidData } = props
  const formik = useFormik({
    initialValues: {
      bid_price: 100,
    },
    validationSchema: object({
      bid_price: number()
        .min(1, 'Minimum 1 dollar')
        .max(1000, 'Maximum 1000 dollars')
        .required('Required field'),
    }),
    onSubmit: async (values) => {
      try {
        setLoading(true)
        const result: any = await post(API_ENDPOINT.BID_ITEM,
          { userId: userId, productId: selectedItem.id, bid_attempt_amount: values.bid_price })
        if (result) {
          setAlert(true)
          setMessage({ type: 'success', text: 'Bid item successfully' })
          handleUpdateBidData(result)
        }
      } catch (error) {
        setAlert(true)
        setMessage({ type: 'error', text: error })
      } finally {
        setLoading(false)
      }
    },
  });
  return (
    <>
      <Snackbar
        open={isAlertOpen}
        autoHideDuration={SNACKBAR_AUTO_HIDE_DURATION}
        onClose={() => setAlert(false)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert onClose={() => setAlert(false)} severity={message.type} sx={{ width: '100%' }}>
          {message.text}
        </Alert>
      </Snackbar>
      <Dialog fullWidth={true} maxWidth='sm' open={openBidDialog} onClose={handleCloseBidDialog}>
        <DialogTitle>{selectedItem.name}</DialogTitle>
        <DialogContent>
          <Box component='form' onSubmit={formik.handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin='normal'
              required
              fullWidth
              name='bid_price'
              label='Bid Price'
              type='number'
              id='bid_price'
              autoComplete='bid_price'
              error={formik.errors.bid_price && formik.touched.bid_price ? true : false}
              helperText={formik.errors.bid_price ? formik.errors.bid_price : ''}
              onChange={formik.handleChange}
              value={formik.values.bid_price}
            />
            <Button
              type='submit'
              fullWidth
              variant='contained'
              sx={{ mt: 3, mb: 2 }}
              disabled={isLoading}
            >
              {isLoading ? 'Placing order...' : 'Bid'}
            </Button>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseBidDialog}>Cancel</Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

export default BidDialog
