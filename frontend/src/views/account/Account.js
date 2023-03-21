import React from 'react';
import styles from '../modules/account.module.css';
import Header from '../main/components/Header';
import Button from '@mui/material/Button';
function Account(){

    return(
        <div className={styles.container}>
            <header><Header/></header>
            <main className={styles.main}>
                <form className={styles.account_form} action="" encType='multipart/form-data'>
                    <div className={styles.profile_picture}>
                            <div className={styles.picture} style={{backgroundImage:"url('../../public/upload/zdjecie.jpg')"}}></div>
                            <Button variant="contained" component="label">
                                Wybierz zdjęcie
                                <input hidden accept="image/*" type="file" />
                            </Button>
                    </div>
                    <div className={styles.account_data}>
                        <p className={styles.form_text}>Imię</p>
                        <input id={styles.name} type="text" placeholder="Imię"/>
                        <p className={styles.form_text}>Nazwisko</p>
                        <input id={styles.surname} type="text" placeholder="Nazwisko"/>
                        <p className={styles.form_text}>Data urodzenia</p>
                        <input id={styles.birthday} type="date"/>
                        <button id={styles.change_button} type="submit">Zapisz</button>
                    </div>
               </form>
            </main>
        </div>

    );

}

export default Account;