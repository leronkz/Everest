import React, {useEffect} from 'react';
import styles from '../../public/modules/settings.module.css';
import Header from '../../public/components/Header';
import Confirmation from '../../public/components/Confirmation';
import axios from 'axios';
import CircularProgress from '@mui/material/CircularProgress';
import {Box} from "@mui/system";
import {useNavigate} from "react-router-dom";
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

    useEffect(()=>{
        if(localStorage.getItem('token') === '' || localStorage.getItem('token') == null)
        {
            navigate('/')
        }
    },[])
    const handleOldPasswordChange = (e) =>{
        setOldPassword(e.target.value);
    }
    const handleNewPasswordChange = (e) =>{
        setNewPassword(e.target.value);
    }
    const handleRepeatPasswordChange = (e) =>{
        setRepeatPassword(e.target.value);
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
                        console.log(response);
                    }).catch(error => {
                        setIsSubmitting(false);
                        console.log(error);
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
        navigate("/login");
    }

    const deleteAccount = () => {
        axios.get('http://127.0.0.1:8000/api/delete_account', {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('token')
            }
        }).then(response=>{
            // handleSuccessSnackbarClick();
            localStorage.setItem('token','');
        }).catch(error=>{
            // handleErrorSnackbarClick();
        })
    };

    return(
        <div className={styles.container}>
            <header><Header logoutAction={handleLogout}/></header>
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
                    <input id={styles.current_password} type="password" placeholder="********" onChange={handleOldPasswordChange}/>
                    <p className={styles.form_text}>Nowe hasło</p>
                    <input id={styles.new_password} type="password" placeholder="********" onChange={handleNewPasswordChange}/>
                    <p className={styles.form_text}>Powtórz nowe hasło</p>
                    <input id={styles.repeat_password} type="password" placeholder="********" onChange={handleRepeatPasswordChange}/>
                    <button id={styles.change_button} type="submit" disabled={isSubmitting}>Zapisz</button>
                </form>
                <button id={styles.delete_account_btn} type="button" onClick={handleOpen}>Usuń konto</button>
            </main>
        </div>
    );
}

export default Settings;