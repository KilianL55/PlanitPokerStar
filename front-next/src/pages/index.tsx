import Head from 'next/head'
import { Inter } from 'next/font/google'
import styles from '@/styles/pages/Index.module.scss'
import Layout from "@/component/Layout";
import { motion } from "framer-motion"
import IndexCard from "@/component/IndexCard";
import React from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

export const apiUrl = 'http://127.0.0.1:8090/api'

import {
    faSearch,
    faAmbulance,
    faAnchor, faChevronRight, faDiceOne, faDiceTwo, faDiceThree, faDiceFour, faDice,
} from "@fortawesome/free-solid-svg-icons";
import Dropdown from "@/component/Dropdown/dropdown";
import dropdownOption from "@/component/Dropdown/DropdownOption";

const inter = Inter({ subsets: ['latin'] })

export default function Home() {

    const options = [
        dropdownOption.from("1", "Option 1", false, "fas fa-user"),
        dropdownOption.from("2", "Option 2", false, undefined, "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d5/CSS3_logo_and_wordmark.svg/1452px-CSS3_logo_and_wordmark.svg.png"),
        dropdownOption.from("3", "Option 3", false),
        dropdownOption.from("4", "Option 4", false),
        dropdownOption.from("5", "Option 5", false),
        dropdownOption.from("6", "Option 6", false)
    ];

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
                            <Dropdown isMulti={true} placeholder={"Choisissez le rôle"} options={options} label={"Rôle"} outline={true} icon={"fas fa-user"} iconPosition={"right"}></Dropdown>
                        </div>
                    </div>
                </motion.div>
            </div>
        </Layout>
    </>
  )
}
