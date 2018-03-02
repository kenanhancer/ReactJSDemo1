import React from 'react';
import { Row, Col, Form, Divider } from 'antd';
import { HkSaveButton, HkCancelButton, HkDropdownButton } from 'components/HkButton.jsx';

export const HkTitle = (props) => (
    <div>
        <Row>
            <Col span={6}><h2 className="page-title">{props.title}</h2></Col>
            <Col span={18}>
                <Row type="flex" justify="end">
                    {props.onSave && <Col><HkSaveButton onClick={props.onSave} /></Col>}
                    {props.dropdownMenu && <Col><HkDropdownButton dropdownMenu={props.dropdownMenu}/></Col>}
                    {props.onCancel && <Col><HkCancelButton onClick={props.onCancel} /></Col>}
                </Row>
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
