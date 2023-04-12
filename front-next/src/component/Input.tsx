import React, { useState } from 'react';

/*
* TypeInputProps
* placeholderInputProps
* minlengthInputProps
* requiredInputProps
* patternProps
* */
type PasswordInputProps = {
    label: string;
    value: string;
    onChange: (value: string) => void;
}

/*la fonction use state sert à stocker la valeur*/
const PasswordInput: React.FC<PasswordInputProps> = ({ label, value, onChange }) => {
    const [inputValue, setInputValue] = useState<string>(value);

    /*La fonction handleInputChange est appelée à chaque fois que la valeur du champ de saisie est modifiée par l'utilisateur*/
    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = event.target.value;
        setInputValue(newValue);
        onChange(newValue);
    }

    return (
        <div>
            <label>{label}</label>
            <input
                type="password" // props
                placeholder="Nouveau mot de passe" // props
                value={inputValue}
                onChange={handleInputChange}
                minLength={4} // props
                required // props
                // pattern props
            />
        </div>
    );
}



type  MinLengthInputProps = {
    value:string;
    label:string;
    Onchange: (value:string) => void;
}

const MinLengthInput: React.FC<MinLengthInputProps> = ({ label, value, onChange }) => {
    const [inputValue, setInputValue] = useState<string>("");

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(event.target.value);
    };

    const handleSubmit = (event: React.ChangeEvent<HTMLInputElement>) => {
        event.preventDefault();
        if (inputValue.length < props.minLength) {
            alert(`La valeur doit contenir au moins ${props.minLength} caractères.`);
        } else {
            alert(`La valeur "${inputValue}" a été soumise.`);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <label>
                {props.labelText}
                <input
                    type="text"
                    value={inputValue}
                    onChange={handleInputChange}
                    minLength={props.minLength}
                />
            </label>
            <button type="submit">Soumettre</button>
        </form>
    );
}
export default MinLengthInput;
export default PasswordInput;
