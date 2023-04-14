import {apiUrl} from "@/pages";

export type Room ={
    id?: number
    name: string
    description: string
    points: number
    uuid: string
    connectedUsers: any
    idOwner: number
    idSuite: number
}

export default function getRooms(){
    return new Promise<Room>((resolve)=>{
        fetch(apiUrl+'/room').then((response)=>{
            resolve(response.json().then((data)=>data))
        })
    })
}

export async function connect(username: string, password: string){
    try {
        const response = await fetch(apiUrl+'/connect', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({username, password})
        });

        if (!response.ok) {
            throw new Error('Failed to connect');
        }

        return await response.json();
    } catch (error) {
        console.error(error);
    }
}

export async function createRoom(room: Room){
    console.log(room)
    try {

        connect('qperrier', '0000').then((data)=>console.log(data))

        const response = await fetch(apiUrl+'/room', {
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
    try {const response = await fetch(apiUrl+'/room/'+room.id, {
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

export async function enterRoom(uuid : string){
    try {
        const response = await fetch(apiUrl+`/rooms/${uuid}/users/5`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: ''
        });

        if (!response.ok) {
            throw new Error('Failed to enter active rooms');
        }

        return await response.json();
    } catch (error) {
        console.error(error);
    }
}

export async function leaveRoom(uuid : string){
    try {
        const response = await fetch(apiUrl+`/rooms/${uuid}/users/1`, {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
        });

        if (!response.ok) {
            throw new Error('Failed to leave active rooms');
        }

        return await response.json();
    } catch (error) {
        console.error(error);
    }
}