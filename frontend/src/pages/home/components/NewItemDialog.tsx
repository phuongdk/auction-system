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
import Snackbar from '@mui/material/Snackbar'
import Alert from '@mui/material/Alert'

import { post } from '../../../ultilities/apiClient'
import { API_ENDPOINT, SNACKBAR_AUTO_HIDE_DURATION } from '../../../ultilities/constants'
import { convertHoursToMilliseconds } from '../../../ultilities/helpers'

interface Props {
  openNewDialog: boolean
  handleUpdateMyItems: () => void
  handleCloseNewDialog: () => void
}

const DialogNewItem: React.FC<Props> = (props) => {
  const [isLoading, setLoading] = useState(false)
  const [isAlertOpen, setAlert] = useState(false)
  const [message, setMessage] = useState<any>({ type: 'success', text: '' })
  const formik = useFormik({
    initialValues: {
      name: 'Item',
      price: 100,
      time_window: '01:00:00'
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
      time_window: string()
        .required('Required field')
        .matches(/^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]:[0-5][0-9]$/, 'Invalid hours format')
        .test({
          name: 'time_window',
          test(value, ctx) {
            const currentHours = convertHoursToMilliseconds(value)
            const lowerBound = convertHoursToMilliseconds('01:00')
            const upperBound = convertHoursToMilliseconds('23:59')

            if (currentHours < lowerBound || currentHours > upperBound) {
              return ctx.createError({ message: 'Time must be within range: 01:00 - 23:59' })
            }
            return true
          }
        })
    }),
    onSubmit: async (values) => {
      try {
        setLoading(true)
        const result: any = await post(API_ENDPOINT.CREATE_NEW_ITEM,
          { name: values.name, price: values.price, time_window: convertHoursToMilliseconds(values.time_window) })
        if (result) {
          setAlert(true)
          setMessage({ type: 'success', text: 'Create item successfully' })
          props.handleUpdateMyItems()
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
      <Dialog fullWidth={true} maxWidth='sm' open={props.openNewDialog} onClose={props.handleCloseNewDialog}>
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
              type='number'
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
              inputProps={{
                min: '01:00:00',
                max: '23:59:59',
                step: 1
              }}
              name='time_window'
              label='Time Expires (hour:minute:second)'
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
