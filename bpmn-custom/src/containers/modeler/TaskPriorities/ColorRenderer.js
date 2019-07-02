import inherits from 'inherits';
import { is, getBusinessObject } from 'bpmn-js/lib/util/ModelUtil';
import BpmnRenderer from 'bpmn-js/lib/draw/BpmnRenderer';
import { attr as svgAttr } from 'tiny-svg';

export default function ColorRenderer(eventBus, styles, pathMap, canvas, priority) {
  BpmnRenderer.call(this, eventBus, styles, pathMap, canvas, priority || 1200);
  const originalDrawShape = this.drawShape;

  this.drawShape = function (visuals, element) {
    let bo = {};
    let color = '';
    const result = originalDrawShape.call(this, visuals, element);
    if (is(element, 'bpmn:Activity')) {
      bo = getBusinessObject(element);
      color = bo.get('tp:color');

      if (color) {
        svgAttr(result, 'fill', color);
      }
    }

    return result;
  };
}

inherits(ColorRenderer, BpmnRenderer);

ColorRenderer.$inject = [
  'eventBus',
  'styles',
  'pathMap',
  'canvas',
];
