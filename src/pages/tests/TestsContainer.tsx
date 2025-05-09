import React from 'react';
import complete from "../../assets/complete.svg";
import {Link} from "react-router-dom";

interface TestsContainerProps {
    styles: Record<string, string>;
}

interface TestInterface {
    id: number;
    name: string;
    isCompleted: boolean;
}

const testsStorage: TestInterface[] = [
    {id: 1, name: "Что такое React? JSX, отличие от HTML", isCompleted: false},
    {id: 2, name: "Компоненты и Props", isCompleted: false},
    {id: 3, name: "Состояние компонента", isCompleted: false},
    {id: 4, name: "Жизненный цикл", isCompleted: false},
    {id: 5, name: "Списки и ключи", isCompleted: false},
    {id: 6, name: "Обработка событий", isCompleted: false},
    {id: 7, name: "Условный рендеринг", isCompleted: false},
    {id: 8, name: "Работа с формами", isCompleted: false},
    {id: 9, name: "Context API", isCompleted: false},
    {id: 10, name: "React Hooks", isCompleted: false},
]

function TestsContainer( {styles}: TestsContainerProps ): React.ReactElement {

    return (
        <div className={styles.container}>
            {
                testsStorage.map(test => (
                    <Link className={styles.test} key={test.id} to={`/test/${test.id}`}>
                        <div className={styles.completed}>
                            {test.isCompleted ? <img src={complete} alt="complete"/> : null}
                        </div>
                        <p className={styles.name}>{test.name}</p>
                    </Link>
                ))
            }
        </div>
    )
}

export default TestsContainer;