/*
 * @Author: Snoopy
 * @功能：自定义左侧面板
 */
import PaletteModule from './palette';
import CustomPalette from './CustomPalette';
import CustomContextPadProvider from './CustomContextPadProvider';
import CustomRenderer from './CustomRenderer';

export default {
  __depends__: [
    PaletteModule
  ],
  __init__: [
    'contextPadProvider',
    'customRenderer',
    'paletteProvider'
  ],
  contextPadProvider: ['type', CustomContextPadProvider],
  customRenderer: ['type', CustomRenderer],
  paletteProvider: ['type', CustomPalette]
};
