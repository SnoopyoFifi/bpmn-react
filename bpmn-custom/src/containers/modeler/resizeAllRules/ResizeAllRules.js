import RuleProvider from 'diagram-js/lib/features/rules/RuleProvider';

import inherits from 'inherits';

const HIGH_PRIORITY = 1500;

export default function ResizeAllRules(eventBus) {
  RuleProvider.call(this, eventBus);
}

inherits(ResizeAllRules, RuleProvider);

ResizeAllRules.$inject = ['eventBus'];

ResizeAllRules.prototype.init = function () {
  this.addRule('shape.resize', HIGH_PRIORITY, (context) => {
    const { shape } = context;
    // 支持调整大小（非流程连接线）
    if (shape.type === 'bpmn:SequenceFlow') {
      // cannot resize custom elements
      return false;
    } else {
      return true;
    }
  });
};
