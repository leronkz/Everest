import  logo  from '../../public/img/logo.png';
import  logo2 from '../../public/img/logo2.svg';
import styles from '../../public/modules/register.module.css';
import {Link} from "react-router-dom";
import React from 'react';
import axios from 'axios';

function Register(){

    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [repeatPassword, setRepeatPassword] = React.useState('');

    const handleEmailChange = (event) =>{
        setEmail(event.target.value);
        console.log(email);
    }
    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
        console.log(password);
    }
    const handleRepeatPasswordChange = (event) => {
        setRepeatPassword(event.target.value);
        console.log(repeatPassword);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const data= {
            email: email,
            password: password
        };

        axios.post('http://127.0.0.1:8000/api/create',data, {
            headers: {
                'Content-type': 'application/json'
            }
        })
            .then(response => {
                console.log(response.data.message);
            })
            .catch(error=>{
                console.log(error);
            })
    }

    return(
        <div className={styles.main}>
            <div className={styles.container}>
                <div className={styles.loginPanel}>
                    <img id={styles.logo} src={logo}/>
                    <p className={styles.mainText}>Założ konto już teraz</p>
                    <form className={styles.loginForm} onSubmit={handleSubmit}>
                        <input id={styles.emailInput} placeholder="email" type="email" name="email" onChange={handleEmailChange} required/>
                        <input id={styles.passwordInput} placeholder="haslo" type="password" name="password" onChange={handlePasswordChange} required/>
                        <input id={styles.repeatPasswordInput} placeholder="powtorz haslo" type="password" name="repeat_password" onChange={handleRepeatPasswordChange} required/>
                        <button id={styles.registerButton} type="submit">Załóż konto</button>
                     </form>
                </div>
                <div className={styles.registerPanel}>
                    <p className={styles.firstText}>Masz już konto?</p>
                    <p className={styles.secondText}>Zaloguj się i korzystaj z aplikacji!</p>
                    <Link className={styles.link} to="/login"><button id={styles.loginButton} type="button">Zaloguj się</button></Link>
                    <img id={styles.logo2} src={logo2}/>
                </div>
            </div>
        </div>
    );
}

export default Register;