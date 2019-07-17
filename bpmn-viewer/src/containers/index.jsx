import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { has, includes } from 'lodash';
import { message } from 'antd';
import BpmnModeler from 'bpmn-js/lib/NavigatedViewer';
import minimapModule from 'diagram-js-minimap';
import { getBusinessObject } from 'bpmn-js/lib/util/ModelUtil';
import { query as queryDom, attr } from 'min-dom';
import { appendTo as svgAppendTo, create as svgCreate, innerSVG, select } from 'tiny-svg';
import EditingTools from '../components/EditingTools';
import CustomRenderer from './modeler/customRenderer';
import { diagramXML } from '../resources/newDiagram';
import './Common.less';
import styles from './Bpmn.module.less';

export default class Bpmn extends Component {
  static propTypes = {
    customTasks: PropTypes.array.isRequired,
    getParams: PropTypes.func,
    overlaysData: PropTypes.array,
    highlightData: PropTypes.array,
  }

  constructor() {
    super();
    this.state = {
      scale: 1,
      defalutScale: 1,
    };
  }

  componentDidMount() {
    this.bpmnModeler = new BpmnModeler({
      container: '#canvas',
      additionalModules: [
        CustomRenderer,
        minimapModule,
        // lock modeler canvas
        {
          // moveCanvas: ['value', ''], // 禁用move Viewport
          zoomScroll: ['value', '']
        }
      ]
    });
    this.openDiagram(diagramXML);
  }

  openDiagram = (xml) => {
    this.bpmnModeler.importXML(xml, (err) => {
      if (err) {
        // console.log('err: ', err);
        message.error('模型加载有误！');
      }
      const canvas = this.bpmnModeler.get('canvas');
      const overlays = this.bpmnModeler.get('overlays');
      const eventBus = this.bpmnModeler.get('eventBus');
      const elementRegistry = this.bpmnModeler.get('elementRegistry');
      const elements = elementRegistry.getAll();

      this.setState({
        defalutScale: canvas.viewbox().scale,
        scale: canvas.viewbox().scale
      });

      const { customTasks } = this.props;
      const nodeCodes = [];
      elements.forEach((element) => {
        if (!element.waypoints && element.parent && element.type !== 'label') {
          nodeCodes.push(element.id);
        }
      });
      // console.log('elements: ', nodeCodes);

      // console.log('canvas: ', canvas);
      // zoom to fit full viewport
      canvas.zoom('fit-viewport');
      // overlay
      if (has(this.props, 'overlaysData')) {
        const { overlaysData } = this.props;
        // console.log('overlaysData: ', overlaysData);
        // console.log(overlays, overlaysData);
        const viewbox = canvas.viewbox();
        // console.log('viewbox: ', viewbox);
        // get viewbox position & scale
        const {
          scale, // zoom rate
        } = viewbox;
        // overlays
        if (overlaysData.length) {
          overlaysData.forEach((item) => {
            nodeCodes.forEach((nodeCode) => {
              if (nodeCode === item.nodeCode) {
                const element = elementRegistry.get(nodeCode);
                const { width } = element;
                overlays.add(item.nodeCode, 'note', {
                  position: {
                    left: 0,
                    bottom: 16
                  },
                  // scale: false,
                  scale: { min: 1 },
                  show: {
                    minZoom: 0.7
                  },
                  html: `<div class="tagsWrap" style="width: ${Math.floor(width * scale)}px">
                          <span class="abnormal tag">
                            <i class="icon iconfont icon-warning-circle-fill"></i>
                            <span>${item.failInstCount}</span>
                          </span>
                          <span class="normal tag">
                            <i class="icon iconfont icon-warning-circle-fill"></i>
                            <span>${item.passInstCount}</span>
                          </span>
                        </div>`
                });
              }
            });
            // if (item.nodeCode) {
            //   console.log('nodeCode: ', item.nodeCode);
            // }
          });
        }
        const shapes = elementRegistry.filter((element) => {
          return !element.waypoints && element.parent && element.type !== 'label';
          // return element.type === 'bpmn:UserTask' || element.type === 'bpmn:ReceiveTask';
        });
        const { getParams } = this.props;
        eventBus.on('element.click', (e) => {
          const { element } = e;
          // console.log('element: ', element);
          const bo = getBusinessObject(element);
          const { id, name } = bo;

          if (
            !element.waypoints && element.parent && element.type !== 'label'
          ) {
            if (canvas.hasMarker(id, 'selected')) {
              canvas.addMarker(id, 'needs-discussion');
              customTasks.forEach((item) => {
                // console.log('item: ', item);
                if (item.initProperties.name === name) {
                  // console.log('item.imgDataUrl: ', item.imgDataUrl);
                  // console.log(queryDom(`g[data-element-id=${id}] image`));
                  attr(queryDom(`g[data-element-id=${id}] image`), 'href', item.imgSelectedDataUrl);
                }
              });
              getParams({ currentNodeCode: id });
            } else {
              canvas.removeMarker(id, 'needs-discussion');
              customTasks.forEach((item) => {
                // console.log('item: ', item);
                if (item.initProperties.name === name) {
                  attr(queryDom(`g[data-element-id=${id}] image`), 'href', item.imgDataUrl);
                  // console.log('item.imgDataUrl: ', item.imgDataUrl);
                  // console.log(queryDom(`g[data-element-id=${id}] image`));
                }
              });
              getParams({});
            }
          }
          shapes.forEach((shape) => {
            if (
              canvas.hasMarker(shape.id, 'needs-discussion') && id !== shape.id
              && (!element.waypoints && element.parent && element.type !== 'label')
            ) {
              canvas.removeMarker(shape.id, 'needs-discussion');
              customTasks.forEach((item) => {
                if (item.initProperties.name === shape.businessObject.name) {
                  attr(queryDom(`g[data-element-id=${shape.id}] image`), 'href', item.imgDataUrl);
                }
              });
            }
          });
        });
      }

      // highlight
      if (has(this.props, 'highlightData')) {
        // custom [marker-start] & [marker-end]
        const svg = canvas._svg;
        const defsMarkerEnd = svgAppendTo(svgCreate('defs'), svg);
        const defsMarkerStartFlow = svgAppendTo(svgCreate('defs'), svg);
        const defsMarkerStartDefault = svgAppendTo(svgCreate('defs'), svg);
        const markerEndCustom = `
          <marker id="sequenceflow-end-white-custom" viewBox="0 0 20 20" refX="11" refY="10" markerWidth="10" markerHeight="10" orient="auto">
            <path d="M 1 5 L 11 10 L 1 15 Z" style="fill: hotpink; stroke-width: 1px; stroke-linecap: round; stroke-dasharray: 10000, 1; stroke: hotpink;"></path>
          </marker>
        `;
        const markerStartFlow = `
          <marker id="conditional-flow-marker-white-custom" viewBox="0 0 20 20" refX="-1" refY="10" markerWidth="10" markerHeight="10" orient="auto">
            <path d="M 0 10 L 8 6 L 16 10 L 8 14 Z" style="fill: white; stroke-width: 1px; stroke-linecap: round; stroke-dasharray: 10000, 1; stroke: hotpink;"></path>
          </marker>
        `;
        const markerStartDefault = `
          <marker id="conditional-default-flow-marker-white-custom" viewBox="0 0 20 20" refX="-1" refY="10" markerWidth="10" markerHeight="10" orient="auto">
            <path d="M 6 4 L 10 16" style="fill: white; stroke-width: 1px; stroke-linecap: round; stroke-dasharray: 10000, 1; stroke: hotpink;"></path>
          </marker>
        `;
        innerSVG(defsMarkerEnd, markerEndCustom);
        innerSVG(defsMarkerStartFlow, markerStartFlow);
        innerSVG(defsMarkerStartDefault, markerStartDefault);

        const { highlightData } = this.props;
        highlightData.forEach((item) => {
          canvas.addMarker(item.id, 'needs-discussion');
          // change trangle color
          if (item.id.indexOf('SequenceFlow') !== -1) {
            const currentSvgDom = queryDom(`[data-element-id=${item.id}]`);
            const path = select(currentSvgDom, 'path');
            // console.log('path: ', path.style);
            if (has(path.style, 'markerStart') && path.style.markerStart) {
              if (includes(path.style.markerStart, 'conditional-flow-marker-white-black')) {
                attr(
                  path,
                  'style',
                  `fill: none; stroke-width: 2px; stroke: #ff0000;stroke-linejoin: round;
                  marker-end: url("#sequenceflow-end-white-custom");
                  marker-start: url("#conditional-flow-marker-white-custom");`
                );
              }
              if (includes(path.style.markerStart, 'conditional-default-flow-marker-white-black')) {
                console.log('markerEnd: ', path.style.markerStart);
                attr(
                  path,
                  'style',
                  `fill: none; stroke-width: 2px; stroke: #ff0000;stroke-linejoin: round;
                  marker-end: url("#sequenceflow-end-white-custom");
                  marker-start: url("#cconditional-default-flow-marker-white-custom");`
                );
              }
            } else {
              // console.log('path: ', path.style);
              attr(
                path,
                'style',
                `fill: none; stroke-width: 2px; stroke: hotpink; stroke-linejoin: round;
                marker-end: url("#sequenceflow-end-white-custom");`
              );
            }
            // attr(path, 'style', 'fill: none; stroke-width: 2px; stroke: #ff0000;
            // stroke-linejoin: round; marker-end: url("#sequenceflow-end-white-custom");');
          }
          customTasks.forEach((data) => {
            if (data.initProperties.name === item.name) {
              const currentSvgDom = queryDom(`[data-element-id=${item.id}]`);
              const image = select(currentSvgDom, 'image');
              attr(image, 'href', data.imgSelectedDataUrl);
            }
          });
        });
      }
    });
  }

  // 流程图放大缩小
  handleZoom = (radio) => {
    const { scale, defalutScale } = this.state;
    const newScale = !radio
      ? defalutScale // 不输入radio则还原
      : scale + radio <= 0.2 // 最小缩小倍数
        ? 0.2
        : scale + radio;

    this.bpmnModeler.get('canvas').zoom(newScale);
    this.setState({
      scale: newScale
    });
  };

  render() {
    return (
      <div className={styles.container} id="js-drop-zone">
        <div className={styles.canvas} id="canvas" />
        <EditingTools
          onZoomIn={() => this.handleZoom(0.1)}
          onZoomOut={() => this.handleZoom(-0.1)}
          onZoomReset={() => this.handleZoom()}
        />
      </div>
    );
  }
}
