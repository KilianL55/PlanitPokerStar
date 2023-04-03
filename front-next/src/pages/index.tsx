import Head from 'next/head'
import { Inter } from 'next/font/google'
import styles from '@/styles/pages/Index.module.scss'
import Layout from "@/component/Layout";
import { motion } from "framer-motion"
import IndexCard from "@/component/IndexCard";
import React from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

import {
    faSearch,
    faAmbulance,
    faAnchor, faChevronRight, faDiceOne, faDiceTwo, faDiceThree, faDiceFour, faDice,
} from "@fortawesome/free-solid-svg-icons";

const inter = Inter({ subsets: ['latin'] })

export default function Home() {

  return (
    <>
        <Layout>
            <div className={styles.indexContainer}>
                <motion.div initial={{y : 100, opacity : 0}} animate={{y : 0, opacity : 1}}>
                    <div className={styles.infoContainer}>
                        <h1>Rien de mieux qu'un poker entre collegues</h1>
                        <div className={styles.cardPlacement}>
                            <IndexCard icon={faDiceOne}>Créer votre Room</IndexCard>
                            <FontAwesomeIcon icon={faChevronRight} size={'2xl'} color={'#E3BC3EFF'} />
                            <IndexCard icon={faDiceTwo}>Inviter des contributeurs</IndexCard>
                            <FontAwesomeIcon icon={faChevronRight} size={'2xl'} color={'#E3BC3EFF'} />
                            <IndexCard icon={faDiceThree}>Rédiger les User Stories</IndexCard>

                            <IndexCard icon={faDiceFour}>C’est partie pour le vote</IndexCard>
                            <FontAwesomeIcon icon={faChevronRight} size={'2xl'} color={'#E3BC3EFF'} />
                            <IndexCard icon={faDice} link={true}>Commencer un poker</IndexCard>
                        </div>
                    </div>
                </motion.div>
            </div>
        </Layout>
    </>
  )
}
