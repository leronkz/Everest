import Header from '../../public/components/Header';
import Navbar from '../../public/components/Navbar';
import Section from '../../public/components/Section';
import styles from '../../public/modules/main.module.css';
import React from 'react';
function Main({photo}){

    const [category, setCategory] = React.useState('');
    const [addCategory, setAddCategory] = React.useState(false);
    const handleClick = (category) => setCategory(category);
    const handleOpen = () => setAddCategory(true);

    return(
         <div className={styles.container}>
           <header style={{verticalAlign:"top"}}><Header photo={photo}/></header>
           <div className={styles.main}>    
                <Navbar handleClick = {handleClick} handleOpen={handleOpen}/>
                <main>
                    <Section category={category} img={""} isOpenCategory={addCategory} handleCloseCategory={() => setAddCategory(false)}/>
                </main>
            </div>
        </div>
    );
}

export default Main;