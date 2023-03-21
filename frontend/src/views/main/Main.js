import { Box } from '@mui/system';
import Header from './components/Header';
import Navbar from './components/Navbar';
import Section from './components/Section';
import Task from './components/Task';
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
                {/* <div style={{position:"absolute", width:"60%", height:"70%"}}><Task/></div> */}
            </div>

        </Box>
    );
}

export default Main;