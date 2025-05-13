import React from 'react';

interface QuizProps {
    styles: Record<string, string>;
}

function QuizCard( {styles}: QuizProps ): React.ReactElement {

    return (
        <div className={styles.quizCard}>
            <h2 className={styles.quizCount}>1 / 15</h2>
            <h2 className={styles.quizName}>Как правильно создать компонент React?</h2>
            <div className={styles.quizOptions}>
                {/*Перебор через map()*/}
                <div className={styles.quizOption}>

                </div>
            </div>
            <div className={styles.progressBar}>
                <div className={styles.progressThumb} style={{ width: '20%' }}></div>
            </div>
        </div>
    )
}

export default QuizCard;