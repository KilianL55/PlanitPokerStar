import {GetStaticPaths, GetStaticProps} from "next";
import getRooms, {createRoom, enterRoom, leaveRoom, Room} from "@/pages/api/room";
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
import getStories, {createStory, Story} from "@/pages/api/story";

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
    const {isOpen, toggle} = useModal();
    const [users, setUsers] = React.useState([])
    const [suite, setSuite] = React.useState<Suite>({} as Suite)
    const { data: session } = useSession()
    const [name , setName] = useState<string>('')
    const [description , setDescription] = useState<string>('')
    const [id , setId] = useState<any>(props.room.id)
    const [refresh, setRefresh] = useState<boolean>(false);
    const [dataStories, setDataStories] = useState<any>([]);


    const story : Story = {
        name: name,
        description: description,
        idRoom: id
    }

    useEffect(() => {
        getStories(props.room.id).then((res) => { setDataStories(res) })
        console.log(dataStories)
        setUsers(JSON.parse(props.room.connectedUsers))
        const dataSuite = getOneSuite(props.room.suite).then((res) => { setSuite(res) })
        enterRoom(props.room.uuid, session?.user?.user.id, users)
    }, [props.room, refresh])

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
                <button onClick={() => toggle()}> Add story</button>
                <div className={styles.storiesContainer}>
                    <div className={styles.storiesContainerHeader}>
                        <p>Active Stories</p>
                        <p>Completed Stories</p>
                        <p>All Stories</p>
                    </div>
                    <div className={styles.storiesContainerBody}>
                        <table>
                            <tr>
                                <th>Story</th>
                                <th>Description</th>
                            </tr>
                            {dataStories.map((story: any, index: number) => {
                                    return (
                                        <>
                                            <tr>
                                                <td>{story.name}</td>
                                                <td>{story.description}</td>
                                            </tr>
                                        </>
                                    )
                                })}
                        </table>
                    </div>
                </div>
            </div>
            <Modal isOpen={isOpen} toggle={toggle} title={'Créer une room'}>
                <Input label={'Nom de la story'} type={'text'} inputData={setName} value={name} placeholder={'Nom'}/>
                <Input label={'Description de la story'} type={'text'} inputData={setDescription} value={description} placeholder={"Description"} />
                <Button event={() => {createStory(story, session?.user); toggle(); setRefresh(true)}}>Valider</Button>
            </Modal>

        </Layout>
    )
}