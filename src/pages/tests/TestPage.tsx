import React, {useEffect, useRef, useState} from 'react';
import { useNavigate, useParams } from "react-router-dom";
import styles from './Test.module.scss';
import CodeEditor from './CodeEditor';
import TestDescription from './TestDescription';
import { TestInterface, testsStorage } from '../../assets/types/testsData';
import complete from "../../assets/complete.svg";
import useDebounce from "../../assets/types/useDebounce";

function TestPage(): React.ReactElement {
    const { testId } = useParams<{ testId: string }>();
    const navigate = useNavigate();
    const [code, setCode] = useState<string>('');
    const [output, setOutput] = useState<string>('');
    const [isCompleted, setIsCompleted] = useState<boolean>(false);
    const iframeRef = useRef<HTMLIFrameElement>(null);
    const debouncedCode = useDebounce(code, 1000);

    const currentTest: TestInterface | undefined = testsStorage.find(
        test => test.id === Number(testId)
    );

    if (!currentTest) {
        navigate('/tests');
        return <></>;
    }

    useEffect(() => {
        if (debouncedCode) {
            handleRunCode();
        }
    }, [debouncedCode]);

    const handleRunCode = () => {
        try {
            setOutput('');
            const result = executeUserCode(code);
            setOutput(result);
            updateIframe(code);

            if (checkTestResult(Number(testId), result)) {
                setIsCompleted(true);
                currentTest.isCompleted = true;
            }
        } catch (error) {
            setOutput(`Error: ${error instanceof Error ? error.message : String(error)}`);
        }
    };

    const updateIframe = (userCode: string) => {
        if (!iframeRef.current) return;

        const iframe = iframeRef.current;
        setTimeout(() => {
            const iframeDoc = iframe.contentDocument;
            if (!iframeDoc) return;

            iframeDoc.open();
            iframeDoc.writeln(`
            <html>
            <head>
                <meta charSet="UTF-8">
                <script src="https://unpkg.com/react@18/umd/react.development.js"></script>
                <script src="https://unpkg.com/react-dom@18/umd/react-dom.development.js"></script>
                <script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>
                <style>
                    body { margin: 0; padding: 0; font-family: Arial; }
                    #root {background: #ffffff; width: 100%; height: 100%;}
                </style>
                <title></title>
            </head>
            <body>
                <div id="root"></div>
                    <script type="text/babel">
                if (!window.originalConsole) {
                    window.originalConsole = {...console};
                    
                    let consoleQueue = [];
                    let consoleTimer;
                    
                    console.log = (...args) => {
                        consoleQueue.push(args.join(' '));
                        clearTimeout(consoleTimer);
                        consoleTimer = setTimeout(() => {
                            window.parent.postMessage({
                                type: 'console',
                                data: consoleQueue.join('\\n')
                            }, '*');
                            consoleQueue = [];
                        }, 100);
                        window.originalConsole.log(...args);
                    };
                    
                    window.onerror = (message) => {
                        window.parent.postMessage({
                            type: 'error',
                            data: String(message)
                        }, '*');
                        return true;
                    };
                }
                
                window.parent.postMessage({
                    type: 'clear'
                }, '*');
                
                try {
                    ${userCode.includes('ReactDOM.render') ?
                            userCode :
                            `const root = ReactDOM.createRoot(document.getElementById('root'));
                        root.render(<App />);`}
                } catch(e) {
                    console.error('Execution error:', e.message);
                }
            </script>
            </body>
            </html>
        `);
            iframeDoc.close();
        }, 50);
    };

    useEffect(() => {
        const handleMessage = (event: MessageEvent) => {
            if (!event.data?.type) return;

            switch(event.data.type) {
                case 'clear':
                    setOutput('');
                    break;
                case 'console':
                    setOutput(prev => {
                        const newOutput = event.data.data + '\n';
                        return prev.endsWith(newOutput) ? prev : prev + newOutput;
                    });
                    break;
                case 'error':
                    setOutput(prev => prev + 'Error: ' + event.data.data + '\n');
                    break;
            }
        };

        window.addEventListener('message', handleMessage);
        return () => window.removeEventListener('message', handleMessage);
    }, []);

    return (
        <div className={`${styles.testPage} main`}>
            <button className={styles.backButton} onClick={() => navigate('/tests')}>
                ← Назад к тестам
            </button>

            <div className={styles.testHeader}>
                <h1>{currentTest.name}</h1>
                {isCompleted && <img src={complete} alt="completed" className={styles.completedBadge} />}
            </div>

            <div className={styles.testContent}>
                <div className={styles.descriptionColumn}>
                    <TestDescription testId={Number(testId)} />
                </div>

                <div className={styles.editorColumn}>
                    <CodeEditor
                        value={code}
                        onChange={setCode}
                        language="javascript"
                    />

                    <div className={styles.buttons}>
                        <button onClick={handleRunCode}>Запустить код</button>
                        <button
                            disabled={!isCompleted}
                            className={!isCompleted ? styles.disabled : ''}
                        >
                            Отправить решение
                        </button>
                    </div>

                    <div className={styles.output}>
                        <h3>Консоль:</h3>
                        <pre>{output || 'Здесь будет результат выполнения вашего кода'}</pre>
                    </div>
                    <div className={styles.preview}>
                        <h3>Результат:</h3>
                        <iframe ref={iframeRef} title="code-preview" sandbox="allow-scripts allow-same-origin" className={styles.previewFrame}></iframe>
                    </div>
                </div>
            </div>
        </div>
    );
}

function executeUserCode(code: string): string {
    try {
        const func = new Function(`
            let output = '';
            const console = {
                log: (...args) => output += args.join(' ') + '\\n'
            };
            try {
                ${code}
            } catch (e) {
                output = 'Error: ' + e.message;
            }
            return output;
        `);

        return func();
    } catch (e) {
        return `Error: ${e instanceof Error ? e.message : String(e)}`;
    }
}

function checkTestResult(testId: number, result: string): boolean {
    const expectedResults: Record<number, string> = {
        1: 'Expected output for test 1',

    };

    return result.trim() === expectedResults[testId]?.trim();
}

export default TestPage;