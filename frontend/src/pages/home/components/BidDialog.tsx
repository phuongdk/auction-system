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

interface Props {
  openBidDialog: boolean
  handleCloseBidDialog: () => void
}

const BidDialog: React.FC<Props> = (props) => {
  const [isLoading, setLoading] = useState(false);
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
      console.log('value', values)
      setLoading(false)
      return;
      // try {
      //   setLoading(true)
      //   const { access_token }: any = await post(API_ENDPOINT.SIGN_IN, { email: values.email, password: values.password })
      //   localStorage.setItem('@access_token', access_token)
      //   navigate('/')
      // } catch (error) {
      //   setAlert(true)
      //   setErrorMessage(error)
      // } finally {
      //   setLoading(false)
      // }
    },
  });
  return (
    <>
      <Dialog fullWidth={true} maxWidth='sm' open={props.openBidDialog} onClose={props.handleCloseBidDialog}>
        <DialogTitle>Bid Item Name</DialogTitle>
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
          <Button onClick={props.handleCloseBidDialog}>Cancel</Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

export default BidDialog
