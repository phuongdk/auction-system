import React, { useState, useContext } from 'react'
import { useFormik } from 'formik'
import { number, object } from 'yup'
import Box from '@mui/material/Box'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'

import { post } from '../../../ultilities/apiClient'
import { API_ENDPOINT } from '../../../ultilities/constants'
import { UserContext } from '../../../ultilities/contexts'

interface Props {
  openDepositDialog: boolean
  handleCloseDepositDialog: () => void
}

const DepositDialog: React.FC<Props> = (props) => {
  const [isLoading, setLoading] = useState(false)
  const userInfo = useContext(UserContext)
  const formik = useFormik({
    initialValues: {
      amount: 1,
    },
    validationSchema: object({
      amount: number()
        .min(1, 'Minimum 1 dollar')
        .max(1000, 'Maximum 1000 dollars')
        .required('Required field'),
    }),
    onSubmit: async (values) => {
      try {
        setLoading(true)
        const result: any = await post(API_ENDPOINT.DEPOSIT, { amount: values.amount })
        if (result) {
          userInfo.updateData({...result})
        }
      } catch (error) {
        console.log('error', error)
      } finally {
        setLoading(false)
      }
    },
  })
  return (
    <>
      <Dialog fullWidth={true} maxWidth='sm' open={props.openDepositDialog} onClose={props.handleCloseDepositDialog}>
        <DialogTitle>Deposit</DialogTitle>
        <DialogContent>
          <Box component='form' onSubmit={formik.handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin='normal'
              required
              fullWidth
              id='amount'
              label='Amount'
              name='amount'
              autoComplete='amount'
              type='number'
              autoFocus
              error={formik.errors.amount && formik.touched.amount ? true : false}
              helperText={formik.errors.amount ? formik.errors.amount : ''}
              onChange={formik.handleChange}
              value={formik.values.amount}
            />
            <Button
              type='submit'
              fullWidth
              variant='contained'
              sx={{ mt: 3, mb: 2 }}
              disabled={isLoading}
            >
              {isLoading ? 'Sending...' : 'Deposit'}
            </Button>
          </Box>
        </DialogContent>
        <DialogActions>
          {/* <Button type='submit' disabled={isLoading}>{isLoading ? 'Sending...' : 'Deposit'}</Button> */}
          <Button onClick={props.handleCloseDepositDialog}>Cancel</Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

export default DepositDialog
