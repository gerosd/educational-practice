export const getCompletedTests = (): number[] => {
    const completedTestsCookie = document.cookie
        .split('; ')
        .find(row => row.startsWith('completedTests='));
    
    if (!completedTestsCookie) {
        return [];
    }
    
    const completedTestsStr = completedTestsCookie.split('=')[1];
    try {
        return JSON.parse(decodeURIComponent(completedTestsStr));
    } catch {
        return [];
    }
};

export const saveCompletedTest = (testId: number): void => {
    const completedTests = getCompletedTests();
    if (!completedTests.includes(testId)) {
        completedTests.push(testId);
        const cookieValue = encodeURIComponent(JSON.stringify(completedTests));
        document.cookie = `completedTests=${cookieValue}; path=/; max-age=31536000`;
    }
}; 