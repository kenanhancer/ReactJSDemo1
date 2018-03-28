import React from 'react';
import { Row, Col, Form, Divider } from 'antd';

export const HkTitle = (props) => (
    <div>
        <Row>
            <Col span={8}><h2 className="page-title">{props.title}</h2></Col>
            <Col span={16}>
                {props.children}
            </Col>
        </Row>
        <Divider className="page-title-divider" />
    </div>
);

const formItemLayout = {
    labelCol: { xs: { span: 6 }, sm: { span: 4 }, },
    wrapperCol: { xs: { span: 22 }, sm: { span: 16 }, },
}

const formItemStyle = { fontWeight: 'bold', marginBottom: 4 }

export const HkFormItem = (props) => (
    <Form.Item {...formItemLayout} label={props.label} style={formItemStyle}>
        {props.children}
    </Form.Item>
);

export const HkFormItemVertical = (props) => (
    <Form.Item label={props.label} style={formItemStyle}>
        {props.children}
    </Form.Item>
);

export const HkFormRow = (props) => (
    <Row className="ant-form-item" style={formItemStyle}>
        {props.children}
    </Row>
);
