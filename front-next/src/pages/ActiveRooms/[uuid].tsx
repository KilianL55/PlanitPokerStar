import {GetStaticPaths, GetStaticProps} from "next";
import getRooms, {enterRoom, leaveRoom} from "@/pages/api/room";
import React, {useEffect} from "react";
import Layout from "@/component/Layout";
import styles from '@/styles/pages/activeRoom.module.scss'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faUser} from "@fortawesome/free-solid-svg-icons";

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
            uuid: foundItem
        }
    }
}
export const getStaticPaths: GetStaticPaths = async () => {
    const data = await getRooms();
    const pathsWithParams = data.map((star: any) => ({ params: { uuid: star.uuid }}))

    return {
        paths: pathsWithParams,
        fallback: true
    }
}

export default function ActiveRoom(props: { uuid: string }) {
    const [users, setUsers] = React.useState([])

    console.log(users.length)

    useEffect(() => {
        setUsers(JSON.parse(props.uuid.connectedUsers))
    }, [props.uuid])

    return (
        <Layout>
            <div>
                <h1 className={styles.activeRoomTitle}>{props.uuid.name}</h1>
                <div className={styles.activeRoomUsers}>
                    <div className={styles.cardContainer}>

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