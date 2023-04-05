import  mainLogo  from '../../public/img/logo.png';
import  sideLogo from '../../public/img/logo2.svg';
import styles from '../../public/modules/login.module.css';
import { Link, useNavigate }from "react-router-dom";
import React, {useEffect} from 'react';
import axios from 'axios';
import CircularProgress from '@mui/material/CircularProgress';
import {Box} from "@mui/system";
function Login() {
    const navigate = useNavigate();
    const [email, setEmail] = React.useState("");
    const [password,setPassword] = React.useState("");
    const [validationErrors, setValidationErrors] = React.useState({});
    const [isSubmitting, setIsSubmitting] = React.useState(false);
    const [spinner, setSpinner] = React.useState(false);
    const handleEmailChange = (event) =>{
        setEmail(event.target.value);
        console.log(email);
    }
    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
        console.log(password);
    }

    useEffect(()=>{
        if(localStorage.getItem('token') !== "" && localStorage.getItem('token') != null){
            navigate('/main');
        }
        // console.log(localStorage.getItem('token'))
    },[])

    const handleSubmit = (e) => {
        setSpinner(true);
        setValidationErrors({});
        e.preventDefault();
        setIsSubmitting(true);
        const data = {
            email:email,
            password:password
        };
        axios.post('http://127.0.0.1:8000/api/login_check',data, {
            headers: {
                'Content-type': 'application/json'
            }
        })
            .then(response => {
                setSpinner(false);
                setIsSubmitting(false);
                // console.log(response.data.token);
                localStorage.setItem('token', response.data.token);
                navigate("/main");
            })
            .catch(error =>{
                setSpinner(false);
                setIsSubmitting(false);
                if(error.response.data !== undefined){
                    // console.log(error.response.data);
                    setValidationErrors(error.response.data);
                }
            });
    }

    return (
        <>
            <div className={styles.main}>
                <div className={styles.container}>
                    <div className={styles.loginPanel}>
                        <img id={styles.logo} src={mainLogo} alt="Logo"/>
                        <p className={styles.mainText}>Zaloguj się na swoje konto</p>
                        <form className={styles.loginForm} onSubmit={handleSubmit}>
                            {Object.keys(validationErrors).length !==0 &&
                                <p className={styles.errorText}>Niepoprawny adres email lub hasło</p>
                            }
                            <input id={styles.emailInput} placeholder="email" type="email" name="email" required onChange={handleEmailChange}/>
                            <input id={styles.passwordInput} placeholder="haslo" type="password" name="password" required onChange={handlePasswordChange}/>
                            {spinner && (<Box sx={{mt:"2ch", display:"flex", justifyContent:"center"}}><CircularProgress/></Box>)}
                            <button id={styles.loginButton}  type="submit" disabled={isSubmitting}>Zaloguj się</button>
                        </form>
                    </div>
                    <div className={styles.registerPanel}>
                        <p className={styles.firstText}>Nie masz jeszcze konta?</p>
                        <p className={styles.secondText}>Załóż już teraz i korzystaj z świetnych funkcjonalości aplikacji!</p>
                        <Link className={styles.link} to="/register"><button id={styles.registerButton} type="button">Załóż konto</button></Link>
                        <img id={styles.logo2} src={sideLogo} alt="Logo"/>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Login;