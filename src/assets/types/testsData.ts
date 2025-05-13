export interface TestInterface {
    id: number;
    name: string;
    isCompleted: boolean;
    preInstalledCode: string;
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
        preInstalledCode: `function Greeting({ name }) {
  return <h1>Hello, !</h1>; {/*Между , и ! вставьте проп*/}
}

function App() {
  return (
    <div>
      {/*Напишите код ниже*/}
      <Greeting />
      {/*Напишите код выше*/}
    </div>
  );
}`
    },

    {
        id: 5,
        name: "Состояние компонента",
        isCompleted: false,
        preInstalledCode: `function App() {
  {/*Напишите код ниже*/}
    
    
    const increment = () => {
      
    };
  {/*Напишите код выше*/}
  
  return (
    <>
      <h2>Счетчик: {count}</h2>
      <button>Увеличить на 1</button>
    </>
  );
}`
    },

    {
        id: 6,
        name: "Жизненный цикл",
        isCompleted: false,
        preInstalledCode: `function App() {
  {/*Напишите код ниже*/}
  
  {/*Напишите код выше*/}
  return (
    <div>
      <p>Прошло: секунд</p> {/*В этой строке передайте seconds после :*/}
    </div>
  );   
}`
    },

    {
        id: 7,
        name: "Списки и ключи",
        isCompleted: false,
        preInstalledCode: `function App() {
  const users = [{ id: '1', name: 'Maria' }, { id: '2', name: 'Bob' }, { id: '3', name: 'Kate' }];

  return (
    <ul>
    {
      //Напишите код ниже
      
      //Напишите код выше
      }
    </ul>
  )
}`
    },

    {
        id: 8,
        name: "Оптимизация производительности",
        isCompleted: false,
        preInstalledCode: `function App() {
  const [a, setA] = useState(0);
  const [b, setB] = useState(0);
  const [count, setCount] = useState(0);
  //Оптимизируйте константу с помощью useMemo
  const sum = () => {
    return a + b;
  };

  return (
    <div>
      <h1>Результат сложения строк: {sum}</h1>
      <p>Количество кликов: {count}</p>
      <button onClick={() => setCount(count + 1)}>Кликнуть</button>
      <input type="number" value={a} onChange={(e) => setA(e.target.value)} />
      <input type="number" value={b} onChange={(e) => setB(e.target.value)} />
    </div>
  );
}`
    },

    {
        id: 9,
        name: "Условный рендеринг",
        isCompleted: false,
        preInstalledCode: `function App() {
  const isNewUser = false; //поменяйте флаг на true
  const userName = "User";
  
  return(
    <div>
      {/*Напишите код ниже*/}
      
      {/*Напишите код выше*/}
    </div>
  );                
}`
    },

    {
        id: 10,
        name: "Работа с полями ввода",
        isCompleted: false,
        preInstalledCode: `function App() {
  const [name, setName] = useState('');
  
  return (
    <div>
      <h2>{name}</h2>
      {/*Напишите код ниже*/}
      
      {/*Напишите код выше*/}
    </div>
  )            
}`
    },
];