import Head from "next/head";
import React, {useState} from "react";
import styles from "@/styles/component/Nav.module.scss";
import styles2 from "@/styles/component/LoginForm.module.scss";
import LoginForm from "@/component/LoginForm";
import {session} from "next-auth/core/routes";
import {signIn, signOut, useSession} from "next-auth/react";
import Link from "next/link";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCrown, faUser} from "@fortawesome/free-solid-svg-icons";
import Modal from "@/component/Modal";
import Input from "@/component/Input";
import Button from "@/component/Button";
import useModal from "@/hook/useModal";
import useConnected from "@/hook/useConnected";
import {faRightFromBracket} from "@fortawesome/free-solid-svg-icons/faRightFromBracket";
import {addUser, User} from "@/pages/api/user";
import {resolveHref} from "next/dist/shared/lib/router/utils/resolve-href";
import {NextResponse} from "next/server";
import {createHrefFromUrl} from "next/dist/client/components/router-reducer/create-href-from-url";
import Dropdown from "@/component/Dropdown/dropdown";

export default function Nav() {
    const [loginForm, setLoginForm] = useState<boolean>(false);
    const { data: session } = useSession()
    // const connected = useConnected()
    const {isOpen, toggle} = useModal();
    const {isOpen2, toggle2} = useModal();
    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [completeName, setCompleteName] = useState<string>('');

    const user : User = {
        username: username,
        password: password,
        email: email,
        completeName: completeName
    }

    return (
        <>
            <nav className={styles.navContainer}>
                <div className={styles.logoPlacement}>
                    <FontAwesomeIcon icon={faCrown} className={styles.crown} />
                    <h1>PlanIt PokerStar</h1>
                </div>
                <div className={styles.navLinks}>
                    <Link href="/">Accueil</Link>
                    {session?.user ? <Link href="/Rooms">Room</Link> : <a onClick={() => toggle()}>Room</a>}
                </div>
                <div className={styles.accounts}>
                    {!session?.user ? <a onClick={()=> {
                            toggle()
                        }} href="#"><FontAwesomeIcon icon={faUser}/>{session?.user?.user.username}</a> :
                        <a onClick={() => signOut()}><FontAwesomeIcon icon={faRightFromBracket}/>{session?.user?.user.username}</a>}
                </div>
            </nav>
            <Modal isOpen={isOpen} toggle={toggle} title={'Connexion'}>
                <Input type={'text'} placeholder={'Nom d\'utilisateur'} inputData={setUsername} value={username} label={'Nom d\'utilisateur'}/>
                <Input type={'password'} placeholder={'Mot de passe'} inputData={setPassword} value={password} label={'Mot de passe'}/>
                <Button event={() => {
                    toggle()
                    signIn("credentials",{"username" : username, "password" : password})
                }}>Se connecter</Button>
                <p>Vous n'avez pas encore de compte ? <a onClick={() => {toggle(); toggle2()}}>Créer cotre compte</a></p>
            </Modal>
            <Modal isOpen={isOpen2} toggle={toggle2} title={'Création de compte'}>
                <Input type={'text'} placeholder={'Nom d\'utilisateur'} inputData={setUsername} value={username} label={'Nom d\'utilisateur'}/>
                <Input type={'email'} placeholder={'Addresse Email'} inputData={setEmail} value={email} label={'Email'}/>
                <Input type={'text'} placeholder={'Nom complet (Ex : Jhon Smith)'} inputData={setCompleteName} value={completeName} label={'Nom complet'}/>
                <Input type={'password'} placeholder={'Mot de passe'} inputData={setPassword} value={password} label={'Mot de passe'}/>
                <Button event={() => {
                    toggle2()
                    addUser(user)
                }}>Créer mon compte</Button>
                <p>Vous avez déjà un compte ? <a onClick={() => {toggle2(); toggle()}}>Connecté vous</a></p>
            </Modal>
        </>
    )
}