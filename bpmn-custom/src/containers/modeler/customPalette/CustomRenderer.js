import inherits from 'inherits';
import BaseRenderer from 'diagram-js/lib/draw/BaseRenderer';
import { append as svgAppend, create as svgCreate } from 'tiny-svg';

export default function CustomRenderer(eventBus) {
  BaseRenderer.call(this, eventBus, 1500);
  // 获取定制任务json
  const customJson = window.customData;
  // 当前拖拽任务节点为定制任务节点，则可渲染该节点
  this.canRender = (element) => {
    const bo = element.businessObject;
    if (bo) {
      const customShapeData = customJson.filter(
        item => item.customType === element.customType
        || (bo.name && bo.name === item.initProperties.name)
      )[0];
      if (customShapeData) {
        return true;
      }
    }
  };

  // 在canvas中渲染当前定制节点
  this.drawShape = (parent, shape) => {
    const bo = shape.businessObject;
    let href = '';
    if (bo) {
      const customShapeData = customJson.filter(
        item => item.customType === shape.customType
        || (bo.name && bo.name === item.initProperties.name)
      )[0];
      if (customShapeData) {
        href = customShapeData.imgDataUrl;
      }
    }

    const customGfx = svgCreate('image', {
      x: 0,
      y: 0,
      width: shape.width,
      height: shape.height,
      href
    });


    svgAppend(parent, customGfx);

    return customGfx;
  };
}

inherits(CustomRenderer, BaseRenderer);

CustomRenderer.$inject = ['eventBus'];
