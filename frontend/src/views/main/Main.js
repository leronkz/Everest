import { Box } from '@mui/system';
import Header from './components/Header';
import Navbar from './components/Navbar';
import Section from './components/Section';
import styles from '../modules/main.module.css';
import React from 'react';
function Main(){

    const [category, setCategory] = React.useState('');

    const handleClick = (category) => setCategory(category);

    return(
        <Box sx={{
            width:"100vw",
            height:"100vh",
        }}>
           <header><Header/></header>
           <div className={styles.main}>    
                <Navbar handleClick = {handleClick}/>
                <main>
                    <Section category={category} img={""}/>
                </main>
            </div>
        </Box>
    );
}

export default Main;