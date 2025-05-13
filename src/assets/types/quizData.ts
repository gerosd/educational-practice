export interface QuizTests {
    id: number;
    question: string;
    code?: string;
    options: [string, string, string, string];
    answer: number;
}

export const quizStorage: QuizTests[] = [
    {
        id: 1,
        question: "Как правильно создать компонент React?",
        options: [
            'function Component() { return <div>Hello</div>; }',
            'class Component extends React { render() { return "Hello"; } }',
            'const Component = () => { <div>Hello</div> };',
            'React.createComponent(<div>Hello</div>);'
        ],
        answer: 1
    },

    {
        id: 2,
        question: "Что делает useState()?",
        options: [
            'Управляет жизненным циклом компонента',
            'Хранит и обновляет состояние компонента',
            'Создает глобальную переменную',
            'Работает только в классовых компонентах',
        ],
        answer: 2
    },

    {
        id: 3,
        question: "Как передать пропс color в компонент <Button />?",
        options: [
            '<Button color="red">',
            '<Button props={color: "red"}>',
            '<Button>color="red"</Button>',
            '<Button {color="red"}>',
        ],
        answer: 1
    },

    {
        id: 4,
        question: "Какой хук сработает только при монтировании компонента?",
        options: [
            'useEffect(() => {}, []);',
            'useEffect(() => {});',
            'useEffect(() => {}, [deps]);',
            'useMount(() => {});',
        ],
        answer: 1
    },

    {
        id: 5,
        question: "Как исправить ошибку \"Cannot read property 'map' of undefined\"?",
        code: "const items = null;" +
            "return items.map(...);",
        options: [
            '',
            '',
            '',
            '',
        ],
        answer: 1
    },

    {
        id: 6,
        question: "Как задать стиль через style в JSX?",
        options: [
            '<div style="color: red">',
            '<div css="color: red">',
            '<div style={color: "red"}>',
            '<div style={{ color: "red" }}>',
        ],
        answer: 4
    },

    {
        id: 7,
        question: "Как правильно обновить состояние, зависящее от предыдущего?",
        code: "const [count, setCount] = useState(0);",
        options: [
            'setCount(count);',
            'setCount(prev => prev + 1);',
            'count += 1;',
            'setCount(count++);',
        ],
        answer: 2
    },

    {
        id: 8,
        question: "Как правильно имортировать React?",
        options: [
            '<link rel=’react’ href=’js/react.js’>',
            'import react.js from React',
            'include React from ‘react’;',
            'import React from ‘react’;',
        ],
        answer: 4
    },

    {
        id: 9,
        question: "",
        options: [
            '',
            '',
            '',
            '',
        ],
        answer: 3
    },

    {
        id: 10,
        question: "Как обработать отправку формы?",
        options: [
            '',
            '',
            '',
            '',
        ],
        answer: 3
    },

    {
        id: 11,
        question: "",
        options: [
            '',
            '',
            '',
            '',
        ],
        answer: 2
    },

    {
        id: 12,
        question: "Как динамически добавить класс в className?",
        code: "const [isActive, setIsActive] = useState(false);",
        options: [
            '<div className={isActive ? "active" : ""}>',
            '<div class={isActive && "active"}>',
            '<div className={isActive ? "active" : ""}>',
            '<div style={isActive ? "active" : null}>',
        ],
        answer: 3
    },

    {
        id: 13,
        question: "Как правильно использовать useEffect?",
        options: [
            'useEffect(() => { ... }, [deps]);',
            'const useEffect = () => { ... };',
            'useEffect([deps], () => { ... });',
            'useEffect({ ... }, [deps]);',
        ],
        answer: 1
    },

    {
        id: 14,
        question: "Как избежать лишних рендеров?",
        options: [
            'React не предоставляет таких возможностей',
            'useRender(false)',
            'return false',
            'React.memo()',
        ],
        answer: 4
    },

    {
        id: 15,
        question: "Что делает key в списках?",
        options: [
            'Уникально идентифицирует элемент для оптимизации',
            'Задает стиль элемента',
            'Обязателен только для map()',
            'Автоматически генерируется, если не указан',
        ],
        answer: 1
    }
]