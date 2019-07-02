import inherits from 'inherits';
import BaseRenderer from 'diagram-js/lib/draw/BaseRenderer';
import { append as svgAppend, create as svgCreate } from 'tiny-svg';
import defaultData from '../../../resources/defaultData';

export default function CustomRenderer(eventBus) {
  BaseRenderer.call(this, eventBus, 1500);

  this.canRender = (element) => {
    const bo = element.businessObject;
    // console.log('element: ', element);
    if (bo) {
      const customShapeData = defaultData.customTasks.filter(
        item => item.customType === element.customType
        || (bo.name && bo.name === item.initProperties.name)
      )[0];
      if (customShapeData) {
        // console.log('customShapeData: ', customShapeData);
        return true;
      }
    }
  };

  this.drawShape = (parent, shape) => {
    // console.log('shape: ', shape);
    const bo = shape.businessObject;
    let href = '';
    if (bo) {
      const customShapeData = defaultData.customTasks.filter(
        item => item.customType === shape.customType
        || (bo.name && bo.name === item.initProperties.name)
      )[0];
      if (customShapeData) {
        // console.log('customShapeData12: ', customShapeData);
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
