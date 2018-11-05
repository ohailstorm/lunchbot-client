import React from 'react';

export const PageWrapper = ({ styles = {}, title, children }) => (
  <div className={styles.App}>
    <header className={styles['App-header']}>
      <h1 className={styles['App-title']}>{title}</h1>
    </header>
    <div className={`${styles.content} container`}>{children}</div>
  </div>
);

export default PageWrapper;
