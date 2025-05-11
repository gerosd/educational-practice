import React, { ReactElement } from 'react';
import {useNavigate} from "react-router-dom";
import styles from "../../assets/styles/modules/pageNotFound.module.scss";

function PageNotFound() : ReactElement {
    const navigate = useNavigate();

    const handleNavigateToMain  = (): void => {
        navigate('/');
    }

    return (
        <div className={`${styles.notFound} main`}>
            <h1>Страница не найдена</h1>
            <p>404</p>
            <button onClick={handleNavigateToMain}>На главную</button>
        </div>
    )
}

export default PageNotFound;