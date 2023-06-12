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
  openDepositDialog: boolean
  handleCloseDepositDialog: () => void
}

const DepositDialog: React.FC<Props> = (props) => {
  const [isLoading, setLoading] = useState(false);
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
      console.log('value', values)
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
