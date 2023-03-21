import { Box, Divider, IconButton, Tooltip} from '@mui/material';
import Dom from '../../../public/img/dom.svg';
import React, { useState } from 'react';
import styles from '../../modules/section.module.css';
import KeyboardArrowDownOutlinedIcon from '@mui/icons-material/KeyboardArrowDownOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import Checkbox from '@mui/material/Checkbox';
import CircleIcon from '@mui/icons-material/Circle';
import Task from './Task';
import AddIcon from '@mui/icons-material/Add';


function Section({category}){

    const [checked, setChecked] = React.useState(true);
    const handleChange = (event) => {
      setChecked(event.target.checked);
    };

    const [visible, setVisible] = useState(false);
    const handleClick = () => {
        setVisible(true);
    };

    return(
        <Box sx={{
            display:"flex",
            flexDirection:"column",
        }}>
            <Task visible={visible} onClose={()=> setVisible(false)}/>
            <Box sx={{
                display:"flex",
                alignItems:"center",
            }}>
                <p className={styles.category_name}>Dom</p> 
                <img id={styles.imgs} src={Dom}/>
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
                            <IconButton size="medium">
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