import  logo  from '../../public/img/logo.png';
import  logo2 from '../../public/img/logo2.svg';
import styles from '../modules/register.module.css';

function Register(){
    return(
        <div className={styles.container}>
            <div className={styles.loginPanel}>
                <img id={styles.logo} src={logo}/>
                <p className={styles.mainText}>Założ konto już teraz</p>
                <form className={styles.loginForm}>
                    <input id={styles.emailInput} placeholder="email" type="email"/>
                    <input id={styles.passwordInput} placeholder="haslo" type="password"/>
                    <input id={styles.repeatPasswordInput} placeholder="powtorz haslo" type="password"/>
                    <button id={styles.registerButton} type="submit">Załóż konto</button>
                 </form>
            </div>
            <div className={styles.registerPanel}>
                <p className={styles.firstText}>Masz już konto?</p>
                <p className={styles.secondText}>Zaloguj się i korzystaj z aplikacji!</p>
                <button id={styles.loginButton} type="button">Zaloguj się</button>
                <img id={styles.logo2} src={logo2}/>
            </div>
    </div>

    );
}

export default Register;