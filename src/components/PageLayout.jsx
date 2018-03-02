import React from 'react';
import { LocaleProvider, Layout } from 'antd';
import PublishSubscribe from 'publish-subscribe-js';

import trTR from 'antd/lib/locale-provider/tr_TR';
import { AppMenu } from 'components/HkMenu.jsx';
import { HkLogo } from 'components/HkLogo.jsx';
import { HkFooter } from 'components/HkFooter.jsx';

const { Header, Content, Footer, Sider } = Layout;

class PageLayout extends React.Component {
    constructor(props) {
        super(props);
        this.state = { collapsed: false, rect: { height: 720, width: 520 } };
        this.onWindowResize = this.onWindowResize.bind(this);
    }

    componentDidMount() {
        this.resizeSubKey = PublishSubscribe.subscribe('resize', this.onWindowResize);
        this.onWindowResize();
    }

    componentWillUnmount() {
        PublishSubscribe.unsubscribe('resize', this.resizeSubKey);
    }

    onWindowResize(rect) {
        this.setState({ rect: rect });
    }
    // Sider style={{ backgroundColor: '#3e4a5a' }}
    // Menu style={{ backgroundColor: '#3e4a5a' }} 
    render() {
        return (
            <LocaleProvider locale={trTR}>
                <Layout>
                    <Sider
                        breakpoint="lg"
                        collapsedWidth="0"
                        width="220"
                        onCollapse={(collapsed, type) => { this.setState({ collapsed: collapsed }); }}>
                        <HkLogo />
                        <AppMenu />
                    </Sider>
                    <Layout>
                        <Header style={{ paddingLeft: '10px', backgroundColor: '#28303c' }}>
                            {this.state.collapsed && <HkLogo />}
                        </Header>
                        <Content style={{ margin: 10 }}>
                            <div style={{ background: '#fff', padding: '5px', minHeight: '720px', minWidth: '380px' }}>
                                {this.props.children}
                            </div>
                        </Content>
                        <HkFooter />
                    </Layout>
                </Layout>
            </LocaleProvider>
        );
    }
}

export default PageLayout;