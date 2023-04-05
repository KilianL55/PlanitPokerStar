import styles from '@/styles/component/IndexCard.module.scss'
import { motion } from "framer-motion"
import {cookies} from "next/headers";

export default function IndexCard(props: {children : string, icon : string, link?: boolean}) {
    return (
        <motion.div whileHover={{y : -10}} className={styles.indexCard}>
            <i className={props.icon}></i>
            {props.link ? <a href={"#"} className={styles.linked}><p>{props.children}</p></a> : <p>{props.children}</p>}
            {}
        </motion.div>
    )
}