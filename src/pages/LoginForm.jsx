import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import axios from 'axios';
import PublishSubscribe from 'publish-subscribe-js';

import { Form, Divider, Icon, Input, Button, Checkbox, Row, Col, Carousel } from 'antd';
import { HkFormItemVertical } from 'components/HkForm.jsx';
import { HkLogoImg, HkLogoText } from 'components/HkLogo.jsx';
import { HkFooter, FooterContent } from 'components/HkFooter.jsx';
import Locale from 'modules/Locale';
import Auth from 'modules/Auth';

class ULoginForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = { rect: {}, model: { username: '', password: '' } };
    this.onWindowResize = this.onWindowResize.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    this.resizeSubKey = PublishSubscribe.subscribe('resize', this.onWindowResize);
    this.onWindowResize({ height: window.innerHeight, width: window.innerWidth });
  }

  componentWillUnmount() {
    PublishSubscribe.unsubscribe('resize', this.resizeSubKey);
  }

  onWindowResize(rect) {
    this.setState({ rect: rect });
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);

        Auth.login("TEST");

        this.props.history.push('/invoice/SALES/new');
      }
    });

    
  }

  handleChange(e) {
    const field = e.target;
    const model = this.state.model;
    model[field.name] = field.value;
    this.setState({ model });
    // this.showValidationMsg(field.name, field.value);
  }

  render() {
    const { getFieldDecorator } = this.props.form;

    return (
      <div>
        <Row>
          <Col span={12}>
            <Carousel autoplay dots={false} effect='fade'>
              <div><img src="assets/img/login/bg1.jpg" alt="login-bg" /></div>
              <div><img src="assets/img/login/bg2.jpg" alt="login-bg" /></div>
              <div><img src="assets/img/login/bg3.jpg" alt="login-bg" /></div>
              <div><img src="assets/img/login/bg4.jpg" alt="login-bg" /></div>
            </Carousel>
          </Col>
          <Col span={12}>
            <Row type="flex" align="middle" justify="center" style={{ minHeight: this.state.rect.height }}>
              <Col xs={6} sm={8} md={10} lg={12}>
                <h1 style={{ textAlign: 'center' }}><HkLogoText /></h1>
                <br />
                <p style={{ textAlign: 'center' }}>{Locale.getPage('login')}</p>
                <br />
                <Form layout="vertical">
                  <HkFormItemVertical label={Locale.getField('username').title}>
                    <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} name='username' placeholder={Locale.getField('username').placeHolder} value={this.state.model.username} onChange={this.handleChange} />
                  </HkFormItemVertical>
                  <HkFormItemVertical label={Locale.getField('password').title}>
                    <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" name='password' placeholder={Locale.getField('password').placeHolder} value={this.state.model.username} onChange={this.handleChange} />
                  </HkFormItemVertical>
                  <a className="login-form-forgot" href="">{Locale.getButton('forgotpassword')}</a>
                  <br />
                  <Button type="primary" htmlType="submit" className="login-form-button" onClick={this.handleSubmit}>
                    {Locale.getButton('login')}
                  </Button>
                </Form>
                <Divider />
                <p>Henüz Üye Değil Misiniz?
                    Üyelerimize özel hizmetlerimizden faydalanabilmek için üye olun.
</p>
                <Button className="login-form-button">
                  {Locale.getButton('registernow')}
                </Button>
              </Col>
            </Row>
            <Row type="flex" align="middle" justify="end">
              <FooterContent />
            </Row>
          </Col>
        </Row>
      </div >
    );
  }
}

const LoginForm = Form.create()(ULoginForm);
export default withRouter(LoginForm);
