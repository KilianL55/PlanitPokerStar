// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export type User = {
    id?: number
    username: string
    email: string
    password: string
    completeName: string
}

export default function getUsers() {
    return new Promise<User>((resolve) => {
        fetch('http://127.0.0.1:8090/api/user').then((res) => {
            resolve(res.json().then((data) => data))
        })
    })
}

export async function addUser(user: User) {
    try {
        const response = await fetch('http://127.0.0.1:8090/api/user', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        });

        if (!response.ok) {
            throw new Error('Failed to add user');
        }

        return await response.json();
    } catch (error) {
        console.error(error);
    }
}

export async function deleteUser(id?: number) {
    try {
        const response = await fetch(`http://127.0.0.1:8090/api/user/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
        });

        if (!response.ok) {
            throw new Error('Failed to delete user');
        }

        return await response.json();
    } catch (error) {
        console.error(error);
    }
}

export async function connectUser(user: User) {
    try {
        const response = await fetch('http://127.0.0.1:8090/api/user/connect', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        });
    } catch (error) {
        console.error(error);
    }
}




