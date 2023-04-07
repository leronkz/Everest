import { Box, Divider, IconButton, Tooltip} from '@mui/material';
import React, {useEffect, useState} from 'react';
import styles from '../modules/section.module.css';
import AddTask from './AddTask';
import AddIcon from '@mui/icons-material/Add';
import Confirmation from './Confirmation';
import Task from './Task';
import Category from "./Category";
import {useNavigate} from "react-router-dom";
import axios from 'axios';
import CircularProgress from '@mui/material/CircularProgress';

function Section({category, img, isOpenCategory, handleCloseCategory}){
    const navigate = useNavigate();
    // Do dodawania zadan
    const [visible, setVisible] = useState(false);
    const [spinner, setSpinner] = React.useState(false);
    const handleClick = () => {
        setVisible(true);
    };

    //Do obsługi popup'u z usuwaniem
    const [open, setOpen] = useState(false);
    const handleDelete = () => setOpen(true);

    if(category === '')
        category = "Wszystkie zadania";

    const [tasks,setTasks] = React.useState({});

    useEffect(() =>{
        if(localStorage.getItem('token')==='' || localStorage.getItem('token')==null){
            navigate('/');
        }else{
            getTasks();
        }
    },[category]);

    const getTasks = () =>{
        setSpinner(true);
        let category_type = "";
        if(category === "Wszystkie zadania")
            category_type = "all";
        else if(category==="Dzisiejsze zadania"){
            category_type = "today";
        }
        else{
            category_type = category;
        }
        axios.get(`http://127.0.0.1:8000/api/get_tasks/${category_type}`,{
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('token')
            }
        }).then((response)=>{
            setSpinner(false);
            setTasks(response.data);
        }).catch((error)=>{
            setSpinner(false);
            console.log(error);
        });
    }

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
                {spinner && (<Box sx={{mt:"2ch", mb:"2ch", display:"flex", justifyContent:"center",position:"absolute"}}><CircularProgress/></Box>)}
                {tasks.map((task)=>(
                    <Task title={task.title} description={task.description} date={task.deadline.substring(0,10)} priority={task.priority} handleDelete={handleDelete}></Task>
                ))}
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