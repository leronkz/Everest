import  logo  from '../../public/img/logo.png';
import  logo2 from '../../public/img/logo2.svg';
import styles from '../../public/modules/login.module.css';
import { Link }from "react-router-dom";
function Login() {
    return (
        <>
            <div className={styles.main}>
                <div className={styles.container}>
                    <div className={styles.loginPanel}>
                        <img id={styles.logo} src={logo}/>
                        <p className={styles.mainText}>Zaloguj się na swoje konto</p>
                        <form className={styles.loginForm}>
                            <input id={styles.emailInput} placeholder="email" type="email" name="email"/>
                            <input id={styles.passwordInput} placeholder="haslo" type="password" name="password"/>
                            <button id={styles.loginButton}  type="submit">Zaloguj się</button>
                        </form>
                    </div>
                    <div className={styles.registerPanel}>
                        <p className={styles.firstText}>Nie masz jeszcze konta?</p>
                        <p className={styles.secondText}>Załóż już teraz i korzystaj z świetnych funkcjonalości aplikacji!</p>
                        <Link className={styles.link} to="/register"><button id={styles.registerButton} type="button">Załóż konto</button></Link>
                        <img id={styles.logo2} src={logo2}/>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Login;