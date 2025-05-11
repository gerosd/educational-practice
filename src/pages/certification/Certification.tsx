import React from 'react';
import styles from '../../assets/styles/modules/Certification.module.scss';
import QuizCard from "./QuizCard";

function Certification(): React.ReactElement {
    return (
        <div className={`${styles.certification} main`}>
            <p className={styles.desc}>На этой странице вы можете пройти итоговую аттестацию. При успешном прохождении Вам на указанную почту придет сертификат, подтверждающий прохождение курса “React. Знакомство”.</p>
            <QuizCard styles={styles}/>
        </div>
    )
}

export default Certification;