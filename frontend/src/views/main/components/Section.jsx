import { Box, Divider, IconButton, Tooltip} from '@mui/material';
import React, { useState } from 'react';
import styles from '../../modules/section.module.css';
import AddTask from './AddTask';
import AddIcon from '@mui/icons-material/Add';
import Confirmation from './Confirmation';
import Task from './Task';
import Category from "./Category";
// w zaleznosci od kategori bede pobieral z back'a zadania
function Section({category, img, isOpenCategory, handleCloseCategory}){

    // Do dodawania zadan
    const [visible, setVisible] = useState(false);
    const handleClick = () => {
        setVisible(true);
    };

    //Do obsługi popup'u z usuwaniem
    const [open, setOpen] = useState(false);
    const handleDelete = () => setOpen(true);

    if(category === '')
        category = "Wszystkie zadania";

    return(
        <Box sx={{
            display:"flex",
            flexDirection:"column",
        }}>
            <AddTask visible={visible} onClose={()=> setVisible(false)}/>
            <Category open={isOpenCategory} onClose = {handleCloseCategory}/>
            <Confirmation open={open} onClose={()=> setOpen(false)}/>
            <Box sx={{
                display:"flex",
                alignItems:"center",
            }}>
                <p className={styles.category_name}>{category}</p> 
                <img id={styles.imgs} src={img}/>
            </Box>
            <Divider/>
            {/* Dodac overflow gdy jest duzo zdan */}
            <div className={styles.tasks_panel}> 
                <Task title="Posprzątać cały dom" description="Posprzątać kuchnię, łazienkę..." priority="orange" date="25.03.2023" handleDelete={handleDelete} />
                <Task title="Wynieść śmieci" description="" priority="red" date="23.03.2023" handleDelete={handleDelete} />
                <Box className={styles.task}>
                    <Box sx={{display:"flex", flexDirection:"row", justifyContent:"flex-start", alignItems:"center", width:"100%"}}>
                        <Tooltip title="Dodaj">
                            <IconButton size="medium" onClick={handleClick}>
                                <AddIcon/>
                            </IconButton>
                        </Tooltip>
                        <p className={styles.task_text} style={{color: "rgba(0, 0, 0, 0.4)"}}>Dodaj nowe zadanie</p>
                    </Box>
                </Box>
            </div>
        </Box>
    );
}

export default Section;