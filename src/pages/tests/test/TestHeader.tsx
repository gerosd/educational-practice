import React from 'react';
import complete from "../../../assets/complete.svg";

interface TestHeaderProps {
    testName: string;
    isCompleted: boolean;
    onBack: () => void;
    styles: Record<string, string>;
}

export const TestHeader = React.memo(({ testName, isCompleted, onBack, styles }: TestHeaderProps) => (
    <div className={`${styles.testHeader}`}>
        <button className={`${styles.back}`} onClick={onBack}>
            ← Назад к тестам
        </button>
        <h1>{testName}</h1>
        {isCompleted && <img src={complete} alt="completed" className="completed-badge" />}
    </div>
));