import React, { useEffect, useState } from 'react';
import { Achievement } from '../assets/types/achievements';
import { getAchievements } from '../utils/achievementManager';
import styles from '../assets/styles/modules/AchievementDisplay.module.scss';

export const AchievementDisplay: React.FC = () => {
    const [achievements, setAchievements] = useState<Achievement[]>([]);

    useEffect(() => {
        setAchievements(getAchievements());
    }, []);

    if (achievements.length === 0) {
        return null;
    }

    return (
        <div className={styles.achievementContainer}>
            {achievements.map(achievement => (
                <div key={achievement.id} className={styles.achievement}>
                    <span className={styles.icon}>🏆</span>
                    <div className={styles.content}>
                        <h3>{achievement.title}</h3>
                        <p>{achievement.description}</p>
                    </div>
                </div>
            ))}
        </div>
    );
}; 