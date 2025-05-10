import React, {FC} from 'react';

interface TestDescriptionProps {
    testId: number;
    styles: Record<string, string>;
}

const TestDescription: FC<TestDescriptionProps> = ({ testId, styles }) => {
    const testDescriptions: Record<number, { description: string; task: string }> = {
        1: {
            description: 'В этом тесте вы познакомитесь с основами React и JSX.',
            task: 'Напишите код, который возвращает React-элемент, содержащий заголовок "Hello, React!"'
        },
        2: {
            description: 'Изучите создание компонентов и передачу props.',
            task: 'Создайте компонент Greeting, который принимает prop "name" и выводит "Hello, {name}!"'
        },

    };

    const currentTest = testDescriptions[testId];

    if (!currentTest) {
        return <div>Описание теста не найдено</div>;
    }

    return (
        <div className={`${styles.testDescription}`}>
            <h2>Описание</h2>
            <p>{currentTest.description}</p>

            <h2>Задание</h2>
            <p>{currentTest.task}</p>

            <h2>Пример решения</h2>
            <pre>
                {getExampleSolution(testId)}
            </pre>
        </div>
    );
};

function getExampleSolution(testId: number): string {
    const solutions: Record<number, string> = {
        1: 'return <h1>Hello, React!</h1>;',
        2: 'function Greeting({ name }) {\n  return <div>Hello, {name}!</div>;\n}',

    };

    return solutions[testId] || '// Пример решения будет добавлен позже';
}

export default TestDescription;