import Head from "next/head";
import React, {useState} from "react";
import styles from "@/styles/component/Nav.module.scss";
import styles2 from "@/styles/component/LoginForm.module.scss";
import LoginForm from "@/component/LoginForm";
import {session} from "next-auth/core/routes";
import {useSession} from "next-auth/react";
import Link from "next/link";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCrown, faUser} from "@fortawesome/free-solid-svg-icons";

export default function Nav() {
    const [loginForm, setLoginForm] = useState<boolean>(false);
    const { data: session } = useSession()

    return (
        <>
            <nav className={styles.navContainer}>
                <div className={styles.logoPlacement}>
                    <FontAwesomeIcon icon={faCrown} className={styles.crown} />
                    <h1>PlanIt PokerStar</h1>
                </div>
                <div className={styles.navLinks}>
                    <Link href="/">Accueil</Link>
                    <Link href="Rooms">Room</Link>
                </div>
                <div className={styles.accounts}>
                    <a onClick={()=> {
                        const nav = document.querySelector('nav');

                        if (nav != null) {
                            nav.style.borderBottomRightRadius = '0';
                            nav.style.borderRight = 'solid 1px #e3bc3e';
                            setLoginForm(!loginForm)
                        }
                    }} href="#"><FontAwesomeIcon icon={faUser}/>{session?.user?.username}</a>
                </div>
            </nav>
            <LoginForm open={loginForm}/>
        </>
    )
}