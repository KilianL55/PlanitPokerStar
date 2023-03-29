
type Room ={
    id: number
    name: string
    description: string
    points: number
}

export default function getRooms(){
    return new Promise<Room>((resolve)=>{
        fetch('http://127.0.0.1:8090/api/room').then((response)=>{
            resolve(response.json().then((data)=>data))
        })
    })
}