import React, { Component } from 'react';
import { Spin } from 'antd';
import BpmnModeler from './containers';
import defaultData from './resources/defaultData';
import diagramXML from './resources/newDiagram';

class App extends Component {
  constructor() {
    super();
    this.state = {
      isCustomLoaded: false,
      isXmlLoaded: false,
    };
  }

  componentWillMount() {
    // 获取自定义任务json
    window.xml = diagramXML;
    window.customData = defaultData; // 或者存 localstorage 中
    this.setState({ isCustomLoaded: true, isXmlLoaded: true });
  }

  render() {
    const { isCustomLoaded, isXmlLoaded } = this.state;
    return (
      <div style={{ height: '100%', width: '100%', overflow: 'hidden' }}>
        {
          !isCustomLoaded || !isXmlLoaded
            ? <Spin tip="玩命加载中..." /> : <BpmnModeler />
        }
      </div>
    );
  }
}

export default App;
