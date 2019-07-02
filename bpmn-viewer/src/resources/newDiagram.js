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
    <bpmn2:serviceTask id="Process_1_ServiceTask_167mzpf" name="文件上传" camunda:class="com.pingan.haofang.module.workflow.activiti.ServiceTaskWorker">
      <bpmn2:extensionElements>
        <camunda:field name="trigger_events">
          <camunda:string>file_upload_event</camunda:string>
        </camunda:field>
      </bpmn2:extensionElements>
      <bpmn2:incoming>Process_1_SequenceFlow_0c6sc5g</bpmn2:incoming>
      <bpmn2:outgoing>Process_1_SequenceFlow_0mezd2x</bpmn2:outgoing>
    </bpmn2:serviceTask>
    <bpmn2:serviceTask id="Process_1_ServiceTask_160mit7" name="文件下载" camunda:class="com.pingan.haofang.module.workflow.activiti.ServiceTaskWorker">
      <bpmn2:extensionElements>
        <camunda:field name="trigger_events">
          <camunda:string>sftp_download_event</camunda:string>
        </camunda:field>
      </bpmn2:extensionElements>
      <bpmn2:incoming>Process_1_SequenceFlow_0mezd2x</bpmn2:incoming>
      <bpmn2:outgoing>Process_1_SequenceFlow_1nsz9e6</bpmn2:outgoing>
    </bpmn2:serviceTask>
    <bpmn2:sequenceFlow id="Process_1_SequenceFlow_0c6sc5g" sourceRef="Process_1_ExclusiveGateway_1qp43yh" targetRef="Process_1_ServiceTask_167mzpf" />
    <bpmn2:sequenceFlow id="Process_1_SequenceFlow_0mezd2x" sourceRef="Process_1_ServiceTask_167mzpf" targetRef="Process_1_ServiceTask_160mit7" />
    <bpmn2:endEvent id="Process_1_EndEvent_1j047av">
      <bpmn2:incoming>Process_1_SequenceFlow_1nsz9e6</bpmn2:incoming>
    </bpmn2:endEvent>
    <bpmn2:sequenceFlow id="Process_1_SequenceFlow_1nsz9e6" sourceRef="Process_1_ServiceTask_160mit7" targetRef="Process_1_EndEvent_1j047av" />
    <bpmn2:userTask id="Process_1_Task_0fj7yth" name="testName">
      <bpmn2:incoming>Process_1_SequenceFlow_034tb8l</bpmn2:incoming>
      <bpmn2:outgoing>Process_1_SequenceFlow_15glbq4</bpmn2:outgoing>
    </bpmn2:userTask>
  </bpmn2:process>
  <bpmndi:BPMNDiagram id="BPMNDiagram_1">
    <bpmndi:BPMNPlane id="BPMNPlane_1" bpmnElement="Process_1">
      <bpmndi:BPMNShape id="_BPMNShape_StartEvent_2">
        <dc:Bounds x="412" y="240" width="36" height="36" />
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="StartEvent_1u877e8_di" bpmnElement="Process_1_StartEvent_1u877e8">
        <dc:Bounds x="-290" y="2070" width="36" height="36" />
        <bpmndi:BPMNLabel>
          <dc:Bounds x="-296" y="2113" width="51" height="14" />
        </bpmndi:BPMNLabel>
      </bpmndi:BPMNShape>
      <bpmndi:BPMNEdge id="SequenceFlow_034tb8l_di" bpmnElement="Process_1_SequenceFlow_034tb8l">
        <di:waypoint x="-254" y="2088" />
        <di:waypoint x="-204" y="2088" />
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNShape id="ExclusiveGateway_1qp43yh_di" bpmnElement="Process_1_ExclusiveGateway_1qp43yh" isMarkerVisible="true">
        <dc:Bounds x="-54" y="2063" width="50" height="50" />
      </bpmndi:BPMNShape>
      <bpmndi:BPMNEdge id="SequenceFlow_15glbq4_di" bpmnElement="Process_1_SequenceFlow_15glbq4">
        <di:waypoint x="-104" y="2088" />
        <di:waypoint x="-54" y="2088" />
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNShape id="ServiceTask_167mzpf_di" bpmnElement="Process_1_ServiceTask_167mzpf">
        <dc:Bounds x="23" y="2048" width="100" height="80" />
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="ServiceTask_160mit7_di" bpmnElement="Process_1_ServiceTask_160mit7">
        <dc:Bounds x="183" y="2048" width="100" height="80" />
      </bpmndi:BPMNShape>
      <bpmndi:BPMNEdge id="SequenceFlow_0c6sc5g_di" bpmnElement="Process_1_SequenceFlow_0c6sc5g">
        <di:waypoint x="-4" y="2088" />
        <di:waypoint x="23" y="2088" />
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="SequenceFlow_0mezd2x_di" bpmnElement="Process_1_SequenceFlow_0mezd2x">
        <di:waypoint x="123" y="2089" />
        <di:waypoint x="183" y="2088" />
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNShape id="EndEvent_1j047av_di" bpmnElement="Process_1_EndEvent_1j047av">
        <dc:Bounds x="343" y="2070" width="36" height="36" />
      </bpmndi:BPMNShape>
      <bpmndi:BPMNEdge id="SequenceFlow_1nsz9e6_di" bpmnElement="Process_1_SequenceFlow_1nsz9e6">
        <di:waypoint x="283" y="2088" />
        <di:waypoint x="343" y="2088" />
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNShape id="UserTask_1ajmq4l_di" bpmnElement="Process_1_Task_0fj7yth">
        <dc:Bounds x="-204" y="2048" width="100" height="80" />
      </bpmndi:BPMNShape>
    </bpmndi:BPMNPlane>
  </bpmndi:BPMNDiagram>
</bpmn2:definitions>
`;
