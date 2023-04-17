import React, {useState} from 'react';
import styles from '../modules/task.module.css';
import { Box, IconButton, Tooltip} from '@mui/material';
import Checkbox from '@mui/material/Checkbox';
import CircleIcon from '@mui/icons-material/Circle';
import KeyboardArrowDownOutlinedIcon from '@mui/icons-material/KeyboardArrowDownOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import axios from 'axios';
import Confirmation from "./Confirmation";
import MuiAlert from "@mui/material/Alert";
import Snackbar from '@mui/material/Snackbar';
import UpdateTask from './UpdateTask';
const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props}/>
});
function Task(props){
    const {id, title, description, priority, date, categories} = props;
    const [checked, setChecked] = React.useState(false);
    const handleChange = (event) => {
      setChecked(event.target.checked);
    };
    const [visible, setVisible] = React.useState(false);
    const [open, setOpen] = useState(false);
    const [openSuccessSnackbar,setOpenSuccessSnackbar] = React.useState(false);
    const [openErrorSnackbar,setOpenErrorSnackbar] = React.useState(false);
    const [openUpdateTask, setOpenUpdateTask] = React.useState(false);



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
    const deleteAction = () =>{

        axios.delete(`http://127.0.0.1:8000/api/delete_task/${id}`,{
            headers:{
                Authorization: 'Bearer ' + localStorage.getItem('token')
            }
        }).then(response=>{
            handleSuccessSnackbarClick();
        }).catch(error=>{
            handleErrorSnackbarClick();
        });
    }

    return(
        <Box className={styles.task}>
            <Confirmation open={open} onClose={()=> setOpen(false)} handleDelete={()=>{deleteAction(); setOpen(false);}}/>
            <Snackbar anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }} open={openSuccessSnackbar} autoHideDuration={2000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="success" sx={{width:"100%"}}>
                    Zadanie zostało pomyślnie usunięte
                </Alert>
            </Snackbar>
            <Snackbar anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }} open={openErrorSnackbar} autoHideDuration={2000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="error" sx={{width:"100%"}}>
                    Nie udało się usunąć zadania
                </Alert>
            </Snackbar>
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
                        <IconButton size="medium" onClick={()=> setOpenUpdateTask(true)}>
                            <EditOutlinedIcon/>
                        </IconButton>
                    </Tooltip>
                    <Tooltip title="Usuń">
                        <IconButton size="medium" onClick={() => setOpen(true)}>
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
            <UpdateTask id={id} title={title} description={description} deadline={date} priority={priority} category={"Dom"} visible={openUpdateTask} onClose={()=> setOpenUpdateTask(false)} categories={categories}/>
        </Box>
    );
}

export default Task;