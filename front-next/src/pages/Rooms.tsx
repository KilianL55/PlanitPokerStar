import { useState, useEffect } from 'react';
import getRooms, {createRoom, Room} from "@/pages/api/room";

export default function Rooms() {
    const [data, setData] = useState<any>([]);

    const [name, setName] = useState<string>('');
    const [description, setDescription] = useState<string>('');
    const [point, setPoint] = useState<number>(0);
    const [owner, setOwner] = useState<number>(0);
    const [suite, setSuite] = useState<number>(0);

    let room : Room = {
        name: name,
        description: description,
        points: point,
        idOwner: owner,
        idSuite: suite
    }
    //
    // useEffect(() => {
    //     getRooms().then((data) => setData(data));
    // }, []);

    return (
        <>
            {/*<h1>Rooms</h1>*/}
            {/*{data.map((data:any)=>(*/}
            {/*    <li key={data.id}>*/}
            {/*        {data.name}*/}
            {/*    </li>*/}
            {/*))}*/}

            <form style={{color : "white"}} onSubmit={(e) => e.preventDefault()}>
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

                <button type="submit" onClick={() => createRoom(room)}>Valider</button>
            </form>
        </>
    );
}