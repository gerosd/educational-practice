import React from 'react';
import styles from '../assets/styles/modules/tg.module.scss';
import tgImg from '../assets/Telegram_2019_Logo.svg.png';

function Telegram(): React.ReactElement {
    return (
        <a className={styles.telegramContainer} href="https://t.me/Bubuldus" title="Связаться в Telegram">
            <img src={tgImg} alt="tg"/>
        </a>
    )
}

export default Telegram;