import React, {useEffect} from 'react'
import UpdateTask from './UpdateTask';
import styles from '../modules/header.module.css';
import { styled } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import {createTheme} from '@mui/material/styles';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import IconButton from '@mui/material/IconButton';
import Settings from '@mui/icons-material/Settings';
import Logout from '@mui/icons-material/Logout';
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';
import {Divider} from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import {Link} from 'react-router-dom';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import MenuIcon from '@mui/icons-material/Menu';
import Autocomplete from '@mui/material/Autocomplete';
import axios from "axios";
function getDate(){
    let date = new Date();
    return date;
}

const todaysDate = getDate().toISOString().slice(0,10);

const theme = createTheme({
   shape:{
        borderRadius: "0px",
   },
})

const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: '#FFD9C3',
    '&:hover': {
      backgroundColor: '#FFFFFF',
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(1),
      width: 'auto',
    },
  }));
  
  const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  }));
  
  const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
      padding: theme.spacing(1, 1, 1, 0),
      paddingLeft: `calc(1em + ${theme.spacing(4)})`,
      transition: theme.transitions.create('width'),
      width: '100%',
      [theme.breakpoints.up('sm')]: {
        width: '20ch',
        '&:focus': {
          backgroundColor:'#ffffff',
          width: '40ch',
        },
      },
    },
  }));
  

function Header({logoutAction,name, openNavbar, showMenu, handleOpenSuccessSnackbar, handleOpenErrorSnackbar}){

    const [anchorEl, setAnchorEl] = React.useState(null);
    const [tasks,setTasks] = React.useState([]);
    const [selectedTask, setSelectedTask] = React.useState(null);
    const [openUpdateTask, setOpenUpdateTask] = React.useState(false);
    const [categories, setCategories] = React.useState([]);
    useEffect(()=>{
        if(localStorage.getItem('token') !== '' && localStorage.getItem('token')!=null ){
            getTasks();
            getCategories();
        }
    },[]);

    const getTasks = () =>{
        axios.get(`http://127.0.0.1:8000/api/get_tasks/all`,{
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('token')
            }
        }).then((response)=>{
            setTasks([]);
            setTasks(response.data);
        }).catch((error)=>{
            console.log(error);
        });
    }
    const getCategories = () => {

        axios.get('http://127.0.0.1:8000/api/get_categories/',{
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('token')
            }
        }).then((response)=>{
            setCategories(response.data);
        }).catch((error)=>{
            console.log(error);
        })
    };
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
         setAnchorEl(event.currentTarget);
     };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleLogout = () => {
        logoutAction();
    }

    const handleAutocompleteChange = (event, value) => {
        const task = tasks.find((t) => t.title === value);
        setSelectedTask(task);
        setOpenUpdateTask(true);
    }

    return (
        <div className={styles.top_bar}>
            <div className={styles.left_control}>
               <div className={showMenu ? styles.open_nav : styles.open_nav_hidden}>
                    <IconButton
                        size='large'
                        onClick = {openNavbar}
                    >
                        <MenuIcon/>
                    </IconButton>
               </div>
                  <Link to="/main">
                    <IconButton
                        size='large'
                        sx={{ml: 1,
                             width: '5ch',
                             borderRadius: '30px'}}
                    >
                      <HomeIcon />
                    </IconButton>
                  </Link>
                <p id={styles.date_header}>Dziś jest: {todaysDate}</p>
            </div> 
            <div className={styles.center_control}>
                <Autocomplete
                    freeSolo
                    options={tasks.map((option) => option.title)}
                    onChange = {handleAutocompleteChange}
                    style={{width: "100%"}}
                    getOptionSelected={(option, value) => option === value}
                    renderInput={(params) => {
                        const {InputLabelProps, InputProps, ...rest} = params;
                        return (<InputBase {...params.InputProps} sx={{ml: 1, flex: 1, background:"white", pl:2, borderRadius:"30px"}}  placeholder="Wyszukaj zadanie..."  {...rest}/>
                        )
                    }}
                />
                {selectedTask && <UpdateTask id={selectedTask.idTask} title={selectedTask.title} description={selectedTask.description} deadline={selectedTask.deadline.substring(0,10)} priority={selectedTask.priority} category={selectedTask.categoryName} visible={openUpdateTask} onClose={()=> setOpenUpdateTask(false)} categories={categories} handleOpenSuccessSnackbar={handleOpenSuccessSnackbar} handleOpenErrorSnackbar={handleOpenErrorSnackbar} />}
            </div>
            <div className={styles.right_control}>
                <Tooltip title="Twoje konto">
                    <IconButton
                        onClick={handleClick}
                        size="small"
                        sx={{ml: 2}}
                        aria-controls={open ? 'account-menu' : undefined}
                        aria-haspopup="true"
                        aria-expanded={open ? 'true' : undefined}
                        >
                         <Avatar sx={{ width: 32, height: 32 }}>{(name==="" || name==null ? "A" : name.charAt(0))}</Avatar>
                        </IconButton>
                </Tooltip>

                <p id={styles.date_header}>Cześć {name}</p>
                <Menu
                    anchorEl={anchorEl}
                    id="user-menu"
                    open={open}
                    onClose={handleClose}
                    onClick={handleClose}
                    PaperProps={{
                        elevation:0,
                        sx: {
                            background: '#FFFFFF',
                            overflow: 'visible',
                            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                            mt: 1.5,
                            '&:before': {
                              content: '""',
                              display: 'block',
                              position: 'absolute',
                              top: 0,
                              right: 14,
                              width: 10,
                              height: 10,
                              bgcolor: 'background.paper',
                              transform: 'translateY(-50%) rotate(45deg)',
                              zIndex: 0,
                            },
                        },
                    }}
                    transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                    anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                >
                  <Link to="/account">
                      <MenuItem onClick={handleClose}>
                        <ListItemIcon>
                            <AccountCircleIcon/>
                        </ListItemIcon>
                          Konto
                      </MenuItem>
                    </Link>
                    <Divider/>
                    <Link to="/settings">
                      <MenuItem onClick={handleClose}>
                          <ListItemIcon>
                              <Settings/>
                          </ListItemIcon>
                          Ustawienia
                      </MenuItem>
                    </Link>
                    <Link to="/">
                      <MenuItem onClick={handleLogout}>
                          <ListItemIcon>
                              <Logout/> 
                          </ListItemIcon>
                          Wyloguj się 
                      </MenuItem>
                    </Link>
                </Menu>
            </div>
        </div>
  );
}

export default Header;