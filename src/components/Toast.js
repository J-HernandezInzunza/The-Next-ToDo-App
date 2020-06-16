import React from 'react';
import Snackbar from '@material-ui/core/Snackbar';

const Toast = (props) => {
  return (
    <Snackbar
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'left',
      }}
      message={props.message}
      open={props.open}
      onClose={props.handleClose}
      autoHideDuration={2000}
    ></Snackbar>
  );
};

export default Toast;
