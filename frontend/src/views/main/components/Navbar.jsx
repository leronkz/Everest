import { Divider, Drawer, List, ListItem, ListItemButton, ListItemText, Toolbar, Box, IconButton,Button } from '@mui/material';
import React from 'react'
import styles from '../../modules/navbar.module.css';
import RadioButtonUncheckedOutlinedIcon from '@mui/icons-material/RadioButtonUncheckedOutlined';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import KeyboardArrowDownOutlinedIcon from '@mui/icons-material/KeyboardArrowDownOutlined';
import Dom from '../../../public/img/dom.svg';
import Sport from '../../../public/img/sport.svg';
import Edukacja from '../../../public/img/edukacja.svg';
import Praca from '../../../public/img/praca.svg';
function Navbar(){

    const manageCategoryList = () =>{

    };
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
                                <ListItemButton>
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
                        <IconButton
                            size="medium"
                        >
                            <AddOutlinedIcon/>
                        </IconButton>
                        <IconButton 
                            size="medium"
                            onClick={manageCategoryList}
                        >
                            <KeyboardArrowDownOutlinedIcon/>
                        </IconButton>
                    </Box>
                </Box>
                <Divider/>

                <Box sx={{
                    display:"flex",
                    flexDirection:"column",
                    visibility:"visible"
                }}>
                
                    <button className={styles.category_btn} type="button">
                        <Box sx={{
                            display:"flex",
                            flexDirection:"row",
                            alignItems:"center",
                            justifyContent:"space-between",
                            ml: "0.5em",
                        }}>
                            
                            <Box sx={{
                                display:"flex",
                                alignItems:"center"
                            }}>
                                <RadioButtonUncheckedOutlinedIcon/>
                                <p className={styles.category_text}>Dom</p>
                            </Box>
                            <img className={styles.imgs} src={Dom}/>
                        </Box>
                    </button>

                    <button className={styles.category_btn} type="button">
                        <Box sx={{
                            display:"flex",
                            flexDirection:"row",
                            alignItems:"center",
                            justifyContent:"space-between",
                            ml: "0.5em",
                        }}>
                            
                            <Box sx={{
                                display:"flex",
                                alignItems:"center"
                            }}>
                                <RadioButtonUncheckedOutlinedIcon/>
                                <p className={styles.category_text}>Sport</p>
                            </Box>
                            <img className={styles.imgs} src={Sport}/>
                        </Box>
                    </button>

                    <button className={styles.category_btn} type="button">
                        <Box sx={{
                            display:"flex",
                            flexDirection:"row",
                            alignItems:"center",
                            justifyContent:"space-between",
                            ml: "0.5em",
                        }}>
                            
                            <Box sx={{
                                display:"flex",
                                alignItems:"center"
                            }}>
                                <RadioButtonUncheckedOutlinedIcon/>
                                <p className={styles.category_text}>Praca</p>
                            </Box>
                            <img className={styles.imgs} src={Praca}/>
                        </Box>
                    </button>

                    <button className={styles.category_btn} type="button">
                        <Box sx={{
                            display:"flex",
                            flexDirection:"row",
                            alignItems:"center",
                            justifyContent:"space-between",
                            ml: "0.5em",
                        }}>
                            
                            <Box sx={{
                                display:"flex",
                                alignItems:"center"
                            }}>
                                <RadioButtonUncheckedOutlinedIcon/>
                                <p className={styles.category_text}>Edukacja</p>
                            </Box>
                            <img className={styles.imgs} src={Edukacja}/>
                        </Box>
                    </button>
                </Box>
            </Drawer>
        </div>
    );

}

export default Navbar;