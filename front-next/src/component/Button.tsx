import styles from '@/styles/component/Button.module.scss';
export default function Button(props : {color?: string, size?: string, iconPosition?: string, icon?: string, event?: () => void, children?: any}) {
    return (
        <div
            className={styles.button}

            style={{background : `${props.color ?? "#E3BC3E"}`}}

            data-color = {props.color}

            data-size = {props.size ?? "normal"}

            data-icon-position={props.iconPosition}

            onClick={props.event}
                >
                {props.icon ? <i className={props.icon}></i> : undefined}
                        {props.children}
        </div>
    )
}
