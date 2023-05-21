import React, {useEffect} from 'react';
import styles from '../../public/modules/settings.module.css';
import Header from '../../public/components/Header';
import Confirmation from '../../public/components/Confirmation';
import axios from 'axios';
import {useNavigate} from "react-router-dom";
import MuiAlert from "@mui/material/Alert";
import Snackbar from '@mui/material/Snackbar';
import OperationSnackbar from "../../public/components/OperationSnackbar";

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props}/>
});
function check_password(password){
    var upperCase = /[A-Z]/g;
    var lowerCase = /[a-z]/g;
    var number = /[0-9]/g;
    return !!(password.match(upperCase) && password.match(lowerCase) && password.match(number));

}
function Settings(){

    const navigate = useNavigate();
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const [oldPassword, setOldPassword] = React.useState('');
    const [newPassword, setNewPassword] = React.useState('');
    const [repeatPassword,setRepeatPassword] = React.useState('');
    const [isSubmitting, setIsSubmitting] = React.useState(false);
    const [errors, setErrors] = React.useState([]);
    const [success, setSuccess] = React.useState([]);
    const [openSuccessSnackbar,setOpenSuccessSnackbar] = React.useState(false);
    const [openErrorSnackbar,setOpenErrorSnackbar] = React.useState(false);
    const [openSuccessESnackbar,setOpenSuccessESnackbar] = React.useState(false);
    const [openErrorESnackbar, setOpenErrorESnackbar] = React.useState(false);

    useEffect(()=>{
        if(localStorage.getItem('token') === '' || localStorage.getItem('token') == null)
        {
            navigate('/')
        }
    },[localStorage.getItem('token')])
    const handleOldPasswordChange = (e) =>{
        setOldPassword(e.target.value);
    }
    const handleNewPasswordChange = (e) =>{
        setNewPassword(e.target.value);
    }
    const handleRepeatPasswordChange = (e) =>{
        setRepeatPassword(e.target.value);
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
        setOpenSuccessESnackbar(false);
        setOpenErrorESnackbar(false);
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setErrors([]);
        setSuccess([]);
        if(newPassword!==oldPassword){
            if(newPassword===repeatPassword) {
                if(newPassword.length < 8 || !check_password(newPassword)){
                    e.preventDefault();
                    setIsSubmitting(false);
                    setErrors([{message:'Hasło musi zawierać 8 lub więcej znaków, zawierać jedną wielką oraz małą litere oraz jedną cyfre'}]);
                }else {
                    const data = {
                        old_password: oldPassword,
                        new_password: newPassword
                    };

                    axios.post('http://127.0.0.1:8000/api/change_password', data, {
                        headers: {
                            'Content-type': 'application/json',
                            Authorization: 'Bearer ' + localStorage.getItem('token')
                        }
                    }).then(response => {
                        setIsSubmitting(false);
                        if (response.data !== undefined) {
                            setSuccess(response.data);
                        }
                    }).catch(error => {
                        setIsSubmitting(false);
                        if (error.response.data !== undefined) {
                            setErrors(error.response.data);
                            setErrors([{message: "Podałeś niepoprawne obecne hasło"}])
                        }
                    });
                }
            }else{
                e.preventDefault();
                setIsSubmitting(false);
                setErrors([{message:'Podane hasła nie są takie same'}]);
            }
        }else{
            e.preventDefault();
            setIsSubmitting(false);
            setErrors([{message:'Nowe hasło jest takie same jak stare'}]);
        }
    }
    const handleLogout = () => {
        localStorage.setItem('token',"");
        localStorage.setItem('username',"");
        navigate("/login");
    }

    const deleteAccount = () => {
        axios.get('http://127.0.0.1:8000/api/delete_account', {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('token')
            }
        }).then(response=>{
            handleSuccessSnackbarClick();
        }).catch(error=>{
            handleErrorSnackbarClick();
        })
    };
    return(
        <div className={styles.container}>
            <OperationSnackbar openSuccessSnackbar = {openSuccessESnackbar} openErrorSnackbar={openErrorESnackbar} handleClose={handleClose} successMessage={"Zadanie zostało pomyślnie edytowane"} errorMessage={"Nie udało się edytowac zadania"}/>
            <Snackbar anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }} open={openSuccessSnackbar} autoHideDuration={2000} onClose={()=>{handleClose(); localStorage.setItem('token',"")}}>
                <Alert onClose={handleClose} severity="success" sx={{width:"100%"}}>
                    Pomyślnie usunięto konto, zaraz nastąpi wylogowanie
                </Alert>
            </Snackbar>
            <Snackbar anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }} open={openErrorSnackbar} autoHideDuration={2000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="error" sx={{width:"100%"}}>
                    Nie udało się usunąć konta
                </Alert>
            </Snackbar>
            <header><Header logoutAction={handleLogout} name={localStorage.getItem('username')} showMenu={false} handleOpenErrorSnackbar={() => setOpenErrorESnackbar(true)} handleOpenSuccessSnackbar={() => setOpenSuccessESnackbar(true)}/></header>
            <main className={styles.main}>
            <Confirmation open={open} onClose={()=> setOpen(false)} handleDelete={()=> {deleteAccount(); setOpen(false)}}/>
                <form className={styles.change_form} onSubmit={handleSubmit}>
                    {Object.keys(errors).length !==0 &&
                        <p className={styles.errorText}>{errors[0].message}</p>
                    }
                    {Object.keys(success).length !==0 &&
                        <p className={styles.successText}>Hasło zostało pomyślnie zmienione</p>
                    }
                    <p className={styles.form_text}>Obecne hasło</p>
                    <input id={styles.current_password} type="password" placeholder="********" onChange={handleOldPasswordChange} required/>
                    <p className={styles.form_text}>Nowe hasło</p>
                    <input id={styles.new_password} type="password" placeholder="********" onChange={handleNewPasswordChange} required/>
                    <p className={styles.form_text}>Powtórz nowe hasło</p>
                    <input id={styles.repeat_password} type="password" placeholder="********" onChange={handleRepeatPasswordChange} required/>
                    <button id={styles.change_button} type="submit" disabled={isSubmitting}>Zapisz</button>
                </form>
                <button id={styles.delete_account_btn} type="button" onClick={handleOpen}>Usuń konto</button>
            </main>
        </div>
    );
}

export default Settings;