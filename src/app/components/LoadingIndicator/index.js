import React from 'react'
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
function index() {
    return (<Backdrop
        sx={{ color: '#fff', zIndex: (theme) => 9999 }}
        open={true}
      >
        <CircularProgress color="inherit" />
      </Backdrop>);
}

export default index
