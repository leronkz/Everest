import React from 'react';
import axios from 'axios';
import {Box, Divider, IconButton, MenuItem, Tooltip} from "@mui/material";
import styles from "../modules/add_task.module.css";
import Snackbar from "@mui/material/Snackbar";
import CloseIcon from "@mui/icons-material/Close";
import TextField from "@mui/material/TextField";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Radio from "@mui/material/Radio";
import Select from "@mui/material/Select";


function UpdateTask(props){

    let {id, title, description, deadline, priority, category, visible, onClose, categories} = props;

    const [task_title,setTitle] = React.useState(title);
    const [task_description, setDescription] = React.useState(description);
    const [task_deadline, setDeadline] = React.useState(deadline);
    const [task_priority,setPriority] = React.useState(priority);
    const [task_category,setCategory] = React.useState(category);

    const handleTitleChange = (e) => {
        setTitle(e.target.value);
    }
    const handleDescriptionChange = (e) => {
        setDescription(e.target.value);
    }
    const handleDeadlineChange = (e) => {
        setDeadline(e.target.value);
    }
    const handlePriorityChange = (e) => {
        setPriority(e.target.value);
    }
    const handleCategoryChange = (e) => {
        setCategory(e.target.value);
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        const data = {
            title: task_title,
            description: task_description,
            deadline: task_deadline,
            priority: task_priority,
            category: task_category
        };
        axios.put(`http://127.0.0.1:8000/api/update_task/${id}`,data, {
            headers: {
                'Content-type': 'application/json',
                Authorization: 'Bearer ' + localStorage.getItem('token')
            }
        }).then((response)=>{
            // handleSuccessSnackbarClick();
            console.log(response.data);
        }).catch((error)=>{
            // handleErrorSnackbarClick();
            console.log(error.data);
        });
    }

    if(!visible)
        return null;
    return(

        <Box className={styles.add_task_container}>
            <Tooltip title="Zamknij">
                <IconButton size="large" sx={{alignSelf:"flex-end"}} onClick={onClose}><CloseIcon/></IconButton>
            </Tooltip>
            <p className={styles.text}>Edytuj zadanie</p>
            <Divider sx={{width:"100%", borderBottomWidth:2}}/>

            <Box className={styles.add_task_form} component="form" onSubmit={handleSubmit}>

                <TextField id='task-title' label="Nazwa zadania.." variant="standard" sx={{width:"100%", mb:"2ch"}} onChange={handleTitleChange} value={task_title}/>
                <TextField id="task-description" label="Opis zadania.." multiline maxRows={3} sx={{width:"100%"}} onChange={handleDescriptionChange} value={task_description}/>

                <Box className={styles.form_wrapper}>

                    <Box className={styles.task_deadline}>
                        <p className={styles.secondary_text} style={{marginRight:"2em"}}>Termin zadania: </p>
                        <input id={styles.task_date} type="date" onChange={handleDeadlineChange} value={task_deadline}/>
                    </Box>

                    <Box className={styles.task_priority}>
                        <p className={styles.secondary_text}>Priorytet:</p>

                        <RadioGroup value={task_priority} onChange={handlePriorityChange}>
                            <FormControlLabel value="low" control={<Radio sx={{color:"green", '&.Mui-checked': {color:"green"}}}/>} label="Niski"/>
                            <FormControlLabel value="medium" control={<Radio sx={{color:"orange", '&.Mui-checked': {color:"orange"}}}/>} label="Średni"/>
                            <FormControlLabel value="high" control={<Radio sx={{color:"red", '&.Mui-checked': {color:"red"}}}/>} label="Wysoki"/>
                        </RadioGroup>
                    </Box>

                    <Box className={styles.task_category}>
                        <p className={styles.secondary_text}>Kategoria:</p>
                        <Select
                            value={task_category}
                            onChange={handleCategoryChange}
                            displayEmpty
                        >
                            {categories.map((category)=>(
                                <MenuItem value={category.categoryName}>{category.categoryName}</MenuItem>
                            ))}
                        </Select>
                    </Box>
                </Box>
                <button id={styles.task_save_btn} type="submit">Zapisz</button>
            </Box>
        </Box>
    );
}

export default UpdateTask;