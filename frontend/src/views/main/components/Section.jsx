import { Box, Divider, IconButton, Tooltip} from '@mui/material';
import React, { useState } from 'react';
import styles from '../../modules/section.module.css';
import KeyboardArrowDownOutlinedIcon from '@mui/icons-material/KeyboardArrowDownOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import Checkbox from '@mui/material/Checkbox';
import CircleIcon from '@mui/icons-material/Circle';
import Task from './Task';
import AddIcon from '@mui/icons-material/Add';
import Confirmation from './Confirmation';
import Category from './Category';
// w zaleznosci od kategori bede pobieral z back'a zadania
function Section({category, img}){

    const [checked, setChecked] = React.useState(true);
    const handleChange = (event) => {
      setChecked(event.target.checked);
    };

    const [visible, setVisible] = useState(false);
    const handleClick = () => {
        setVisible(true);
    };

    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    
    if(category === '')
        category = "Wszystkie zadania";

    return(
        <Box sx={{
            display:"flex",
            flexDirection:"column",
        }}>
            <Task visible={visible} onClose={()=> setVisible(false)}/>
            <Confirmation open={open} onClose={()=> setOpen(false)}/>
            {/* <Category open={open} onClose = {() => setOpen(false)}/> */}
            <Box sx={{
                display:"flex",
                alignItems:"center",
            }}>
                <p className={styles.category_name}>{category}</p> 
                <img id={styles.imgs} src={img}/>
            </Box>
            <Divider/>

            <div className={styles.tasks_panel}>
                <Box className={styles.task}>
                    <Box sx={{display:"flex", flexDirection:"row", justifyContent:"center", alignItems:"center"}}>
                        <Checkbox checked={checked} onChange={handleChange} inputProps={{'aria-label':'controlled'} }/>
                        <p className={styles.task_text}>Tytuł zadania</p>
                    </Box>
                    <CircleIcon sx={{color:"red",border:"2px solid black",borderRadius:"50%"}}/>
                    <Box>
                        <Tooltip title="Rozwiń">
                            <IconButton 
                                size="medium"
                            >
                            <KeyboardArrowDownOutlinedIcon/>
                            </IconButton>
                        </Tooltip>
                        <Tooltip title="Edytuj">
                            <IconButton size="medium">
                                <EditOutlinedIcon/>
                            </IconButton>
                        </Tooltip>
                        <Tooltip title="Usuń">
                            <IconButton size="medium" onClick={handleOpen}>
                                <DeleteOutlineOutlinedIcon/>
                            </IconButton>
                        </Tooltip>
                    </Box>
                </Box>
                <Box className={styles.task}>
                    <Box sx={{display:"flex", flexDirection:"row", justifyContent:"center", alignItems:"center"}}>
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