export interface TestInterface {
    id: number;
    name: string;
    isCompleted: boolean;
    preInstalledCode?: string;
}

export const testsStorage: TestInterface[] = [
    {
        id: 1,
        name: "Что такое React? JSX, отличие от HTML",
        isCompleted: false,
        preInstalledCode: `function App() {
  return (
    <div>
      {/*Напишите код ниже*/}
      
      {/*Напишите код выше*/}
    </div>
  );
}`
    },

    {
        id: 2,
        name: "Стили, имя класса",
        isCompleted: false,
        preInstalledCode: `function App() {
  return (
    <div>
      {/*Напишите код ниже*/}
      <p>Примените стиль</p>
      {/*Напишите код выше*/}
    </div>
  );        
}`
    },

    {
        id: 3,
        name: "Рендер дочернего компонента",
        isCompleted: false,
        preInstalledCode: `{/*Добавьте компонент ниже (отступ в 1 строку между компонентами)*/}
function App() {
  return (
    <div>
      {/*Напишите код ниже*/}
      
      {/*Напишите код выше*/}
    </div>
  );
}`
    },

    {
        id: 4,
        name: "Компоненты и Props",
        isCompleted: false,
    },

    {
        id: 5,
        name: "Состояние компонента",
        isCompleted: false,
    },

    {
        id: 6,
        name: "Жизненный цикл",
        isCompleted: false,
    },

    {
        id: 7,
        name: "Списки и ключи",
        isCompleted: false,
    },

    {
        id: 8,
        name: "Обработка событий",
        isCompleted: false,
    },

    {
        id: 9,
        name: "Условный рендеринг",
        isCompleted: false,
    },

    {
        id: 10,
        name: "Работа с формами",
        isCompleted: false,
    },
];