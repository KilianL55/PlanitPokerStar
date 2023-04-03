import Head from 'next/head'
import { Inter } from 'next/font/google'
import styles from '@/styles/pages/Index.module.scss'
import Layout from "@/component/Layout";
import { motion } from "framer-motion"
import IndexCard from "@/component/IndexCard";
import React from "react";

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
                            <IndexCard icon={'fas fa-dice-one'}>Créer votre Room</IndexCard>
                            <i className={'fas fa-chevron-right'}></i>
                            <IndexCard icon={'fas fa-dice-two'}>Inviter des contributeurs</IndexCard>
                            <i className={'fas fa-chevron-right'}></i>
                            <IndexCard icon={'fas fa-dice-three'}>Rédiger les User Stories</IndexCard>

                            <IndexCard icon={'fas fa-dice-four'}>C’est partie pour le vote</IndexCard>
                            <i className={'fas fa-chevron-right'}></i>
                            <IndexCard icon={'fas fa-dice'} link={true}>Commencer un poker</IndexCard>
                        </div>
                    </div>
                </motion.div>
            </div>
        </Layout>
    </>
  )
}
