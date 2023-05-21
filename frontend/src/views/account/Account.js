import React, {useEffect} from 'react';
import styles from '../../public/modules/account.module.css';
import Header from '../../public/components/Header';
import Button from '@mui/material/Button';
import BasicPhoto from './basic_photo.svg';
import {useNavigate} from "react-router-dom";
import axios from 'axios';
import MuiAlert from "@mui/material/Alert";
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import Confirmation from "../../public/components/Confirmation";
import OperationSnackbar from "../../public/components/OperationSnackbar";
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
    const [isImage, setIsImage] = React.useState(false);
    const [openSuccessSnackbar,setOpenSuccessSnackbar] = React.useState(false);
    const [openErrorSnackbar,setOpenErrorSnackbar] = React.useState(false);
    const [openImageSuccessSnackbar,setOpenImageSuccessSnackbar] = React.useState(false);
    const [openImageErrorSnackbar,setOpenImageErrorSnackbar] = React.useState(false);
    const [openLoadErrorSnackbar,setOpenLoadErrorSnackbar] = React.useState(false);
    const [openLoadImageErrorSnackbar,setOpenLoadImageErrorSnackbar] = React.useState(false);
    const [openDeleteSuccessSnackbar,setOpenDeleteSuccessSnackbar] = React.useState(false);
    const [openDeleteErrorSnackbar,setOpenDeleteErrorSnackbar] = React.useState(false);
    const [openConfirmation, setOpenConfirmation] = React.useState(false);
    const [openSuccessESnackbar,setOpenSuccessESnackbar] = React.useState(false);
    const [openErrorESnackbar, setOpenErrorESnackbar] = React.useState(false);
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
    const handleImageSuccessSnackbarClick = () => {
        setOpenImageSuccessSnackbar(true);
    }
    const handleImageErrorSnackbarClick = () => {
        setOpenImageErrorSnackbar(true);
    }
    const handleLoadErrorSnackbarClick = () => {
        setOpenLoadErrorSnackbar(true);
    }
    const handleClose = (event, reason) => {
        if(reason === 'clickaway'){
            return;
        }
        setOpenSuccessSnackbar(false);
        setOpenErrorSnackbar(false);
        setOpenImageSuccessSnackbar(false);
        setOpenImageErrorSnackbar(false);
        setOpenLoadErrorSnackbar(false);
        setOpenDeleteSuccessSnackbar(false);
        setOpenDeleteErrorSnackbar(false);
        setOpenLoadImageErrorSnackbar(false);
        setOpenErrorESnackbar(false);
        setOpenSuccessESnackbar(false);
    }

    useEffect(()=>{
        if(localStorage.getItem('token') === "" || localStorage.getItem('token') == null){
            navigate('/');
        }else{
            getUser();
        }
    },[]);

    const getUser = () => {
        axios.get('http://127.0.0.1:8000/api/user', {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('token')
            }
        }).then((response) => {
            setName(response.data.name);
            setSurname(response.data.surname);
            setBirthdate(response.data.birthDate.slice(0, 10));
            getUserImage(response.data.idUser);
        }).catch(error => {
            handleLoadErrorSnackbarClick();
        });
    }
    const getUserImage = (idUser) => {
            axios.get(`http://127.0.0.1:8000/api/user_image/${idUser}`,{
                headers:{
                    Authorization: 'Bearer ' + localStorage.getItem('token')
                },
                responseType: 'blob'
            }).then(response=>{
                const reader = new FileReader();
                reader.onloadend = () => {
                    const fileData = reader.result;
                    setPhotoUrl(fileData);
                }
                reader.readAsDataURL(response.data);
                setIsImage(true);
            }).catch(error=>{
                setPhotoUrl('');
                setOpenLoadImageErrorSnackbar(true);
                setIsImage(false);
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
            birthdate:birthdate
        };
        const formData = new FormData();
        if(image !== null)
            formData.append("image", image);
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
        if(!formData.entries().next().done) {
            axios.post('http://127.0.0.1:8000/api/save_image', formData, {
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem('token'),
                    'Content-type': 'multipart/form-data'
                }
            }).then(response => {
                handleImageSuccessSnackbarClick();
                setIsImage(true);
            }).catch(error => {
                handleImageErrorSnackbarClick();
                setIsImage(false);
            });
        }
    }

    const deleteImage = () => {
        axios.get('http://127.0.0.1:8000/api/delete_image', {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('token')
            }
        }).then(response=>{
                setPhotoUrl('');
                setImage(null);
                setOpenDeleteSuccessSnackbar(true);
                setIsImage(false);
        }).catch(error=>{
                setOpenDeleteErrorSnackbar(true);
                setIsImage(true);
        })
    };

    return(
        <div className={styles.container}>
            <OperationSnackbar openSuccessSnackbar = {openSuccessESnackbar} openErrorSnackbar={openErrorESnackbar} handleClose={handleClose} successMessage={"Zadanie zostało pomyślnie edytowane"} errorMessage={"Nie udało się edytowac zadania"}/>
            <Confirmation open={openConfirmation} onClose={()=> setOpenConfirmation(false)} handleDelete={()=> {deleteImage(); setOpenConfirmation(false)}}/>
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
            <Snackbar anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }} open={openImageSuccessSnackbar} autoHideDuration={2000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="success" sx={{width:"100%"}}>
                    Zdjęcie zostało pomyślnie zmienione
                </Alert>
            </Snackbar>
            <Snackbar anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }} open={openImageErrorSnackbar} autoHideDuration={2000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="error" sx={{width:"100%"}}>
                    Nie udało się zmienić zdjęcia
                </Alert>
            </Snackbar>
            <Snackbar anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }} open={openLoadErrorSnackbar} autoHideDuration={2000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="error" sx={{width:"100%"}}>
                    Nie udało się pobrać danych o użytkowniku
                </Alert>
            </Snackbar>
            <Snackbar anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }} open={openLoadImageErrorSnackbar} autoHideDuration={2000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="error" sx={{width:"100%"}}>
                    Nie udało się załadować zdjęcia profilowego
                </Alert>
            </Snackbar>
            <Snackbar anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }} open={openDeleteSuccessSnackbar} autoHideDuration={2000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="success" sx={{width:"100%"}}>
                    Zdjęcie zostało pomyślnie usunięte
                </Alert>
            </Snackbar>
            <Snackbar anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }} open={openDeleteErrorSnackbar} autoHideDuration={2000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="error" sx={{width:"100%"}}>
                    Nie udało się usunąć zdjęcia
                </Alert>
            </Snackbar>
            <header><Header logoutAction={handleLogout} name={localStorage.getItem('username')} showMenu={false} handleOpenErrorSnackbar={() => setOpenErrorESnackbar(true)} handleOpenSuccessSnackbar={() => setOpenSuccessESnackbar(true)}/></header>
            <main className={styles.main}>
                <form className={styles.account_form} encType='multipart/form-data' onSubmit={handleSubmit}>
                    <div className={styles.profile_picture}>
                            <div className={styles.picture} style={{backgroundImage:`url(${photo_url})`}} key={new Date().getTime()}>
                                <IconButton
                                    size="large"
                                    sx={{color: "red", visibility:(isImage===true ? "visible" : "hidden")}}
                                    onClick={()=>setOpenConfirmation(true)}
                                >
                                    <DeleteForeverIcon/>
                                </IconButton>
                            </div>
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