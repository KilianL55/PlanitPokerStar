import {useEffect} from "react";
import { cookies } from 'next/headers';

export default function Dashboard() {
    const storage = new AsyncLocalStorage();

    useEffect(() => {
        const cookieStore = cookies();
        const token = cookieStore.get('token');
        console.log(token)
    }   , []);
}