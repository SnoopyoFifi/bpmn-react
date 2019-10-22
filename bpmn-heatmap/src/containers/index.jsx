import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { message } from 'antd';
import { event as domEvent, remove, query, attr } from 'min-dom';
import BpmnModeler from 'bpmn-js/lib/NavigatedViewer';
import minimapModule from 'diagram-js-minimap';
import { includes } from 'lodash';
import heatmap from 'heatmap.js';
import CustomRenderer from './modeler/customRenderer';
import EditingTools from './components/EditingTools';
import './Common.less';
import styles from './Bpmn.module.less';

export default class Bpmn extends Component {
  static propTypes = {
    diagramXML: PropTypes.string.isRequired,
    heatmapdata: PropTypes.array.isRequired,
  }

  constructor(props) {
    super(props);
    this.state = {
      scale: 1, // 流程图比例
      defalutScale: 1,
      heatmapInstance: null,
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
    const { diagramXML, heatmapdata } = this.props;
    // console.log('this.props： ', this.props);
    this.openDiagram(diagramXML, heatmapdata);
  }

  // create
  openDiagram = (xml, heatmapdata) => {
    this.bpmnModeler.importXML(xml, (err) => {
      if (err) {
        // console.log('err: ', err);
        message.error('模型加载有误！');
      } else {
        const canvas = this.bpmnModeler.get('canvas');
        canvas.zoom('fit-viewport');
        // console.log('heatmapdata0： ', heatmapdata);
        if (heatmapdata && heatmapdata.length) {
          this.renderHeatmap(canvas);
          domEvent.bind(query('.djs-container'), 'mousemove', () => {
            if (query('.heatmap-canvas')) remove(query('.heatmap-canvas'));
            this.renderHeatmap(canvas);
          });
        } else {
          this.setState({ heatmapInstance: null });
        }
        this.setState({
          defalutScale: canvas.viewbox().scale,
          scale: canvas.viewbox().scale
        });
      }
    });
  }

  // render heatmap
  renderHeatmap = (canvas) => {
    let points = [];
    let heatmapData = {};
    const { heatmapdata } = this.props;
    let { heatmapInstance } = this.state;
    const elementRegistry = this.bpmnModeler.get('elementRegistry');
    const viewbox = canvas.viewbox();

    // get viewbox position & scale
    const {
      inner: { x: oX, y: oY },
      outer: { height: H, width: W },
      x: X, y: Y,
      scale, // zoom rate
    } = viewbox;

    // get all shapes and connections
    const shapes = elementRegistry.filter((element) => {
      return !element.waypoints && element.parent && element.type !== 'label';
    });
    const connections = elementRegistry.filter((element) => {
      return !!element.waypoints && element.parent;
    });
    console.log('viewbox: ', viewbox);
    const shapePoints = [];
    shapes.forEach((shape) => {
      const { x, y, width: w, height: h, type, id } = shape;
      // 适配热力图移出左上方
      const shapeX = x * scale - X * scale + (X < 0 ? (X - oX) * scale : (X > 0 ? (X - oX) * scale : 0)); // eslint-disable-line
      const shapeY = y * scale - Y * scale + (Y > 0 ? (Y - oY) * scale : 0);
      const shapeW = w * scale;
      const shapeH = h * scale;
      heatmapdata.forEach((heat) => {
        const { actId, runCount } = heat;
        if (id === actId) {
          if (includes(type, 'Task')) {
            shapePoints.push( // 务必取整，否则heatmap不渲染
              {
                x: Math.round(Math.abs(shapeX) + Math.floor(shapeW * 1 / 4)),
                y: Math.round(Math.abs(shapeY) + Math.floor(shapeH * 1 / 4)),
                value: runCount
              },
              {
                x: Math.round(Math.abs(shapeX) + Math.floor(shapeW * 1 / 2)),
                y: Math.round(Math.abs(shapeY) + Math.floor(shapeH * 1 / 4)),
                value: runCount
              },
              {
                x: Math.round(Math.abs(shapeX) + Math.floor(shapeW * 3 / 4)),
                y: Math.round(Math.abs(shapeY) + Math.floor(shapeH * 1 / 4)),
                value: runCount
              },
              {
                x: Math.round(Math.abs(shapeX) + Math.floor(shapeW * 1 / 4)),
                y: Math.round(Math.abs(shapeY) + Math.floor(shapeH * 1 / 2)),
                value: runCount
              },
              {
                x: Math.round(Math.abs(shapeX) + Math.floor(shapeW * 1 / 2)),
                y: Math.round(Math.abs(shapeY) + Math.floor(shapeH * 1 / 2)),
                value: runCount
              },
              {
                x: Math.round(Math.abs(shapeX) + Math.floor(shapeW * 3 / 4)),
                y: Math.round(Math.abs(shapeY) + Math.floor(shapeH * 1 / 2)),
                value: runCount
              },
              {
                x: Math.round(Math.abs(shapeX) + Math.floor(shapeW * 1 / 4)),
                y: Math.round(Math.abs(shapeY) + Math.floor(shapeH * 3 / 4)),
                value: runCount
              },
              {
                x: Math.round(Math.abs(shapeX) + Math.floor(shapeW * 1 / 2)),
                y: Math.round(Math.abs(shapeY) + Math.floor(shapeH * 3 / 4)),
                value: runCount
              },
              {
                x: Math.round(Math.abs(shapeX) + Math.floor(shapeW * 3 / 4)),
                y: Math.round(Math.abs(shapeY) + Math.floor(shapeH * 3 / 4)),
                value: runCount
              },
            );
          } else {
            shapePoints.push(
              {
                x: Math.round(Math.abs(shapeX) + Math.floor(shapeW / 2)),
                y: Math.round(Math.abs(shapeY) + Math.floor(shapeH / 2)),
                value: runCount
              }
            );
          }
        }
      });
    });

    const connectionPoints = [];
    connections.forEach((connection) => {
      // console.log('connection: ', connection);
      // const { waypoints } = connection;
      // waypoints.forEach((item) => {
      //   connectionPoints.push({
      //     x: Math.abs(X - item.x),
      //     y: Math.abs(item.y),
      //     value: 0
      //   });
      // });
      canvas.addMarker(connection.id, 'connection-shadow');
    });
    points = shapePoints.concat(connectionPoints);

    if (points.length) {
      // heatmap
      // console.log('points: ', points);
      /*  start legend code */
      const legendCanvas = document.createElement('canvas');
      legendCanvas.width = 100;
      legendCanvas.height = 10;
      const min = document.querySelector('#min');
      const max = document.querySelector('#max');
      const gradientImg = document.querySelector('#gradient');
      const legendCtx = legendCanvas.getContext('2d');
      let gradientCfg = {};

      function handleNum(num, isMax) { // eslint-disable-line
        const str = `${num}`;
        if (!isMax || +num === 0 || num % 10 === 0) {
          return num;
        }
        if (str.length === 1) {
          if (isMax) {
            return 10;
          }
        } else {
          if (num % 10 > 0) { // eslint-disable-line
            return +`${parseInt(num / 10) + 1}0`; // eslint-disable-line
          }
        }
      }
      function updateLegend(data) { // eslint-disable-line
        min.innerHTML = handleNum(data.min, false);
        max.innerHTML = handleNum(data.max, true);
        // regenerate gradient image
        if (data.gradient !== gradientCfg) {
          gradientCfg = data.gradient;
          const gradient = legendCtx.createLinearGradient(0, 0, 100, 1);
          for (const key in gradientCfg) {
            gradient.addColorStop(key, gradientCfg[key]);
          }
          legendCtx.fillStyle = gradient;
          legendCtx.fillRect(0, 0, 100, 10);
          gradientImg.src = legendCanvas.toDataURL();
        }
      }
      /* end the legend code */

      let maxV = '';
      points.forEach((item) => {
        maxV = Math.max(maxV, +item.value);
      });
      const config = {
        container: query('#canvas'),
        width: +W + (X < 0 ? Math.round(+((X - oX) * scale)) : (X > 0 ? -(X - oX) * scale : 0)),
        height: +H + (Y > 0 ? Math.round(+((Y - oY) * scale)) : 0),
        radius: 46,
        // radius: 60,
        // max: 100,
        maxOpacity: 0.8,
        minOpacity: 0,
        blur: 0.75,
        // gradient: {
        //   '.5': '#04ff6e',
        //   '.8': '#ffe900',
        //   '.95': '#ff3c00'
        // }
        onExtremaChange: (data) => {
          if (heatmapdata && heatmapdata.length) {
            updateLegend(data);
          }
        }
      };
      heatmapData = {
        max: maxV,
        data: points,
      };
      heatmapInstance = heatmap.create(config);

      // 当viewbox移出左上方时，调整热力图canvas位置
      // console.log('X: ', X);
      attr(
        query('.heatmap-canvas'),
        'style',
        `
          position: absolute;
          left: ${X < 0 ? -((X - oX) * scale) : (X > 0 ? -(X - oX) * scale : 0)}px;
          top: ${Y > 0 ? -((Y - oY) * scale) : 0}px
        `
      );

      /* tooltip code start */
      const heatWrap = document.querySelector('#canvas');
      const tooltip = document.querySelector('#tooltip');
      function updateTooltip(x, y, value) { // eslint-disable-line
        // + 15 for distance to cursor
        const transl = `translate(${x + 15}px, ${y + 15}px)`;
        tooltip.style.webkitTransform = transl;
        tooltip.innerHTML = value;
      }
      heatWrap.onmousemove = (ev) => {
        // console.log('ev: ', ev);
        const { target: { id } } = ev;
        if (id && id === 'gradient') {
          tooltip.style.display = 'none';
          return false;
        }
        const x = ev.layerX + (X < 0 ? -((X - oX) * scale) : 0);
        const y = ev.layerY + (Y > 0 ? -((Y - oY) * scale) : 0);
        // getValueAt gives us the value for a point p(x/y)
        const value = heatmapInstance.getValueAt({ x, y });
        // console.log(x, y, value);
        tooltip.style.display = 'none';
        updateTooltip(x, y, value);
      };
      // hide tooltip on mouseout
      heatWrap.onmouseout = () => {
        tooltip.style.display = 'none';
      };
      /* tooltip code end */

      // heatmapInstance.repaint();
      heatmapInstance.setData(heatmapData);
      this.setState({ heatmapInstance: null });
    }
  }

  // 流程图放大缩小
  handleZoom = (radio) => {
    const canvas = this.bpmnModeler.get('canvas');
    // const { heatmapdata } = this.props;
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
    if (query('.heatmap-canvas')) remove(query('.heatmap-canvas'));
    // this.renderHeatmap(JSON.parse(JSON.stringify(heatmapdata)), canvas);
    this.renderHeatmap(canvas);
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
        <div className={styles.legend_wrap}>
          <div id="heatmapLegend" className={styles.heatmap_legend}>
            <span id="min" className={styles.legend_min} />
            <img src="" alt="" id="gradient" className={styles.legend_img} />
            <span id="max" className={styles.legend_max} />
          </div>
        </div>
        <div className={styles.tooltip} id="tooltip" />
      </div>
    );
  }
}
