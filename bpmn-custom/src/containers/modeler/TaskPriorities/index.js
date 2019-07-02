import PriorityOverlay from './PriorityOverlay';
// import ColorRenderer from './ColorRenderer';
import ResizeTaskRules from './ResizeTaskRules';

export default {
  __init__: [
    'priorityOverlay',
    'resizeTaskRules',
    // 'colorRenderer'
  ],
  priorityOverlay: ['type', PriorityOverlay],
  // colorRenderer: ['type', ColorRenderer],
  resizeTaskRules: ['type', ResizeTaskRules]
};
