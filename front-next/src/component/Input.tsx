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

export default PasswordInput;