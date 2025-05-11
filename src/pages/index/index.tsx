import React, {ReactElement} from "react";
import styles from "../../assets/styles/modules/index.module.scss";
import {NavigateFunction, useNavigate} from "react-router-dom";

function Index(): ReactElement {
    const navigate : NavigateFunction = useNavigate();

    const handleNavToTests = (): void => {
        navigate('/tests');
    }

    const handleNavToAttest = (): void => {
        navigate('/certification');
    }

    return (
        <div className={`${styles.index} main`}>
            <div className={styles.mainDesc}>
                <p>Reactiv — платформа, позволяющая освоить одну из самых популярных библиотек для создания современных веб-приложений — React.js!</p><br/>
                <h1>Почему React?</h1>
                <ul>
                    <li>Востребованность: React используют Facebook, Instagram, Airbnb и тысячи других компаний.</li>
                    <li>Простота: Компонентный подход делает код понятным и переиспользуемым.</li>
                    <li>Большое комьюнити: Множество готовых решений, библиотек и курсов.</li>
                </ul>
                <br/>
                <h1>Что ты найдешь у нас?</h1>
                <ul>
                    <li>Бесплатные уроки — основы JSX, компоненты, состояние (state) и пропсы (props).</li>
                    <li>Интерактивные тесты и практика — пиши код прямо в браузере!</li>
                    <li>Telegram чат с опытным специалистом — быстрая помощь и советы</li>
                </ul>
            </div>
            <button className={styles.button} onClick={handleNavToTests}>К тестам</button>
            <p className={styles.mainDesc}>После прохожения тестов рекомендуется пройти итоговую аттестацию. При успешном прохожении на почту придет сертификат об успешном окончании курса!</p>
            <button className={styles.button} onClick={handleNavToAttest}>Итоговая<br/>аттестация</button>
        </div>
    )
}

export default Index;