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
import Button from "@/component/Button";
import Modal from "@/component/Modal";
import {User} from "@/pages/api/user";
import useModal from "@/hook/useModal";

export const getStaticProps: GetStaticProps = async (context) => {
    const itemID = context.params?.uuid;
    const data = await getRooms();
    const foundItem = data.find((item: any) => itemID === item.uuid);

    // enterRoom(itemID)

    if (!foundItem) {
        return {
            props: { hasError: true },
        }
    }

    return {
        props: {
            room: foundItem
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
    const { data: session } = useSession()


    useEffect(() => {
        setUsers(JSON.parse(props.room.connectedUsers))
        const dataSuite = getOneSuite(props.room.suite).then((res) => { setSuite(res) })
        enterRoom(props.room.uuid, session?.user?.user.id, users)
    }, [props.room])

    let suiteValues = [];
    if (suite.suitevalues) {
        suiteValues = JSON.parse(suite.suitevalues);
    }

    if (!session?.user){
        return (
            <Layout>
                <h1>Vous n'êtes pas connecté veuillez vous connecter</h1>
            </Layout>
        )
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
                            console.log(user)
                        })}
                        <div className={styles.inviteMate}>
                            <p>Inviter un participant</p>
                            <input disabled={true} type="text" value={'http://127.0.0.1:3000/ActiveRooms/'+props.room.uuid} />
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    )
}