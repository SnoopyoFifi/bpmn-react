import React, { Component } from 'react';
import $ from 'jquery';
import { message } from 'antd';
import BpmnModeler from 'bpmn-js/lib/NavigatedViewer';
import { getBusinessObject } from 'bpmn-js/lib/util/ModelUtil';
import { appendTo as svgAppendTo, create as svgCreate, innerSVG, select } from 'tiny-svg';
import { query as queryDom, attr } from 'min-dom';
import { diagramXML } from '../resources/newDiagram';
import CustomRenderer from './modeler/customRenderer';
import responseData from '../resources/defaultData';
import './Common.less';
import styles from './Bpmn.module.less';

export default class Bpmn extends Component {
  constructor() {
    super();
    this.state = {
      isClick: false,
      id: '',
    };
  }

  componentDidMount() {
    this.bpmnModeler = new BpmnModeler({
      container: '#canvas',
      additionalModules: [
        CustomRenderer,
        // minimapModule,
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
      const overlays = this.bpmnModeler.get('overlays');
      const eventBus = this.bpmnModeler.get('eventBus');
      const elementRegistry = this.bpmnModeler.get('elementRegistry');
      console.log('elementRegistry: ', elementRegistry);

      // zoom to fit full viewport
      canvas.zoom('fit-viewport');

      // get viewbox position

      // custom a red color [marker-start] & [marker-end]
      const svg = canvas._svg;
      const defs1 = svgAppendTo(svgCreate('defs'), svg);
      const defs2 = svgAppendTo(svgCreate('defs'), svg);
      const markerEnd = `
        <marker id="sequenceflow-end-white-red" viewBox="0 0 20 20" refX="11" refY="10" markerWidth="10" markerHeight="10" orient="auto">
          <path d="M 1 5 L 11 10 L 1 15 Z" style="fill: #ff0000; stroke-width: 1px; stroke-linecap: round; stroke-dasharray: 10000, 1; stroke: #ff0000;"></path>
        </marker>
      `;
      const markerStart = `
        <marker id="conditional-flow-marker-white-red" viewBox="0 0 20 20" refX="-1" refY="10" markerWidth="10" markerHeight="10" orient="auto">
          <path d="M 0 10 L 8 6 L 16 10 L 8 14 Z" style="fill: white; stroke-width: 1px; stroke-linecap: round; stroke-dasharray: 10000, 1; stroke: black;"></path>
        </marker>
      `;
      innerSVG(defs1, markerEnd);
      innerSVG(defs2, markerStart);

      responseData.highLights.forEach((item) => {
        canvas.addMarker(item.id, 'needs-discussion');
        // customtask's icon
        if (item.name) {
          // overlays
          overlays.add(item.id, 'note', {
            position: {
              left: 18,
              bottom: 0
            },
            // scale: false,
            scale: { min: 1 },
            show: {
              minZoom: 0.7
            },
            html: '<div class="tagsWrap"><span class="abnormal tag">20</span> <span class="normal tag">20</span></div>'
          });
          responseData.customTasks.forEach((data) => {
            if (data.initProperties.name === item.name) {
              const currentSvgDom = queryDom(`[data-element-id=${item.id}]`);
              const image = select(currentSvgDom, 'image');
              attr(image, 'href', data.imgReplaceDataUrl);
            }
          });
        }

        // change trangle color
        if (item.id.indexOf('SequenceFlow') !== -1) {
          const currentSvgDom = queryDom(`[data-element-id=${item.id}]`);
          const path = select(currentSvgDom, 'path');
          attr(path, 'style', 'fill: none; stroke-width: 2px; stroke: #ff0000; stroke-linejoin: round; marker-end: url("#sequenceflow-end-white-red");');
        }
      });

      // let overlaysId = '';
      eventBus.on('element.click', (e) => {
        // console.log(e);
        const { element } = e;
        // console.log('e: ', e);
        const bo = getBusinessObject(element);
        this.setState({
          isClick: true,
          id: bo.id,
        });
      });

      // eventBus.on('element.out', (e) => {
      //   const { element } = e;
      //   const bo = getBusinessObject(element);
      //   if (bo.name === '文件上传') {
      //     this.setState({
      //       isClick: false
      //     });
      //     // console.log('out: ', e.element.id);
      //     // overlays.remove(overlaysId);
      //   }
      // });
      $(document).on('click', '#execute', () => {
        console.log('test');
      });
    });
  }

  // 设置盒子在中心点周围
  setViewboxCenteredAroundPoint = (point, canvas) => {
    // get cached viewbox to preserve zoom
    const cachedViewbox = canvas.viewbox();
    const cachedViewboxWidth = cachedViewbox.width;
    const cachedViewboxHeight = cachedViewbox.height;

    canvas.viewbox({
      x: point.x - cachedViewboxWidth / 2,
      y: point.y - cachedViewboxHeight / 2,
      width: cachedViewboxWidth,
      height: cachedViewboxHeight
    });
  }

  render() {
    const {
      isClick,
      id
    } = this.state;
    return (
      <React.Fragment>
        <div className={styles.container} id="js-drop-zone">
          <div className={styles.viewer}>
            <div className={styles.handles}>bpmn-viewer</div>
            <div className={styles.canvas} id="canvas" />
          </div>
          <div className={styles.properties}>
            {
              isClick
                ? (
                  <span>current node id: {id}</span>
                )
                : null
            }
          </div>
        </div>
      </React.Fragment>
    );
  }
}
