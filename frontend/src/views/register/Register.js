import  mainLogo  from '../../public/img/logo.png';
import  sideLogo from '../../public/img/logo2.svg';
import styles from '../../public/modules/register.module.css';
import {Link} from "react-router-dom";
import React from 'react';
import axios from 'axios';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

function check_password(password){
    var upperCase = /[A-Z]/g;
    var lowerCase = /[a-z]/g;
    var number = /[0-9]/g;
    if(password.match(upperCase) && password.match(lowerCase) && password.match(number))
        return true;
    return false;
}
function Register(){

    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [repeatPassword, setRepeatPassword] = React.useState('');
    const [validationErrors, setValidationErrors] = React.useState([]);
    const [validationSuccess, setValidationSuccess] = React.useState([]);
    const [isSubmitting, setIsSubmitting] = React.useState(false);
    const [spinner, setSpinner] = React.useState(false);
    const handleEmailChange = (event) =>{
        setEmail(event.target.value);
    }
    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    }
    const handleRepeatPasswordChange = (event) => {
        setRepeatPassword(event.target.value);
    }
    const handleSubmit = (e) => {
        setValidationErrors([]);
        setValidationSuccess([]);
        if(password.length < 8 || !check_password(password)){
            e.preventDefault();
            setValidationErrors([{message:'Hasło musi zawierać 8 lub więcej znaków, zawierać jedną wielką oraz małą litere oraz jedną cyfre'}]);
        }else {
            if (password === repeatPassword) {

                setSpinner(true);
                setValidationErrors({});
                e.preventDefault();
                setIsSubmitting(true);
                const data = {
                    email: email,
                    password: password
                };
                axios.post('http://127.0.0.1:8000/api/register', data, {
                    headers: {
                        'Content-type': 'application/json'
                    }
                })
                    .then(response => {
                        setSpinner(false);
                        setIsSubmitting(false);
                        if (response.data !== undefined) {
                            setValidationSuccess(response.data);
                        }
                    })
                    .catch(error => {
                        setSpinner(false);
                        setIsSubmitting(false);
                        if (error.response.data !== undefined) {
                            setValidationErrors(error.response.data);
                            setValidationErrors([{message: "Podany adres email jest już zajęty"}])
                        }
                    })
            } else {
                e.preventDefault();
                setValidationErrors([{message: "Podane hasła nie są takie same"}]);
            }
        }
    }

    return(
        <div className={styles.main}>
            <div className={styles.container}>
                <div className={styles.loginPanel}>
                    <img id={styles.logo} src={mainLogo} alt="Logo"/>
                    <p className={styles.mainText}>Założ konto już teraz</p>
                    <form className={styles.loginForm} onSubmit={handleSubmit}>
                        {Object.keys(validationErrors).length !==0 &&
                            <p className={styles.errorText}>{validationErrors[0].message}</p>
                        }
                        {Object.keys(validationSuccess).length !==0 &&
                            <p className={styles.successText}>Konto zostało pomyślnie utworzone</p>
                        }
                        <input id={styles.emailInput} placeholder="email" type="email"  onChange={handleEmailChange} required/>
                        <input id={styles.passwordInput} placeholder="haslo" type="password"  onChange={handlePasswordChange} required/>
                        <input id={styles.repeatPasswordInput} placeholder="powtorz haslo" type="password"  onChange={handleRepeatPasswordChange} required/>
                        {spinner && (<Box sx={{mt:"2ch", display:"flex", justifyContent:"center"}}><CircularProgress/></Box>)}
                        <button id={styles.registerButton} type="submit" disabled={isSubmitting}>Załóż konto</button>
                        <Link className={styles.link} to="/login"><button id={styles.loginButtonMobile} type="button">Zaloguj się</button></Link>
                     </form>
                </div>
                <div className={styles.registerPanel}>
                    <p className={styles.firstText}>Masz już konto?</p>
                    <p className={styles.secondText}>Zaloguj się i korzystaj z aplikacji!</p>
                    <Link className={styles.link} to="/login"><button id={styles.loginButton} type="button">Zaloguj się</button></Link>
                    <img id={styles.logo2} src={sideLogo} alt="Logo"/>
                </div>
            </div>
        </div>
    );
}

export default Register;