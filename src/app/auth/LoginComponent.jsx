import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import { Form, Divider, Icon, Input, Button, Row, Col, Carousel } from 'antd';
import locale from 'locale';

import { HkFormItemVertical } from 'components/HkForm.jsx';
import { HkLogoText } from 'components/HkLogo.jsx';
import { FooterContent } from 'components/HkFooter.jsx';
import HkLang from 'components/HkLang.jsx';


const LoginComponent = ({ model, loading, onSubmit, onChange }) => (
    <div>
        <Row style={{ minHeight: '100vh' }}>
            <Col xs={0} sm={8} md={10} lg={12} style={{ textAlign: 'center' }}>
                <Carousel autoplay dots={false} effect='fade'>
                    <div><img src="assets/img/login/bg1.jpg" alt="login-bg" /></div>
                    <div><img src="assets/img/login/bg2.jpg" alt="login-bg" /></div>
                    <div><img src="assets/img/login/bg3.jpg" alt="login-bg" /></div>
                    <div><img src="assets/img/login/bg4.jpg" alt="login-bg" /></div>
                </Carousel>
            </Col>
            <Col xs={24} sm={16} md={14} lg={12}>
                <Row type="flex" align="middle" justify="end">
                    <HkLang />                
                </Row>
                <Row type="flex" align="middle" justify="center" style={{ minHeight: '95vh' }}>
                    <Col xs={16} sm={16} md={14} lg={10} xl={8} xxl={8}>
                        <h1 style={{ textAlign: 'center' }}><HkLogoText /></h1>
                        <br />
                        <p style={{ textAlign: 'center' }}>{locale.getPage('login')}</p>
                        <br />
                        <Form layout="vertical">
                            <HkFormItemVertical label={locale.getField('username').title}>
                                <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} name='username' placeholder={locale.getField('username').placeHolder} value={model.username} onChange={onChange} />
                            </HkFormItemVertical>
                            <HkFormItemVertical label={locale.getField('password').title}>
                                <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" name='password' placeholder={locale.getField('password').placeHolder} value={model.password} onChange={onChange} />
                            </HkFormItemVertical>
                            <Link to="/forgotpassword" className="login-form-forgot" >{locale.getButton('forgotpassword')}</Link>
                            <Button type="primary" htmlType="submit" className="login-form-button" loading={loading} onClick={onSubmit}>
                                {locale.getButton('login')}
                            </Button>
                        </Form>
                        <Divider />
                        <p>{locale.getMessage('register_message')}</p>
                        <Link to="/registeruser" className="ant-btn login-form-button ant-btn-default">{locale.getButton('registeruser')}</Link>
                    </Col>
                </Row>
                <Row type="flex" align="middle" justify="end">
                    <FooterContent />
                </Row>
            </Col>
        </Row>
    </div >
)

LoginComponent.propTypes = {
    model: PropTypes.shape({ username: PropTypes.string, password: PropTypes.string }).isRequired,
    onSubmit: PropTypes.func.isRequired,
    onChange: PropTypes.func.isRequired
}

export default LoginComponent;