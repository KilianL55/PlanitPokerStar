
export type Room ={
    id?: number
    name: string
    description: string
    points: number
    idOwner: number
    idSuite: number
}

export default function getRooms(){
    return new Promise<Room>((resolve)=>{
        fetch('http://127.0.0.1:8090/api/room').then((response)=>{
            resolve(response.json().then((data)=>data))
        })
    })
}

export async function createRoom(room: Room){
    console.log(room)
    try {
        const response = await fetch('http://127.0.0.1:8090/api/room', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(room)
        });

        if (!response.ok) {
            throw new Error('Failed to add room');
        }

        return await response.json();
    } catch (error) {
        console.error(error);
    }
}

export async function deleteRoom(room: Room){
    try {const response = await fetch('http://127.0.0.1:8090/api/room/'+room.id, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(room)
        });

        if (!response.ok) {
            throw new Error('Failed to delete room');
        }

        return await response.json();
    } catch (error) {
        console.error(error);
    }
}