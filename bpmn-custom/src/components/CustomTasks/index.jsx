import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import { Table } from 'antd';
// import styles from './index.module.less';

class CustomTasks extends Component {
  static propTypes = {
    // onOpenFIle: PropTypes.func.isRequired,
  }

  constructor(props) {
    super(props);
    this.state = {
      columns: [{
        title: 'Name',
        dataIndex: 'name',
        render: text => <a href="">{text}</a>,
      }, {
        title: 'Age',
        dataIndex: 'age',
      }, {
        title: 'Address',
        dataIndex: 'address',
      }],

      data: [{
        key: '1',
        name: 'John Brown',
        age: 32,
        address: 'New York No. 1 Lake Park',
      }, {
        key: '2',
        name: 'Jim Green',
        age: 42,
        address: 'London No. 1 Lake Park',
      }, {
        key: '3',
        name: 'Joe Black',
        age: 32,
        address: 'Sidney No. 1 Lake Park',
      }, {
        key: '4',
        name: 'Disabled User',
        age: 99,
        address: 'Sidney No. 1 Lake Park',
      }],
      rowSelection: {
        onChange: (selectedRowKeys, selectedRows) => {
          console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
        },
        getCheckboxProps: record => ({
          disabled: record.name === 'Disabled User', // Column configuration not to be checked
          name: record.name,
        }),
      }
    };
  }

  render() {
    const {
      rowSelection, columns, data
    } = this.state;
    return (
      <Table rowSelection={rowSelection} columns={columns} dataSource={data} />
    );
  }
}

export default CustomTasks;
