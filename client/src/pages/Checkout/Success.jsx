import React from 'react'
import { useDispatch } from 'react-redux';
import { resetCart } from '../../redux/cartReducer';
import { Box, Alert, AlertTitle, Button } from '@mui/material';

const Success = () => {

   const dispatch = useDispatch();

   document.addEventListener('load', dispatch(resetCart()));

   if ((window.performance.navigation && window.performance.navigation.type === 1) ||
      window.performance
         .getEntriesByType('navigation')
         .map((nav) => nav.type)
         .includes('reload')) {
      window.location.href = '/';
   }

   return (
      <Box m="90px auto" width="80%" height="50vh" >
         <Alert severity='success' sx={{ alignItems: "center", marginBottom: '10px' }}>
            <AlertTitle sx={{ fontSize: "20px", marginBottom: '0px', padding: "4px 0", marginBottom: '-2px' }}>Success!</AlertTitle>
         </Alert>
         <Box padding="20px" display="flex" flexDirection="column" justifyContent="center" alignItems="center">
            <Box fontSize="20px" marginBottom="20px">
               <p style={{ marginBottom: "10px", display: "inline-block" }}>You have successfully made an Order!</p> <br />
               <strong>Congrats on making your purchase</strong>
            </Box>
            <Button
               type='submit'
               color='primary'
               variant='contained'
               href='/'
               sx={{
                  width: "250px",
                  backgroundColor: '#2879fe',
                  boxShadow: 'none',
                  fontSize: '16px',
                  fontWeight: '500',
                  color: 'white',
                  borderRadius: '5px',
                  padding: '7px',
                  display: 'flex',
               }}
            >CONTINUE SHOPPING</Button>
         </Box>
      </Box>
   )
}

export default Success;