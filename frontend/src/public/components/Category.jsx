import { Button, Tooltip, Divider, IconButton } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';
import styles from '../modules/category.module.css';
import TextField from '@mui/material/TextField';
import CloseIcon from '@mui/icons-material/Close';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';

function Category(props){
    const {open, onClose} = props;
    if(!open)
        return null;
    return(
        <div className = {styles.add_category_container}>
            <Tooltip title="Zamknij">
                <IconButton size="medium" sx={{alignSelf:"flex-end"}} onClick={onClose}><CloseIcon/></IconButton>
            </Tooltip>
            <p className={styles.text}>Dodaj nową kategorie</p>  
            <Divider sx={{width:"100%", borderBottomWidth:2}}/>
            <Box className={styles.add_category_form} component="form">
                <TextField id='category-title' label="Nazwa kategorii.." variant="standard" sx={{width:"100%", mb:"2ch"}} />
                <Button sx={{width:"50%", alignSelf:"center"}}variant="outlined" startIcon={<AddOutlinedIcon/>}>
                    Dodaj
                </Button>
            </Box> 
        </div>
    );
}

export default Category;