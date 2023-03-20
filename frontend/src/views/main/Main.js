import { CssBaseline, Typography, AppBar } from '@mui/material';
import { Box } from '@mui/system';
import Header from './components/Header';
import Navbar from './components/Navbar';
import Section from './components/Section';
import styles from '../modules/main.module.css';
function Main(){

    return(
        <Box sx={{
            width:"100vw",
            height:"100vh",
        }}>
           <header><Header/></header>
           <div className={styles.main}>    
                <Navbar/>
                <main>
                    <Section/>
                </main>
            </div>

        </Box>
    );
}

export default Main;