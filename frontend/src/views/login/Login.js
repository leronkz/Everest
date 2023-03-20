import  logo  from '../../public/img/logo.png';
import  logo2 from '../../public/img/logo2.svg';
import styles from '../modules/login.module.css';
function Login() {
    return (
        <>
            {/* <div className="mx-auto mt-[5vh] max-w-md shadow-lg bg-color-dark rounded-lg h-[80vh]">
                <div className="bg-color-dark-light w-full px-8 flex justify-center text-color-light py-3 rounded-t-lg">
                    LOGIN
                </div>
                <p className="text-color-main flex justify-center pt-6">
                    Find your ideal project
                </p>
                <div className="px-8">
                    <form className="flex flex-col p-3 py-5 gap-3 justify-center">
                        <TextInput
                            labelProps={{ style: { color: '#b2bdbd' } }}
                            placeholder="Enter your login"
                            label="Login"
                            radius="sm"
                        />
                        <TextInput
                            labelProps={{ style: { color: '#b2bdbd' } }}
                            placeholder="Enter your password"
                            label="Password"
                            radius="sm"
                        />
                        <Button radius="sm" size="md" color="color-main.3"
                                type={"submit"}
                                mt={30}
                                mb={0}
                                >
                            Login
                        </Button>
                    </form>
                </div>
                <p className="text-color-light-gray flex justify-center pt-6">
                    Haven't signed up yet?
                </p>
            </div> */}
            <div className={styles.container}>
                <div className={styles.loginPanel}>
                    <img id={styles.logo} src={logo}/>
                    <p className={styles.mainText}>Zaloguj się na swoje konto</p>
                    <form className={styles.loginForm}>
                        <input id={styles.emailInput} placeholder="email" type="email"/>
                        <input id={styles.passwordInput} placeholder="haslo" type="password"/>
                        <button id={styles.loginButton}  type="submit">Zaloguj się</button>
                    </form>
                </div>
                <div className={styles.registerPanel}>
                    <p className={styles.firstText}>Nie masz jeszcze konta?</p>
                    <p className={styles.secondText}>Załóż już teraz i korzystaj z świetnych funkcjonalości aplikacji!</p>
                    <button id={styles.registerButton} type="button">Załóż konto</button>
                    <img id={styles.logo2} src={logo2}/>
                </div>
            </div>
        </>
    );
}

export default Login;