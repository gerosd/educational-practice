import React from 'react';
import styles from './Certification.module.scss';
import QuizCard from "./QuizCard";

function Certification(): React.ReactElement {
    return (
        <div className={`${styles.certification} main`}>
            <p className={styles.desc}></p>
            <QuizCard styles={styles}/>
        </div>
    )
}

export default Certification;