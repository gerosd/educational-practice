import React from 'react';

interface TestOutputProps {
    output: string;
    styles: Record<string, string>;
}

export const TestOutput = React.memo(({ output, styles }: TestOutputProps) => (
    <div className={`${styles.output}`}>
        <h3>Консоль:</h3>
        <p>{output || 'Здесь будет результат выполнения вашего кода'}</p>
    </div>
));