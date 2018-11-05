import React from 'react';
import styles from '../pages/Start.css';

export const AppWrapper = ({ title, children }) => (
  <div className={styles.App}>
    <header className={styles['App-header']}>
      <h1 className={styles['App-title']}>{title}</h1>
    </header>
    <div className={`${styles.content} container`}>{children}</div>
  </div>
);

export default AppWrapper;
