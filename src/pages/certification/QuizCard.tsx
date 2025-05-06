import React from 'react';

interface QuizTests {
   id: number;
   question: string;
   code: "";
   options: [];
   answer: number;
}

interface QuizProps {
    styles: Record<string, string>;
}

const quizTestsArray: QuizTests[] = [
    {id: 1, question: "Как правильно создать компонент React?", code: '', options: ['function Component() { return <div>Hello</div>; }', ''], answer: 1}
]

function QuizCard( {styles}: QuizProps ): React.ReactElement {
    return (
        <div className={styles.quizCard}>
            <h2 className={styles.quizCount}>1 / 15</h2>
            <h2 className={styles.quizName}>Как правильно создать компонент React?</h2>
            <div className={styles.progressBar}>
                <div className={styles.progressThumb} style={{ width: '20%' }}></div>
            </div>
        </div>
    )
}

export default QuizCard;