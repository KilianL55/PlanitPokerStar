import {User} from "next-auth";
import {session} from "next-auth/core/routes";
import {useSession} from "next-auth/react";
import {useState} from "react";

export default function useConnected () {
    const { data: session } = useSession()
    const [user, setUser] = useState<boolean>(false)
    const connected = (user) => {
        return user
    };

    if (session?.user) {
        return connected(session.user)
    }

}