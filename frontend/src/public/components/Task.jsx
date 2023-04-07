import React from 'react';
import styles from '../modules/task.module.css';
import { Box, IconButton, Tooltip} from '@mui/material';
import Checkbox from '@mui/material/Checkbox';
import CircleIcon from '@mui/icons-material/Circle';
import KeyboardArrowDownOutlinedIcon from '@mui/icons-material/KeyboardArrowDownOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
function Task({title, description, priority, date, handleDelete}){

    const [checked, setChecked] = React.useState(false);
    const handleChange = (event) => {
      setChecked(event.target.checked);
    };
    const [visible, setVisible] = React.useState(false);

    const iconButtonClass = `${styles.icon_button} ${visible ? styles.icon_button_rotated:''}`;
    let priority_value = "Niski";
    let priority_color = "green";
    if(priority === "low") {
        priority_value = "Niski";
        priority_color = "green";
    }
    else if(priority === "medium") {
        priority_value = "Średni";
        priority_color = "orange";
    }
    else {
        priority_value = "Wysoki";
        priority_color = "red";
    }
    return(
        <Box className={styles.task}>
            <Box className={styles.task_header}>
                <Box sx={{display:"flex", flexDirection:"row", justifyContent:"flex-start", alignItems:"center"}}>
                    <Checkbox checked={checked} onChange={handleChange} inputProps={{'aria-label':'controlled'} }/>
                    <p className={styles.task_text}>{title}</p>
                </Box>
                <CircleIcon sx={{color: priority_color, border:"2px solid", borderColor: priority_color, borderRadius:"50%"}}/>
                <Box>
                    <Tooltip title= {visible ? "Zwiń" : "Pokaż"}>
                        <IconButton 
                            size="medium"
                            onClick = {() => setVisible(!visible)}
                        >
                        <KeyboardArrowDownOutlinedIcon className={iconButtonClass}/>
                        </IconButton>
                    </Tooltip>
                    <Tooltip title="Edytuj">
                        <IconButton size="medium">
                            <EditOutlinedIcon/>
                        </IconButton>
                    </Tooltip>
                    <Tooltip title="Usuń">
                        <IconButton size="medium" onClick={handleDelete}>
                            <DeleteOutlineOutlinedIcon/>
                        </IconButton>
                    </Tooltip>
                </Box>
            </Box>
            <Box className={styles.task_body} sx={{display: visible ? "inline-block" : "none"}}>
                <p className={styles.task_body_text}>{(description==="" || description==null ? "Brak opisu zadania" : description)}</p>
                <p className={styles.task_body_text}>Termin: {date}</p>
                <Box sx={{display:"flex", alignItems:"center", width:"100%"}}>
                    <p className={styles.task_body_text}>Priorytet: {priority_value}</p>
                    <CircleIcon sx={{ml:"1em",color: priority_color, border:'2px solid',borderRadius:"50%", borderColor: priority_color}}/>
                </Box>
            </Box>
        </Box>
    );
}

export default Task;