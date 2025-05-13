import React, { useCallback, useEffect, useMemo, useState } from 'react';
import {NavigateFunction, useNavigate, useParams} from "react-router-dom";
import { testsStorage } from '../../../assets/types/testsData';
import CodeEditor from './CodeEditor';
import TestDescription from './TestDescription';
import { TestHeader } from './TestHeader';
import { TestPreview } from './TestPreview';
import styles from '../../../assets/styles/modules/Test.module.scss';
import { getCompletedTests, saveCompletedTest } from '../../../utils/cookieManager';

export function TestPage(): React.ReactElement | null {
    const { testId } = useParams<{ testId: string }>();
    const navigate: NavigateFunction = useNavigate();
    const [code, setCode] = useState<string>('');
    const [isCompleted, setIsCompleted] = useState<boolean>(false);
    const [error, setError] = useState<string>('');

    const currentTest = useMemo(() => {
        const id: number = Number(testId);
        return testsStorage.find(test => test.id === id);
    }, [testId]);

    const nextTestId: number | null = useMemo(() => {
        if (!currentTest) return null;
        const currentIndex: number = testsStorage.findIndex(test => test.id === currentTest.id);
        return currentIndex < testsStorage.length - 1 ? testsStorage[currentIndex + 1].id : null;
    }, [currentTest]);

    useEffect((): void => {
        if (currentTest?.preInstalledCode) {
            setCode(currentTest.preInstalledCode);
        }
    }, [currentTest]);

    useEffect((): void => {
        if (currentTest) {
            const completedTests = getCompletedTests();
            setIsCompleted(completedTests.includes(currentTest.id));
            currentTest.isCompleted = completedTests.includes(currentTest.id);
        }
    }, [currentTest]);

    const handleBack = useCallback(() => {
        navigate('/tests');
    }, [navigate]);

    const handleNextTest = useCallback(() => {
        if (nextTestId) {
            navigate(`/test/${nextTestId}`);
        }
    }, [nextTestId, navigate]);

    const handleNavigateToTests = (): void => {
        navigate(`/certification`);
    }

    const executeUserCode = useCallback((codeToExecute: string): string => {
        try {
            const func = new Function(`
                let output = '';
                const console = {
                    log: (...args) => output += args.join(' ') + '\\n'
                };
                try {
                    ${codeToExecute}
                } catch (e) {
                    output = 'Error: ' + e.message;
                }
                return output;
            `);

            return func();
        } catch (e) {
            return `Error: ${e instanceof Error ? e.message : String(e)}`;
        }
    }, []);

    const normalizeCode = (code: string): string => {
        return code
            .replace(/\s+/g, ' ')
            .replace(/\s*{\s*/g, '{')
            .replace(/\s*}\s*/g, '}')
            .replace(/\s*\(\s*/g, '(')
            .replace(/\s*\)\s*/g, ')')
            .replace(/\s*<\s*/g, '<')
            .replace(/\s*>\s*/g, '>')
            .trim();
    };

    const checkTestResult = useCallback((id: number, userCode: string): boolean => {
        const testDescriptions: Record<number, { expectedCode: string }> = {
            1: {
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
                expectedCode: `function App() {
  return (
    <div>
      {/*Напишите код ниже*/}
      <p className="mainText" style={{fontSize: '18px', color: 'red'}}>Примените стиль</p>
      {/*Напишите код выше*/}
    </div>
  );        
}`
            },

            3: {
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
}`
            },

            4: {
                expectedCode: `function Greeting({ name }) {
  return <h1>Hello, {name}!</h1>; {/*Между , и ! вставьте проп*/}
}

function App() {
  return (
    <div>
      {/*Напишите код ниже*/}
      <Greeting name="React"/>
      {/*Напишите код выше*/}
    </div>
  );
}`
            },

            5: {
                expectedCode: `function App() {
  {/*Напишите код ниже*/}
  const [count, setCount] = useState(0);
    
    const increment = () => {
      setCount(count + 1);
    };
  {/*Напишите код выше*/}
  
  return (
    <>
      <h2>Счетчик: {count}</h2>
      <button onClick={increment}>Увеличить на 1</button>
    </>
  );
}`
            },

            6: {
                expectedCode: `function App() {
  {/*Напишите код ниже*/}
  const [seconds, setSeconds] = useState(0);
  
  useEffect(() => {
    const intervalId = setInterval(() => {
      setSeconds((prevSeconds) => prevSeconds + 1);
    }, 1000);
  }, []);
  {/*Напишите код выше*/}
  return (
    <div>
      <p>Прошло: {seconds} секунд</p> {/*В этой строке передайте seconds после :*/}
    </div>
  );   
}`
            },

            7: {
                expectedCode: `function App() {
  const users = [{ id: '1', name: 'Maria' }, { id: '2', name: 'Bob' }, { id: '3', name: 'Kate' }];

  return (
    <ul>
    {
      //Напишите код ниже
      users.map((user) => 
        <li key={user.id}>{user.name}</li>
      )
      //Напишите код выше
    }
    </ul>
  )
}`
            },

            8: {
                expectedCode: `function App() {
  const [a, setA] = useState(0);
  const [b, setB] = useState(0);
  const [count, setCount] = useState(0);
  //Оптимизируйте константу с помощью useMemo
  const sum = useMemo(() => {
    return a + b;
  }, [a, b]);

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

            9: {
                expectedCode: `function App() {
  const isNewUser = true; //поменяйте флаг на true
  const userName = "User";
  
  return(
    <div>
      {/*Напишите код ниже*/}
      {isNewUser ? (<h1>{userName}</h1>) : ""}
      {/*Напишите код выше*/}
    </div>
  );                
}`
            },

            10: {
                expectedCode: `function App() {
  const [name, setName] = useState('');
  
  return (
    <div>
      <h2>{name}</h2>
      {/*Напишите код ниже*/}
      <input value={name} onChange={e => setName(e.target.value)}/>
      {/*Напишите код выше*/}
    </div>
  )            
}`
            }
        };

        const expectedCode = testDescriptions[id]?.expectedCode;
        if (!expectedCode) return false;

        const normalizedUserCode = normalizeCode(userCode);
        const normalizedExpectedCode = normalizeCode(expectedCode);

        return normalizedUserCode === normalizedExpectedCode;
    }, []);

    const handleRunCode = useCallback(() => {
        try {
            setError('');
            const result = executeUserCode(code);

            if (currentTest && checkTestResult(currentTest.id, code)) {
                setIsCompleted(true);
                currentTest.isCompleted = true;
                saveCompletedTest(currentTest.id);
            } else {
                setError('Ваш код не соответствует ожидаемому результату. Пожалуйста, проверьте решение.');
            }
        } catch (error) {
            setError(`Ошибка: ${error instanceof Error ? error.message : String(error)}`);
        }
    }, [code, currentTest, executeUserCode, checkTestResult]);

    useEffect(() => {
        if (!currentTest) {
            navigate('/tests');
            return;
        }
    }, [currentTest, navigate]);

    if (!currentTest) {
        return null;
    }

    return (
        <div className={`${styles.testPage} main`}>
            <TestHeader
                testName={currentTest.name}
                isCompleted={isCompleted}
                onBack={handleBack}
                styles={styles}
            />

            <div className={`${styles.testContent}`}>
                <div className={`${styles.descColumn}`}>
                    <TestDescription testId={currentTest.id} styles={styles}/>
                </div>

                <div className={`${styles.editorColumn}`}>
                    <CodeEditor
                        value={code}
                        onChange={setCode}
                        language="javascript"
                    />

                    {error && (
                        <div className={styles.error}>
                            <p>{error}</p>
                        </div>
                    )}

                    <div className={`${styles.buttons}`}>
                        <button onClick={handleRunCode}>Проверить решение</button>
                        {isCompleted && nextTestId && (
                            <button onClick={handleNextTest} className={styles.nextTest}>
                                Следующий тест
                            </button>
                        )}
                        {isCompleted && !nextTestId && (
                            <button onClick={handleNavigateToTests} className={styles.nextTest}>
                                К аттестации
                            </button>
                        )}
                    </div>
                </div>
                <div className={`${styles.preview}`}>
                    <TestPreview
                        userCode={code}
                        styles={styles}
                    />
                </div>
            </div>
        </div>
    );
}