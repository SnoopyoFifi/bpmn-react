import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styles from './index.module.less';

class EditingTools extends Component {
  static propTypes = {
    onOpenFIle: PropTypes.func.isRequired,
    onZoomIn: PropTypes.func.isRequired,
    onZoomOut: PropTypes.func.isRequired,
    onZoomReset: PropTypes.func.isRequired,
    onUndo: PropTypes.func.isRequired,
    onRedo: PropTypes.func.isRequired,
    onSave: PropTypes.func.isRequired,
    onDownloadXml: PropTypes.func.isRequired,
    onDownloadSvg: PropTypes.func.isRequired
  }

  handleOpen = () => {
    this.file.click();
  };

  render() {
    const {
      onOpenFIle,
      onZoomIn,
      onZoomOut,
      onZoomReset,
      onUndo,
      onRedo,
      onSave,
      onDownloadXml,
      onDownloadSvg
    } = this.props;
    return (
      <div className={styles.editingTools}>
        <ul className={styles.controlList}>
          <li className={`${styles.control} ${styles.line}`}>
            <input
              ref={(file) => {
                this.file = file;
              }}
              className={styles.openFile}
              type="file"
              onChange={onOpenFIle}
            />
            <button type="button" title="打开" onClick={this.handleOpen}>
              <i className={styles.open} />
            </button>
          </li>

          <li className={styles.control}>
            <button type="button" title="前进" onClick={onUndo}>
              <i className={styles.undo} />
            </button>
          </li>
          <li className={`${styles.control} ${styles.line}`}>
            <button type="button" title="后退" onClick={onRedo}>
              <i className={styles.redo} />
            </button>
          </li>

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

          <li className={styles.control}>
            <button type="button" title="保存" onClick={onSave}>
              <i className={styles.save} />
            </button>
          </li>
          <li className={styles.control}>
            <button type="button" title="下载bpmn diagram" onClick={onDownloadXml}>
              <i className={styles.download} />
            </button>
          </li>
          <li className={styles.control}>
            <button type="button" title="下载svg image" onClick={onDownloadSvg}>
              <i className={styles.image} />
            </button>
          </li>
        </ul>
      </div>
    );
  }
}

export default EditingTools;
