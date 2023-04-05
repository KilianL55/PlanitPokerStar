import { useState, useEffect } from 'react';
import getRooms, {createRoom, deleteRoom, Room} from "@/pages/api/room";
import Layout from "@/component/Layout";
import styles from '@/styles/pages/Rooms.module.scss';
import { motion } from "framer-motion"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPlus, faTrash} from "@fortawesome/free-solid-svg-icons";

export default function Rooms() {
    const [data, setData] = useState<any>([]);

    const [openForm, setOpenForm] = useState<boolean>(false);
    const [refresh, setRefresh] = useState<boolean>(false);

    const [name, setName] = useState<string>('');
    const [description, setDescription] = useState<string>('');
    const [point, setPoint] = useState<number>(0);
    const [owner, setOwner] = useState<number>(0);
    const [suite, setSuite] = useState<number>(0);

    const room : Room = {
        name: name,
        description: description,
        points: point,
        idOwner: owner,
        idSuite: suite
    }

    useEffect(() => {
        setRefresh(false)
        getRooms().then((data) => setData(data));
    }, [refresh]);

    return (
        <>
            <Layout>
                <h1 className={styles.titleRoom}>Vous avez <span>{data.length}</span> rooms actives.</h1>
                <div className={styles.roomsContainer}>
                        {data.map((data:Room)=>(
                            <>
                                <motion.div whileHover={{y : -10}} className={styles.room}>
                                    <h1>{data.name}</h1>
                                    <p>{data.description}</p>
                                    <p>{data.points}</p>
                                    <FontAwesomeIcon icon={faTrash} color={'red'} style={{cursor : 'pointer'}} onClick={() => {deleteRoom(data); setRefresh(true)}}/>
                                </motion.div>
                            </>
                        ))}

                    <motion.div whileHover={{rotate: 180}} className={styles.addRoom} onClick={() => setOpenForm(!openForm)}>
                        <FontAwesomeIcon icon={faPlus} className={styles.addRoomIcon}/>
                    </motion.div>
                </div>

                {openForm && <div className={styles.formContainer}>
                    <form style={{color : "white"}} onSubmit={(e) => e.preventDefault()}>
                        <h2>Créer une room</h2>
                        <label htmlFor="name">Nom</label>
                        <input type="text" name="name" placeholder={'nom'} onChange={(e) => setName(e.target.value)} />

                        <label htmlFor="description">Description</label>
                        <input type="text" name="description" placeholder='desc' onChange={(e) => setDescription(e.target.value)} />

                        <label htmlFor="point">Point</label>
                        <input type="number" name="point" placeholder='point' onChange={(e) => setPoint(parseInt(e.target.value))}/>

                        <label htmlFor="owner">Id owner</label>
                        <input type="number" name="owner" placeholder='Owner' onChange={(e) => setOwner(parseInt(e.target.value))}/>

                        <label htmlFor="suite">Id Suite</label>
                        <input type="number" name="suite" placeholder='Suite' onChange={(e) => setSuite(parseInt(e.target.value))}/>

                        <button type="submit" onClick={() => {createRoom(room); setOpenForm(false); setRefresh(true)}}>Valider</button>
                    </form>
                </div>}
            </Layout>
        </>
    );
}