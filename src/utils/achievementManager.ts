import { Achievement } from '../assets/types/achievements';

const ACHIEVEMENTS_KEY = 'achievements';

export const getAchievements = (): Achievement[] => {
    const achievementsStr = localStorage.getItem(ACHIEVEMENTS_KEY);
    if (!achievementsStr) {
        return [];
    }

    try {
        return JSON.parse(achievementsStr);
    } catch {
        return [];
    }
};

export const saveAchievement = (achievement: Achievement): void => {
    const achievements = getAchievements();
    if (!achievements.some(a => a.id === achievement.id)) {
        achievements.push(achievement);
        localStorage.setItem(ACHIEVEMENTS_KEY, JSON.stringify(achievements));
    }
};