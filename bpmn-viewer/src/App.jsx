import React, { Component } from 'react';
import EditorBasic from './containers';
import { highlightData, customTasks, overlaysData } from './resources/defaultData';
import { message } from '../../bpmn-heatmap/node_modules/antd/lib';

class App extends Component {
  getParams = (params) => {
    console.log('params: ', params);
    const { currentNodeCode } = params;
    message.info(`currentnodeCode: ${currentNodeCode}`);
  }

  render() {
    return (
      <div style={{ height: '100%', overflow: 'auto' }}>
        <EditorBasic
          getParams={this.getParams}
          customTasks={customTasks}
          overlaysData={overlaysData}
          highlightData={highlightData}
        />
      </div>
    );
  }
}

export default App;
