/* eslint-disable */
const highlightData = [
  {
    "id": "Process_1_StartEvent_1u877e8"
  },
  {
    "id": "Process_1_SequenceFlow_034tb8l"
  },
  {
    "id": "Process_1_Task_0fj7yth"
  },
  {
    "id": "Process_1_SequenceFlow_15glbq4"
  },
  {
    "id": "Process_1_ExclusiveGateway_1qp43yh"
  },
];
const overlaysData = [
  {
    "nodeCode": "Process_1_Task_0fj7yth",
    "failInstCount": 10,
    "passInstCount": 20
  }
]
const customTasks = [
  {
    customType: 'FaceRecognitionTask',
    imgDataUrl: 'data:image/png;base64,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',
    initProperties: {
      name: '人脸识别', // 名称
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
  {
    "customType": "FileUploadTask",
    "imgDataUrl": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFQAAABOCAYAAAC+JjE8AAAAAXNSR0IArs4c6QAABVlJREFUeAHtnEmoXEUUhmOikWBEDVHiGCeIaKIScVgob+OIiIssRAxInEA0utCNaBAcNiooKoIbdeVOsnCnRFFcORMVxOD0xBeFSJzQOEW/v9877XnV1Z17m+p7O6/PgT9VderUqVtf17093PuyaFFYUQIHVMx2DnEXomPQSlR1HKH7tf3L0e9CM+gt9B4a2pYy8k40jZQ4NMtCTMSmlq0jegcKiHkGYiNGPZY7dS8l6iW0vCd61vE3hUBPgonPgX0W+iv+DeiVPv0d9+n8+xPyO3MP7afRRegwNGmmNWvtYiAWno1YiVnWFuP9CPkBH9I+ORs9mU6xEBPPaDttseuxG/D4wI9pH9oTFQ4xERvPalMOy/suSNfJvls5N3jCfGJj7yUCK3bzbDUtT/zFeb3RyBEQI89MDLvn/rnJCL3Lhw0mkDLqMLSLqb4BefvUN6KeJZAy6jA0oEckQ3Yn7Wj2EkgZdRga0PQDvq4NYYMJpIw6DA3o4KHRW5lAAK2MqlpgAK3GqXJUAK2Mqlpgv19Sqo0ePmoZQ7egtSh9Qxw+6+xIvVnoq+GD6PdZV3P/tgV0M0u8Z4TLvIrcP6JHRjhHNnVbp3wTPwM2MUcP1LZ2qH5b1Fe1M9AoTvlPyKs5Gre2gO5kpbozsOCsrVN+wYG0BQVQI1GoDKCFQFqaAGokCpUBtBBISxNAjUShMoAWAmlpAqiRKFQG0EIgLU0ANRKFygBaCKSlCaBGolDZ1o8jdQ5fP0bfilah51B6PxzX+Nj+APRJcN00h2wj5Rr0y1x77IpxP+XvhZjBFLyj0avocDXG0cYZqO4JPZSBdj6+bWhFpq91lwFNb2bputWmPcrk9w04gPX0vY6OHBAz6q6UUYehAZ1JZj8+aTfV1O0QXTPvrjDhmcS8gXQZaMNSRvMYXsAR6far6eEWjlAwn3XHoGPZi75xPrV1+8SOU+Vn6DjUtImRPw4x7Jp26vfIAr6jfki3d/QVzf8CsvlV/oNuRPqoZP4/qZ+Cpp1PfV+gE1FTpr+QESM7LrGzs717DE+4AAU+0+0ZbUUf3dKngQXz+rlpU6Byn4S+QrYglYJ8KmrCxMbP/Xhu0qNw/pwEPkBbp+Ko7CAS60lgf3B6dv06N2EOqLpPQJ8jP/Zb2qehUZlYiImfU8zELmu34PXBqm9D864P2ZH1nQcz5GXk5/uL9jVJqn5AFaZr5w7kc+j0W4dKmxi8hvxcqotZ13K77yl6b+9G/F/5mqr+jmkXUqJBplidBnr1cqaPHFvRZa5TMK9F2rHeBHTTnEMxS30ndT2KrYWucf4fqF+CPnA+X11C4zZ0FsoxsFj1rUR6gVab05VidYdr961uoWcvSl+NOm1NljO92aWv9B/4rs4F4xNQm1dvSjlbhVNPi1icyt3oPJSzm3H62Lp1sRGjWjZF9Duo7mQWn+40Ta5r5ptJzj20r0T9rApQjdV1bDuy+VXqTwfXo9Tux+Hj6tTFZCpNWLWtLa/B+gSgRDNIu2Rf0nUttzs24PcHr28Xl6NB9jydNqbfDrXxOj11mlu8yq3W6cpjqb+NdGYMWov6tWatXQym0KBLBN3NmnaLThct9Dd0MdqXVd2hlmcFlXeRQX3MOhZqeQUL0yLPrrjAukCVdjnSbwH6CqtPE2GOwDBA3fBmq4ubnW7hzxZAC7/GATSAFiZQOF3s0ABamEDhdLFDA2hhAoXTxQ4NoIUJFE4XOzSAFiZQOF3s0ABamEDhdLFDA2hhAoXTxQ4NoIUJFE4XOzSAFiZQOF3s0AkE+qVbs6879/hU9dDUuJv+O149XDaN7kI7UVgQCAJDEfgPxrYBbD1vL1sAAAAASUVORK5CYII=",
    "imgSelectedDataUrl": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEgAAABICAMAAABiM0N1AAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAABdUExURUdwTEpZ3UlV10lY3EpY3Uta0kpZ3ElZ3T9T1UpY3UpZ3UpY2UlZ3UlZ3UhX3TRMz0hX20pZ3UpZ3UpZ3UpZ3UZT2ElZ3UlY3EhW2klY3UpZ3UlY3UpZ3UpZ3Uta3r+zOocAAAAedFJOUwDuIF/AEbPGDMPzN5JrNAY+3fzlnRl2RipTuITSp0NOuggAAAFySURBVHja7dXdjoIwEIbhoXVtrUJbKP/43f9lrnaNxlo3wHJgsn0PJ+FhQglQKvW5afk1O6nfMoy74TC7wXEWdxqLhdkm5owArFiQBTC+OnkJy2taUM0tyvxlalEZWpipYMN79x5fWl6iD0YnWLYcYhYnekqfIfRySAucny+Te+xoRTvs5b+G2lNQuw6qJwRN9SpIOxXk9CqIJAuS6fgT9AFQzbaBOmHbLaB6AKz5O9QJXKr6mZB2EJIiMQFf/KcnBcIvQoOsiDk7YFIQKi4VGZpgZJS3I/uc2gyclzFJOygTzgaUo4zs43RxgSiPSHIsMeiXLStg35vCx+7OWdLxClFzkVo/rguf6QegijwPYwGozDd1V2cCnKQfyEtZe3UOmU/h3WvRuQq3SkP0dfD73CG/05Goy3Crch3FYz3Pfb0mKkq/zwOiXPkzanMf7xnNSjeNpCeI+FjT6h6QL0EJSlCCVkBqI4iJytA2Ukep1K99A8cnMP8nPE++AAAAAElFTkSuQmCC",
    "initProperties": {
      "name": "文件上传",
      "class": "com.pingan.haofang.module.workflow.activiti.ServiceTaskWorker",
      "injectField": [
        { 
          "type": "camunda:Field",
          "values": {
            "name": "trigger_events",
            "string": "file_upload_event"
          }
        } 
      ]
    }
  },
  {
    "customType": "FileDownloadTask",
    "imgDataUrl": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFQAAABOCAYAAAC+JjE8AAAAAXNSR0IArs4c6QAABVJJREFUeAHtnEuIHFUUhsdXfCQxiiHiI0RFEKNBifiCiEbxgZCV4M5FBN2ohCyzcKMrFVHQVRbqKtmYjS5EIQNCwLdojCAqolmMigNRiRqDGL+/Jmc4c7uqpqq93V3dfQ78fR917qm6X9963arumZmwrAROaRjtBvy2oIvRWtS0Ha5jbSfY+nk0hw6gT1DftoKWO9BhpMChBRZiIjatbBPe36CAWM5AbMSox8p23Xvw2odW9XgvVPxDItDTYOJzekVHj1L/AHqnYnlRvZHP35Afmccov4xuQ2vQtJn6rL6LgVh4NmIlZqV2KrVfIN/gM8pXlHpPZ6VYiIlndJCy2PXYw9R4x0OUV/d4RYWYiI1ntb0My6fOScfJyqFc1njK6sTGziUCK3ZLbAMlT3zPkqVRKCMgRp6ZGC7u+zcmLXSWD6snkDIqGNrBVHdA3r7yhciXEkgZFQwN6PlJkyNJOYq9BFJGBUMDml7g69gQVk8gZVQwNKD1TWNpYwIBtDGqZo4BtBmnxl4BtDGqZo5VMynNWvfvdTZNn0TXovSE2H/UhZY6WejW8Gn010LV8D5HBfQJurhrgN3cRuxf0bMDXEdp6FHt8sOYBhzGOnqgjmqEam5Rt2rXoEHs8l8SV+sYuo0K6I/0VE8GJs5GtctPHEjrUAA1EpnSAJoJpIUJoEYiUxpAM4G0MAHUSGRKA2gmkBYmgBqJTGkAzQTSwgRQI5EpDaCZQFqYAGokMqXjAPQM+roDPYMuz9TvgYUZ1WxTmw5pMvr5kw3uJt3cpvGwfcdhhGrO1Mznra5T6TgA9RPQPt8pkLYxBjR9mKWHaGH1BFJGBUMDOpe0XZ+Uo9hLIGVUMDSg+lWDt4l8POE7mCGfMlrCUGB/RnqmLf2EVqIu2CtshG3X8S5sENugX8iIkW2X2BWD00bov1TsRWYXknnOCpH2ENDzfjEy20NGDJfYOkq/I6Ou9Ck06jNrl0aoWIiJZyRmYldqj1LrnZXfj24p9R5OZVeAisEsSvmI2aKld0q7WbIJPb7oMTNzJ/n30A9Iv2OaRwpaZ/J9Aenb66KdxkY9hq5DdXuglq1FYrIBpfYSFWK2rOlFLh0T0m+jTVkry2GDGKGPsGFt+pL6io0Y9ZidlNIFenNtK/o4XdCiXLzE38J/mK7/Z9vERGzEqLVpyN+OXkQfoTl0vIF0TXYTymGvEsRGiNadwy4hyIfob1TXHy1Xn9V3MRALMRlrG8QuPzAgVbv8wFY46YEDaOZvOIAG0MwEMoeLERpAMxPIHC5GaADNTCBzuFGMUE1I6NHwpZn74sNp8uMh9CAa+zsb37E0fxUVup3TreQv6Hq0nLW9UzqLgG8hu10tncRYbqX9Lh/2CBXAFSc3VtNi+1HOFxf0JPINdB8yyzWnYPE6la5ia/SjLBs9So+guk43HaHnEGc2ia2Jj7vQRNs6encQeaj6h65bK3rdBKi+qHeTmMcob6uIOXHVF9Aj/z9RgqvZ/S0lPV0O6GraHED+C/qT8r0lsSa66jx69wHyII5SvgN5qwO6Bsf3URpjqw8wTflz6Ww6uv6gzh/3qoDqX2g08ethVo1y3KbHVtLVWeTB6D0h22XLgJYdMnRyuxmFQUCXO28jD1UnlftRClSXW58nvvOUN6MwR+BM8m8iD1U3Ad+6Ov2B3yFXlq9eg9Fj3rASAnr9ex/yUOvyeoB2dUmcqHIE9PLFXlQHUssOoytRWAMCuiV+DVVB/Y5ll6GwFgQ0S7QbpVC/pm59izjh6ggI6uvIoOo68yK3vHNZzRt23XSNqim579FOpMmVsCAQBPoi8B8XJQHal+EiUQAAAABJRU5ErkJggg==",
    "imgSelectedDataUrl": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEgAAABICAMAAABiM0N1AAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAABpUExURUdwTEpZ3UlY3ENT20ZW1UpZ3T5U1ElZ3UpY3UpY3UpZ3UtZ3TZNy0lY2iM+rkpY3UpZ3UpZ3UhY3UVV2kpZ3UhY3ElY3UhV3ElY3UpZ3EpZ3UZX2kpZ3UlX20pY3UpZ3UlZ3UpZ3kta3rJCLQQAAAAidFJOUwD8Xw8StAzFucD+7gc2A8rh2lgc0kuBLnVp6CX2P6OMkqmtyPGLAAABqUlEQVR42u3Wa4+jIBSAYQ5aFT1DuXi/tT3//0dOO+5kV2ubQs1mJvH9aPAJgQiyvb2fGwbhywX4kOmaMYlfLhmbbpWRtSLHVC1XnBMR5SJ5OZET0eleqlPSJmQOhUZTWrNFVpGumGOVJmXZPE7AmXMcaPGWPJO27pDVdJ6vEl4olu6QjOmCsyfRgQTzSNAh+o0QhovQD8JaxLNEjV5QmMOiPPSCsBFi9nGJRm622Du0Q94Q4jYQNmW4CVS1ZDaBPjLiz6Hlme0GrZ/Z8kSqc4c6dXfXGoBGukKyATD3N5Qe0A3CQa/chrwnVdtgCp9BGEzZWlHP76dZ9pAqcfjqHD6GonIaI1QKfbn2X8PzHr4bHkNVBn/qc76+rJaP4vjV+GxG52mMGLll67lv/w5tBSEuIYleTlFEcwgHHnhAXdaXwb8QGgXcA7I5wCn4CyFvqS2YR4MGKKNvCE2WZlwyn4r8KgUThKaltvHe+ONNukG3+bSGsbek4gqZNlWGvVEVA4iMkqtTsLeqjkAp0czx6yMGItCGvV2XAOiCbVAl8oJtUldJtrf3X/oEj7EvCC7hiYgAAAAASUVORK5CYII=",
    "initProperties": {
      "name": "文件下载",
      "class": "com.pingan.haofang.module.workflow.activiti.ServiceTaskWorker",
      "injectField": [
        { 
          "type": "camunda:Field",
          "values": {
            "name": "trigger_events",
            "string": "sftp_download_event"
          }
        }
      ]
    }
  },
  {
    customType: 'DigitalSealTask',
    imgDataUrl: 'data:image/png;base64,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',
    initProperties: {
      name: '电子签章', // 名称
      class: 'com.pingan.haofang.module.workflow.activiti.ServiceTaskWorker', // 详情
      injectField: [ // 字段注入
        { 
          type: 'camunda:Field',
          values: {
            name: "trigger_events",
            string: "electricity_sign_event"
          }
        } 
      ]
    }
  },
];
export {
  highlightData,
  customTasks,
  overlaysData
}
 