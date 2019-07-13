export const diagramXML = `<?xml version="1.0" encoding="UTF-8"?>
<bpmn2:definitions xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:bpmn2="http://www.omg.org/spec/BPMN/20100524/MODEL" xmlns:bpmndi="http://www.omg.org/spec/BPMN/20100524/DI" xmlns:dc="http://www.omg.org/spec/DD/20100524/DC" xmlns:di="http://www.omg.org/spec/DD/20100524/DI" xmlns:camunda="http://camunda.org/schema/1.0/bpmn" id="sample-diagram" targetNamespace="http://bpmn.io/schema/bpmn" xsi:schemaLocation="http://www.omg.org/spec/BPMN/20100524/MODEL BPMN20.xsd">
  <bpmn2:process id="Process_1" name="testName" isExecutable="false">
    <bpmn2:startEvent id="Process_1_StartEvent_1u877e8" name="startName">
      <bpmn2:outgoing>Process_1_SequenceFlow_034tb8l</bpmn2:outgoing>
    </bpmn2:startEvent>
    <bpmn2:sequenceFlow id="Process_1_SequenceFlow_034tb8l" sourceRef="Process_1_StartEvent_1u877e8" targetRef="Process_1_Task_0fj7yth" />
    <bpmn2:exclusiveGateway id="Process_1_ExclusiveGateway_1qp43yh">
      <bpmn2:incoming>Process_1_SequenceFlow_15glbq4</bpmn2:incoming>
      <bpmn2:outgoing>Process_1_SequenceFlow_0c6sc5g</bpmn2:outgoing>
    </bpmn2:exclusiveGateway>
    <bpmn2:sequenceFlow id="Process_1_SequenceFlow_15glbq4" sourceRef="Process_1_Task_0fj7yth" targetRef="Process_1_ExclusiveGateway_1qp43yh">
      <bpmn2:extensionElements>
        <camunda:executionListener class="" event="take" />
      </bpmn2:extensionElements>
      <bpmn2:conditionExpression xsi:type="bpmn2:tFormalExpression">test</bpmn2:conditionExpression>
    </bpmn2:sequenceFlow>
    <bpmn2:sequenceFlow id="Process_1_SequenceFlow_0c6sc5g" sourceRef="Process_1_ExclusiveGateway_1qp43yh" targetRef="Process_1_ServiceTask_1uho6in" />
    <bpmn2:endEvent id="Process_1_EndEvent_1j047av">
      <bpmn2:incoming>Process_1_SequenceFlow_1fa7p50</bpmn2:incoming>
    </bpmn2:endEvent>
    <bpmn2:userTask id="Process_1_Task_0fj7yth" name="testName">
      <bpmn2:incoming>Process_1_SequenceFlow_034tb8l</bpmn2:incoming>
      <bpmn2:outgoing>Process_1_SequenceFlow_15glbq4</bpmn2:outgoing>
    </bpmn2:userTask>
    <bpmn2:serviceTask id="Process_1_ServiceTask_1uho6in" name="自定义任务" camunda:asyncBefore="true" camunda:jobPriority="first one" camunda:expression="表达式" camunda:class="class类" camunda:delegateExpression="表达式" camunda:resultVariable="结果变量">
      <bpmn2:documentation>tests</bpmn2:documentation>
      <bpmn2:extensionElements>
        <camunda:executionListener class="classTest" event="start">
          <camunda:field name="name1">
            <camunda:string>value1</camunda:string>
          </camunda:field>
          <camunda:field name="name2">
            <camunda:string>value2</camunda:string>
          </camunda:field>
        </camunda:executionListener>
        <camunda:executionListener expression="expressionTest" event="end">
          <camunda:field name="name3">
            <camunda:string>value3</camunda:string>
          </camunda:field>
          <camunda:field name="name4">
            <camunda:string>value4</camunda:string>
          </camunda:field>
        </camunda:executionListener>
        <camunda:inputOutput>
          <camunda:inputParameter name="Input_1">input1</camunda:inputParameter>
          <camunda:inputParameter name="Input_2">input2</camunda:inputParameter>
          <camunda:outputParameter name="Output_1">output1</camunda:outputParameter>
          <camunda:outputParameter name="Output_2">output2</camunda:outputParameter>
        </camunda:inputOutput>
        <camunda:field name="stringName">
          <camunda:string>stringValue</camunda:string>
        </camunda:field>
        <camunda:field name="expressName">
          <camunda:expression>express1</camunda:expression>
        </camunda:field>
        <camunda:field name="expressName2">
          <camunda:expression>express2</camunda:expression>
        </camunda:field>
        <camunda:properties>
          <camunda:property name="key1" value="value1" />
          <camunda:property name="key2" value="value2" />
        </camunda:properties>
        <camunda:failedJobRetryTimeCycle>33</camunda:failedJobRetryTimeCycle>
      </bpmn2:extensionElements>
      <bpmn2:incoming>Process_1_SequenceFlow_0c6sc5g</bpmn2:incoming>
      <bpmn2:outgoing>Process_1_SequenceFlow_1fa7p50</bpmn2:outgoing>
    </bpmn2:serviceTask>
    <bpmn2:sequenceFlow id="Process_1_SequenceFlow_1fa7p50" sourceRef="Process_1_ServiceTask_1uho6in" targetRef="Process_1_EndEvent_1j047av" />
  </bpmn2:process>
  <bpmndi:BPMNDiagram id="BPMNDiagram_1">
    <bpmndi:BPMNPlane id="BPMNPlane_1" bpmnElement="Process_1">
      <bpmndi:BPMNShape id="_BPMNShape_StartEvent_2">
        <dc:Bounds x="412" y="240" width="36" height="36" />
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="StartEvent_1u877e8_di" bpmnElement="Process_1_StartEvent_1u877e8">
        <dc:Bounds x="-312" y="2070" width="36" height="36" />
        <bpmndi:BPMNLabel>
          <dc:Bounds x="-318" y="2113" width="51" height="14" />
        </bpmndi:BPMNLabel>
      </bpmndi:BPMNShape>
      <bpmndi:BPMNEdge id="SequenceFlow_034tb8l_di" bpmnElement="Process_1_SequenceFlow_034tb8l">
        <di:waypoint x="-276" y="2088" />
        <di:waypoint x="-204" y="2088" />
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNShape id="ExclusiveGateway_1qp43yh_di" bpmnElement="Process_1_ExclusiveGateway_1qp43yh" isMarkerVisible="true">
        <dc:Bounds x="-34" y="2063" width="50" height="50" />
      </bpmndi:BPMNShape>
      <bpmndi:BPMNEdge id="SequenceFlow_15glbq4_di" bpmnElement="Process_1_SequenceFlow_15glbq4">
        <di:waypoint x="-104" y="2088" />
        <di:waypoint x="-34" y="2088" />
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="SequenceFlow_0c6sc5g_di" bpmnElement="Process_1_SequenceFlow_0c6sc5g">
        <di:waypoint x="16" y="2088" />
        <di:waypoint x="86" y="2088" />
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNShape id="EndEvent_1j047av_di" bpmnElement="Process_1_EndEvent_1j047av">
        <dc:Bounds x="264" y="2070" width="36" height="36" />
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="UserTask_1ajmq4l_di" bpmnElement="Process_1_Task_0fj7yth">
        <dc:Bounds x="-204" y="2048" width="100" height="80" />
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="ServiceTask_1uho6in_di" bpmnElement="Process_1_ServiceTask_1uho6in">
        <dc:Bounds x="86" y="2048" width="100" height="80" />
      </bpmndi:BPMNShape>
      <bpmndi:BPMNEdge id="SequenceFlow_1fa7p50_di" bpmnElement="Process_1_SequenceFlow_1fa7p50">
        <di:waypoint x="186" y="2088" />
        <di:waypoint x="264" y="2088" />
      </bpmndi:BPMNEdge>
    </bpmndi:BPMNPlane>
  </bpmndi:BPMNDiagram>
</bpmn2:definitions>
`;
