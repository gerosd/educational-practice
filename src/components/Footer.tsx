import React from 'react';
import styles from '../assets/styles/modules/Footer.module.scss';

function Footer(): React.ReactElement {
    return (
        <footer className={styles.footer}>
            <p>© 2025. Все права защищены</p>
        </footer>
    )
}

export default Footer;