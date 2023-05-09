import { useState } from "react";

export default function useModal() {
    const [isOpen, setisOpen] = useState(false);
    const [isOpen2, setisOpen2] = useState(false);
    const [isOpen3, setisOpen3] = useState(false);

    const toggle = () => {
        setisOpen(!isOpen);
    };

    const toggle2 = () => {
        setisOpen2(!isOpen2);
    };

    const toggle3 = () => {
        setisOpen3(!isOpen3);
    };

    return {
        isOpen,
        toggle,
        isOpen2,
        toggle2,
        isOpen3,
        toggle3,
    };
}