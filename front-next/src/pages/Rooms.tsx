import { useState, useEffect } from 'react';
import getRooms from "@/pages/api/room";

export default function Rooms() {
    const [data, setData] = useState<any>([]);

    useEffect(() => {
        getRooms().then((data) => setData(data));
    }, []);

    return (
        <div>
            <h1>Rooms</h1>
            {data.map((data:any)=>(
                <li key={data.id}>
                    {data.name}
                </li>
            ))}
        </div>
    );
}