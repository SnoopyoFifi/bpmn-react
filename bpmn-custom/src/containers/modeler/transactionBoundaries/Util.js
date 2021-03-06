import { isObject } from 'min-dash';

/**
 * Convert the given bounds to a { top, left, bottom, right } descriptor.
 *
 * @param {Bounds|Point} bounds
 *
 * @return {Object}
 */
export function asTRBL(bounds) {
  return {
    top: bounds.y,
    right: bounds.x + (bounds.width || 0),
    bottom: bounds.y + (bounds.height || 0),
    left: bounds.x
  };
}


// orientation utils //////////////////////////////

/**
 * Get orientation of the given rectangle with respect to
 * the reference rectangle.
 *
 * A padding (positive or negative) may be passed to influence
 * horizontal / vertical orientation and intersection.
 *
 * @param {Bounds} rect
 * @param {Bounds} reference
 * @param {Point|Number} padding
 *
 * @return {String} the orientation; one of top, top-left, left, ..., bottom, right or intersect.
 */
export function getOrientation(rect, reference, padding) {
  padding = padding || 0;

  // make sure we can use an object, too
  // for individual { x, y } padding
  if (!isObject(padding)) {
    padding = { x: padding, y: padding };
  }


  const rectOrientation = asTRBL(rect);
  const referenceOrientation = asTRBL(reference);

  const top = rectOrientation.bottom + padding.y <= referenceOrientation.top;
  const right = rectOrientation.left - padding.x >= referenceOrientation.right;
  const bottom = rectOrientation.top - padding.y >= referenceOrientation.bottom;
  const left = rectOrientation.right + padding.x <= referenceOrientation.left;

  const vertical = top ? 'top' : (bottom ? 'bottom' : null);
  const horizontal = left ? 'left' : (right ? 'right' : null);

  if (horizontal && vertical) {
    return `${vertical}-${horizontal}`;
  } else {
    return horizontal || vertical || 'intersect';
  }
}
