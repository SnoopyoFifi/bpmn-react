import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styles from './index.module.less';

class EditingTools extends Component {
  static propTypes = {
    onZoomIn: PropTypes.func.isRequired,
    onZoomOut: PropTypes.func.isRequired,
    onZoomReset: PropTypes.func.isRequired,
  }

  handleOpen = () => {
    this.file.click();
  };

  render() {
    const {
      onZoomIn,
      onZoomOut,
      onZoomReset,
    } = this.props;
    return (
      <div className={styles.editingTools}>
        <ul className={styles.controlList}>
          <li className={styles.control}>
            <button type="button" title="还原" onClick={onZoomReset}>
              <i className={styles.zoom} />
            </button>
          </li>
          <li className={styles.control}>
            <button type="button" title="放大" onClick={onZoomIn}>
              <i className={styles.zoomIn} />
            </button>
          </li>
          <li className={`${styles.control} ${styles.line}`}>
            <button type="button" title="缩小" onClick={onZoomOut}>
              <i className={styles.zoomOut} />
            </button>
          </li>
        </ul>
      </div>
    );
  }
}

export default EditingTools;
