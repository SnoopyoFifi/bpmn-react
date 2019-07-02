import RuleProvider from 'diagram-js/lib/features/rules/RuleProvider';
import inherits from 'inherits';
import { is } from 'bpmn-js/lib/util/ModelUtil';

export default function ResizeTaskRules(eventBus) {
  RuleProvider.call(this, eventBus);
}

inherits(ResizeTaskRules, RuleProvider);

ResizeTaskRules.prototype.init = function () {
  this.addRule('shape.resize', 1500, (context) => {
    if (is(context.shape, 'bpmn:Activity')) {
      return true;
    }
  });
};
