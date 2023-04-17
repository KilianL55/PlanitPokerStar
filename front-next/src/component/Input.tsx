import React, { useState } from 'react';
import styles from '@/styles/component/Input.module.scss';


export default function Input(props : {label: string, type: string, placeholder?: string, pattern? : string, bottomColor?: string, iconPosition?: string, icon?: string, value?: string, status?: boolean, inputData: (e: string) => void}) {

    const handleInput = (e: string) => {
        props.inputData(e)
    }

    return (
        <div className={styles.input}
             data-icon-position={props.iconPosition}
        >
            <label>{props.label}</label>
            <i className={props.icon}></i>
            <input style={{borderBottom : `3px solid ${props.bottomColor ?? "#E3BC3E"}`}} required value={props.value} type={props.type} placeholder={props.placeholder}
                   data-icon-position={props.iconPosition} pattern={props.pattern} onChange={(e) => handleInput(e.target.value)}/>
        </div>
    );
}