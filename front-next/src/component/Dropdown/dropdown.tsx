import React, {useEffect, useState} from "react";
import styles from "../../styles/component/dropdown.module.scss"

export default function Dropdown(props : {placeholder : string, value? : any, isMulti: boolean, options: any, label?: string, outline? : boolean, disabled? : boolean, icon? : string, iconPosition? : string, onSelectOption? : any, onShow? : any, onHide? : any, onDelete? : any, onRemoveOption? : any}) {

    const [showMenu, setShowMenu] = useState(false)
    const [selectedValue, setSelectedValue] = useState(props.isMulti ? [] : null)

    function renderImageOrIcon (option : []) {
        if (option["image"]) {
            return <img src={option.image}></img>
        } else if (option.icon) {
            return <i className={option.icon}></i>
        }
    }

    const getDisplay = () => {
        if (props.isMulti) {
            if (selectedValue.length === 0) {
                return props.placeholder
            } else {
                return (
                    <div className={styles.dropdownTags}>
                        {selectedValue.map((option) => (
                            <div key={option.value} className={styles.dropdownTagItem}>
                                {renderImageOrIcon(option)}
                                {option.text}
                                <span onClick={(e) => onTagRemove(e, option)} className={styles.dropdownTagClose}><i className={"fas fa-times"}/><input type={"hidden"} name={option.value} value={option.text}/></span>
                            </div>
                        ))}
                    </div>
                );
            }
        }

        if (selectedValue) {
            return (
                <div className={styles.dropdownSingleValue}>
                    {renderImageOrIcon(selectedValue)}{selectedValue.text}
                    <input type={"hidden"} value={selectedValue.text}/>
                </div>
            );
        } else if (props.value) {
            return (
                <div className={styles.dropdownSingleValue}>
                    {renderImageOrIcon(props.value)} {props.value.text}
                </div>
            );
        } else {
            return props.placeholder
        }
    }

    const removeOption = (option : []) => {
        return selectedValue.filter((o) => o.value !== option.value);
    };
    const onTagRemove = (e : any, option : []) => {
        e.stopPropagation();
        setSelectedValue(removeOption(option));
        if (props.onRemoveOption) {
            props.onRemoveOption();
        }
    };

    const resetValue = () => {
        setSelectedValue(null)

        if (props.onDelete !== undefined) {
            props.onDelete()
        }
    }

    useEffect(() => {
        const handler = () => setShowMenu(false)

        window.addEventListener('click', handler)
        return () => {
            window.removeEventListener('click', handler)
        };
    });

    const handleInputClick = (e:any) => {
        e.stopPropagation();
        setShowMenu(!showMenu);

        if (showMenu) {
            if (props.onHide !== undefined) {
                props.onHide();
            }
        } else {
            if (props.onShow !== undefined) {
                props.onShow();
            }
        }
    };

    const onItemClick = (option: []) => {

        if (props.onSelectOption !== undefined) {
            props.onSelectOption();
        }

        let newValue;
        if (props.isMulti) {
            if (selectedValue.findIndex((o) => o.value === option.value) >= 0) {
                newValue = removeOption(option);
            } else {
                newValue = [...selectedValue, option];
            }
        } else {
            newValue = option;
        }
        setSelectedValue(newValue);
    }

    const isSelected = (option: []) => {
        if (props.isMulti) {
            return selectedValue.filter((o) => o.value === option.value).length > 0;
        }
        if (!selectedValue) {
            return false
        }

        return selectedValue.value === option.value
    }

    return (
        <div className={styles.dropdown}>
            <label className={styles.dropdownLabel}>{props.label}</label>
            <div className={styles.dropdownContainer} data-outline={props.outline} data-disabled={props.disabled} data-icon-position={props.iconPosition}>
                <div className={styles.dropdownInput} onClick={handleInputClick}>
                    <div className={styles.dropdownIconPlacement} data-icon-position={props.iconPosition} data-multi-dropdown={props.isMulti}>
                        <i className={props.icon}></i>
                    </div>
                    {props.disabled ? ""

                        : showMenu && (
                        <div className={styles.dropdownMenu} data-icon-position={props.iconPosition}>
                            {props.options.map((option: []) => {
                                return <div key={option.value}
                                            onClick={() => onItemClick(option)}
                                            className={styles.dropdownItem}>{option.image &&
                                    <img src={option.image}></img>}
                                    {option.icon && <i className={option.icon}></i>}
                                    {option.text}
                                </div>
                            })}
                        </div>
                    )}
                    <div className={styles.dropdownSelectedValue}>{getDisplay()}</div>
                    <div className={styles.dropdownTools}>
                        <div className={styles.dropdownTool}>
                            {!props.isMulti &&  <i className={"fas fa-times"} onClick={(e) => {resetValue(); e.stopPropagation(); e.preventDefault()}}></i>}
                            {showMenu ? <i className={"fas fa-chevron-up"}/> : <i className={"fas fa-chevron-down"}/>}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}