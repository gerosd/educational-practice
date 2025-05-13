import React from 'react';
import styles from '../../assets/styles/modules/Tests.module.scss';
import TestsContainer from "./TestsContainer";

function Tests(): React.ReactElement {
    return (
        <div className={`${styles.tests} main`}>
            <h1 className={styles.tests__title}>Интерактивные тесты “React. Знакомство”<br/>
                При прохождении тестов <span style={{textDecoration: 'underline'}}>СТРОГО</span> соблюдайте стиль написания кода</h1>
            <TestsContainer styles={styles} />
        </div>
    )
}

export default Tests;