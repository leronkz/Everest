import React from 'react'
import styles from './header.module.css';
import navsvg from '../../../public/img/nav.svg'
import { styled, alpha } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import {createTheme} from '@mui/material/styles';
import Av from '../../../public/upload/profile-picture.svg';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import IconButton from '@mui/material/IconButton';
import Settings from '@mui/icons-material/Settings';
import Logout from '@mui/icons-material/Logout';
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';
import Photo from '../../../public/upload/zdjecie.jpg';
import { Divider } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';

function getDate(){
    let date = new Date(),
    currYear = date.getFullYear(),
    currMonth = date.getMonth(),
    currDay = date.getDate();
    return date;
}

const todaysDate = getDate().toISOString().slice(0,10);

const theme = createTheme({
   shape:{
        borderRadius: '30px',
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
  

function Header(){
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
         setAnchorEl(event.currentTarget);
     };
    const handleClose = () => {
        setAnchorEl(null);
    };
    return (
        <div className={styles.top_bar}>
            <div className={styles.left_control}>
                    <IconButton
                        size='large'
                        sx={{ml: 1,
                             width: '5ch',
                             borderRadius: '30px'}}
                    >
                      <HomeIcon />
                    </IconButton>
                <p id={styles.date_header}>Dziś jest: {todaysDate} </p>
            </div> 
            <div className={styles.center_control}>
                <Search theme={theme}>
                    <SearchIconWrapper>
                        <SearchIcon/>
                    </SearchIconWrapper>
                    <StyledInputBase 
                        placeholder="Wyszukaj zadania..."
                        inputProps={{'aria-label': 'search'}}
                    />
                </Search>
            </div>
            <div className={styles.right_control}>
                {/* <button id={styles.user_menu} type="button" onclick={handleClick}>
                    <img id={styles.prof_pic} src={Av} alt="Mateusz Owsiak"/>
                </button> */}
                <Tooltip title="Twoje konto">
                    <IconButton
                        onClick={handleClick}
                        size="small"
                        sx={{ml: 2}}
                        aria-controls={open ? 'account-menu' : undefined}
                        aria-haspopup="true"
                        aria-expanded={open ? 'true' : undefined}
                        >
                         <Avatar sx={{ width: 32, height: 32 }}>M</Avatar>   
                        </IconButton>
                </Tooltip>

                <p id={styles.date_header}>Cześć Mateusz</p>
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
                    <MenuItem onClick={handleClose}>
                         <img id={styles.prof_pic} src={Photo} />
                    </MenuItem>
                    <Divider/>
                    <MenuItem onClick={handleClose}>
                        <ListItemIcon>
                            <Settings/>
                        </ListItemIcon>
                         Ustawienia
                    </MenuItem>
                    <MenuItem>
                        <ListItemIcon>
                            <Logout/> 
                        </ListItemIcon>
                        Wyloguj się 
                    </MenuItem>
                </Menu>
            </div>
        </div>
  );
}

export default Header;