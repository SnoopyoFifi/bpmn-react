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
    window.customData = defaultData;
    this.setState({ isCustomLoaded: true, isXmlLoaded: true });
  }

  render() {
    const { isCustomLoaded, isXmlLoaded } = this.state;
    // const { xml, customData } = window;
    // console.log(isCustomLoaded, isXmlLoaded, xml, customData);
    return (
      <div style={{ height: '100%', width: '100%', overflow: 'hidden' }}>
        {
          !isCustomLoaded || !isXmlLoaded
            ? <Spin tip="模型玩命加载中..." /> : <BpmnModeler />
        }
      </div>
    );
  }
}

export default App;
