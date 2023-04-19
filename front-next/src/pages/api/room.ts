import {apiUrl} from "@/pages";
import {connectUser, User} from "@/pages/api/user";

export type Room ={
    id?: number
    name: string
    description: string
    points: string
    uuid: string
    connectedUsers: any
    idOwner: string
    suite: string
}

export default function getRooms(){
    return new Promise<Room>((resolve)=>{
        fetch(apiUrl+'/room').then((response)=>{
            resolve(response.json().then((data)=>data))
        })
    })
}

export async function createRoom(room: Room, user: User){
    try {

        const response = await fetch(apiUrl+'/room', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer '+user.access_token
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
        const response = await fetch(apiUrl+`/rooms/${uuid}/users/3`, {
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