import inherits from 'inherits';
import ContextPadProvider from 'bpmn-js/lib/features/context-pad/ContextPadProvider';
import { bind } from 'min-dash';

export default function CustomContextPadProvider(injector) {
  injector.invoke(ContextPadProvider, this);
  const cached = bind(this.getContextPadEntries, this);
  this.getContextPadEntries = (element) => {
    const actions = cached(element);
    // 获取定制任务json
    const customJson = window.customData;
    if (customJson.length) {
      // 定制化-删除编辑替换
      customJson.forEach((item) => {
        if (
          element.customType === item.customType
          || (
            element.businessObject.name
            && element.businessObject.name === item.initProperties.name
          )
        ) {
          delete actions.replace;
        }
      });
    }

    return actions;
  };
}

inherits(CustomContextPadProvider, ContextPadProvider);

CustomContextPadProvider.$inject = [
  'injector',
];
