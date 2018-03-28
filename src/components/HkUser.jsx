import React from 'react';
import { withRouter } from 'react-router-dom';

import { Avatar, Dropdown, Icon, Menu } from 'antd';
import locale from 'locale';
import actions from 'app/auth/actions';

const UserMenu = (props) =>(
    <Menu theme="dark" mode="inline" onClick={(e) => {
        switch (e.key) {
            case 'logout':
                actions.logout();
                props.history.push('/login');
                break;
            case 'profile':
            default:
        }
    }} >
        <Menu.Item key="profile">
            <span>
                <Icon type="profile" />
                <span>{locale.getButton("loginuserprofile")}</span>
            </span>
        </Menu.Item>
        <Menu.Item key="logout">
            <span>
                <Icon type="logout" />
                <span>{locale.getButton("logout")}</span>
            </span>
        </Menu.Item>
    </Menu>)



const HkUser = (props) => {
    let src = null;
    let icon = "user";
    let name = "";
    if (props.user && props.user.avatar) {
        src = props.user.avatar;
        name = props.user.party_name;
        icon = null;
    }

    return <Dropdown overlay={<UserMenu history={props.history}/>}>
        <span style={{ color: '#1890ff', fontWeight: 'bold' }}>
            <Avatar style={{ backgroundColor: '#e6f7ff', color: '#1890ff', verticalAlign: 'middle' }}
                shape="circle" size="default" src={src}
                icon={icon}>
            </Avatar>
            {' '}{name}<Icon type="down" />
        </span>
    </Dropdown>;
}

export default withRouter(HkUser);