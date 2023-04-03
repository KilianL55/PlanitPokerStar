import styles from '@/styles/component/IndexCard.module.scss'

export default function IndexCard(props: {children : string, icon : string, link?: boolean}) {
    return (
        <div className={styles.indexCard}>
            <i className={props.icon}></i>
            {props.link ? <a href={"#"} className={styles.linked}><p>{props.children}</p></a> : <p>{props.children}</p>}
        </div>
    )
}