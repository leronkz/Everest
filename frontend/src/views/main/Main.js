import Header from '../../public/components/Header';
import Navbar from '../../public/components/Navbar';
import Section from '../../public/components/Section';
import styles from '../../public/modules/main.module.css';
import React, {useEffect} from 'react';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';
function Main(){

    const navigate = useNavigate();
    const [userData,setUserData] = React.useState({});
    const [isOpenNavbar, setIsOpenNavbar] = React.useState(false);

    useEffect(()=>{
        if(localStorage.getItem('token') === "" || localStorage.getItem('token') == null){
            navigate('/');
        }else{
            getUser();
        }
    },[]);

    const getUser = () => {
        axios.get('http://127.0.0.1:8000/api/user',{
            headers:{
                Authorization: 'Bearer ' + localStorage.getItem('token')
            }
        }).then((response)=>{
                setUserData(response.data);
                localStorage.setItem('username',response.data.name);
        })
    }
    const handleLogout = () => {
        localStorage.setItem('token',"");
        localStorage.setItem('username',"");
        navigate("/login");
    }
    const [category, setCategory] = React.useState('');
    const [addCategory, setAddCategory] = React.useState(false);
    const handleClick = (category) => {
        setCategory(category);
        setIsOpenNavbar(false);
    }
    const handleOpen = () => setAddCategory(true);
    return(
         <div className={styles.container}>
           <header style={{verticalAlign:"top"}}><Header logoutAction={handleLogout} name={userData.name} openNavbar={()=> setIsOpenNavbar(!isOpenNavbar)} showMenu={true}/></header>
           <div className={styles.main}>    
                <Navbar handleClick = {handleClick} handleOpen={handleOpen} isOpenNavbar={isOpenNavbar}/>
                <main>
                    <Section category={category} isOpenCategory={addCategory} handleCloseCategory={() => setAddCategory(false)}/>
                </main>
            </div>
        </div>
    );
}

export default Main;