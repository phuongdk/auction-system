import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'

const Footer: React.FC = () => {

  function Copyright() {
    return (
      <Typography variant='body2' color='text.secondary' align='center'>
        {'Copyright © '}
        <a target='_blank' href='https://phuongdk.github.io/'>
          Phuongdk
        </a>{' '}
        {new Date().getFullYear()}
        {'.'}
      </Typography>
    )
  }

  return (
    <>
      <Box sx={{ bgcolor: 'background.paper', p: 6 }} component='footer'>
        <Typography variant='h6' align='center' gutterBottom>
          Footer
        </Typography>
        <Typography
          variant='subtitle1'
          align='center'
          color='text.secondary'
          component='p'
        >
          Nice footer...
        </Typography>
        <Copyright />
      </Box>
    </>
  )
}

export default Footer
