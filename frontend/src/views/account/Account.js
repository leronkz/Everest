import React, {useEffect} from 'react';
import styles from '../../public/modules/account.module.css';
import Header from '../../public/components/Header';
import Button from '@mui/material/Button';
import BasicPhoto from './basic_photo.svg';
import {useNavigate} from "react-router-dom";
import axios from 'axios';

import MuiAlert from "@mui/material/Alert";
import Snackbar from '@mui/material/Snackbar';

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props}/>
});
function Account({photo}){
    const navigate = useNavigate();
    const [photo_url, setPhotoUrl] = React.useState(photo);
    const [image,setImage] = React.useState(null);
    const [name,setName] = React.useState('');
    const [surname, setSurname] = React.useState('');
    const [birthdate,setBirthdate] = React.useState('');
    const [openSuccessSnackbar,setOpenSuccessSnackbar] = React.useState(false);
    const [openErrorSnackbar,setOpenErrorSnackbar] = React.useState(false);
    const handleNameChange = (e) =>{
        setName(e.target.value);
    }
    const handleSurnameChange = (e) => {
        setSurname(e.target.value);
    }
    const handleBirthdateChange = (e) => {
        setBirthdate(e.target.value);
    }
    const previewPhoto = (event) =>{
        const choseFile = event.target.files[0];
        setImage(choseFile);
        if(choseFile){
            const reader = new FileReader();
            reader.addEventListener('load',function(){
                setPhotoUrl(reader.result);
            })
            reader.readAsDataURL(choseFile);
        }
    }
    if(photo_url === ''){
        setPhotoUrl(BasicPhoto);
    }
    const handleSuccessSnackbarClick = () => {
        setOpenSuccessSnackbar(true);
    }
    const handleErrorSnackbarClick = () => {
        setOpenErrorSnackbar(true);
    }
    const handleClose = (event, reason) => {
        if(reason === 'clickaway'){
            return;
        }
        setOpenSuccessSnackbar(false);
        setOpenErrorSnackbar(false);
    }
    // const fileReader = new FileReader();
    // fileReader.onload = function (event) {
    //     const binaryData = event.target.result;
    //     const blob = new Blob([binaryData], {type:'image/jpeg'});
    //     const imageUrl = URL.createObjectURL(blob);
    //     setPhotoUrl(imageUrl);
    //     console.log(imageUrl);
    // }

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
            setName(response.data.name);
            setSurname(response.data.surname);
            setBirthdate(response.data.birthDate.slice(0,10));
            // fileReader.readAsArrayBuffer(response.data.image);
        })
    }
    const handleLogout = () => {
        localStorage.setItem('token',"");
        localStorage.setItem('username',"");
        navigate("/login");
    }

    const handleSubmit = (e) =>{

        e.preventDefault();
        const data={
            name:name,
            surname:surname,
            birthdate:birthdate,
            image: photo_url
        };
        axios.post('http://127.0.0.1:8000/api/save_user',data, {
            headers:{
                'Content-type': 'application/json',
                Authorization: 'Bearer ' + localStorage.getItem('token')
            }
        }).then(response=>{
            handleSuccessSnackbarClick();
        }).catch(error=>{
            handleErrorSnackbarClick();
        });
    }

    return(
        <div className={styles.container}>
            <Snackbar anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }} open={openSuccessSnackbar} autoHideDuration={2000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="success" sx={{width:"100%"}}>
                    Dane zostały pomyślnie zapisane
                </Alert>
            </Snackbar>
            <Snackbar anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }} open={openErrorSnackbar} autoHideDuration={2000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="error" sx={{width:"100%"}}>
                    Nie udało się zapisać danych
                </Alert>
            </Snackbar>
            <header><Header logoutAction={handleLogout} name={localStorage.getItem('username')}/></header>
            <main className={styles.main}>
                <form className={styles.account_form} encType='multipart/form-data' onSubmit={handleSubmit}>
                    <div className={styles.profile_picture}>
                            <div className={styles.picture} style={{backgroundImage:`url(${photo_url})`}}></div>
                            <Button variant="contained" component="label">
                                Wybierz zdjęcie
                                <input hidden accept="image/*" type="file" onChange={previewPhoto}/>
                            </Button>
                    </div>
                    <div className={styles.account_data}>
                        <p className={styles.form_text}>Imię</p>
                        <input id={styles.name} type="text" placeholder="Imie" value={(name==null ? "Imie" : name)} onChange={handleNameChange}/>
                        <p className={styles.form_text}>Nazwisko</p>
                        <input id={styles.surname} type="text" placeholder="Nazwisko" value={(surname==null ? "Nazwisko" : surname)} onChange={handleSurnameChange}/>
                        <p className={styles.form_text}>Data urodzenia</p>
                        <input id={styles.birthday} type="date" onChange={handleBirthdateChange} value={birthdate} />
                        <button id={styles.change_button} type="submit">Zapisz</button>
                    </div>
               </form>
            </main>
        </div>

    );

}

export default Account;