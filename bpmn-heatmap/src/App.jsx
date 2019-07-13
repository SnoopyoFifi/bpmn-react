import React, { Component } from 'react';
import { diagramXML } from './resources/newDiagram';
import { heatmapdata } from './resources/defaultData';
import EditorBasic from './containers';

class App extends Component {
  render() {
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
