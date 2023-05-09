import {apiUrl} from "@/pages";
import {User} from "@/pages/api/user";

export type Story = {
    id?: number
    name: string
    description: string
    points?: string
    completed?: boolean
    idRoom: number
}

export default function getStories(idRoom: number | undefined){
    return new Promise<Story>((resolve)=>{
            fetch(apiUrl+'/rooms/'+idRoom+'?include=storys').then((response)=>{
                resolve(response.json().then((data)=>data["storys"]))
            }
        )
    })
}

export async function createStory(story: Story, user: User){
    try {

        const response = await fetch(apiUrl+'/story/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer '+user.access_token
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

export async function deleteStory(story: Story){
    try {const response = await fetch(apiUrl+'/story/'+story.id, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(story)
        });

        if (!response.ok) {
            throw new Error('Failed to delete story');
        }

        return await response.json();
    } catch (error) {
        console.error(error);
    }
}