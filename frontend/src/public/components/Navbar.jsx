import { Divider, Drawer, List, ListItem, ListItemButton, ListItemText, Toolbar, Box, IconButton, Tooltip } from '@mui/material';
import React, {useEffect, useState} from 'react'
import styles from '../modules/navbar.module.css';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import KeyboardArrowUpOutlinedIcon from '@mui/icons-material/KeyboardArrowUpOutlined';
import {useNavigate} from "react-router-dom";
import axios from 'axios';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import Confirmation from "./Confirmation";
let Icon = () => <KeyboardArrowUpOutlinedIcon/>
function Navbar({handleClick, handleOpen}){
    const navigate = useNavigate();
    const [visible, setVisible] = React.useState(true);
    const [categories,setCategories] = React.useState([]);
    const [open, setOpen] = useState(false);
    const handleDelete = () => setOpen(true);
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

    const deleteCategory = () => {
        //TODO Pobrac nazwe kategori po klinieciu i wyslanie na serwer
    };

    return(
        <div className={styles.navbar}>
            <Confirmation open={open} onClose={()=> setOpen(false)}/>
            <Drawer
                sx={{
                    width: "305px",
                    flexShrink: 0,
                    '& .MuiDrawer-paper': {
                        width: "305px",
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
                                    <IconButton size="small" onClick={handleDelete}>
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