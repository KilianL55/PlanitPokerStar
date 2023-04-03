import Head from "next/head";
import React from "react";
import styles from "@/styles/component/Nav.module.scss";
import Link from "next/link";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCrown, faUser} from "@fortawesome/free-solid-svg-icons";

export default function Nav() {
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
                    <Link href="#"><FontAwesomeIcon icon={faUser} className={styles.userIcon}/></Link>
                </div>
            </nav>
        </>
    )
}