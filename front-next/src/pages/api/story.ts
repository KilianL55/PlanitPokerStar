import {apiUrl} from "@/pages";

export type Story = {
    id?: number
    name: string
    description: string
    points?: string
    completed?: boolean
    idRoom: number
}

export default function getStories(idRoom: number){
    return new Promise<Story[]>((resolve)=>{
            fetch(apiUrl+'/stories/'+idRoom).then((response)=>{
                resolve(response.json().then((data)=>data))
            }
        )
    })
}

export async function createStory(story: Story, idRoom: number | undefined){
    try {

        const response = await fetch(apiUrl+'/story/'+idRoom, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(story)
        });

        if (!response.ok) {
            throw new Error('Failed to add story');
        }

        return await response.json();
    } catch (error) {
        console.error(error);
    }
}