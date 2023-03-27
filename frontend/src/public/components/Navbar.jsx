import { Divider, Drawer, List, ListItem, ListItemButton, ListItemText, Toolbar, Box, IconButton, Tooltip } from '@mui/material';
import React from 'react'
import styles from '../modules/navbar.module.css';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import KeyboardArrowUpOutlinedIcon from '@mui/icons-material/KeyboardArrowUpOutlined';

let Icon = () => <KeyboardArrowUpOutlinedIcon/>
function Navbar({handleClick, handleOpen}){

    const categories = ['Dom','Sport','Praca','Edukacja'];
    const [visible, setVisible] = React.useState(true);

    const toggleVisible = () => {
        setVisible((prevVisible) => !prevVisible);
    };    
        
    const iconButtonClass = `${styles.icon_button} ${visible ? '' :styles.icon_button_rotated}`;
   
    return(
        <div className={styles.navbar}>
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
                        {categories.map((text)=>(
                            <ListItem key={text} disablePadding >
                                <ListItemButton onClick={()=> handleClick(text)}>
                                    <ListItemText className={styles.category_text} primary={text}/>
                                </ListItemButton>
                            </ListItem>
                        ))}
                    </List>
                </Box>
            </Drawer>
        </div>
    );
}

export default Navbar;