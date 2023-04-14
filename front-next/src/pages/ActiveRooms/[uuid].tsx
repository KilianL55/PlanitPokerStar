import {GetStaticPaths, GetStaticProps} from "next";
import getRooms, {enterRoom, leaveRoom, Room} from "@/pages/api/room";
import React, {useEffect} from "react";
import Layout from "@/component/Layout";
import styles from '@/styles/pages/activeRoom.module.scss'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faUser} from "@fortawesome/free-solid-svg-icons";
import { motion } from "framer-motion"
import {getOneSuite, Suite} from "@/pages/api/suite";

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

    useEffect(() => {
        setUsers(JSON.parse(props.room.connectedUsers))
        const dataSuite = getOneSuite(props.room.suite).then((res) => { return res })
        dataSuite.then((res) => {
            setSuite(res)
        })
    }, [props.room])

    console.log(suite && suite.suitevalues)
    


    return (
        <Layout>
            <div>
                <h1 className={styles.activeRoomTitle}>{props.room.name}</h1>
                <div className={styles.activeRoomUsers}>
                    <div className={styles.cardContainer}>
                        {/*{suite && suite.suitevalues.forEach((value: any, index: number) => {*/}
                        {/*    return (*/}
                        {/*        <motion.div*/}
                        {/*            whileHover={{ scale: 1.1, transition: { duration: 0.2 }, rotateY: 360, translateY: -10 }}*/}
                        {/*            className={styles.card}>*/}
                        {/*            <h1>{value.value}</h1>*/}
                        {/*        </motion.div>*/}
                        {/*    )*/}
                        {/*})}*/}

                        <motion.div
                            whileHover={{ scale: 1.1, transition: { duration: 0.2 }, rotateY: 360, translateY: -10 }}
                            className={styles.card}>
                            <h1>5</h1>
                        </motion.div>

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
                    </div>
                </div>
            </div>
        </Layout>
    )
}