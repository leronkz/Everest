import React from 'react';
import MuiAlert from "@mui/material/Alert";
import Snackbar from '@mui/material/Snackbar';
import Box from "@mui/material/Box";

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props}/>
});
function OperationSnackbar(props){

    const {openSuccessSnackbar, openErrorSnackbar, handleClose, successMessage, errorMessage} = props;

    return(
        <Box>
            <Snackbar anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }} open={openSuccessSnackbar} autoHideDuration={2000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="success" sx={{width:"100%"}}>
                    {successMessage}
                </Alert>
            </Snackbar>
            <Snackbar anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }} open={openErrorSnackbar} autoHideDuration={2000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="error" sx={{width:"100%"}}>
                    {errorMessage}
                </Alert>
            </Snackbar>
        </Box>
    );

}
export default OperationSnackbar;