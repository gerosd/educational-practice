export interface Achievement {
    id: string;
    title: string;
    description: string;
    icon: string;
}

export const achievements: Achievement[] = [
    {
        id: 'quiz_master',
        title: 'React - начало.',
        description: 'Пройдите аттестацию по курсу "React. Знакомство"',
        icon: '🏆'
    }
]; 