import { Box, Divider } from '@mui/material';
import React from 'react';
import styles from '../modules/confirmation.module.css';
import Backdrop from '@mui/material/Backdrop';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';

function Confirmation(props){

    const {open, onClose} = props;

    if(!open)
        return null;
    return(
        <div>
            <Modal 
            open={open}
            onClose={onClose}
            closeAfterTransition
            slots={{ backdrop: Backdrop }}
            slotProps={{
            backdrop: {
                 timeout: 500,
                },
            }}>
             <Fade in={open}>
                <Box className={styles.confirmation_modal}>
                    <Typography>
                        <p className={styles.text}>Potwierdź usunięcie</p>
                    </Typography>
                    <Divider sx={{borderBottomWidth:2}}/>
                    <Typography sx={{ mt: 2, mb:2 }}>
                         <p className={styles.secondary_text}>Czy jesteś pewny, że chcesz dokonać tej operacji?</p>
                    </Typography>
                    <Divider sx={{borderBottomWidth:2}}/>
                    <Box sx={{display:"flex", justifyContent:"flex-end", width:"100%", mt:"1em"}}>
                        <Button variant="outlined" color="error" startIcon={<DeleteIcon/>}>
                            Usuń
                        </Button>
                        <Button variant="outlined" sx={{color:"black", ml:2}} onClick={onClose}>
                            Anuluj
                        </Button>
                    </Box>
                </Box>
             </Fade>
            </Modal>
        </div>
    );
}

export default Confirmation;