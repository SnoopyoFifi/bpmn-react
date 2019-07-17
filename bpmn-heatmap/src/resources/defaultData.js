/* eslint-disable */
const heatmapdata = [
  { actId: 'Process_1_StartEvent_1u877e8', runCount: 12 },
  { actId: 'Process_1_Task_0fj7yth', runCount: 20 },
  { actId: 'Process_1_ServiceTask_1uho6in', runCount: 20 },
  { actId: 'Process_1_ExclusiveGateway_1qp43yh', runCount: 15 },
];
const customTasks = [
  {
    customType: 'CustomTaskDemo',
    imgDataUrl: 'data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20960%20960%22%3E%3Cpath%20fill%3D%22%23fff%22%20d%3D%22M960%2060v839c0%2033-27%2061-60%2061H60c-33%200-60-27-60-60V60C0%2027%2027%200%2060%200h839c34%200%2061%2027%2061%2060z%22%2F%3E%3Cpath%20fill%3D%22%2352b415%22%20d%3D%22M217%20548a205%20205%200%200%200-144%2058%20202%20202%200%200%200-4%20286%20202%20202%200%200%200%20285%203%20200%20200%200%200%200%2048-219%20203%20203%200%200%200-185-128zM752%206a206%20206%200%200%200-192%20285%20206%20206%200%200%200%20269%20111%20207%20207%200%200%200%20111-260A204%20204%200%200%200%20752%206zM62%200A62%2062%200%200%200%200%2062v398l60%2046a259%20259%200%200%201%2089-36c5-28%2010-57%2014-85l99%202%2012%2085a246%20246%200%200%201%2088%2038l70-52%2069%2071-52%2068c17%2030%2029%2058%2035%2090l86%2014-2%20100-86%2012a240%20240%200%200%201-38%2089l43%2058h413c37%200%2060-27%2060-61V407a220%20220%200%200%201-44%2040l21%2085-93%2039-45-76a258%20258%200%200%201-98%201l-45%2076-94-39%2022-85a298%20298%200%200%201-70-69l-86%2022-38-94%2076-45a258%20258%200%200%201-1-98l-76-45%2040-94%2085%2022a271%20271%200%200%201%2041-47z%22%2F%3E%3C%2Fsvg%3E',
    imgSelectedDataUrl: 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA5NjAgOTYwIj48cGF0aCBmaWxsPSIjZmZmIiBkPSJNOTYwIDYwdjgzOWMwIDMzLTI3IDYxLTYwIDYxSDYwYy0zMyAwLTYwLTI3LTYwLTYwVjYwQzAgMjcgMjcgMCA2MCAwaDgzOWMzNCAwIDYxIDI3IDYxIDYweiIvPjxwYXRoIGZpbGw9ImhvdHBpbmsiIGQ9Ik0yMTcgNTQ4YTIwNSAyMDUgMCAwIDAtMTQ0IDU4IDIwMiAyMDIgMCAwIDAtNCAyODYgMjAyIDIwMiAwIDAgMCAyODUgMyAyMDAgMjAwIDAgMCAwIDQ4LTIxOSAyMDMgMjAzIDAgMCAwLTE4NS0xMjh6TTc1MiA2YTIwNiAyMDYgMCAwIDAtMTkyIDI4NSAyMDYgMjA2IDAgMCAwIDI2OSAxMTEgMjA3IDIwNyAwIDAgMCAxMTEtMjYwQTIwNCAyMDQgMCAwIDAgNzUyIDZ6TTYyIDBBNjIgNjIgMCAwIDAgMCA2MnYzOThsNjAgNDZhMjU5IDI1OSAwIDAgMSA4OS0zNmM1LTI4IDEwLTU3IDE0LTg1bDk5IDIgMTIgODVhMjQ2IDI0NiAwIDAgMSA4OCAzOGw3MC01MiA2OSA3MS01MiA2OGMxNyAzMCAyOSA1OCAzNSA5MGw4NiAxNC0yIDEwMC04NiAxMmEyNDAgMjQwIDAgMCAxLTM4IDg5bDQzIDU4aDQxM2MzNyAwIDYwLTI3IDYwLTYxVjQwN2EyMjAgMjIwIDAgMCAxLTQ0IDQwbDIxIDg1LTkzIDM5LTQ1LTc2YTI1OCAyNTggMCAwIDEtOTggMWwtNDUgNzYtOTQtMzkgMjItODVhMjk4IDI5OCAwIDAgMS03MC02OWwtODYgMjItMzgtOTQgNzYtNDVhMjU4IDI1OCAwIDAgMS0xLTk4bC03Ni00NSA0MC05NCA4NSAyMmEyNzEgMjcxIDAgMCAxIDQxLTQ3eiIvPjwvc3ZnPg==',
    initProperties: {
      name: '自定义任务', // 名称
      class: 'class类', // 详情
      // expression: '表达式',
      // resultVariable: '结果变量',
      // delegateExpression: '表达式',

      asyncBefore: true, // 持续异步
      // asyncAfter: true,
      async: false,
      exclusive: true, // 排除
      jobPriority: 'first one', // 优先级
      timeCycle: { // 重试时间周期
        type: 'camunda:FailedJobRetryTimeCycle',
        body: '33'
      },
      
      documentation: { // 文档-元素文档
        type: "bpmn:Documentation",
        text: "tests"
      },
      listener: [ // 监听器
        {
          type: 'camunda:ExecutionListener',
          values: {
            class: 'classTest',
            event: 'start',
            fields: [
              {
                type: 'camunda:Field',
                values: {
                  name: "name1",
                  string: "value1"
                }
              },{
                type: 'camunda:Field',
                values: {
                  name: "name2",
                  string: "value2"
                }
              }
            ]
          }
        }, {
          type: 'camunda:ExecutionListener',
          values: {
            expression: 'expressionTest',
            event: 'end',
            fields: [
              {
                type: 'camunda:Field',
                values: {
                  name: "name3",
                  string: "value3"
                }
              },{
                type: 'camunda:Field',
                values: {
                  name: "name4",
                  string: "value4"
                }
              }
            ]
          }
        },
      ],
      inputOutput: { // 输入输出
        type: 'camunda:InputOutput',
        values: {
          inputParameters: [
            {
              type: 'camunda:InputParameter', 
              values: {
                name: "Input_1",
                value: "input1"
              }
            }, {
              type: 'camunda:InputParameter', 
              values: {
                name: "Input_2",
                value: "input2"
              }
            }
          ],
          outputParameters: [
            {
              type: 'camunda:OutputParameter',
              values: {
                name: "Output_1",
                value: "output1"
              }
            }, {
              type: 'camunda:OutputParameter',
              values: {
                name: "Output_2",
                value: "output2"
              }
            }
          ]
        }
      },
      injectField: [ // 字段注入
        { 
          type: 'camunda:Field',
          values: {
            name: "stringName",
            string: "stringValue"
          }
        }, {
          type: 'camunda:Field',
          values: {
            expression: "express1",
            name: "expressName"
          }
        }, {
          type: 'camunda:Field',
          values: {
            expression: "express2",
            name: "expressName2"
          }
        }, 
      ],
      extendProperties: { // 扩展字段
        type: 'camunda:Properties',
        values: [
          {
            type: 'camunda:Property',
            values: {
              name: 'key1',
              value: 'value1'
            }
          }, {
            type: 'camunda:Property',
            values: {
              name: 'key2',
              value: 'value2'
            }
          }
        ]
      }
    }
  },
]
export {
  heatmapdata,
  customTasks
}
 