/*
 * @Author: Snoopy
 * @ 功能：支持键盘常用操作
 */

import KeyboardModule from 'diagram-js/lib/features/keyboard';

import BpmnKeyBindings from './BpmnKeyBindings';

export default {
  __depends__: [
    KeyboardModule
  ],
  __init__: ['bpmnKeyBindings'],
  bpmnKeyBindings: ['type', BpmnKeyBindings]
};
