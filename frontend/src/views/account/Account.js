import React, {useEffect} from 'react';
import styles from '../../public/modules/account.module.css';
import Header from '../../public/components/Header';
import Button from '@mui/material/Button';
import BasicPhoto from './basic_photo.svg';
import {useNavigate} from "react-router-dom";
function Account({photo}){
    const navigate = useNavigate();
    const [photo_url, setPhotoUrl] = React.useState(photo);
    const previewPhoto = (event) =>{
        const choseFile = event.target.files[0];
        if(choseFile){
            const reader = new FileReader();
            reader.addEventListener('load',function(){
                setPhotoUrl(reader.result);
            })
            reader.readAsDataURL(choseFile);
        }
    }
    if(photo_url === ''){
        setPhotoUrl(BasicPhoto);
    }

    useEffect(()=>{
        if(localStorage.getItem('token') === "" || localStorage.getItem('token') == null){
            navigate('/');
        }else{

        }
    },[]);

    const handleLogout = () => {
        localStorage.setItem('token',"");
        navigate("/login");
    }
    return(
        <div className={styles.container}>
            <header><Header logoutAction={handleLogout}/></header>
            <main className={styles.main}>
                <form className={styles.account_form} action="" encType='multipart/form-data'>
                    <div className={styles.profile_picture}>
                            <div className={styles.picture} style={{backgroundImage:`url(${photo_url})`}}></div>
                            <Button variant="contained" component="label">
                                Wybierz zdjęcie
                                <input hidden accept="image/*" type="file" onChange={previewPhoto}/>
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