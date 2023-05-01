import { Divider, Drawer, List, ListItem, ListItemButton, ListItemText, Toolbar, Box, IconButton, Tooltip } from '@mui/material';
import React, {useEffect, useState} from 'react'
import styles from '../modules/navbar.module.css';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import KeyboardArrowUpOutlinedIcon from '@mui/icons-material/KeyboardArrowUpOutlined';
import {useNavigate} from "react-router-dom";
import axios from 'axios';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import Confirmation from "./Confirmation";
import MuiAlert from "@mui/material/Alert";
import Snackbar from '@mui/material/Snackbar';
let Icon = () => <KeyboardArrowUpOutlinedIcon/>

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props}/>
});
function Navbar({handleClick, handleOpen, isOpenNavbar}){
    const navigate = useNavigate();
    const [openSuccessSnackbar,setOpenSuccessSnackbar] = React.useState(false);
    const [openErrorSnackbar,setOpenErrorSnackbar] = React.useState(false);
    const [visible, setVisible] = React.useState(true);
    const [categories,setCategories] = React.useState([]);
    const [open, setOpen] = useState(false);
    const [categoryToDelete, setCategoryToDelete] = React.useState('');

    const handleDelete = (category) => {
        setOpen(true);
        setCategoryToDelete(category.categoryName);
    }
    const toggleVisible = () => {
        setVisible((prevVisible) => !prevVisible);
    };    
        
    const iconButtonClass = `${styles.icon_button} ${visible ? '' :styles.icon_button_rotated}`;

    useEffect(()=>{
       if(localStorage.getItem('token') === '' || localStorage.getItem('token') == null)
       {
           navigate('/')
       }else{
           getCategories();
       }
    },[])

    const getCategories = () => {

        axios.get('http://127.0.0.1:8000/api/get_categories/',{
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('token')
            }
        }).then((response)=>{
            setCategories(response.data);
        }).catch((error)=>{
            console.log(error);
        })

    };
    const handleSuccessSnackbarClick = () => {
        setOpenSuccessSnackbar(true);
    }
    const handleErrorSnackbarClick = () => {
        setOpenErrorSnackbar(true);
    }
    const handleClose = (event, reason) => {
        if(reason === 'clickaway'){
            return;
        }
        setOpenSuccessSnackbar(false);
        setOpenErrorSnackbar(false);
    }
    const deleteCategory = (category) => {
        const data={
            name: category
        };
        axios.post('http://127.0.0.1:8000/api/delete_category', data, {
            headers: {
                "Content-Type": "application/json",
                Authorization: 'Bearer ' + localStorage.getItem('token')
            }
        }).then(response=>{
                handleSuccessSnackbarClick();
        }).catch(error=>{
                handleErrorSnackbarClick();
        })
    };

    return(
        <div className={isOpenNavbar ? styles.navbarOpen : styles.navbar}>
            <Confirmation open={open} onClose={()=> setOpen(false)} handleDelete={()=> {deleteCategory(categoryToDelete); setOpen(false)}}/>
            <Snackbar anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }} open={openSuccessSnackbar} autoHideDuration={2000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="success" sx={{width:"100%"}}>
                    Kategoria została pomyślnie usunięta
                </Alert>
            </Snackbar>
            <Snackbar anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }} open={openErrorSnackbar} autoHideDuration={2000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="error" sx={{width:"100%"}}>
                    Nie udało się usunąć kategorii
                </Alert>
            </Snackbar>
            <Drawer
                sx={{
                    width: "305px",
                    flexShrink: 0,
                    '& .MuiDrawer-paper': {
                        width: "230px",
                        boxSizing: 'border-box',
                        background: '#FFE8FC',
                        zIndex:"auto",
                        float:"left",
                    },
                }}
                variant="permanent"
                anchor="left"
            >
                <Toolbar/>
                <p className={styles.text}>Ogólne</p>
                <Divider/>
                    <List>
                        {['Wszystkie zadania','Dzisiejsze zadania'].map((text)=>(
                            <ListItem key={text} disablePadding>
                                <ListItemButton onClick={()=> handleClick(text)}>
                                    <ListItemText className={styles.category_text} primary={text}/>
                                </ListItemButton>
                            </ListItem>
                        ))}
                    </List>
                <Divider/>
                <Box sx = {{display:"flex",
                            alignItems:"center",
                            justifyContent:"space-between"}}>
                    <p className={styles.text}>Kategorie</p>
                    <Box sx={{display:"flex"}}>
                        <Tooltip title="Dodaj">
                            <IconButton onClick={handleOpen}
                                size="medium"
                            >
                                <AddOutlinedIcon/>
                            </IconButton>
                        </Tooltip>
                        <Tooltip title= {visible ? "Schowaj" : "Pokaż"}>
                            <IconButton className = {iconButtonClass}
                                size="medium"
                                onClick={toggleVisible}
                            >
                            <Icon/>
                            </IconButton>
                        </Tooltip>
                    </Box>
                </Box>
                <Divider/>
                <Box
                    sx={{
                    display:"flex",
                    flexDirection:"column",
                    visibility: visible ? "visible" : "hidden"
                }}>
                    <List>
                        {categories.map((category)=>(
                            <ListItem key={category.categoryName} disablePadding >
                                <ListItemButton onClick={()=> handleClick(category.categoryName)}>
                                    <ListItemText className={styles.category_text} primary={category.categoryName}/>
                                </ListItemButton>
                                <Tooltip title="Usuń">
                                    <IconButton size="small" onClick={()=>handleDelete(category)}>
                                        <DeleteOutlineOutlinedIcon/>
                                    </IconButton>
                                </Tooltip>
                            </ListItem>
                        ))}
                    </List>
                </Box>
            </Drawer>
        </div>
    );
}

export default Navbar;