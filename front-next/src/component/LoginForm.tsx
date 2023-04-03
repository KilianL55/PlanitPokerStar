import {inspect} from "util";
import styles from '@/styles/component/LoginForm.module.scss'
import {useEffect, useRef, useState} from "react";
import { motion } from "framer-motion"
import styles2 from "@/styles/component/LoginForm.module.scss";

export default function LoginForm(props : { open: boolean }) {

    const loginFormRef = useRef()
    const [loginForm, setLoginForm] = useState(false);

    useEffect(() => {
        setLoginForm(props.open)
        window.addEventListener('mousedown', handleOutsideClick);
        return () => window.removeEventListener('mousedown', handleOutsideClick);
    }, [props.open]);

    function handleOutsideClick(event:any) {
        if (loginFormRef.current && !loginFormRef.current.contains(event.target)) {
            setLoginForm(false)
        }
    }
    console.log(loginForm)

    return (
        <>
            {loginForm &&
                <motion.div  ref={loginFormRef} className={styles.loginFormContainer}>
                    <h1>Login</h1>
                    <form className={styles.loginForm}>
                        <div className={styles.formGroup}>
                            <label htmlFor="email">Email/Username</label>
                            <input type="email" id="email" name="email" placeholder="Email"/>
                        </div>
                        <div className={styles.formGroup}>
                            <label htmlFor="password">Mot de passe</label>
                            <input type="password" id="password" name="password" placeholder="Mot de passe"/>
                        </div>
                        <div className={styles.formGroup}>
                            <button type="submit">Se connecter</button>
                        </div>
                    </form>
                </motion.div>
            }
        </>
    )
}