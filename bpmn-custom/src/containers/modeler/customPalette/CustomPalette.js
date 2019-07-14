import { assign } from 'min-dash';

/**
 * A palette that allows you to create BPMN _and_ custom elements.
 */
export default class CustomPalette {
  constructor(
    palette, create, elementFactory, spaceTool,
    lassoTool, handTool, globalConnect, translate
  ) {
    this.create = create;
    this.elementFactory = elementFactory;
    this.spaceTool = spaceTool;
    this.lassoTool = lassoTool;
    this.handTool = handTool;
    this.globalConnect = globalConnect;
    this.translate = translate;
    palette.registerProvider(this);
  }

  getPaletteEntries = () => {
    const actions = [];
    const {
      create,
      elementFactory,
      translate,
      spaceTool,
      lassoTool,
      handTool,
      globalConnect,
    } = this;

    // 获取定制任务json
    const customJson = window.customData;
    function createAction(type, group, className, title, options, customType) {
      function createListener(event) {
        const shape = elementFactory.createShape(assign({ type }, options, { customType }));

        if (options) {
          shape.businessObject.di.isExpanded = options.isExpanded;
        }

        create.start(event, shape);
      }

      const shortType = type.replace(/^bpmn:/, '');
      const action = {
        group,
        className,
        title: (title && translate(title)) || translate(`Create ${shortType}`),
        action: {
          dragstart: createListener,
          click: createListener
        }
      };

      if (customType) {
        // console.log(options);
        customJson.forEach((item) => {
          if (item.customType === customType) {
            action.imageUrl = options.imageUrl;
          }
        });
      }
      return action;
    }

    function createParticipant(event, collapsed) {
      create.start(event, elementFactory.createParticipantShape(collapsed));
    }

    assign(actions, [
      {
        title: translate('Tools'),
        group: 'tools',
        children: [
          {
            id: 'hand-tool',
            group: 'tools',
            className: 'bpmn-icon-hand-tool',
            title: translate('Activate the hand tool'),
            action: {
              click: (event) => {
                handTool.activateHand(event);
              }
            }
          },
          {
            id: 'lasso-tool',
            group: 'tools',
            className: 'bpmn-icon-lasso-tool',
            title: translate('Activate the lasso tool'),
            action: {
              click: (event) => {
                lassoTool.activateSelection(event);
              }
            }
          },
          {
            id: 'space-tool',
            group: 'tools',
            className: 'bpmn-icon-space-tool',
            title: translate('Activate the create/remove space tool'),
            action: {
              click: (event) => {
                spaceTool.activateSelection(event);
              }
            }
          },
          {
            id: 'global-connect-tool',
            group: 'tools',
            className: 'bpmn-icon-connection-multi',
            title: translate('Activate the global connect tool'),
            action: {
              click: (event) => {
                globalConnect.toggle(event);
              }
            }
          },
        ]
      },
      {
        title: translate('ProcessControl'),
        group: 'processControl',
        children: [
          {
            id: 'create.start-event',
            ...createAction('bpmn:StartEvent', 'event', 'bpmn-icon-start-event-none')
          },
          {
            id: 'create.intermediate-event',
            ...createAction('bpmn:IntermediateThrowEvent', 'event', 'bpmn-icon-intermediate-event-none')
          },
          {
            id: 'create.end-event',
            ...createAction('bpmn:EndEvent', 'event', 'bpmn-icon-end-event-none')
          },
          {
            id: 'create.exclusive-gateway',
            ...createAction('bpmn:ExclusiveGateway', 'gateway', 'bpmn-icon-gateway-xor')
          },
          {
            id: 'create.parallel-gateway',
            ...createAction('bpmn:ParallelGateway', 'gateway', 'bpmn-icon-gateway-parallel')
          },
          {
            id: 'create.task',
            ...createAction('bpmn:Task', 'activity', 'bpmn-icon-task')
          },
          {
            id: 'create.subprocess-expanded',
            ...createAction('bpmn:SubProcess', 'activity', 'bpmn-icon-subprocess-expanded', 'Create expanded SubProcess', { isExpanded: true }),
          },
          {
            id: 'create.participant-expanded',
            group: 'collaboration',
            className: 'bpmn-icon-participant',
            title: translate('Create Pool/Participant'),
            action: {
              dragstart: createParticipant,
              click: createParticipant
            }
          },
        ]
      }
    ]);

    // 定制任务
    const children = [];
    if (customJson.length) {
      customJson.forEach((item) => {
        const { customType } = item;
        children.push(
          {
            id: `create.service-task-${customType}`,
            ...createAction(
              'bpmn:ServiceTask', 'custom', `bpmn-icon-${customType}`,
              `Create ${customType}`, { imageUrl: item.imgDataUrl }, customType
            ),
          }
        );
      });
    }
    actions.push(
      {
        title: translate('CustomTasks'),
        group: 'customTasks',
        children
      }
    );
    // console.log('actions: ', actions);
    return actions;
  };
}

CustomPalette.$inject = [
  'palette',
  'create',
  'elementFactory',
  'spaceTool',
  'lassoTool',
  'handTool',
  'globalConnect',
  'translate'
];

// export default function PaletteProvider(
//   palette, create, elementFactory, spaceTool, lassoTool, handTool, globalConnect, translate
// ) {
//   this.create = create;
//   this.elementFactory = elementFactory;
//   this.spaceTool = spaceTool;
//   this.lassoTool = lassoTool;
//   this.handTool = handTool;
//   this.globalConnect = globalConnect;
//   this.translate = translate;
//   palette.registerProvider(this);
// }

// PaletteProvider.$inject = [
//   'palette',
//   'create',
//   'elementFactory',
//   'spaceTool',
//   'lassoTool',
//   'handTool',
//   'globalConnect',
//   'translate'
// ];

// PaletteProvider.prototype.getPaletteEntries = function () {
//   const actions = [];
//   const {
//     create,
//     elementFactory,
//     translate,
//     spaceTool,
//     lassoTool,
//     handTool,
//     globalConnect,
//   } = this;
//   // 获取定制任务json
//   const customJson = window.customData;
//   function createAction(type, group, className, title, options, customType) {
//     function createListener(event) {
//       const shape = elementFactory.createShape(assign({ type }, options, { customType }));

//       if (options) {
//         shape.businessObject.di.isExpanded = options.isExpanded;
//       }

//       create.start(event, shape);
//     }

//     const shortType = type.replace(/^bpmn:/, '');
//     const action = {
//       group,
//       className,
//       title: (title && translate(title)) || translate(`Create ${shortType}`),
//       action: {
//         dragstart: createListener,
//         click: createListener
//       }
//     };

//     if (customType) {
//       // console.log(options);
//       customJson.forEach((item) => {
//         if (item.customType === customType) {
//           action.imageUrl = options.imageUrl;
//         }
//       });
//     }
//     return action;
//   }

//   function createParticipant(event, collapsed) {
//     create.start(event, elementFactory.createParticipantShape(collapsed));
//   }

//   assign(actions, [
//     {
//       title: translate('Tools'),
//       group: 'tools',
//       children: [
//         {
//           id: 'hand-tool',
//           group: 'tools',
//           className: 'bpmn-icon-hand-tool',
//           title: translate('Activate the hand tool'),
//           action: {
//             click: (event) => {
//               handTool.activateHand(event);
//             }
//           }
//         },
//         {
//           id: 'lasso-tool',
//           group: 'tools',
//           className: 'bpmn-icon-lasso-tool',
//           title: translate('Activate the lasso tool'),
//           action: {
//             click: (event) => {
//               lassoTool.activateSelection(event);
//             }
//           }
//         },
//         {
//           id: 'space-tool',
//           group: 'tools',
//           className: 'bpmn-icon-space-tool',
//           title: translate('Activate the create/remove space tool'),
//           action: {
//             click: (event) => {
//               spaceTool.activateSelection(event);
//             }
//           }
//         },
//         {
//           id: 'global-connect-tool',
//           group: 'tools',
//           className: 'bpmn-icon-connection-multi',
//           title: translate('Activate the global connect tool'),
//           action: {
//             click: (event) => {
//               globalConnect.toggle(event);
//             }
//           }
//         },
//       ]
//     },
//     {
//       title: translate('ProcessControl'),
//       group: 'processControl',
//       children: [
//         {
//           id: 'create.start-event',
//           ...createAction('bpmn:StartEvent', 'event', 'bpmn-icon-start-event-none')
//         },
//         {
//           id: 'create.intermediate-event',
//           ...createAction('bpmn:IntermediateThrowEvent', 'event'
// , 'bpmn-icon-intermediate-event-none')
//         },
//         {
//           id: 'create.end-event',
//           ...createAction('bpmn:EndEvent', 'event', 'bpmn-icon-end-event-none')
//         },
//         {
//           id: 'create.exclusive-gateway',
//           ...createAction('bpmn:ExclusiveGateway', 'gateway', 'bpmn-icon-gateway-xor')
//         },
//         {
//           id: 'create.parallel-gateway',
//           ...createAction('bpmn:ParallelGateway', 'gateway', 'bpmn-icon-gateway-parallel')
//         },
//         {
//           id: 'create.task',
//           ...createAction('bpmn:Task', 'activity', 'bpmn-icon-task')
//         },
//         {
//           id: 'create.subprocess-expanded',
//           ...createAction('bpmn:SubProcess', 'activity', 'bpmn-icon-subprocess-expanded'
// , 'Create expanded SubProcess', { isExpanded: true }),
//         },
//         {
//           id: 'create.participant-expanded',
//           group: 'collaboration',
//           className: 'bpmn-icon-participant',
//           title: translate('Create Pool/Participant'),
//           action: {
//             dragstart: createParticipant,
//             click: createParticipant
//           }
//         },
//       ]
//     }
//   ]);

//   // 定制任务
//   const children = [];
//   if (customJson.length) {
//     customJson.forEach((item) => {
//       const { customType } = item;
//       children.push(
//         {
//           id: `create.service-task-${customType}`,
//           ...createAction(
//             'bpmn:ServiceTask', 'custom', `bpmn-icon-${customType}`,
//             `Create ${customType}`, { imageUrl: item.imgDataUrl }, customType
//           ),
//         }
//       );
//     });
//   }
//   actions.push(
//     {
//       title: translate('CustomTasks'),
//       group: 'customTasks',
//       children
//     }
//   );
//   // console.log('actions: ', actions);
//   return actions;
// };
