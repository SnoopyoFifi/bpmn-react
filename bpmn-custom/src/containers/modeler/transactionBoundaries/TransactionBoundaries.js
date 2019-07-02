import {
  forEach,
  assign
} from 'min-dash';

import { getOrientation } from './Util';

export default function TransactionBoundaries(elementRegistry, overlays, eventBus) {
  this._overlays = overlays;
  this._elementRegistry = elementRegistry;

  this.active = false;

  const self = this;

  // 边界标注显示、隐藏
  eventBus.on('elements.changed', () => {
    if (self.active) {
      self.hide();
      self.show();
    }
  });
}

TransactionBoundaries.$inject = ['elementRegistry', 'overlays', 'eventBus'];


/**
 * Get the transaction boundaries for the given element
 *
 * The following BPMN elements are always wait states
 * and have a boundary for incoming connections:
 *
 * - Intermediate Catching Message Event
 * - Intermediate Catching Timer Event
 * - Intermediate Catching Signal Event
 * - Intermediate Catching Conditional Event
 * - Receive Task
 * - User Task
 * - Event Based Gateway
 * - External Service Task
 *
 * Furthermore all activities which have asynchronous
 * continuations act as transaction boundaries. This
 * is also valid for multi-instance activities.
 *
 * Learn more about transactions and wait states:
 * https://docs.camunda.org/manual/latest/user-guide/process-engine/transactions-in-processes/
 *
 * @param  {djs.shape} element
 *
 * @return {object|undefined}  an object with boolean properties 'before' and 'after'
 *
 * @example:
 * A plain task with the camunda:asyncAfter extension attribute set
 * has a transaction boundary after itself. This will return the following:
 * { before: false, after: true }
 */
TransactionBoundaries.prototype._getTransactionBoundaries = function (element) {
  const { businessObject } = element;
  const { loopCharacteristics, eventDefinitions } = businessObject;
  const eventDefinitionType = eventDefinitions && businessObject.eventDefinitions[0].$type;

  const isWaitStateTask = element.type === 'bpmn:ReceiveTask' || element.type === 'bpmn:UserTask'
        || (element.type === 'bpmn:ServiceTask' && businessObject.type === 'external');

  const isWaitStateGateway = element.type === 'bpmn:EventBasedGateway';

  const isWaitStateEvent = element.type === 'bpmn:IntermediateCatchEvent' && (
    eventDefinitionType === 'bpmn:MessageEventDefinition'
    || eventDefinitionType === 'bpmn:TimerEventDefinition'
    || eventDefinitionType === 'bpmn:SignalEventDefinition'
    || eventDefinitionType === 'bpmn:ConditionalEventDefinition'
  );

  const isAsyncAfter = businessObject.asyncAfter
    || (loopCharacteristics && loopCharacteristics.asyncAfter);

  const isAsyncBefore = businessObject.asyncBefore
    || (loopCharacteristics && loopCharacteristics.asyncBefore);

  const boundariesBefore = isWaitStateTask
    || isWaitStateEvent
    || isWaitStateGateway
    || isAsyncBefore;
  const boundariesAfter = isAsyncAfter;

  if (boundariesBefore || boundariesAfter) {
    return { before: !!boundariesBefore, after: !!boundariesAfter };
  }
};


/**
 * Get all elements which have a transaction boundary.
 *
 * @return {object}
 */
TransactionBoundaries.prototype._getTransactionBoundaryElements = function () {
  const transactionBoundaryElements = [];

  const self = this;

  this._elementRegistry.forEach((element) => {
    if (element.type === 'label') {
      return;
    }

    const transactionBoundaries = self._getTransactionBoundaries(element);

    if (transactionBoundaries) {
      transactionBoundaryElements.push(
        assign({ shape: element }, { boundaries: transactionBoundaries })
      );
    }
  });
  return transactionBoundaryElements;
};


/**
 * Add a transaction boundary overlay on the shape at the correct trbl position.
 *
 * @param {djs.model.Shape} shape
 * @param {Point} waypoint
 */
TransactionBoundaries.prototype._addOverlay = function (shape, waypoint) {
  let orientation = getOrientation(waypoint, shape, -7);

  if (orientation === 'intersect') {
    // Try again using a bigger padding to get an orientation which is not 'intersect'.
    // Otherwise the boundary would not be visible if the connection is attached on the
    // diagonal edge of a gateway. Not perfect, but much better than showing no overlay at all.
    orientation = getOrientation(waypoint, shape, -20);
  }

  const strokeWidth = 3;
  const defaultLength = 20;
  const margin = 0;

  const position = {};
  let height;
  let width;

  // if orientation is either 'left', 'top-left' or 'bottom-left'
  if (/left/.test(orientation)) {
    width = strokeWidth;
    height = defaultLength;

    // horizontal position: at the left border respecting margin
    // vertical position: centered at the connection waypoint
    position.left = -width - margin;
    position.top = waypoint.y - shape.y - defaultLength / 2;

  // if orientation is either 'right', 'top-right' or 'bottom-right'
  } else if (/right/.test(orientation)) {
    width = strokeWidth;
    height = defaultLength;

    // horizontal position: at the right border respecting margin
    // vertical position: centered at the connection waypoint
    position.right = shape.x + shape.width - waypoint.x - margin;
    position.top = waypoint.y - shape.y - defaultLength / 2;
  } else if (orientation === 'top') {
    width = defaultLength;
    height = strokeWidth;

    // horizontal position: centered at the connection waypoint
    // vertical position: at the top border respecting margin
    position.left = waypoint.x - shape.x - defaultLength / 2;
    position.top = -height - margin;
  } else if (orientation === 'bottom') {
    width = defaultLength;
    height = strokeWidth;

    // horizontal position: centered at the connection waypoint
    // vertical position: at the bottom border respecting margin
    position.bottom = -margin;
    position.left = waypoint.x - shape.x - defaultLength / 2;
  }

  this._overlays.add(shape, 'transaction-boundaries', {
    position,
    html: `<div style="width: ${width}px; height: ${height}px; background: #ee0000; "> </div>`
  });
};


/**
 * Create overlays for all transaction boundaries.
 */
TransactionBoundaries.prototype.show = function () {
  const transactionBoundaryElements = this._getTransactionBoundaryElements();

  const self = this;

  forEach(transactionBoundaryElements, (element) => {
    if (element.boundaries.before) {
      if (element.shape.incoming.length > 0) {
        forEach(element.shape.incoming, (connection) => {
          if (connection.type !== 'bpmn:SequenceFlow') {
            return;
          }

          // last waypoint of the incoming connection
          const waypoint = connection.waypoints[connection.waypoints.length - 1];

          self._addOverlay(element.shape, waypoint);
        });
      } else {
        // no incoming connection, calculate position in the front
        self._addOverlay(element.shape, {
          x: element.shape.x,
          y: element.shape.y + element.shape.height / 2
        });
      }
    }

    if (element.boundaries.after) {
      if (element.shape.outgoing.length > 0) {
        forEach(element.shape.outgoing, (connection) => {
          if (connection.type !== 'bpmn:SequenceFlow') {
            return;
          }

          // first waypoint of the outgoing connection
          const waypoint = connection.waypoints[0];

          self._addOverlay(element.shape, waypoint);
        });
      } else {
        // no outgoing connection, calculate position after element
        self._addOverlay(element.shape, {
          x: element.shape.x + element.shape.width,
          y: element.shape.y + element.shape.height / 2
        });
      }
    }
  });
  this.active = true;
};


/**
 * Remove all transaction boundary overlays.
 */
TransactionBoundaries.prototype.hide = function () {
  this._overlays.remove({ type: 'transaction-boundaries' });

  this.active = false;
};


/**
 * Toggle the visibility of transaction boundaries.
 */
TransactionBoundaries.prototype.toggle = function () {
  this.active ? this.hide() : this.show(); // eslint-disable-line
};
