import React, { Component } from 'react';
import { message } from 'antd';
import BpmnModeler from 'bpmn-js/lib/NavigatedViewer';
import { includes } from 'lodash';
import heatmap from 'heatmap.js';
import { diagramXML } from '../resources/newDiagram';
import CustomRenderer from './modeler/customRenderer';
import './Common.less';
import styles from './Bpmn.module.less';

export default class Bpmn extends Component {
  constructor() {
    super();
    this.state = {};
  }

  componentDidMount() {
    this.bpmnModeler = new BpmnModeler({
      container: '#canvas',
      additionalModules: [
        CustomRenderer,
        // lock modeler canvas
        {
          moveCanvas: ['value', ''], // 禁用move Viewport
          zoomScroll: ['value', '']
        }
      ]
    });
    this.createNewDiagram();
  }

  // create
  createNewDiagram = () => {
    this.openDiagram(diagramXML);
  }

  openDiagram = (xml) => {
    this.bpmnModeler.importXML(xml, (err) => {
      if (err) {
        console.log('err: ', err);
        message.error('模型加载有误！');
      }
      const canvas = this.bpmnModeler.get('canvas');
      const elementRegistry = this.bpmnModeler.get('elementRegistry');

      // zoom to fit full viewport
      canvas.zoom('fit-viewport');

      // get viewbox position
      const viewbox = canvas.viewbox();
      const { inner: { height, width, x: X, y: Y } } = viewbox;

      // get all shapes and connections
      const shapes = elementRegistry.filter((element) => {
        return !element.waypoints && element.parent && element.type !== 'label';
      });
      const connections = elementRegistry.filter((element) => {
        return !!element.waypoints && element.parent;
      });

      const shapePoints = [];
      shapes.forEach((shape) => {
        console.log('shape: ', shape);
        const { x, y, width: w, height: h, type } = shape;
        if (includes(type, 'Task')) {
          shapePoints.push(
            {
              x: Math.abs(X - x) - Math.floor(w * 1 / 4) + Math.floor(w / 2),
              y: Math.abs(Y - y) - Math.floor(h * 1 / 4) + Math.floor(h / 2),
              value: 60
            },
            {
              x: Math.abs(X - x) + Math.floor(w * 1 / 4) + Math.floor(w / 2),
              y: Math.abs(Y - y) - Math.floor(h * 1 / 4) + Math.floor(h / 2),
              value: 60
            },
            {
              x: Math.abs(X - x) - Math.floor(w * 1 / 4) + Math.floor(w / 2),
              y: Math.abs(Y - y) + Math.floor(h * 1 / 4) + Math.floor(h / 2),
              value: 60
            },
            {
              x: Math.abs(X - x) + Math.floor(w * 1 / 4) + Math.floor(w / 2),
              y: Math.abs(Y - y) + Math.floor(h * 1 / 4) + Math.floor(h / 2),
              value: 60
            },
            {
              x: Math.abs(X - x) + Math.floor(w / 2),
              y: Math.abs(Y - y) + Math.floor(h / 2),
              value: 60
            }
          );
        } else {
          shapePoints.push(
            {
              x: Math.abs(X - x) + Math.floor(w / 2),
              y: Math.abs(Y - y) + Math.floor(h / 2),
              value: Math.floor(Math.random() * 100)
            }
          );
        }
      });

      const connectionPoints = [];
      connections.forEach((connection) => {
        console.log('connection: ', connection);
        const { waypoints } = connection;
        waypoints.forEach((item) => {
          connectionPoints.push({
            x: Math.abs(X - item.x),
            y: Math.abs(Y - item.y),
            value: 0
          });
        });
        canvas.addMarker(connection.id, 'connection-shadow');
      });

      // heatmap
      const config = {
        container: document.querySelector('.djs-container'),
        width,
        height,
        radius: 46,
        max: 100,
        maxOpacity: 0.5,
        minOpacity: 0,
        blur: 0.75,
        // gradient: {
        //   '.5': '#04ff6e',
        //   '.8': '#ffe900',
        //   '.95': '#ff3c00'
        // }
      };
      const heatmapInstance = heatmap.create(config);
      const points = shapePoints.concat(connectionPoints);
      heatmapInstance.addData(points);
    });
  }

  render() {
    return (
      <React.Fragment>
        <div className={styles.container} id="js-drop-zone">
          <div className={styles.viewer}>
            <div className={styles.handles}>bpmn & heatmap</div>
            <div className={styles.canvas} id="canvas" />
          </div>
        </div>
      </React.Fragment>
    );
  }
}
