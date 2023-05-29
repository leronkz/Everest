import Header from '../../public/components/Header';
import Navbar from '../../public/components/Navbar';
import Section from '../../public/components/Section';
import styles from '../../public/modules/main.module.css';
import React, {useEffect} from 'react';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';
import OperationSnackbar from "../../public/components/OperationSnackbar";
function Main(){

    const navigate = useNavigate();
    const [isOpenNavbar, setIsOpenNavbar] = React.useState(false);
    const [openSuccessESnackbar,setOpenSuccessESnackbar] = React.useState(false);
    const [openErrorESnackbar, setOpenErrorESnackbar] = React.useState(false);
    const [category, setCategory] = React.useState('');
    const [addCategory, setAddCategory] = React.useState(false);
    const [categories, setCategories] = React.useState([]);
    const [tasks, setTasks] = React.useState([]);
    const [spinner, setSpinner] = React.useState(false);
    const [openErrorTaskSnackbar, setOpenErrorTaskSnackbar] = React.useState(false);
    const [openErrorCategorySnackbar, setOpenErrorCategorySnackbar] = React.useState(false);
    const [userData,setUserData] = React.useState({});
    useEffect(()=>{
        if(localStorage.getItem('token') === "" || localStorage.getItem('token') == null){
            navigate('/');
        }else{
            getTasks();
            getUser();
            getCategories();
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
    const handleClick = (category) => {
        setCategory(category);
        setIsOpenNavbar(false);
    }
    const handleClose = (event, reason) => {
        if(reason === 'clickaway'){
            return;
        }
        setOpenErrorESnackbar(false);
        setOpenSuccessESnackbar(false);
        setOpenErrorTaskSnackbar(false);
        setOpenErrorCategorySnackbar(false);
    }
    const getTasks = () =>{
        setSpinner(true);
        let category_type = "";
        if(category==="" || category == null){
            category_type="all"
        }
        else if(category === "Wszystkie zadania")
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
            setTasks([]);
            setTasks(response.data);
        }).catch((error)=>{
            setSpinner(false);
            setOpenErrorTaskSnackbar(true);
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
            setOpenErrorCategorySnackbar(true);
        })
    };
    const handleOpen = () => setAddCategory(true);
    return(
         <div className={styles.container}>
             <OperationSnackbar openSuccessSnackbar = {openSuccessESnackbar} openErrorSnackbar={openErrorESnackbar} handleClose={handleClose} successMessage={"Zadanie zostało pomyślnie edytowane"} errorMessage={"Nie udało się edytowac zadania"}/>
             <OperationSnackbar openSuccessSnackbar = {false} openErrorSnackbar={openErrorTaskSnackbar} handleClose={handleClose} successMessage={""} errorMessage={"Nie udało się pobrać zadań"}/>
             <OperationSnackbar openSuccessSnackbar = {false} openErrorSnackbar={openErrorCategorySnackbar} handleClose={handleClose} successMessage={""} errorMessage={"Nie udało się pobrać kategorii"}/>
             <header style={{verticalAlign:"top", position:"fixed", width:"100%",zIndex:"2"}}><Header logoutAction={handleLogout} name={userData.name} openNavbar={()=> setIsOpenNavbar(!isOpenNavbar)} showMenu={true} handleOpenErrorSnackbar={() => setOpenErrorESnackbar(true)} handleOpenSuccessSnackbar={() => setOpenSuccessESnackbar(true)}/></header>
           <div className={styles.main}>    
                <Navbar handleClick = {handleClick} handleOpen={handleOpen} isOpenNavbar={isOpenNavbar} categories={categories} getCategories={getCategories}/>
                <main>
                    <Section category={category} isOpenCategory={addCategory} handleCloseCategory={() => setAddCategory(false)} getTasks={getTasks} tasks={tasks} spinner={spinner} categories={categories} getCategories={getCategories}/>
                </main>
            </div>
        </div>
    );
}

export default Main;