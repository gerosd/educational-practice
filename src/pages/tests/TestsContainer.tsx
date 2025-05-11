import React, { useEffect, useState } from 'react';
import complete from "../../assets/complete.svg";
import {Link} from "react-router-dom";
import {TestInterface, testsStorage} from '../../assets/types/testsData';
import { getCompletedTests } from '../../utils/cookieManager';

interface TestsContainerProps {
    styles: Record<string, string>;
}

function TestsContainer({ styles }: TestsContainerProps): React.ReactElement {
    const [tests, setTests] = useState<TestInterface[]>([]);

    useEffect(() => {
        const completedTests = getCompletedTests();
        setTests(testsStorage.map(test => ({
            ...test,
            isCompleted: completedTests.includes(test.id)
        })));
    }, []);

    return (
        <div className={styles.container}>
            {
                tests.map(test => (
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