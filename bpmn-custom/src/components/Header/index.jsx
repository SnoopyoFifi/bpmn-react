import React from 'react';
import styles from './index.module.less';

export default function () {
  return (
    <div className={styles.header}>
      <div className={styles['logo-container']}>
        <h1 className={styles.systemName}>bpmn-react</h1>
      </div>
    </div>
  );
}
