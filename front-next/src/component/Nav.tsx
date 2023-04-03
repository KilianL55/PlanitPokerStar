import Head from "next/head";
import React from "react";
import styles from "@/styles/component/Nav.module.scss";

export default function Nav() {
    return (
        <>
            <nav className={styles.navContainer}>
                <div className={styles.logoPlacement}>
                    <i className="fas fa-crown"></i>
                    <h1>PlanIt PokerStar</h1>
                </div>
                <div className={styles.navLinks}>
                    <a href="#">Accueil</a>
                    <a href="#">Room</a>
                </div>
                <div className={styles.accounts}>
                    <a href="#"><i className={'fas fa-user'}></i></a>
                </div>
            </nav>
        </>
    )
}