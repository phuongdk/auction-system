import React, { useState } from 'react'
import { useFormik } from 'formik'
import { string, number, object } from 'yup'
import Box from '@mui/material/Box'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'

interface Props {
  openNewDialog: boolean
  handleCloseNewDialog: () => void
}

const DialogNewItem: React.FC<Props> = (props) => {
  const [isLoading, setLoading] = useState(false);
  const formik = useFormik({
    initialValues: {
      name: '',
      price: 1,
      time_window: ''
    },
    validationSchema: object({
      name: string()
        .min(4, 'Minimum 4 characters')
        .max(20, 'Maximum 20 characters')
        .required('Required field'),
      price: number()
        .min(1, 'Minimum 1 dollar')
        .max(1000, 'Maximum 1000 dollars')
        .required('Required field'),
      time_window: string().required('Required field'),
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
      <Dialog fullWidth={true} maxWidth='sm' open={props.openNewDialog} onClose={props.handleCloseNewDialog}>
        <DialogTitle>Create Item</DialogTitle>
        <DialogContent>
          <Box component='form' onSubmit={formik.handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin='normal'
              required
              fullWidth
              id='name'
              label='Item name'
              name='name'
              autoComplete='name'
              autoFocus
              error={formik.errors.name && formik.touched.name ? true : false}
              helperText={formik.errors.name ? formik.errors.name : ''}
              onChange={formik.handleChange}
              value={formik.values.name}
            />
            <TextField
              margin='normal'
              required
              fullWidth
              name='price'
              label='Price'
              type='text'
              id='price'
              autoComplete='price'
              error={formik.errors.price && formik.touched.price ? true : false}
              helperText={formik.errors.price ? formik.errors.price : ''}
              onChange={formik.handleChange}
              value={formik.values.price}
            />
            <TextField
              margin='normal'
              required
              fullWidth
              name='time_window'
              label='Time Window'
              type='time'
              id='time_window'
              autoComplete='time_window'
              error={formik.errors.time_window && formik.touched.time_window ? true : false}
              helperText={formik.errors.time_window ? formik.errors.time_window : ''}
              onChange={formik.handleChange}
              value={formik.values.time_window}
            />
            <Button
              type='submit'
              fullWidth
              variant='contained'
              sx={{ mt: 3, mb: 2 }}
              disabled={isLoading}
            >
              {isLoading ? 'Creating...' : 'Create item'}
            </Button>
          </Box>
        </DialogContent>
        <DialogActions>
          {/* <Button type='submit' disabled={isLoading}>Create</Button> */}
          <Button onClick={props.handleCloseNewDialog}>Cancel</Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

export default DialogNewItem
