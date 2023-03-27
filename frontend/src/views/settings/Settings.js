import React from 'react';
import styles from '../../public/modules/settings.module.css';
import Header from '../../public/components/Header';
import Confirmation from '../../public/components/Confirmation';
function Settings(){

    const [open, setOpen] = React.useState(false);

    const handleOpen = () => setOpen(true);

    return(
        <div className={styles.container}>
            <header><Header/></header>
            <main className={styles.main}>
            <Confirmation open={open} onClose={()=> setOpen(false)}/>
                <form className={styles.change_form} action="">
                    <p className={styles.form_text}>Obecne hasło</p>
                    <input id={styles.current_password} type="password" placeholder="********"/>
                    <p className={styles.form_text}>Nowe hasło</p>
                    <input id={styles.new_password} type="password" placeholder="********"/>
                    <p className={styles.form_text}>Powtórz nowe hasło</p>
                    <input id={styles.repeat_password} type="password" placeholder="********"/>
                    <button id={styles.change_button} type="submit">Zapisz</button>
                </form>
                <button id={styles.delete_account_btn} type="button" onClick={handleOpen}>Usuń konto</button>
            </main>
        </div>
    );
}

export default Settings;