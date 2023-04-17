import { useState } from "react";

export default function useModal() {
    const [isOpen, setisOpen] = useState(false);
    const [isOpen2, setisOpen2] = useState(false);

    const toggle = () => {
        setisOpen(!isOpen);
    };

    const toggle2 = () => {
        setisOpen2(!isOpen2);
    };

    return {
        isOpen,
        toggle,
        isOpen2,
        toggle2,
    };
}