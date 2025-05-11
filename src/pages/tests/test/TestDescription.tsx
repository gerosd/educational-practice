import React, {FC} from 'react';

interface TestDescriptionProps {
    testId: number;
    styles: Record<string, string>;
}

const TestDescription: FC<TestDescriptionProps> = ({ testId, styles }) => {
    const testDescriptions: Record<number, { 
        description: string;
        task: string;
        expectedCode: string;
    }> = {
        1: {
            description: 'React - это библиотека JavaScript, которая используется для создания пользовательского интерфейса, ' +
                'в частности одностраничных приложений, где контент обновляется динамически, не требуя полной перезагрузки страницы. ' +
                'По своей сути React помогает разработчикам создавать повторно используемые компоненты пользовательского интерфейса, ' +
                'которые являются строительными блоками современных веб-интерфейсов. Эти компоненты можно комбинировать, вкладывать и ' +
                'эффективно управлять ими, что способствует модульности и возможности повторного использования в дизайне приложений. ' +
                'Разбивая сложные интерфейсы на более мелкие, управляемые части, React упрощает разработку, обеспечивает согласованность ' +
                'во всем приложении и также упрощает дальнейшую поддержку и обновление приложения. ' +
                'Этот сайт написан с помощью React. \n\n' +
                'JSX (JavaScript XML) — это расширение синтаксиса JavaScript, которое позволяет писать разметку прямо в коде. Выглядит это как смесь HTML и JavaScript. ' +
                'JSX создаёт элементы React. HTML код пишется внутри return()',
            task: 'Напишите код, который возвращает React-элемент, содержащий заголовок (h1) "Hello, React!"',
            expectedCode: `function App() {
  return (
    <div>
      {/*Напишите код ниже*/}
      <h1>Hello, React!</h1>
      {/*Напишите код выше*/}
    </div>
  );
}`
        },
        2: {
            description: '',
            task: 'Для параграфа задайте имя класса "mainText". Также задайте стили - шрифт 18px и цвет текста red (в таком же порядке)',
            expectedCode: `function App() {
  return (
    <div>
      <p className="mainText" style="{{fontSize: '18px', color: 'red'}}">Примените стиль</p>
    </div>
  );        
}`,
        },

        3: {
            description: 'JSX рендерит как HTML код, так и другой компонент React.',
            task: 'Создайте компонент Greeting(напишите его выше App) внутри него создайте заголовок первого уровня с надписью "Hello, User!", а после передайте его в App',
            expectedCode: `{/*Добавьте компонент ниже (отступ в 1 строку между компонентами)*/}
function Greeting() {
  return(
    <h1>Hello, User!</h1>
  );
}

function App() {
  return (
    <div>
      {/*Напишите код ниже*/}
      <Greeting />
      {/*Напишите код выше*/}
    </div>
  );
}`,
        },

        4: {
            description: 'Изучите создание компонентов и передачу props.',
            task: 'Создайте компонент Greeting(напишите его выше App), который принимает prop "name" и выводит "Hello, {name}!". В name передайте строку "React"',
            expectedCode: `function Greeting({ name }) {
  return <h1>Hello, {name}!</h1>;
}

function App() {
  return (
    <div>
      <Greeting name="John" />
    </div>
  );
}`
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
            <br/>
            <h2>Задание</h2>
            <p>{currentTest.task}</p>
        </div>
    );
};

export default TestDescription;