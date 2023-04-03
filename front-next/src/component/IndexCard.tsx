import styles from '@/styles/component/IndexCard.module.scss'
import { motion } from "framer-motion"
import Link from "next/link";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {IconProp} from "@fortawesome/fontawesome-svg-core";

export default function IndexCard(props: {children : string, icon : IconProp, link?: boolean}) {
    return (
        <motion.div whileHover={{y : -10}} className={styles.indexCard}>
            <FontAwesomeIcon icon={props.icon} size={'2xl'} color={'#E3BC3EFF'} />
            {props.link ? <Link href={"Rooms"} className={styles.linked}><p>{props.children}</p></Link> : <p>{props.children}</p>}
        </motion.div>
    )
}