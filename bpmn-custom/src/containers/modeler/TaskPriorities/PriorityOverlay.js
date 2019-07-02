import {
  domify,
  query as domQuery,
  classes as domClasses,
} from 'min-dom';

import { is, getBusinessObject } from 'bpmn-js/lib/util/ModelUtil';

export default function PriorityOverlay(eventBus, canvas) {
  const container = canvas._container;

  const overlay = domify('<div class="tp-priorities">Priority: <span class="tp-value">-1</span></div>');

  container.appendChild(overlay);

  const defaultWidth = 100;
  const defaultHeight = 80;

  const self = this;

  let reactOnHover = true;

  this.update = function (shape, dimensions) {
    let priority = -1;
    let colored = false;
    if (is(shape, 'bpmn:Activity')) {
      dimensions = dimensions || shape;
      priority = (dimensions.width * dimensions.height)
        / (defaultWidth * defaultHeight) * 5;

      const bo = getBusinessObject(shape);
      colored = bo.get('tp:color');

      // trim to 3 digits
      priority = Math.round(priority * 1000 * (colored ? 10 : 1));

      bo.set('tp:priority', priority);
    }

    const valueNode = domQuery('.tp-value', overlay);

    domClasses(valueNode).toggle('high', priority > 15000);

    valueNode.textContent = priority;
  };

  eventBus.on('resize.move', 500, (event) => {
    const { context } = event;
    const { shape, newBounds } = context;

    self.update(shape, newBounds);
  });

  eventBus.on('resize.start', () => {
    reactOnHover = false;
  });

  eventBus.on('resize.cleanup', () => {
    reactOnHover = true;
  });

  eventBus.on('selection.changed', (event) => {
    self.update(event.newSelection[0]);
  });

  eventBus.on('element.hover', (event) => {
    if (reactOnHover) {
      self.update(event.element);
    }
  });
}
