import React from 'react';

import { LocaleProvider, Layout, Row, Col } from 'antd';

import trTR from 'antd/lib/locale-provider/tr_TR';
import enGB from 'antd/lib/locale-provider/en_GB';

import HkMenu from 'components/HkMenu.jsx';
import { HkLogo } from 'components/HkLogo.jsx';
import { HkFooter } from 'components/HkFooter.jsx';
import HkUser from 'components/HkUser.jsx';
import HkLang from 'components/HkLang.jsx';
import BaseComponent from 'components/BaseComponent.jsx';
const { Header, Content, Sider } = Layout;

class PageLayout extends BaseComponent {
    constructor(props) {
        super(props);
        this.state = { collapsed: false };
    }

    componentDidMount() {
        super.componentDidMount();
        this.connect(['login', 'language', 'container']);
    }

    render() {
        return <LocaleProvider locale={this.state.language === "tr" ? trTR : enGB}>
            <Layout>
                <Sider
                    breakpoint="lg"
                    collapsedWidth="0"
                    width="220"
                    onCollapse={(collapsed, type) => { this.setState({ collapsed: collapsed }); }}>
                    <HkLogo />
                    <HkMenu theme="dark" mode="inline" items={this.state.menuItems} />
                </Sider>
                <Layout>
                    <Header style={{ paddingLeft: '10px', backgroundColor: '#28303c' }}>
                        <Row type="flex" align="middle" justify="end">
                            <Col><HkUser user={this.state.user} /></Col>
                            <Col style={{ paddingLeft: '15px' }}><HkLang /></Col>
                        </Row>
                    </Header>
                    <Content style={{ margin: 10 }}>
                        {this.state.rect &&
                            <div style={{ background: '#fff', padding: '5px', minHeight: this.state.rect.height, height: this.state.rect.height, minWidth: '380px', overflow:'scroll' }}>
                                {this.props.children}
                            </div>
                        }
                    </Content>
                    <HkFooter />
                </Layout>
            </Layout>
        </LocaleProvider>
    }
}

export default PageLayout;