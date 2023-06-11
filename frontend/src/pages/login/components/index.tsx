import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useFormik } from 'formik'
import { string, object } from 'yup'

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

import { post } from '../../../helpers/apiClient'
import { API_ENDPOINT } from '../../../helpers/constants'

interface Props { }

const LoginComponent: React.FC<Props> = () => {
    const [isLoading, setLoading] = useState(false);
    const [isAlertOpen, setAlert] = useState(false);
    const [errorMessage, setErrorMessage] = useState<any>('');
    const navigate = useNavigate();
    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
        },
        validationSchema: object({
            email: string()
                .email('Invalid email format')
                .required('Required field'),
            password: string()
                .min(4, 'Minimum 4 characters')
                .max(20, 'Maximum 20 characters')
                .required('Required field'),
        }),
        onSubmit: async (values) => {
            try {
                setLoading(true)
                const { access_token } : any = await post(API_ENDPOINT.SIGN_IN, { email: values.email, password: values.password })
                localStorage.setItem('@access_token', access_token)
                navigate('/')
            } catch (error) {
                setAlert(true)
                setErrorMessage(error)
            } finally {
                setLoading(false)
            }
        },
    });

    return (
        <>
            <Container component='main' maxWidth='xs'>
                <Snackbar
                    open={isAlertOpen}
                    autoHideDuration={2000}
                    onClose={() => setAlert(false)}
                    anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                >
                    <Alert onClose={() => setAlert(false)} severity="error" sx={{ width: '100%' }}>
                        {errorMessage}
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
                        Sign in
                    </Typography>
                    <Box component='form' onSubmit={formik.handleSubmit} noValidate sx={{ mt: 1 }}>
                        <TextField
                            margin='normal'
                            required
                            fullWidth
                            id='email'
                            label='Email Address'
                            name='email'
                            autoComplete='email'
                            autoFocus
                            error={formik.errors.email && formik.touched.email ? true : false}
                            helperText={formik.errors.email ? formik.errors.email : ''}
                            onChange={formik.handleChange}
                            value={formik.values.email}
                        />
                        <TextField
                            margin='normal'
                            required
                            fullWidth
                            name='password'
                            label='Password'
                            type='password'
                            id='password'
                            autoComplete='current-password'
                            error={formik.errors.password && formik.touched.password ? true : false}
                            helperText={formik.errors.password ? formik.errors.password : ''}
                            onChange={formik.handleChange}
                            value={formik.values.password}
                        />
                        <Button
                            type='submit'
                            fullWidth
                            variant='contained'
                            sx={{ mt: 3, mb: 2 }}
                            disabled={isLoading}
                        >
                            {isLoading ? 'Authenticating...' : 'Sign In'}
                        </Button>
                        <Grid container justifyContent='center'>
                            <Grid item>
                                <Link to={'/auth/signup'}>
                                    {'Dont have an account? Sign Up'}
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
                <Copyright sx={{ mt: 8, mb: 4 }} />
            </Container>
        </>
    )
}

function Copyright(props: any) {
    return (
        <Typography variant='body2' color='text.secondary' align='center' {...props}>
            {'Copyright © '}
            <a color='inherit' href='https://phuongdk.io/'>
                Phuongdk
            </a>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    )
}

export default LoginComponent