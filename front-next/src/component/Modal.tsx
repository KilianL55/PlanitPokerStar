import styles from '@/styles/component/Modal.module.scss';
import {AnimatePresence, motion} from "framer-motion"
export default function Modal(props: { children: any, isOpen: boolean, toggle: () => void, title: string }) {
    return (
        <>
            <AnimatePresence>
            {props.isOpen && (
                <>
                    <motion.div animate={{opacity : 1}} exit={{opacity : 0}} className={styles.modalOverlay} onClick={props.toggle}>

                    </motion.div>

                    <motion.div animate={{y : '-100px', opacity: 1}} initial={{opacity : 0}} exit={{y: '500px', opacity: 0, transitionDuration : '0.5s'}} className={styles.modal}>
                        <h1>{props.title}</h1>
                        <div className={styles.modalContent}>
                            {props.children}
                        </div>
                    </motion.div>
                </>
            )}
            </AnimatePresence>
        </>
    )
}