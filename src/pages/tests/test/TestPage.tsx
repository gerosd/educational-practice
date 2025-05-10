import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useNavigate, useParams } from "react-router-dom";
import { testsStorage } from '../../../assets/types/testsData';
import  CodeEditor from './CodeEditor';
import TestDescription from './TestDescription';
import { useDebounce } from '../../../assets/hooks/useDebounce';
import { TestHeader } from './TestHeader';
import { TestOutput } from './TestOutput';
import { TestPreview } from './TestPreview';
import styles from '../Test.module.scss';

export function TestPage(): React.ReactElement | null {
    const { testId } = useParams<{ testId: string }>();
    const navigate = useNavigate();
    const [code, setCode] = useState<string>('');
    const [output, setOutput] = useState<string>('');
    const [isCompleted, setIsCompleted] = useState<boolean>(false);
    const debouncedCode = useDebounce(code, 1000);

    const currentTest = useMemo(() => {
        const id = Number(testId);
        return testsStorage.find(test => test.id === id);
    }, [testId]);

    const handleBack = useCallback(() => {
        navigate('/tests');
    }, [navigate]);

    const handleClearOutput = useCallback(() => {
        setOutput('');
    }, []);

    const handleConsoleMessage = useCallback((message: string) => {
        setOutput(prev => {
            const newOutput = message + '\n';
            return prev.endsWith(newOutput) ? prev : prev + newOutput;
        });
    }, []);

    const handleError = useCallback((error: string) => {
        setOutput(prev => prev + 'Error: ' + error + '\n');
    }, []);

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

    const checkTestResult = useCallback((id: number, result: string): boolean => {
        const expectedResults: Record<number, string> = {
            1: 'Expected output for test 1',
        };

        return result.trim() === expectedResults[id]?.trim();
    }, []);

    const handleRunCode = useCallback(() => {
        try {
            handleClearOutput();
            const result = executeUserCode(code);
            setOutput(result);

            if (currentTest && checkTestResult(currentTest.id, result)) {
                setIsCompleted(true);
                currentTest.isCompleted = true;
            }
        } catch (error) {
            setOutput(`Error: ${error instanceof Error ? error.message : String(error)}`);
        }
    }, [code, currentTest, executeUserCode, checkTestResult, handleClearOutput]);

    useEffect(() => {
        if (!currentTest) {
            navigate('/tests');
            return;
        }

        if (debouncedCode) {
            handleRunCode();
        }
    }, [debouncedCode, currentTest, navigate, handleRunCode]);

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

                    <div className={`${styles.buttons}`}>
                        <button onClick={handleRunCode}>Запустить код</button>
                        <button disabled={!isCompleted} className={!isCompleted ? 'disabled' : ''}>
                            Отправить решение
                        </button>
                    </div>

                    <TestOutput output={output} styles={styles}/>
                </div>
                <div className={`${styles.preview}`}>
                    <TestPreview
                        userCode={code}
                        onConsoleMessage={handleConsoleMessage}
                        onClearConsole={handleClearOutput}
                        onError={handleError}
                        styles={styles}
                    />
                </div>
            </div>
        </div>
    );
}