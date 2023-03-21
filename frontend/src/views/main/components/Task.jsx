import { Divider, IconButton, Tooltip, Box, InputLabel, MenuItem, FormControl} from '@mui/material';
import React from 'react';
import {useState} from 'react';
import CloseIcon from '@mui/icons-material/Close';
import styles from '../../modules/task.module.css';
import TextField from '@mui/material/TextField';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Select from '@mui/material/Select';

// Kategorie pobierane z back'a albo wysylane przez props

function Task(props){

    const {visible, onClose} = props;
    const [value, setValue] = React.useState('low');
    const handlePriorityChange = (event) => {
      setValue(event.target.value);
    };

    const [category, setCategory] = React.useState('');
    const handleCategoryChange = (event) => {
        setCategory(event.target.value);
    };
    if(!visible)
        return null;
    return(

        <Box className={styles.add_task_container}>
            <Tooltip title="Zamknij">
                <IconButton size="large" sx={{alignSelf:"flex-end"}} onClick={onClose}><CloseIcon/></IconButton>
            </Tooltip>
            <p className={styles.text}>Dodaj nowe zadanie</p>  
            <Divider sx={{width:"100%", borderBottomWidth:2}}/> 

            <Box className={styles.add_task_form} component="form">

                <TextField id='task-title' label="Nazwa zadania.." variant="standard" sx={{width:"100%", mb:"2ch"}} />
                <TextField id="task-description" label="Opis zadania.." multiline maxRows={3} sx={{width:"100%"}}/>

                <Box className={styles.form_wrapper}>

                    <Box className={styles.task_deadline}>
                        <p className={styles.secondary_text} style={{marginRight:"2em"}}>Termin zadania: </p>
                        <input id={styles.task_date} type="date"/>
                    </Box>

                    <Box className={styles.task_priority}>
                        <p className={styles.secondary_text}>Priorytet:</p>
                        
                        <RadioGroup value={value} onChange={handlePriorityChange}>
                            <FormControlLabel value="low" control={<Radio sx={{color:"green", '&.Mui-checked': {color:"green"}}}/>} label="Niski"/>
                            <FormControlLabel value="medium" control={<Radio sx={{color:"orange", '&.Mui-checked': {color:"orange"}}}/>} label="Średni"/>
                            <FormControlLabel value="high" control={<Radio sx={{color:"red", '&.Mui-checked': {color:"red"}}}/>} label="Wysoki"/>
                        </RadioGroup>
                    </Box>

                    <Box className={styles.task_category}>
                        <p className={styles.secondary_text}>Kategoria:</p>
                        <Select 
                            value={category}
                            onChange={handleCategoryChange}
                            displayEmpty
                        >
                            <MenuItem value={"Dom"}>Dom</MenuItem>
                            <MenuItem value={"Sport"}>Sport</MenuItem>
                            <MenuItem value={"Praca"}>Praca</MenuItem>
                            <MenuItem value={"Edukacja"}>Edukacja</MenuItem>
                        </Select>
                    </Box>
                </Box>
                <button id={styles.task_save_btn} type="button">Zapisz</button>
            </Box>
        </Box>
    );
}

export default Task;