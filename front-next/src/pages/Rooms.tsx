import { useState, useEffect } from 'react';
import getRooms, {createRoom, deleteRoom, Room} from "@/pages/api/room";
import Layout from "@/component/Layout";
import styles from '@/styles/pages/Rooms.module.scss';
import { motion } from "framer-motion"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPlus, faTrash} from "@fortawesome/free-solid-svg-icons";
import Input from "@/component/Input";
import {session} from "next-auth/core/routes";
import {useSession} from "next-auth/react";
import Modal from "@/component/Modal";
import Button from "@/component/Button";
import useModal from "@/hook/useModal";
import getStories from "@/pages/api/story";

export default function Rooms() {
    const { data: session } = useSession()

    const [data, setData] = useState<any>([]);

    const {isOpen, toggle} = useModal();
    const [refresh, setRefresh] = useState<boolean>(false);

    const [name, setName] = useState<string>('');
    const [description, setDescription] = useState<string>('');
    const [point, setPoint] = useState<string>(0);
    const [owner, setOwner] = useState<string>(0);
    const [suite, setSuite] = useState<string>(0);

    const [nbRoom, setNbRoom] = useState<number>(0);

    const room : Room = {
        name: name,
        description: description,
        points: point,
        idOwner: session?.user?.user.id,
        suite: suite
    }


    useEffect(() => {
        setRefresh(false)
        getRooms().then((data) => setData(data));

    }, [refresh]);

    return (
        <>
            <Layout>

                <div className={styles.roomsContainer}>
                        {data.map((data:Room)=>(
                            data.user === session?.user?.user.id &&
                            <>
                                <motion.a whileHover={{y : -10}} className={styles.room} href={'/ActiveRooms/'+data.uuid} onClick={() => {}}>
                                    <h1>{data.name}</h1>
                                    <p>{data.description.length > 150 ? data.description.slice(0,150) +" ..." : data.description}</p>
                                    <p>{data.points}</p>
                                    <FontAwesomeIcon icon={faTrash} color={'red'} style={{cursor : 'pointer'}} onClick={() => {deleteRoom(data); setRefresh(true)}}/>
                                </motion.a>
                            </>
                        ))}

                    <motion.div whileHover={{rotate: 180}} className={styles.addRoom} onClick={() => toggle()}>
                        <FontAwesomeIcon icon={faPlus} className={styles.addRoomIcon}/>
                    </motion.div>
                </div>

                <Modal isOpen={isOpen} toggle={toggle} title={'Créer une room'}>
                    <Input label={'Nom de la room'} type={'text'} inputData={setName} value={name} placeholder={'Nom'}/>
                    <Input label={'Description de la room'} type={'text'} inputData={setDescription} value={description} placeholder={'Description'}/>
                    <Input label={'Point de la room'} type={'text'} inputData={setPoint} value={point} placeholder={'Nombre de point'}/>
                    <Input label={'Suite de la room'} type={'text'} inputData={setSuite} value={suite} placeholder={'id de la Suite'}/>
                    <Button event={() => {createRoom(room, session?.user); toggle(); setRefresh(true)}}>Valider</Button>
                </Modal>
            </Layout>
        </>
    );
}