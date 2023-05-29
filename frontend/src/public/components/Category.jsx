import { Button, Tooltip, Divider, IconButton } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';
import styles from '../modules/category.module.css';
import TextField from '@mui/material/TextField';
import CloseIcon from '@mui/icons-material/Close';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import axios from 'axios';
function Category(props){
    const {open, onClose, handleOpenSuccessSnackbar, handleOpenErrorSnackbar, getCategories} = props;
    const [name,setName] = React.useState('');
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
            handleOpenSuccessSnackbar();
            getCategories();
            onClose();
        }).catch(error=>{
            handleOpenErrorSnackbar();
        });
    }

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
            </Box> 
        </div>
    );
}

export default Category;