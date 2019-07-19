import React, { Component } from 'react';
import $ from 'jquery';
import axios from 'axios';
import propertiesPanelModule from 'bpmn-js-properties-panel';
import propertiesProviderModule from 'bpmn-js-properties-panel/lib/provider/camunda';
import camundaModdleDescriptor from 'camunda-bpmn-moddle/resources/camunda';
import { getBusinessObject } from 'bpmn-js/lib/util/ModelUtil';
import { isEmpty, isArray, debounce } from 'lodash';
import { message, notification } from 'antd';
import BpmnModeler from './modeler';
import { registerFileDrop } from '../utils';
// import defaultData from '../resources/defaultData';
import { Header, EditingTools } from '../components';
import './Common.less';
import styles from './Bpmn.module.less';

axios.defaults.retry = 4;
axios.defaults.retryDelay = 1000;
export default class Bpmn extends Component {
  constructor() {
    super();
    this.state = {
      scale: 1, // 流程图比例
      isShowPanel: true, // 是否展示propertiesPanel
      isShowFold: false, // 是否展示propertiesPanel
    };
  }

  componentDidMount() {
    const { xml, customData } = window;
    // 初始化模型设计器
    this.bpmnModeler = new BpmnModeler({
      container: '#canvas',
      propertiesPanel: {
        parent: '#properties-panel'
      },
      additionalModules: [propertiesPanelModule, propertiesProviderModule],
      moddleExtensions: {
        camunda: camundaModdleDescriptor
      },
      bpmnRenderer: {
        defaultFillColor: '#fff',
        defaultStrokeColor: 'hotpink'
      },
      keyboard: { bindTo: document }
    });

    console.log('bpmnModeler: ', this.bpmnModeler);

    // 导入xml
    this.openDiagram(xml);

    // 支持bpmn拖拽
    if (!window.FileList || !window.FileReader) {
      message.info('请使用高版本浏览！');
    } else {
      registerFileDrop($('#js-drop-zone')[0], this.openDiagram);
    }

    // * 预先设置扩展属性对象 *
    const preProperties = customData.length && customData.map((item) => {
      const { initProperties } = item;
      const extensions = {
        customType: item.customType, // 定制化任务节点的唯一标识
        general: { // 常规属性
          name: initProperties.name,
        },
        updateProperties: {}
      };
      // 统一处理需要 创建ModdleEelement 的属性
      if (
        initProperties.listener
        || initProperties.inputOutput
        || initProperties.injectField
        || initProperties.extendProperties
        || initProperties.timeCycle
      ) {
        extensions.updateProperties.extensionElements = this.extensionElements(initProperties);
      }
      // 文档 - 元素文档
      if (initProperties.documentation) {
        extensions.updateProperties.documentation = [this.documentation(initProperties)];
      }
      // 详情 - 实现方式
      if (initProperties.class) {
        extensions.general.class = initProperties.class;
      }
      if (initProperties.expression) {
        extensions.general.expression = initProperties.expression;
        extensions.general.resultVariable = initProperties.resultVariable || '';
      }

      if (initProperties.delegateExpression) {
        extensions.general.delegateExpression = initProperties.delegateExpression;
      }

      // 持续异步
      if (initProperties.asyncBefore !== undefined) {
        if (initProperties.jobPriority) {
          extensions.general.jobPriority = initProperties.jobPriority;
        }
        extensions.general.asyncBefore = initProperties.asyncBefore;
        extensions.general.async = initProperties.async;
        extensions.general.exclusive = initProperties.exclusive;
      }
      if (initProperties.asyncAfter !== undefined) {
        extensions.general.asyncAfter = initProperties.asyncAfter;
        extensions.general.async = initProperties.async;
        extensions.general.exclusive = initProperties.exclusive;
        if (initProperties.jobPriority) {
          extensions.general.jobPriority = initProperties.jobPriority;
        }
      }
      return extensions;
    });
    // console.log('preProperties: ', preProperties);

    const modeling = this.bpmnModeler.get('modeling'); // 更新bussinessObject方法
    this.bpmnModeler.on('element.changed', (event) => {
      const { element } = event;
      const { customType } = element;
      const bo = getBusinessObject(element);
      // console.log('event: ', event);
      // console.log('bo: ', bo);

      // id加前缀
      let preId = '';
      if (element && element.parent) {
        preId = element.parent.id;
      }
      if (preId && bo.id.indexOf(preId) === -1) {
        bo.id = `${preId}_${bo.id}`;
      }

      // 获取定制任务属性数据
      const initData = customData.filter(item => item.customType === customType);
      const initProperties = (initData.length && initData[0].initProperties) || {};
      const preProperty = preProperties
        && preProperties.filter(item => item.customType === customType)[0];
      // console.log('preProperty: ', preProperty);

      if (!isEmpty(initProperties) && bo.isNotInit === undefined) {
        // console.log('event: ', event);
        // console.log('id: ', bo.id);
        bo.isNotInit = false;
        // 常规属性
        Object.keys(preProperty.general).forEach((item) => {
          bo[item] = preProperty.general[item];
        });
        // 扩展属性
        modeling.updateProperties(element, preProperty.updateProperties);
      }
    });
  }

  // 创建
  openDiagram = (xml) => {
    const _this = this;
    this.setState({ isShowFold: true });
    this.bpmnModeler.importXML(xml, (err) => {
      if (err) {
        // console.log('err: ', err);
        message.error('模型加载有误！');
      }
      const defaultData = window.customData;
      const eventBus = this.bpmnModeler.get('eventBus');
      // 禁用编辑流程id
      $('#properties-panel').find('#camunda-id').attr('disabled', true);
      // 定制化任务节点禁用拖拽及双击编辑名称
      eventBus.on('directEditing.activate', (event) => {
        const name = event.active.context.text;
        const isHasName = defaultData.filter((item) => {
          return item.initProperties.name === name;
        });
        if (!isEmpty(isHasName)) {
          $('.djs-direct-editing-parent').css('display', 'none');
        }
      });
      eventBus.on('element.dblclick', 10000, (event) => {
        const { element } = event;
        const bo = getBusinessObject(element);
        const { customType } = element;
        const isHasName = defaultData.filter((item) => {
          return item.initProperties.name === bo.name;
        });
        if (customType || !isEmpty(isHasName)) {
          return false;
        }
      });
      // 定制化任务节点禁止编辑id及名称
      eventBus.on('selection.changed', (event) => {
        const { newSelection } = event;
        // console.log('event: ', event);
        if (isEmpty(newSelection)) {
          $('#properties-panel').find('#camunda-id').attr('disabled', true);
          $('#properties-panel').find('#camunda-id').next().css('display', 'none');
        }
        if (newSelection[0]) {
          const shape = newSelection[0];
          const bo = getBusinessObject(shape);
          const { customType } = shape;
          const isHasName = defaultData.filter((item) => {
            return item.initProperties.name === bo.name;
          });
          if (customType || !isEmpty(isHasName)) {
            $('#properties-panel').find('#camunda-name').attr('contenteditable', false);
          }
        }
      });
      // 禁用所有属性（不包括类似 名称的textbox）
      // eventBus.on('propertiesPanel.isPropertyEditable', 10000, (event) => {
      //   // console.log('event: ', event);
      //   const { element } = event;
      //   const bo = getBusinessObject(element);
      //   const { name } = bo;
      //   const isHasName = defaultData.filter((item) => {
      //     return item.initProperties.name === name;
      //   });
      //   if (bo.customType || !isEmpty(isHasName)) {
      //     return false;
      //   }
      // });

      // 显示任务边界
      const transactionBoundaries = _this.bpmnModeler.get('transactionBoundaries');
      transactionBoundaries.hide();

      // 显示自定义任务弹窗
      $('#canvas').on('click', '[data-action="create.add-custom-tasks"]', () => {
        // console.log($(this));
      });
    });
  }

  /*
  * 定制任务，固化属性
  */
  createModdleElement = (type, values) => {
    // console.log('this.bpmnModeler: ', this.bpmnModeler);
    const moddle = this.bpmnModeler.get('moddle'); // 创建ModdleEelement
    return moddle.create(type, values);
  }

  setEelementProperties = (values) => {
    // console.log('values: ', values);
    return values.map((item) => {
      return this.createModdleElement(item.type, item.values);
    });
  }

  // 重试时间周期
  failedJobRetryTimeCycle = (initProperties) => {
    return this.createModdleElement(
      initProperties.timeCycle.type, { body: initProperties.timeCycle.body }
    );
  }

  // 元素文档
  documentation = (initProperties) => {
    return this.createModdleElement(initProperties.documentation.type,
      { text: initProperties.documentation.text });
  }

  // 监听器
  camundaExecutionListener = (initProperties) => {
    return initProperties.listener.map((item) => {
      const fields = item.values.fields
        ? this.setEelementProperties(item.values.fields)
        : undefined;
      item.values.fields = fields;
      return this.createModdleElement(item.type, item.values);
    });
  }

  // 输入输出
  camundaInputOutput = (initProperties) => {
    return this.createModdleElement(initProperties.inputOutput.type,
      {
        inputParameters: initProperties.inputOutput.values.inputParameters
          ? this.setEelementProperties(initProperties.inputOutput.values.inputParameters)
          : [],
        outputParameters: initProperties.inputOutput.values.outputParameters
          ? this.setEelementProperties(initProperties.inputOutput.values.outputParameters)
          : []
      });
  }

  // 字段注入
  camundaInjectField = (initProperties) => {
    return this.setEelementProperties(initProperties.injectField);
  }

  // 扩展属性
  camundaProperties = (initProperties) => {
    return this.createModdleElement(initProperties.extendProperties.type,
      {
        values: initProperties.extendProperties.values
          ? this.setEelementProperties(initProperties.extendProperties.values)
          : []
      });
  }

  // 扩展
  extensionElements = (initProperties) => {
    const values = [];
    if (initProperties.listener) {
      values.push(...(this.camundaExecutionListener(initProperties)));
    }
    if (initProperties.inputOutput) {
      values.push(this.camundaInputOutput(initProperties));
    }
    if (initProperties.injectField) {
      values.push(...(this.camundaInjectField(initProperties)));
    }
    if (initProperties.extendProperties) {
      values.push(this.camundaProperties(initProperties));
    }
    if (initProperties.timeCycle) {
      values.push(this.failedJobRetryTimeCycle(initProperties));
    }
    return this.createModdleElement('bpmn:ExtensionElements', {
      values: [...values]
    });
  }

  // 导入xml文件
  handleOpenFile = (e) => {
    const that = this;
    const file = e.target.files[0];
    const reader = new FileReader();
    let data = '';
    reader.readAsText(file);
    reader.onload = function (event) {
      data = event.target.result;
      that.openDiagram(data, 'open');
    };
  };

  // 保存
  handleSave = () => {
    // 获取边界事件
    // const elementRegistry = this.bpmnModeler.get('elementRegistry');
    // let messages = elementRegistry.filter((element) => {
    //   const bo = getBusinessObject(element);
    //   const eventDefinition = bo.eventDefinitions && bo.eventDefinitions[0];
    //   console.log('element: ', element);
    //   return is(element, 'bpmn:BoundaryEvent')
    //         && !element.labelTarget && eventDefinition.$type === 'bpmn:MessageEventDefinition';
    // });
    // console.log('message1: ', messages);
    // messages = messages.map((element) => {
    //   return getBusinessObject(element).eventDefinitions[0].messageRef;
    // });
    // console.log('message: ', messages);
    notification.destroy();
    const { modelId } = this.state;
    let jsonXml = '';
    let svgXml = '';
    this.bpmnModeler.saveXML({ format: true }, (err, xml) => {
      jsonXml = xml;
    });
    this.bpmnModeler.saveSVG({ format: true }, (err, data) => {
      svgXml = data;
    });
    const formData = {
      jsonXml,
      svgXml,
      modelId
    };
    // console.log('jsonXml: ', jsonXml);
    axios({
      url: '/web/model/v1/saveModel',
      method: 'post',
      data: { ...formData },
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      transformRequest: [(data) => {
        let ret = '';
        for (const it in data) {
          ret += `${encodeURIComponent(it)}=${encodeURIComponent(data[it])}&`;
        }
        return ret;
      }],
    }).then((res) => {
      res = res.data;
      if (res.success) {
        message.success(res.message);
      } else {
        message.error(res.message);
      }
      if (res.data && isArray(res.data) && !isEmpty(res.data)) {
        res.data.forEach((notice) => {
          const args = {
            message: `${notice.activityName || notice.activityId || ''}`,
            description: `${notice.defaultDescription}`,
            duration: 0,
          };
          notification.warn(args);
        });
      }
    }).catch(() => {
      message.error('模型设计保存失败！');
    });
  };

  // 前进
  handleRedo = () => {
    console.log(this.bpmnModeler.get('commandStack'));
    this.bpmnModeler.get('commandStack').redo();
  };

  // 后退
  handleUndo = () => {
    this.bpmnModeler.get('commandStack').undo();
  };

  // 下载xml/svg
  download = (type, data, name) => {
    const { modelId } = this.state;
    let dataTrack = '';
    const a = document.createElement('a');
    switch (type) {
      case 'xml':
        dataTrack = 'bpmn';
        break;
      case 'svg':
        dataTrack = 'svg';
        break;
      default:
        break;
    }
    name = name || `${modelId}_diagram.${dataTrack}`;
    a.setAttribute('href', `data:application/bpmn20-xml;charset=UTF-8,${encodeURIComponent(data)}`);
    a.setAttribute('target', '_blank');
    a.setAttribute('dataTrack', `diagram:download-${dataTrack}`);
    a.setAttribute('download', name);

    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  // 下载SVG格式
  handleDownloadSvg = () => {
    this.bpmnModeler.saveSVG({ format: true }, (err, data) => {
      this.download('svg', data);
    });
  };

  // 下载XML格式
  handleDownloadXml = () => {
    this.bpmnModeler.saveXML({ format: true }, (err, data) => {
      this.download('xml', data);
    });
  };

  // 流程图放大缩小
  handleZoom = (radio) => {
    const { scale } = this.state;
    const newScale = !radio
      ? 1.0 // 不输入radio则还原
      : scale + radio <= 0.2 // 最小缩小倍数
        ? 0.2
        : scale + radio;

    this.bpmnModeler.get('canvas').zoom(newScale);
    this.setState({
      scale: newScale
    });
  };

  // 折叠
  handlePanelFold = () => {
    // console.log('test')
    const { isShowPanel } = this.state;
    this.setState({
      isShowPanel: !isShowPanel,
    }, () => {
    });
  }

  render() {
    const { isShowPanel, isShowFold } = this.state;
    // console.log(isShowPanel);
    return (
      <React.Fragment>
        <Header />
        <div className={styles.container} id="js-drop-zone">
          <div className={styles.canvas} id="canvas" />
          <div
            className={
              `properties-panel-fold
              ${isShowPanel ? '' : 'fold'}
              ${isShowFold ? '' : 'hide'}
              `
            }
            id="js-panel-fold"
            title="折叠"
            onClick={this.handlePanelFold}
          />
          <div
            className={`properties-panel-parent ${isShowPanel ? '' : 'hidePanel'}`}
            id="properties-panel"
            style={{ height: '100%' }}
          />
          <EditingTools
            onOpenFIle={this.handleOpenFile}
            onSave={debounce(this.handleSave, 300)}
            onUndo={this.handleUndo}
            onRedo={this.handleRedo}
            onDownloadSvg={this.handleDownloadSvg}
            onDownloadXml={this.handleDownloadXml}
            onZoomIn={() => this.handleZoom(0.1)}
            onZoomOut={() => this.handleZoom(-0.1)}
            onZoomReset={() => this.handleZoom()}
          />
        </div>
      </React.Fragment>
    );
  }
}
