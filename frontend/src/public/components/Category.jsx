import { Button, Tooltip, Divider, IconButton } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';
import styles from '../modules/category.module.css';
import TextField from '@mui/material/TextField';
import CloseIcon from '@mui/icons-material/Close';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import axios from 'axios';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

const Alert = React.forwardRef(function Alert(props, ref) {
   return <MuiAlert elevation={6} ref={ref} variant="filled" {...props}/>
});
function Category(props){
    const {open, onClose} = props;
    const [name,setName] = React.useState('');
    // const [openSnackbar,setOpenSnackbar] = React.useState(false);
    if(!open)
        return null;

    const handleNameChange = (e) =>{
        setName(e.target.value);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const data = {
            name: name
        };
        axios.post('http://127.0.0.1:8000/api/add_category', data,{
            headers:{
                'Content-type': 'application/json',
                Authorization: 'Bearer ' + localStorage.getItem('token')
            }
        }).then(response=>{
           ///TODO Wyswietlic odpowiedni komunikat jesli kategoria juz jest na liscie
                // handleClick();
        }).catch(error=>{

        });
    }

    // const handleClick = () => {
    //     setOpenSnackbar(true);
    // }
    // const handleClose = (event, reason) => {
    //     if(reason === 'clickaway'){
    //         return;
    //     }
    //     setOpenSnackbar(false);
    // }

    return(
        <div className = {styles.add_category_container}>
            <Tooltip title="Zamknij">
                <IconButton size="medium" sx={{alignSelf:"flex-end"}} onClick={onClose}><CloseIcon/></IconButton>
            </Tooltip>
            <p className={styles.text}>Dodaj nową kategorie</p>  
            <Divider sx={{width:"100%", borderBottomWidth:2}}/>
            <Box className={styles.add_category_form} component="form">
                <TextField id='category-title' label="Nazwa kategorii.." variant="standard" sx={{width:"100%", mb:"2ch"}} onChange={handleNameChange} />
                <Button onClick={handleSubmit} sx={{width:"50%", alignSelf:"center"}}variant="outlined" startIcon={<AddOutlinedIcon/>}>
                    Dodaj
                </Button>
                {/*<Snackbar anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }} open={true} autoHideDuration={6000} onClose={handleClose}>*/}
                {/*    <Alert onClose={handleClose} severity="success" sx={{width:"100%"}}>*/}
                {/*        Udało się dodać nową kategorie*/}
                {/*    </Alert>*/}
                {/*</Snackbar>*/}
            </Box> 
        </div>
    );
}

export default Category;