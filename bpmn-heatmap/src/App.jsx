import React, { Component } from 'react';
import { diagramXML } from './resources/newDiagram';
import EditorBasic from './containers';

class App extends Component {
  render() {
    const heatmapdata = [
      { actId: 'Process_1_Task_0fj7yth', runCount: 20 },
      { actId: 'Process_1_ServiceTask_167mzpf', runCount: 20 },
    ];
    return (
      <div style={{ height: '100%', overflow: 'auto' }}>
        <EditorBasic
          heatmapdata={heatmapdata}
          diagramXML={diagramXML}
        />
      </div>
    );
  }
}

export default App;
