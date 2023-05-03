import {GetStaticPaths, GetStaticProps} from "next";
import getRooms, {enterRoom, leaveRoom, Room} from "@/pages/api/room";
import React, {useEffect, useState} from "react";
import Layout from "@/component/Layout";
import styles from '@/styles/pages/activeRoom.module.scss'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faUser} from "@fortawesome/free-solid-svg-icons";
import { motion } from "framer-motion"
import {getOneSuite, Suite} from "@/pages/api/suite";
import Input from "@/component/Input";
import {signIn, useSession} from "next-auth/react";
import Modal from "@/component/Modal";
import Button from "@/component/Button";
import useModal from "@/hook/useModal";
import {addUser, User} from "@/pages/api/user";

export const getStaticProps: GetStaticProps = async (context) => {
    const itemID = context.params?.uuid;
    const data = await getRooms();
    const foundItem = data.find((item: any) => itemID === item.uuid);

    // enterRoom(itemID)

    if (foundItem === undefined || foundItem === null || !foundItem) {
        return {
            notFound: true,
        }
    } else {
        return {
            props: {
                room: foundItem
            }
        }
    }
}
export const getStaticPaths: GetStaticPaths = async () => {
    const data = await getRooms();
    const pathsWithParams = data.map((item: any) => ({ params: { uuid: item.uuid }}))

    return {
        paths: pathsWithParams,
        fallback: true
    }
}


export default function ActiveRoom(props: { room: Room }) {
    const [users, setUsers] = React.useState([])
    const [suite, setSuite] = React.useState<Suite>({} as Suite)
    const {isOpen, toggle} = useModal();
    const {isOpen2, toggle2} = useModal();
    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [completeName, setCompleteName] = useState<string>('');
    const { data: session, status } = useSession()

    const user : User = {
        username: username,
        password: password,
        email: email,
        completeName: completeName
    }

    if (props.room === undefined || props.room === null || !props.room) {
        return
    }

    useEffect(() => {
        setUsers(JSON.parse(props.room.connectedUsers))
        const dataSuite = getOneSuite(props.room.suite).then((res) => { setSuite(res) })
        console.log(session?.user)
        if (status === 'unauthenticated') {
            toggle()
        } else if (status === 'authenticated') {
            enterRoom(props.room.uuid, session?.user.user.id)
        }
    }, [props.room, status, props.room.connectedUsers])

    let suiteValues = [];
    if (suite.suitevalues) {
        suiteValues = JSON.parse(suite.suitevalues);
    }

    if (session?.user) {
      enterRoom(props.room.uuid, session?.user.id)
    } else if (!isOpen && !isOpen2 && !session?.user) {
    }

    return (
        <Layout>
            <div>
                <h1 className={styles.activeRoomTitle}>{props.room.name}</h1>
                <div className={styles.activeRoomUsers}>
                    <div className={styles.cardContainer}>
                        {suiteValues && suiteValues.map((value: any, index: number) => {
                            return (
                                <motion.div
                                    whileHover={{ scale: 1.05, transition: { duration: 0.2 }, translateY: -5 }}
                                    className={styles.card}>
                                    <div className={styles.topValue}>{value}</div>
                                    <h1>{value}</h1>
                                    <div className={styles.bottomValue}>{value}</div>
                                </motion.div>
                            )
                        })}
                    </div>

                    <div className={styles.usersContainer}>
                        <p>Connecté(e)s ({users.length})</p>
                        {users.map((user: any, index: number) => {
                           return (
                               <div key={index} className={styles.connectedUsers}>
                                   <FontAwesomeIcon icon={faUser} />
                                   <p>{user.username}</p>
                               </div>
                           )
                        })}
                        <div className={styles.inviteMate}>
                            <p>Inviter un participant</p>
                            <input disabled={true} type="text" value={'http://127.0.0.1:3000/ActiveRooms/'+props.room.uuid} />
                        </div>
                    </div>
                </div>
            </div>
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
        </Layout>
    )
}