import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useFormik } from 'formik'
import { string, object, ref } from 'yup'

import Avatar from '@mui/material/Avatar'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container'
import Snackbar from '@mui/material/Snackbar'
import Alert from '@mui/material/Alert'

import { post } from '../../../ultilities/apiClient'
import { API_ENDPOINT, SNACKBAR_AUTO_HIDE_DURATION } from '../../../ultilities/constants'

function Copyright(props: any) {
    return (
        <Typography variant='body2' color='text.secondary' align='center' {...props}>
            {'Copyright © '}
            <Link target='_blank' to='https://phuongdk.github.io/'>
                Phuongdk
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    )
}

interface Props { }

const SignupComponent: React.FC<Props> = () => {
    const [isLoading, setLoading] = useState(false)
    const [isAlertOpen, setAlert] = useState(false)
    const [message, setMessage] = useState<any>({ type: 'success', text: '' })
    const formik = useFormik({
        initialValues: {
            first_name: '',
            last_name: '',
            email: '',
            password: '',
            confirm_password: ''
        },
        validationSchema: object({
            email: string()
                .email('Invalid email format')
                .required('Required field'),
            password: string()
                .min(4, 'Minimum 4 characters')
                .max(20, 'Maximum 20 characters')
                .required('Required field'),
            confirm_password: string()
                .required('Please retype your password.')
                .oneOf([ref('password')], 'Your passwords do not match.'),
            first_name: string()
                .min(1, 'Minimum 1 character')
                .max(20, 'Maximum 20 characters')
                .required('Required field'),
            last_name: string()
                .min(1, 'Minimum 1 character')
                .max(20, 'Maximum 20 characters')
                .required('Required field'),
        }),
        onSubmit: async (values) => {
            try {
                setLoading(true)
                await post(API_ENDPOINT.SIGN_UP,
                    { email: values.email, password: values.password, first_name: values.first_name, last_name: values.last_name })
                setAlert(true)
                setMessage({ type: 'success', text: 'Sign up successfully' })
                formik.resetForm()
            } catch (error) {
                setAlert(true)
                setMessage({ type: 'error', text: error })
            } finally {
                setLoading(false)
            }
        },
    })

    return (
        <Container component='main' maxWidth='xs'>
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
            <Box
                sx={{
                    marginTop: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component='h1' variant='h5'>
                    Sign up
                </Typography>
                <Box component='form' noValidate onSubmit={formik.handleSubmit} sx={{ mt: 3 }}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                autoFocus
                                autoComplete='given-name'
                                name='first_name'
                                required
                                fullWidth
                                id='first_name'
                                label='First Name'
                                error={formik.errors.first_name && formik.touched.first_name ? true : false}
                                helperText={formik.errors.first_name ? formik.errors.first_name : ''}
                                onChange={formik.handleChange}
                                value={formik.values.first_name}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                required
                                fullWidth
                                id='last_name'
                                label='Last Name'
                                name='last_name'
                                autoComplete='last_name'
                                error={formik.errors.last_name && formik.touched.last_name ? true : false}
                                helperText={formik.errors.last_name ? formik.errors.last_name : ''}
                                onChange={formik.handleChange}
                                value={formik.values.last_name}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                required
                                fullWidth
                                id='email'
                                label='Email Address'
                                name='email'
                                autoComplete='email'
                                error={formik.errors.email && formik.touched.email ? true : false}
                                helperText={formik.errors.email ? formik.errors.email : ''}
                                onChange={formik.handleChange}
                                value={formik.values.email}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                required
                                fullWidth
                                name='password'
                                label='Password'
                                type='password'
                                id='password'
                                autoComplete='new-password'
                                error={formik.errors.password && formik.touched.password ? true : false}
                                helperText={formik.errors.password ? formik.errors.password : ''}
                                onChange={formik.handleChange}
                                value={formik.values.password}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                required
                                fullWidth
                                name='confirm_password'
                                label='Confirm Password'
                                type='password'
                                id='confirm_password'
                                autoComplete='confirm_password'
                                error={formik.errors.confirm_password && formik.touched.confirm_password ? true : false}
                                helperText={formik.errors.confirm_password ? formik.errors.confirm_password : ''}
                                onChange={formik.handleChange}
                                value={formik.values.confirm_password}
                            />
                        </Grid>
                    </Grid>
                    <Button
                        type='submit'
                        fullWidth
                        variant='contained'
                        sx={{ mt: 3, mb: 2 }}
                        disabled={isLoading}
                    >
                        Sign Up
                    </Button>
                    <Grid container justifyContent='center'>
                        <Grid item>
                            <Link to={'/auth/login'}>
                                Already have an account? Sign in
                            </Link>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
            <Copyright sx={{ mt: 5 }} />
        </Container>
    )
}

export default SignupComponent