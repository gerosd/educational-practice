import React from 'react';
import styles from "../assets/styles/modules/Header.module.scss";
import {Link} from "react-router-dom";

function Header(): React.ReactElement  {
    return (
        <header className={styles.header}>
            <Link to="/tests">Тесты</Link>
            <Link to="/" className={styles.name}>Reactiv</Link>
            <Link to="/certification">Аттестация</Link>
        </header>
    )
}

export default Header;